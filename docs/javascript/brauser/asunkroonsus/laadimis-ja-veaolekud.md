---
title: Laadimis- ja veaolekud
description: Õpi kujutama asünkroonse tegevuse laadimis-, õnnestumis-, tühja ja veaolekut.
outline: deep
---

# Laadimis- ja veaolekud

::: info Õpiväljund
Pärast õppetundi oskad hoida asünkroonse päringu olekut ning kuvada kasutajale laadimis-, õnnestumis-, tühja ja veaoleku.
:::

Töötav päring ei ole veel hea kasutajakogemus. Kui kataloog on päringu ajal lihtsalt tühi, ei tea kasutaja, kas rakendus laadib, on katki või ei leidnud tooteid.

Selles tunnis teed kõik olulised olekud nähtavaks.

## Eeldused ja töövahendid

- Sul on töötav `fetchProducts()` ja `loadProducts()` lahendus.
- Oskad muuta DOM-i teksti, klasse ja elementide nähtavust.
- Oskad kasutada `try...catch...finally` töövoogu.
- Soovituslik kestus on 75–90 minutit.

## Asünkroonse vaate neli põhiolekut

Tootekataloog võib olla:

1. **laadimisel** – päringu tulemust oodatakse;
2. **õnnestunud** – tooted saadi ja kuvatakse;
3. **tühi** – päring õnnestus, kuid kuvamiseks pole tooteid;
4. **veaga** – päring või vastuse töötlemine ebaõnnestus.

Tühi tulemus ei ole sama mis viga. Server võib edukalt tagastada tühja massiivi.

## Kirjelda olek ühe väärtusega

```js
let catalogStatus = "idle";
let catalogErrorMessage = "";
```

Võimalikud olekud:

```text
idle
loading
success
empty
error
```

Üks olekuväärtus aitab vältida vastukäivaid tõeväärtuseid nagu `isLoading === true` ja `hasError === true` samal ajal.

::: tip Üks vaade, üks põhi-olek
Kui olekud välistavad üksteist, kirjelda neid ühe väärtusega ning uuenda vaadet selle järgi.
:::

## Valmista olekuelemendid ette

HTML:

```html
<section id="catalog-status" aria-live="polite">
  <p id="loading-message" class="is-hidden">Toodete laadimine...</p>
  <p id="error-message" class="is-hidden"></p>
  <p id="empty-message" class="is-hidden">Tooteid ei leitud.</p>
</section>

<button id="retry-load" class="is-hidden" type="button">
  Proovi uuesti
</button>

<div id="product-list"></div>
```

CSS:

```css
.is-hidden {
  display: none;
}

.status-error {
  color: #9b1c1c;
}
```

`aria-live="polite"` aitab abitehnoloogial dünaamilisi olekuteateid sobival hetkel ette lugeda.

## Renderda olek eraldi funktsioonis

```js
const loadingMessage = document.querySelector("#loading-message");
const errorMessage = document.querySelector("#error-message");
const emptyMessage = document.querySelector("#empty-message");
const retryButton = document.querySelector("#retry-load");

function renderCatalogStatus() {
  loadingMessage.classList.toggle(
    "is-hidden",
    catalogStatus !== "loading"
  );

  errorMessage.classList.toggle(
    "is-hidden",
    catalogStatus !== "error"
  );

  emptyMessage.classList.toggle(
    "is-hidden",
    catalogStatus !== "empty"
  );

  retryButton.classList.toggle(
    "is-hidden",
    catalogStatus !== "error"
  );

  errorMessage.textContent = catalogErrorMessage;
}
```

See funktsioon ei otsusta olekut. Ta ainult kuvab muutujates kirjeldatud oleku.

## Uuenda olekut laadimisfunktsioonis

```js
let products = [];
let catalogStatus = "idle";
let catalogErrorMessage = "";

async function loadProducts() {
  catalogStatus = "loading";
  catalogErrorMessage = "";
  renderCatalogStatus();

  try {
    const apiProducts = await fetchProducts();

    products = prepareProducts(apiProducts);
    catalogStatus = products.length === 0 ? "empty" : "success";

    updateCatalog();
  } catch (error) {
    products = [];
    catalogStatus = "error";
    catalogErrorMessage =
      "Toodete laadimine ebaõnnestus. Proovi uuesti.";

    productList.replaceChildren();
    console.error("Toodete laadimine ebaõnnestus:", error);
  } finally {
    renderCatalogStatus();
  }
}
```

Järjekord:

1. määra laadimisolek enne päringut;
2. määra õnnestumise või tühja tulemus pärast vastust;
3. määra veaolek `catch` plokis;
4. renderda lõplik olek alati `finally` plokis.

## Ära kuva vana tulemust uue vea all

Kui korduslaadimine ebaõnnestub, pead teadlikult otsustama, kas:

- jätta varem laaditud tooted nähtavaks koos veateatega;
- eemaldada vana tulemus ja näidata ainult veaolekut.

Põhiülesandes eemaldad vana loendi, et kuvatav sisu vastaks viimase laadimiskatse tulemusele:

```js
products = [];
productList.replaceChildren();
```

Päris rakenduses võib vana sisu säilitamine olla parem otsus. Oluline on teha see teadlikult.

## Lisa uuesti proovimine

```js
retryButton.addEventListener("click", () => {
  loadProducts();
});
```

Sama `loadProducts()` funktsiooni kasutamine hoiab esialgse laadimise ja korduskatse käitumise ühes kohas.

Laadimise ajal keela kordusnupp:

```js
retryButton.disabled = catalogStatus === "loading";
```

Kui nupp on laadimise ajal peidetud, on keelamine siiski kasulik kaitse korduvate kutsete vastu.

## Erista tehniline ja kasutajale mõeldud viga

Kasutaja vajab lühikest tegevusjuhist:

```text
Toodete laadimine ebaõnnestus. Proovi uuesti.
```

Arendaja vajab tehnilist infot Console'is:

```js
console.error("Toodete laadimine ebaõnnestus:", error);
```

Ära kuva kasutajale kontrollimatult kogu tehnilist veateadet. See võib olla segane või sisaldada infot, mida kasutaja ei vaja.

## Käsitle filtreerimise tühja tulemust eraldi

Pärast edukat laadimist võib otsing või filter anda null tulemust. See ei ole päringu `empty` olek, vaid kasutajaliidese tühjus.

Kasuta eraldi teadet või kohanda olemasolevat:

```js
function updateCatalog() {
  const visibleProducts = getVisibleProducts();

  renderProducts(visibleProducts);

  const noFilterResults =
    catalogStatus === "success" &&
    visibleProducts.length === 0;

  emptyMessage.textContent = noFilterResults
    ? "Valitud filtritele vastavaid tooteid ei leitud."
    : "Server ei tagastanud ühtegi toodet.";

  emptyMessage.classList.toggle(
    "is-hidden",
    catalogStatus !== "empty" && !noFilterResults
  );
}
```

Rakenduse täpne ülesehitus võib erineda. Tähtis on, et kasutaja saaks aru, kas server ei andnud tooteid või aktiivne filter peitis need.

## Testi olekuid teadlikult

Ära looda ainult juhuslikule võrguprobleemile.

Testi:

- **loading** – lisa Network-paneelis päringule aeglustus või kasuta ajutist taimerit;
- **success** – kasuta õiget API aadressi;
- **empty** – tagasta ajutiselt `[]`;
- **error** – kasuta vale lõpp-punkti või viska ajutine viga.

Eemalda testimiseks tehtud muudatused pärast kontrolli.

## Praktiline ülesanne: täielik päringu olek

Täienda API-põhist tootekataloogi kõigi nelja nähtava olekuga.

### Nõuded

1. Rakendusel on üks põhi-oleku muutuja.
2. Laadimisolek muutub nähtavaks enne päringu lõppemist.
3. Edukas vastus kuvab tooted.
4. Edukas tühi vastus kuvab tühja oleku.
5. Ebaõnnestumine kuvab kasutajale veateate ja Console'i tehnilise vea.
6. Vea järel saab kasutaja päringut uuesti proovida.
7. Ühel hetkel ei kuvata vastukäivaid põhi-olekuid.
8. Filtrite null tulemus on eristatav serveri tühjast vastusest.

### Piirjuhud

Kontrolli:

- päring on aeglane;
- päring õnnestub toodetega;
- päring õnnestub tühja massiiviga;
- HTTP-vastus on veakoodiga;
- internetiühendus puudub;
- korduskatse õnnestub pärast viga;
- filter peidab kõik edukalt laaditud tooted.

### Vihjed

::: details Vihje 1
Määra `catalogStatus = "loading"` enne esimest `await` rida.
:::

::: details Vihje 2
Eduka vastuse järel vali olek massiivi pikkuse järgi.
:::

::: details Vihje 3
Kasuta ühte `renderCatalogStatus()` funktsiooni, et olekuelemendid ei läheks omavahel vastuollu.
:::

### Kontrollitav tulemus

Valmis töös:

- teab kasutaja igal hetkel, kas rakendus laadib, kuvab tulemust, on tühi või ebaõnnestus;
- saab kasutaja vea järel uuesti proovida;
- ei jää laadimisolek vea korral nähtavaks;
- ei kuvata vana tulemust kogemata viimase laadimiskatse tulemusena;
- oskad kõik olekud teadlikult esile kutsuda ja kontrollida.

## Mõtesta

1. Miks ei ole tühi massiiv sama mis päringu viga?
2. Miks tasub välistavad olekud kirjeldada ühe väärtusega?
3. Milline info kuulub kasutajale ja milline Console'i?
4. Kas vana edukas tulemus tuleks uue vea korral alles jätta? Põhjenda oma rakenduse valikut.

## Laiendus

Lisa laadimisolekusse lihtne visuaalne indikaator ning kasuta `aria-busy="true"` atribuuti kataloogi konteineril laadimise ajal. Eemalda või muuda väärtus pärast laadimise lõppu.

## Kokkuvõte

- Asünkroonne vaade vajab vähemalt laadimis-, õnnestumis-, tühja ja veaolekut.
- Tühi tulemus on edukas vastus ilma kuvatavate andmeteta.
- Üks olekuväärtus aitab vältida vastukäivaid vaateid.
- Kasutajale kuvatakse arusaadav tegevusjuhis, tehniline viga jääb Console'i.
- Kõiki olekuid tuleb teadlikult testida.

## Edasi

Nüüd kasutab tootekataloog päris serveriandmeid ning näitab päringu olekut. Järgmisena ühenda oskused [brauserirakenduse praktilises töös](../praktiline-too.md).

## Allikad

- [MDN: Using the Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch) — päringute ja vigade käsitlemine.
- [MDN: ARIA live regions](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Guides/Live_regions) — dünaamiliste teadete ligipääsetav kuvamine.
- [MDN: `aria-busy`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-busy) — laadiva piirkonna tähistamine.
