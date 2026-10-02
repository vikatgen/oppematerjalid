---
title: Testimine II ülesanded
description: "Testimine II portfoolio kontrollnimekiri: tõendid kohtumiste ja hindamiskriteeriumide (HK 3.1-3.6) kaupa."
outline: deep
---

# Testimine II: portfoolio ja ülesanded

Kõik ülesanded on kohtumiste lehtedel (**Praktikum**). See leht kogub tõendid kokku, et näeksid enne esitamist, mis on valmis.

::: tip Kuidas esitada
Esitad **oma privaatse praktikumirepo**, kuhu õpetaja on kaastöötaja (testid `harjutused/`, täiendatud `postman/`, päevik ning stsenaariumid ja veaaruanded GitHubi Issues all). Kontrolli, et `npm test -- harjutused/kohtumine-03 harjutused/kohtumine-04 harjutused/kohtumine-05 harjutused/kohtumine-06 harjutused/kohtumine-07 harjutused/kohtumine-08` läbib kõik testid.
:::

## Tõendid kohtumiste kaupa

### 1. Nõuetest testiplaanini (HK 3.1) {#1}

**Tund:** [Nõuetest testiplaanini](./kohtumine-01-nouded-ja-testiplaan)

- [ ] Oma privaatne repo, õpetaja on kaastöötaja
- [ ] Päevik on loodud ja kinnitatud
- [ ] Päeviku kommentaar **Testiplaan** (üks leht, kõik osad täidetud, riskid põhjendatud)
- [ ] Vähemalt 14 `[TS]` issue'd, iga nõue NR-1...NR-14 on kaetud
- [ ] Vähemalt viis stsenaariumi on käsitsi käivitatud ja tulemus on issue kommentaaris
- [ ] Kolm `[KÜSIMUS]` issue'd nõuete kohta

---

### 2. Automatiseerida või mitte (HK 3.3) {#2}

**Tund:** [Automatiseerida või mitte](./kohtumine-02-vahendid-ja-keskkond)

- [ ] Esimese `npm test` käivituse tulemus
- [ ] GitHub Actionsi tulemus (CI) ja märge, kas see on sama mis kohalik
- [ ] Märkused testi tahtliku kukutamise kohta
- [ ] Postmani kollektsiooni käivituse tulemus
- [ ] Päevikus kommentaar **Vahendid** (võrdlus)
- [ ] Stsenaariumide A/K kommentaarid põhjendustega (issue'des) ja tasuvuspunkti arvutus

---

### 3. Ühiktestid ja testiandmed (HK 3.4, 3.2) {#3}

**Tund:** [Ühiktestid ja testiandmed](./kohtumine-03-uhiktestid)

- [ ] Päevikus kommentaar **Klassid ja piirid**
- [ ] `harjutused/kohtumine-03/calculatePrice.test.js`: kõik ülesanded läbivad
- [ ] Märge võrdlusoperaatori muutmise katse kohta

---

### 4. Mockid (HK 3.5, 3.4) {#4}

**Tund:** [Mockid ja ise kirjutatud mock-klassid](./kohtumine-04-mockid)

- [ ] `fakes.js`: kolm teostatud mock-klassi
- [ ] `RegistrationService.test.js`: seitse ülesannet läbivad
- [ ] Märkus: milline test kasutab fake'i, spy-d ja ebaõnnestuvat teavitajat
- [ ] Üks koht, kus fake'i viga viis testi eksiteele

---

### 5. Otsustustabel ja olekud (HK 3.2) {#5}

**Tund:** [Otsustustabel ja olekud](./kohtumine-05-otsustustabel-ja-olekud)

- [ ] Täielik tagasimakse otsustustabel (kombinatsioonid kontrollitud)
- [ ] Olekudiagramm ja lubatud/keelatud üleminekute arvud
- [ ] `calculateRefund.test.js` ja `workshopState.test.js` läbivad, iga reegli kohta on test
- [ ] Meetodite võrdlus näidetega

---

### 6. Integratsioonitestid I (HK 3.3, 3.4) {#6}

**Tund:** [Integratsioonitestid I: Supertest](./kohtumine-06-integratsioon-i)

- [ ] `workshops.test.js`: viis ülesannet läbivad
- [ ] Iga test loob oma andmed
- [ ] Märkus, mida ühiktestid ei leia
- [ ] Märkus staatuse ja `error.code` kontrolli kohta

---

### 7. Integratsioonitestid II (HK 3.3, 3.4) {#7}

**Tund:** [Integratsioonitestid II](./kohtumine-07-integratsioon-ii)

- [ ] `registrations.test.js`: kaheksa ülesannet läbivad
- [ ] Testid kontrollivad ettevalmistuse vastuseid
- [ ] Märkus tahtliku katse kohta (test, mis läbis valel põhjusel)
- [ ] Märkus samaaegsuse kohta

---

### 8. Mõõtmised (HK 3.1, 3.6) {#8}

**Tund:** [Mõõtmised: katvus, jälgitavus ja mutatsioonid](./kohtumine-08-moodikud)

- [ ] Katvuse raport nõrga komplekti ja oma testide kohta
- [ ] Päevikus kommentaar **Mutandid**: seitse mutanti nõrga komplekti vastu
- [ ] `mutants.test.js`: seitse testi, igaüks läbib puhta koodiga ja kukub oma mutandiga
- [ ] Mutatsiooniskoor kahe komplekti kohta
- [ ] Nõuete katvus arvutatud (testide nimed viitavad nõuetele)
- [ ] Päevikus kommentaar **Mõõdikud** tõlgendustega

---

### 9. Jõudlus (HK 3.3) {#9}

**Tund:** [Jõudlus: Postman ja Newman](./kohtumine-09-joudlus)

- [ ] Täiendatud Postmani kollektsioon (vähemalt neli uut päringut)
- [ ] Newmani tulemuse fail ja p95 tabel (20 ja 50 korda)
- [ ] Jõudlusraport (aeglane päring, arvud, künnis)
- [ ] Postman vs Vitest võrdlus

---

### 10. Vea elutsükkel ja testiaruanne (HK 3.6, 3.1) {#10}

**Tund:** [Vea elutsükkel ja testiaruanne](./kohtumine-10-vead-ja-testiaruanne)

- [ ] Kolm `[VIGA]` issue'd (vorm *Veaaruanne*) Reeda kolme muudatuse kohta, tõsidus ja prioriteet põhjendatud
- [ ] Märkus: millised testid kukusid iga muudatuse tõttu
- [ ] Kui mõni muudatus jäi testidel märkamata: uus test, mis kukub vigase koodiga
- [ ] Pull request `Closes #...` viidetega, issue'd on suletud
- [ ] Päevikus kommentaar **Testiaruanne** koos soovitusega ja viidetega issue'dele

---

## Tõendid hindamiskriteeriumide kaupa

| HK | Kriteerium | Peamised tõendid |
| --- | --- | --- |
| **3.1** | Rakendab testimisplaani ja teststsenaariumeid | Testiplaan, stsenaariumi-issue'd (1), nõuete katvus (8), testiaruanne (10) |
| **3.2** | Vähemalt 2 testimismeetodit | Ekvivalentsiklassid ja piirväärtused (3), otsustustabel ja olekud (5) |
| **3.3** | Vähemalt 2 testivahendit | Vitest koos Supertestiga (3-8) ja Postman koos Newmaniga (2, 9) |
| **3.4** | Loob ühiktestid | `calculatePrice`, `calculateRefund`, `workshopState`, `RegistrationService` testid (3, 4, 5) |
| **3.5** | Mock-klassid | `FailingNotifier`, `FakeWorkshopRepository`, `FakeRegistrationRepository` (4) |
| **3.6** | Testib enda ja teiste rakendusi | Oma rakenduse testid (3-8), vea elutsükkel: issue'd, kukkuvad testid ja PR (10). Teise inimese rakenduse testimine käib sama lähenemisega (`TARGET_URL`), aga seda moodul eraldi ei harjuta |
