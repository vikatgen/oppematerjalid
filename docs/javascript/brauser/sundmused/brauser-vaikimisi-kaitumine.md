---
title: Brauseri vaikimisi käitumine
description: Õpi ära tundma brauseri automaatset tegevust ning peatama seda ainult siis, kui JavaScript võtab tegevuse üle.
outline: deep
---

# Brauseri vaikimisi käitumine

::: info Õpiväljund
Pärast õppetundi oskad tuvastada sündmusega kaasneva brauseri vaikimisi tegevuse ning kasutada `preventDefault()` meetodit põhjendatud olukorras.
:::

Mõni HTML-element teeb midagi juba ilma JavaScriptita. Link avab aadressi ja vorm saadab andmed. See **vaikimisi käitumine** (*default action*) on sageli kasulik, kuid vahel soovib rakendus tegevuse ise üle võtta.

## Eeldused ja töövahendid

- Oskad lisada sündmusekuulajaid.
- Oskad kasutada sündmuse objekti.
- Sul on tootekataloogi projekt.
- Soovituslik kestus on 60–75 minutit.

## Millised elemendid käituvad ise?

Levinud näited:

- lingile vajutamine avab `href` aadressi;
- vormi saatmine teeb päringu ja võib lehe uuesti laadida;
- märkeruudu aktiveerimine muudab selle `checked` olekut;
- vormis olev nupp võib vaikimisi vormi saata.

Vaikimisi käitumine ei ole viga. See annab HTML-ile toimiva põhikäitumise ka ilma JavaScriptita.

## Link ja `preventDefault()`

Lisa ajutine link:

```html
<a id="cart-link" href="/ostukorv">Ava ostukorv</a>
```

Kuula klõpsu:

```js
const cartLink = document.querySelector("#cart-link");

function handleCartLinkClick(event) {
  console.log("Lingile vajutati.");
}

cartLink.addEventListener("click", handleCartLinkClick);
```

Console'i teade kuvatakse, kuid brauser proovib endiselt avada `/ostukorv` aadressi.

Vaikimisi tegevuse peatamiseks:

```js
function handleCartLinkClick(event) {
  event.preventDefault();

  console.log("Rakendus avaks siin ostukorvi vaate.");
}
```

::: warning Ära peata tegevust harjumusest
Kasuta `preventDefault()` ainult siis, kui JavaScript teeb vaikimisi tegevuse asemel midagi sisulist. Kui link peab lihtsalt avama teise lehe, lase lingil töötada.
:::

## Vormi vaikimisi saatmine

Lisa proovivorm:

```html
<form id="product-form">
  <label for="product-title">Toote nimi</label>
  <input id="product-title" name="title" required>
  <button>Lisa toode</button>
</form>
```

Ilma JavaScriptita proovib brauser vormi saata. Kuna `action` puudub, saadetakse vorm tavaliselt samale aadressile ning leht võib uuesti laadida.

Kuula `submit`-sündmust vormil:

```js
const productForm = document.querySelector("#product-form");

function handleProductSubmit(event) {
  event.preventDefault();

  console.log("Vorm on JavaScripti kontrolli all.");
}

productForm.addEventListener("submit", handleProductSubmit);
```

Kuulaja lisatakse vormile, mitte ainult nupule. Nii töötab lahendus ka siis, kui kasutaja saadab vormi sisestusväljal Enter-klahviga.

## Nupu vaikimisi tüüp vormis

Vormi sees olev `<button>` käitub vaikimisi saatmisnupuna:

```html
<form>
  <button>Saada vorm</button>
</form>
```

Kirjuta nupu eesmärk alati nähtavaks:

```html
<button type="submit">Lisa toode</button>
<button type="button">Puhasta eelvaade</button>
```

`type="button"` nupp ei saada vormi.

## `preventDefault()` ei peata sündmuse levimist

`preventDefault()` peatab brauseri vaikimisi tegevuse. See ei peata sündmuse liikumist DOM-puus ega teiste kuulajate käivitumist.

```js
function handleSubmit(event) {
  event.preventDefault();

  console.log(event.defaultPrevented); // true
}
```

Sündmuse levimist käsitleme täpsemalt delegeerimise tunnis.

## Millal vaikimisi tegevus alles jätta?

Jäta vaikimisi käitumine alles, kui:

- tavaline link peab avama teise lehe;
- HTML-vorm peab saatma andmed serverile ilma JavaScriptita;
- märkeruut peab muutma oma loomulikku olekut;
- JavaScript ei paku samaväärset või paremat tegevust.

Peata see, kui:

- JavaScript töötleb vormi ja uuendab vaadet ilma lehte laadimata;
- ühe lehe rakendus vahetab vaadet ise;
- pukseerimise või muu erikäitumise jaoks tuleb brauseri tegevus asendada.

## Praktiline ülesanne: võta vormi saatmine JavaScripti kontrolli alla

Loo uue kohaliku toote vormi minimaalne versioon:

```html
<form id="product-form">
  <label for="product-title">Toote nimi</label>
  <input id="product-title" name="title" required>

  <button type="submit">Lisa toode</button>
  <button id="preview-button" type="button">Näita eelvaadet</button>
</form>
```

### Nõuded

1. Vormi kuulaja reageerib `submit`-sündmusele.
2. Töötleja peatab vormi vaikimisi saatmise.
3. Vormi saatmisel kuvatakse Console'is sisestatud nimi.
4. Enter-klahviga saatmine käivitab sama töötleja.
5. Eelvaate nupp ei saada vormi.
6. Oskad ajutiselt `preventDefault()` eemaldada ja kirjeldada muutust.

### Piirjuhud

Kontrolli:

- saatmisnupul puudub `type`;
- eelvaate nupul puudub `type="button"`;
- vorm saadetakse Enter-klahviga;
- nõutav väli on tühi;
- `preventDefault()` eemaldatakse.

### Vihjed

::: details Vihje 1
Lisa `submit`-kuulaja vormile, mitte saatmisnupule.
:::

::: details Vihje 2
Sisestatud nime saad lugeda:

```js
const titleInput = document.querySelector("#product-title");
console.log(titleInput.value);
```
:::

::: details Vihje 3
Kontrolli `event.defaultPrevented` väärtust pärast `preventDefault()` kutset.
:::

### Kontrollitav tulemus

Valmis töös:

- ei laadi vormi saatmine lehte uuesti;
- käivitub sama loogika nii nupu kui Enter-klahviga;
- ei saada eelvaate nupp vormi;
- oskad põhjendada, miks ja millises reas vaikimisi tegevus peatatakse.

## Mõtesta

1. Miks ei peaks iga lingi klõpsul kutsuma `preventDefault()`?
2. Miks kuulatakse vormi `submit`-sündmust, mitte ainult nupu `click`-sündmust?
3. Mis võib juhtuda, kui vormi sees oleva tavalise nupu tüüp jääb määramata?
4. Mis vahe on vaikimisi tegevusel ja sündmuse levimisel?

## Laiendus

Lisa ostukorvi link. Peata selle navigeerimine ainult siis, kui ostukorv on tühi; muul juhul lase lingil tavaliselt töötada.

## Kokkuvõte

- Mõnel HTML-elemendil on sündmusega seotud vaikimisi tegevus.
- `preventDefault()` peatab selle tegevuse, kuid mitte sündmuse levimist.
- Vormi saatmist kuulatakse vormi `submit`-sündmusega.
- Vormi nuppude `type` peab kirjeldama nende eesmärki.
- Vaikimisi käitumine peatatakse ainult siis, kui JavaScript võtab tegevuse sisuliselt üle.

## Edasi

Järgmises tunnis töötled [vormi välju tervikuna ja lisad kataloogi uue kohaliku toote](./vormid.md).

## Allikad

- [MDN: `Event.preventDefault()`](https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault) — vaikimisi tegevuse peatamine.
- [MDN: `submit` event](https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/submit_event) — vormi saatmise sündmus.
- [MDN: `<button>` element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button) — nuppude tüübid ja käitumine.
