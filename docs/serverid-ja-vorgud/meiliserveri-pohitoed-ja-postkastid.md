---
title: Meiliserveri põhitõed ja postkastid
description: E-kirja teekond SMTP-st IMAP-ini, Postfixi ja Dovecoti eraldi rollid, ning kahe kohaliku postkastikasutaja loomine srv2 peale.
outline: deep
---

# Meiliserveri põhitõed ja postkastid

::: info Õpiväljund
Pärast seda osa oskad selgitada e-kirja teekonda saatjast lugejani, mis vahe on Postfixil ja Dovecotil, ning oled loonud srv2 peale kaks kohalikku postkastikasutajat koos TLS-sertifikaadiga.
:::

## Meeskonna üheksateistkümnes küsimus sinule

Meeskonnal on veeb ja andmebaas, mõlemad turvatud. Nüüd tuleb otsesem palve: "kliendid peavad saama kinnituskirju, ja meil endil oleks vaja testpostkasti, kust näha, kas need kirjad üldse kohale jõuavad." See teema annab meeskonnale päris, kohaliku meiliserveri — ainult labori sees, mitte avalikku internetti saatvana.

::: warning See on suurem teema kui eelmised
Allikmaterjal annab sellele teemale **8 akadeemilist tundi** (võrdluseks: eelnevad teemad said 6). Meiliserveri seadistus on lihtsalt pikem kui veebiserveri oma — varu selleks rohkem aega kui eelmiste teemade jaoks.
:::

## E-kirja teekond — mitu eraldi etappi

Kiri läbib mitu **eraldi** teenust, mitte üht toru:

1. Kirjutaja kasutab **meiliklienti** (Thunderbird).
2. **SMTP** võtab kirja saatmiseks vastu ja toimetab selle edasi.
3. Saaja server **salvestab** kirja postkasti.
4. **IMAP** näitab postkasti sisu lugejale.

::: tip Mälupilt
Postkontor võtab saadetise vastu ja kirjakandja viib selle postkasti (SMTP) — postkasti **lugemine** on eraldi teenus (IMAP). Üks töötav etapp ei tõenda kogu teekonda: SMTP server üksi ei anna kasutajale veel loetavat postkasti.
:::

## Postfix ja Dovecot — kaks eri rolli

**Postfix** haldab SMTP vastuvõttu ja edastamist — postijaotus. **Dovecot** pakub postkastile IMAP ligipääsu — postkasti ukse haldur. Meie laboris kasutame **kohalikke süsteemikontosid** (Linuxi kasutajaid), mitte suuremates süsteemides tavapärast virtuaalset kasutajate kataloogi.

::: tip Kumb teenindab mida
Thunderbirdi postkasti **lugemist** teenindab Dovecot (IMAP). Thunderbirdi kirja **saatmist** teenindab Postfix (SMTP). Kaks eri protokolli, kaks eri teenust, kaks eri porti.
:::

## Pordid — teeninduslett ja laadimisuks

| Port | Kasutus |
| --- | --- |
| 25 | serveritevaheline SMTP (server-server, mitte kliendi kasutuseks) |
| 587 | autentitud kirja **esitamine** (submission) — meie Thunderbird kasutab seda |
| 465 | implicit TLS esitamine (alternatiiv 587-le, meie laboris ei kasuta) |
| 993 | **IMAPS** — krüpteeritud postkasti lugemine |

Meie Thunderbirdi klient kasutab saatmiseks porti **587** koos STARTTLS-iga, mitte porti 25 (mis on mõeldud serverite omavaheliseks suhtluseks, mitte suvaliseks avatud edastuseks).

**IMAP** haldab serveris paiknevat postkasti — kaugvaade samasse postkappi, kus mitu klienti näevad sama seisu ja kiri **ei kao** serverist lugemisel. **POP3** keskendub kirjade allalaadimisele kliendi masinasse; laboris kasutame ainult IMAPS-i (port 993).

## Domeen ja MX — juba olemas

**Aadress** koosneb kohalikust osast ja domeenist: `anna@lab.test` — `anna` on kohalik osa, `lab.test` domeen. **MX kirje** ütleb, milline server domeeni kirju vastu võtab.

::: tip Selle sammu tegime juba ära
[Pordid, localhost ja oma DNS](./pordid-localhost-ja-oma-dns) osas lisasime `dnsmasq` seadistusse juba `host-record=mail.lab.test,192.168.56.20` ja `mx-host=lab.test,mail.lab.test,10` — meie DNS on meiliserveri jaoks **juba valmis**. Ei ole vaja midagi DNS-i poolel uuesti seadistada, ainult kontrollida (näiteks `dig @192.168.56.10 lab.test MX` srv1 pealt), et see endiselt kehtib.
:::

## Maildir — üks fail, üks kiri

**Maildir** hoiab iga kirja **eraldi failina**, mitte kogu postkasti ühes suures failis: `new/` sisaldab uusi kirju, `cur/` juba töödeldud (loetud) kirju, `tmp/` on ajutine ala kirja saabumise ajal. Failide omanik peab vastama postkasti kasutajale — teine kasutaja ei tohi lugeda ega muuta võõraid kirju, sama põhimõte, mis [Failisüsteem ja failiõigused serveris](./failisusteem-ja-oigused-serveris) osas juba tuttavaks sai.

## Käed külge: paigaldus ja kaks kasutajat

**Kõik käsud jooksevad srv2 peal.**

```bash
sudo apt install postfix dovecot-imapd swaks ufw openssl
```

Paigaldab SMTP-serveri (Postfix), IMAP-serveri (`dovecot-imapd`), SMTP testkliendi (`swaks`, vajame seda hiljem negatiivse testi jaoks) ning tulemüüri ja TLS tööriistad. Paigalduse dialoogis vali **Internet Site** ja **System mail name**: `lab.test`. See nimevalik **ei tähenda**, et lubame internetti saatmist — see tuleb selgesõnaliselt keelata järgmises osas.

```bash
dovecot --version
```

Kontrollib Dovecoti versiooni. Oodatav tulemus: `2.3.x`. See juhend kasutab **Ubuntu 24.04 paketiga Dovecot 2.3** seadistuskeelt — 2.4 jaoks ei tohi neid direktiive pimesi üle kanda, süntaks on erinev.

```bash
sudo adduser anna
```

Loob Linuxi kasutaja ja kodukausta — Postfix toimetab kohaliku saaja kirja tema postkasti täpselt selle kasutajanime järgi. Määra unikaalne laboriparool; lisainfo väljad võib `Enter`-iga vahele jätta.

```bash
sudo adduser juri
```

Loob teise kasutaja, oma parooliga — vajame kahte kontot, et proovida päris kahepoolset kirjavahetust.

```bash
sudo openssl req -x509 -newkey rsa:3072 -sha256 -days 30 -nodes -keyout /etc/ssl/private/mail-lab.key -out /etc/ssl/certs/mail-lab.crt -subj "/CN=mail.lab.test" -addext "subjectAltName=DNS:mail.lab.test"
```

Sama muster, mis [HTTPS ja TLS](./https-ja-tls) osas — ainult nimi (`mail.lab.test`) ja failinimed on teised. Meiliklientide ühendused peavad samuti olema krüpteeritud.

```bash
sudo chmod 600 /etc/ssl/private/mail-lab.key
```

Piirab privaatvõtme lugemise ainult failiomanikule — sama põhimõte, mis veebisertifikaadi puhul.

## Kokkuvõte

| Mõiste / käsk | Tähendus |
| --- | --- |
| Postfix vs Dovecot | SMTP (saatmine/vastuvõtt) vs IMAP (postkasti lugemine) |
| Port 587 | autentitud kirja esitamine, mida meie klient kasutab |
| Port 993 | IMAPS, krüpteeritud postkasti lugemine |
| MX kirje | juba olemas teemast 4, midagi uut siin teha pole |
| Maildir (`new`/`cur`/`tmp`) | üks fail = üks kiri, õigused per kasutaja |
| `mail-lab.key`/`mail-lab.crt` | sama TLS muster, mis veebiserveril, eraldi nimi |

## Allikad

- [Ubuntu Server — Postfix paigaldus](https://ubuntu.com/server/docs/how-to/mail-services/install-postfix/)
- [Ubuntu Server — Dovecot paigaldus](https://ubuntu.com/server/docs/how-to/mail-services/install-dovecot/)
