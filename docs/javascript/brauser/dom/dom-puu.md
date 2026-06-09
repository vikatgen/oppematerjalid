---
title: DOM-puu lugemine
description: Õpi tõlgendama HTML-dokumenti elementide hierarhiana ning kontrollima selle struktuuri brauseris.
outline: deep
---

# DOM-puu lugemine

::: info Õpiväljund
Pärast õppetundi oskad lugeda DOM-puud ning põhjendada elementide vanem-, laps- ja õdesuhteid.
:::

Veebileht ei ole brauseri jaoks lihtsalt pikk HTML-tekst. Brauser loob HTML-ist objektidest koosneva mudeli, mida JavaScript saab lugeda ja muuta. Seda mudelit nimetatakse **DOM-iks** (*Document Object Model*).

Selles tunnis täiendad tootekataloogi struktuuri ja õpid seda brauseri Elements-paneelis puuna lugema.

## Eeldused ja töövahendid

- Oled loonud eelmistes tundides `tootekataloog` projekti.
- Oskad avada brauseri DevToolsi ja Elements-paneeli.
- JavaScripti fail käivitub pärast HTML-i läbilugemist.
- Soovituslik kestus on 60–75 minutit.

## Miks DOM-puud on vaja mõista?

Hiljem tahad JavaScriptiga:

- muuta ainult kataloogi staatuse teksti;
- lisada uue tootekaardi õigesse nimekirja;
- leida nupu juurde kuuluva toote;
- eemaldada ühe elemendi teisi mõjutamata.

Selleks pead aru saama, kus element dokumendis asub ja milliste teiste elementidega ta seotud on.

::: tip HTML kirjeldab, DOM esindab
HTML on lähtekood. DOM on brauseri mälus olev objektimudel, mille brauser HTML-i põhjal loob.
:::

## HTML-ist saab puu

Vaata väikest tootekataloogi HTML-i:

```html
<main>
  <h1>Tootekataloog</h1>
  <p id="status">Tootekataloog on valmis.</p>
  <section id="products">
    <article class="product-card">
      <h2>Näidistoode</h2>
      <p>19.99 €</p>
    </article>
  </section>
</main>
```

Brauser esindab seda ligikaudu järgmise puuna:

```text
main
├── h1
├── p#status
└── section#products
    └── article.product-card
        ├── h2
        └── p
```

Puud loetakse ülevalt alla:

- `main` sisaldab kogu näites nähtavat sisu;
- `section#products` asub `main` elemendi sees;
- `article.product-card` asub toodete sektsiooni sees;
- tootekaardi `h2` ja `p` asuvad sama `article` elemendi sees.

Taanded aitavad näha, milline element millise sees asub.

## Elementide suhted

DOM-puu kirjeldamisel kasutatakse peresuhteid meenutavaid mõisteid.

### Vanemelement ja lapselement

Element, mille sees teine element asub, on selle **vanemelement** (*parent element*). Vahetult selle sees asuv element on **lapselement** (*child element*).

```html
<section id="products">
  <article class="product-card">
    <h2>Näidistoode</h2>
  </article>
</section>
```

Selles näites:

- `section` on `article` vanemelement;
- `article` on `section` lapselement;
- `article` on `h2` vanemelement;
- `h2` on `article` lapselement.

`section` ei ole `h2` vahetu vanemelement. `h2` asub küll selle sees, kuid nende vahel on `article`.

### Esivanem ja järeltulija

Kui elemendid pole vahetult üksteise sees, kasutatakse laiemaid mõisteid:

- `section` on `h2` **esivanem** (*ancestor*);
- `h2` on `section` **järeltulija** (*descendant*).

Ühel elemendil saab olla ainult üks vahetu vanemelement, kuid mitu esivanemat.

### Õdeelemendid

Sama vanema vahetud lapsed on **õdeelemendid** (*sibling elements*).

```html
<article class="product-card">
  <h2>Näidistoode</h2>
  <p>19.99 €</p>
  <button>Lisa ostukorvi</button>
</article>
```

`h2`, `p` ja `button` on õdeelemendid, sest neil kõigil on sama vahetu vanem `article`.

## Ennusta enne brauseris kontrollimist

Kasuta järgmist struktuuri:

```html
<body>
  <header>
    <h1>Tootekataloog</h1>
  </header>
  <main>
    <p id="status">Valmis</p>
    <section id="products">
      <article>
        <h2>Näidistoode</h2>
      </article>
    </section>
  </main>
</body>
```

Vasta enne lahenduse avamist:

1. Mis on `h1` vahetu vanemelement?
2. Kas `header` ja `main` on õdeelemendid?
3. Kas `main` on `h2` vanemelement või esivanem?
4. Mis on `article` vahetu lapselement?
5. Kas `p#status` ja `section#products` on õdeelemendid?

::: details Vastused
1. `h1` vahetu vanemelement on `header`.
2. Jah. Mõlema vahetu vanemelement on `body`.
3. `main` on `h2` esivanem. Nende vahel on `section` ja `article`.
4. `article` vahetu lapselement on `h2`.
5. Jah. Mõlema vahetu vanemelement on `main`.
:::

## Kontrolli puud Elements-paneelis

Brauseri Elements-paneel näitab hetkel kasutatavat DOM-puud.

1. Ava oma tootekataloog brauseris.
2. Ava DevTools ja vali **Elements**.
3. Ava noolega järjest `body`, `main` ja nende sees olevad elemendid.
4. Liiguta hiir mõne elemendi kohale.
5. Vaata, milline ala lehel esile tõstetakse.

Elements-paneelis elemendi avamine ja sulgemine ei muuda lehte. See muudab ainult seda, kui suurt osa puust parasjagu näed.

### Elements ei pruugi olla lähtefailiga täpselt sama

Elements-paneel näitab brauseri loodud DOM-i, mitte tingimata HTML-faili täpset tekstilist kuju. Brauser võib näiteks parandada mõne puuduva või vigaselt paigutatud HTML-elemendi.

Samuti võib JavaScript hiljem DOM-i muuta. Sellisel juhul näed Elements-paneelis uut seisu, kuigi lähtefail pole muutunud.

::: warning Elements-paneeli muudatused on ajutised
Kui muudad Elements-paneelis teksti või elemente, kaovad muudatused tavaliselt lehe uuesti laadimisel. Püsiv muudatus tuleb teha lähtekoodis või JavaScriptiga.
:::

## DOM-is on rohkem kui elemendid

DOM-puu koosneb **sõlmedest** (*nodes*). HTML-elemendid on üks sõlmede liik, kuid DOM-is võivad olla ka:

- tekstisõlmed;
- kommentaarisõlmed;
- dokument ise.

Näiteks:

```html
<h2>Näidistoode</h2>
```

Siin on `h2` elementsõlm ning tekst `Näidistoode` on selle sees eraldi tekstisõlm.

Keskendume esmalt elementidele. See aitab vältida olukorda, kus reavahetustest ja taanetest tekkinud tekstisõlmed muudavad puus liikumise ootamatult keeruliseks.

## Proovi ise: muuda struktuuri ja ennusta tulemust

Alusta järgmise koodiga:

```html
<section id="products">
  <article class="product-card">
    <h2>Näidistoode</h2>
    <p>19.99 €</p>
  </article>
</section>
```

Tõsta hinna `p` element `article` elemendist välja:

```html
<section id="products">
  <article class="product-card">
    <h2>Näidistoode</h2>
  </article>
  <p>19.99 €</p>
</section>
```

Enne lehe laadimist ennusta:

- kes on nüüd hinna `p` vanemelement;
- millise elemendiga on hinna `p` nüüd õdeelement;
- kas `p` kuulub DOM-puu järgi endiselt tootekaardi sisse.

Kontrolli vastuseid Elements-paneelis.

::: details Kontrolli tulemust
Hinna `p` vanemelement on nüüd `section#products`. See on `article.product-card` õdeelement ega kuulu enam tootekaardi sisse.
:::

## Praktiline ülesanne: korrasta tootekataloogi DOM-puu

Täienda oma tootekataloogi HTML-i nii, et lehe struktuur väljendab selgelt selle osi.

Kasuta lähtekohana:

```html
<body>
  <header>
    <h1>Tootekataloog</h1>
  </header>

  <main>
    <p id="status">Tootekataloog on valmis.</p>

    <section id="products" aria-labelledby="products-heading">
      <h2 id="products-heading">Tooted</h2>

      <article class="product-card">
        <h3>Näidistoode</h3>
        <p>Hind: 19.99 €</p>
        <button type="button">Lisa ostukorvi</button>
      </article>
    </section>
  </main>
</body>
```

### Nõuded

1. Lehel on `header` ja `main`, mis on `body` vahetud lapsed.
2. `main` sisaldab staatuse elementi ja toodete sektsiooni.
3. Toodete sektsioon sisaldab sektsiooni pealkirja ja vähemalt ühte tootekaarti.
4. Iga tootekaardi pealkiri, hind ja nupp asuvad sama `article` elemendi sees.
5. Joonistad oma HTML-ist lihtsustatud DOM-puu.
6. Kontrollid joonist Elements-paneeliga.

Näiteks võib sinu joonise üks osa olla:

```text
section#products
├── h2#products-heading
└── article.product-card
    ├── h3
    ├── p
    └── button
```

### Piirjuhud

Kontrolli ka järgmisi olukordi:

- toote nupp satub kogemata `article` elemendist välja;
- kaks tootekaarti on üksteise sees, mitte õdeelementidena;
- sulgev `</section>` või `</article>` märgend puudub;
- Elements-paneelis nähtav puu erineb sinu ennustusest.

### Vihjed

::: details Vihje 1
Alusta joonist kõige välimisest elemendist ja liigu taanetega sissepoole.
:::

::: details Vihje 2
Õdeelementidel peab olema sama vahetu vanemelement.
:::

::: details Vihje 3
Kui Elements-paneeli puu on ootamatu, kontrolli sulgevaid HTML-märgendeid ja nende järjekorda.
:::

### Kontrollitav tulemus

Valmis töös:

- vastab DOM-puu joonis Elements-paneelis nähtavale struktuurile;
- on tootekaardi pealkiri, hind ja nupp sama `article` lapsed;
- oskad näidata vähemalt ühe vanem-laps, õdeelemendi ning esivanem-järeltulija suhte;
- avaneb leht ilma nähtavalt katkise struktuurita.

## Mõtesta

1. Miks peab toote hind ja nupp asuma sama tootekaardi sees?
2. Mis vahe on vanemelemendil ja esivanemal?
3. Kuidas aitab DOM-puu mõistmine hiljem JavaScriptiga elementi leida?
4. Miks võib Elements-paneelis nähtav DOM erineda HTML-lähtekoodist?

## Laiendus

Lisa toodete sektsiooni teine `article.product-card`.

Joonista ainult see DOM-puu osa, mis algab `section#products` elemendist, ning vasta:

- millised elemendid on nüüd omavahel õdeelemendid;
- milline element on mõlema tootekaardi vanem;
- millised elemendid kuuluvad ainult teise tootekaardi sisse.

## Kokkuvõte

- Brauser loob HTML-ist DOM-i ehk objektidest koosneva dokumendimudeli.
- DOM-puu taanded näitavad, millised elemendid asuvad üksteise sees.
- Vanem ja laps on vahetu suhe; esivanem ja järeltulija võivad asuda kaugemal.
- Sama vanema vahetud lapsed on õdeelemendid.
- Elements-paneel näitab brauseri hetkel kasutatavat DOM-puud.

## Edasi

Järgmises tunnis kasutad DOM-puu teadmisi, et [JavaScriptiga vajalikud elemendid üles leida](./dom-elementide-otsimine.md).

## Allikad

- [MDN: Introduction to the DOM](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction) — DOM-i, sõlmede ja dokumentide ülevaade.
- [MDN: DOM scripting introduction](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/DOM_scripting) — DOM-i kasutamine JavaScriptiga.
