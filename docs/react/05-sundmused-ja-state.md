---
title: Sündmused ja state
description: Seo kasutaja tegevus komponendi oleku ning uue renderdusega.
outline: deep
---

# 5. Sündmused ja state

::: info Õpiväljund
Lisad artiklikaardile muutuva oleku ja selgitad ühe nupuvajutuse teekonda renderduseni.
:::

## Eeldused ja kiire algus

Jätka 4. kohtumise rakenduses. Käivita `npm run dev`. Kestus 90 minutit, rütm 10/20/20/30/10.

Soovime artikli lemmikuks märkida. Tavaline kohalik muutuja ei säili komponendi uute väljakutsete vahel ega telli Reactilt uut renderdust.

## Komponendi mälu

Asenda `PostCard.jsx`:

```jsx
import { useState } from "react";

export default function PostCard({ post }) {
  const [isFavorite, setIsFavorite] = useState(false);

  function handleToggle() {
    setIsFavorite(previous => !previous);
  }

  return (
    <article className="post-card">
      <h2>{post.title}</h2>
      <p>{post.body}</p>
      <button
        type="button"
        aria-pressed={isFavorite}
        onClick={handleToggle}
      >
        Lemmik: {String(isFavorite)}
      </button>
    </article>
  );
}
```

`useState(false)` annab hetkeväärtuse ja uuendamisfunktsiooni. `previous => !previous` arvutab järgmise väärtuse eelmisest. Igal nähtaval kaardil on praegu eraldi mälu.

`aria-pressed` annab abitehnoloogiale teada lülitusnupu oleku. Järgmisel tunnil asendame `true/false` teksti kasutajale sobivamate sõnadega.

## Sündmuse funktsioon antakse edasi

`onClick={handleToggle}` annab Reactile funktsiooni. `onClick={handleToggle()}` kutsub selle kohe renderdamise ajal välja ja võib käivitada lõputu uuendamise.

Kui on vaja argumenti, kasuta näiteks `onClick={() => handleSelect(post.id)}`. Ka siis on väärtuseks funktsioon.

## State on renderduse hetktõmmis

Proovi ajutiselt sündmuse töötlejas:

```js
setIsFavorite(previous => !previous);
console.log(isFavorite);
```

Logi näitab selle renderduse vana väärtust. Setter tellib järgmise renderduse ega kirjuta olemasolevat muutujat samas funktsioonis ümber.

Renderdus arvutab vaate. Commit-etapis rakendab React DOM-i muudatused. Brauser joonistab tulemuse ekraanile. Renderdamine ei tähenda automaatselt kogu DOM-i asendamist. Vanema renderdus võib renderdada ka lapsi.

## Hookide reeglid

Hooke kutsume komponendi või kohandatud Hooki ülemisel tasemel, enne varajasi tagastusi. Ära kutsu `useState` tsüklis, tingimuses ega nupuvajutuse funktsioonis. React vajab Hookide järjekorra püsimist.

State kuulub komponendi asukohale puus. Kui komponent eemaldatakse, kaob tema lokaalne state. Lehe värskendamine alustab rakenduse mälu uuesti.

## Praktiline ülesanne

1. Lisa kõigile artiklikaartidele lemmikunupp.
2. Kontrolli, et ühe kaardi klõpsamine ei muuda teist.
3. Lisa `Header` komponenti eraldi loendur, mis loendab oma nupu vajutusi.
4. Selgita paarilisele, miks Headeri loendur ja kaartide lemmikud on praegu eraldi.

## Kontrolli tulemust

Kaks vajutust taastavad lemmiku algse oleku. Lehe värskendamisel taastub algseis. Console'is pole lõputuid logisid ega renderdusvigu. Build õnnestub.

::: details Vihje: loendur ei suurene
Ära tee `count++`. Kasuta `setCount(previous => previous + 1)` ja näita JSX-is `count` väärtust.
:::

## Mõtesta

Miks ei piisa tavalise muutuja muutmisest? Miks ei ole setterile järgneva vana väärtuse logi tõend, et React ei tööta?

## Laiendus

Lisa ühele loendurinupule kolm järjestikust funktsionaalset uuendust. Ennusta tulemus, seejärel kontrolli. Võrdle kolme `setCount(count + 1)` väljakutsega.

## Kokkuvõte

Sündmus käivitab töötleja, setter tellib renderduse, uus state annab uue vaate. Ühe renderduse sündmusefunktsioon näeb selle renderduse väärtusi.

## Allikad

- [Responding to Events](https://react.dev/learn/responding-to-events) — sündmuste töötlejad.
- [State as a Snapshot](https://react.dev/learn/state-as-a-snapshot) — oleku hetktõmmis.
- [Queueing State Updates](https://react.dev/learn/queueing-a-series-of-state-updates) — funktsionaalsed uuendused.

