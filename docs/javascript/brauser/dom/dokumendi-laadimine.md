---
title: JavaScripti käivitamine õigel ajal
description: Õpi ühendama JavaScripti HTML-iga nii, et DOM on koodi käivitamisel kasutatav.
outline: deep
---

# JavaScripti käivitamine õigel ajal

::: info Õpiväljund
Pärast õppetundi oskad valida skripti laadimiseks sobiva viisi ning põhjendada, miks kasutad `defer`-atribuuti, moodulit või `DOMContentLoaded` sündmust.
:::

Selles tunnis jätkad eelmises tunnis loodud tootekataloogiga. Uurid, millal brauser JavaScripti käivitab ja miks võib täiesti korrektne kood vahel ikkagi veateate anda.

## Enne alustamist

Sul on vaja:

- eelmises tunnis loodud `tootekataloog` kausta;
- brauseri arendaja tööriistu;
- ligikaudu 60–75 minutit.

Sinu `index.html` failis peaks olema JavaScript ühendatud järgmiselt:

```html
<script src="./app.js" defer></script>
```

Selles tunnis selgitame, miks `defer` seal vajalik on.

## Brauser loeb HTML-i ülevalt alla

Kui brauser avab HTML-faili, hakkab ta dokumenti ülevalt alla lugema. Loetud elementidest moodustab brauser DOM-puu, mida JavaScript saab kasutada.

Vaata järgmist HTML-i:

```html
<!doctype html>
<html lang="et">
  <head>
    <meta charset="UTF-8">
    <title>Tootekataloog</title>
    <script src="./app.js"></script>
  </head>
  <body>
    <p id="status">Tootekataloogi laadimine...</p>
  </body>
</html>
```

Kui brauser jõuab `<script>` elemendini, pole ta veel `<body>` sees olevat staatuse elementi lugenud. Tavaline skript peatab HTML-i lugemise ja käivitub kohe.

Kui `app.js` proovib elementi leida, saab ta tulemuseks `null`:

```js
const statusElement = document.querySelector("#status");

console.log(statusElement); // null

statusElement.textContent = "Tootekataloog on valmis.";
```

`null` tähendab siin, et sobivat elementi ei leitud. Järgmisel real tekib `TypeError`, sest `null` väärtusel pole omadust `textContent`.

::: warning Oluline mõte
Element võib HTML-failis olemas olla, kuid JavaScript ei saa seda kasutada enne, kui brauser on elemendi DOM-i lisanud.
:::

## Katseta katkist laadimisjärjekorda

1. Ava oma tootekataloogi `index.html`.
2. Eemalda skripti elemendilt ajutiselt `defer`.
3. Lisa HTML-i põhisisu algusesse:

```html
<p id="status">Tootekataloogi laadimine...</p>
```

4. Lisa `app.js` faili algusesse:

```js
const statusElement = document.querySelector("#status");

console.log("Leitud staatuse element:", statusElement);

statusElement.textContent = "Tootekataloog on valmis.";
```

5. Laadi leht uuesti ja vaata Console'i.

Kontrolli:

- kas `statusElement` väärtus on `null`;
- millisel real tekib `TypeError`;
- kas ülejäänud JavaScripti kood käivitub.

::: details Miks koodi täitmine peatub?
JavaScript proovib muuta `null.textContent` väärtust. Seda ei saa teha ning tekib käitusviga. Kui viga pole käsitletud, ei jätka brauser sama skripti järgmiste ridade täitmist.
:::

## Lahendus 1: `defer`

Lisa `defer` tagasi:

```html
<head>
  <meta charset="UTF-8">
  <title>Tootekataloog</title>
  <script src="./app.js" defer></script>
</head>
```

`defer` ütleb brauserile:

1. laadi väline JavaScripti fail HTML-i lugemisega samal ajal;
2. ära käivita skripti enne, kui HTML on läbi loetud;
3. käivita mitu `defer` skripti HTML-is määratud järjekorras.

Laadi leht uuesti. Nüüd peaks Console'is olema päris HTML-element ning lehel tekst:

```text
Tootekataloog on valmis.
```

::: tip Soovitus
Kui kasutad ühte või mitut tavalist välist JavaScripti faili, lisa skriptid `<head>` elementi koos `defer`-atribuudiga.
:::

## Lahendus 2: skript `body` lõpus

Vanemates projektides võid näha skripti vahetult enne sulgevat `</body>` märgendit:

```html
<body>
  <p id="status">Tootekataloogi laadimine...</p>

  <script src="./app.js"></script>
</body>
```

See töötab, sest brauser on skriptini jõudes eelnevad elemendid juba DOM-i lisanud.

Selle viisi puudus on see, et skripti asukoht HTML-is määrab tema käivitamise aja. `defer` väljendab kavatsust selgemalt: skript võib olla `<head>` elemendis, kuid peab ootama HTML-i valmimist.

## Lahendus 3: JavaScripti moodul

Suuremas rakenduses jagatakse JavaScript sageli mitmeks failiks. Sellisel juhul kasutatakse mooduleid:

```html
<script type="module" src="./app.js"></script>
```

Moodulskript:

- võimaldab kasutada `import` ja `export` võtmesõnu;
- ei käivitu enne HTML-i läbilugemist;
- ei vaja `defer`-atribuuti.

Vaheta oma projektis `defer` ajutiselt `type="module"` vastu ja kontrolli, et staatuse tekst muutub endiselt.

::: warning Mooduleid ava kohaliku serveri kaudu
Moodulite importimine ei pruugi töötada, kui avad HTML-faili otse arvutist. Kasuta arenduskeskkonna kohalikku serverit. Hiljem kasutame rakenduse käivitamiseks Vite'i.
:::

## Lahendus 4: `DOMContentLoaded`

Mõnikord ei saa sa ise otsustada, kus või kuidas skript HTML-i lisatakse. Siis saab kood oodata `DOMContentLoaded` sündmust:

```js
document.addEventListener("DOMContentLoaded", () => {
  const statusElement = document.querySelector("#status");
  statusElement.textContent = "Tootekataloog on valmis.";
});
```

See sündmus toimub pärast seda, kui HTML on läbi loetud ning DOM on kasutamiseks valmis.

Kui sinu skript kasutab juba `defer`-atribuuti või `type="module"` laadimisviisi, pole kogu koodi lisamine `DOMContentLoaded` sisse tavaliselt vajalik.

## Laadimisviiside võrdlus

| Laadimisviis | Millal skript käivitub? | Millal kasutada? |
| --- | --- | --- |
| `<script src="./app.js"></script>` `<head>` sees | Kohe, peatades HTML-i lugemise | Ainult siis, kui skript ei vaja hilisemaid DOM-elemente |
| `<script src="./app.js" defer></script>` | Pärast HTML-i läbilugemist | Tavaline väline JavaScripti fail |
| `<script type="module" src="./app.js"></script>` | Pärast HTML-i läbilugemist | Mitmeks mooduliks jagatud rakendus |
| `DOMContentLoaded` sündmus | Kui DOM on valmis | Kui skripti laadimisviisi ei saa ise kontrollida |

## Mida `defer` ei tähenda?

`defer` ei oota kõigi piltide ja muude väliste ressursside laadimist. See ootab HTML-i läbilugemist, et DOM-elemendid oleksid JavaScriptile kättesaadavad.

Samuti töötab `defer` ainult välise tavalise skripti puhul:

```html
<!-- Sobib -->
<script src="./app.js" defer></script>

<!-- Inline-skripti puhul defer ei mõju -->
<script defer>
  console.log("Käivitan kohe.");
</script>
```

## Praktiline ülesanne: tee kataloogi käivitumine nähtavaks

Täienda oma tootekataloogi nii, et kasutaja näeb, millal rakendus on käivitunud.

### Nõuded

1. HTML-is on element `id="status"`.
2. `app.js` leiab staatuse elemendi ja muudab selle teksti.
3. Skript on ühendatud `<head>` elemendis.
4. Kasutad teadlikult kas `defer`-atribuuti või `type="module"` laadimisviisi.
5. Oskad Console'i abil näidata, mis juhtub sobiva laadimisviisi eemaldamisel.

Näiteks:

```html
<p id="status">Tootekataloogi laadimine...</p>
```

```js
const statusElement = document.querySelector("#status");

statusElement.textContent = "Tootekataloog on valmis.";
```

### Piirjuhud

Kontrolli ka järgmisi olukordi:

- HTML-ist puudub `id="status"` element;
- HTML-is on kirjaviga, näiteks `id="stats"`;
- skript käivitatakse `<head>` elemendis ilma `defer`-atribuudita.

### Vihjed

1. Logi leitud element enne selle muutmist Console'i.
2. Kui näed `null`, kontrolli nii selektorit kui ka skripti käivitamise aega.
3. Kui näed `TypeError` teadet, otsi esimest rida, kus kasutatakse leidmata elementi.

### Kontrollitav tulemus

Lehe avamisel muutub staatuse tekst väärtuseks **„Tootekataloog on valmis.”**. Console'is ei ole veateateid ning oskad selgitada, miks valitud laadimisviis töötab.

## Kontrollküsimused

1. Miks võib HTML-is olemas oleva elemendi otsimine anda tulemuseks `null`?
2. Mida teeb `defer`?
3. Miks pole `type="module"` skriptil vaja `defer`-atribuuti?
4. Millal võiks kasutada `DOMContentLoaded` sündmust?
5. Kas `defer` ootab ära kõikide piltide laadimise?

::: details Vastused
1. JavaScript võib käivituda enne, kui brauser on selle elemendi DOM-i lisanud, või kasutatud selektor võib olla vale.
2. `defer` laadib välise skripti HTML-i lugemisega paralleelselt ja käivitab selle pärast HTML-i läbilugemist.
3. Moodulskriptid ootavad vaikimisi HTML-i läbilugemist.
4. Siis, kui kood peab ootama DOM-i valmimist, kuid skripti laadimisviisi ei saa ise kontrollida.
5. Ei. `defer` ootab HTML-i läbilugemist, mitte kõigi piltide ja muude ressursside laadimist.
:::

## Järgmine samm

Nüüd oskad tagada, et DOM on JavaScripti käivitamisel olemas. Järgmises tunnis uurid [DOM-puud](./dom-puu.md) ning õpid elemente teadlikult leidma ja muutma.

## Lisalugemine

- [MDN: `<script>` element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script)
- [MDN: `DOMContentLoaded` sündmus](https://developer.mozilla.org/en-US/docs/Web/API/Document/DOMContentLoaded_event)
- [MDN: JavaScripti moodulid](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)
