---
title: LocalStorage
description: Õpi säilitama rakenduse väikest püsivat olekut brauseris ning taastama selle lehe avamisel.
outline: deep
---

# LocalStorage: püsiv ostukorv

::: info Õpiväljund
Pärast õppetundi oskad salvestada väikese rakenduse oleku `localStorage`-isse ning taastada selle turvaliselt lehe avamisel.
:::

Pärast sündmuste lisamist töötas ostukorv seni, kuni leht oli avatud. Lehe uuesti laadimisel käivitus JavaScript algusest ja `cartProductIds` muutus taas tühjaks massiiviks.

Selles tunnis muudad ostukorvi püsivaks.

## Eeldused ja töövahendid

- Sul on `cartProductIds` massiiv ning töötav ostukorvi lisamise loogika.
- Oskad töötada massiivide, funktsioonide ja JSON-iga.
- Oskad kasutada DevToolsi Console- ja Application-paneeli.
- Soovituslik kestus on 75–90 minutit.

## Mis on `localStorage`?

`localStorage` on brauseri võtme ja väärtuse põhine salvestusruum. Sama veebiaadressi alla salvestatud andmed jäävad tavaliselt alles ka pärast lehe uuesti laadimist, vahelehe sulgemist ja brauseri taaskäivitamist.

```js
localStorage.setItem("example", "Tere");

console.log(localStorage.getItem("example")); // "Tere"
```

Olulised meetodid:

| Meetod | Tulemus |
| --- | --- |
| `setItem(key, value)` | salvestab või asendab väärtuse |
| `getItem(key)` | tagastab teksti või puuduva võtme korral `null` |
| `removeItem(key)` | eemaldab ühe võtme |
| `clear()` | eemaldab kõik selle veebiaadressi `localStorage` väärtused |

::: warning Ära kasuta õppimise ajal kergekäeliselt `clear()` meetodit
`clear()` eemaldab sama veebiaadressi alt ka teiste rakenduse osade salvestused. Ühe funktsiooni andmete kustutamiseks eelista `removeItem()` meetodit.
:::

## Storage salvestab ainult teksti

Kui salvestad arvu või tõeväärtuse, teisendab brauser selle tekstiks:

```js
localStorage.setItem("cartCount", 3);

const storedCount = localStorage.getItem("cartCount");

console.log(storedCount); // "3"
console.log(typeof storedCount); // "string"
```

Massiivi otse salvestamine ei anna kasutatavat tulemust:

```js
localStorage.setItem("cart", [1, 2, 3]);

console.log(localStorage.getItem("cart")); // "1,2,3"
```

Objektide ja massiivide säilitamiseks teisenda need JSON-tekstiks.

## Salvesta massiiv JSON-ina

Kirjelda salvestusvõti ühes kohas:

```js
const CART_STORAGE_KEY = "productCatalog.cart";
```

```js
const cartProductIds = [1, 4, 7];

const cartJson = JSON.stringify(cartProductIds);

localStorage.setItem(CART_STORAGE_KEY, cartJson);
```

Kontrolli:

```js
console.log(localStorage.getItem(CART_STORAGE_KEY));
// "[1,4,7]"
```

Kasuta võtmes rakenduse nime või muud eesliidet. See aitab eristada sama veebiaadressi alla kuuluvaid väärtuseid:

```text
productCatalog.cart
```

## Taasta massiiv salvestusest

```js
const storedCart = localStorage.getItem(CART_STORAGE_KEY);

if (storedCart !== null) {
  const parsedCart = JSON.parse(storedCart);
  console.log(parsedCart);
}
```

`getItem()` võib anda:

- JSON-teksti, kui väärtus on olemas;
- `null`, kui võtit pole veel salvestatud.

## Vigane salvestus ei tohi rakendust peatada

Brauseri salvestust saab muuta DevToolsis või varasema rakenduse versiooniga. Seetõttu ei saa eeldada, et väärtus on alati korrektne JSON.

```js
function loadCart() {
  const storedCart = localStorage.getItem(CART_STORAGE_KEY);

  if (storedCart === null) {
    return [];
  }

  try {
    const parsedCart = JSON.parse(storedCart);

    if (!Array.isArray(parsedCart)) {
      return [];
    }

    return parsedCart;
  } catch (error) {
    console.error("Ostukorvi taastamine ebaõnnestus:", error);
    return [];
  }
}
```

Funktsioon tagastab alati massiivi. Kui salvestus puudub või on vigane, alustab rakendus tühja ostukorviga.

::: tip Salvestatud andmed on sisend
Kontrolli brauserist loetud väärtuseid samamoodi nagu vormi või serveri andmeid. Need võivad puududa, olla vigased või pärineda rakenduse vanemast versioonist.
:::

## Salvesta pärast oleku muutmist

Koosta salvestamisfunktsioon:

```js
function saveCart() {
  const cartJson = JSON.stringify(cartProductIds);

  localStorage.setItem(CART_STORAGE_KEY, cartJson);
}
```

Kutsu seda pärast ostukorvi andmete muutmist:

```js
if (!cartContainsProduct(productId)) {
  cartProductIds.push(productId);
  saveCart();
}

updateCartCount();
```

Oluline järjekord:

1. muuda rakenduse olekut;
2. salvesta uus olek;
3. uuenda kasutajaliidest.

## Taasta olek rakenduse käivitamisel

Varasema tühja massiivi asemel:

```js
let cartProductIds = loadCart();

updateCartCount();
```

Nüüd taastub ostukorvi arv lehe laadimisel.

Funktsioonide sobiv järjestus failis võib olla:

```js
const CART_STORAGE_KEY = "productCatalog.cart";

let cartProductIds = loadCart();

function loadCart() {
  // ...
}

function saveCart() {
  // ...
}

function updateCartCount() {
  // ...
}

updateCartCount();
```

Funktsioonide deklaratsioone saab JavaScriptis kasutada ka enne nende tekstilist asukohta.

## Eemalda ostukorvi salvestus

Lisa nupp:

```html
<button id="clear-cart" type="button">Tühjenda ostukorv</button>
```

JavaScript:

```js
const clearCartButton = document.querySelector("#clear-cart");

function handleClearCart() {
  cartProductIds = [];
  localStorage.removeItem(CART_STORAGE_KEY);
  updateCartCount();
}

clearCartButton.addEventListener("click", handleClearCart);
```

Tühja massiivi võiks ka JSON-ina salvestada. `removeItem()` väljendab siin selgelt, et kasutajal pole enam salvestatud ostukorvi.

## Kontrolli Application-paneelis

Chrome'i ja Chromiumi-põhistes brauserites:

1. ava DevTools;
2. vali **Application**;
3. ava **Storage → Local storage**;
4. vali oma lehe aadress;
5. leia `productCatalog.cart`.

Firefox kasutab sarnaseks kontrolliks **Storage** paneeli.

Muuda väärtus teadlikult vigaseks:

```text
mitte-json
```

Laadi leht uuesti ja kontrolli, et rakendus:

- ei peatu veaga;
- alustab tühja ostukorviga;
- kuvab Console'is arusaadava veateate.

## Mida `localStorage`-isse mitte salvestada?

`localStorage` sobib väikese ja mittetundliku kasutajaliidese oleku jaoks.

Ära salvesta sinna:

- paroole;
- autentimisandmeid, kui rakenduse turvamudel seda ei luba;
- isikuandmeid ilma selge vajaduseta;
- väga suuri andmekogumeid;
- andmeid, mis peavad olema mitme seadme vahel sünkroonis.

`localStorage` on sünkroonne API. Suurte andmete lugemine ja kirjutamine võib kasutajaliidest aeglustada.

## Praktiline ülesanne: püsiv ostukorv

Muuda sündmuste rajas loodud ostukorv püsivaks.

### Nõuded

1. Salvestusvõti on kirjeldatud konstandina.
2. `saveCart()` salvestab ID-de massiivi JSON-tekstina.
3. `loadCart()` tagastab korrektse salvestuse korral massiivi.
4. Puuduva, vigase või vale tüüpi salvestuse korral tagastab `loadCart()` tühja massiivi.
5. Ostukorv salvestatakse pärast iga sisulist muutust.
6. Ostukorvi arv taastub lehe laadimisel.
7. Kasutaja saab ostukorvi tühjendada.

### Piirjuhud

Kontrolli:

- salvestusvõtit pole veel olemas;
- ostukorvis on üks või mitu ID-d;
- leht laaditakse uuesti;
- vaheleht ja brauser suletakse ning avatakse uuesti;
- salvestatud väärtus on vigane JSON;
- salvestatud JSON on objekt, mitte massiiv;
- ostukorv tühjendatakse.

### Vihjed

::: details Vihje 1
Salvestamisel kasuta `JSON.stringify()`, taastamisel `JSON.parse()`.
:::

::: details Vihje 2
Pane `JSON.parse()` `try...catch` ploki sisse.
:::

::: details Vihje 3
Kontrolli taastatud väärtust:

```js
if (!Array.isArray(parsedCart)) {
  return [];
}
```
:::

### Kontrollitav tulemus

Valmis töös:

- säilib ostukorvi sisu pärast lehe uuesti laadimist ja brauseri taaskäivitamist;
- ei peata vigane salvestus rakenduse tööd;
- vastab DOM-is kuvatav ostukorvi arv taastatud massiivile;
- kaob salvestus pärast ostukorvi tühjendamist;
- oskad Application- või Storage-paneelis salvestatud väärtust leida.

## Mõtesta

1. Miks ei saa massiivi `localStorage`-isse otse salvestada?
2. Miks peab `loadCart()` kontrollima nii JSON-i süntaksit kui ka taastatud väärtuse tüüpi?
3. Millal tuleb `saveCart()` kutsuda?
4. Miks ei sobi `localStorage` tundlike või suurte andmete hoidmiseks?

## Laiendus

Kontrolli `loadCart()` funktsioonis ka seda, et kõik massiivi väärtused oleksid arvud. Vigased väärtused jäta taastatud ostukorvist välja, kasutades tsüklit, mille tööd saad rida-realt jälgida.

## Kokkuvõte

- `localStorage` säilitab sama veebiaadressi väikest püsivat olekut.
- Kõik väärtused salvestatakse tekstina.
- Massiivid ja objektid teisendatakse `JSON.stringify()` ning `JSON.parse()` abil.
- Brauserist loetud salvestust tuleb kontrollida.
- Püsiv vaade taastatakse salvestusest rakenduse käivitamisel.

## Edasi

Järgmises tunnis võrdled püsivat salvestust [ühe vahelehe ajutise `sessionStorage` olekuga](./sessionstorage.md).

## Allikad

- [MDN: Web Storage API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API) — `localStorage` ja `sessionStorage` ülevaade.
- [MDN: `Window.localStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) — püsiva salvestusruumi API.
- [MDN: `JSON.stringify()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify) — väärtuse JSON-tekstiks teisendamine.
- [MDN: `JSON.parse()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse) — JSON-teksti taastamine.
