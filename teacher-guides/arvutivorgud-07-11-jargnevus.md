# Kohtumised 7–11: jätk pärast DHCP-d

## Töökorraldus

Õpetaja ei valmista võrgufaile ette. Õppija loob ja täiendab oma projekti; kõik serveriaadressid ja ehitamise sammud on õppija materjalis. Õpetaja aitab tunnis valida õige liidese ja selgitab veateateid.

Töö 9A on eraldi 90-minutiline praktiline töö kohtumiste 9 ja 10 vahel. Koos 11 nummerdatud põhiteemaga on plaanis 12 töökohtumist. Seda lisatööd ei suruta ligipääsupiirangute tunni sisse.

## Failide järgnevus

`06-dhcp.pkt` → `07-services.pkt` → `08-observation.pkt` → `09-guest.pkt` → `09a-external.pkt` → `10-isolated.pkt` → üleandmine.

Salvestatakse iga õppija enda fail, mitte etteantud stardifail. Kui töö jääb pooleli, lõpetatakse senine etapp vastava juhendi järgi. Toimiva võrgu koopiad annavad võimaluse oma katseid tagasi võtta.

## Aadressid ja DNS-i vahetus

| Etapp | Gaming ja Staff | Guest |
| --- | --- | --- |
| Pärast kohtumist 7 | DHCP, oma LAN-i lüüs, DNS `192.168.20.10` | Veel puudub |
| Pärast kohtumist 9 | Sama seadistus | DHCP `.30.21–.200`, lüüs `.30.1`, esialgu DNS `192.168.20.10` |
| Pärast tööd 9A | Sama seadistus; sisemises DNS-is lisaks `valis.test` → `203.0.113.10` | Sama IP-vahemik/lüüs; DNS vahetatud aadressile `203.0.113.10` ja kliendi seadistus uuendatud |
| Pärast kohtumist 10 | Sisemine ning väline leht töötavad | Väline leht töötab, Gaming ja Staff ligipääs on piiratud |

Sisemine server on alati staatiline `192.168.20.10/24`, lüüs `192.168.20.1`. Väline server on staatiline `203.0.113.10/24`, lüüs `203.0.113.1`, pakub DNS-i ja HTTP-d. Kõigi kolme LAN-i DHCP-vahemik on oma võrgu `.21–.200`, välistused `.1–.20` ja `.201–.254`.

Henri ja Mirjami tegelikud kliendiaadressid pole fikseeritud. Säilita ka kuuendal kohtumisel lisatud uued kliendid.

## Töö 9A tehniline lahendus

Õppija lisab teise ruuteri 2911 (`R-Outside`) ja serveri (`SRV-Outside`). Ruuterite serial-link on `198.51.100.0/24`: R-Center `.1`, R-Outside `.2`. 2911 ruuteritel kasutatakse HWIC-2T moodulit, senise Router-PT korral selle sobivat serial-moodulit. Liidese tegelik nimi leitakse pärast paigaldamist, DCE-otsale seatakse ajastus.

Keskruuterile lisatakse marsruut `203.0.113.0/24` võrku. Välisele ruuterile lisatakse kolm tagasiteed `192.168.10.0/24`, `192.168.20.0/24` ja `192.168.30.0/24` võrkudesse. Täielikud käsud on õppijale nähtavas töö 9A juhendis. Selles suletud õppelaboris NAT/PAT-i ei seadistata; päris avaliku internetiga liitumist ei simuleerita täielikult.

Riistvara lisamise eel salvestab õppija keskruuteri startup-config ja `.pkt` faili. Moodul paigaldatakse toide väljas. Seniseid kolme LAN-i ühendusi ei eemaldata.

## Läbiviimise tähelepanekud

- Kohtumine 7: vabasta enne serveri lisamist Mirjami vana `.10`, kui see oli kasutusel. DNS-aadressi saamine ei tõenda DNS-teenuse toimimist.
- Kohtumine 8: vahemälus nimi ei pruugi uut DNS-päringut tekitada. Vaatluseks sobib uus DNS-kirje või klient.
- Kohtumine 9: sisemise DNS-i ajutine kasutamine on teadlik vaheetapp; Staff keeldu ei tohi veel lisada.
- Töö 9A: tee iga ühenduse järel väike kontroll. Ruuterite link, serveri ühendus, marsruudid ja nimepäringud kontrollitakse eraldi.
- Kohtumine 10: alusta õppija enda `09a-external.pkt` failist. Õpetaja halduspiirangute demo tehakse tunnis õpilase enda ruuteril koos juhendamisega, mitte eelnevalt ettevalmistatud failis. Täielik tehniline juhend asub failis `arvutivorgud-10-kulalisvorgu-piirang.md`.
- Kohtumine 11: paarilised tekitavad õpetaja valitud ühe varem harjutatud vea oma võrgu koopiasse ja vahetavad rolle. Toimiv algfail jääb alles.

## Käsitsi läbimängu kontrollnimekiri

Need kontrollid ei ole veel Packet Traceris kinnitatud.

- [ ] Õppija saab järgnevuse läbida ainult oma failide ja avaliku juhendi abil.
- [ ] Moodul sobib valitud mudelile, nimed on õiged ja DCE ajastusega serial-link on up/up.
- [ ] Väline server vastab R-Outside ruuterile ja pärast marsruutide lisamist kõigile kolmele LAN-ile.
- [ ] Guest DNS muutub töö 9A jooksul sisemiselt välisele; kliendi uuendatud seadistus näitab `203.0.113.10`.
- [ ] Gaming/Staff DNS jääb sisemiseks ja mõlemad testnimed toimivad.
- [ ] Kohtumise 10 järel Guest väline HTTP/DNS ja DHCP töötavad, Staff HTTP jääb Gamingust ja Staffist kättesaadavaks ning Guestist keelatuks.
- [ ] Võrguseadmete halduse piirangud või mudeli piirangud on dokumenteeritud.
- [ ] Seadistused ja failid salvestatud, taasavamisel toimivus kontrollitud.
