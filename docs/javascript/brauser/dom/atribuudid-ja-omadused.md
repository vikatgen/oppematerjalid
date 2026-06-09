---
title: Atribuudid ja omadused
description: Õpi lugema ja muutma DOM-elementide omadusi ning HTML-atribuute.
outline: deep
---

# Atribuudid ja omadused

::: info Õpiväljund
Pärast õppetundi oskad valida sobiva DOM-omaduse või atribuudimeetodi ning seadistada JavaScriptiga olemasoleva elemendi käitumiseks vajalikke väärtusi.
:::

Eelmises tunnis leidsid DOM-ist vajalikud elemendid. Nüüd õpid lugema ja muutma nende omadusi: pildi aadressi, nupu keelatud olekut, sisestusvälja väärtust ning rakenduse enda `data-*` atribuute.

## Eeldused ja töövahendid

- Oskad kasutada `querySelector()` ja `querySelectorAll()` meetodeid.
- Sul on `tootekataloog` projekt vähemalt ühe tootekaardiga.
- Oskad kontrollida elementi Elements- ja Console-paneelis.
- Soovituslik kestus on 60–75 minutit.

## HTML-atribuut ja DOM-omadus

HTML-is kirjutatud lisainfo on **atribuut** (*attribute*):

```html
<button type="button" disabled>Lisa ostukorvi</button>
```

Kui brauser loob sellest DOM-elemendi, saab JavaScript töötada objekti **omadustega** (*properties*):

```js
const button = document.querySelector("button");

console.log(button.type); // "button"
console.log(button.disabled); // true
```

HTML-atribuut annab elemendile algväärtuse. DOM-omadus kirjeldab sageli elemendi hetkeolekut.

::: tip Praktiline põhimõte
Kui elemendil on selge DOM-omadus, kasuta tavaliselt seda. Üldiste ja rakenduse enda atribuutide jaoks kasuta atribuudimeetodeid või `dataset` omadust.
:::

## Levinud DOM-omadused

Täienda tootekaarti pildi ja nupuga:

```html
<article class="product-card">
  <img class="product-image" src="./placeholder.png" alt="Näidistoode">
  <h3>Näidistoode</h3>
  <p class="product-price">19.99 €</p>
  <button class="add-to-cart" type="button">Lisa ostukorvi</button>
</article>
```

Lisa projekti enda valitud pildifail nimega `placeholder.png` või asenda näites olev failitee mõne olemasoleva kohaliku pildi teega.

JavaScriptiga saad omadusi lugeda ja muuta:

```js
const image = document.querySelector(".product-image");
const button = document.querySelector(".add-to-cart");

console.log(image.src);
console.log(image.alt);
console.log(button.disabled);

image.alt = "Must seljakott";
button.disabled = true;
```

Mõned kasulikud omadused:

| Element | Omadus | Näide |
| --- | --- | --- |
| pilt | `src`, `alt` | `image.alt = "Must seljakott"` |
| link | `href` | `link.href = "/tooted/1"` |
| sisestusväli | `value`, `checked` | `searchInput.value = "särk"` |
| nupp | `disabled` | `button.disabled = true` |

## Atribuutide meetodid

Kõigil atribuutidel pole sobivat eraldi DOM-omadust. Üldiseks lugemiseks ja muutmiseks saad kasutada:

```js
const productCard = document.querySelector(".product-card");

productCard.setAttribute("aria-label", "Toode: Näidistoode");

console.log(productCard.getAttribute("aria-label"));
console.log(productCard.hasAttribute("aria-label"));

productCard.removeAttribute("aria-label");
```

Meetodite eesmärgid:

- `getAttribute(name)` loeb atribuudi väärtuse;
- `setAttribute(name, value)` lisab atribuudi või muudab selle väärtust;
- `hasAttribute(name)` kontrollib atribuudi olemasolu;
- `removeAttribute(name)` eemaldab atribuudi.

### Tõeväärtusatribuudid

`disabled`, `checked` ja `required` on tõeväärtusatribuudid. HTML-is tähendab nende olemasolu väärtust `true`.

```html
<button disabled>Lisa ostukorvi</button>
```

JavaScriptis on selgem muuta vastavat omadust:

```js
button.disabled = true;
button.disabled = false;
```

Ära tee nii:

```js
button.setAttribute("disabled", "false");
```

Atribuut on endiselt olemas, seega jääb nupp keelatuks.

## Rakenduse andmed `data-*` atribuutides

Tootekaardi juurde saab salvestada rakendusele vajaliku ID:

```html
<article class="product-card" data-product-id="7">
  ...
</article>
```

JavaScriptis loe ja muuda seda `dataset` omaduse kaudu:

```js
const productCard = document.querySelector(".product-card");

console.log(productCard.dataset.productId); // "7"

productCard.dataset.productId = "12";
```

HTML-i `data-product-id` muutub JavaScriptis kujule `dataset.productId`.

::: warning `dataset` väärtused on tekst
Ka siis, kui HTML-is on `data-product-id="7"`, saad JavaScriptis väärtuse `"7"`. Arvutamiseks teisenda see vajadusel arvuks.
:::

## Atribuudi ja omaduse erinevus sisestusväljal

Lisa ajutiselt otsinguväli:

```html
<input id="search" type="search" value="särk">
```

Seejärel kirjuta brauseris väljale uus tekst ja kontrolli Console'is:

```js
const searchInput = document.querySelector("#search");

console.log(searchInput.getAttribute("value"));
console.log(searchInput.value);
```

`value` atribuut kirjeldab HTML-is määratud algväärtust. `value` omadus kirjeldab välja hetkeväärtust.

See on põhjus, miks vormi töötlemisel loetakse tavaliselt omadust:

```js
console.log(searchInput.value);
```

## Praktiline ülesanne: seadista tootekaart andmetega

Kasuta lokaalset tooteobjekti:

```js
const product = {
  id: 7,
  title: "Must seljakott",
  image: "./placeholder.png",
  available: false
};
```

Täienda tootekaardi HTML-i nii, et seal on:

- `.product-card`;
- `.product-image`;
- `.add-to-cart` nupp.

Seadista JavaScriptiga:

1. tootekaardi `data-product-id`;
2. pildi `src`;
3. pildi kirjeldav `alt`;
4. nupu `disabled` olek vastavalt `product.available` väärtusele;
5. tootekaardi `aria-label`, mis sisaldab toote nime.

Lähtekoht:

```js
const productCard = document.querySelector(".product-card");
const productImage = productCard.querySelector(".product-image");
const addButton = productCard.querySelector(".add-to-cart");

productCard.dataset.productId = String(product.id);
// Täienda ülejäänud omadused ja atribuudid.
```

### Piirjuhud

Kontrolli:

- `available` on `true`;
- `available` on `false`;
- pildi `alt` on tühi või kirjeldamatu;
- `data-product-id` väärtus puudub;
- selektoriga otsitud elementi ei leita.

### Vihjed

::: details Vihje 1
Pildi aadressi ja alternatiivteksti jaoks kasuta `src` ning `alt` omadusi.
:::

::: details Vihje 2
Nupu keelatud oleku saad siduda otse tõeväärtusega:

```js
addButton.disabled = !product.available;
```
:::

::: details Vihje 3
`aria-label` saad lisada `setAttribute()` meetodiga.
:::

### Kontrollitav tulemus

Valmis töös:

- vastab `data-product-id` toote ID-le;
- sisaldab pildi `alt` toote nime;
- on nupp keelatud ainult siis, kui toode pole saadaval;
- kajastuvad väärtused Elements-paneelis;
- oskad põhjendada, miks kasutasid mõnes kohas omadust ja mõnes atribuudimeetodit.

## Mõtesta

1. Miks kasutatakse vormivälja hetkeväärtuse lugemiseks `input.value` omadust?
2. Miks ei sobi `setAttribute("disabled", "false")` nupu lubamiseks?
3. Millal on `data-*` atribuut kasulik?
4. Miks peab pildil olema sisuline `alt` tekst?

## Laiendus

Lisa tootekaardile link:

```html
<a class="product-link">Vaata toodet</a>
```

Määra JavaScriptiga lingi `href` väärtuseks `/tooted/{id}` ning kontrolli Elements-paneelis tulemust.

## Kokkuvõte

- HTML-atribuut annab elemendile lähtekoodis alginfo.
- DOM-omadus kirjeldab sageli elemendi hetkeolekut.
- Levinud omadusi saab lugeda ja muuta otse, näiteks `image.alt` või `button.disabled`.
- Üldiste atribuutide jaoks sobivad `getAttribute()` ja `setAttribute()`.
- Rakenduse enda `data-*` atribuute saab kasutada `dataset` omaduse kaudu.

## Edasi

Järgmises tunnis kasutad leitud elemente ja kohalikke tooteandmeid, et [muuta dokumendi nähtavat sisu](./dokumendi-muutmine.md).

## Allikad

- [MDN: Element attributes](https://developer.mozilla.org/en-US/docs/Web/API/Element/attributes) — HTML-atribuutide ja DOM-i seos.
- [MDN: `Element.setAttribute()`](https://developer.mozilla.org/en-US/docs/Web/API/Element/setAttribute) — atribuutide seadistamine.
- [MDN: `HTMLElement.dataset`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dataset) — `data-*` atribuutide kasutamine.
