---
title: "Testimise seitse põhimõtet"
description: "Kohtumine 4: ISTQB seitse testimise põhimõtet Rannamõisa näidete kaudu. Testimine näitab defektide olemasolu, kõike ei saa testida, varajane testimine, defektide koondumine, pestitsiidiparadoks, kontekst ja eksimatuse eksitus."
outline: deep
---

# 4. Testimise seitse põhimõtet

::: info Õpiväljund
Pärast tundi oskad nimetada ISTQB seitse testimise põhimõtet, seletada igaüht oma näitega ja kasutada neid testimise planeerimisel (HK 1.1).
:::

Tiit tuleb Kaareli lauda ja ütleb: "Anu tahab teada, millal oleme testimisega valmis. Ta tahab kuulda, et rakendus on viga-vaba."

Kaarel mõtleb hetke. Tal on juba 40 testjuhtumit ja nad on kõik läbi. "Ma ei saa seda lubada," ütleb ta. Tiit küsib: "Miks mitte?"

Selle kohtumise vastus on seitse põhimõtet. ISTQB (rahvusvaheline testimise kvalifikatsiooni organisatsioon) koondas need aastakümnete kogemusest. Kaarel kasutab neid Tiidule vastates.

## 1. Testimine näitab defektide olemasolu, mitte puudumist

Testimine saab tõestada, et defekt **on**. Ta ei saa tõestada, et defekte **ei ole**. Kui 40 testi läbivad, tähendab see ainult, et **neis 40 olukorras** ei leitud viga.

| Olukord | Mida see tõestab |
| --- | --- |
| Test ebaõnnestub | Defekt on olemas |
| Kõik testid läbivad | Neis olukordades defekti ei leitud |

Kaarel ütleb Tiidule: "Ma võin öelda, et riskid on nii ja nii kaetud, aga mitte, et vigu ei ole."

## 2. Täielik testimine on võimatu

Kaarel proovib arvutada, mitu erinevat olukorda broneerimisel võib olla.

Ühe broneeringu vormis on:

- töötuba (8 valikut);
- kuupäev (30 päeva);
- osalejate arv (1 kuni 10);
- nimi (suvaline tekst);
- e-post (suvaline tekst);
- telefon (suvaline tekst).

Ainult kolm esimest annavad 8 × 30 × 10 = **2400 kombinatsiooni**. Tekstiväljade võimalikud sisendid on praktiliselt lõputud. Sinna lisanduvad brauserid, seadmed, ühenduse kiirused ja tegevuste järjekorrad. Kõiki on võimatu läbi proovida.

Seega ei testi me kõike. Me **valime**, mida testida, **riski järgi**: mis läheb kõige kallimalt maksma, kui see läheb valesti? (Tehnikaid vaatame [kohtumisel 5](./kohtumine-05-meetodid).)

## 3. Varajane testimine säästab aega ja raha

Kaarel loeb nõudeid enne koodi kirjutamist ja leiab vastuolu: ühes kohas on kirjas "kuni 10 osalejat", teises "kuni 12". Seda parandada maksab ühe lause muutmise. Kui see oleks jõudnud koodi, testidesse ja klientideni, oleks see maksnud palju rohkem ([kohtumine 2](./kohtumine-02-kvaliteet)).

Varajane testimine ei tähenda ainult koodi testimist varem. See tähendab ka **nõuete, disaini ja plaanide** kontrollimist (staatiline testimine, vt [kohtumine 6](./kohtumine-06-staatiline-ja-dunaamiline)).

## 4. Defektid koonduvad

Eelmisel kohtumisel märkas Kaarel, et kuus defekti kümnest tuleb samast moodulist. ISTQB toob välja, et **väike osa moodulitest sisaldab enamiku defektidest**. Tihti kutsutakse seda Pareto printsiibiks (80/20), aga täpne suhe varieerub projektiti. Täpseid protsente ei maksa eeldada.

Mida teha: sinna, kus defekte on rohkem, **lisa rohkem teste**. Broneerimise moodul on Rannamõisa riskikese, kuvamise moodul on lihtne.

## 5. Pestitsiidiparadoks (*tests wear out*)

ISTQB v4.0 nimetab selle põhimõtte "tests wear out", eelmistes versioonides "pesticide paradox".

Põllumees kasutab sama pestitsiidi aastast aastasse. Kahjurid kohanevad ja ei jää enam alla. Samamoodi: **kui korrata samu teste, ei leia need enam uusi defekte**.

Reet parandas kõik defektid, mille Kaareli 40 testi leidsid. Aga 41. defekt peitub kohas, mida need 40 testi ei puuduta. Seetõttu tuleb teste **uuendada**: lisada uusi juhtumeid, muuta andmeid, kasutada uurivat testimist (*exploratory testing*), kus testija proovib ise olukordi, mida skriptis ei olnud.

## 6. Testimine sõltub kontekstist

Kaarel mõtleb: kas Rannamõisa broneerimisrakendust tuleks testida samamoodi nagu haigla süsteemi?

| Kontekst | Mida see tähendab testimise jaoks |
| --- | --- |
| Töötubade broneerimine | Viga on ebamugav, aga kahju on piiratud. Piisab mõõdukast testimisest |
| Veebipood kaardimaksetega | Raha ja isikuandmed. Rohkem turvalisuse ja korrektsuse teste |
| Haigla ravimidoosi arvutus | Viga võib ohustada elu. Väga range testimine, ametlikud standardid |
| Mobiilimäng | Kasutatavus ja jõudlus olulisemad kui range dokumenteerimine |

Ühtset "õiget" viisi ei ole. Testimise ulatus ja viis **sõltub riskist ja kontekstist** (vt [kohtumine 9](./kohtumine-09-standardid)).

## 7. Eksimatuse eksitus (*absence-of-defects fallacy*)

Kaarel ja Reet leiavad ja parandavad kõik defektid. Kõik testid läbivad. Anu avab rakenduse ja ütleb: "See on tehniliselt korras, aga ma ei saa aru, kuidas ma töötoa tühistan. Mul on seda vaja iga päev."

Rakendus ei ole viga-vaba ja ei vasta ka vajadusele. See on **eksimatuse eksitus** (*absence-of-errors fallacy*): arvamus, et kui defekte ei leita, on süsteem edukas. Tõsi on aga, et süsteem võib vastata nõuetele ja siiski olla kasutu, kui nõuded ise ei olnud õiged. Siin tuleb meelde [kohtumise 1](./kohtumine-01-terminoloogia) **valideerimine**: kas ehitasime õige asja.

## Mida Kaarel Tiidule vastas

Kaarel ütles: "Ma ei saa lubada, et rakenduses ei ole vigu (1). Ma ei saa kõike testida (2), aga ma kontrollin kõige riskantsemat enne (3, 4) ja uuendan teste, et uusi vigu leida (5). Töötubade broneerimine ei vaja haigla range testimist (6). Ja lisaks tahan, et Anu ise kinnitaks, et see on see, mida ta vajab (7)."

## Põhimõtted tabelis

| # | Põhimõte | Lühidalt | Rannamõisa näide |
| --- | --- | --- | --- |
| 1 | Defektide olemasolu | Testimine ei tõesta vigade puudumist | 40 läbitud testi ei tähenda vigadeta |
| 2 | Täielik testimine on võimatu | Vali risk, mitte kõik | 2400 kombinatsiooni ainult kolmest väljast |
| 3 | Varajane testimine | Leia vead enne koodi | Nõuete vastuolu "10" ja "12" |
| 4 | Defektide koondumine | Vigu on ühes kohas rohkem | Kuus defekti kümnest broneerimises |
| 5 | Pestitsiidiparadoks | Samad testid lõpetavad leidmise | 41. defekt, mida 40 testi ei puuduta |
| 6 | Kontekst | Testimine sõltub riskist | Töötuba vs haigla |
| 7 | Eksimatuse eksitus | Vigadeta ei tähenda kasulikku | Anu ei leia tühistamist üles |

## Kokkuvõte

Kolm mõtet:

- **Testimine on riskipõhine valik.** Kõike ei saa ja ei tasu testida.
- **Teste tuleb uuendada.** Vanad testid väsivad.
- **Vigadeta ei ole sama mis kasulik.** Valideeri koos kliendiga.

## Lisa oma testiplaanile

Kirjuta **"Mida me ei testi ja miks"** osa: loetle vähemalt viis Rannamõisa rakenduse osa või olukorda, mida ei testi (või testid vähe), ja seo iga põhjendus ühe seitsmest põhimõttest. Märgi ka, kus on **riskikese** (põhimõte 4) ja kus **kontekst** lubab kergemat testimist (põhimõte 6).

## Allikad

- [ISTQB Certified Tester Foundation Level Syllabus v4.0.1](https://istqb.org/certifications/certified-tester-foundation-level-ctfl-v4-0/), peatükk 1.3: seitse testimise põhimõtet (v4.0 nimed inglise keeles: testing shows the presence, not the absence of defects; exhaustive testing is impossible; early testing saves time and money; defects cluster together; tests wear out; testing is context dependent; absence-of-defects fallacy). Põhimõtete sisu kontrolliti ka [ASTQB lehelt 1.3 Testing Principles](https://astqb.org/1-3-testing-principles/).
- [ISTQB sõnastik](https://glossary.istqb.org/): terminid.
- Rannamõisa, tegelased ja kombinatsioonide arv on väljamõeldud õppenäide.
