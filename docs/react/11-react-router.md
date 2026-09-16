---
title: React Router
description: Lisa URL-idega seotud vaated ning ühine navigatsioon.
outline: deep
---

# 11. React Router

::: info Õpiväljund
Seadistad URL-idega seotud vaated nii, et navigatsioon ja ühine lemmikuolek säilivad lehtede vahetamisel.
:::

## Eeldused ja kiire algus

Vajad 10. kohtumise projekti. Kestus 90 minutit, rütm 10/20/20/30/10.

Paigalda React Router 7 deklaratiivse kasutuse jaoks:

```bash
npm install react-router@7
```

Selles materjalis impordime `react-router` paketist. Ära sega samas projektis eri õpetuste pakette ega erinevaid Routeri seadistusviise.

## SPA ja URL

Ühe lehe rakenduses ehk SPA-s võib brauser laadida dokumendi ühe korra ning seejärel vahetada selle sees Reacti vaateid. Router seob aadressi komponendiga ja kasutab brauseri ajalugu.

URL võimaldab detailvaadet järjehoidjasse lisada ning Back/Forward nuppe kasutada. React ise marsruute ei määra. Selles kursuses kasutame React Routerit eraldi teegina; sellel on ka laiemad andmete laadimise ja raamistikurežiimid.

Muuda `src/main.jsx`:

```jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import App from "./App.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
```

BrowserRouter peab paiknema navigatsioonist ja marsruutidest kõrgemal puus.

## Lehe vastutus ja Appi vastutus

Loo `src/pages/PostsPage.jsx`. Tõsta sinna senisest Appist:

- API päringu olek ja laadimise efekt;
- query ja filtrite state;
- nähtavate artiklite arvutus;
- laadimise, vea ja artikliloendi JSX.

Nimeta kopeeritud komponendi funktsioon ümber: `export default function PostsPage({ favoriteIds, onToggle })`. Hoia selle sees eelmisest tunnist pärinev päring, filtrid ja vaade. PostListi `onToggle` prop'ile anna nüüd samanimeline PostsPage'i sisend.

Jäta `favoriteIds`, `toggleFavorite` ja dokumendipealkirja efekt Appi. Eemalda PostsPage'ist Header ja Footer, sest need jäävad ühiseks.

Loo `HomePage.jsx` ja `AboutPage.jsx`, kumbki ühe eksporditud funktsiooniga:

```jsx
export default function HomePage() {
  return <section><h1>Artiklikataloog</h1><p>Loe ja leia artikleid.</p></section>;
}
```

AboutPage kuvab andmeallika ja test-API piirangud.

## Marsruutide kirjeldus

Appi `return` võib pärast importide ja olemasoleva state'i säilitamist välja näha nii:

```jsx
return (
  <>
    <nav aria-label="Peamenüü">
      <NavLink to="/" end>Avaleht</NavLink>{" "}
      <NavLink to="/posts">Artiklid</NavLink>{" "}
      <NavLink to="/about">Info</NavLink>
    </nav>
    <p>Lemmikuid: {favoriteIds.length}</p>
    <main>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/posts"
          element={<PostsPage favoriteIds={favoriteIds} onToggle={toggleFavorite} />}
        />
        <Route path="/about" element={<AboutPage />} />
        <Route path="*" element={<h1>Lehte ei leitud</h1>} />
      </Routes>
    </main>
  </>
);
```

Impordi `NavLink, Routes, Route` paketist `react-router` ja lehed nende failidest. PostsPage'i olekuvaadete `main` asenda `section` elemendiga, et main ei pesastuks.

`Link` sobib sisemiseks lingiks. `NavLink` annab lisaks aktiivse lingi oleku ja `aria-current` atribuudi. `end` piirab avalehe lingi täpsele vastele. Väline dokumentatsioonilink jääb tavaliseks `a` elemendiks.

## Mis säilib?

App jääb marsruudi muutmisel paigale, seega lemmikud säilivad. PostsPage eemaldatakse teisele lehele minnes; tagasi tulles alustavad tema otsing ja päring uuesti. See on praeguse paigutuse teadlik tagajärg, mitte Routeri viga.

Lisame hiljem URL-i parameetreid siis, kui valikut peab saama jagada või brauseri ajalooga taastada.

## Praktiline ülesanne

Loo kolm põhivaadet ja tundmatu aadressi vaade. Lisa navigeerimine ja nähtav aktiivse lingi stiil. Märgi artikkel lemmikuks, mine infolehele ja tule tagasi.

## Kontrolli tulemust

- URL muutub iga vaatega.
- Back ja Forward töötavad.
- Lemmikute arv säilib navigeerimisel.
- Päringu vea ajal jääb navigatsioon nähtavaks.
- Tundmatu URL kuvab oma teate.
- Igal lehel on üks main ja selge h1.

::: details Vihje: useLocation may be used only in a Router
Kontrolli `main.jsx`: BrowserRouter peab ümbritsema Appi. Ära lisa eraldi BrowserRouterit igasse lehte.
:::

## Mõtesta

Miks ei piisa mitme vaate jaoks lihtsalt `activePage` state'ist? Millises komponendis peaksid lemmikud elama, et marsruudi muutmine neid ei kustutaks?

## Laiendus

Täienda 404-vaadet sisemise lingiga tagasi artiklite juurde. Uuri Network-paneelis tavalise `a` lingi ja `Link` erinevust.

## Kokkuvõte

Router seob URL-i vaatega. Ühine state jääb marsruutidest kõrgemale. Sisemine navigatsioon kasutab Linki, aktiivne menüü NavLinki.

## Allikad

- [Declarative Installation](https://reactrouter.com/start/declarative/installation) — pakett ja BrowserRouter.
- [Routing](https://reactrouter.com/start/declarative/routing) — Routes, Route ja lingid.
