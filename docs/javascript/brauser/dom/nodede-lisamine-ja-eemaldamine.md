---
title: Elementide lisamine ja eemaldamine
description: Õpi looma kohalike andmete põhjal uusi DOM-elemente, lisama need dokumenti ning eemaldama vana sisu.
outline: deep
---

# Elementide lisamine ja eemaldamine

::: info Õpiväljund
Pärast õppetundi oskad luua tooteandmete põhjal DOM-elemente ning hoida kuvatava loendi andmetega vastavuses.
:::

Seni oli tootekaart HTML-is juba olemas ning JavaScript muutis selle sisu ja olekut. Päris kataloogis ei tea HTML ette, mitu toodet tuleb kuvada. JavaScript peab iga toote jaoks looma uue kaardi.

Selles tunnis ühendad senised DOM-i oskused üheks töötavaks renderdamise lahenduseks.

## Eeldused ja töövahendid

- Oskad kasutada objekte, massiive, funktsioone ja `for...of` tsüklit.
- Oskad leida DOM-elemente ning muuta nende teksti, omadusi ja klasse.
- Sul on `tootekataloog` projekt.
- Soovituslik kestus on 75–90 minutit.

## Valmista HTML ette

Eemalda HTML-ist käsitsi kirjutatud tootekaart. JavaScript hakkab kaarte ise looma.

Kasuta toodete sektsioonis järgmist struktuuri:

```html
<section aria-labelledby="products-heading">
  <h2 id="products-heading">Tooted</h2>
  <div id="product-list"></div>
  <p id="empty-message" class="is-hidden">Tooteid ei leitud.</p>
</section>
```

`#product-list` on konteiner, kuhu JavaScript lisab tootekaardid. Pealkiri ja tühja oleku teade jäävad sellest väljapoole, et loendi puhastamine neid ei eemaldaks.

## Uue elemendi loomine

`document.createElement()` loob DOM-elemendi, kuid ei lisa seda veel lehele:

```js
const card = document.createElement("article");

console.log(card);
```

Elementi saab seadistada samade võtetega, mida juba oskad:

```js
card.classList.add("product-card");
card.dataset.productId = "7";
```

Loo ka pealkiri:

```js
const title = document.createElement("h3");

title.textContent = "Must seljakott";
```

Praegu eksisteerivad `card` ja `title` JavaScripti muutujates, kuid pole veel dokumendis nähtavad.

## Elemendi lisamine teise sisse

Lisa pealkiri tootekaardi sisse:

```js
card.append(title);
```

Lisa tootekaart toodete loendisse:

```js
const productList = document.querySelector("#product-list");

productList.append(card);
```

Nüüd näed kaarti lehel ja Elements-paneelis.

`append()` saab lisada mitu elementi korraga:

```js
card.append(title, price, button);
```

Olemasolevas koodis võid kohata ka `appendChild()` meetodit. See lisab ühe sõlme korraga. Kasutame lühemat ja paindlikumat `append()` meetodit.

## Koosta üks tootekaart funktsioonis

Ühe kaardi loomine sisaldab mitu sammu. Pane need funktsiooni:

```js
function createProductCard(product) {
  const card = document.createElement("article");
  const image = document.createElement("img");
  const title = document.createElement("h3");
  const price = document.createElement("p");
  const button = document.createElement("button");

  card.classList.add("product-card");
  card.classList.toggle("is-unavailable", !product.available);
  card.dataset.productId = String(product.id);

  image.classList.add("product-image");
  image.src = product.image;
  image.alt = product.title;

  title.classList.add("product-title");
  title.textContent = product.title;

  price.classList.add("product-price");
  price.textContent = `${product.price.toFixed(2)} €`;

  button.classList.add("add-to-cart");
  button.type = "button";
  button.textContent = "Lisa ostukorvi";
  button.disabled = !product.available;

  card.append(image, title, price, button);

  return card;
}
```

Funktsioon:

1. saab ühe tooteobjekti;
2. loob ja seadistab ühe tootekaardi;
3. tagastab valmis DOM-elemendi.

Funktsioon ei lisa kaarti ise lehele. See võimaldab sama funktsiooni hiljem kasutada erinevates vaadetes.

## Kuva mitu toodet

Kasuta kohalikke andmeid:

```js
const products = [
  {
    id: 1,
    title: "Must seljakott",
    price: 39.99,
    image: "./placeholder.png",
    available: true
  },
  {
    id: 2,
    title: "Hall T-särk",
    price: 14.5,
    image: "./placeholder.png",
    available: false
  }
];
```

Näidised eeldavad, et projekti kaustas on pildifail `placeholder.png`. Võid kasutada ka mõnda teist enda projekti lisatud kohalikku pilti ja muuta vastavalt `image` väärtust.

Loo iga toote jaoks kaart:

```js
const productList = document.querySelector("#product-list");

for (const product of products) {
  const card = createProductCard(product);
  productList.append(card);
}
```

Massiiv kirjeldab rakenduse andmeid. DOM kirjeldab seda, mida kasutaja hetkel näeb.

## Vana sisu eemaldamine enne uut renderdust

Kui käivitad eelmise tsükli kaks korda, lisatakse samad kaardid lehele uuesti. Enne täielikku uut renderdust puhasta loend:

```js
productList.replaceChildren();
```

`replaceChildren()` ilma argumentideta eemaldab kõik konteineri lapsed.

Koosta renderdamise funktsioon:

```js
function renderProducts(products) {
  productList.replaceChildren();

  for (const product of products) {
    productList.append(createProductCard(product));
  }
}

renderProducts(products);
```

Nüüd vastab vaade iga funktsioonikutse järel täpselt antud massiivile.

::: tip Renderdamise põhimõte
Renderdamine tähendab rakenduse andmete muutmist kasutajale nähtavaks DOM-iks.
:::

## Ühe elemendi eemaldamine

Elemendi saab eemaldada `remove()` meetodiga:

```js
const firstCard = document.querySelector(".product-card");

firstCard.remove();
```

See eemaldab elemendi DOM-ist, kuid ei muuda algset `products` massiivi. Kui kutsud `renderProducts(products)` uuesti, ilmub kaart tagasi.

::: warning Andmed ja DOM peavad rääkima sama lugu
Püsiva muudatuse jaoks tuleb tavaliselt muuta esmalt rakenduse andmeid ja seejärel vaade uuesti renderdada. Ainult DOM-i eemaldamine muudab vaid nähtavat tulemust.
:::

## Tühja loendi olek

Kui tooteid pole, ei tohiks kasutaja näha lihtsalt tühja ala:

```js
const emptyMessage = document.querySelector("#empty-message");

function renderProducts(products) {
  productList.replaceChildren();
  emptyMessage.classList.toggle("is-hidden", products.length > 0);

  for (const product of products) {
    productList.append(createProductCard(product));
  }
}
```

Kontrolli:

```js
renderProducts(products);
renderProducts([]);
```

Teise kutse järel peab tooteloend olema tühi ja tühja oleku teade nähtav.

## Miks mitte koostada kogu kaarti `innerHTML` abil?

Tootekaardi saaks kirjutada ka ühe pika HTML-tekstina, kuid serverist tulevate väärtuste lisamine `innerHTML` kaudu võib olla ebaturvaline. Samuti on pika märgenditeksti sees keerulisem kontrollida üksikuid omadusi ja elemente.

`createElement()`, `textContent`, omadused ja `append()` teevad iga sammu nähtavaks ning hoiavad teksti tekstina.

## Praktiline ülesanne: renderda kohalik tootekataloog

Loo vähemalt kolmest objektist koosnev `products` massiiv ning kuva kõik tooted JavaScriptiga.

### Nõuded

1. HTML-is pole käsitsi kirjutatud tootekaarti.
2. `createProductCard(product)` loob ja tagastab ühe täieliku tootekaardi.
3. `renderProducts(products)` puhastab eelmise loendi ja kuvab kõik antud tooted.
4. Igal kaardil on toote ID `data-product-id` atribuudis.
5. Kaardil kuvatakse pilt, nimi, hind ja lisamise nupp.
6. Mittesaadaval toote kaart saab olekuklassi ning nupp on keelatud.
7. Tühja massiivi korral kuvatakse tühja oleku teade.

### Piirjuhud

Kontrolli:

- massiivis on üks toode;
- massiivis on mitu toodet;
- massiiv on tühi;
- `renderProducts(products)` käivitatakse kaks korda;
- ühe toote `available` väärtus on `false`.

### Vihjed

::: details Vihje 1
Alusta ühe tootekaardi loomisest ja kontrolli seda Elements-paneelis enne tsükli lisamist.
:::

::: details Vihje 2
Kaart peab funktsioonist väljuma:

```js
return card;
```
:::

::: details Vihje 3
Puhasta `#product-list` kohe `renderProducts()` funktsiooni alguses.
:::

### Kontrollitav tulemus

Valmis töös:

- vastab kuvatavate kaartide arv massiivi pikkusele;
- ei teki korduva renderdamise järel duplikaate;
- kuvatakse tühi olek ainult siis, kui tooteid pole;
- kajastuvad tooteandmete muudatused pärast uut renderdamist;
- ei ole Console'is veateateid.

## Mõtesta

1. Miks tagastab `createProductCard()` elemendi, kuid ei lisa seda ise dokumenti?
2. Miks tuleb loend enne täielikku uut renderdust puhastada?
3. Mis vahe on DOM-elemendi eemaldamisel ja toote eemaldamisel andmemassiivist?
4. Kuidas aitab väikesteks funktsioonideks jagamine hiljem API-andmeid kasutada?

## Laiendus

Täienda `createProductCard()` funktsiooni nii, et puuduva või vigase hinna korral kuvatakse „Hind puudub” ning puuduva pildiaadressi korral kasutatakse kohalikku asenduspilti.

## Kokkuvõte

- `document.createElement()` loob uue DOM-elemendi.
- `append()` lisab loodud elemendid DOM-puusse.
- `remove()` eemaldab ühe elemendi ja `replaceChildren()` puhastab konteineri.
- Ühe kaardi loomine ja kogu loendi renderdamine tasub hoida eraldi funktsioonides.
- DOM peaks kajastama rakenduse andmete hetkeolekut.

## Edasi

Nüüd oskad DOM-elemente leida, muuta, kujundada ja luua. Järgmisena õpid [brauseri sündmustega kasutaja tegevustele reageerima](../sundmused/sissejuhatus.md).

## Allikad

- [MDN: `Document.createElement()`](https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement) — uute elementide loomine.
- [MDN: `Element.append()`](https://developer.mozilla.org/en-US/docs/Web/API/Element/append) — elementide lisamine.
- [MDN: `Element.remove()`](https://developer.mozilla.org/en-US/docs/Web/API/Element/remove) — elemendi eemaldamine.
- [MDN: `Element.replaceChildren()`](https://developer.mozilla.org/en-US/docs/Web/API/Element/replaceChildren) — konteineri sisu asendamine.
