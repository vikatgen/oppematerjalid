---
title: Dünaamilised marsruudid
description: Seo URL-is olev ID API päringu ja detailvaatega.
outline: deep
---

# 12. Dünaamilised marsruudid

::: info Õpiväljund
Lood URL-i parameetriga detailvaate, mis eristab vigast ID-d, puuduvat artiklit ja päringu viga.
:::

## Eeldused ja kiire algus

Jätka 11. kohtumise projektis. Kestus 90 minutit: 10 min kordamine, 20 min selgitus, 20 min demo, 30 min detailvaate praktika, 10 min kontroll.

Artikli link peab avanema ka siis, kui kasutaja kopeerib aadressi uude vahelehte. Ainult eelmise lehe mälus hoitud valitud artikkel selleks ei sobi.

## URL-i parameeter

Lisa Routes sisse marsruut:

```jsx
<Route path="/posts/:postId" element={<PostDetailsPage />} />
```

Lisa PostCardi pealkirjale Link, pärast selle importimist:

```jsx
<h2><Link to={"/posts/" + post.id}>{post.title}</Link></h2>
```

Loo `src/pages/PostDetailsPage.jsx`:

```jsx
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";

export default function PostDetailsPage() {
  const { postId } = useParams();
  const validId = /^[1-9]\d*$/.test(postId ?? "");
  const [result, setResult] = useState({
    id: null, status: "loading", post: null, error: "",
  });

  useEffect(() => {
    if (!validId) return;
    const controller = new AbortController();
    let active = true;
    setResult({ id: postId, status: "loading", post: null, error: "" });

    async function load() {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/posts/" + postId,
          { signal: controller.signal }
        );
        if (response.status === 404) {
          if (active) setResult({ id: postId, status: "not-found", post: null, error: "" });
          return;
        }
        if (!response.ok) throw new Error("HTTP " + response.status);
        const post = await response.json();
        if (post.id !== Number(postId) || typeof post.title !== "string" ||
            typeof post.body !== "string" || !Number.isInteger(post.userId)) {
          throw new Error("Artikli andmed on vigased.");
        }
        if (active) setResult({ id: postId, status: "success", post, error: "" });
      } catch (error) {
        if (active && error.name !== "AbortError") {
          setResult({ id: postId, status: "error", post: null, error: error.message });
        }
      }
    }

    load();
    return () => { active = false; controller.abort(); };
  }, [postId, validId]);

  if (!validId) return <p>Artikli ID peab olema positiivne täisarv.</p>;
  if (result.id !== postId || result.status === "loading") {
    return <p role="status">Laadin artiklit…</p>;
  }
  if (result.status === "not-found") return <p>Sellist artiklit ei leitud.</p>;
  if (result.status === "error") return <p role="alert">{result.error}</p>;

  return (
    <article>
      <h1>{result.post.title}</h1>
      <p>{result.post.body}</p>
      <Link to={"/users/" + result.post.userId}>Vaata autorit</Link>
      <p><Link to="/posts">Tagasi artiklite juurde</Link></p>
    </article>
  );
}
```

`useParams` väärtus on string. API ID-ga võrdlemiseks kasutame `Number(postId)`. Kui URL muutub, võib sama lehekomponent alles jääda: seetõttu sõltub efekt `postId` väärtusest.

`result.id` seob vastuse päringuga. Enne uue efekti tööle hakkamist ei kuva me vana artiklit uue aadressi all. Cleanup kaitseb ka aeglase vana vastuse eest.

## Ühine paigutus ja Outlet

Kui mitu marsruuti jagavad sama ümbrist, sobib paigutusmarsruut. Loo `Layout`, mis kuvab navigatsiooni, lemmikute arvu ja `<main><Outlet /></main>`. Impordi Outlet paketist `react-router`.

Seejärel asenda lamedad Routes ühise paigutusega:

```jsx
<Routes>
  <Route element={<Layout favoriteCount={favoriteIds.length} />}>
    <Route index element={<HomePage />} />
    <Route path="posts" element={<PostsPage favoriteIds={favoriteIds} onToggle={toggleFavorite} />} />
    <Route path="posts/:postId" element={<PostDetailsPage />} />
    <Route path="users/:userId" element={<UserDetailsPage />} />
    <Route path="about" element={<AboutPage />} />
    <Route path="*" element={<NotFoundPage />} />
  </Route>
</Routes>
```

Appis säilib state, Layoutis asub ühine JSX, Outlet näitab sobivat alamlehte. Impordi iga nimetatud komponent. Ära jäta korraga alles vana ja uut navigatsiooni.

## Praktiline ülesanne

Loo artikli detailvaade ning selle järgi autori detailvaade aadressile `/users/:userId`. Autorilt kuva `name`, `username` ja `email`; lisa tagasi artiklite link. Kohanda vastuse kontroll autorile sobivaks. Siis eralda ühine Layout.

## Kontrolli tulemust

Proovi otse aadresse `/posts/1`, `/posts/2`, `/posts/abc`, `/posts/999999` ja `/users/1`. Värskenda detaililehte. Aeglase ühendusega kiiresti artiklit vahetades ei tohi eelmise artikli vastus viimast asendada.

::: details Vihje: marsruut sobib, aga leht on tühi
Kontrolli Layoutis `Outlet` olemasolu. See on koht, kus React Router kuvab alamlehe.
:::

## Mõtesta

Miks kuulub ID URL-i, aga mitte ainult Appi state'i? Mille poolest erineb tundmatu marsruut puuduvast API artiklist?

## Laiendus

Uuri `useSearchParams` abil otsingut `/posts?q=react`. Hoia URL otsinguteksti ainsa tõeallikana. Ära sünkrooni kahte eraldi query state'i efektidega.

## Kokkuvõte

URL-i parameeter valib andmed. Parameetri muutus vajab uut päringut. Layout ja Outlet jagavad paigutust. Vale URL ja puuduv ressurss on erinevad vead.

## Allikad

- [React Router Routing](https://reactrouter.com/start/declarative/routing) — dünaamilised segmendid ja Outlet.
- [useParams](https://reactrouter.com/api/hooks/useParams) — parameetrite lugemine.

