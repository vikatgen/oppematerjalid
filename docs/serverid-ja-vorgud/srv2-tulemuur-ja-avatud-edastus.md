---
title: srv2 tulemüür ja avatud edastuse oht
description: Miks avatud meiliedastus on kõige levinum meiliserveri viga, ning kuidas UFW abil piirata srv2 ligipääsu ainult meili jaoks põhjendatud portidele.
outline: deep
---

# srv2 tulemüür ja avatud edastuse oht

::: info Õpiväljund
Pärast seda osa oskad selgitada, mis on avatud edastus (*open relay*) ja miks see on ohtlik, ning oled seadistanud srv2 tulemüüri nii, et see lubab ainult meili jaoks põhjendatud ühendusi.
:::

## Meeskonna kahekümne esimene küsimus sinule

Postfix ja Dovecot töötavad, aga srv2-l pole seni **ühtegi** tulemüürireeglit — erinevalt srv1-st, kus [Tulemüür ja UFW](./tulemuur-ja-ufw) osas juba UFW seadistasime. Meeskond küsib: "kas keegi väljastpoolt saaks meie meiliserverit ära kasutada rämpsposti saatmiseks?"

## Avatud edastuse oht — miks negatiivne test on kohustuslik

**Avatud edastus** (*open relay*) tähendab meiliserverit, mis nõustub edastama kirju **suvalistelt** klientidelt **suvalistele** välistele saajatele, ilma autentimist nõudmata. Avalik tasuta postiauto, mis hakkab vedama võõrast rämpsposti — täpselt see on põhjus, miks meiliserverid on ajalooliselt olnud rämpsposti leviku levinud tööriist.

::: warning SMTP 250-tervitus ei tõenda turvalist seadistust
Server, mis vastab tervituse etapis `250 OK`, näib toimivat — aga see üksi **ei tõenda**, et lubamatu edastus on keelatud. [Tulemüür ja UFW](./tulemuur-ja-ufw) osas juba nägime, et lubatud port ei tõenda töötavat teenust; siin on sarnane õppetund vastupidises suunas: **vastav** teenus ei tõenda **turvalist** teenust. Negatiivne test (proovi keelatud asja ja veendu, et see **ebaõnnestub**) on kohustuslik, mitte valikuline — teeme selle [järgmises osas](./thunderbird-ja-meili-toendamine).
:::

[Postfix ja Dovecot seadistus](./postfix-ja-dovecot-seadistus) osas juba seadsime `smtpd_relay_restrictions` ja `default_transport`/`relay_transport` väärtused, mis peaksid selle keelama tarkvara tasandil — see osa lisab **teise, sõltumatu kaitsekihi**: tulemüüri, mis ei lase kaugele klientidele isegi mitte pordini 25 ligi (peale ühe erandi, mida kohe näed).

## Internetimeili lisatingimused — mõisted, mida siin ei kasuta

Päris avaliku meiliserveri jaoks on veel rohkem tingimusi, mida meie **teadlikult labori sees ei raken­da**, sest me ei saada kunagi tegelikult välja:

| Mõiste | Mida teeb |
| --- | --- |
| **SPF** | kirjeldab, millised serverid tohivad domeeni nimel saata |
| **DKIM** | allkirjastab kirja osad krüptograafiliselt |
| **DMARC** | seob SPF/DKIM poliitika ja otsustab, mida teha, kui joondus ebaõnnestub |
| Maine, pöörd-DNS | mõjutavad, kas teised serverid kirja üldse vastu võtavad |

::: tip SPF ei krüpteeri midagi
Kõik need neli on **usaldusmehhanismid** ("kas see kiri on tõesti sellelt, kellena ta väidab end olevat"), mitte krüpteerimismehhanismid — need on eraldi teema TLS-ist. Õige "margi" (SPF-kirje) olemasolu ei taga, et iga postkontor (vastuvõttev server) saadetise vastu võtab.
:::

## Käed külge: srv2 tulemüür

**Kõik käsud srv2 peal.** Muster on täpselt sama, mis [Tulemüür ja UFW](./tulemuur-ja-ufw) osas — vaikimisi keeld, seejärel selgesõnalised load.

```bash
sudo ufw default deny incoming
sudo ufw default allow outgoing
```

Sama vaikepoliitika, mis srv1-l.

```bash
sudo ufw deny out 25/tcp
```

**Täiendav kaitsekiht:** blokeerib ka srv2 enda **väljuva** SMTP pordi 25. Isegi kui midagi rakenduse tasandil peaks eksikombel proovima ise otse välja saata, ei pääse see paketi tasandil kaugemale.

```bash
sudo ufw allow from 192.168.56.1 to any port 22 proto tcp
```

Sama SSH-reegel, mis srv1-l — ainult host tohib hallata.

```bash
sudo ufw allow from 192.168.56.0/24 to any port 587 proto tcp
```

Lubab kogu laborivõrgul **autentitud** SMTP esitamise (Thunderbird kasutab seda).

```bash
sudo ufw allow from 192.168.56.0/24 to any port 993 proto tcp
```

Lubab kogu laborivõrgul IMAPS lugemise.

```bash
sudo ufw allow from 192.168.56.10 to any port 25 proto tcp
```

::: tip Miks ainult srv1-le, mitte kogu võrgule
See on **ainuke** port 25 reegel, ja see lubab **ainult srv1-lt** — vajame seda [järgmises osas](./thunderbird-ja-meili-toendamine), et teha `swaks`-iga negatiivne test (proovida välisdomeenile saatmist ja veenduda, et see ebaõnnestub). Ülejäänud laborivõrgul (ja kindlasti internetil) pole isegi seda porti näha.
:::

```bash
sudo ufw enable
```

Aktiveerib kõik ettevalmistatud reeglid. Kontrolli kohe pärast (hosti terminalist), et SSH ühendus srv2-ga endiselt töötab.

```bash
sudo ufw status numbered
```

Võrdle tulemust: 22 ainult hostilt, 587/993 kogu laborivõrgult, 25 ainult srv1-lt — ei rohkem ega vähem.

## Kokkuvõte

| Mõiste / käsk | Tähendus |
| --- | --- |
| Avatud edastus (*open relay*) | server, mis edastab suvaliselt kliendilt suvalisele välisele saajale — vältimatu risk |
| `smtpd_relay_restrictions` + tulemüür | kaks sõltumatut kaitsekihti, mitte üks |
| `ufw deny out 25/tcp` | blokeerib ka serveri enda väljuva otsesaatmise |
| Port 25 ainult srv1-lt | kitsaim võimalik luba, ainult negatiivse testi jaoks |
| SPF/DKIM/DMARC | usaldusmehhanismid, mida labor teadlikult ei raken­da (ei saada välja) |

## Allikad

- [Ubuntu Server — UFW tulemüüri juhend](https://ubuntu.com/server/docs/how-to/security/firewalls/)
- [Postfix — SMTP Relay ja Access Control](https://www.postfix.org/SMTPD_ACCESS_README.html)
