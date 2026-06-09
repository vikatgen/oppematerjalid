---
title: Async ja await
description: Õpi kirjutama loetavat asünkroonset töövoogu async- ja await-võtmesõnadega.
outline: deep
---

# `async` ja `await`

::: info Õpiväljund
Pärast õppetundi oskad oodata Promise'i tulemust `await` abil ning käsitleda asünkroonse töövoo ebaõnnestumist `try...catch...finally` plokiga.
:::

Promise'i ahel kirjeldab asünkroonset töövoogu, kuid mitme järjestikuse sammu puhul võib `.then()` ahel muutuda raskesti loetavaks. `async` ja `await` võimaldavad sama töövoogu kirjutada rida-realt.

## Eeldused ja töövahendid

- Oskad töödelda Promise'i `.then()`, `.catch()` ja `.finally()` abil.
- Kasutad eelmise tunni `getDemoProducts()` funktsiooni.
- Oskad kasutada `try...catch` plokki.
- Soovituslik kestus on 60–75 minutit.

## `async` funktsioon tagastab alati Promise'i

```js
async function getMessage() {
  return "Valmis";
}

const messagePromise = getMessage();

console.log(messagePromise);
```

Kuigi funktsioon tagastab tekstiväärtuse, saab väljakutsuja Promise'i:

```js
getMessage().then((message) => {
  console.log(message);
});
```

See tähendab, et `async` funktsiooni tulemust kasutatakse alati asünkroonselt.

## `await` ootab Promise'i tulemust funktsiooni sees

```js
async function loadDemoProducts() {
  const products = await getDemoProducts(false);

  console.log("Tooted:", products);
}

loadDemoProducts();
```

`await` peatab selle `async` funktsiooni järgmise rea kuni Promise valmib. Brauser ja muu JavaScript saavad ootamise ajal endiselt muid tegevusi töödelda.

::: warning `await` ei peata kogu brauserit
Peatub ainult selle `async` funktsiooni edasine täitmine. Kasutajaliides ja teised sündmused saavad jätkata.
:::

## Võrdle Promise'i ahelat ja `await` kuju

Promise'i ahel:

```js
function loadWithPromise() {
  return getDemoProducts(false).then((products) => {
    renderProducts(products);
    return products.length;
  });
}
```

`async` ja `await`:

```js
async function loadWithAwait() {
  const products = await getDemoProducts(false);

  renderProducts(products);
  return products.length;
}
```

Mõlemad funktsioonid tagastavad Promise'i, mille tulemus on toodete arv.

## Käsitle viga `try...catch` abil

Kui oodatav Promise ebaõnnestub, viskab `await` vea:

```js
async function loadDemoProducts() {
  try {
    const products = await getDemoProducts(true);

    renderProducts(products);
  } catch (error) {
    console.error("Laadimise viga:", error.message);
  }
}
```

`catch` töötab nii rejected Promise'i kui ka `try` ploki muu vea korral.

## Lõpeta laadimisolek `finally` plokis

```js
async function loadDemoProducts() {
  loadButton.disabled = true;
  statusElement.textContent = "Toodete laadimine...";

  try {
    const products = await getDemoProducts(false);

    renderProducts(products);
    statusElement.textContent = `Kuvatakse ${products.length} toodet.`;
  } catch (error) {
    statusElement.textContent = "Toodete laadimine ebaõnnestus.";
    console.error(error);
  } finally {
    loadButton.disabled = false;
  }
}
```

`finally` käivitub pärast õnnestumist või viga. Pane sinna tegevus, mis peab alati toimuma.

## `await` tulemused sõltuvad üksteisest

Kui teine tegevus vajab esimese tulemust, oota neid järjest:

```js
async function loadProductDetails() {
  const products = await getDemoProducts(false);
  const firstProduct = products[0];
  const details = await getDemoDetails(firstProduct.id);

  return details;
}
```

Kui tegevused ei sõltu üksteisest, saab neid paralleelselt käivitada. See on keerulisem võte, mida pole selle ülesande lahendamiseks vaja.

## Ära unusta väljakutse tulemust

`async` funktsiooni käivitamine tagastab Promise'i:

```js
const loadPromise = loadDemoProducts();
```

Sündmuse töötlejas on tavaliselt piisav funktsioon käivitada, kui ta käsitleb enda vead ise:

```js
loadButton.addEventListener("click", () => {
  loadDemoProducts();
});
```

Kui funktsioon viga ei käsitle, peab väljakutsuja seda tegema.

## Levinud vead

### `await` kasutatakse väljaspool sobivat funktsiooni

Algaja projektis hoia `await` `async` funktsiooni sees:

```js
async function loadProducts() {
  const products = await getDemoProducts(false);
}
```

### `async` lisatakse, kuid `await` unustatakse

```js
async function loadProducts() {
  const products = getDemoProducts(false);

  console.log(products); // Promise, mitte toodete massiiv
}
```

### Viga püütakse kinni, kuid kasutajale ei näidata

Console'i logi aitab arendajat, kuid kasutaja vajab samuti nähtavat veaolekut.

## Praktiline ülesanne: kirjuta laadimine ümber `async` funktsiooniks

Kirjuta eelmise tunni Promise'i ahel ümber nimega `async function loadProducts()` funktsiooniks.

### Nõuded

1. Funktsioon märgitakse `async` võtmesõnaga.
2. `getDemoProducts()` tulemust oodatakse `await` abil.
3. `try` plokk sisaldab laadimist ja õnnestumise vaate uuendamist.
4. `catch` kuvab kasutajale veateate ning logib tehnilise vea.
5. `finally` lubab laadimisnupu uuesti.
6. Funktsioon ei sega `.then()` ahelat ja `await` kuju ilma põhjuseta.

### Piirjuhud

Kontrolli:

- laadimine õnnestub;
- laadimine ebaõnnestub;
- toodete massiiv on tühi;
- `renderProducts()` viskab tahtliku vea;
- kasutaja proovib laadimise ajal nuppu uuesti vajutada.

### Vihjed

::: details Vihje 1
Funktsiooni algus:

```js
async function loadProducts() {
  // ...
}
```
:::

::: details Vihje 2
Pane `await` rida `try` plokki, sest Promise võib ebaõnnestuda.
:::

::: details Vihje 3
Nupu uuesti lubamine kuulub `finally` plokki.
:::

### Kontrollitav tulemus

Valmis töös:

- töötab õnnestumise ja vea käitumine samamoodi nagu Promise'i ahelaga;
- on asünkroonsed sammud loetavad ülalt alla;
- ei peata ootamine kasutajaliidest;
- oskad selgitada, mida `async` funktsioon tagastab ja mida `await` ootab.

## Mõtesta

1. Mida tagastab `async` funktsioon isegi siis, kui `return` annab teksti või arvu?
2. Kas `await` peatab kogu brauseri? Põhjenda.
3. Miks peab `await` rida olema sageli `try` plokis?
4. Millised tegevused sobivad `finally` plokki?

## Laiendus

Muuda `loadProducts()` funktsioon tagastama edukalt laaditud toodete arvu. Töötle seda väärtust funktsiooni väljakutsuja juures `.then()` abil, et näha `async` funktsiooni Promise'i.

## Kokkuvõte

- `async` funktsioon tagastab alati Promise'i.
- `await` annab Promise'i õnnestunud väärtuse ja peatab ainult praeguse funktsiooni.
- Rejected Promise muutub `await` real veaks.
- `try...catch...finally` kirjeldab õnnestumise, vea ja alati toimuva lõpetamise.
- `async`/`await` muudab järjestikuse asünkroonse töövoo loetavaks.

## Edasi

Järgmises tunnis kasutad `async` ja `await` oskust, et [küsida päris tooteandmed `fetch()` abil](./fetch.md).

## Allikad

- [MDN: `async function`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function) — `async` funktsioonide käitumine.
- [MDN: `await`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await) — Promise'i tulemuse ootamine.
