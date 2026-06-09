---
title: Vormide töötlemine
description: Õpi lugema vormi väärtuseid, kontrollima sisendit ja lisama vormi põhjal kataloogi uue kohaliku toote.
outline: deep
---

# Vormide töötlemine

::: info Õpiväljund
Pärast õppetundi oskad töödelda vormi `submit`-sündmust, lugeda vormi väärtuseid ning lisada kontrollitud andmete põhjal rakendusse uue kirje.
:::

Vorm koondab kasutaja sisendi üheks tegevuseks. Selles tunnis ehitad tootekataloogile haldusvormi, millega saab lisada kohaliku toote andmemassiivi ja seejärel vaate uuesti renderdada.

## Eeldused ja töövahendid

- Oskad kasutada `submit`-sündmust ja `preventDefault()` meetodit.
- Oskad töötada objektide, massiivide ja DOM-iga.
- Sul on töötav `products` massiiv ning `renderProducts()` funktsioon.
- Soovituslik kestus on 75–90 minutit.

## Koosta semantiline vorm

```html
<form id="product-form">
  <h2>Lisa kohalik toode</h2>

  <label for="product-title">Toote nimi</label>
  <input id="product-title" name="title" required>

  <label for="product-price">Hind</label>
  <input
    id="product-price"
    name="price"
    type="number"
    min="0"
    step="0.01"
    required
  >

  <label for="product-category">Kategooria</label>
  <select id="product-category" name="category" required>
    <option value="">Vali kategooria</option>
    <option value="kotid">Kotid</option>
    <option value="riided">Riided</option>
  </select>

  <label>
    <input name="available" type="checkbox">
    Toode on saadaval
  </label>

  <button type="submit">Lisa toode</button>
</form>
```

Olulised osad:

- `label` seob kirjelduse väljaga;
- `name` määrab vormiandmete võtme;
- sobiv `type` aitab brauseril sisendit kontrollida;
- `required`, `min` ja `step` kirjeldavad lubatud väärtuseid.

## Töötle vormi, mitte üksikuid välju

```js
const productForm = document.querySelector("#product-form");

function handleProductSubmit(event) {
  event.preventDefault();

  console.log("Vorm saadeti.");
}

productForm.addEventListener("submit", handleProductSubmit);
```

Brauser kontrollib HTML-is kirjeldatud nõudeid enne `submit`-sündmuse käivitamist. Kui nõutav väli on tühi või hind ei vasta piirangule, näitab brauser kasutajale veateadet.

## Loe väärtused `FormData` abil

`FormData` kogub vormi edukalt saadetavad väljad nende `name` väärtuste järgi:

```js
function handleProductSubmit(event) {
  event.preventDefault();

  const formData = new FormData(event.currentTarget);

  console.log(formData.get("title"));
  console.log(formData.get("price"));
  console.log(formData.get("category"));
}
```

Vormiväärtused on tavaliselt tekstid. Arv teisenda enne kasutamist:

```js
const price = Number(formData.get("price"));
```

Märkeruut saadetakse ainult siis, kui see on valitud:

```js
const available = formData.has("available");
```

::: warning Ära eelda, et vormiandmed on õiget tüüpi
`type="number"` aitab kasutajal sisestada arvu, kuid `FormData.get("price")` tagastab endiselt teksti. Rakenduse andmeobjekti jaoks teisenda väärtus arvuks.
:::

## Koosta uus tooteobjekt

Hoia järgmise ID jaoks lihtsat loendurit:

```js
let nextProductId = 100;
```

Koosta vormist toode:

```js
function createProductFromForm(form) {
  const formData = new FormData(form);
  const priceText = String(formData.get("price")).trim();

  const product = {
    id: nextProductId,
    title: String(formData.get("title")).trim(),
    price: priceText === "" ? NaN : Number(priceText),
    category: String(formData.get("category")),
    image: "./placeholder.png",
    available: formData.has("available")
  };

  nextProductId += 1;

  return product;
}
```

See funktsioon ainult loeb ja teisendab andmeid. Rakendusse lisamine toimub töötlejas.

## Lisa toode ja uuenda vaade

```js
function handleProductSubmit(event) {
  event.preventDefault();

  const form = event.currentTarget;
  const product = createProductFromForm(form);

  products.push(product);
  updateCatalog();
  form.reset();
}
```

`form.reset()` taastab väljade HTML-is määratud algväärtused. Kutsu seda alles pärast edukat lisamist.

## Rakenduse enda kontroll

HTML-i piirangud annavad esimese kaitsekihi, kuid rakendus peab kontrollima ka enda reegleid:

```js
function isProductValid(product) {
  return (
    product.title.length >= 2 &&
    Number.isFinite(product.price) &&
    product.price >= 0 &&
    product.category !== ""
  );
}
```

Töötlejas:

```js
const product = createProductFromForm(form);

if (!isProductValid(product)) {
  statusElement.textContent = "Kontrolli toote andmeid.";
  return;
}
```

Kui kontroll ebaõnnestub, ära muuda andmemassiivi ega puhasta vormi.

## Veateate kuvamine

Lisa vormi juurde:

```html
<p id="form-message" aria-live="polite"></p>
```

JavaScript:

```js
const formMessage = document.querySelector("#form-message");

formMessage.textContent = "Toode lisati.";
```

`aria-live="polite"` aitab abitehnoloogial dünaamilist teadet sobival hetkel ette lugeda.

## Praktiline ülesanne: lisa vormiga kohalik toode

Täienda tootekataloogi uue toote vormiga.

### Nõuded

1. Kõigil väljadel on seotud `label` ja vajalik `name`.
2. Vorm kasutab sobivaid HTML-i piiranguid.
3. JavaScript kuulab vormi `submit`-sündmust.
4. Vormiväärtused loetakse `FormData` abil.
5. Hind teisendatakse arvuks ning märkeruut tõeväärtuseks.
6. Rakendus kontrollib uut tooteobjekti enne lisamist.
7. Sobiv toode lisatakse `products` massiivi ja kataloog renderdatakse uuesti.
8. Vorm puhastatakse ainult õnnestunud lisamise järel.

### Piirjuhud

Kontrolli:

- nimi on tühi;
- nimi sisaldab ainult ühte märki;
- hind on tühi;
- hind on negatiivne;
- kategooria jääb valimata;
- märkeruut on valitud või valimata;
- vorm saadetakse Enter-klahviga.

### Vihjed

::: details Vihje 1
`FormData` kasutab võtmetena väljade `name` atribuute, mitte `id` väärtuseid.
:::

::: details Vihje 2
Hinna teisendamiseks kasuta:

```js
const price = Number(formData.get("price"));
```
:::

::: details Vihje 3
Jaga lahendus funktsioonideks: vormist objekti loomine, objekti kontrollimine ja vormi töötlemine.
:::

### Kontrollitav tulemus

Valmis töös:

- ilmub sobivate andmetega uus toode kohe kataloogi;
- ei lisata vigaste andmetega toodet;
- säilib vormis parandamist vajav sisend vea korral;
- puhastub vorm õnnestumise järel;
- oskad näidata, millised väärtused on tekstid, arvud ja tõeväärtused.

## Mõtesta

1. Miks on `name` vormi töötlemisel vajalik?
2. Miks tuleb hind teisendada arvuks ka `type="number"` välja puhul?
3. Miks ei peaks vormi vea korral puhastama?
4. Mis vahe on HTML-i sisendipiirangul ja rakenduse enda kontrollil?

## Laiendus

Lisa kirjeldusväli ning kontrolli, et kirjeldus oleks vähemalt kümme märki pikk. Kuva veateates täpselt, milline reegel ebaõnnestus.

## Kokkuvõte

- Vormi põhisündmus on `submit`, mida kuulatakse vormil.
- `FormData` loeb väljad nende `name` väärtuste järgi.
- Vormi väärtused tuleb teisendada rakenduse jaoks sobivatesse tüüpidesse.
- HTML-i piirangud ja rakenduse kontroll täiendavad teineteist.
- Eduka tegevuse järel uuendatakse andmeid, renderdatakse vaade ja puhastatakse vorm.

## Edasi

Järgmises tunnis ühendad kõik dünaamiliselt loodud tootekaartide nupud ühe kuulajaga, kasutades [sündmuste delegeerimist](./sundmuste-delegeerimine.md).

## Allikad

- [MDN: Web forms](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms) — vormide koostamise ja töötlemise ülevaade.
- [MDN: `FormData`](https://developer.mozilla.org/en-US/docs/Web/API/FormData) — vormiväärtuste lugemine.
- [MDN: Client-side form validation](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms/Form_validation) — HTML-i sisendipiirangud.
