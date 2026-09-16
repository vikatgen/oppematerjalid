---
title: Props ja kompositsioon
description: Edasta artikli andmed komponendile ning koosta ühiseid paigutusi.
outline: deep
---

# 4. Props ja kompositsioon

::: info Õpiväljund
Kasutad ühte komponenditüüpi erinevate andmetega ja põhjendad selle sisendite valikut.
:::

## Eeldused ja kiire algus

Ava 3. kohtumise projekt ja käivita `npm run dev`. Vajad objektide ning funktsiooni parameetrite tundmist. Kestus 90 minutit, rütm 10/20/20/30/10.

Meil on mitu artiklikaarti, kuid need näitavad sama teksti. Kopeerimise asemel eraldame kaardi ülesehituse selle andmetest.

## Props on komponendi sisend

Loo `src/data/posts.js`:

```js
export const posts = [
  { id: 1, userId: 1, title: "Reacti komponendid", body: "Komponent kirjeldab osa vaatest." },
  { id: 2, userId: 2, title: "Andmed rakenduses", body: "Andmed liiguvad vanemalt lapsele." },
  { id: 3, userId: 1, title: "API kasutamine", body: "Server vastab päringule JSON-iga." },
];
```

Hoiame samad väljad, mida hiljem kasutab test-API. Alguses pole vaja võrguühendust, et kasutajaliidest arendada.

Asenda `src/components/PostCard.jsx`:

```jsx
export default function PostCard({ post }) {
  return (
    <article className="post-card">
      <h2>{post.title}</h2>
      <p>{post.body}</p>
      <small>Autor nr {post.userId}</small>
    </article>
  );
}
```

`{ post }` funktsiooni parameetris on objekti lahtipakkimine ehk destructuring. See on JavaScript, mitte Reacti erisüntaks.

`App.jsx` impordib `posts` ja kasutab kaarte:

```jsx
<PostCard post={posts[0]} />
<PostCard post={posts[1]} />
```

Need read asendavad varasemad `<PostCard />` read. Komponent vajab nüüd alati `post` objekti.

## Ühesuunaline andmevoog

Vanem annab lapsele props'i. Laps loeb seda sisendina. Ära kirjuta lapse sees `post.title = "Uus"`: see muudaks vanema antud objekti salaja.

Kui laps peab tulevikus teatama kasutaja tegevusest, annab vanem talle callback-funktsiooni. Seda kasutame ühise state'i tunnis.

Vali komponendi sisendid tema vastutuse järgi. Artikli kaart võib vajada tervet artiklit, kuid ainult autori nime näitav komponent ei vaja kogu API vastust.

## Kompositsioon ja children

Mõnikord kordub ümbris, mitte selle sisu. Loo `src/components/Panel.jsx`:

```jsx
export default function Panel({ title, children }) {
  return (
    <section>
      <h2>{title}</h2>
      <div>{children}</div>
    </section>
  );
}
```

Kasutamine pärast importi:

```jsx
<Panel title="Kataloogi info">
  <p>Siin on tarkvaraarenduse õppetekstid.</p>
</Panel>
```

`children` on komponendi märgendite vahele antud sisu. Nii saab sama ümbris sisaldada teksti, pilti või teisi komponente.

## Praktiline ülesanne

1. Lisa `App` kaudu kõik kolm näidisartiklit.
2. Lisa `Header` komponendile `title` prop.
3. Kasuta `Panel` komponenti kursuse info jaoks.
4. Muuda andmefailis ainult teise artikli pealkiri ning jälgi tulemust.

## Kontrolli tulemust

Kaartide tekstid erinevad, kaardi kood on endiselt ühes failis ja andmefaili muudatus jõuab õigesse kaarti. Kaardid ei muuda props'i. Build õnnestub. Tee commit.

::: details Vihje: Cannot read properties of undefined
Kontrolli kõiki `PostCard` kasutuskohti. Kas igaüks saab `post` prop'i? Kas import on nimega `{ posts }`?
:::

## Mõtesta

Miks ei sobi igale artiklile oma komponent `FirstPost`, `SecondPost`? Millal on `children` mugavam kui mitu eri sisuprop'i?

## Laiendus

Lisa valikuline `subtitle` Headerile. Mõtle, kuidas vältida tühja alapealkirja kuvamist; tingimuslikku JSX-i õpime 6. kohtumisel.

## Kokkuvõte

Props muudab komponendi taaskasutatavaks. Andmed liiguvad vanemalt lapsele. Kompositsioon ühendab väiksemad komponendid suuremaks vaateks.

## Allikad

- [Passing Props to a Component](https://react.dev/learn/passing-props-to-a-component) — sisendandmed ja children.

