---
title: Kohandatud sündmused
description: Lisalugemine rakenduse enda sündmuste loomisest ja osade omavahelisest suhtlusest.
outline: deep
---

# Kohandatud sündmused

::: warning Lisamaterjal
Loe seda materjali, kui soovid, et rakenduse üks osa annaks toimunud tegevusest teistele osadele teada ilma nende funktsioone otse kutsumata.
:::

Brauser loob sündmuseid nagu `click`, `input` ja `submit`. Rakendus saab luua ka enda tähendusega sündmuseid, näiteks:

```text
cart:changed
product:added
catalog:loaded
```

## Otsene funktsioonikutse

Ostukorvi muutmisel võid kutsuda kõik vajalikud funktsioonid otse:

```js
function addToCart(productId) {
  cartProductIds.push(productId);
  saveCart();
  updateCartCount();
  showCartMessage();
}
```

Väikeses rakenduses on see selge ja sobiv. Rakenduse kasvades peab `addToCart()` aga teadma kõigist osadest, mis ostukorvi muutusele reageerivad.

Kohandatud sündmus võimaldab tal teatada ainult fakti:

```text
ostukorv muutus
```

Kuulajad otsustavad ise, kuidas sellele reageerida.

## Loo `CustomEvent`

```js
const cartChangedEvent = new CustomEvent("cart:changed");

document.dispatchEvent(cartChangedEvent);
```

- `CustomEvent()` loob sündmuse;
- sündmuse nimi kirjeldab rakenduses toimunut;
- `dispatchEvent()` käivitab sündmuse valitud elemendil.

Kuula sündmust:

```js
document.addEventListener("cart:changed", () => {
  console.log("Ostukorv muutus.");
});
```

## Anna sündmusega andmed kaasa

`detail` omadus kannab sündmusega seotud lisainfot:

```js
const event = new CustomEvent("cart:changed", {
  detail: {
    productId: 7,
    cartCount: 3
  }
});

document.dispatchEvent(event);
```

Kuulaja:

```js
document.addEventListener("cart:changed", (event) => {
  console.log(event.detail.productId);
  console.log(event.detail.cartCount);
});
```

Sündmuse andmekuju on rakenduse kokkulepe. Kirjelda see selgelt ja hoia võimalikult väike.

## Rakenda tootekataloogis

```js
function notifyCartChanged(productId) {
  const event = new CustomEvent("cart:changed", {
    detail: {
      productId,
      cartCount: cartProductIds.length
    }
  });

  document.dispatchEvent(event);
}
```

Ostukorvi muutmisel:

```js
function addToCart(productId) {
  cartProductIds.push(productId);
  saveCart();
  notifyCartChanged(productId);
}
```

Eraldi kuulajad:

```js
document.addEventListener("cart:changed", (event) => {
  cartCount.textContent = String(event.detail.cartCount);
});

document.addEventListener("cart:changed", (event) => {
  statusElement.textContent =
    `Toode ${event.detail.productId} lisati ostukorvi.`;
});
```

`addToCart()` ei pea teadma, millised kasutajaliidese osad muutusele reageerivad.

## Sündmuse nimi kirjeldab toimunut

Eelista nime, mis kirjeldab juhtunut:

```text
cart:changed
product:added
catalog:loaded
```

Väldi nime, mis käsib konkreetset vaadet muuta:

```text
update-cart-count-text
```

Hea sündmus kirjeldab fakti. Kuulaja otsustab tegevuse.

## Mullitamine

Kohandatud sündmus ei mullita vaikimisi. Soovi korral luba mullitamine:

```js
const event = new CustomEvent("product:selected", {
  bubbles: true,
  detail: {
    productId: 7
  }
});

productCard.dispatchEvent(event);
```

Nüüd saab mõni esivanem sündmust kuulata:

```js
productList.addEventListener("product:selected", (event) => {
  console.log(event.detail.productId);
});
```

See kasutab sama sündmuste levimise mudelit, mida õppisid delegeerimise juures.

## Millal kohandatud sündmus sobib?

Kohandatud sündmus võib aidata, kui:

- mitu sõltumatut rakenduse osa reageerivad samale faktile;
- sündmus liigub loomulikult DOM-puus;
- soovid hoida sündmuse algataja kuulajatest sõltumatuna.

Otsene funktsioonikutse on sageli selgem, kui:

- tegevusel on üks teadaolev vastuvõtja;
- andmed tuleb kohe tagasi saada;
- sündmuste kasutamine varjaks töövoogu.

::: tip Kohandatud sündmus ei ole automaatselt parem
Kasuta seda siis, kui sündmuse tähendus teeb rakenduse osade suhtluse selgemaks. Väikese ühefunktsioonilise tegevuse jaoks on otsene kutse tavaliselt lihtsam.
:::

## Ennusta ja kontrolli

```js
document.addEventListener("demo:ready", (event) => {
  console.log("Kuulaja A:", event.detail);
});

document.addEventListener("demo:ready", () => {
  console.log("Kuulaja B");
});

document.dispatchEvent(
  new CustomEvent("demo:ready", {
    detail: { value: 42 }
  })
);
```

Ennusta:

- mitu kuulajat käivitub;
- milline andmeobjekt jõuab kuulajani;
- kas `dispatchEvent()` ootab kuulajate lõpetamist.

::: details Vastus
Käivituvad mõlemad kuulajad. Esimese kuulaja `event.detail` on `{ value: 42 }`. `dispatchEvent()` käivitab kuulajad sünkroonselt ehk kutse lõpeb pärast kuulajate täitmist.
:::

## Uurimisülesanne: ostukorvi muutumise sündmus

1. Loo sündmus `cart:changed`.
2. Anna `detail` kaudu kaasa ostukorvi toodete arv.
3. Lisa üks kuulaja, mis uuendab arvu DOM-is.
4. Lisa teine kuulaja, mis logib muutuse Console'i.
5. Selgita, mida sündmuse algataja kuulajatest teab.

## Kokkuvõte

- `CustomEvent` võimaldab rakendusel luua enda tähendusega sündmuseid.
- `dispatchEvent()` käivitab sündmuse valitud elemendil.
- `detail` kannab sündmusega seotud andmeid.
- Hea sündmuse nimi kirjeldab toimunud fakti.
- Kohandatud sündmus sobib mitme sõltumatu kuulaja teavitamiseks, kuid ei asenda alati selget funktsioonikutset.

## Allikad

- [MDN: `CustomEvent`](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent) — kohandatud sündmuse loomine.
- [MDN: `EventTarget.dispatchEvent()`](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/dispatchEvent) — sündmuse käivitamine.
