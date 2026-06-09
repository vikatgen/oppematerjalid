---
title: UI-sündmused
description: Õpi valima kasutajaliidese tegevuse jaoks sobiva sündmuse ning uuendama selle põhjal rakenduse vaadet.
outline: deep
---

# UI-sündmused

::: info Õpiväljund
Pärast õppetundi oskad valida nupu, tekstivälja ja valikuvälja jaoks sobiva sündmuse ning uuendada sündmuse järel tootekataloogi vaadet.
:::

Üks `click`-sündmus ei sobi kõigi kasutajaliidese tegevuste jaoks. Otsing peab reageerima teksti muutumisele, kategooriafilter valiku muutumisele ja nupp teadlikule aktiveerimisele.

Selles tunnis lisad tootekataloogile otsingu ning kategooriafiltri.

## Eeldused ja töövahendid

- Oskad lisada sündmusekuulaja ja kirjutada töötleja funktsiooni.
- Sul on töötav `renderProducts(products)` funktsioon.
- Oskad lugeda sisestusvälja `value` omadust.
- Soovituslik kestus on 75–90 minutit.

## Levinud UI-sündmused

| Sündmus | Millal see toimub? | Levinud kasutus |
| --- | --- | --- |
| `click` | kasutaja aktiveerib nupu või muu elemendi | nupu tegevus |
| `input` | sisestusvälja väärtus muutub | kohene otsing ja eelvaade |
| `change` | valik kinnitatakse või välja väärtuse muutmine lõpetatakse | valikukast ja seadistus |
| `keydown` | klahv vajutatakse alla | eriline klaviatuurikäitumine |
| `focus` / `blur` | väli saab või kaotab fookuse | abitekst ja valideerimine |

Eelista semantilist HTML-elementi ja selle loomulikku sündmust. Näiteks nupu aktiveerimiseks kasuta `button` elementi ja `click`-sündmust, mitte suvalise `div` elemendi klahvivajutuste käsitsi jälgimist.

## Lisa otsing ja kategooriafilter

HTML:

```html
<div class="catalog-controls">
  <label for="search">Otsi toodet</label>
  <input id="search" type="search">

  <label for="category">Kategooria</label>
  <select id="category">
    <option value="all">Kõik kategooriad</option>
    <option value="kotid">Kotid</option>
    <option value="riided">Riided</option>
  </select>
</div>
```

JavaScript:

```js
const searchInput = document.querySelector("#search");
const categorySelect = document.querySelector("#category");

let searchTerm = "";
let selectedCategory = "all";
```

Need kaks muutujat kirjeldavad kataloogi hetkefiltreid.

Täienda ka iga kohaliku toote objekti `category` omadusega, mis vastab mõne valiku `value` väärtusele:

```js
{
  id: 1,
  title: "Must seljakott",
  category: "kotid",
  // muud omadused
}
```

## `input`: reageeri igale tekstimuudatusele

```js
function handleSearchInput(event) {
  searchTerm = event.currentTarget.value.trim().toLowerCase();

  renderProducts(getVisibleProducts());
}

searchInput.addEventListener("input", handleSearchInput);
```

`input` toimub nii kirjutamisel, kustutamisel kui ka teksti kleepimisel. Seetõttu sobib see koheseks otsinguks paremini kui ainult klahvivajutuste jälgimine.

::: tip Loe väärtus sündmusega seotud elemendilt
Töötlejas saad kasutada `event.currentTarget.value`. Nii on nähtav, millise elemendi sündmust parajasti töödeldakse.
:::

## `change`: reageeri valiku kinnitamisele

```js
function handleCategoryChange(event) {
  selectedCategory = event.currentTarget.value;

  renderProducts(getVisibleProducts());
}

categorySelect.addEventListener("change", handleCategoryChange);
```

`select` elemendi puhul toimub `change`, kui kasutaja valib uue väärtuse.

## Rakenda mitu filtrit koos

Koosta üks funktsioon, mis arvestab kõiki aktiivseid filtreid:

```js
function getVisibleProducts() {
  const visibleProducts = [];

  for (const product of products) {
    const titleMatches = product.title
      .toLowerCase()
      .includes(searchTerm);

    const categoryMatches =
      selectedCategory === "all" ||
      product.category === selectedCategory;

    if (titleMatches && categoryMatches) {
      visibleProducts.push(product);
    }
  }

  return visibleProducts;
}
```

Mõlemad töötlejad muudavad ainult oma osa rakenduse olekust ja kutsuvad sama renderdamise loogikat.

## Kuva filtrite tulemus

Täienda `renderProducts()` funktsiooni või lisa eraldi funktsioon staatuse uuendamiseks:

```js
function updateResultStatus(visibleProducts) {
  const statusElement = document.querySelector("#status");

  statusElement.textContent =
    `Kuvatakse ${visibleProducts.length} toodet.`;
}
```

Töötlejas:

```js
const visibleProducts = getVisibleProducts();

renderProducts(visibleProducts);
updateResultStatus(visibleProducts);
```

Korduva koodi vältimiseks saad selle panna funktsiooni:

```js
function updateCatalog() {
  const visibleProducts = getVisibleProducts();

  renderProducts(visibleProducts);
  updateResultStatus(visibleProducts);
}
```

## Miks mitte kasutada otsinguks `keydown` sündmust?

`keydown` kirjeldab klahvivajutust, mitte tingimata välja lõplikku väärtusemuutust. See ei kata hästi näiteks:

- hiirega teksti kleepimist;
- brauseri automaattäitmist;
- mobiilse seadme sisestusviise;
- väärtuse muutmist muul viisil.

Kui eesmärk on reageerida väärtuse muutumisele, kasuta `input`-sündmust.

`keydown` sobib tegevusele, mis sõltub kindlast klahvist:

```js
searchInput.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    searchInput.value = "";
  }
});
```

See on laiendus õppijale, kes soovib klaviatuurisündmusi täpsemalt katsetada.

## Praktiline ülesanne: otsi ja filtreeri tooteid

Lisa tootekataloogile otsinguväli ja kategooriavalik.

### Nõuded

1. Otsinguväljal on `input`-kuulaja.
2. Kategooriavalikul on `change`-kuulaja.
3. Rakenduse olekut kirjeldavad `searchTerm` ja `selectedCategory`.
4. Mõlemad filtrid töötavad korraga.
5. Otsing ei erista suur- ja väiketähti.
6. Pärast iga muudatust uuenevad tootekaardid, tühja oleku teade ja tulemuste arv.

### Piirjuhud

Kontrolli:

- otsinguväli on tühi;
- otsing sisaldab ainult tühikuid;
- otsing ei leia ühtegi toodet;
- kategooria on „Kõik kategooriad”;
- valitud kategooria ja otsing annavad koos null tulemust;
- toote nimi sisaldab suuri tähti.

### Vihjed

::: details Vihje 1
Muuda otsingut enne võrdlemist:

```js
searchTerm = event.currentTarget.value.trim().toLowerCase();
```
:::

::: details Vihje 2
Koosta filtrite tulemused ühes `getVisibleProducts()` funktsioonis.
:::

::: details Vihje 3
Loo `updateCatalog()` funktsioon, et mõlemad töötlejad ei kordaks renderdamise samme.
:::

### Kontrollitav tulemus

Valmis töös:

- reageerib otsing kohe teksti muutumisele;
- muutub tulemus kategooria valimisel;
- kuvatakse ainult mõlemale filtrile vastavad tooted;
- kuvatakse null tulemuse korral tühja oleku teade;
- oskad põhjendada `input` ja `change` sündmuste valikut.

## Mõtesta

1. Miks sobib otsinguväljale `input` paremini kui `keydown`?
2. Miks hoitakse otsinguteksti ja kategooriat eraldi muutujates?
3. Miks peaksid erinevad töötlejad kutsuma sama `updateCatalog()` funktsiooni?
4. Kuidas toetab semantiline `button` element klaviatuurikasutajat?

## Laiendus

Lisa otsinguväljale `keydown`-kuulaja, mis puhastab välja `Escape` klahvi vajutamisel. Pärast välja puhastamist uuenda ka `searchTerm` väärtust ja kataloogi.

## Kokkuvõte

- Sündmuse tüüp peab vastama kasutaja tegelikule tegevusele.
- `input` sobib välja väärtuse koheseks jälgimiseks.
- `change` sobib valikuvälja kinnitatud muudatusele.
- Töötleja muudab rakenduse olekut ja kutsub ühist vaate uuendamise funktsiooni.
- Semantiline HTML vähendab käsitsi loodava sündmusloogika hulka.

## Edasi

Järgmises tunnis uurid, miks lingid ja vormid teevad sündmuse järel midagi ka ilma sinu JavaScriptita, ning õpid [brauseri vaikimisi käitumist teadlikult juhtima](./brauser-vaikimisi-kaitumine.md).

## Allikad

- [MDN: Events](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Events) — DOM-sündmuste ülevaade.
- [MDN: `input` event](https://developer.mozilla.org/en-US/docs/Web/API/Element/input_event) — sisestusvälja väärtuse muutumise jälgimine.
- [MDN: `change` event](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/change_event) — kinnitatud väärtusemuudatuse jälgimine.
- [MDN: `KeyboardEvent.key`](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key) — vajutatud klahvi tuvastamine.
