---
title: Sündmuste delegeerimine
description: Õpi töötlema dünaamiliste lapselementide sündmuseid ühe vanemelemendi kuulajaga.
outline: deep
---

# Sündmuste delegeerimine

::: info Õpiväljund
Pärast õppetundi oskad kasutada sündmuste levimist, et töödelda dünaamiliste tootekaartide tegevusi ühe vanemelemendi kuulajaga.
:::

Tootekaardid luuakse ja asendatakse iga renderdamise ajal. Kui lisad kuulaja eraldi igale nupule, pead seda pärast iga renderdust uuesti tegema. Sündmuste delegeerimine lahendab probleemi ühe püsiva kuulajaga.

Selles tunnis lisad tootekataloogile töötavad „Lisa ostukorvi” nupud ja valmistad ostukorvi oleku ette järgmise `localStorage` osa jaoks.

## Eeldused ja töövahendid

- Oskad luua dünaamilisi tootekaartide elemente.
- Oskad lisada sündmusekuulajaid ja kasutada `dataset` väärtuseid.
- Sul on `#product-list` konteiner ning `renderProducts()` funktsioon.
- Soovituslik kestus on 75–90 minutit.

## Sündmus liigub DOM-puus

Kui kasutaja vajutab tootekaardi nupule, toimub sündmus esmalt nupul ja liigub seejärel läbi tema esivanemate ülespoole. Seda nimetatakse **mullitamiseks** (*bubbling*).

```text
button.add-to-cart
└─ article.product-card
   └─ div#product-list
      └─ document
```

Seetõttu saab `#product-list` kuulata tema sees olevate nuppude klõpse.

## `target` ja `currentTarget`

Lisa kuulaja toodete loendile:

```js
const productList = document.querySelector("#product-list");

function handleProductListClick(event) {
  console.log("Tegevuse algus:", event.target);
  console.log("Kuulajaga element:", event.currentTarget);
}

productList.addEventListener("click", handleProductListClick);
```

- `event.target` on element, millelt sündmus algas;
- `event.currentTarget` on element, mille kuulajat parajasti käivitatakse.

Delegeerimisel on `currentTarget` alati `productList`, kuid `target` sõltub kasutaja vajutatud elemendist.

## Leia õige tegevusnupp

Nupu sees võib hiljem olla ikoon või muu element:

```html
<button class="add-to-cart" type="button">
  <span>Lisa ostukorvi</span>
</button>
```

Kui kasutaja vajutab `span` elemendile, on `event.target` span, mitte nupp. Leia lähim sobiv esivanem:

```js
function handleProductListClick(event) {
  const addButton = event.target.closest(".add-to-cart");

  if (addButton === null) {
    return;
  }

  console.log("Leitud nupp:", addButton);
}
```

`closest()` alustab elemendist endast ja liigub DOM-puus üles, kuni leiab sobiva selektori.

## Seo nupp toote andmetega

Tootekaardi loomisel lisasid kaardile toote ID:

```js
card.dataset.productId = String(product.id);
```

Leia nupu juurest kaart ja ID:

```js
function handleProductListClick(event) {
  const addButton = event.target.closest(".add-to-cart");

  if (addButton === null) {
    return;
  }

  const productCard = addButton.closest(".product-card");
  const productId = Number(productCard.dataset.productId);

  console.log("Lisa ostukorvi toode:", productId);
}
```

::: warning Kontrolli, et tegevus kuulub sinu konteinerisse
Kui kuulaja konteiner võib sisaldada või piirneda muu keeruka sisuga, kontrolli lisaks:

```js
if (addButton === null || !productList.contains(addButton)) {
  return;
}
```
:::

## Leia toode massiivist

Kasutame siin tsüklit, mille tööd saad rida-realt jälgida. Lühemat `find()` lahendust saad uurida [massiivimeetodite lisalugemisest](/javascript/lisalugemine/massiivimeetodid-ja-callbackid):

```js
function getProductById(productId) {
  for (const product of products) {
    if (product.id === productId) {
      return product;
    }
  }

  return null;
}
```

Töötlejas:

```js
const product = getProductById(productId);

if (product === null) {
  console.log("Toodet ei leitud.");
  return;
}
```

## Lisa toode ostukorvi olekusse

Alusta lihtsa ID-de massiiviga:

```js
const cartProductIds = [];
```

Kontrolli, kas ID on juba olemas:

```js
function cartContainsProduct(productId) {
  for (const cartProductId of cartProductIds) {
    if (cartProductId === productId) {
      return true;
    }
  }

  return false;
}
```

Lisa töötlejas:

```js
if (!cartContainsProduct(productId)) {
  cartProductIds.push(productId);
}

updateCartCount();
```

Kuva ostukorvi suurus:

```html
<p>Ostukorvis: <span id="cart-count">0</span></p>
```

```js
const cartCount = document.querySelector("#cart-count");

function updateCartCount() {
  cartCount.textContent = String(cartProductIds.length);
}
```

## Miks delegeerimine töötab pärast renderdamist?

`renderProducts()` eemaldab ja loob tootekaardid uuesti. `productList` konteiner jääb aga samaks:

```js
productList.addEventListener("click", handleProductListClick);
```

Uued nupud ei vaja eraldi kuulajaid. Nende klõpsud mullitavad sama püsiva konteinerini.

::: tip Delegeeri ühisele püsivale vanemale
Vali kuulajaks võimalikult lähedal asuv element, mis jääb alles ka siis, kui tema sees olevad elemendid uuesti renderdatakse.
:::

## Millal delegeerimist mitte kasutada?

Delegeerimine pole alati vajalik:

- üksikul staatilisel nupul on selgem oma kuulaja;
- kõik sündmused ei mullita ühtemoodi;
- väga kauge ühine vanem võib muuta loogika raskesti jälgitavaks.

Kasuta delegeerimist siis, kui mitu sarnast või dünaamilist lapselementi vajavad sama liiki tegevust.

## Praktiline ülesanne: lisa dünaamilised tooted ostukorvi

Täienda tootekataloogi nii, et iga saadaval toote nupp lisab toote ostukorvi olekusse.

### Nõuded

1. `#product-list` elemendil on üks `click`-kuulaja.
2. Töötleja ignoreerib klõpse, mis ei pärine `.add-to-cart` nupust.
3. Nupu juurest leitakse lähim `.product-card`.
4. Toote ID loetakse `data-product-id` väärtusest ja teisendatakse arvuks.
5. ID järgi leitakse vastav tooteobjekt.
6. Sama toodet ei lisata ostukorvi kaks korda.
7. Ostukorvi toodete arv kuvatakse DOM-is.
8. Lahendus töötab ka pärast `renderProducts()` uut käivitamist.

### Piirjuhud

Kontrolli:

- kasutaja vajutab nupu sees olevale `span` elemendile;
- kasutaja vajutab tootekaardi pealkirjale;
- toote ID puudub või ei vasta ühelegi tootele;
- sama nuppu vajutatakse mitu korda;
- tooted renderdatakse pärast kuulaja lisamist uuesti;
- mittesaadaval toote nupp on keelatud.

### Vihjed

::: details Vihje 1
Alusta tegevusnupu leidmisest:

```js
const addButton = event.target.closest(".add-to-cart");
```
:::

::: details Vihje 2
Toote ID asub kaardil, mitte tingimata nupul.
:::

::: details Vihje 3
Jaga töötleja abifunktsioonideks: `getProductById()`, `cartContainsProduct()` ja `updateCartCount()`.
:::

### Kontrollitav tulemus

Valmis töös:

- töötab üks konteineri kuulaja kõigi praeguste ja tulevaste tootekaartidega;
- muutub ostukorvi arv ainult sobiva nupu vajutamisel;
- ei lisata tundmatut ega sama toodet korduvalt;
- oskad Console'is näidata `target` ja `currentTarget` erinevust;
- töötab lahendus pärast otsimist, filtreerimist ja uuesti renderdamist.

## Mõtesta

1. Miks kaovad eraldi nuppude kuulajad, kui kaardid renderdamisel asendatakse?
2. Mis vahe on `event.target` ja `event.currentTarget` väärtusel?
3. Miks kasutatakse nupu leidmiseks `closest()` meetodit?
4. Milline element on selle ülesande jaoks sobivaim delegeerimise vanem ja miks?

## Laiendus

Lisa tootekaardile teine tegevusnupp klassiga `.remove-from-cart`. Kasuta sama `productList` kuulajat, kuid vali tegevus vajutatud nupu klassi järgi.

## Kokkuvõte

- Mullitav sündmus liigub alguselemendilt läbi esivanemate ülespoole.
- Delegeerimine kasutab ühise vanema üht kuulajat paljude laste sündmuste töötlemiseks.
- `target` näitab sündmuse alguselementi ja `currentTarget` kuulajaga elementi.
- `closest()` aitab leida tegevusega seotud lähima elemendi.
- Delegeerimine sobib eriti hästi dünaamiliselt loodud elementidele.

## Edasi

Nüüd reageerib tootekataloog kasutaja tegevustele. Järgmisena õpid [ostukorvi olekut brauseris säilitama](../andmed-brauseris/localstorage.md).

## Allikad

- [MDN: Event bubbling](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Event_bubbling) — sündmuste levimine ja delegeerimine.
- [MDN: `Event.target`](https://developer.mozilla.org/en-US/docs/Web/API/Event/target) — sündmuse alguselement.
- [MDN: `Element.closest()`](https://developer.mozilla.org/en-US/docs/Web/API/Element/closest) — lähima sobiva esivanema leidmine.
