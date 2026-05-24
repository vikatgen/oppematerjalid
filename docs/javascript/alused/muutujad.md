# Muutujad

## Õpieesmärgid

Selle peatüki lõpuks peaks õppija:

- oskama selgitada, mis on muutuja ja miks seda kasutatakse
- oskama luua muutujaid märksõnadega `let` ja `const`
- mõistma, miks `var` tekitab rohkem segadust kui `let` ja `const`
- mõistma deklaratsiooni, omistamise ja väärtuse muutmise erinevust
- oskama selgitada skoobi ja hoisting'u põhimõtet lihtsate näidete abil
- mõistma üldiselt, miks primitiivid ja objektid käituvad mälus erinevalt

## Miks muutujad on olulised?

Rakendused peavad kogu aeg infot meeles hoidma. Kui kasutaja lisab e-poes toote ostukorvi, peab programm teadma ostukorvi kogusummat. Kui õpilane sisestab hinde, peab programm selle väärtuse salvestama, et hiljem otsustada, kas töö on arvestatud.

Muutuja annab väärtusele nime. Ilma muutujateta peaksime samu väärtuseid korduvalt käsitsi kirjutama ja programm muutuks kiiresti raskesti loetavaks.

```js
const productName = "Kõrvaklapid";
let cartTotal = 59.99;
let isInStock = true;
```

Nende nimede põhjal on kohe näha, millist infot programm hoiab: toote nime, ostukorvi summat ja laoseisu.

#### Strict mode
```"use strict";``` - strict mode ehk range režiim toodi JavaScripti **ECMAScript 5** versioonis.

```"use strict"``` ehk range režiim muudab JavaScripti koodi paremaks kahel peamisel viisil: suurendades turvalisust ja võimaldades mootoritel koodi kiiremini käivitada.

**Turvalisuse suurendamine ja vigade vältimine**

-  **Vaiksete vigade asendamine:** Range režiim muudab JavaScripti senised "vaiksed vead" (vead, mis varem koodi ei seiskunud, kuid võisid põhjustada ootamatut käitumist) reaalseteks vigadeks, mis viskavad erindi.
-  **Deklareerimata muutujate keeld:** Üks olulisemaid turvameetmeid on see, et muutujat ei saa kasutada ilma seda deklareerimata (näiteks ```let```, ```const``` abil). Kui tavarežiimis loob deklareerimata muutujale väärtuse omistamine (nt ```x = 3.14;```) automaatselt uue globaalse muutuja, siis ranges režiimis annab see süsteemse vea. See hoiab ära juhuslikud lekked globaalsesse skoopi.
-  **Tuleviku ühilduvus:** See keelab teatud süntaksi ja märksõnad, mida võidakse kasutusele võtta ECMAScripti tulevastes versioonides.

**Koodi kiiruse parandamine**
- **Mootori optimeerimine:** JavaScripti mootoritel (nt brauserites) on keeruline optimeerida koodi, mis on segane või halvasti struktureeritud. Range režiim parandab koodis teatud ebakõlad, mis teevad **JavaScripti mootoritele optimeerimise lihtsamaks.**
- **Efektiivsem täitmine:** Tänu neile parandustele ja selgemale struktuurile võib range režiimi kood joosta mõnikord **kiiremini** kui identne kood, mis ei ole ranges režiimis.

**Rakendamine**

Range režiimi sisselülitamiseks lisatakse skripti või funktsiooni algusesse tekstiline direktiiv ```"use strict";```. Oluline on märkida, et kaasaegsetes JavaScripti struktuurides, nagu klassid ja moodulid, on range režiim automaatselt sisse lülitatud ja direktiivi eraldi lisamine pole vajalik.

-------

#### Muutujate olemus ja deklaratsioon

Muutuja on **nimega mäluala andmete salvestamiseks**, mida võib kujutleda kui sildistatud "karpi", kuhu pannakse info. JavaScriptis kasutatakse muutujate loomiseks ehk deklareerimiseks kolme peamist märksõna:
- ```let``` – kaasaegne viis muutuja deklareerimiseks. See on **plokipõhise skoobiga (block scoped)**, mis tähendab, et muutuja on nähtav vaid selles koodiplokis (nt loogeliste sulgude vahel), kus ta loodi.
- ```const``` – sarnane ```let```-iga, kuid seda kasutatakse **konstantide** jaoks, mille väärtust ei saa pärast määramist enam muuta. **Konstanti ei saa deklareerida ilma seda kohe väärtustamata.**
- ```var``` – vanem viis muutujate loomiseks, mis on **globaalse** või **funktsiooni** skoobiga. Erinevalt ```let```-ist saab ```var```-i samas skoobis korduvalt deklareerida, mis võib tekitada vigu, ning **tänapäeval seda üldiselt enam kasutada ei soovitata.**

##### Väärtuste omistamine

Väärtuse salvestamiseks muutujasse kasutatakse **omistamisoperaatorit** ```=```
- **Algväärtustamine:** Deklareerimist ja omistamist saab teha korraga: ```let message = "Hello!";```.
- **Väärtuse muutmine:** ```let```-iga loodud muutuja sisu saab muuta nii palju kui vaja, kusjuures uus väärtus asendab vana.
- **Kopeerimine:** Andmeid saab kopeerida ühest muutujast teise: ```message = hello;```.
- **Range režiimi olulisus:** Ilma **strict mode**-ita oli võimalik luua muutuja pelgalt väärtuse omistamisega (nt num = 5;), kuid see on halb tava ja tekitab ranges režiimis vea

##### Muutujate nimetamise reeglid

Muutujate nimedele kehtivad JavaScriptis kindlad piirangud:
1. Nimi tohib sisaldada ainult **tähti, numbreid ning sümboleid** ```$``` **ja** ```_```.
2. Esimene karakter **ei tohi olla number.**
3. JavaScript on **tõstutundlik (case-sensitive)** – muutujad ```apple``` ja ```APPLE``` on erinevad.
4. Kasutada ei tohi **reserveeritud sõnu**, mis on keele enda poolt kasutusel (nt ```let```, ```class```, ```return```)

**Head tavad nimetamisel**
- Kasutage **tähendusrikkaid ja kirjeldavaid nimesid** (nt ```userName``` või ```shoppingCart```), vältides lühidendeid nagu ```a``` või ```b```, kui nende sisu pole koodi kontekstis ilmselge.
- Liitnimede puhul on tavaks kasutada **camelCase** stiili (nt ```myVeryLongName```)
- **Suuri tähti** kasutatakse konstantide puhul, mille väärtus on teada enne koodi käivitamist ehk n-ö kõvasti kodeeritud (hard-coded) väärtuste (nt ```COLOR_RED = "#F00"```) puhul.
- Parem on luua uus muutuja kui taaskasutada olemasolevat erineva sisu jaoks – see aitab vältida vigu ja võimaldab mootoril koodi paremini optimeerida.

##### Millal kasutada `let`, `const` ja `var`?

Tänapäevases JavaScriptis kasutatakse peamiselt `const` ja `let`.

- Kasuta `const`, kui muutuja ei pea hiljem uut väärtust saama.
- Kasuta `let`, kui väärtus muutub programmi töö käigus.
- Väldi `var` kasutamist uues koodis, sest selle skoop ja hoisting võivad algajale anda ootamatuid tulemusi.

```js
const userName = "Kati"; // nimi ei muutu selles näites
let score = 0;           // skoor muutub mängu jooksul

score = score + 1;
```

::: info Hea harjumus
Alusta `const`-iga. Kui hiljem selgub, et väärtust on vaja muuta, vaheta see `let` vastu. Nii tekib vähem juhuslikke muudatusi.
::::

#### Skoop: kus muutuja nähtav on?

**Skoop** tähendab piirkonda, kus muutujat saab kasutada. JavaScriptis on oluline eristada globaalset skoopi, funktsiooni skoopi ja plokiskoopi.

```js
const schoolName = "Kuressaare Ametikool"; // globaalne skoop

if (true) {
  const courseName = "JavaScript"; // plokiskoop
  console.log(courseName);
}

console.log(schoolName);
// console.log(courseName); // viga: courseName ei ole siin nähtav
```

Plokiskoop tekib näiteks `{ ... }` sulgude vahel. `let` ja `const` järgivad plokiskoopi, mis teeb koodi turvalisemaks ja paremini ennustatavaks.

#### Hoisting ja temporal dead zone

JavaScript loeb enne koodi käivitamist läbi, millised muutujad ja funktsioonid failis olemas on. Seda nimetatakse **hoisting'uks**. Algajale on kõige olulisem teada, et `let` ja `const` muutujat ei tohi kasutada enne selle deklaratsiooni.

```js
console.log(age); // viga

let age = 16;
```

Seda piirkonda enne `let` või `const` deklaratsiooni nimetatakse **temporal dead zone**. Muutuja nimi on JavaScriptile juba teada, aga seda ei saa veel kasutada.

`var` käitub teistmoodi ja võib vea asemel anda `undefined`, mis teeb vigade leidmise raskemaks:

```js
console.log(points); // undefined

var points = 10;
```

Seetõttu kasutame õppematerjalis uue koodi kirjutamisel `let` ja `const`.

#### `const` objektide ja massiividega

`const` tähendab, et muutujale ei saa anda uut väärtust. Kui `const` hoiab objekti või massiivi, võib objekti või massiivi sisu siiski muutuda.

```js
const grades = [4, 5, 3];

grades.push(5);

console.log(grades); // [4, 5, 3, 5]
```

See töötab, sest `grades` viitab samale massiivile. Keelatud oleks muutujale täiesti uue massiivi omistamine:

```js
const grades = [4, 5, 3];

grades = [5, 5, 4]; // viga
```

-------

#### Muutujate käitlemine mälus

Et mõista, kuidas arvuti muutujaid käsitleb, on kõige parem kasutada allikates toodud **"kasti"** analoogiat. Siin on visuaalne selgitus protsessist, mis toimub arvuti mällu salvestamisel ja andmete töötlemisel:

1. **Muutuja deklareerimine - "Kasti loomine"** - Kui kirjutad koodis ```let message;```, siis arvuti jaoks tähendab see uue nimega hoiupaiga loomist:
- **Visuaalselt:** Kujuta ette tühja kasti, millele on peale kleebitud kleebis nimega "message".
- **Mälus:** Arvuti eraldab mäluala selle nimega sidumiseks.

2. **Väärtuse omistamine – "Sisu kasti panemine"** - Kui lisad väärtuse (nt ```message = 'Hello!';```), salvestatakse see info muutuja nimega seotud mälualasse.
- **Visuaalselt:** Paned kasti sisse sildi tekstiga "Hello!"
- **Mälus:** Sellesse konkreetsesse mälupessa kirjutatakse andmed (nt ```string 'Hello!'```)

3. **Väärtuse muutmine ja ülekirjutamine** - JavaScriptis saab muutujate sisu muuta nii palju kui vaja (v.a **konstante**)
- **Toiming:** Kui annad uue väärtuse ```message = 'World!';```, siis vana sisu eemaldatakse ja asendatakse uuega.
- **Mälus:** Vana väärtus kustutatakse mälust ja asendatakse uute andmetega.

4. **Andmete kopeerimine** - Kui deklareerid kaks muutujat ja kopeerid andmed ühest teise (nt ```let message = hello;```), siis nüüd hoiavad **kaks erinevat kasti sama sisu**.
- **Visuaalselt:** Sa ei tõsta sisu ühest kastist teise, vaid teed sisust koopia ja paned selle teise kasti.

5. **Kuidas andmetüübid mälu mõjutavad** - Arvuti käsitleb mällu salvestamist erinevalt sõltuvalt andmetüübist:
- **Primitiivsed tüübid (väärtuspõhised):** Näiteks numbrid ja stringid salvestatakse otse "kasti" ehk muutuja väärtusena
- **Objektid (viitepõhised):** Massiivid ja objektid on keerulisemad. Muutuja ei hoia mitte objekti ennast, vaid **viidet** (reference - aadress) sellele kohale mälus, kus objekt asub

Lihtsustatud kujul võib seda ette kujutada nii:

```txt
muutuja nimi -> väärtus
message      -> "Hello!"
count        -> 3
isLoggedIn   -> true
```

Objektide ja massiivide puhul hoiab muutuja viidet:

```txt
student -> viide objektile mälus
          {
            name: "Marta",
            grade: 5
          }
```

::: info Oluline märkus
Kaasaegsed JavaScripti mootorid on väga nutikad. Nad optimeerivad koodi nii, et kui kasutad iga väärtuse jaoks eraldi muutujat (selle asmele, et ühte kasti pidevalt tühjendada ja täita), suudab mootor koodi kiiremini käivitada.
:::

#### Mälujaotus RAM-is: Stack vs Heap

JavaScripti mootor ei kasuta mälu suvaliselt, vaid jagab selle kaheks peamiseks piirkonnaks: **Stack (pinu)** ja **Heap (hulk)**.

**Stack Memory (Pinumälu)**

Siia salvestatakse primitiivsed andmetüübid (näiteks `number`, `string`, `boolean`, `null`, `undefined`) ja funktsioonide väljakutsed. See on väga kiire ja järgib põhimõtet *"viimasena sisse, esimesena välja"* (LIFO). Primitiivsed väärtused on mälus kergekaalulised ja nende suurus on fikseeritud (näiteks numbrid on 64-bitised ujukomaarvud).

**Heap Memory (Hulgimälu)**

Siia salvestatakse keerulisemad struktuurid nagu objektid, massiivid ja funktsioonid. Kuna need on mahukamad ja nende suurus võib muutuda, siis Stack-mälu ei hoia neid otse. Selle asemel hoitakse Stackis ainult **viidet (aadressi)**, mis näitab, kus tegelikud andmed Heap-mälus asuvad.

#### Protsessori (CPU) roll

Kuigi me räägime andmete salvestamisest muutujatesse, on CPU see, mis koodi tegelikult käivitab.

CPU on nagu *"tööline"*, kes ei hoia muutujaid püsivalt. Ta kutsub (*fetch*) andmed RAM-ist (Stackist või Heapist), töötleb neid (teeb arvutusi või muudab teksti) ja saadab tulemused tagasi mälusse. See on põhjus, miks range režiim on kasulik – see aitab JavaScripti mootoril koodi paremini analüüsida ja CPU jaoks optimeerida, muutes täitmise kiiremaks.
```js
"use strict";
```

#### Püsiv salvestus (Kõvaketas HDD/SSD)

Tavapärased JavaScripti muutujad on **ajutised**. Niipea kui veebileht värskendatakse või programm suletakse, tühjendatakse RAM-is olevad andmed ja kaovad.

Kõvaketast ei kasutata muutujate hoidmiseks automaatselt. Kui andmeid on vaja säilitada püsivalt, peab arendaja need ise salvestama, kasutades näiteks `localStorage`-it, `IndexedDB`-d või väliseid andmebaase.

#### Muutuja elutsükkel: "Kasti" analoogia süvitsi

**Deklareerimine (`let`, `const`)**

Arvuti märgistab RAM-is mäluala ja kleebib sellele sildi (nime).

**Omistamine (`=`)**

Väärtus kirjutatakse mälusse. Kui tegu on primitiiviga, läheb see otse Stacki; kui objektiga, läheb see Heapi ja muutujasse pannakse vaid **viide**.

**Muutmine**

Kui muutuja sisu asendatakse, eemaldatakse vana väärtus mälust ja asendatakse uuega. Kui andmeid enam ei kasutata, tegeleb JavaScripti mootori **"prügikoristaja"** (*garbage collector*) mäluala vabastamisega.

::: info **Kokkuvõtteks**
Muutuja on mugav viis viidata kindlale kohale RAM-is, kus CPU saab andmeid kiiresti lugeda ja kirjutada, samas kui püsivaks säilitamiseks tuleb kasutada kõvaketast.
::::

## Levinud vead

```js
userName = "Mari"; // halb: muutuja pole deklareeritud
```

Kasuta alati `let` või `const`:

```js
const userName = "Mari";
```

Teine levinud viga on ühe muutuja kasutamine mitme erineva tähendusega väärtuse jaoks:

```js
let value = "Mari";
value = 17;
value = true;
```

Sellist koodi on raske lugeda. Parem on anda igale väärtusele selge nimi:

```js
const userName = "Mari";
const userAge = 17;
const isActive = true;
```

## Harjutused

1. Loo muutujad õpilase nime, vanuse ja keskmise hinde jaoks.
2. Loo muutuja `cartTotal` ja muuda selle väärtust pärast uue toote lisamist.
3. Kirjuta näide, kus `const` massiivi saab muuta `push()` meetodiga, aga muutujale uut massiivi omistada ei saa.
4. Selgita oma sõnadega, miks `let` ja `const` on algajale turvalisemad kui `var`.
