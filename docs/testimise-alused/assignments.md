# Ülesanded

Iga kohtumise lõpus lisad **testiplaanile** ühe osa. Testiplaan käsitleb Rannamõisa Käsitöökeskuse töötubade broneerimise rakendust (või sinu enda valitud väljamõeldud rakendust). Kasuta ainult väljamõeldud andmeid.

Valmis testiplaan on üks dokument, kus iga osa on eraldi pealkirja all.

---

## 1. Sõnastik (HK 1.1) {#1}

**Tund:** [Testimise terminoloogia](./kohtumine-01-terminoloogia)

**Kontroll:**

- [ ] Sõnastikus on vähemalt 5 terminit, igaühel **oma** näide rakendusest
- [ ] Viga, defekt ja rike on eristatud ühe näitega
- [ ] Üks täielik testjuhtum: eeltingimus, sisend, ootustulemus
- [ ] Verifitseerimine ja valideerimine on eristatud näitega

---

## 2. Kvaliteediomadused (HK 1.1) {#2}

**Tund:** [Testimine kvaliteedi kindlustamiseks](./kohtumine-02-kvaliteet)

**Kontroll:**

- [ ] Valitud on 3 ISO/IEC 25010 omadust ja valik on põhjendatud
- [ ] Iga omaduse kohta on üks **mõõdetav** kontrollküsimus
- [ ] QA, QC ja testimine on eristatud ühe lausega rakenduse näitel

---

## 3. Riskikaart ja veaaruanded (HK 1.1) {#3}

**Tund:** [Vigade tekkimine ja veaaruanne](./kohtumine-03-vigade-tekkimine)

**Kontroll:**

- [ ] Riskikaardil on kõik defekti allikad (nõuded, disain, kood, andmed, keskkond, muudatus, suhtlus, test), igaühe kohta rakenduse näide
- [ ] Kaks veaaruannet, kummaski on pealkiri, keskkond, sammud, oodatud, tegelik ja tõendid
- [ ] Igal aruandel on tõsidus ja prioriteet ning vahe on põhjendatud

---

## 4. Põhimõtted: mida me ei testi (HK 1.1) {#4}

**Tund:** [Testimise seitse põhimõtet](./kohtumine-04-pohimotted)

**Kontroll:**

- [ ] Vähemalt 5 asja, mida ei testi või testid vähe, igaühel põhjendus
- [ ] Iga põhjendus on seotud ühe seitsmest põhimõttest (nimetatud)
- [ ] Riskikese (defektide koondumine) on märgitud
- [ ] On selge, millises osas kontekst lubab kergemat testimist

---

## 5. Testjuhtumid tehnikatega (HK 1.1) {#5}

**Tund:** [Testimise meetodid](./kohtumine-05-meetodid)

**Kontroll:**

- [ ] Ekvivalentsiklasside tabel väljale "osalejate arv" (1 kuni 10)
- [ ] Piirväärtuste tabel vähemalt 6 väärtusega ja ootustulemustega
- [ ] Olekuüleminekute joonis broneeringule ja 2 keelatud üleminekut
- [ ] Märgitud, millised testid on must, valge ja hall kast

---

## 6. Staatiline ja dünaamiline, testitasemed (HK 1.1) {#6}

**Tund:** [Staatiline ja dünaamiline testimine](./kohtumine-06-staatiline-ja-dunaamiline)

**Kontroll:**

- [ ] Vähemalt 3 staatilist tegevust rakenduse jaoks (nt koodi ülevaatus, linter)
- [ ] Vähemalt 3 dünaamilist tegevust
- [ ] Kolme funktsiooni kohta on iga testitaseme (ühik, integratsioon, süsteem, vastuvõtt) jaoks üks konkreetne test
- [ ] Selgitus, miks üks tase ei asenda teist

---

## 7. Testitüübid ja regressioonikomplekt (HK 1.1) {#7}

**Tund:** [Funktsionaalsed, mittefunktsionaalsed ja muutustega seotud testid](./kohtumine-07-testituubid)

**Kontroll:**

- [ ] Tabelis on funktsionaalne, mittefunktsionaalne, kinnitus-, regressioon- ja suitsutest, igaühel konkreetne test ja oodatud tulemus
- [ ] Regressioonikomplektis on 10 testi ja valik on põhjendatud
- [ ] Suitsutestis on 3 kontrolli
- [ ] Mittefunktsionaalsetel testidel on arvuline sihtväärtus

---

## 8. Jõudlus ja turvalisus (HK 1.1) {#8}

**Tund:** [Jõudluse ja turvalisuse testimine](./kohtumine-08-joudlus-ja-turvalisus)

**Kontroll:**

- [ ] Jõudlustesti kirjeldus: liik, kasutajate arv, p95, veamäär, testkeskkond
- [ ] Turvatesti kirjeldus: 3 OWASP Top 10 riski ja iga kohta konkreetne kontroll
- [ ] Märgitud, millised saab automatiseerida
- [ ] Märgitud, et turvatesti tehakse ainult volitatud süsteemis

---

## 9. Standardite valik (HK 1.2) {#9}

**Tund:** [Testimise standardid](./kohtumine-09-standardid)

**Kontroll:**

- [ ] Tabelis on vähemalt 3 valitud standardit või juhendit, igaühe kohta mida see katab ja miks sobib
- [ ] Vähemalt 1 standard on põhjendatult välja jäetud
- [ ] Standard, juhend ja sertifikaat on eristatud
- [ ] ISO/IEC/IEEE 29119 osadest on nimetatud vähemalt kolm ja mida need katavad

---

## 10. Valmis testiplaan ja lähteülesanne (HK 1.1, 1.2) {#10}

**Tund:** [Kokkuvõte ja lähteülesanne](./kohtumine-10-kokkuvote-ja-lahteulesanne)

**Kontroll testiplaanile:**

- [ ] Kõik osad 1 kuni 9 on ühes dokumendis, ühe lehekülje kokkuvõte algul
- [ ] Osad on omavahel kooskõlas (nt valitud kvaliteediomadused kajastuvad testitüüpides)

**Kontroll lähteülesandele A või B (seitse sammu):**

- [ ] 1. Rakendus, kasutajad ja keskkond on kirjeldatud
- [ ] 2. Riskid on tabelis, igaühel mõju ja tase
- [ ] 3. Valitud kvaliteediomadused (ISO/IEC 25010) on põhjendatud
- [ ] 4. Testitüübid ja -tasemed on seotud riskidega
- [ ] 5. Testimeetodid ja -tehnikad on nimetatud ja põhjendatud
- [ ] 6. Standardid ja juhendid on valitud valdkonna ja riski järgi, vähemalt üks on põhjendatult välja jäetud
- [ ] 7. Mida ei testi, miks, ja jääkrisk on välja toodud

**Lisaküsimused A (hooldekodu):** kas rakendus võib olla meditsiiniseade? Mis juhtub, kui võrk katkeb? Millised standardid muutuvad kohustuslikuks, kui vastus on jah?

**Lisaküsimused B (õpilaste arvestus):** kes tohib mida näha? Mida tähendab semestri lõpu tipp jõudlustesti jaoks? Miks ei tohi testis kasutada päris õpilaste andmeid?
