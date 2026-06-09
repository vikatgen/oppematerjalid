---
title: Mis on brauseri sündmused?
description: Õpi lisama elemendile sündmusekuulaja ning käivitama kasutaja tegevuse järel sobiva funktsiooni.
outline: deep
---

# Mis on brauseri sündmused?

::: info Õpiväljund
Pärast õppetundi oskad lisada DOM-elemendile sündmusekuulaja ning selgitada, millal ja miks sündmuse töötleja käivitub.
:::

DOM-rajas lõi JavaScript lehe sisu kohe rakenduse käivitumisel. Interaktiivne rakendus peab pärast seda ootama kasutaja tegevusi: klõpsu, teksti sisestamist või vormi saatmist. Brauser kirjeldab neid tegevusi **sündmustena** (*events*).

Selles tunnis lisad tootekataloogile staatilise nupu, millega kasutaja saab mittesaadavad tooted peita ja uuesti kuvada.

## Eeldused ja töövahendid

- Oskad leida ning muuta DOM-elemente.
- Sul on kohalike toodetega töötav `renderProducts(products)` funktsioon.
- Oskad kasutada funktsioone ja tõeväärtusi.
- Soovituslik kestus on 60–75 minutit.

## Rakendus ootab tegevust

Lisa HTML-i toodete sektsiooni ette nupp:

```html
<button id="toggle-availability" type="button">
  Peida mittesaadavad tooted
</button>
```

Nupp on DOM-is olemas, kuid ei tee veel midagi. JavaScript peab:

1. leidma nupu;
2. määrama, millist sündmust kuulata;
3. andma brauserile funktsiooni, mis sündmuse järel käivitatakse.

## Sündmusekuulaja lisamine

```js
const toggleButton = document.querySelector("#toggle-availability");

function handleToggleClick() {
  console.log("Kasutaja vajutas nuppu.");
}

toggleButton.addEventListener("click", handleToggleClick);
```

`addEventListener()` saab kaks olulist argumenti:

- sündmuse nimi, näiteks `"click"`;
- funktsioon, mis sündmuse järel käivitatakse.

Funktsiooni nimetatakse **sündmuse töötlejaks** (*event handler*).

::: warning Anna funktsioon edasi, ära käivita seda kohe
Õige:

```js
toggleButton.addEventListener("click", handleToggleClick);
```

Vale:

```js
toggleButton.addEventListener("click", handleToggleClick());
```

Sulgudega käivitaksid funktsiooni kohe lehe laadimisel ja annaksid kuulajale funktsiooni tagastusväärtuse.
:::

## Sündmuse objekt

Brauser annab töötlejale sündmuse kohta info:

```js
function handleToggleClick(event) {
  console.log("Sündmuse tüüp:", event.type);
  console.log("Kuulajaga element:", event.currentTarget);
}
```

`event.currentTarget` on element, millele kuulaja lisati. Selles näites on see `toggleButton`.

Sündmuse objekt aitab hiljem teada saada näiteks:

- millisel elemendil tegevus toimus;
- millist klahvi vajutati;
- milline oli vormi või sisestusvälja hetkeseis.

## Muuda rakenduse olekut

Lisa tõeväärtus, mis kirjeldab kasutaja valikut:

```js
let hideUnavailable = false;
```

Muuda seda klõpsu järel:

```js
function handleToggleClick() {
  hideUnavailable = !hideUnavailable;

  console.log("Peida mittesaadavad:", hideUnavailable);
}
```

Sündmus ei peaks muutma ainult nuppu. See muudab rakenduse olekut, mille põhjal saab valida kuvatavad tooted:

```js
function getVisibleProducts() {
  const visibleProducts = [];

  for (const product of products) {
    if (!hideUnavailable || product.available) {
      visibleProducts.push(product);
    }
  }

  return visibleProducts;
}

function handleToggleClick() {
  hideUnavailable = !hideUnavailable;
  renderProducts(getVisibleProducts());
}
```

See lahendus kasutab tsüklit, mille tööd saad rida-realt jälgida. Sama ülesannet saab lahendada ka `filter()` meetodiga, mida tutvustab [massiivimeetodite lisalugemine](/javascript/lisalugemine/massiivimeetodid-ja-callbackid).

## Hoia nupu tekst olekuga vastavuses

```js
function updateToggleButton() {
  toggleButton.textContent = hideUnavailable
    ? "Kuva kõik tooted"
    : "Peida mittesaadavad tooted";
}

function handleToggleClick() {
  hideUnavailable = !hideUnavailable;

  renderProducts(getVisibleProducts());
  updateToggleButton();
}
```

Nüüd järgivad andmed, DOM ja nupu tekst sama olekut.

## Noolfunktsioon kuulajana

Väikese ühekordse tegevuse saab kirjutada ka otse:

```js
toggleButton.addEventListener("click", () => {
  console.log("Nupule vajutati.");
});
```

Pikema või korduvkasutatava töötleja jaoks eelista nimega funktsiooni. Seda on lihtsam lugeda, siluda ja vajadusel eemaldada.

## Kuulaja eemaldamine

Kuulaja eemaldamiseks on vaja sama sündmuse nime ja sama funktsiooni viidet:

```js
toggleButton.removeEventListener("click", handleToggleClick);
```

Seda kasutatakse näiteks siis, kui tegevus peab olema ajutine. Põhiülesandes jätad kuulaja aktiivseks.

## Praktiline ülesanne: kuva või peida mittesaadavad tooted

Täienda tootekataloogi nii, et staatiline nupp juhib toodete nähtavust.

### Nõuded

1. HTML-is on `type="button"` atribuudiga juhtnupp.
2. JavaScript leiab nupu ja lisab sellele ühe `click`-kuulaja.
3. Muutuja `hideUnavailable` kirjeldab kasutaja valikut.
4. Klõps muudab olekut ja renderdab sobivad tooted.
5. Nupu tekst vastab hetkeolekule.
6. Sündmuse töötleja on nimega funktsioon.

### Piirjuhud

Kontrolli:

- kõik tooted on saadaval;
- ükski toode pole saadaval;
- nuppu vajutatakse mitu korda;
- `products` massiiv on tühi;
- nupu selektoris on kirjaviga.

### Vihjed

::: details Vihje 1
Lisa kuulaja üks kord pärast nupu leidmist.
:::

::: details Vihje 2
Tõeväärtuse vahetamiseks kasuta:

```js
hideUnavailable = !hideUnavailable;
```
:::

::: details Vihje 3
Koosta nähtavate toodete jaoks uus massiiv `for...of` tsükliga ja anna see `renderProducts()` funktsioonile.
:::

### Kontrollitav tulemus

Valmis töös:

- muudab iga klõps kuvatavate toodete hulka;
- ei teki korduvate klõpsude järel duplikaate;
- vastab nupu tekst alati järgmisele võimalikule tegevusele;
- oskad Console'is näidata sündmuse tüüpi ja `currentTarget` elementi.

## Mõtesta

1. Miks ei käivitata töötleja funktsiooni `addEventListener()` reas sulgudega?
2. Mis vahe on sündmusel, kuulajal ja töötlejal?
3. Miks on `hideUnavailable` eraldi muutuja, mitte ainult nupu tekst?
4. Miks lisatakse kuulaja tavaliselt ainult üks kord?

## Laiendus

Lisa klõpsude loendur ning kuva Console'is, mitu korda kasutaja nuppu vajutas. Ära kasuta loendurit rakenduse põhikäitumise otsustamiseks.

## Kokkuvõte

- Sündmus kirjeldab brauseris toimunud tegevust.
- `addEventListener()` seob elemendi, sündmuse tüübi ja töötleja funktsiooni.
- Brauser annab töötlejale sündmuse objekti.
- Töötleja muudab tavaliselt rakenduse olekut ja uuendab seejärel vaadet.
- Nimega töötlejat on lihtne lugeda, siluda ja eemaldada.

## Edasi

Järgmises tunnis valid erinevate kasutajaliidese tegevuste jaoks [sobiva UI-sündmuse](./ui-sundmused.md).

## Allikad

- [MDN: Introduction to events](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Events) — sündmuste põhikontseptsioonid.
- [MDN: `EventTarget.addEventListener()`](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener) — sündmusekuulaja lisamine.
- [MDN: `Event.currentTarget`](https://developer.mozilla.org/en-US/docs/Web/API/Event/currentTarget) — kuulajaga seotud elemendi leidmine.
