---
title: Brauseri arenduskeskkond
description: Õpi käivitama JavaScripti brauseris ning kasutama DevToolsi koodi ja lehe kontrollimiseks.
outline: deep
---

# Brauseri arenduskeskkond

::: info Õpiväljund
Pärast õppetundi oskad käivitada HTML-i ja JavaScripti brauseris, kasutada DevToolsi Console'i ning kontrollida, milline fail ja koodirida tulemuse tekitas.
:::

## Eeldused ja töövahendid

- Oled läbinud programmeerimise alused.
- Sul on tekstiredaktor ja kaasaegne veebibrauser.
- Kasutad eraldi projektikausta.
- Soovituslik kestus on 60–75 minutit.

## Miks brauser on eraldi JavaScripti keskkond?

Programmeerimise alustes käivitasid JavaScripti brauseri konsoolis või Node.js-is. Brauseris saab JavaScript lisaks keele põhivõtetele kasutada brauseri pakutavaid API-sid:

- lugeda ja muuta HTML-dokumenti;
- reageerida kasutaja tegevustele;
- säilitada andmeid brauseris;
- küsida andmeid serverist;
- kasutada brauseri arendustööriistu.

Sama JavaScripti keel töötab eri keskkondades, kuid keskkonna pakutavad võimalused erinevad.

```js
console.log("Töötab brauseris ja Node.js-is");

console.log(document.title); // document on brauseri API
```

Node.js-is ei ole vaikimisi `document` objekti. Brauseris kirjeldab see avatud HTML-dokumenti.

## Läbiva projekti algus

Brauseriosa jooksul ehitad tootekataloogi. Esimeses tunnis lood minimaalse töötava projekti:

```text
tootekataloog/
├── index.html
├── style.css
└── app.js
```

::: warning Selles etapis ei kasutata veel API-t
Esialgu kasutame ühte lokaalset tooteobjekti. Fake Store API lisandub asünkroonsuse ja `fetch()` tunnis.
:::

## Loo HTML-dokument

Loo fail `index.html`:

```html
<!doctype html>
<html lang="et">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Tootekataloog</title>
    <link rel="stylesheet" href="./style.css" />
    <script src="./app.js" defer></script>
  </head>
  <body>
    <main>
      <h1>Tootekataloog</h1>
      <p id="status">JavaScript ei ole veel kinnitatud.</p>
    </main>
  </body>
</html>
```

`defer` tähendab, et brauser laadib JavaScripti faili HTML-i lugemisega paralleelselt, kuid käivitab selle pärast dokumendi parsimist. Seda käsitleme täpsemalt järgmises tunnis.

## Lisa minimaalne stiil

Loo fail `style.css`:

```css
body {
  font-family: system-ui, sans-serif;
  margin: 0;
  padding: 2rem;
}

main {
  max-width: 60rem;
  margin: 0 auto;
}
```

Selle tunni eesmärk ei ole kujundus. Stiil aitab ainult kinnitada, et CSS-fail on õigesti ühendatud.

## Lisa JavaScript

Loo fail `app.js`:

```js
const product = {
  title: "Näidistoode",
  price: 19.99,
  category: "demo"
};

console.log("Tootekataloog käivitus");
console.log("product:", product);
console.log("document title:", document.title);
```

Ava `index.html` brauseris otse või õpetaja määratud kohaliku arendusserveri kaudu. Lehel kuvatakse pealkiri ja staatuse tekst, kuid JavaScripti väljundit näed DevToolsi Console'is.

## DevToolsi avamine

Brauseri arendustööriistad ehk **DevTools** aitavad jälgida, mida brauser laadis ja kuidas kood töötas.

Levinud avamisviisid:

- paremklõps lehel ja **Inspect**;
- klahv `F12`;
- Windows/Linux: `Ctrl + Shift + I`;
- macOS: `Cmd + Option + I`.

### Console

Console näitab `console.log()` väljundeid, hoiatusi ja vigu.

Kontrolli, et näed:

```txt
Tootekataloog käivitus
product: { ... }
document title: Tootekataloog
```

Console'is saad avaldisi ka ise käivitada:

```js
product.title;
document.title;
```

::: warning Console'i käsitsi loodud väärtused ei jää faili
Console sobib kiireks katsetamiseks. Püsiv kood kirjuta alati projekti JavaScripti faili.
:::

### Elements

Elements-paneel näitab brauseri loodud DOM-puud. Leia sealt:

- `<main>`;
- `<h1>`;
- element atribuudiga `id="status"`;
- `<script>` element.

Elements-paneelis tehtud muudatused on ajutised ja kaovad lehe uuesti laadimisel.

### Sources

Sources-paneel näitab brauseri laaditud lähtefaile. Leia `app.js` ja kontrolli, et selle sisu vastab sinu projektifailile.

Kui Console'is kuvatakse viga, saab veateates olevale failile ja reanumbrile vajutades avada vastava koha Sources-paneelis.

### Network

Network-paneel näitab brauseri tehtud päringuid.

Laadi leht uuesti ja kontrolli, et brauser küsib:

- `index.html`;
- `style.css`;
- `app.js`.

Hiljem näed siin ka Fake Store API päringuid ja vastuseid.

## Proovi ise: leia vea põhjus

Muuda JavaScripti faili nime HTML-is teadlikult valeks:

```html
<script src="./apps.js" defer></script>
```

Laadi leht uuesti ja kontrolli:

1. kas Console näitab veateadet;
2. milline päring Network-paneelis ebaõnnestus;
3. kuidas brauser ebaõnnestunud faili laadimist näitab;
4. kuidas faili nime parandamine tulemuse taastab.

::: details Kontrolli tulemust
Brauser ei leia faili `apps.js`. Network-paneelis kuvatakse ebaõnnestunud laadimine. Kohaliku serveri kasutamisel on vastus tavaliselt olekukoodiga `404`; faili otse avamisel võib brauser näidata failitee viga. Pärast nime parandamist failiks `app.js` ilmuvad Console'i väljundid uuesti.
:::

## Praktiline ülesanne: tootekataloogi algprojekt

Loo brauseriosa läbiva projekti minimaalne versioon.

Nõuded:

1. Projektis on failid `index.html`, `style.css` ja `app.js`.
2. HTML ühendab CSS- ja JavaScripti faili.
3. Lehel on pealkiri „Tootekataloog” ning element `id="status"`.
4. JavaScriptis on vähemalt üks lokaalne tooteobjekt omadustega `title`, `price` ja `category`.
5. Console kuvab rakenduse käivitumise teate ning tooteobjekti.
6. Oskad näidata Elements-, Console-, Sources- ja Network-paneelis, kust lehe tulemus pärineb.

Valmis lahendus:

- leht avaneb ilma Console'i vigadeta;
- CSS muudab lehe välimust;
- `app.js` kuvatakse Network-paneelis eduka päringuna;
- Console'is on tooteobjekt;
- õppija oskab teadlikult tekitatud vale failinime vea leida ja parandada.

::: details Vihje 1
Kontrolli esmalt, et kõik kolm faili asuvad samas kaustas.
:::

::: details Vihje 2
Failiteed algavad selles projektis kujul `./failinimi`.
:::

::: details Vihje 3
Kui JavaScripti väljundit pole, vaata Network-paneelist, kas `app.js` laaditi edukalt.
:::

## Mõtesta

- Mis vahe on JavaScriptil kui keelel ja brauseril kui käivituskeskkonnal?
- Miks ei piisa vea korral ainult lehe nähtava tulemuse vaatamisest?
- Millal kasutad Console-, Elements-, Sources- ja Network-paneeli?
- Miks ei jää Elements-paneelis tehtud muudatus pärast lehe uuesti laadimist alles?

## Kokkuvõte

- Brauser pakub JavaScriptile DOM-i ja teisi veebirakenduse API-sid.
- HTML, CSS ja JavaScript täidavad projektis eri rolle.
- Console näitab väljundeid ja vigu.
- Elements näitab DOM-puud, Sources lähtekoode ja Network päringuid.
- Vea leidmisel kontrolli esimest ebaõnnestunud faili, väärtust või koodirida.

## Edasi

Järgmine tund: [JavaScripti käivitamine õigel ajal](./dokumendi-laadimine.md).

## Allikad

- [MDN: What are browser developer tools?](https://developer.mozilla.org/en-US/docs/Learn_web_development/Howto/Tools_and_setup/What_are_browser_developer_tools) — DevToolsi paneelide ülevaade.
- [MDN: Console](https://developer.mozilla.org/en-US/docs/Web/API/console) — Console API teatmematerjal.
