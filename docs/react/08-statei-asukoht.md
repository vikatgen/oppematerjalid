---
title: State’i asukoht
description: Jaga lemmikute olekut komponentide vahel ilma andmeid dubleerimata.
outline: deep
---

# 8. State’i asukoht

::: info Õpiväljund
Paigutad ühise oleku lähimasse sobivasse vanemkomponenti ja edastad muudatused callback'idega.
:::

## Eeldused ja kiire algus

Vajad 7. kohtumise projekti. Kestus 90 minutit, rütm 10/20/20/30/10.

Kaardi lokaalne lemmik toimib, kuid Header ei tea lemmikute arvu. Filtreerimisel eemaldatud kaart kaotab ka oma mälu. Viime lemmikute identifikaatorid ühisesse vanemasse.

## Üks tõeallikas

Lisa `App` komponendi algusesse:

```js
const [favoriteIds, setFavoriteIds] = useState([]);

function toggleFavorite(id) {
  setFavoriteIds(previous =>
    previous.includes(id)
      ? previous.filter(itemId => itemId !== id)
      : [...previous, id]
  );
}
```

Massiivi koopia ja `filter` annavad uue väärtuse. Ära tee `favoriteIds.push(id)` ega anna setterile tagasi muudetud sama massiivi.

Lemmikute arv on `favoriteIds.length`. Selle jaoks eraldi state'i pole vaja. Ka `visiblePosts` jääb renderduse ajal arvutatuks.

## Andmed alla, tegevus callback'iga üles

Muuda `PostCard` sisendit ja eemalda sealt kohalik `useState`:

```jsx
export default function PostCard({ post, isFavorite, onToggle }) {
  return (
    <article className="post-card">
      <h2>{post.title}</h2>
      <p>{post.body}</p>
      <button
        type="button"
        aria-pressed={isFavorite}
        onClick={() => onToggle(post.id)}
      >
        {isFavorite ? "Eemalda lemmikutest" : "Lisa lemmikuks"}
      </button>
    </article>
  );
}
```

`PostList` võtab nüüd vastu `posts, favoriteIds, onToggle`. Selle map'i sees edasta:

```jsx
<PostCard
  post={post}
  isFavorite={favoriteIds.includes(post.id)}
  onToggle={onToggle}
/>
```

Appis kasuta:

```jsx
<p>Lemmikuid: {favoriteIds.length}</p>
<PostList
  posts={visiblePosts}
  favoriteIds={favoriteIds}
  onToggle={toggleFavorite}
/>
```

Laps ei muuda vanema state'i otse. Ta kutsub vanema antud funktsiooni; vanem otsustab muudatuse.

## Milline väärtus kuulub kuhu?

| Väärtus | Asukoht | Põhjus |
|---|---|---|
| query | Otsingu ja tulemuste ühine vanem | Mõlemad sõltuvad sellest |
| favoriteIds | App | Loendur ja mitu kaarti kasutavad seda |
| visiblePosts | Arvutus renderduses | Tuleb artiklitest ja filtritest |
| mustandi title | PostDraftForm | Vajalik ainult mustandis |

Ära tõsta iga vormitähe state'i rakenduse juure. Hoia olek võimalikult lähedal selle kasutajatele. Context aitab sügavas puus andmeid edasi anda, aga ei otsusta sinu eest, millised andmed peaksid ühised olema.

## Objektide muutmine

Kui hiljem muudad ühte artiklit state'is, loo uus massiiv ja muudetud artiklist uus objekt:

```js
const updatedPosts = posts.map(post =>
  post.id === 2 ? { ...post, title: "Uus pealkiri" } : post
);
```

See on näide uue väärtuse arvutamisest. State'i uuendamiseks kasuta seda vastava setteriga. Ülejäänud artiklid võivad säilitada sama viite.

## Praktiline ülesanne

1. Tõsta lemmikud Appi.
2. Näita lemmikute arvu Headeris uue prop'i kaudu.
3. Lisa „Ainult lemmikud” märkeruut ja ühenda see pealkirjaotsinguga.
4. Eemalda enam mittevajalik Headeri harjutusloendur.
5. Joonista ühe lemmikunupu klõpsu andmevoog.

## Kontrolli tulemust

Märgi artikkel lemmikuks, peida see otsinguga ja too tagasi. Valik on alles. Arv väheneb lemmiku eemaldamisel. Tühjade lemmikute filter annab tühja teate. Värskendamisel kaob olek veel ootuspäraselt.

::: details Vihje: Header ja kaart näitavad erinevat tulemust
Kontrolli, kas sul on kaks eraldi lemmikute state'i. Ühest väärtusest tuleb arvutada nii loendur kui ka kaardi nupu olek.
:::

## Mõtesta

Miks ei tasu hoida eraldi `favoriteCount` state'i? Milline viga tekib, kui API artikli ID on arv, kuid URL-ist tulnud ID jääb stringiks?

## Laiendus

Eralda otsinguväljad `SearchForm` komponendiks. Anna neile väärtused ja muutmise callback'id props'ina.

## Kokkuvõte

Jagatud olek kuulub ühisele vanemale. Props edastab väärtused ja callback'id tegevused. Tuletatud väärtus ei vaja uut state'i.

## Allikad

- [Sharing State Between Components](https://react.dev/learn/sharing-state-between-components) — ühise vanema valimine.
- [Updating Arrays in State](https://react.dev/learn/updating-arrays-in-state) — massiivide muutmatus.

