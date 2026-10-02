---
title: "Mõõtmised: katvus, jälgitavus ja mutatsioonid"
description: "Kohtumine 8: Tiit küsib, kui palju testid katavad. Koodikatvus, nõuete jälgitavus, käsitsi mutatsioonitestimine ja miks kõrge katvus ei tähenda häid teste. Praktikum: katvuse raport, seitse mutanti ja mõõdikute tabel."
outline: deep
---

# 8. Mõõtmised: katvus, jälgitavus ja mutatsioonid

::: info Õpiväljund
Pärast tundi oskad mõõta testide katvust, tõlgendada katvuse raportit, kontrollida testide tugevust käsitsi mutatsioonitestimisega ja siduda testid nõuetega jälgitavuse kaudu (HK 3.1, HK 3.6).
:::

Tiit küsib Kaarelilt: "Kui palju meie testid katavad? Kas me oleme valmis?"

Kaarel käivitab katvuse raporti. Hinna-, tagasimakse- ja olekufunktsioonid on **100% kaetud**. Tiit on rahul. Reet on rahulik.

Siis Reet ütleb: "Aga kas need testid on **head**?" Kaarel võtab hinnafunktsioonist ühe võrdlusoperaatori ja muudab selle valeks. Käivitab testid. **Kõik on endiselt rohelised.**

Selle kohtumise põhiküsimus: **mida katvus tegelikult ütleb** ja kuidas teada saada, kas testid vigu tegelikult tabavad.

## Miks mõõta

Testid on tegevus ja tegevust tuleb **jälgida**. ISTQB õppekava (peatükk 5) nimetab seda **testide seireks**: otsused ("kas oleme valmis?") põhinevad numbritel, mitte tundel. Mõõdik ei ole eesmärk, vaid **otsuse alus**.

| Mõõdik | Mida ütleb | Mida **ei** ütle |
| --- | --- | --- |
| Testide arv ja läbimise protsent | Kui palju teste on ja mitu kukub | Kas testid on head |
| **Koodikatvus** | Milline kood testide käigus käivitus | Kas käivitatud kood on **kontrollitud** |
| **Nõuete katvus** | Mitu nõuet on vähemalt ühe testiga seotud | Kas see test on tugev |
| **Mutatsiooniskoor** | Mitu tahtlikku viga testid tabasid | Kas nad tabavad **päris** vigu |
| Leitud vigade arv ja tõsidus | Kui palju ja kui tõsiseid vigu leiti | Kui palju on veel leidmata |
| Vastuseaja p95 | Kui kiire süsteem tegelikult on (kohtumine 9) | Kas see on õigesti toimiv |

Ükski mõõdik üksi ei vasta küsimusele "kas oleme valmis?". Koos annavad nad pildi.

## Koodikatvus

**Koodikatvus** (*code coverage*) mõõdab, **kui suur osa lähtekoodist käivitati** testide käigus. Vitest kasutab selleks `v8` mootorit, mis on Node.js-i sisse ehitatud.

| Mõõt | Mida loeb |
| --- | --- |
| **Lausekatvus** (*statements*) | Mitu protsenti lauseid käivitati |
| **Harukatvus** (*branches*) | Mitu protsenti `if`/`?:`/`||` otsuste suundi proovitud (nii tõene kui väär) |
| **Funktsioonikatvus** (*functions*) | Mitu protsenti funktsioone kutsuti vähemalt korra |
| **Realatvus** (*lines*) | Mitu protsenti ridu käivitati |

Käivitamine:

```bash
npx vitest run --coverage harjutused/kohtumine-08/weak
```

(Käsk `npm run coverage` käivitab **kõik** testid ja Vitest ei tee raportit, kui mõni neist kukub. Seetõttu anna soovitud testide failid käsureal.) Raport tuleb tabelina terminali ja HTML-ina kausta `coverage/` (ava `coverage/index.html`).

Tabeli lugemine:

| Veerg | Tähendus |
| --- | --- |
| `% Stmts`, `% Branch`, `% Funcs`, `% Lines` | Neli mõõtu |
| `Uncovered Line #s` | Read, mida ükski test ei käivitanud |
| Failid, mida tabelis pole | On 100% kaetud (täielikult kaetud failid jäetakse tabelist välja) |

**Harukatvus on rangem kui realatvus.** Rida `if (x) return 1;` võib olla 100% kaetud, kui test kasutab `x = true`, kuid haru `x = false` jääb puutumata.

## Katvus ei ole kvaliteet

Kaarel vaatab nõrka testikomplekti, mis on praktikumirepos (`harjutused/kohtumine-08/weak.test.js`). Selle testid näevad nii:

```js
expect(calculatePrice({ basePrice: 10, ages: [30] })).toBeGreaterThan(0);
expect(calculateRefund({ price: 50, paid: true, daysBefore: 10 })).toBeTypeOf("number");
```

Need testid **käivitavad** funktsioone, aga kontrollivad ainult, et tulemus on "positiivne" või "arv". Sama test läbib, kui hind on 1 või 1000, õige või vale.

Tulemus: hinna-, tagasimakse- ja olekufunktsioonid on **100% kaetud** (rida ja haru), aga **kogu rakenduse** katvus on vaid umbes 20%, sest registreerimisteenus, töötoateenus ja API on 0%. Katvus ütleb, **kus testid ei käi**. Aga seal, kus nad käivad, ei ütle see, **kas nad kontrollivad midagi**.

| Katvus ütleb | Katvus **ei** ütle |
| --- | --- |
| See rida jäi testimata (viga võib seal olla) | See rida on **õigesti** kontrollitud |
| Test ei puutunud seda haru | Test oleks vea **avastanud** |

Hea reegel: **madal katvus on kindel hoiatus, kõrge katvus ei ole garantii.**

## Mutatsioonitestimine

Kuidas teada saada, kas test **tabab** vea? **Tekita viga ise ja vaata, kas test kukub.**

**Mutatsioonitestimine** (*mutation testing*) teeb koodis väikese tahtliku muudatuse (**mutandi**) ja käivitab testid:

- test **kukub** => mutant **tapeti** (testid tabasid vea, hea);
- test **läbib** => mutant **jäi ellu** (testid ei märganud viga, halb).

Tüüpilised mutatsioonid:

| Muudatus | Näide |
| --- | --- |
| Võrdlusoperaator | `>=` => `>`, `<` => `<=` |
| Aritmeetika | `+` => `-`, `* 0.5` => `* 0.6` |
| Loogika | `&&` => `||`, `Math.max` => `Math.min` |
| Tingimus | `if (x)` => `if (!x)` |
| Rea kustutamine | `toLowerCase()` eemaldamine |

**Mutatsiooniskoor** = tapetud mutandid / kõik mutandid. 7 mutandist 7 tapetud = 100%, 0 tapetud = 0%.

| Skoor | Tõlgendus |
| --- | --- |
| Madal | Testid on nõrgad, isegi kui katvus on kõrge |
| Kõrge | Testid on tõenäoliselt tugevad, aga mutandid on vaid väike valim |

Ellujäänud mutant ei tähenda alati nõrka testi. Mõnikord on mutant **samaväärne** (*equivalent*): muudatus ei muuda käitumist (nt `x >= 0` => `x > -1` täisarvudel). Selle tuvastamine on mõtlemist.

Päris projektides teevad seda automaatsed mutatsioonitööriistad. Siin teed seda **käsitsi**, et näha iga otsust ise.

## Nõuete katvus ja jälgitavus

Kaarel alustas [kohtumisel 1](./kohtumine-01-nouded-ja-testiplaan) jälgitavusega: stsenaariumid on issue'd nõude numbriga ja testide nimed algavad nõude numbriga (`NR-4: grupisoodus`). Nüüd saab ta küsida: **milline nõue ei ole veel ühegi automaattestiga kaetud?**

**Nõuete katvus** = nõuded, millel on vähemalt üks automaattest / kõik nõuded.

Seda ei pea käsitsi tabelisse kirjutama. Otsing annab vastuse:

```bash
grep -rn "NR-4" harjutused
```

Tühi tulemus tähendab, et seda nõuet ükski test ei kontrolli. Sama otsing käib ka GitHubis (koodi ja issue'de otsing). Sellist **nimes sisalduvat viidet** kasutatakse päris töös laialdaselt: testi nimes on tickeni number.

See on **teine katvus** kui koodikatvus:

| | Koodikatvus | Nõuete katvus |
| --- | --- | --- |
| Küsimus | Kas see rida jooksis? | Kas see **nõue** on testitud? |
| Allikas | Tööriist mõõdab | Testi nimi viitab nõudele, otsing annab vastuse |
| Leiab | Testimata koodi | Testimata **nõude** |

Nõue, millel pole testi, on **mõõtmata risk**. Nii nõuete kui koodi katvus annavad koos paremini pildi.

## Mõõdik ei ole eesmärk

Oletame, et Tiit ütleb: "Tahan 100% katvust." Reet kirjutab testid, mis käivitavad kõik read, aga **ei kontrolli midagi**. Katvus on 100%, testid on väärtusetud. Seda nähtust nimetatakse [Goodharti seaduseks](https://en.wikipedia.org/wiki/Goodhart%27s_law): kui mõõdikust saab eesmärk, lakkab see olemast hea mõõdik.

Seetõttu kasutab Kaarel mõõdikuid **küsimuste esitamiseks** ("miks see rida on testimata?"), mitte **sihtarvudena**.

## Praktikum

Sul on 55-60 minutit. Failid: `harjutused/kohtumine-08/weak.test.js` (valmis, **ära muuda**), `harjutused/kohtumine-08/mutants.test.js`. Tulemused kirjuta päevikusse.

### 1. Katvus: nõrk komplekt

Käivita `npx vitest run --coverage harjutused/kohtumine-08/weak`. Kirjuta üles iga faili (`src/pricing`, `src/refund`, `src/registration`, ...) neli protsenti. Ava `coverage/index.html` ja vaata, millised read on punased. Mis on hinnafunktsiooni katvus ja kas see tähendab, et funktsioon on korralikult testitud?

### 2. Katvus: sinu enda testid

Käivita katvus kohtumiste 3-7 testide kohta:

```bash
npx vitest run --coverage harjutused/kohtumine-03 harjutused/kohtumine-04 harjutused/kohtumine-05 harjutused/kohtumine-06 harjutused/kohtumine-07
```

Kopeeri tulemus ja võrdle nõrga komplektiga. Millised read on endiselt punased? Kas need on nõrk koht või põhjendatult testimata?

### 3. Seitse mutanti nõrga komplekti vastu

Mutandid (muuda täpselt kirjeldatud kohas ja **võta pärast tagasi**):

| ID | Fail | Muudatus |
| --- | --- | --- |
| M1 | `src/pricing/calculatePrice.js` | `ages.length >= 10` => `ages.length > 10` |
| M2 | `src/pricing/calculatePrice.js` | `age <= 17` => `age < 17` |
| M3 | `src/refund/calculateRefund.js` | `daysBefore >= 7` => `daysBefore > 7` |
| M4 | `src/refund/calculateRefund.js` | `price * 0.5` => `price * 0.6` |
| M5 | `src/pricing/calculatePrice.js` | `Math.max(groupDiscount, memberDiscount)` => `groupDiscount + memberDiscount` |
| M6 | `src/registration/RegistrationService.js` | `ages.length > workshop.capacity - taken` => `ages.length >= workshop.capacity - taken` |
| M7 | `src/registration/RegistrationService.js` | `email.trim().toLowerCase()` => `email.trim()` |

Lisa päevikusse kommentaar **Mutandid** ja tee iga mutandi (M1...M7) juures nii:

1. tee tabelis kirjeldatud muudatus failis `src/...`;
2. käivita `npx vitest run harjutused/kohtumine-08/weak`;
3. kirjuta kommentaari, kas mutant **tapeti** või **jäi ellu**;
4. **võta muudatus tagasi**: `git checkout -- src`.

Kontrolli enne iga uut mutanti käsuga `git status`, et `src` oleks muutmata.

### 4. Kirjuta mutante tapvad testid

Failis `mutants.test.js` on seitse ülesannet (M1...M7). Iga test peab:

- **läbima** muutmata koodiga;
- **kukkuma** oma mutandiga.

Kontrolli mõlemat: käivita test ilma mutandita, tee mutant, käivita uuesti, võta muudatus tagasi. M6 ja M7 jaoks kasuta kohtumise 4 fake'e (`import ... from "../kohtumine-04/fakes.js"`).

### 5. Arvuta mutatsiooniskoor

Lisa samasse kommentaari lõppu **mutatsiooniskoor** kahe komplekti kohta (nõrk komplekt ja sinu testid kohtumistest 3-8): rea katvus, haru katvus ja tapetud mutandid 7-st.

Skoori arvutamiseks käivita mutantidega **kõik** oma testid (`npx vitest run harjutused/kohtumine-03 ...` jne) ja loe, mitu mutanti nad tapavad. Mida see tulemus ütleb sinu kohtumiste 3-7 testide tugevuse kohta?

### 6. Kontrolli nõuete katvust

Otsi iga nõude number (`NR-1` ... `NR-14`) oma testide nimedest (`grep -rn "NR-1" harjutused`). Kirjuta päevikukommentaari **Mõõdikud** jaotisse "Nõuete katvus" nõuded, millel on vähemalt üks automaattest, ja arvuta protsent. Kui mõni nõue on automaattestita, kirjuta kas uus test või **põhjendus**, miks seda ei automatiseerita (nt "kontrollitakse käsitsi, stsenaarium #9").

### 7. Mõõdikute tabel

Täida kommentaar **Mõõdikud**: väärtus ja **tõlgendus** (mida see ütleb ja mida ei ütle). Vastuseaja p95 jäta kohtumiseni 9.

## Tõendid päevikusse

Lisa oma [päevikusse](./sissejuhatus#paevik) kommentaar **Kohtumine 8** ja kirjuta sinna:

- [ ] Katvuse raport nõrga komplekti ja oma testide kohta (tabel või ekraanitõmmis)
- [ ] Kommentaar **Mutandid**: seitse mutanti nõrga komplekti vastu (tapetud/ellu jäi)
- [ ] `mutants.test.js`: seitse testi, igaüks läbib puhta koodiga ja kukub oma mutandiga
- [ ] Mutatsiooniskoor kahe komplekti kohta
- [ ] Nõuete katvus arvutatud (`grep`-iga) ja puudused käsitletud
- [ ] `moodikud.md` täidetud tõlgendustega

## Refleksioon

1. Miks nõrga komplekti katvus on 100%, aga mutantidest ei tapa ta ühtegi?
2. Kui mõni mutant jäi sinu täieliku komplekti vastu ellu, mida see näitab?
3. Mida vastaksid Tiidule, kui ta nõuaks "vähemalt 90% katvust"?

## Allikad

- [Vitest: koodikatvus](https://vitest.dev/guide/coverage.html): `--coverage` ja `v8` pakkuja.
- ISTQB Certified Tester Foundation Level Syllabus v4.0, peatükk 5: testide seire ja testimõõdikud.
- [Wikipedia: Mutation testing](https://en.wikipedia.org/wiki/Mutation_testing) ja [Goodhart's law](https://en.wikipedia.org/wiki/Goodhart%27s_law).
- Rannamõisa ja arvud rakenduse katvuse kohta on praktikumirepo mõõdetud väärtused.
