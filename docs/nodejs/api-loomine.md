---
title: Lihtsa API loomine
description: Koosta Node.js HTTP-serverile marsruudid, mis tagastavad JSON-andmeid ja sobivaid staatusekoode.
outline: deep
---

# Lihtsa API loomine

::: info Õpiväljund
Pärast õppetundi oskad koostada lihtsa JSON API, mis eristab päringu meetodit ja teed ning tagastab sobiva staatusekoodi.
:::

API lubab programmidel omavahel suhelda kokkulepitud kujul. Meie API vastab HTTP-päringutele JSON-andmetega.

Enne alustamist vaata üle [meetodid ja staatusekoodid](/veeb/meetodid-ja-staatusekoodid).

## Marsruut

**Marsruut** ühendab meetodi ja tee programmi tegevusega:

```text
GET /products       -> tagasta kõik tooted
GET /products/1     -> tagasta üks toode
POST /products      -> loo uus toode
```

Selles tunnis loome esmalt kaks `GET` marsruuti.

```js
import { createServer } from "node:http";

const products = [
  { id: 1, title: "Klaviatuur", price: 49.9 },
  { id: 2, title: "Hiir", price: 24.9 }
];

function sendJson(response, statusCode, data) {
  response.statusCode = statusCode;
  response.setHeader("Content-Type", "application/json; charset=utf-8");
  response.end(JSON.stringify(data));
}

const server = createServer((request, response) => {
  if (request.method === "GET" && request.url === "/products") {
    sendJson(response, 200, products);
    return;
  }

  if (request.method === "GET" && request.url === "/health") {
    sendJson(response, 200, { status: "ok" });
    return;
  }

  sendJson(response, 404, { error: "Marsruuti ei leitud" });
});

server.listen(3000);
```

## Miks kontrollida nii meetodit kui teed?

`GET /products` ja `POST /products` võivad kasutada sama teed, kuid tähendada erinevaid tegevusi. Kui kontrollid ainult URL-i, ei suuda server neid eristada.

## Ühe toote otsimine

```js
const url = new URL(request.url, "http://localhost");
const match = url.pathname.match(/^\/products\/(\d+)$/);

if (request.method === "GET" && match) {
  const id = Number(match[1]);
  const product = products.find((item) => item.id === id);

  if (!product) {
    sendJson(response, 404, { error: "Toodet ei leitud" });
    return;
  }

  sendJson(response, 200, product);
  return;
}
```

Siin aitab [`URL`](/javascript/toovahendid/url) eraldada päringu tee muudest URL-i osadest.

## Praktiline ülesanne: toodete API

Lisa API-le:

- `GET /products`, mis tagastab kõik tooted;
- `GET /products/:id`, mis tagastab ühe toote;
- tundmatu marsruudi jaoks `404` vastus;
- vigase ID jaoks arusaadav veavastus.

Kontrolli päringuid brauseri Network-paneelis või mõne API kliendiga.

Kontrollitav tulemus: iga katse annab põhjendatud staatusekoodi, JSON-keha ja õige `Content-Type` päise.

::: details Aruteluküsimus
Miks ei piisa sellest, et API tagastab igas olukorras `200`?

Klient kasutab staatusekoodi otsustamiseks, kas tegevus õnnestus ja millist veaolekut näidata. `200` koos veatekstiga peidab päringu tegeliku tulemuse.
:::

## Kontrollpunkt

- Millest koosneb marsruut?
- Millal sobib `404`?
- Miks on JSON-i saatmisel vaja `Content-Type` päist?

Järgmisena: [Express ja middleware](/nodejs/express).

## Allikad

- [MDN: HTTP response status codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status)
- [Node.js: URL](https://nodejs.org/api/url.html)
