---
title: Elemendi koordinaadid
description: Lisalugemine elemendi asukoha, suuruse, vaateala ja dokumendi koordinaatide kohta.
outline: deep
---

# Elemendi koordinaadid

::: warning Lisamaterjal
Loe seda materjali, kui soovid paigutada elemendi teise elemendi suhtes, kontrollida nähtavust või mõista hiire ja DOM-elemendi asukoha seost.
:::

DOM-puu kirjeldab elementide struktuuri. Brauseri paigutusmootor arvutab lisaks, kus ja kui suurena iga element ekraanil kuvatakse.

## Mitu koordinaatsüsteemi

Veebilehel kasutatakse erinevaid lähtepunkte:

- **vaateala** (*viewport*) – brauseriaknas hetkel nähtav ala;
- **dokument** – kogu leht koos keritud osaga;
- **element** – konkreetse elemendi enda ala;
- **sündmus** – näiteks kursori asukoht klõpsu hetkel.

Koordinaadi tähendus sõltub sellest, mille suhtes seda mõõdetakse.

## `getBoundingClientRect()`

Leia tootekaart ja küsi selle asukoht vaateala suhtes:

```js
const card = document.querySelector(".product-card");
const rect = card.getBoundingClientRect();

console.log(rect);
```

Olulised väärtused:

```js
console.log(rect.top);
console.log(rect.left);
console.log(rect.right);
console.log(rect.bottom);
console.log(rect.width);
console.log(rect.height);
```

- `top` ja `left` kirjeldavad elemendi algust vaateala suhtes;
- `right` ja `bottom` kirjeldavad elemendi teist serva;
- `width` ja `height` kirjeldavad elemendi suurust.

Kui kerid lehte, muutuvad `top` ja `bottom`, sest element liigub vaateala suhtes.

## Vaateala ja dokumendi koordinaadid

`getBoundingClientRect()` annab vaateala koordinaadid. Dokumendi koordinaatide saamiseks lisa kerimise asukoht:

```js
const documentTop = rect.top + window.scrollY;
const documentLeft = rect.left + window.scrollX;

console.log(documentTop, documentLeft);
```

Lihtsustatud mudel:

```text
dokumendi asukoht = vaateala asukoht + keritud vahemaa
```

## Kasti suurus ja CSS

`getBoundingClientRect()` kirjeldab elemendi piirdekasti. Tulemust mõjutavad:

- elemendi sisu;
- `padding`;
- `border`;
- CSS-i paigutus;
- transformatsioonid;
- vaateala suurus.

Seetõttu ei pruugi `rect.width` olla sama, mis CSS-is kirjutatud `width`.

```css
.product-card {
  width: 200px;
  padding: 20px;
  border: 2px solid;
}
```

Vaikimisi `box-sizing: content-box` korral lisanduvad padding ja border määratud laiusele.

## Kursori koordinaadid

Hiire sündmuse objekt sisaldab mitut asukohta:

```js
document.addEventListener("click", (event) => {
  console.log("Vaateala:", event.clientX, event.clientY);
  console.log("Dokument:", event.pageX, event.pageY);
});
```

- `clientX` ja `clientY` mõõdavad vaateala suhtes;
- `pageX` ja `pageY` mõõdavad dokumendi suhtes.

Pärast kerimist erinevad need väärtused.

## Kas element on vaatealas?

Lihtne kontroll:

```js
function isInViewport(element) {
  const rect = element.getBoundingClientRect();

  return (
    rect.bottom > 0 &&
    rect.right > 0 &&
    rect.top < window.innerHeight &&
    rect.left < window.innerWidth
  );
}
```

See kontrollib, kas vähemalt osa elemendist kattub vaatealaga.

::: info Suure hulga elementide jälgimiseks kasuta sobivat API-t
Kui pead pidevalt jälgima, millised elemendid vaatealasse jõuavad, sobib tavaliselt `IntersectionObserver` paremini kui iga kerimissündmuse ajal koordinaatide käsitsi arvutamine.
:::

## Paiguta hüpik elemendi juurde

HTML:

```html
<button id="help-button" type="button">Abi</button>
<div id="help-popup" class="popup">Toote lisamiseks vajuta nuppu.</div>
```

JavaScript:

```js
const helpButton = document.querySelector("#help-button");
const helpPopup = document.querySelector("#help-popup");

const buttonRect = helpButton.getBoundingClientRect();

helpPopup.style.position = "fixed";
helpPopup.style.left = `${buttonRect.left}px`;
helpPopup.style.top = `${buttonRect.bottom + 8}px`;
```

Kuna hüpik on `position: fixed`, kasutab see vaateala koordinaate nagu `getBoundingClientRect()`.

Päris rakenduses tuleb arvestada ka:

- vaateala servadega;
- akna suuruse muutumisega;
- kerimisega;
- klaviatuuri ja ligipääsetavusega.

## Millal koordinaate mitte käsitsi arvutada?

CSS lahendab suure osa paigutusprobleeme paremini:

- Flexbox;
- Grid;
- `position: relative` ja `absolute`;
- ankurelemendid ja tavavoo paigutus.

Kasuta JavaScripti koordinaate siis, kui paigutus või käitumine sõltub jooksvalt mõõdetud asukohast.

## Ennusta ja kontrolli

1. Küsi tootekaardi `getBoundingClientRect()` tulemus.
2. Märgi üles `top` ja `height`.
3. Keri lehte.
4. Küsi tulemus uuesti.

Ennusta:

- kas `height` muutub;
- kas `top` muutub;
- kas dokumendi asukoht `top + scrollY` jääb samaks.

::: details Tõenäoline tulemus
Kui elemendi suurus ja paigutus ei muutu, jääb `height` samaks. `top` muutub kerimise tõttu. Avaldis `top + scrollY` jääb ligikaudu samaks, sest see kirjeldab elemendi asukohta dokumendis.
:::

## Uurimisülesanne: nähtav tootekaart

Lisa lehele piisavalt tootekaartide näidiseid, et lehte saaks kerida.

1. Vali üks kaart.
2. Logi selle `getBoundingClientRect()` väärtused.
3. Kontrolli `isInViewport()` funktsiooniga, kas kaart on nähtav.
4. Keri kaart vaatealast välja ja kontrolli uuesti.
5. Selgita, miks `rect.top` võib olla negatiivne.

## Kokkuvõte

- `getBoundingClientRect()` annab elemendi piirdekasti vaateala suhtes.
- Kerimine muudab vaateala koordinaate, kuid mitte tingimata elemendi asukohta dokumendis.
- Hiire `clientX`/`clientY` ja `pageX`/`pageY` kasutavad erinevat lähtepunkti.
- JavaScripti mõõtmist kasutatakse siis, kui CSS-ist üksi ei piisa.
- Suure hulga elementide nähtavuse jälgimiseks tasub uurida `IntersectionObserver` API-t.

## Allikad

- [MDN: `Element.getBoundingClientRect()`](https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect) — elemendi piirdekasti mõõtmine.
- [MDN: Coordinate systems](https://developer.mozilla.org/en-US/docs/Web/API/CSSOM_view_API/Coordinate_systems) — brauseri koordinaatsüsteemid.
- [MDN: Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) — elementide nähtavuse jälgimine.
