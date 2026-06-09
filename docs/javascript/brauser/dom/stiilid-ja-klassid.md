---
title: Stiilid ja klassid
description: Õpi kujutama rakenduse olekut CSS-klassidega ning muutma klasse JavaScriptist.
outline: deep
---

# Stiilid ja klassid

::: info Õpiväljund
Pärast õppetundi oskad väljendada rakenduse olekut CSS-klassiga ning lisada, eemaldada ja vahetada klasse JavaScriptiga.
:::

Toote saadavus, laadimine ja veateade ei ole ainult tekstid. Kasutaja peab neid olekuid kiiresti märkama. Selles tunnis seod JavaScripti väärtuse CSS-klassiga, mis muudab elemendi välimust.

## Eeldused ja töövahendid

- Oskad leida ning muuta olemasolevaid DOM-elemente.
- Oskad kirjutada lihtsat CSS-i.
- Sul on andmetega täidetud tootekaart.
- Soovituslik kestus on 60–75 minutit.

## Välimus kuulub CSS-i

JavaScript saab muuta elementi otse:

```js
const productCard = document.querySelector(".product-card");

productCard.style.opacity = "0.5";
productCard.style.borderColor = "gray";
```

See töötab, kuid hajutab kujunduse JavaScripti sisse. Mitme omaduse ja oleku korral muutub kood raskesti hallatavaks.

Selgem on kirjeldada oleku välimus CSS-is:

```css
.product-card {
  border: 1px solid #d4d4d4;
  padding: 1rem;
}

.product-card.is-unavailable {
  opacity: 0.55;
  border-color: #777;
}
```

JavaScript otsustab ainult, kas olekuklass on vajalik:

```js
productCard.classList.add("is-unavailable");
```

::: tip Vastutuste jaotus
JavaScript otsustab, **mis olekus** rakendus on. CSS otsustab, **kuidas see olek välja näeb**.
:::

## `classList` põhimeetodid

Leia tootekaart:

```js
const productCard = document.querySelector(".product-card");
```

### Lisa klass

```js
productCard.classList.add("is-unavailable");
```

### Eemalda klass

```js
productCard.classList.remove("is-unavailable");
```

### Kontrolli klassi olemasolu

```js
console.log(productCard.classList.contains("is-unavailable"));
```

### Vaheta klassi

```js
productCard.classList.toggle("is-featured");
```

`toggle()` lisab puuduva klassi ja eemaldab olemasoleva klassi.

## Seo klass tõeväärtusega

`toggle()` teine argument määrab, kas klass peab olema olemas:

```js
const product = {
  available: false
};

productCard.classList.toggle("is-unavailable", !product.available);
```

See on oleku kuvamiseks ennustatavam kui pime vahetamine:

```js
productCard.classList.toggle("is-unavailable");
```

Kui sama kood käivitub kogemata kaks korda, jõuab pime `toggle()` tagasi algolekusse. Tõeväärtusega variant viib elemendi alati andmetele vastavasse olekusse.

## Mitu eraldi olekut

Lisa staatuse elemendile CSS:

```css
.status {
  padding: 0.75rem;
  border-radius: 0.25rem;
}

.status.is-loading {
  background-color: #fff4cc;
}

.status.is-success {
  background-color: #d9f7df;
}

.status.is-error {
  background-color: #ffd9d9;
}
```

HTML:

```html
<p id="status" class="status">Tootekataloog on valmis.</p>
```

JavaScript:

```js
const statusElement = document.querySelector("#status");

statusElement.classList.remove("is-loading", "is-error");
statusElement.classList.add("is-success");
```

Kui olekud välistavad üksteist, eemalda eelmised olekuklassid enne uue lisamist.

## Elemendi näitmine ja peitmine

Lisa CSS:

```css
.is-hidden {
  display: none;
}
```

Seejärel saad tühja oleku nähtavust muuta:

```html
<p id="empty-message" class="is-hidden">Tooteid ei leitud.</p>
```

```js
const emptyMessage = document.querySelector("#empty-message");
const products = [];

emptyMessage.classList.toggle("is-hidden", products.length > 0);
```

Kui toodete arv on suurem kui null, on teade peidetud. Tühja massiivi puhul klass eemaldatakse ja teade muutub nähtavaks.

::: warning Peitmine ei asenda alati ligipääsetavuse läbimõtlemist
`display: none` peidab elemendi ka abitehnoloogiate eest. Kasuta seda siis, kui element ei pea peidetud olekus olema kasutajale kättesaadav.
:::

## Inline-stiili sobiv kasutus

`element.style` sobib hästi väärtustele, mis arvutatakse jooksvalt ja mille jaoks eraldi klasside loomine oleks ebamõistlik.

Näiteks ostukorvi täitumise protsent:

```js
const progressBar = document.querySelector(".cart-progress");
const percentage = 65;

progressBar.style.width = `${percentage}%`;
```

Püsivate olekute, värvide ja kujundusreeglite jaoks eelista klasse.

## Praktiline ülesanne: kuva toote saadavus

Kasuta:

```js
const product = {
  title: "Must seljakott",
  available: false,
  featured: true
};
```

Täienda tootekaarti ja staatuse elementi.

### Nõuded

1. Tootekaardil on põhiklass `product-card`.
2. Mittesaadaval tootel on lisaklass `is-unavailable`.
3. Esiletõstetud tootel on lisaklass `is-featured`.
4. Mittesaadaval toote lisamise nupp on keelatud.
5. Staatuse elemendil on täpselt üks olekuklass: `is-loading`, `is-success` või `is-error`.
6. CSS kirjeldab kõigi kasutatud klasside nähtava tulemuse.

Lähtekoht:

```js
const productCard = document.querySelector(".product-card");
const addButton = productCard.querySelector(".add-to-cart");
const statusElement = document.querySelector("#status");

productCard.classList.toggle("is-unavailable", !product.available);
// Täienda ülejäänud olekud.
```

### Piirjuhud

Kontrolli:

- toode on saadaval;
- toode pole saadaval;
- `featured` muutub `true` väärtuselt `false` väärtusele;
- sama olekut määrav kood käivitub kaks korda;
- staatuse elemendile on kogemata jäänud kaks vastukäivat olekuklassi.

### Vihjed

::: details Vihje 1
Kasuta `toggle(className, condition)` kuju, kui klass sõltub tõeväärtusest.
:::

::: details Vihje 2
Nupu käitumise jaoks muuda `disabled` omadust, välimuse jaoks CSS-klassi.
:::

::: details Vihje 3
Enne uue staatuseklassi lisamist eemalda kõik võimalikud vanad olekuklassid.
:::

### Kontrollitav tulemus

Valmis töös:

- vastab tootekaardi välimus alati `available` ja `featured` väärtustele;
- ei vaheta sama koodi korduv käivitamine olekut valeks;
- on mittesaadaval toote nupp päriselt keelatud, mitte ainult hall;
- oskad Elements-paneelis näidata, millised klassid olekut väljendavad.

## Mõtesta

1. Miks on püsivate olekute kujundamine klassidega parem kui mitme `style` omaduse muutmine?
2. Mis vahe on `toggle("klass")` ja `toggle("klass", tingimus)` kasutamisel?
3. Miks peab mittesaadaval toote nupp lisaks hallile välimusele olema ka `disabled`?
4. Millal on inline-stiil siiski mõistlik?

## Laiendus

Lisa tühja kataloogi teade ja klass `is-hidden`. Muuda teate nähtavust kohaliku `products` massiivi pikkuse põhjal.

## Kokkuvõte

- CSS-klass kirjeldab elemendi välimust, JavaScript rakenduse olekut.
- `classList.add()`, `remove()` ja `contains()` haldavad klasse.
- `classList.toggle(className, condition)` seob klassi kindla tõeväärtusega.
- Vastukäivad olekuklassid tuleb enne uue oleku lisamist eemaldada.
- Inline-stiil sobib eelkõige jooksvalt arvutatud üksikväärtuste jaoks.

## Edasi

Järgmises tunnis lood kohalike tooteandmete põhjal [uued tootekaardid ja eemaldad vanad](./nodede-lisamine-ja-eemaldamine.md).

## Allikad

- [MDN: `Element.classList`](https://developer.mozilla.org/en-US/docs/Web/API/Element/classList) — klasside lisamine, eemaldamine ja vahetamine.
- [MDN: `HTMLElement.style`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style) — inline-stiilide kasutamine.
