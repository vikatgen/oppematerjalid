---
title: URL ja URLSearchParams
description: Õpi lugema, koostama ja muutma veebiaadresse JavaScripti URL API abil.
outline: deep
---

# URL ja `URLSearchParams`

::: info Õpiväljund
Pärast õppetundi oskad lugeda URL-i osi ning hoida rakenduse filtreid aadressi päringuparameetrites.
:::

Kui soovid mõista, kuidas URL aitab brauseril serverini jõuda, vaata ka [URL-i, domeeni ja DNS-i](/veebiarendus/url-domeen-ja-dns).

URL ei ole ainult tekst. See kirjeldab, kust ressurssi küsitakse ja milline rakenduse vaade kasutajale avatakse.

```text
https://shop.example/products?category=books&search=js#results
```

## URL-i osad

```js
const url = new URL(
  "https://shop.example:443/products?category=books#results"
);

console.log(url.protocol); // "https:"
console.log(url.hostname); // "shop.example"
console.log(url.port);     // ""
console.log(url.pathname); // "/products"
console.log(url.search);   // "?category=books"
console.log(url.hash);     // "#results"
console.log(url.origin);   // "https://shop.example"
```

`origin` koosneb protokollist, hostist ja pordist. See muutub oluliseks CORS-i mõistmisel.

## Suhteline URL vajab baasaadressi

```js
const productUrl = new URL("/products/7", window.location.origin);

console.log(productUrl.href);
```

`new URL()` aitab vältida aadresside käsitsi liitmisel tekkivaid kaldkriipsu- ja kodeerimisvigu.

## Päringuparameetrid

```js
const url = new URL(window.location.href);

console.log(url.searchParams.get("search"));
console.log(url.searchParams.get("category"));
```

Muutmine:

```js
url.searchParams.set("search", "seljakott");
url.searchParams.set("category", "kotid");
url.searchParams.delete("page");
```

`URLSearchParams` kodeerib erimärgid sobivalt:

```js
const params = new URLSearchParams();
params.set("search", "must särk");

console.log(params.toString()); // search=must+s%C3%A4rk
```

## Uuenda aadressi lehte laadimata

```js
window.history.replaceState({}, "", url);
```

See muudab aadressiriba, kuid ei tee uut võrgupäringut ega laadi lehte uuesti.

Tootekataloogis:

```js
function saveFiltersToUrl() {
  const url = new URL(window.location.href);

  if (searchTerm === "") {
    url.searchParams.delete("search");
  } else {
    url.searchParams.set("search", searchTerm);
  }

  url.searchParams.set("category", selectedCategory);
  window.history.replaceState({}, "", url);
}
```

Nii saab kasutaja filtreeritud vaate aadressi jagada.

## Taasta filtrid URL-ist

```js
const url = new URL(window.location.href);

const searchTerm = url.searchParams.get("search") ?? "";
const selectedCategory =
  url.searchParams.get("category") ?? "all";
```

URL-ist loetud väärtused on sisend. Kontrolli, kas kategooria on rakenduses lubatud.

## URL, sessionStorage või localStorage?

| Vajadus | Sobiv koht |
| --- | --- |
| vaade peab olema jagatava aadressiga | URL |
| ajutine olek peab säilima samas vahelehes | `sessionStorage` |
| kasutaja valik peab säilima järgmisel külastusel | `localStorage` |

Sama väärtust ei tasu põhjuseta mitmes kohas hoida. Vali üks selge olekuallikas.

## Praktiline ülesanne

Täienda tootekataloogi nii, et otsing ja kategooria:

1. kirjutatakse URL-i päringuparameetritesse;
2. taastatakse lehe avamisel URL-ist;
3. eemaldatakse aadressist, kui otsing on tühi;
4. ei põhjusta lehe uuesti laadimist.

Kontrolli aadressi jagamist uues vahelehes.

## Mõtesta

- Mis vahe on `hostname`, `pathname` ja `search` väärtustel?
- Miks on `URLSearchParams` parem kui päringuteksti käsitsi koostamine?
- Milline rakenduse olek sobib URL-i ja milline mitte?

## Kokkuvõte

- `URL` esindab veebiaadressi struktureeritud objektina.
- `URLSearchParams` loeb ja muudab päringuparameetreid.
- URL sobib jagatava ja taastatava vaate olekuks.
- URL-ist loetud väärtuseid tuleb kontrollida.

## Allikad

- [MDN: URL API](https://developer.mozilla.org/en-US/docs/Web/API/URL_API)
- [MDN: URLSearchParams](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams)
- [MDN: History.replaceState()](https://developer.mozilla.org/en-US/docs/Web/API/History/replaceState)
