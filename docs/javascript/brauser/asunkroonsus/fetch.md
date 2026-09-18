---
title: Andmete küsimine fetch abil
description: Õpi tegema HTTP GET-päringut, kontrollima vastust ning kasutama JSON-andmeid tootekataloogis.
outline: deep
---

# Andmete küsimine `fetch()` abil

::: info Õpiväljund
Pärast õppetundi oskad küsida `fetch()` abil serverist JSON-andmeid, kontrollida HTTP-vastust ning anda sobivad tooted olemasolevale renderdamisfunktsioonile.
:::

Seni kasutas tootekataloog failis kirjutatud kohalikke tooteid. Nüüd asendad need Fake Store API-st saabuvate andmetega.

## Eeldused ja töövahendid

- Oskad kasutada `async`, `await` ja `try...catch` töövoogu.
- Sul on töötav `renderProducts(products)` funktsioon.
- Oskad kasutada DevToolsi Console- ja Network-paneeli.
- Kasuta projekti kohaliku serveri kaudu.
- Soovituslik kestus on 75–90 minutit.

## Mis on HTTP-päring?

Brauser saab serverilt andmeid küsida HTTP-päringuga. Päring sisaldab muu hulgas:

- aadressi ehk URL-i;
- meetodit, näiteks `GET`;
- vajadusel päiseid ja saadetavaid andmeid.

Server saadab HTTP-vastuse, mis sisaldab:

- olekukoodi, näiteks `200` või `404`;
- päiseid;
- vastuse sisu.

Selles tunnis kasutad ainult `GET`-päringut, mis küsib andmeid serverit muutmata.

HTTP mõistete põhjalikumaks selgituseks vaata [HTTP päringut ja vastust](/veebiarendus/http-paring-ja-vastus). Päringu uurimist harjutad [Network-paneeli tunnis](/veebiarendus/network-paneel).

## Esimene `fetch()` päring

```js
const PRODUCTS_URL = "https://fakestoreapi.com/products";

async function loadProducts() {
  const response = await fetch(PRODUCTS_URL);

  console.log(response);
}

loadProducts();
```

`fetch()` tagastab Promise'i. Selle õnnestunud väärtus on `Response` objekt, mitte veel toodete massiiv.

Kontrolli Network-paneelis:

- päringu aadressi;
- meetodit `GET`;
- olekukoodi;
- vastuse eelvaadet.

## Kontrolli HTTP-vastust

`fetch()` Promise ebaõnnestub tavaliselt võrguprobleemi korral. HTTP veakood, näiteks `404` või `500`, annab siiski `Response` objekti.

Seetõttu kontrolli `response.ok` väärtust:

```js
async function loadProducts() {
  const response = await fetch(PRODUCTS_URL);

  if (!response.ok) {
    throw new Error(`HTTP viga: ${response.status}`);
  }

  console.log("Vastus õnnestus:", response.status);
}
```

`response.ok` on `true`, kui olekukood jääb vahemikku 200–299.

::: warning `fetch()` ei viska HTTP veakoodi puhul automaatselt viga
`try...catch` üksi ei tuvasta kõiki serveri veavastuseid. Kontrolli alati enne keha kasutamist `response.ok`.
:::

## Loe JSON-vastus

Fake Store API vastuse sisu on JSON. Selle teisendamine JavaScripti väärtuseks on samuti asünkroonne:

```js
async function loadProducts() {
  const response = await fetch(PRODUCTS_URL);

  if (!response.ok) {
    throw new Error(`HTTP viga: ${response.status}`);
  }

  const products = await response.json();

  console.log(products);
}
```

`response.json()` loeb vastuse keha ja tagastab Promise'i, mille tulemuseks on JavaScripti väärtus.

## Eralda andmete küsimine vaate uuendamisest

Koosta funktsioon, mille ainus vastutus on tooted serverist tuua:

```js
async function fetchProducts() {
  const response = await fetch(PRODUCTS_URL);

  if (!response.ok) {
    throw new Error(`HTTP viga: ${response.status}`);
  }

  const products = await response.json();

  if (!Array.isArray(products)) {
    throw new Error("Serveri vastus ei ole toodete massiiv.");
  }

  return products;
}
```

Seejärel kasuta seda rakenduse laadimisfunktsioonis:

```js
async function loadProducts() {
  try {
    const products = await fetchProducts();

    renderProducts(products);
  } catch (error) {
    console.error("Toodete laadimine ebaõnnestus:", error);
  }
}
```

See jaotus hoiab päringu, vea kontrolli ja DOM-i muutmise eraldi vastutustena.

## Kohanda API andmed olemasolevale rakendusele

Fake Store API tooteobjektidel on muu hulgas:

```js
{
  id: 1,
  title: "...",
  price: 109.95,
  description: "...",
  category: "...",
  image: "https://..."
}
```

Sinu varasem tootekaart kasutas ka `available` omadust, mida API vastuses ei ole. Ära eelda puuduvat väärtust kogemata.

Koosta rakendusele sobivad tooted tsükliga, mille tööd saad rida-realt jälgida:

```js
function prepareProducts(apiProducts) {
  const preparedProducts = [];

  for (const product of apiProducts) {
    preparedProducts.push({
      id: product.id,
      title: product.title,
      price: product.price,
      description: product.description,
      category: product.category,
      image: product.image,
      available: true
    });
  }

  return preparedProducts;
}
```

Kasuta:

```js
const apiProducts = await fetchProducts();
const products = prepareProducts(apiProducts);

renderProducts(products);
```

::: tip Väline andmekuju ja rakenduse andmekuju ei pea olema samad
Päringu järel kohandamine aitab ülejäänud rakendusel kasutada ühtlast ja etteaimatavat tooteobjekti.
:::

## Uuenda rakenduse `products` olekut

Kui sündmuste töötlejad ja filtrid kasutavad sama `products` muutujat, peab see olema muudetav:

```js
let products = [];

async function loadProducts() {
  try {
    const apiProducts = await fetchProducts();

    products = prepareProducts(apiProducts);
    updateCatalog();
  } catch (error) {
    console.error(error);
  }
}
```

Ära loo `loadProducts()` sees uut samanimelist `const products` muutujat, kui ülejäänud rakendus peab saadud andmeid hiljem kasutama.

## Kontrolli päringut Network-paneelis

Network-paneelis vali toodete päring ja kontrolli:

- **Headers** – aadress, meetod ja olekukood;
- **Preview** – vastuse mugavalt loetav kuju;
- **Response** – vastuse algne sisu;
- **Timing** – päringu kestus.

Network-paneel aitab eristada:

- kas päring üldse tehti;
- kas server vastas;
- kas vastus sisaldas oodatud andmeid;
- kas probleem tekkis enne või pärast vastuse saamist.

## Tekita kontrollitud viga

Muuda aadress ajutiselt valeks:

```js
const PRODUCTS_URL = "https://fakestoreapi.com/not-products";
```

Network-paneelis näed veakoodiga vastust. Kuna kontrollid `response.ok`, jõuab viga `catch` plokki.

Taasta pärast katset õige aadress.

## Avaliku harjutus-API piirangud

Fake Store API on väline harjutusteenus. See võib olla ajutiselt aeglane, kättesaamatu või muuta andmeid.

Rakendus peab seetõttu:

- mitte eeldama, et päring õnnestub alati;
- kontrollima vastuse olekut ja kuju;
- näitama kasutajale veaolekut;
- hoidma tehnilise vea Console'is nähtavana.

## Praktiline ülesanne: asenda kohalikud tooted API andmetega

Ühenda Fake Store API olemasoleva tootekataloogiga.

### Nõuded

1. API aadress on kirjeldatud konstandina.
2. `fetchProducts()` teeb GET-päringu.
3. Funktsioon kontrollib `response.ok` väärtust.
4. JSON-vastuse puhul kontrollitakse, et tulemus oleks massiiv.
5. `prepareProducts()` kohandab API tooted rakenduse andmekujule.
6. Eduka laadimise järel uuendatakse rakenduse `products` olekut ja kataloogi.
7. Viga püütakse kinni ning logitakse Console'i.
8. Oskad päringut Network-paneelis selgitada.

### Piirjuhud

Kontrolli:

- õige API aadress;
- vale lõpp-punkt, mis annab HTTP vea;
- internetiühendus puudub;
- vastus ei ole massiiv;
- vastus on tühi massiiv;
- API tootel puudub mõni kasutatav omadus.

### Vihjed

::: details Vihje 1
Pärast `fetch()` kutset kontrolli vastust enne `response.json()` kutset.
:::

::: details Vihje 2
`response.json()` on asünkroonne ja vajab samuti `await` võtmesõna.
:::

::: details Vihje 3
Hoia `fetchProducts()` sees ainult päringu ja vastuse kontrolli loogika. DOM-i uuenda `loadProducts()` funktsioonis.
:::

### Kontrollitav tulemus

Valmis töös:

- kuvatakse kohalikult kirjutatud toodete asemel API tooted;
- töötavad otsing, filtrid ja ostukorvinupud ka API andmetega;
- jõuab vale aadressi HTTP-viga `catch` plokki;
- ei peata vigase kujuga vastus rakendust kontrollimatult;
- oskad Network-paneelis näidata päringu ja vastuse olulisi osi.

## Mõtesta

1. Miks ei ole `fetch()` õnnestunud Promise veel sama mis edukas HTTP-vastus?
2. Miks vajab `response.json()` eraldi `await` võtmesõna?
3. Miks tasub väline andmekuju rakenduse andmekujuks kohandada?
4. Millist infot annab Network-paneel, mida Console üksi ei näita?

## Laiendus

Lisa tootekataloogile nupp „Laadi uuesti”, mis käivitab sama `loadProducts()` funktsiooni. Takista laadimise ajal korduvat päringut.

## Kokkuvõte

- `fetch()` teeb HTTP-päringu ja tagastab Promise'i `Response` objektiga.
- HTTP veakood ei muuda `fetch()` Promise'i automaatselt rejected olekusse.
- `response.ok` tuleb kontrollida enne vastuse keha kasutamist.
- `response.json()` teisendab vastuse asünkroonselt JavaScripti väärtuseks.
- Välised andmed tuleb enne rakenduses kasutamist kontrollida ja vajadusel kohandada.

## Edasi

Järgmises tunnis teed päringu oleku kasutajale nähtavaks ning käsitled [laadimis-, õnnestumis-, tühja ja veaolekut](./laadimis-ja-veaolekud.md).

## Allikad

- [MDN: Using the Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch) — `fetch()` päringud ja vastuste töötlemine.
- [MDN: `Response.ok`](https://developer.mozilla.org/en-US/docs/Web/API/Response/ok) — HTTP-vastuse õnnestumise kontroll.
- [Fake Store API](https://fakestoreapi.com/) — tunnis kasutatav avalik harjutus-API.
