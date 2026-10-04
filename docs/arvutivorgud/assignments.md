---
title: Ülesanded
description: Mängukeskuse võrgu projekti kontroll-loend. Iga kohtumise tõend, mida esitad.
---

# Ülesanded

Kursuse ülesanne on üks projekt: **Karli mängukeskuse võrk**. Iga kohtumise lõpus esitad ühe tõendi. Töö kirjeldus on vastavas kohtumises, siin on kontroll-loend. Kõik tõendid kokku moodustavad üleantava projektikomplekti.

::: warning Valmis vahefail ei asenda tegemist
Kui kasutad mõnes etapis valmis vahefaili, märgi see dokumentatsiooni ja tõenda, mida selles etapis ise muutsid.
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
- [ ] Mõlema võrgu klient on saanud aadressi, maski, gateway ja DNS-i
- [ ] Välistused on seadistatud ja põhjendatud
- [ ] Mõlema võrgu klient jõuab teise võrgu seadmeni

---

## 7. Server, HTTP ja DNS

**Kohtumine:** [Server, HTTP ja DNS](./kohtumine-07-server-http-dns)

- [ ] `07-services.pkt`
- [ ] Leht avaneb IP kaudu ja nime kaudu mõlemast kliendivõrgust
- [ ] Veaotsingu selgitus: kuidas eristada IP, HTTP ja DNS viga

---

## 8. Päringu teekond ja välisvõrk

**Kohtumine:** [Päringu vaatlus ja välisvõrk](./kohtumine-08-paringu-vaatlus-ja-valisvork)

- [ ] `08-external.pkt`
- [ ] Päringu teekond: DNS, TCP, HTTP, igal sammul protokoll, port ja IP
- [ ] Väline testleht avaneb
- [ ] Selgitatud, mille poolest erineb simuleeritud välisvõrk päris internetist

---

## 9. Guest WiFi

**Kohtumine:** [Guest WiFi](./kohtumine-09-guest-wifi)

- [ ] `09-guest.pkt`
- [ ] Guest parameetrite tabel (IP, mask, gateway, DNS, SSID, krüpteering)
- [ ] Külaline avab välise testlehe
- [ ] Esimene risk on kirjeldatud

---

## 10. Guest eraldamine ja koormus

**Kohtumine:** [Guest eraldamine ja koormus](./kohtumine-10-guest-eraldamine-ja-koormus)

- [ ] `10-isolated.pkt`
- [ ] Testmaatriks on täidetud nii lubatud kui keelatud tegevuste kohta
- [ ] Sama sisemine teenus töötab Gamingust ja Staffist ning ei tööta Guestist
- [ ] Haldusmuudatuse protokoll (haldusparool, kaughalduse piirang)
- [ ] Koormusarvutus eeldustega: alla ja üles eraldi, varu ja kitsaskoht

---

## 11. Üleandmine ja veaprotokoll

**Kohtumine:** [Üleandmine](./kohtumine-11-uleandmine)

- [ ] Kogu projektikomplekt on koos (vt üleandmise kontrolltabel)
- [ ] Individuaalne veaprotokoll: sümptom, põhjus, parandus, järelkontroll
- [ ] Riskitabel vähemalt kolme riskiga
- [ ] Enesehindamine

---

Küberturvalisuse ülesanded on [eraldi lehel](/kuberturvalisus/assignments), sest see osa on eraldiseisev lugemismaterjal.
