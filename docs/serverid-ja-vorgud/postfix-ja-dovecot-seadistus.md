---
title: Postfix ja Dovecot seadistus
description: Kuidas seadistada Postfix autentitud, krüpteeritud kirja esitamiseks ja Dovecot IMAPS-iks, ning kuidas need kaks teenust omavahel autentimiseks suhtlevad.
outline: deep
---

# Postfix ja Dovecot seadistus

::: info Õpiväljund
Pärast seda osa oskad selgitada, miks Postfix küsib kasutaja autentimist Dovecotilt, ning oled seadistanud mõlemad teenused nii, et kiri liigub ainult krüpteeritud ja autenditud ühenduse kaudu.
:::

## Meeskonna kahekümnes küsimus sinule

Postkastid on olemas, aga praegu ei tea kumbki teenus veel, kuidas omavahel rääkida ega kuidas kasutajat tuvastada. Selles osas paneme Postfixi ja Dovecoti tegelikult koostööle.

## Autentimine ja TLS — kaks eraldi kihti

Kasutaja peab kirja saatmiseks **autentima** (tõendama, kes ta on) — parooliga autentimist kaitseb **TLS** (transpordi krüpteering). Need on kaks eraldi kihti: autentimismehhanismi **nimi** (nt `PLAIN`) ei ütle iseenesest midagi selle kohta, kas ühendus on krüpteeritud või mitte.

::: tip `PLAIN` ei tähenda "kaitsmata"
`PLAIN` kirjeldab, **kuidas** parool edastatakse (lihttekstina autentimissõnumis), mitte **kas ühendus ise on krüpteeritud**. `PLAIN` üle nõutud TLS-i on täiesti sobiv — parool liigub krüpteeritud tunneli sees. `PLAIN` kaitsmata (ilma TLS-ita) ühendusel avaldaks aga parooli otse.
:::

## SASL ühendus — Postfix küsib Dovecotilt

Postfix ise ei tea kasutajate paroole — kui klient üritab autentida, **küsib Postfix seda Dovecotilt** läbi kohaliku Unix socketi (sama socketi mõiste, mis [SSH tunnel ja graafiline haldus](./ssh-tunnel-ja-graafiline-haldus) osas MySQL-i juures juba tuttavaks sai — kohalik ühendus, mis ei kasuta TCP porti).

::: warning Lugemine võib töötada, kuigi saatmine ei tööta
Kui socketi tee on vale, näed huvitavat, aga loogilist tulemust: Dovecot IMAP sisselogimine (lugemine) töötab endiselt, aga Postfixi kaudu saatmine ebaõnnestub autentimisel — sest need on kaks **eraldi** ühendust samale kasutajaandmebaasile, mitte üks jagatud olek.
:::

## Käed külge: Postfixi seadistus

**Kõik käsud srv2 peal.** Iga `postconf -e` käsk kirjutab **ühe** väärtuse faili `main.cf`. `postconf` on Postfixi seadistustööriist, `-e` tähendab muutmist. Käivita käsud ükshaaval — enamik ei anna eduka täitmise korral väljundit.

```bash
sudo postconf -e 'myhostname = mail.lab.test'
sudo postconf -e 'mydomain = lab.test'
sudo postconf -e 'myorigin = lab.test'
sudo postconf -e 'mydestination = lab.test, mail.lab.test, localhost'
```

Määrab serveri täisnime, labori domeeni, kohaliku saatja vaikimisi domeeni, ja domeenid, mille kirjad toimetatakse kohalikele kasutajatele.

```bash
sudo postconf -e 'inet_interfaces = 127.0.0.1, 192.168.56.20'
sudo postconf -e 'inet_protocols = ipv4'
```

Piirab Postfixi kuulama ainult loopbacki ja labori IP-d (mitte kõiki liideseid) ja ainult IPv4 peal — sama loopback+laborivõrk muster, mis Nginxi ja MySQL-i puhulgi.

```bash
sudo postconf -e 'mynetworks = 127.0.0.0/8'
```

**Usaldatud** võrk piirdub ainult selle masina enda loopbackiga, **mitte** kogu laborivõrguga — laiem `mynetworks` tähendaks, et kõik laborimasinad saaksid autentimiseta kirju saata, mida me teadlikult ei taha.

```bash
sudo postconf -e 'home_mailbox = Maildir/'
```

Kohalik toimetamine kasutab kasutaja kodukaustas `Maildir/` kausta, [eelmises osas](./meiliserveri-pohitoed-ja-postkastid) kirjeldatud struktuuriga.

```bash
sudo postconf -e 'smtpd_tls_cert_file = /etc/ssl/certs/mail-lab.crt'
sudo postconf -e 'smtpd_tls_key_file = /etc/ssl/private/mail-lab.key'
sudo postconf -e 'smtpd_tls_security_level = may'
```

Määrab TLS sertifikaadi ja võtme [eelmises osas](./meiliserveri-pohitoed-ja-postkastid) loodud failidest. `may` tähendab, et pordil 25 on TLS **pakutud**, mitte kohustuslik — kliendi porti 587 jaoks nõuame TLS-i eraldi, `master.cf` failis allpool.

```bash
sudo postconf -e 'smtpd_sasl_type = dovecot'
sudo postconf -e 'smtpd_sasl_path = private/auth'
```

Autentimise teostab Dovecot; socketi tee on suhteline Postfixi enda järjekorra juurest (täisteest `/var/spool/postfix/private/auth`).

```bash
sudo postconf -e 'smtpd_relay_restrictions = permit_mynetworks, permit_sasl_authenticated, reject_unauth_destination'
```

**Lubamatu edastuse piirang** — järgmises osas selle mõte täpsemalt lahti seletame, aga juba siin: võõras, autentimata klient **ei saa** suvalisele välisdomeenile edastust teha.

```bash
sudo postconf -e 'default_transport = error:External delivery disabled in school lab'
sudo postconf -e 'relay_transport = error:External relay disabled in school lab'
```

Kõigi mittekohalike sihtide tarne (ka autentitud kasutajatele!) annab selge vea — meie labor **ei saada** kunagi päriselt välja, isegi kogemata.

Ava `sudo nano /etc/postfix/master.cf`. Leia olemasolev `submission` teenus (tavaliselt kommenteeritud näitena) ja lisa või aktiveeri **ainult üks** järgmine plokk — ära dubleeri:

```text
submission inet n - y - - smtpd
  -o syslog_name=postfix/submission
  -o smtpd_tls_security_level=encrypt
  -o smtpd_sasl_auth_enable=yes
  -o smtpd_tls_auth_only=yes
  -o smtpd_recipient_restrictions=permit_sasl_authenticated,reject
```

Esimene rida käivitab port 587 (submission) SMTP protsessi. Taandega `-o` read kirjutavad üle **ainult selle** teenuse parameetrid, mitte kogu Postfixi seadistust. `smtpd_tls_security_level=encrypt` teeb TLS-i **kohustuslikuks** (erinevalt pordi 25 `may` väärtusest), `smtpd_sasl_auth_enable=yes` lülitab autentimise sisse, `smtpd_tls_auth_only=yes` lubab autentimist ainult TLS-i sees, ja viimane rida lubab saajani jõuda **ainult** autenditud kasutajal.

## Käed külge: Dovecot 2.3 seadistus

```bash
sudo nano /etc/dovecot/conf.d/99-lab.conf
```

**Faili `/etc/dovecot/conf.d/99-lab.conf` sisu:**

```ini
protocols = imap
listen = 127.0.0.1, 192.168.56.20
mail_location = maildir:~/Maildir
ssl = required
ssl_cert = </etc/ssl/certs/mail-lab.crt
ssl_key = </etc/ssl/private/mail-lab.key
disable_plaintext_auth = yes
auth_mechanisms = plain login
service imap-login {
  inet_listener imap {
    port = 0
  }
  inet_listener imaps {
    port = 993
    ssl = yes
  }
}
service auth {
  unix_listener /var/spool/postfix/private/auth {
    mode = 0660
    user = postfix
    group = postfix
  }
}
```

`protocols = imap` aktiveerib ainult IMAP-i (mitte POP3). `listen` piirab teenuse samadele aadressidele, mis Postfixigi. `mail_location` peab vastama Postfixi `home_mailbox` valikule. `ssl = required` ja `disable_plaintext_auth = yes` nõuavad turvalist ühendust — sertifikaadiridade ees olev `<` tähendab "loe selle faili **sisu**" ja kuulub Dovecot 2.3 süntaksisse. `service imap-login` plokk lülitab tavalise IMAP-i (143) välja (`port = 0`) ja IMAPS-i (993) sisse. `service auth` plokk loob just selle Unix socketi, mida Postfix autentimiseks küsib — õigused `0660` lubavad ligipääsu ainult `postfix` kasutajale/grupile.

::: warning Ubuntu vaikimisi PAM include peab jääma alles
Ära eemalda Ubuntu paketiga kaasnevat süsteemi/PAM autentimise `include` rida mujal Dovecoti seadistuses — meie `99-lab.conf` **lisandub** olemasolevale, mitte ei asenda seda tervenisti.
:::

## Käed külge: kontroll ja käivitamine

```bash
sudo doveconf -n
```

Näitab Dovecoti **mittestandardseid** seadistusi ja tuvastab parsimisvead — kontrolli, et `mail_location`, `ssl` ja auth socket on väljundis olemas. Veateatega ära jätka.

```bash
sudo postfix check
```

Kontrollib Postfixi seadistust ja vajalikku failistruktuuri enne käivitamist — leiame vead varakult, samamoodi nagu `nginx -t` ja `sshd -t` varasemates teemades.

```bash
sudo systemctl restart dovecot
```

Käivitab Dovecoti uue konfiguratsiooniga. **Järjekord on tähtis:** autentimissocket peab olemas olema **enne**, kui Postfix seda küsima hakkab.

```bash
sudo systemctl restart postfix
```

Käivitab Postfixi uute liidese- ja `master.cf` seadetega.

```bash
sudo systemctl enable postfix dovecot
```

Seab mõlemad teenused automaatselt käivituma — postkast peab töötama ka pärast taaskäivitust, sama muster, mis kõigi eelnevate teenustega.

## Kokkuvõte

| Mõiste / käsk | Tähendus |
| --- | --- |
| `PLAIN` autentimine + TLS | mehhanismi nimi ja transpordi krüpteering on eraldi kihid |
| SASL socket (`private/auth`) | Postfix küsib autentimist Dovecotilt kohaliku socketi kaudu |
| `mynetworks = 127.0.0.0/8` | usaldatud on ainult see masin ise, mitte kogu laborivõrk |
| `master.cf submission -o` | port 587 kirjutab üle ainult **oma** parameetrid, kohustuslik TLS+auth |
| `doveconf -n` / `postfix check` | kontrolli enne käivitamist, sama muster mis `nginx -t` |
| Käivitusjärjekord: Dovecot enne Postfixi | autentimissocket peab enne olemas olema |

## Allikad

- [Dovecot 2.3 — Postfix SASL howto](https://doc.dovecot.org/2.3/configuration_manual/howto/postfix_and_dovecot_sasl/)
- [Postfix — postconf(5) manual](https://www.postfix.org/postconf.5.html)
