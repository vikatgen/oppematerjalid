---
title: Loendid ja tingimused
description: Muuda artiklite massiiv vaateks ning säilita elementide identiteet.
outline: deep
---

# 6. Loendid ja tingimused

::: info Õpiväljund
Kuvad massiivist artiklite loendi ja valid andmete põhjal sobiva tühja või täidetud vaate.
:::

## Eeldused ja kiire algus

Jätka 5. kohtumise projektis. Korda vajadusel [massiivimeetodeid](/javascript/lisalugemine/massiivimeetodid-ja-callbackid). Kestus 90 minutit, rütm 10/20/20/30/10.

Kolm käsitsi kirjutatud `PostCard` rida töötavad, aga API võib tagastada sada artiklit. Kasutajaliidese pikkus peab tulema andmetest.

## map teisendab andmed elementideks

Loo `src/components/PostList.jsx`:

```jsx
import PostCard from "./PostCard.jsx";

export default function PostList({ posts }) {
  if (posts.length === 0) {
    return <p>Artikleid ei leitud.</p>;
  }

  return (
    <ul>
      {posts.map(post => (
        <li key={post.id}>
          <PostCard post={post} />
        </li>
      ))}
    </ul>
  );
}
```

`App` impordib `PostList` ning asendab käsitsi lisatud kaardid reaga `<PostList posts={posts} />`.

`map` tagastab uue massiivi. Kui callback kasutab looksulge, peab selles olema `return`. Ümarsulgudega näites tagastatakse JSX kohe.

## key tähistab sama elementi eri renderdustes

React kasutab stabiilset võtit loendi elementide kokkuviimiseks. Võti peab olema samal tasemel õdede-vendade seas unikaalne. Näites on võti välisel `li` elemendil.

Ära genereeri võtit renderduse ajal `Math.random()` abil. Uus võti tähendab Reactile uut elementi ning võib lähtestada selle state'i. Muutuvas loendis pole massiivi indeks hea artikli identiteet: pärast sortimist võib sama indeks tähistada teist artiklit.

`key` ei jõua tavalise prop'ina lapseni. Vajalik ID anna eraldi või artikli objektis.

## Tingimuslik kuvamine

Muuda lemmikunupu tekst kaardil:

```jsx
{isFavorite ? "Eemalda lemmikutest" : "Lisa lemmikuks"}
```

See on ternaarne operaator: tingimus, tõese haru tulemus, väära haru tulemus.

Ainult tõese haru puhul sobib näiteks:

```jsx
{isFavorite && <p>See artikkel on lemmik.</p>}
```

Arvuga tingimuses eelista `posts.length > 0 && ...`. Avaldis `0 && ...` annab tulemuseks nulli ning React võib kuvada ekraanile numbri 0.

## filter valib sobivad andmed

`App` sees, enne `return` lauset:

```js
const visiblePosts = posts.filter(post => post.userId === 1);
```

Anna `PostList` komponendile `visiblePosts`. Originaalmassiiv jääb alles. Kui järjestad andmeid, kasuta koopiat `[...posts].sort(...)`, sest `sort` muudab olemasolevat massiivi.

## Praktiline ülesanne

Kuva artiklid PostListi kaudu. Proovi kõiki artikleid, autori 1 artikleid ja tühja massiivi. Lisa neljas artikkel ainult andmefaili. Muuda lemmikunupu tekst arusaadavaks.

## Kontrolli tulemust

Neljas artikkel ilmub komponendi koodi muutmata. Tühi massiiv kuvab teate. Console'is pole puuduva key hoiatust. Teistsugune järjestus säilitab sama võtmega nähtavate kaartide lemmikuoleku.

::: details Vihje: massiivis on andmed, kuid leht on tühi
Kontrolli callback'i tagastusväärtust. `posts.map(post => { <PostCard /> })` tagastab iga elemendi jaoks `undefined`.
:::

## Mõtesta

Miks võib indeksivõti põhjustada vale kaardi lemmikuoleku? Kui filtreerimine eemaldab kaardi puust täielikult, kas tema lokaalne state peab alles jääma?

## Laiendus

Lisa nupp järjestuse ümberpööramiseks, hoides suunda state'is ja arvutades vaate jaoks massiivikoopia. Jälgi lemmiku püsimist.

## Kokkuvõte

Map loob vaate elemendid. Filter valib andmed. Tingimused määravad nähtava sisu. Stabiilne key aitab Reactil säilitada loendi elementide identiteeti.

## Allikad

- [Rendering Lists](https://react.dev/learn/rendering-lists) — map ja key.
- [Conditional Rendering](https://react.dev/learn/conditional-rendering) — tingimuste kirjutamine.

