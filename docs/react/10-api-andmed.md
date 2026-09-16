---
title: API-andmed
description: Laadi artiklid API-st ning halda laadimist, vigu ja aegunud vastuseid.
outline: deep
---

# 10. API-andmed

::: info Õpiväljund
Asendad kohaliku artikliloendi API päringuga ning kontrollid laadimise, vea, tühja ja eduka tulemuse vaadet.
:::

## Eeldused ja kiire algus

Vajad 9. kohtumise projekti ja internetiühendust. Kestus 90 minutit, rütm 10/20/20/30/10. Korda vajadusel [fetch'i](/javascript/brauser/asunkroonsus/fetch).

JSONPlaceholder on valmis avalik test-API. Backend'i selles kursuses ei ehita. API tagastab JSON-i, React muudab selle kasutajaliideseks.

## Päringu leping

| Päring | Tulemus |
|---|---|
| GET /posts | Artiklite massiiv |
| GET /posts/1 | Üks artikkel |
| GET /users/1 | Üks autor |
| POST /posts | Simuleeritud lisamise vastus |

Baasaadress on `https://jsonplaceholder.typicode.com`. Artiklil on `id`, `userId`, `title` ja `body`. Uuri vastust Network-paneelis. JSON-andmed ei ole sama asi mis serveri HTML-leht.

## Laadimisloogika

Eemalda Appist kohaliku `posts` andmefaili import. Lisa järgmine olek ja efekt enne varajasi tagastusi. Säilita olemasolevad lemmikute ja otsingu state'id.

```jsx
const [request, setRequest] = useState({
  status: "loading",
  data: [],
  error: "",
});
const [attempt, setAttempt] = useState(0);

useEffect(() => {
  const controller = new AbortController();
  let active = true;
  setRequest({ status: "loading", data: [], error: "" });

  async function loadPosts() {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts",
        { signal: controller.signal }
      );
      if (!response.ok) throw new Error("HTTP " + response.status);
      const data = await response.json();
      const valid = Array.isArray(data) && data.every(post =>
        Number.isInteger(post.id) &&
        Number.isInteger(post.userId) &&
        typeof post.title === "string" &&
        typeof post.body === "string"
      );
      if (!valid) throw new Error("API vastuse kuju on vigane.");
      if (active) setRequest({ status: "success", data, error: "" });
    } catch (error) {
      if (active && error.name !== "AbortError") {
        setRequest({ status: "error", data: [], error: error.message });
      }
    }
  }

  loadPosts();
  return () => {
    active = false;
    controller.abort();
  };
}, [attempt]);

const posts = request.data;
```

Üks olekuobjekt hoiab staatuse ja temaga seotud andmed koos. Nii ei näita me kogemata korraga edukat tulemust ja varasemat viga.

## fetch ei viska iga HTTP vea korral erindit

404 või 500 vastus võib `fetch` jaoks olla edukalt vastu võetud HTTP vastus. Kontrollime ise `response.ok`. Võrguviga võib päringu tagasi lükata. Ka `response.json()` võib ebaõnnestuda, kui vastus pole JSON.

Cleanup takistab vana päringu tulemusel uut vaadet üle kirjutamast. Veaolek peab rääkima kasutajale, mida ta saab teha; Console ja Network aitavad arendajat põhjuse leidmisel.

Lisa kõikide Hookide järel, kuid enne tavapärast JSX-i:

```jsx
if (request.status === "loading") {
  return <main><p role="status">Laadin artikleid…</p></main>;
}
if (request.status === "error") {
  return (
    <main>
      <p role="alert">Artikleid ei õnnestunud laadida: {request.error}</p>
      <button onClick={() => setAttempt(value => value + 1)}>
        Proovi uuesti
      </button>
    </main>
  );
}
```

Eduka vastuse järel töötab senine `visiblePosts` arvutus. Tühi edukas massiiv ja päringu viga on erinevad olukorrad. 11. tunnis tõstame päringu eraldi lehekomponenti, et navigatsioon jääks laadimisel alles.

## API ohutus ja võrgu kasutamine

Avalik test-API ei vaja salajast võtit. Brauseri kood ja sinna lisatud `VITE_*` väärtused on kasutajale nähtavad. Saladusi vajava teenuse puhul on tarvis sobivat serveripoolset lahendust.

CORS on serveri ja brauseri päritolureegel. `mode: "no-cors"` ei anna loetavat JSON-vastust ega paranda API konfiguratsiooni.

Praegu filtreerime laaditud loendit brauseris. Tootmises võib suur andmestik vajada serveriotsingut ja lehekülgede kaupa laadimist.

## Praktiline ülesanne

Asenda artiklid API-andmetega. Säilita otsing ja lemmikud. Lisa uuesti proovimise nupp. Kontrolli allolevad olukorrad ja kirjuta tulemused README-sse.

| Katse | Oodatav tulemus |
|---|---|
| Network: aeglane ühendus, värskendus | Laadimisteade |
| Network: Offline, värskendus | Veateade |
| Online tagasi, „Proovi uuesti” | Artiklid ilmuvad |
| Ajutiselt vale endpoint | HTTP vea käsitlemine |
| Edukas tühi massiiv | Tühja loendi teade |

Tühja massiivi katseks võib õpetaja ajutiselt kasutada aadressi `/posts?userId=9999`. Taasta pärast õige endpoint. Kui teenus on maas, saab kasutajaliidese harjutamist jätkata kohaliku andmefailiga; päringute kontroll jääb eraldi teha.

::: details Vihje: vastus on HTML
Kontrolli Network-paneelis täielikku Request URL-i. Suhteline `/posts` võib saata päringu sinu Vite'i serverile, mitte JSONPlaceholderisse.
:::

## Mõtesta

Miks ei näita tühi ekraan, kas päring veel laeb või ebaõnnestus? Miks kontrollime API andmete kuju isegi tuntud teenuse korral?

## Laiendus: POST-päring

Muuda mustandivormi `handleSubmit` asünkroonseks. Pärast valideerimist saada:

```js
const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ title: title.trim(), body: body.trim(), userId: 1 }),
});
if (!response.ok) throw new Error("HTTP " + response.status);
const created = await response.json();
```

`body` on 7. tunni tekstiala state. Pane päring `try/catch/finally` plokki, lisa `isSubmitting`, keela korduv saatmine ja kuva õnnestumine. JSONPlaceholder ei salvesta muudatust püsivalt. Selle vastuse ID-d ei sobi kasutada mitme kohapeal lisatud artikli unikaalse võtmena.

## Kokkuvõte

Päringu olek kuulub kasutajaliidesse. Kontrolli HTTP vastust ja andmekuju. Cleanup väldib aegunud tulemust. POST on kasutaja tegevus, mitte renderdusefekt.

## Allikad

- [JSONPlaceholder Guide](https://jsonplaceholder.typicode.com/guide/) — päringud ja salvestamise piirang.
- [MDN: Using Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch) — vastus, katkestamine ja vead.

