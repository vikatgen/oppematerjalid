---
title: Reacti mõtteviis
description: Võrdle DOM-i käsitsi muutmist Reacti deklaratiivse kasutajaliidesega ja jaga vaade komponentideks.
outline: deep
---

# Reacti mõtteviis

::: info Õpiväljund
Pärast kohtumist oskad selgitada deklaratiivse kasutajaliidese põhimõtet ning jagada etteantud vaate põhjendatud komponentideks.
:::

## Miks see oluline on?

Väikesel veebilehel saame elemente DOM-is käsitsi otsida ja muuta. Rakenduse kasvades sõltub ühest andmest sageli mitu kasutajaliidese osa. Kõigi elementide käsitsi kooskõlas hoidmine muutub keeruliseks.

React aitab kirjeldada, milline peab kasutajaliides praeguste andmete korral välja nägema. React arvutab andmete muutumisel komponendi uue tulemuse ja uuendab brauseris vajalikud elemendid.

## Eeldused ja kiire algus

Kohtumine kestab 90 minutit: 10 min tutvustus, 15 min DOM-i näide, 15 min lähenemiste võrdlus, 15 min komponendid, 20 min paaristöö, 10 min arutelu ja 5 min väljumisküsimus.

Vajad JavaScripti funktsioonide ja DOM-i põhiteadmisi, brauserit ning tekstiredaktorit. Komponentide puu ülesande saab teha ka paberil. Reacti paigaldame 2. kohtumisel.

DOM-i näite proovimiseks loo `counter.html`. Pane allpool antud HTML-i järel samasse faili `<script>` märgend, selle sisse näite JavaScript ja lõppu `</script>`. Ava fail brauseris. Keelamise tingimus lisa sündmuse töötleja sisse pärast arvu suurendamist.

## Reacti roll

HTML määrab dokumendi struktuuri, CSS välimuse ja JavaScript käitumise. React on JavaScripti teek kasutajaliideste loomiseks. Meie rakenduses haldab React osa brauseri DOM-ist. Node.js käitab arendustööriistu; valmis API töötab eraldi serveris.

Reacti state'i setter tellib uue renderduse. Tavalise muutuja või objekti omavoliline muutmine ei teavita Reacti. Seetõttu hakkame hiljem uurima, millised väärtused on props ja millised state.

## Kursuse läbiv rakendus

Kursuse jooksul ehitame artiklite kataloogi. Rakendus laadib andmed valmis API-st ning saab vähemalt järgmised vaated:

```text
/                 avaleht
/posts            artiklite loend
/posts/:postId    artikli detailvaade
/about            rakenduse info
```

Kasutajaliides võib esialgu välja näha nii:

```text
┌────────────────────────────────────────┐
│ Artiklid       Avaleht  Artiklid  Info │
├────────────────────────────────────────┤
│ Otsi artiklit...                       │
│                                        │
│ Artikli pealkiri                       │
│ Artikli lühike sisu...        Loe edasi│
│                                        │
│ Teise artikli pealkiri                 │
│ Artikli lühike sisu...        Loe edasi│
└────────────────────────────────────────┘
```

Iga uus Reacti mõiste lahendab selles rakenduses konkreetse probleemi:

- komponendid jagavad kasutajaliidese väiksemateks osadeks;
- props edastab komponentidele andmeid;
- state säilitab kasutamise ajal muutuvaid andmeid;
- API annab rakendusele artiklid ja autorid;
- Router seob rakenduse vaated URL-idega.

## Probleem: DOM-i käsitsi uuendamine

Vaata tavalise JavaScriptiga loodud loendurit:

```html
<p id="count">Vajutusi: 0</p>
<button id="increase">Suurenda</button>
```

```js
let count = 0;

const countElement = document.querySelector("#count");
const increaseButton = document.querySelector("#increase");

increaseButton.addEventListener("click", () => {
  count = count + 1;
  countElement.textContent = `Vajutusi: ${count}`;
});
```

Nupuvajutus muudab kahte asja:

1. JavaScripti muutuja `count` saab uue väärtuse.
2. DOM-is oleva lõigu tekst asendatakse.

Kui nupp peab kümne vajutuse järel muutuma mitteaktiivseks, lisandub veel üks DOM-i uuendus:

```js
if (count >= 10) {
  increaseButton.disabled = true;
}
```

Kui samast väärtusest sõltuvad ka teade ja edenemisriba, peab sündmuse töötleja kõiki neid elemente uuendama. Mõne käsu unustamisel ei vasta ekraan enam rakenduse andmetele.

::: tip Põhimõte
Mida rohkem kasutajaliidese osi sõltub samadest andmetest, seda raskem on neid käsitsi kooskõlas hoida.
:::

## Imperatiivne ja deklaratiivne lähenemine

Imperatiivses koodis kirjeldame sammud, millega vana kasutajaliides uueks muuta:

```js
countElement.textContent = `Vajutusi: ${count}`;
increaseButton.disabled = count >= 10;
```

Deklaratiivses koodis kirjeldame, milline kasutajaliides vastab praegusele väärtusele:

```jsx
<p>Vajutusi: {count}</p>
<button disabled={count >= 10}>Suurenda</button>
```

Reacti komponendis võib terve loendur välja näha nii:

```jsx
import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
  }

  return (
    <>
      <p>Vajutusi: {count}</p>
      <button onClick={handleClick} disabled={count >= 10}>
        Suurenda
      </button>
    </>
  );
}
```

Selle näite täielikku süntaksit ei pea veel meelde jätma. Praegu jälgi seost väärtuse `count` ja kuvatava tulemuse vahel.

```text
Praegune state
      ↓
Komponendi funktsioon
      ↓
JSX kirjeldus
      ↓
Vajalikud DOM-i muudatused
```

Kui `count` muutub, käivitab React komponendi uuesti. Komponent tagastab uue JSX-i ning React rakendab brauseri DOM-is vajalikud muudatused.

## Reacti komponent

Selles kursuses kirjutame komponendid JavaScripti funktsioonidena, mis tagastavad kasutajaliidese kirjelduse JSX-ina. React võib kuvada ka näiteks teksti või `null` väärtuse; JSX on meie tavapärane kirjutamisviis.

```jsx
function PostCard() {
  return (
    <article>
      <h2>Minu esimene artikkel</h2>
      <p>Artikli lühike sisu</p>
      <button>Loe edasi</button>
    </article>
  );
}
```

Komponenti saab kasutada teise komponendi JSX-is:

```jsx
function App() {
  return (
    <main>
      <h1>Artiklid</h1>
      <PostCard />
      <PostCard />
      <PostCard />
    </main>
  );
}
```

Komponendi nimi algab suure tähega. Nii saab React eristada meie komponente HTML-elementidest:

```jsx
<>
  <article>HTML-element</article>
  <PostCard />
</>
```

Iga `<PostCard />` loob komponendist uue eksemplari. Praegu kuvavad kõik kolm sama sisu. Hiljem anname neile props'i abil erinevad andmed.

## Komponentide puu

Komponendid kasutavad üksteist ja moodustavad puu:

```text
App
├── Navigation
├── SearchForm
├── PostList
│   ├── PostCard
│   ├── PostCard
│   └── PostCard
└── Footer
```

Komponendi piir on tavaliselt põhjendatud, kui kasutajaliidese osa:

- kordub mitmes kohas;
- täidab ühte selget ülesannet;
- muutub teistest osadest sõltumatult;
- oleks suure komponendi sees raske mõista.

Komponentideks jagamisel ei ole alati ainult üks õige lahendus. Oluline on osata oma jaotust põhjendada.

## Ühe lehe rakendus ehk SPA

Kataloogi loend ja detailvaade võivad vahetuda sama HTML-dokumendi sees. React Router seob need URL-idega ning kasutab brauseri ajalugu. Rakendusel saab olla mitu aadressi, kuigi brauser ei laadi iga sisemise navigeerimisega uut dokumenti.

React ei kohusta kasutama SPA-d. Selles kursuses valime selle, et õppida brauseris töötava Reacti andmevoogu. Serverrenderdust ja Reacti raamistikke käsitleme kursuse lõpus edasiste õppimissuundadena.

## Praktiline ülesanne

Jaga järgmine vaade komponentideks:

```text
┌─────────────────────────────────────────────┐
│ Logo        Avaleht  Artiklid  Info         │
├─────────────────────────────────────────────┤
│ Artiklid                                    │
│ [ Otsi pealkirja järgi... ]  [ Kõik autorid]│
│                                             │
│ ┌─────────────────────────────────────────┐ │
│ │ Pealkiri                                │ │
│ │ Autor: Mari                             │ │
│ │ Artikli lühike sisu...       Loe edasi  │ │
│ └─────────────────────────────────────────┘ │
│                                             │
│ ┌─────────────────────────────────────────┐ │
│ │ Teine pealkiri                          │ │
│ │ Autor: Jüri                             │ │
│ │ Artikli lühike sisu...       Loe edasi  │ │
│ └─────────────────────────────────────────┘ │
├─────────────────────────────────────────────┤
│ Kursuse näidisrakendus                      │
└─────────────────────────────────────────────┘
```

### Nõuded

1. Joonista või kirjuta vähemalt viiest komponendist koosnev komponentide puu.
2. Märgi, milline komponent kordub.
3. Kirjuta iga komponendi juurde üks lühike vastutus.
4. Põhjenda vähemalt ühe komponendi piiri.

Näiteks vastutus ei peaks olema lihtsalt „näitab asju”. Täpsem kirjeldus oleks „kuvab ühe artikli pealkirja, autori ja lühikese sisu”.

## Kontrolli tulemust

Töö on valmis, kui:

- puu juureks on kogu rakendust esindav komponent;
- vanem- ja alamkomponentide suhted vastavad ekraanil nähtavale struktuurile;
- korduvad artiklikaardid kasutavad sama komponendi nime;
- iga komponendi vastutus on ühe lausega kirjeldatud;
- oskad vähemalt ühte oma otsust suuliselt põhjendada.

<details>
<summary>Vihje 1: leia suuremad alad</summary>

Alusta navigatsioonist, põhisisust ja jalusest. Seejärel jaga põhisisu väiksemateks osadeks.

</details>

<details>
<summary>Vihje 2: leia korduv osa</summary>

Mõlemal artiklil on sama ülesehitus. Need võiksid olla ühe komponendi erinevad eksemplarid.

</details>

<details>
<summary>Üks võimalik komponentide puu</summary>

```text
App
├── Navigation
├── PostsPage
│   ├── SearchForm
│   └── PostList
│       ├── PostCard
│       └── PostCard
└── Footer
```

See on üks võimalik jaotus, mitte ainus õige lahendus.

</details>

## Mõtesta

- Mis võib juhtuda, kui kogu rakenduse JSX asub ühes väga suures komponendis?
- Millal oleks ühe komponendi jagamine väiksemateks komponentideks ebavajalik?
- Miks ei piisa Reacti õppimisel ainult JSX-i süntaksi kopeerimisest?

## Laiendus

Joonista sama rakenduse artikli detailvaade. Märgi, millised komponendid on loendivaatega ühised. Põhjenda, miks detaillehe aadress peaks sisaldama artikli ID-d.

## Kokkuvõte

- React aitab hoida kasutajaliidese rakenduse andmetega kooskõlas.
- Deklaratiivne kood kirjeldab praegustele andmetele vastavat vaadet.
- Reacti komponent on JSX-i tagastav JavaScripti funktsioon.
- Komponendid moodustavad vanem- ja alamkomponentide puu.
- Hea komponent täidab selget ülesannet ning selle piiri saab põhjendada.

Järgmisel kohtumisel loome Vite abil esimese Reacti projekti ja uurime, kuidas `index.html`, `main.jsx` ning `App.jsx` omavahel seotud on.

## Allikad

- [React Quick Start](https://react.dev/learn) — Reacti põhikontseptsioonide ametlik ülevaade.
- [Your First Component](https://react.dev/learn/your-first-component) — komponentide loomine ja kasutamine.
- [Thinking in React](https://react.dev/learn/thinking-in-react) — kasutajaliidese jagamine komponentideks.
