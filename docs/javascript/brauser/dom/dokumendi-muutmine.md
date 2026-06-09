---
title: Dokumendi sisu muutmine
description: Õpi kuvama JavaScripti väärtuseid olemasolevates DOM-elementides turvaliselt ja kontrollitavalt.
outline: deep
---

# Dokumendi sisu muutmine

::: info Õpiväljund
Pärast õppetundi oskad kuvada JavaScripti väärtuseid olemasolevates DOM-elementides ning valida teksti ja HTML-i lisamiseks sobiva võtte.
:::

Seni on tooteandmed olnud JavaScripti objektis ja DOM-elemendid HTML-is. Nüüd ühendad need kaks: JavaScript loeb objekti väärtused ning kuvab need olemasolevas tootekaardis.

## Eeldused ja töövahendid

- Oskad leida DOM-elemente.
- Oskad muuta elementide omadusi ja atribuute.
- Sul on ühe tootekaardiga `tootekataloog` projekt.
- Soovituslik kestus on 60–75 minutit.

## Väärtus muutujas ei ilmu ise lehele

JavaScripti objekt:

```js
const product = {
  title: "Must seljakott",
  price: 39.99,
  description: "Vastupidav seljakott igapäevaseks kasutamiseks."
};
```

ei muuda HTML-i automaatselt. Lehel kuvamiseks pead:

1. leidma sobiva elemendi;
2. koostama kuvatava väärtuse;
3. määrama väärtuse elemendile.

## Teksti muutmine `textContent` omadusega

HTML:

```html
<article class="product-card">
  <h3 class="product-title">Toote nimi</h3>
  <p class="product-price">Hind puudub</p>
  <p class="product-description">Kirjeldus puudub</p>
</article>
```

JavaScript:

```js
const titleElement = document.querySelector(".product-title");
const priceElement = document.querySelector(".product-price");
const descriptionElement = document.querySelector(".product-description");

titleElement.textContent = product.title;
priceElement.textContent = `${product.price.toFixed(2)} €`;
descriptionElement.textContent = product.description;
```

`textContent` asendab elemendi sees oleva sisu tekstiga.

::: tip Kasuta teksti jaoks `textContent` omadust
Kui tahad kuvada teksti, eriti kasutajalt või serverist saadud väärtust, on `textContent` selge ja turvaline vaikimisi valik.
:::

## Teksti koostamine enne kuvamist

DOM-i ei pea andma objekti väärtust muutmata kujul. Enne kuvamist saad moodustada õppijale arusaadava teksti:

```js
function formatPrice(price) {
  return `${price.toFixed(2)} €`;
}

priceElement.textContent = `Hind: ${formatPrice(product.price)}`;
```

Funktsioon eraldab kaks vastutust:

- `formatPrice()` koostab teksti;
- DOM-i rida kuvab selle lehel.

## Olemasoleva teksti lisamine

`textContent` väärtust saab ka lugeda:

```js
const statusElement = document.querySelector("#status");

console.log(statusElement.textContent);
```

Uue teksti määramine asendab vana sisu:

```js
statusElement.textContent = "Kuvatakse 1 toode.";
```

Vajadusel saad olemasolevale tekstile lisa liita:

```js
statusElement.textContent += " Kataloog on valmis.";
```

Praktikas on enamasti selgem koostada kogu soovitud tekst korraga.

## `innerHTML` lisab HTML-i

`innerHTML` tõlgendab väärtust HTML-koodina:

```js
const messageElement = document.querySelector("#message");

messageElement.innerHTML = "<strong>Toode on saadaval</strong>";
```

See võib olla mugav, kuid serverist või kasutajalt saadud väärtuse lisamine `innerHTML` kaudu võib lubada soovimatul HTML-il või skriptil lehele jõuda.

```js
const unsafeTitle = '<img src="x" onerror="alert(1)">';

titleElement.innerHTML = unsafeTitle; // ära tee nii
titleElement.textContent = unsafeTitle; // kuvab väärtuse tekstina
```

::: danger Ära lisa kontrollimata andmeid `innerHTML` kaudu
Fake Store API ja kasutaja sisend on rakendusevälised andmed. Kuva need `textContent` abil või loo vajalikud elemendid DOM-meetoditega.
:::

## `innerText` ja `textContent`

Olemasolevas koodis võid kohata ka `innerText` omadust. See arvestab elemendi nähtavust ja kujundust, samal ajal kui `textContent` loeb ning muudab sõlmede tekstisisu.

Teksti kuvamiseks kasutame `textContent` omadust. See on tavaliselt ennustatavam ega vaja brauserilt kujunduse arvutamist.

## Proovi ise: ennusta tulemus

HTML:

```html
<p id="demo">Algne <strong>tekst</strong></p>
```

Milline on tulemus?

```js
const demo = document.querySelector("#demo");

demo.textContent = "<strong>Uus tekst</strong>";
```

::: details Vastus
Lehel kuvatakse tekstina `<strong>Uus tekst</strong>`. Märgendeid ei tõlgendata HTML-ina ning varasem `strong` element eemaldatakse.
:::

## Tühjad ja vigased väärtused

Kõik andmed ei pruugi olla kasutuskõlblikud:

```js
const product = {
  title: "",
  price: NaN,
  description: undefined
};
```

Koosta enne kuvamist varuväärtused:

```js
const displayTitle = product.title || "Nimetu toode";
const displayDescription = product.description || "Kirjeldus puudub.";
const displayPrice = Number.isFinite(product.price)
  ? `${product.price.toFixed(2)} €`
  : "Hind puudub";

titleElement.textContent = displayTitle;
descriptionElement.textContent = displayDescription;
priceElement.textContent = displayPrice;
```

Nii ei jõua lehele kogemata tekst `undefined` või `NaN €`.

## Praktiline ülesanne: kuva kohalik toode

Kasuta järgmist tooteobjekti:

```js
const product = {
  title: "Must seljakott",
  price: 39.99,
  description: "Vastupidav seljakott igapäevaseks kasutamiseks.",
  category: "kotid"
};
```

Täienda olemasolevat tootekaarti nii, et JavaScript kuvab:

1. toote nime;
2. kahe komakohaga hinna ja euro tähise;
3. kirjelduse;
4. kategooria;
5. staatuse „Kuvatakse 1 toode.”

Kasuta iga väärtuse kuvamiseks `textContent` omadust.

### Piirjuhud

Kontrolli eraldi:

- toote nimi on tühi tekst;
- kirjeldus on `undefined`;
- hind on `0`;
- hind on `NaN`;
- toote nimi sisaldab teksti `<strong>Test</strong>`.

### Vihjed

::: details Vihje 1
Leia kõik muudetavad elemendid enne väärtuste määramist.
:::

::: details Vihje 2
Hinna kontrollimiseks kasuta `Number.isFinite(product.price)`.
:::

::: details Vihje 3
Varuväärtuse saad valida `||` operaatoriga:

```js
titleElement.textContent = product.title || "Nimetu toode";
```
:::

### Kontrollitav tulemus

Valmis töös:

- kuvatakse kõik kasutuskõlblikud tooteandmed õigetes elementides;
- kuvatakse tühjade või vigaste andmete asemel arusaadav varutekst;
- ei tõlgendata toote nime HTML-ina;
- oskad Console'i ja Elements-paneeli abil näidata, millist elementi muudeti.

## Mõtesta

1. Miks ei ilmu JavaScripti objekt ise HTML-lehele?
2. Miks sobib serverist saadud tootenime kuvamiseks `textContent` paremini kui `innerHTML`?
3. Miks tasub kuvatav tekst enne DOM-i kirjutamist eraldi koostada?
4. Milline varutekst sobib puuduva hinna või kirjelduse jaoks?

## Laiendus

Koosta funktsioon:

```js
function displayProduct(product) {
  // Leia või kasuta olemasolevaid elemente ja kuva väärtused.
}
```

Kontrolli funktsiooni vähemalt kahe erineva tooteobjektiga. Selles etapis kuvab funktsioon korraga endiselt ainult ühe toote.

## Kokkuvõte

- JavaScripti väärtuse kuvamiseks tuleb leida element ja muuta selle sisu.
- `textContent` kuvab väärtuse tekstina ning asendab varasema sisu.
- `innerHTML` tõlgendab väärtust HTML-ina ja ei sobi kontrollimata andmete lisamiseks.
- Kuvatav tekst tasub enne DOM-i kirjutamist vormindada.
- Puuduvate või vigaste väärtuste jaoks tuleb valida arusaadavad varuväärtused.

## Edasi

Järgmises tunnis kasutad klasse, et näidata toote ja rakenduse [erinevaid visuaalseid olekuid](./stiilid-ja-klassid.md).

## Allikad

- [MDN: `Node.textContent`](https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent) — teksti lugemine ja muutmine.
- [MDN: `Element.innerHTML`](https://developer.mozilla.org/en-US/docs/Web/API/Element/innerHTML) — HTML-sisu lisamine ja selle turvariskid.
