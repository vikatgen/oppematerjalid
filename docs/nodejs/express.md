---
title: Express ja middleware
description: Võrdle Node.js HTTP-moodulit Expressiga ning loo raamistikuga lihtne JSON API.
outline: deep
---

# Express ja middleware

::: info Õpiväljund
Pärast õppetundi oskad selgitada, mida Express Node.js HTTP-serverile lisab, ning koostada Expressiga lihtsa JSON API.
:::

Node.js sisseehitatud `node:http` näitas, mida server päringu ja vastusega teeb. Suurema API puhul hakkab marsruutide, kehade ja vigade käsitsi haldamine korduma.

**Express** on Node.js veebiraamistik, mis annab nende korduvate tegevuste jaoks mugavamad töövahendid.

## Projekti ettevalmistamine

```bash
npm init -y
npm install express
```

Lisa `package.json` faili `"type": "module"`.

## Sama mõte Expressiga

```js
import express from "express";

const app = express();
const products = [
  { id: 1, title: "Klaviatuur", price: 49.9 }
];

app.use(express.json());

app.get("/products", (request, response) => {
  response.json(products);
});

app.get("/products/:id", (request, response) => {
  const id = Number(request.params.id);
  const product = products.find((item) => item.id === id);

  if (!product) {
    response.status(404).json({ error: "Toodet ei leitud" });
    return;
  }

  response.json(product);
});

app.listen(3000, () => {
  console.log("API töötab: http://localhost:3000");
});
```

Express ei muuda HTTP põhimõtteid. Päringul on endiselt meetod, URL, päised ja keha ning vastusel staatusekood, päised ja keha.

## Mis on middleware?

Middleware on funktsioon, mis töötab päringu teekonnal enne lõplikku marsruuti või vastust.

```js
app.use((request, response, next) => {
  console.log(request.method, request.url);
  next();
});
```

`next()` annab töö järgmisele middleware'ile või marsruudile. Kui seda ei kutsuta ega saadeta vastust, jääb päring lõpetamata.

`express.json()` on middleware, mis loeb JSON-päringu keha ja teeb selle kättesaadavaks `request.body` kaudu.

## Praktiline ülesanne: vii API Expressile

Vii eelmise tunni toodete API Expressile ning lisa:

- päringuid logiv middleware;
- `GET /products`;
- `GET /products/:id`;
- tundmatu marsruudi `404` vastus.

Võrdle lahendust `node:http` versiooniga:

- milline korduv tegevus kadus;
- millised HTTP mõisted jäid samaks;
- millises kohas tuleb endiselt ise otsus teha.

Kontrollitav tulemus: õppija oskab Network-paneelis näidata päringut ning koodis leida selle marsruudi, middleware'i ja vastuse.

## Piirjuhud

- `request.params.id` on tekst ning vajab teisendamist;
- `next()` puudub logivast middleware'ist;
- marsruut saadab vastuse, kuid kood proovib hiljem saata teise vastuse.

## Kontrollpunkt

- Mida Express teeb mugavamaks?
- Mida middleware teeb?
- Miks oli kasulik enne Expressi õppida `node:http` serverit?

## Allikad

- [Express: Getting started](https://expressjs.com/en/starter/installing.html)
- [Express: Using middleware](https://expressjs.com/en/guide/using-middleware.html)
