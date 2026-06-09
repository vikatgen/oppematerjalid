---
title: DOM-elementide otsimine
description: Õpi leidma JavaScriptiga DOM-ist üks või mitu vajalikku elementi ning kontrollima otsingu tulemust.
outline: deep
---

# DOM-elementide otsimine

::: info Õpiväljund
Pärast õppetundi oskad valida sobiva CSS-selektori ning leida JavaScriptiga DOM-ist ühe või mitu vajalikku elementi.
:::

Eelmises tunnis õppisid lugema DOM-puud. Nüüd kasutad seda teadmist, et öelda JavaScriptile täpselt, millise elemendiga soovid töötada.

Selles tunnis leiad tootekataloogi elemente ja kontrollid tulemusi Console'is. Elementide sisu ja välimust hakkad muutma järgmistes tundides.

## Eeldused ja töövahendid

- Oskad lugeda DOM-puud ning kirjeldada elementide suhteid.
- Sul on vähemalt ühe tootekaardiga `tootekataloog` projekt.
- Oskad kasutada DevToolsi Elements- ja Console-paneeli.
- Soovituslik kestus on 60–75 minutit.

## Probleem: millist elementi JavaScript vajab?

Tootekataloogis võib olla palju erinevaid elemente:

```html
<main>
  <p id="status">Tootekataloog on valmis.</p>

  <section id="products">
    <article class="product-card">
      <h3>Näidistoode</h3>
      <p class="product-price">19.99 €</p>
      <button type="button">Lisa ostukorvi</button>
    </article>
  </section>
</main>
```

Kui tahad hiljem muuta staatust, vajad ühte kindlat elementi. Kui tahad töödelda kõiki tootekaartide nuppe, vajad mitut elementi.

DOM-ist otsimiseks kasutame **CSS-selektoreid**. Sama selektori kirjaviisi kasutatakse nii CSS-is kui ka JavaScriptis.

## CSS-selektori meeldetuletus

| Soovitud element | CSS-selektor | Tähendus |
| --- | --- | --- |
| kõik `button` elemendid | `button` | elemendi nimi |
| element ID-ga `status` | `#status` | `#` tähistab ID-d |
| kõik klassiga `product-card` elemendid | `.product-card` | `.` tähistab klassi |
| tootekaardi sees olev `button` | `.product-card button` | järeltulija selektor |
| toodete sektsiooni vahetu `article` laps | `#products > article` | vahetu lapse selektor |

Selektor peaks olema:

- piisavalt täpne, et leida soovitud element;
- piisavalt üldine, et mitte sõltuda ebavajalikust struktuurist;
- inimesele loetav.

::: warning ID peab olema dokumendis kordumatu
Kui mitu elementi vajavad sama tähist, kasuta klassi. ID sobib ühele kindlale elemendile.
:::

## Ühe elemendi leidmine: `querySelector()`

`document.querySelector()` otsib DOM-ist esimese selektorile vastava elemendi.

```js
const statusElement = document.querySelector("#status");

console.log(statusElement);
```

Kui element leitakse, sisaldab muutuja DOM-elementi:

```text
<p id="status">Tootekataloog on valmis.</p>
```

Kui vastavat elementi ei leita, on tulemus `null`:

```js
const missingElement = document.querySelector("#missing");

console.log(missingElement); // null
```

::: tip Kontrolli otsingu tulemust kohe
Uue selektori kirjutamisel logi tulemus esmalt Console'i. Nii märkad vale selektorit enne, kui proovid elementi muuta.
:::

### `querySelector()` tagastab ainult esimese vaste

Kui lehel on mitu tootekaarti, leiab järgmine kood ainult esimese:

```js
const firstProductCard = document.querySelector(".product-card");

console.log(firstProductCard);
```

See sobib, kui vajad teadlikult ühte elementi. Kõigi vastete leidmiseks kasuta `querySelectorAll()` meetodit.

## Mitme elemendi leidmine: `querySelectorAll()`

`document.querySelectorAll()` tagastab kõik selektorile vastavad elemendid `NodeList` kogumina:

```js
const productCards = document.querySelectorAll(".product-card");

console.log(productCards);
console.log("Tootekaarte:", productCards.length);
```

Kui vasteid pole, saad tühja kogumi. Tulemus ei ole `null`:

```js
const missingCards = document.querySelectorAll(".missing");

console.log(missingCards.length); // 0
```

`NodeList` meenutab massiivi: sellel on `length` ja elemente saab lugeda indeksiga.

```js
console.log(productCards[0]);
```

Kõikide leitud elementide läbimiseks saad kasutada `for...of` tsüklit:

```js
const buttons = document.querySelectorAll(".product-card button");

for (const button of buttons) {
  console.log(button);
}
```

Selles tunnis ainult logime elemendid. Hiljem lisad nuppudele sündmused.

## Otsi kogu dokumendist või ühe elemendi seest

Otsing ei pea alati algama kogu dokumendist. Kui oled ühe elemendi juba leidnud, saad otsida ainult selle seest.

```js
const productsSection = document.querySelector("#products");
const firstCard = productsSection.querySelector(".product-card");
const cardButton = firstCard.querySelector("button");

console.log(cardButton);
```

Selline otsing väljendab DOM-puu suhteid:

1. leia toodete sektsioon;
2. leia selle seest tootekaart;
3. leia tootekaardi seest nupp.

::: warning Otsinguahel eeldab, et eelmine element leiti
Kui `productsSection` on `null`, tekib järgmisel real `TypeError`, sest `null.querySelector()` ei ole võimalik.
:::

## Element, kogum või `null`?

Enne otsingu kasutamist ennusta tulemus:

```js
const statusElement = document.querySelector("#status");
const firstButton = document.querySelector(".product-card button");
const allButtons = document.querySelectorAll(".product-card button");
const missingElement = document.querySelector("#missing");
const missingElements = document.querySelectorAll(".missing");
```

| Muutuja | Tulemuse liik |
| --- | --- |
| `statusElement` | esimene sobiv element või `null` |
| `firstButton` | esimene sobiv element või `null` |
| `allButtons` | `NodeList`, mis võib sisaldada mitu elementi |
| `missingElement` | `null` |
| `missingElements` | tühi `NodeList`, mille `length` on `0` |

See erinevus aitab kirjutada õige kontrolli:

```js
if (statusElement === null) {
  console.log("Staatuse elementi ei leitud.");
}

if (allButtons.length === 0) {
  console.log("Ühtegi nuppu ei leitud.");
}
```

## Proovi selektoreid Console'is

Elements-paneelis saad valitud elemendi peal kasutada **Copy selector** võimalust, kuid automaatselt loodud selektor võib olla liiga pikk ja habras. Kirjuta võimalusel ise lihtne selektor, mis kirjeldab elemendi rolli.

Katseta Console'is:

```js
document.querySelector("main");
document.querySelector("#status");
document.querySelector("#products");
document.querySelector(".product-card");
document.querySelectorAll(".product-card");
document.querySelectorAll(".product-card button");
```

Iga käsu puhul vasta:

- kas ootasid ühte või mitut elementi;
- mida käsk tegelikult tagastas;
- kas selektor jääks tööle ka pärast teise tootekaardi lisamist.

## Levinud vead

### Klassilt puudub punkt

```js
document.querySelector("product-card"); // otsib <product-card> elementi
document.querySelector(".product-card"); // otsib klassi product-card
```

### ID-lt puudub trellimärk

```js
document.querySelector("status"); // otsib <status> elementi
document.querySelector("#status"); // otsib ID-d status
```

### Ühe elemendi asemel saad kogumi

```js
const statusElements = document.querySelectorAll("#status");

console.log(statusElements); // NodeList
```

Kuigi ID peaks olema kordumatu, tagastab `querySelectorAll()` alati kogumi. Kui vajad ühte kindlat elementi, kasuta `querySelector()`.

### Liiga üldine selektor

```js
const button = document.querySelector("button");
```

See leiab lehe esimese nupu. Kui lehele lisandub hiljem otsingu või ostukorvi nupp, ei pruugi tulemus enam olla soovitud tootekaardi nupp.

Täpsusta konteksti:

```js
const productButton = document.querySelector(".product-card button");
```

## Teised otsingumeetodid

Olemasolevas koodis kohtad ka meetodeid:

```js
document.getElementById("status");
document.getElementsByClassName("product-card");
document.getElementsByTagName("button");
```

Need on kehtivad DOM-i meetodid. Kasutame peamiselt `querySelector()` ja `querySelectorAll()` meetodeid, sest nendega saab kasutada ühtset CSS-selektorite kirjaviisi.

::: info Oluline erinevus vanema koodi lugemisel
`getElementsByClassName()` ja `getElementsByTagName()` tagastavad elava kogumi, mis võib DOM-i muutudes ise uueneda. `querySelectorAll()` tulemus on staatiline hetkepilt. Kui soovid nende erinevust sügavamalt uurida, võrdle kogumeid pärast DOM-i uue elemendi lisamist.
:::

## Praktiline ülesanne: koosta tootekataloogi elementide kaart

Täienda `app.js` faili nii, et JavaScript leiab tootekataloogi olulised elemendid ja kontrollib neid Console'is.

### Nõuded

Leia ja salvesta muutujatesse:

1. üks staatuse element;
2. üks toodete sektsioon;
3. esimene tootekaart;
4. kõik tootekaardid;
5. esimese tootekaardi pealkiri;
6. kõik tootekaartide nupud.

Kasuta lähtekohana:

```js
const statusElement = document.querySelector("#status");
const productsSection = document.querySelector("#products");

// Täienda otsinguid.

console.log("Staatus:", statusElement);
console.log("Toodete sektsioon:", productsSection);
```

Logi ka:

- leitud tootekaartide arv;
- leitud nuppude arv;
- iga leitud nupp eraldi `for...of` tsükliga.

### Piirjuhud

Kontrolli järgmisi olukordi:

- lehel on ainult üks tootekaart;
- lehele lisatakse teine tootekaart;
- selektoris on kirjaviga;
- kõik tootekaardid eemaldatakse.

### Vihjed

::: details Vihje 1
Ühe elemendi jaoks kasuta `querySelector()`, mitme jaoks `querySelectorAll()`.
:::

::: details Vihje 2
Tootekaardi klassi selektor algab punktiga: `.product-card`.
:::

::: details Vihje 3
Esimese tootekaardi pealkirja saad otsida juba leitud tootekaardi seest.

```js
const firstProductTitle = firstProductCard.querySelector("h3");
```
:::

### Kontrollitav tulemus

Valmis töös:

- sisaldavad ühe elemendi muutujad õiget DOM-elementi;
- sisaldavad mitme elemendi muutujad `NodeList` kogumit;
- muutub kaartide ja nuppude arv õigesti, kui lisad teise tootekaardi;
- annab vale selektor ühe elemendi puhul tulemuseks `null` ja mitme elemendi puhul tühja kogumi;
- oskad põhjendada, miks valisid iga otsingu jaoks just selle selektori.

## Mõtesta

1. Miks sobib `#status` ühe elemendi leidmiseks, kuid `.product-card` mitme leidmiseks?
2. Mis vahe on `querySelector()` ja `querySelectorAll()` tulemusel?
3. Millal on kasulik otsida juba leitud elemendi seest?
4. Miks võib selektor `button` töötada täna, kuid muutuda hiljem valeks?

## Laiendus

Lisa igale tootekaardile kategooria:

```html
<p class="product-category">Kategooria: demo</p>
```

Leia:

- kõik kategooriaelemendid;
- ainult esimese tootekaardi kategooria;
- kõik `p` elemendid toodete sektsiooni sees.

Ära muuda veel nende sisu. Kontrolli tulemusi Console'is ja põhjenda selektorite valikut.

## Kokkuvõte

- `querySelector()` tagastab esimese sobiva elemendi või `null`.
- `querySelectorAll()` tagastab kõik sobivad elemendid `NodeList` kogumina.
- CSS-selektor kirjeldab, millist elementi või elemente otsitakse.
- Otsing võib alata kogu `document` objektist või juba leitud elemendi seest.
- Selektori tulemust tasub enne kasutamist Console'is kontrollida.

## Edasi

Järgmises tunnis õpid lugema ja muutma leitud elementide [atribuute ning omadusi](./atribuudid-ja-omadused.md).

## Allikad

- [MDN: `Document.querySelector()`](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector) — ühe esimese vaste leidmine.
- [MDN: `Document.querySelectorAll()`](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll) — kõigi vastete leidmine.
- [MDN: CSS selectors](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_selectors) — selektorite kirjaviisi teatmematerjal.
