---
title: Efektid
description: Sünkrooni React välise süsteemiga ning puhasta loodud ühendused.
outline: deep
---

# 9. Efektid

::: info Õpiväljund
Kirjutad sõltuvuste ja cleanup'iga efekti ning eristad seda sündmusest ja renderduse arvutusest.
:::

## Eeldused ja kiire algus

Jätka 8. kohtumise projektis. Kestus 90 minutit: 10 min kordamine, 20 min teooria, 20 min demo, 30 min praktika, 10 min kontroll.

Efekt ühendab Reacti millegagi väljaspool Reacti: näiteks dokumendi pealkirja, salvestuse või võrgupäringuga. Efekt ei ole üldine koht „koodi käivitamiseks pärast midagi”.

## Kolm eri vastutust

| Vajadus | Sobiv koht |
|---|---|
| Arvuta otsingutulemus | Komponendi renderdus |
| Kontrolli mustandit saatmisel | onSubmit töötleja |
| Hoia brauseri pealkiri lemmikute arvuga kooskõlas | useEffect |

Lisa Appi importi `useEffect` ning enne `return` lauset:

```js
useEffect(() => {
  const previousTitle = document.title;
  document.title = "Artiklikataloog: " + favoriteIds.length + " lemmikut";

  return () => {
    document.title = previousTitle;
  };
}, [favoriteIds.length]);
```

Efekt töötab pärast Reacti muudatuste kinnitamist. Tagastatud cleanup-funktsioon eemaldab eelmise seadistuse enne muutunud sõltuvustega uut seadistust ning komponendi eemaldamisel.

## Sõltuvuste loend

- `[value]`: alguses ja pärast value muutumist.
- `[]`: selle komponendi paigaldamisel; arenduskontroll võib seadistust korrata.
- Loendita: pärast iga commit'ini jõudnud renderdust.

Lisa kõik efektis loetud reaktiivsed väärtused: props, state ja komponendi sees loodud väärtused. ESLinti sõltuvuste hoiatus aitab vältida vana väärtuse kasutamist. Ära kustuta sõltuvusi selleks, et hoiatus kaoks.

React võrdleb sõltuvusi `Object.is` abil. Igal renderdusel loodud uus objekt on uus viide ja võib efekti uuesti käivitada.

## Strict Mode ja cleanup

Arenduses teeb Strict Mode efekti jaoks täiendava seadistus–cleanup–seadistus tsükli. See aitab leida lekkeid. Topelt käivitumise tõttu Strict Mode'i eemaldamine jätaks vea varju.

Esimese ühenduse puhastamine peab jätma olukorra, kus järgmine seadistus töötab õigesti. Näiteks intervalli korral on cleanup `clearInterval(id)`, sündmusekuulaja korral `removeEventListener`.

## Esimene API päring

Uuri efekti järgmise tunni eelvaatena eraldi komponendis. Loo `src/components/ApiPreview.jsx`:

```jsx
import { useEffect, useState } from "react";

export default function ApiPreview() {
  const [message, setMessage] = useState("Laadin näidisartiklit…");

  useEffect(() => {
    const controller = new AbortController();
    let active = true;

    async function load() {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/posts/1",
          { signal: controller.signal }
        );
        if (!response.ok) throw new Error("HTTP " + response.status);
        const post = await response.json();
        if (active) setMessage(post.title);
      } catch (error) {
        if (active && error.name !== "AbortError") {
          setMessage("Artikli laadimine ebaõnnestus.");
        }
      }
    }

    load();
    return () => {
      active = false;
      controller.abort();
    };
  }, []);

  return <p role="status">{message}</p>;
}
```

Impordi see ajutiselt Appi. Efekti callback ise pole `async`: React ootab temalt cleanup-funktsiooni või puuduvat tagastusväärtust, mitte Promise'it.

Katkestamine lõpetab kliendi ootamise, kuid ei taga, et server ei saanud päringut. `active` kaitseb selle efekti aegunud tulemuse kuvamise eest.

## Praktiline ülesanne

Lisa lemmikute arvu näitav dokumendipealkiri. Proovi ApiPreview komponenti. Vaata Network-paneelis päringut ja katkestamist. Eemalda ApiPreview pärast katset Appist; järgmine tund asendab kogu kohaliku artikliloendi API-andmetega.

## Kontrolli tulemust

Pealkiri muutub lemmiku lisamisel. API näide kuvab pealkirja või veateate. Console'is pole käsitlemata Promise-vigu. Oskad nimetada, millist välist süsteemi iga efekt puudutab.

::: details Vihje: lõputu efekt
Kas efekt muudab state'i, mis on tema sõltuvus? Kas sõltuvuses olev objekt luuakse iga renderduse ajal uuesti? Otsingu filtreerimiseks pole efekti vaja.
:::

## Mõtesta

Miks peab ostu või uue artikli saatmine lähtuma kasutaja sündmusest? Miks võib renderduse ajal alustatud fetch käivituda korduvalt?

## Laiendus

Lisa sekundiloendur koos `setInterval` ja cleanup'iga. Eemalda komponent vaatest ning kontrolli, et intervall enam ei jätku.

## Kokkuvõte

Efekt sünkroonib välise süsteemiga. Sõltuvused kirjeldavad kasutatud väärtusi. Cleanup lõpetab eelmise ühenduse. Tuletatud andmed arvuta renderduses.

## Allikad

- [Synchronizing with Effects](https://react.dev/learn/synchronizing-with-effects) — sõltuvused ja cleanup.
- [You Might Not Need an Effect](https://react.dev/learn/you-might-not-need-an-effect) — üleliigsete efektide vältimine.

