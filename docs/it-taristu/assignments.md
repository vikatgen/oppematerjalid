# Ülesanded

Iga kohtumise lõpus lisad **IT-teenuse kaardile** ühe osa. Tööd tehakse väljamõeldud ettevõtte andmetega (Pihlakas Ehituspood OÜ või oma väljamõeldud ettevõte). Ära kasuta päris ettevõtte siseandmeid.

Valmis kaart on ühtne dokument, kus iga osa on eraldi pealkirja all.

---

## 1. Organisatsioon ja äriprotsessid (HK 1.1) {#1}

**Tund:** [Organisatsioon ja IT roll äriprotsessides](./kohtumine-01-organisatsioon-ja-it)

**Kontroll:**

- [ ] Ettevõttel on vähemalt 3 eesmärki, igaühel mõõdik
- [ ] Organisatsiooni struktuur on joonisel või loetelus
- [ ] Põhiprotsess on joonistatud (5–7 sammu) ja igal sammul on IT-süsteem
- [ ] Tabelis on iga süsteemi kohta toetatav protsess ja seisaku mõju
- [ ] Selgitus seostab IT ettevõtte eesmärkidega (mitte tehnoloogia pärast)

---

## 2. Teenusekvaliteedi parameetrid (HK 1.2) {#2}

**Tund:** [Teenusekvaliteedi parameetrid](./kohtumine-02-teenusekvaliteet)

**Kontroll:**

- [ ] 4–6 parameetrit sihtväärtusega, igaüks seotud protsessi vajadusega
- [ ] Kättesaadavuse lubatud seisak on arvutatud aasta ja kuu kohta, valem on näha
- [ ] Seisaku tunnihind on arvutatud ja aja mõju (tipp ja öö) on märgitud
- [ ] RTO ja RPO on eristatud ja põhjendatud
- [ ] Ükski parameeter ei ole tundepõhine ("kiire", "alati")

---

## 3. SLA mustand (HK 1.2) {#3}

**Tund:** [Teenustaseme lepingud](./kohtumine-03-teenustaseme-lepingud)

**Kontroll:**

- [ ] SLI, SLO ja SLA on eristatud ja iga kohta on näide
- [ ] Mustand sisaldab teenuse kirjeldust, parameetreid, mõõtmist, välistusi, hüvitist ja nõudmise korda
- [ ] Hüvitiste tabel on olemas
- [ ] Ühe juhtumi kohta on arvutatud hüvitis ja tegelik kahju ning vahe on selgitatud
- [ ] Märgitud on vähemalt üks allhankija ja tema mõju lubadusele (UC)

---

## 4. Litsentside nimekiri (HK 1.2) {#4}

**Tund:** [Autoriõigus ja litsentsilepingud](./kohtumine-04-autorioigus-ja-litsentsid)

**Kontroll:**

- [ ] Vähemalt 5 rida: tarkvara, litsentsi tüüp, hulk, tähtaeg, olukord
- [ ] Vähemalt üks avatud lähtekoodi teek ja selle litsentsi tingimuste tõlgendus
- [ ] Vähemalt üks puuduolev või ületatud litsents on leitud ja lahendus pakutud
- [ ] Selgitus, millist riski litsentsi rikkumine ettevõttele tekitab

---

## 5. Turvameetmed ja kontrollnimekiri (HK 1.2) {#5}

**Tund:** [Etalonturve, turvatehnoloogiad ja kontrollnimekiri](./kohtumine-05-etalonturve-ja-turvatehnoloogiad)

**Kontroll:**

- [ ] Kontrollnimekiri on täidetud, iga "jah" juures on tõend
- [ ] Kolm puudust on tegevusega, vastutaja ja tähtajaga
- [ ] Vähemalt kolm turvatehnoloogiat on seostatud äriprotsessiga
- [ ] Selgitus eristab etalonturbe standardit ja tehnoloogiat
- [ ] Mainitud on E-ITS ja selle suhe ISKE-sse

---

## 6. Taristu skeem (HK 1.3) {#6}

**Tund:** [Teenuste osutamise taristu ülesehitus](./kohtumine-06-taristu-ulesehitus)

**Kontroll:**

- [ ] Skeem näitab vähemalt viit kihti (töökoht, rakendus, andmed, platvorm, võrk, füüsiline)
- [ ] Skeemil on kasutaja päringu teekond
- [ ] SPOF-ide tabel on täidetud ja kaks SPOF-i on valitud kaitsmiseks, põhjendatud
- [ ] Märgitud on, kas taristu on kohalik, pilv või hübriid

---

## 7. Seire ja intsidendi plaan (HK 1.3) {#7}

**Tund:** [Taristu toimimine](./kohtumine-07-taristu-toimimine)

**Kontroll:**

- [ ] Teenus on liigitatud (IaaS/PaaS/SaaS) ja sinu vastutus on kirjas
- [ ] Kolm seiratavat näitajat hoiatuse piiri ja tähtsusega
- [ ] Intsidendi tähtsuse tasemed reageerimisaegadega
- [ ] Üks väljamõeldud intsidendi lühianalüüs ilma süüdlast otsimata
- [ ] Muudatuste reegel (millal ja kuidas tehakse)

---

## 8. Raamistikud ja mini-audit (HK 1.4) {#8}

**Tund:** [Haldus- ja auditeerimisraamistikud](./kohtumine-08-standardid-ja-raamistikud)

**Kontroll:**

- [ ] Vähemalt kolm standardit või raamistikku, igaühe puhul on öeldud, millist küsimust see lahendab
- [ ] Standard, raamistik ja hea tava on eristatud
- [ ] Teenuse meetmed on seotud ühe raamistikuga (nt NIST CSF funktsioonid)
- [ ] Mini-auditi aruandes on vähemalt 5 punkti tõendi ja leiuga

---

## 9. Katkestuse mõju (HK 1.5) {#9}

**Tund:** [Teenusetaseme mittevastavuse mõju](./kohtumine-09-mittevastavus)

**Kontroll:**

- [ ] Katkestuse kirjeldus (kestus, aeg, põhjus)
- [ ] Kättesaadavus on arvutatud ja võrreldud SLO-ga
- [ ] Kahju on kolmes kihis (otsene, lepinguline, kaudne), hinnangud on põhjendatud
- [ ] Kolm parandusmeedet on kirjas
- [ ] Päris juhtumist (nt CrowdStrike) on tehtud üks järeldus, mida oma teenuses rakendada

---

## 10. Rollid ja kokkuvõte (HK 1.6) {#10}

**Tund:** [Meeskonna rollid ja kokkuvõte](./kohtumine-10-meeskond-ja-kokkuvote)

**Kontroll:**

- [ ] RACI tabel vähemalt 5 tegevusele, igal real täpselt üks A
- [ ] Meeskonna kujunemise etapp on määratud ja põhjendatud
- [ ] Belbini rolli valik on põhjendatud
- [ ] Ühe lehekülje kokkuvõte seob kõik kümme osa
- [ ] Kogu IT-teenuse kaart on ühes dokumendis ja iga osa vastab oma kontrollloendile

---

## Kokkuvõte

| Mõiste | Tähendus |
| --- | --- |
| Äriprotsess | Tegevuste jada, mis annab kliendile väärtust |
| Kättesaadavus | Protsent ajast, mil teenus on kasutatav |
| RTO / RPO | Lubatud seisak / lubatud andmekadu |
| SLI / SLO / SLA | Mõõdik / siht / leping tagajärjega |
| OLA / UC | Sisemine leping / allhankeleping |
| Litsents | Luba kasutada tarkvara tingimustel |
| E-ITS | Eesti infoturbestandard |
| SPOF | Ühe rikkepunkt |
| IaaS / PaaS / SaaS | Pilveteenuse tasemed |
| ITIL / ISO 27001 / NIST CSF / COBIT | Haldus-, turve- ja juhtimisraamistikud |
| Audit | Sõltumatu hinnang, kas tegevus vastab nõuetele |
| RACI | Vastutuse jaotus: tegija, vastutaja, konsulteeritav, teavitatav |
