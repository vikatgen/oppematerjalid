---
title: JavaScripti muutujad
description: Õpi väärtustele nimesid andma ning valima const ja let vahel.
outline: deep
---

# Muutujad

::: info Õpiväljund
Pärast peatüki läbimist oskad luua tähenduslike nimedega muutujaid, valida `const` ja `let` vahel ning selgitada oma valikut.
:::

## Miks muutujad on olulised?

Rakendus peab töö käigus infot kasutama ja muutma. Veebipoes on vaja meeles hoida näiteks toote nime, hinda ja ostukorvi kogusummat.

Muutuja seob väärtuse nimega, mille kaudu saab kood seda väärtust hiljem kasutada.

```js
const productName = "Kõrvaklapid";
const productPrice = 59.99;
let cartTotal = 0;

cartTotal = cartTotal + productPrice;

console.log(cartTotal); // 59.99
```

Nimede põhjal on kohe näha, millist infot programm kasutab. Muutuja väärtus võib olla näiteks tekst, arv või tõeväärtus.

## Muutuja loomine ja väärtuse omistamine

Muutuja loomist nimetatakse **deklareerimiseks**. Märksõna järel tuleb muutuja nimi:

```js
let score;
```

Väärtuse andmist nimetatakse **omistamiseks**:

```js
score = 10;
```

Enamasti deklareeritakse muutuja ja antakse sellele algväärtus samal real:

```js
const courseName = "JavaScript";
let completedTasks = 0;
```

::: warning `=` ei tähenda võrdlemist
Märk `=` omistab paremal oleva väärtuse vasakul olevale muutujale.

```js
completedTasks = completedTasks + 1;
```

JavaScript arvutab esmalt parema poole ning salvestab tulemuse seejärel muutujasse `completedTasks`.
:::

## Millal kasutada `const` ja millal `let`?

Kasuta vaikimisi `const`. Vali `let` ainult siis, kui muutujale on hiljem vaja uus väärtus omistada.

::: code-group
```js [const: väärtust ei omistata uuesti]
const userName = "Kati";
const birthYear = 2008;
```

```js [let: väärtus muutub]
let score = 0;

score = score + 1;
score = score + 1;
```
:::

`const` ei tähenda, et väärtus on kogu maailmas igavesti muutumatu. See tähendab, et sellele muutujale ei saa pärast loomist uut väärtust omistada.

```js
const userName = "Kati";

userName = "Mari"; // TypeError
```

::: tip Otsustusreegel
Küsi: **kas sellele muutujale omistatakse hiljem uus väärtus?**

- Ei või ma pole kindel: kasuta `const`.
- Jah: kasuta `let`.
:::

### Miks me `var` ei kasuta?

`var` on JavaScripti vanem muutujate loomise viis. Selle skoobi- ja hoisting'u reeglid erinevad `let`-ist ning võivad põhjustada raskemini leitavaid vigu.

Uue koodi kirjutamisel kasuta `const` ja `let`. Vanemat koodi lugedes pead siiski teadma, et `var` võib seal esineda.

## Tähenduslikud nimed

Hea muutuja nimi ütleb, mida väärtus programmis tähendab.

::: code-group
```js [Raske lugeda]
const n = "Mari";
const x = 4.5;
```

```js [Lihtne lugeda]
const studentName = "Mari";
const averageGrade = 4.5;
```
:::

JavaScripti muutujate nimed:

- kasutavad tavaliselt `camelCase` kirjaviisi: `shoppingCartTotal`;
- võivad sisaldada tähti, numbreid, `_` ja `$` märke;
- ei tohi alata numbriga;
- ei tohi olla JavaScripti reserveeritud sõnad, näiteks `const` või `return`;
- on tõstutundlikud: `userName` ja `username` on erinevad nimed.

::: details Kontrolli, millised nimed sobivad
Sobivad nimed:

```js
const firstName = "Mari";
const course2 = "JavaScript";
const isActive = true;
```

Ei sobi:

```js
const 2course = "JavaScript"; // algab numbriga
const user-name = "Mari";     // sidekriips ei ole lubatud
const return = true;          // reserveeritud sõna
```
:::

## Proovi ise: ostukorv

Kopeeri kood brauseri DevTools Console'isse või Node.js faili.

```js
const productName = "Klaviatuur";
const productPrice = 45;
let quantity = 1;

quantity = quantity + 2;

const cartTotal = productPrice * quantity;

console.log(`${productName}: ${quantity} tk, kokku ${cartTotal} €`);
```

Enne käivitamist ennusta:

1. Millise väärtuse saab `quantity`?
2. Millise väärtuse saab `cartTotal`?
3. Miks on `quantity` loodud `let`-iga, aga `cartTotal` `const`-iga?

::: details Kontrolli vastust
Konsooli ilmub:

```txt
Klaviatuur: 3 tk, kokku 135 €
```

`quantity` saab uue väärtuse, seega kasutame `let`-i. `cartTotal` arvutatakse ja sellele selles näites uut väärtust ei omistata, seega kasutame `const`-i.
:::

### Praktiline ülesanne

Loo lihtne kinopileti arvutus.

1. Loo `const` muutujad filmi nime ja ühe pileti hinna jaoks.
2. Loo `let` muutuja piletite koguse jaoks.
3. Suurenda piletite kogust kahe võrra.
4. Arvuta koguhind uude `const` muutujasse.
5. Väljasta tähenduslik lause `console.log()` abil.

Valmis lahendus:

- kasutab vähemalt kolme tähendusliku nimega muutujat;
- kasutab `let`-i ainult väärtuse jaoks, millele omistatakse uus väärtus;
- väljastab filmi nime, piletite koguse ja koguhinna.

::: details Vihje 1
Alusta väärtustest, mida programm peab teadma: filmi nimi, pileti hind ja piletite kogus.
:::

::: details Vihje 2
Koguhinna saad arvutada pileti hinna ja koguse korrutamisel.
:::

::: details Üks võimalik lahendus
```js
const movieName = "Kevade";
const ticketPrice = 8;
let ticketCount = 1;

ticketCount = ticketCount + 2;

const totalPrice = ticketPrice * ticketCount;

console.log(`${movieName}: ${ticketCount} piletit, kokku ${totalPrice} €`);
```
:::

## Levinud vead

### Muutuja jäetakse deklareerimata

```js
userName = "Mari"; // halb: muutujat pole deklareeritud
```

Kasuta `const` või `let`:

```js
const userName = "Mari";
```

### Üks nimi saab mitu erinevat tähendust

```js
let value = "Mari";
value = 17;
value = true;
```

Anna igale väärtusele selge nimi:

```js
const userName = "Mari";
const userAge = 17;
const isActive = true;
```

## Kontrollküsimused

1. Mis vahe on muutuja deklareerimisel ja väärtuse omistamisel?
2. Millal valid `let`-i asemel `const`-i?
3. Miks on nimi `cartTotal` parem kui nimi `x`?
4. Mis juhtub, kui proovid `const` muutujale uue väärtuse omistada?

## Edasi

- Järgmine teema: [JavaScripti andmetüübid](/javascript/alused/andmetuubid).
- Lisalugemine: [MDN — JavaScript Grammar and types](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types).

::: tip Valikuline lisalugemine
Kui soovid mõista, kuidas JavaScript seob muutujate nimed väärtustega, otsib nimesid skoopidest ning käsitleb objektiviiteid ja mälu, loe peatükki [Kuidas muutuja töötab?](/javascript/lisalugemine/kuidas-muutuja-tootab).

Lisalugemine ei kuulu programmeerimise aluste nõutava taseme ega mooduli vahekaitsmise alla.
:::
