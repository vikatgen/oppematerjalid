---
title: Ülesanded
description: Mängukeskuse võrgu projekti kontroll-loend. Iga kohtumise tõend, mida esitad.
---

# Ülesanded

Kursuse ülesanne on üks projekt: **Karli mängukeskuse võrk**. Iga kohtumise lõpus esitad ühe tõendi. Töö kirjeldus on vastavas kohtumises, siin on kontroll-loend. Kõik tõendid kokku moodustavad üleantava projektikomplekti.

::: info Jätka oma senisest failist
Lood võrgu ise ja salvestad iga etapi uue nimega. Õpetaja ettevalmistatud võrgufaili vaja pole. Kui töö jääb pooleli, jätka oma viimasest salvestusest või lõpeta see juhendi abil.
:::

---

## 1. Esimene skeem ja nõuded

**Kohtumine:** [Mis mängukeskust ehitame?](./kohtumine-01-mis-mangukeskust-ehitame)

- [ ] Skeemil on vähemalt kaks mänguarvutit, Mirjami arvuti, server, külalise sülearvuti ja internet
- [ ] Igal seadmel on märgitud roll
- [ ] Kirjas on kolm nõuet, nende hulgas vähemalt üks külalise ligipääsu piirang
- [ ] On põhjendus, miks kõiki seadmeid ei panda ühte võrku

---

## 2. Põhjendatud skeem ja töökorras Packet Tracer

**Kohtumine:** [Seadmed, ühendused ja teekonnad](./kohtumine-02-seadmed-ja-teekonnad)

- [ ] Skeemil on kommutaator, ruuter ja pääsupunkt ning märgitud kaabel ja WiFi
- [ ] Märgitud on, kus lõpeb LAN ja algab WAN
- [ ] Kahe teekonna nooled on nummerdatud ja on märgitud, kumb vajab ruuterit
- [ ] Packet Tracer avaneb, sisselogimine õnnestub ja `02-kontroll.pkt` salvestub

---

## 3. Võrguplaan

**Kohtumine:** [Võrguplaan, ühenduse maht ja Packet Tracer](./kohtumine-03-vorguplaan-ja-packet-tracer)

- [ ] Füüsiline skeem (seadmed, kaablid, pääsupunkt)
- [ ] Loogiline skeem (kolm võrku ja reeglid)
- [ ] Ligipääsumaatriks (kust kuhu tohib)
- [ ] Salvestatud `03-vaatlus-sinunimi.pkt`
- [ ] Ühikuülesanded (Mbit/s ja MB/s) on arvutuskäiguga lahendatud
- [ ] "Mäng lagiseb" kolm tähendust on eristatud
- [ ] Põhjendus, miks WiFi nimi ei eralda võrku

---

## 4. Aadressitabel

**Kohtumine:** [IPv4 ja aadressiplaan](./kohtumine-04-ipv4-ja-aadressiplaan)

- [ ] Sama/erineva võrgu ülesanne on põhjendatud
- [ ] Kahe vea (vale gateway ja aadresside konflikt) selgitus
- [ ] Täidetud aadressitabel kõigi kolme võrguga
- [ ] Vahe aadressi, võrguaadressi, maski ja gateway vahel on selgitatud

---

## 5. Kaks ühendatud LAN-i

**Kohtumine:** [Esimesed LAN-id](./kohtumine-05-esimesed-lanid)

- [ ] `05-lan-routing.pkt`
- [ ] Ping sama võrgu seadmele ja ping teise võrgu seadmele, tulemused kirjas
- [ ] Ruuteri liidesed on up/up (`show ip interface brief`)
- [ ] Ühe teadliku vea (gateway, mask või `shutdown`) mõju on selgitatud

---

## 6. DHCP

**Kohtumine:** [DHCP](./kohtumine-06-dhcp)

- [ ] `06-dhcp.pkt`
- [ ] Kõik olemasolevad tavalised arvutid ja kummassegi LAN-i lisatud uus klient kasutavad DHCP-d
- [ ] Iga kliendi tegelik IP, mask, vaikelüüs ja DNS-aadress on tabelis; IP kuulub oma LAN-i `.21–.200` vahemikku ning sama LAN-i aadressid ei kordu
- [ ] Mõlema pooli alamvõrk, lüüs ja DNS ning kõik neli välistust on kontrollitud; serveri `192.168.20.10` on vaba ja välistatud
- [ ] Ruuteri renditabelist on leitud klientide aadressid
- [ ] Sama LAN-i ja teise LAN-i ühenduvus on kontrollitud ning mõlemast LAN-ist tehtud katsete lähte- ja sihtseadmed ning tulemused on kirjas
- [ ] Vale lüüsi katse ennustus, vaatlus ja põhjendus on kirjas; pärast kliendiseadistuse uuendamist ning vea taastamist on ühenduvus uuesti kontrollitud
- [ ] Oskad põhjendada serveriaadressi välistamist, eristada `default-router` käsku ruuteri liidese IP seadistamisest ning DNS-aadressi saamist DNS-teenuse toimimisest
- [ ] Ruuteri seadistus ja `.pkt` fail on salvestatud ning taasavamise järel kontrollitud

---

## 7. Server, HTTP ja DNS

**Kohtumine:** [Server, HTTP ja DNS](./kohtumine-07-server-http-dns)

- [ ] `07-services.pkt`
- [ ] Leht avaneb IP kaudu ja nime kaudu mõlemast kliendivõrgust
- [ ] Veaotsingu selgitus: kuidas eristada IP, HTTP ja DNS viga
- [ ] Server on staatilisel `192.168.20.10` aadressil; Gaming/Staff kliendid jäävad DHCP-le ja kasutavad seda DNS-aadressi
- [ ] Veakatse järel on DNS ja HTTP taastatud ning leht avaneb mõlemast LAN-ist

---

## 8. Päringu vaatlemine

**Kohtumine:** [DNS-i ja HTTP vaatlemine](./kohtumine-08-paringu-vaatlus-ja-valisvork)

- [ ] Oma `08-observation.pkt`
- [ ] Vaatluse DNS/TCP/HTTP sammud ja tegelikud IP-d ning pordid on kirjas
- [ ] DNS-i veakatse ja IP kaudu kontroll on tehtud; DNS ja HTTP on taastatud
- [ ] MAC-aadresside muutumise kohta on üks tähelepanek

---

## 9. Guest WiFi

**Kohtumine:** [Guest WiFi](./kohtumine-09-guest-wifi)

- [ ] Oma `09-guest.pkt`
- [ ] Oskar on WiFi-ga ühendatud ja saab Guest DHCP-st õige IP, maski ning lüüsi
- [ ] Guest DNS on selles etapis sisemine `192.168.20.10`
- [ ] Oskar avab sisemise lehe nii IP kui nime kaudu; esialgne ligipääsurisk on kirjeldatud
- [ ] Gaming/Staff töötavad edasi ning veakatsed on taastatud

---

## 9A. Välise testvõrgu ehitamine

**Praktiline töö:** [Ehitame ise välise testvõrgu](./valise-testvorgu-ehitamine)

- [ ] Oma `09a-external.pkt`, kus oled lisanud R-Outside ja SRV-Outside
- [ ] Ruuterite ühendus on up/up ning edasi- ja tagasiteed töötavad
- [ ] Server `203.0.113.10` pakub DNS-i ja HTTP-d; `valis.test` kirje on mõlemas DNS-serveris
- [ ] Guest DNS on muudetud aadressile `203.0.113.10`, klient on seadistuse uuesti küsinud
- [ ] Guest, Gaming ja Staff avavad välise lehe; Gaming/Staff sisemine leht töötab edasi
- [ ] Töö lõppkontroll on täidetud; mõlemad ruuterid ja fail on salvestatud

---

## 10. Külalisvõrgu piirang

**Kohtumine:** [Külaline pääseb välisvõrku, aga töötajate serverisse mitte](./kohtumine-10-guest-eraldamine-ja-koormus)

- [ ] Toimiv ja salvestatud `10-isolated.pkt`
- [ ] Nelja kontrolli tegelikud tulemused enne ja pärast: Guest DHCP, Guest väline leht, Guest Staff leht ja Staff kliendi sama serverileht
- [ ] Oskar saab õige IP, maski, lüüsi ja välise DNS-i ning avab välise lehe nime kaudu
- [ ] Staff serveri leht avaneb Mirjamilt, kuid ei avane Oskarilt samal IP-aadressil
- [ ] Oskad nimetada riski, rakendatud piirangu ja põhjendada kontrollide tulemust

Reeglite rakendamine on juhendatud. Käsusüntaksi mälu järgi kirjutamist ei nõuta. Gaming võrgu ja haldusjuurdepääsu lisakontrollid teeb õpetaja. [Koormusarvutus](./lisaharjutus-vorgukoormus) on valikuline hilisem harjutus.

---

## 11. Üleandmine ja veaprotokoll

**Kohtumine:** [Üleandmine](./kohtumine-11-uleandmine)

- [ ] Kogu projektikomplekt on koos (vt üleandmise kontrolltabel)
- [ ] Staatilised aadressid ja DHCP-vahemikud on eristatud; Gaming/Staff sisemine DNS ning Guest väline DNS on dokumenteeritud
- [ ] Taastamise juhis sisaldab kliendiseadistuse uuendamist ja lubatud/keelatud teenuste järelkontrolle
- [ ] Individuaalne veaprotokoll: sümptom, põhjus, parandus, järelkontroll
- [ ] Riskitabel vähemalt kolme riskiga
- [ ] Enesehindamine

---

Küberturvalisuse ülesanded on [eraldi lehel](/kuberturvalisus/assignments), sest see osa on eraldiseisev lugemismaterjal.
