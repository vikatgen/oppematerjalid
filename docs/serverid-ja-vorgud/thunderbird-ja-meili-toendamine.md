---
title: Thunderbird ja meili tõendamine
description: Kahe päris postkasti seadistamine Thunderbirdis, kirjavahetuse testimine, ning kohustuslik negatiivne test, mis tõendab, et välisdomeenile edastus on keelatud.
outline: deep
---

# Thunderbird ja meili tõendamine

::: info Õpiväljund
Pärast seda osa oskad seadistada meilikliendi turvaliselt IMAPS-i ja autentitud SMTP jaoks, tõendada kirjavahetust logide kaudu, ning tõendada, et meiliserver keeldub edastamast kirju välisdomeenidele.
:::

## Meeskonna kahekümne teine küsimus sinule

Kõik teenused töötavad ja tulemüür on paigas — aga meeskond ei usu ainult paigaldatud pakette ja avatud porte, need on ainult **eeldused**. Meeskond küsib otse: "näita mulle, et Anna ja Jüri saavad päriselt kirju vahetada — ja näita, et keegi väljastpoolt ei saa meie serverit ära kasutada."

## Rakenduse meil — lühike eelvaade

Päris rakendus saadab meili kas SMTP kliendi teegi või teenuse API kaudu, ja arenduskeskkond vajab testsaajaid — täpselt seda meie `anna@lab.test`/`juri@lab.test` paar simuleerib. Kui e-kirja saatmine katkeb, ei tohi rakendus (nt tellimuse kinnitus) jääda teadmata seisundisse — vaja on veahaldust ja korduskatsete plaani, mis on omaette teema rakenduse enda arhitektuuris.

::: tip Saatmise edu ei tõenda lugemist
Isegi kui saatmisfunktsioon tagastab eduka vastuse, ei tõenda see, et saaja kirja **luges** — see kehtib nii päris rakenduse kui meie labori testi puhul. Mõõdame ainult seda, mida päriselt mõõta saab: kas kiri jõudis kohale, mitte kas keegi selle avas.
:::

## Käed külge: kaks postkasti hostis

1. Paigalda hosti [Thunderbird](https://www.thunderbird.net/) ametlikust allikast. Kasuta eraldi laboriprofiili või selgelt eristatavaid testkontosid.
2. **Add account → Existing email.** Display name `Anna`, e-post `anna@lab.test`, parool Anna kohalik laboriparool ([eelmises osas](./meiliserveri-pohitoed-ja-postkastid) loodud).
3. Vali **Configure manually**:
   - Incoming: **IMAP**, hostname `mail.lab.test`, port `993`, turvalisus **SSL/TLS**, autentimine Normal password, kasutajanimi `anna` (ilma domeenita).
   - Outgoing: **SMTP**, hostname `mail.lab.test`, port `587`, turvalisus **STARTTLS**, autentimine Normal password, kasutajanimi `anna`.
4. Iseallkirjastatud sertifikaadi hoiatuse ilmumisel **kontrolli enne erandi lisamist** nime (`mail.lab.test`), kehtivust ja SHA256 sõrmejälge (vt allpool, kuidas seda serveri poolelt lugeda). Sertifikaadierand kehti ainult sellele laborikontole. **Ära vali** ühenduse turvalisuseks "None".
5. Lisa samal viisil teine konto `juri@lab.test`, kasutajanimi `juri`, tema **enda** parooliga. Kontrolli eraldi, et Jüri konto kasutab väljuval SMTP-l tõesti Jüri kontot, mitte kogemata salvestatud Anna oma.
6. Saada Annalt Jürile kiri pealkirjaga `LAB-001`. Jüri avab kirja ja vastab pealkirjaga `Re: LAB-001`. Mõlemad kirjad peavad olema päriselt saaja Inboxis, mitte ainult Sent kaustas.
7. Talleta kontode **turvaparameetrid ilma paroolita** (server, port, turvalisusviis), saabunud kirjad, ja logi seos (vt allpool). Kui postkast on esimest korda tühi, tekib `Maildir` kaust alles esimese kohaliku tarnega.

::: warning Ära automatiseeri parooli arvamist
Kui midagi seadistuses ei tööta, testi käsitsi, üks muudatus korraga — [Protsessid, teenused ja logid](./protsessid-teenused-ja-logid) osa "neli küsimust" kehtib siingi. Ära tee kunagi automatiseeritud parooliarvamiskatseid, isegi mitte oma enda laborisüsteemi vastu.
:::

## Käed külge: sertifikaadi kontroll ja logid

**Kus: srv2**

```bash
openssl x509 -in /etc/ssl/certs/mail-lab.crt -noout -fingerprint -sha256
```

Loeb avalikku sertifikaati; `-noout` peidab toorkuju, `-fingerprint -sha256` näitab SHA256 sõrmejälge. Võrdle seda väärtust Thunderbirdis nähtud sertifikaadi sõrmejäljega — need peavad ühtima, samamoodi nagu [SSH ja kaugühenduse võtmed](./ssh-ja-kauguhenduse-votmed) osas hostivõtme sõrmejälge kontrollisime.

```bash
sudo journalctl -u postfix -u dovecot --since "15 minutes ago" --no-pager
```

Loeb mõlema teenuse viimase 15 minuti süsteemipäeviku korraga — sama `journalctl -u` muster, mis [Protsessid, teenused ja logid](./protsessid-teenused-ja-logid) osast tuttav, ainult kahe teenusega korraga. Oodatav tulemus: autentimis- ja teenusekirjed. Postfixi tarnekirjed võivad olenevalt `rsyslog` olemasolust asuda hoopis failis `/var/log/mail.log`.

```bash
sudo apt install rsyslog
```

Paigaldab süsteemilogi vastuvõtu, kui `/var/log/mail.log` faili veel pole. Saada pärast seda uus testkiri ja vaata järgmist käsku.

```bash
sudo tail -n 50 /var/log/mail.log
```

Näitab meililogi viimast 50 rida — otsi Anna/Jüri kirjet ja selget "delivered to maildir" (või sarnast eduka tarne) teadet.

## Käed külge: kohustuslik negatiivne test

**Kus: srv1** (mitte srv2 — testime teadlikult teiselt masinalt, nii nagu [srv2 tulemüür](./srv2-tulemuur-ja-avatud-edastus) osas port 25 reegel selle just võimaldab).

```bash
sudo apt install swaks
```

Paigaldab SMTP testkliendi srv1 peale.

```bash
swaks --server 192.168.56.20 --port 25 --from test@lab.test --to recipient@example.org --quit-after RCPT
```

Avab SMTP seansi srv2-ga ja proovib saata **välisdomeeni** (`example.org`) saajale. `--quit-after RCPT` lõpetab seansi enne kirja sisu saatmist — piisab RCPT etapi vastusest.

Oodatav tulemus: `554 5.7.1 Relay access denied` juba **RCPT** etapis. Kui selle asemel tuleb `250` (aktsepteerimine), on seadistuses viga, mida tuleb enne jätkamist parandada — [Postfix ja Dovecot seadistus](./postfix-ja-dovecot-seadistus) osa `smtpd_relay_restrictions`/`default_transport` väärtused vajavad ülevaatamist.

## Rikkeharjutus

Sisesta Thunderbirdis Jüri kontole tahtlikult **vale** kasutajanimi. Vaata autentimistõrget nii Thunderbirdis kui `journalctl -u dovecot` logis, mõista, mida see tõrge täpselt ütleb, ja seejärel taasta õige kasutajanimi. Meiliserveri edu ei mõõdeta selle järgi, kas kiri jõuaks Gmaili — välissaatmine on siin **teadlikult ja püsivalt** keelatud.

## Esitatav tõend

Meeskonnale kinnituseks jäta alles:

- Anna ja Jüri kirjavahetus (mõlemas suunas, päriselt Inboxis).
- TLS seadistus ja sertifikaadi sõrmejälje kontroll.
- `Maildir` tarne logikirje (`journalctl` või `mail.log`).
- Relay-keelu vastus (`554 5.7.1`) `swaks`-i väljundist.
- Lühike selgitus portide 25, 587 ja 993 rollide kohta.

## Suur pilt: kus me praegu oleme

Meeskonnal on nüüd kolmas päris teenus: veeb, andmebaas ja nüüd ka meil — kõik kolm turvatud omal moel (loopback, tulemüür, TLS, vähimad õigused), ja kõik kolm **tõendatud**, mitte ainult paigaldatud. Sa oskad ka juba ära tunda, kui üks kontroll (SMTP 250-vastus, avatud port) näib turvaline, aga tegelikult vajab eraldi negatiivset testi.

Kõik, mida seni ehitasime, eeldab vaikimisi, et miski ei lähe kunagi päriselt katki — aga kettad rikuvad, kustutatakse kogemata read, ja mõnikord peab terve serveri uuesti üles ehitama. Järgmine teema küsib meeskonna kõige ebamugavama küsimuse: "kui srv1 täna hommikul kaoks, kui kaua see meid seisma paneks?"

## Kokkuvõte

| Mõiste / käsk | Tähendus |
| --- | --- |
| `openssl x509 ... -fingerprint -sha256` | sertifikaadi sõrmejälje kontroll enne kliendis usaldamist |
| `journalctl -u postfix -u dovecot` | mitme teenuse logi korraga, sama `-u` muster |
| `swaks --quit-after RCPT` | negatiivse testi tööriist, lõpetab enne kirja sisu |
| `554 5.7.1 Relay access denied` | oodatud, tõendatud vastus võõrale välisdomeenile |
| Rikkeharjutus (vale kasutajanimi) | autentimistõrke äratundmine logist, mitte pime oletamine |

## Allikad

- [Thunderbird — Manual Account Configuration](https://support.mozilla.org/kb/manual-account-configuration)
- [swaks — Swiss Army Knife for SMTP](https://www.jetmore.org/john/code/swaks/)
- [Postfix — SMTP Relay ja Access Control](https://www.postfix.org/SMTPD_ACCESS_README.html)
