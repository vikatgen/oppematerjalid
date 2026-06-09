---
title: Mutatsiooni jälgimine
description: Lisalugemine DOM-i muutuste jälgimisest MutationObserver API abil.
outline: deep
---

# Mutatsiooni jälgimine

::: warning Lisamaterjal
Loe seda materjali, kui sinu kood peab reageerima DOM-i muudatusele, mille tegi mõni teine skript, väline komponent või brauserilaiendus.
:::

Tavaliselt teab rakendus ise, millal ta DOM-i muudab:

```js
products.push(product);
renderProducts(products);
updateStatus();
```

Sellisel juhul on kõige selgem kutsuda vajalik loogika otse. Mõnikord muudab DOM-i aga kood, mida sa ise ei juhi. Siis saab muudatusi jälgida `MutationObserver` abil.

## Mis on DOM-i mutatsioon?

Mutatsioon on DOM-puu muutus, näiteks:

- lapselemendi lisamine või eemaldamine;
- atribuudi muutmine;
- tekstisõlme muutmine.

`MutationObserver` ei jälgi JavaScripti muutujate või objektide muutumist. Ta jälgib DOM-i.

```js
products.push(product); // observer seda ei näe
productList.append(card); // observer saab seda näha
```

## Esimene observer

```js
const productList = document.querySelector("#product-list");

const observer = new MutationObserver((mutations) => {
  console.log("DOM muutus:", mutations);
});

observer.observe(productList, {
  childList: true
});
```

Kui `productList` saab uue lapse või mõni laps eemaldatakse, käivitub callback.

## Mutatsioonikirjed

Callback saab mutatsioonikirjete massiivi:

```js
const observer = new MutationObserver((mutations) => {
  for (const mutation of mutations) {
    console.log("Tüüp:", mutation.type);
    console.log("Lisatud:", mutation.addedNodes);
    console.log("Eemaldatud:", mutation.removedNodes);
  }
});
```

`childList` mutatsiooni puhul on kasulikud:

- `addedNodes`;
- `removedNodes`;
- `target`, mille lapsed muutusid.

## Jälgimise valikud

```js
observer.observe(productList, {
  childList: true,
  attributes: true,
  characterData: true,
  subtree: true
});
```

| Valik | Mida jälgib? |
| --- | --- |
| `childList` | vahetute laste lisamine ja eemaldamine |
| `attributes` | atribuutide muutmine |
| `characterData` | tekstisõlme sisu muutmine |
| `subtree` | ka kõiki järeltulijaid |

Jälgi ainult vajalikku. Väga laia DOM-puu ja paljude muudatuste vaatlemine võib teha koodi aeglaseks ning raskesti jälgitavaks.

## Jälgi tootekaartide arvu

```js
const cardCountElement = document.querySelector("#observed-card-count");

const observer = new MutationObserver(() => {
  const cards = productList.querySelectorAll(".product-card");

  cardCountElement.textContent = String(cards.length);
});

observer.observe(productList, {
  childList: true
});
```

Kui `renderProducts()` asendab loendi lapsed, uuendab observer loendurit.

See näide aitab observerit mõista, kuid sinu enda renderdamisfunktsioonis oleks kaardi arvu otsene uuendamine tavaliselt selgem.

## Callback ei käivitu keset muudatuse rida

MutationObserver koondab DOM-i muudatused ja käivitab callback'i pärast praeguse sünkroonse koodi lõppu.

```js
console.log("1. Enne lisamist");

productList.append(document.createElement("article"));

console.log("2. Pärast lisamist");
```

Observeri logi ilmub pärast mõlemat sünkroonset logi. See seostub mikroülesannete ja event loop'i tööga.

Täpset järjekorda selgitab [event loop'i lisamaterjal](./event-loop-mikro-ja-makro.md).

## Peata jälgimine

```js
observer.disconnect();
```

Pärast `disconnect()` kutset observer enam uusi muudatusi ei jälgi.

Kui observerit vajatakse ajutiselt, eemalda see pärast töö lõppu. Nii väldid tarbetut tööd ja ootamatuid kõrvalmõjusid.

## Väldi tagasisideahelat

Observeri callback võib ise DOM-i muuta:

```js
const observer = new MutationObserver(() => {
  productList.append(document.createElement("p"));
});
```

See muudatus käivitab observeri uuesti ning võib tekitada lõputu muutuste ahela.

Callback'is DOM-i muutes küsi:

- kas uus muudatus vastab samale jälgimisreeglile;
- kas muudatust on vaja teha ainult üks kord;
- kas observer tuleks ajutiselt peatada.

## Millal `MutationObserver` sobib?

Sobib näiteks:

- välise vidina loodud DOM-i jälgimiseks;
- brauserilaienduse töös;
- vanema süsteemi integreerimisel;
- testis, mis ootab välise koodi loodud elementi.

Ära kasuta observerit selleks, et teada saada enda funktsiooni tehtud muudatusest. Kui sinu kood muudab andmeid või DOM-i, uuenda sõltuv tulemus samas töövoos otse.

::: tip Observer on vaatleja, mitte rakenduse oleku allikas
Rakenduse tegelik olek peaks asuma selgetes andmetes. DOM-i jälgimine ei peaks asendama arusaadavat andmevoogu.
:::

## Ennusta ja kontrolli

```js
const container = document.querySelector("#product-list");

const observer = new MutationObserver((mutations) => {
  console.log("C. Mutatsioone:", mutations.length);
});

observer.observe(container, { childList: true });

console.log("A. Enne");
container.append(document.createElement("article"));
container.append(document.createElement("article"));
console.log("B. Pärast");
```

Ennusta:

- logide `A`, `B` ja `C` järjekord;
- kas callback võib saada mitu mutatsioonikirjet;
- mis juhtub pärast `observer.disconnect()` kutset.

## Uurimisülesanne: jälgi väliseid muudatusi

1. Lisa `#product-list` elemendile observer.
2. Logi lisatud ja eemaldatud sõlmede arv.
3. Käivita `renderProducts()` mitme erineva massiiviga.
4. Peata observer `disconnect()` abil.
5. Renderda veel kord ja selgita tulemust.
6. Põhjenda, kas observer on selle rakenduse tavaliseks renderdamiseks parem kui otsene funktsioonikutse.

## Kokkuvõte

- `MutationObserver` jälgib DOM-i muudatusi, mitte JavaScripti andmeobjekte.
- Observer saab kirjeldada lisatud, eemaldatud ja muudetud sõlmi.
- Jälgimisvalikud tuleb hoida võimalikult täpsed.
- Callback käivitub pärast praeguse sünkroonse töö lõppu.
- Enda rakenduse selge andmevoog on tavaliselt observerist parem.

## Allikad

- [MDN: `MutationObserver`](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver) — DOM-i muutuste jälgimine.
- [MDN: `MutationRecord`](https://developer.mozilla.org/en-US/docs/Web/API/MutationRecord) — ühe mutatsiooni kirjeldus.
