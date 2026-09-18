---
title: Esimene HTTP-server
description: Loo Node.js sisseehitatud HTTP-mooduliga server ning jälgi päringu ja vastuse teekonda.
outline: deep
---

# Esimene HTTP-server

::: info Õpiväljund
Pärast õppetundi oskad käivitada Node.js HTTP-serveri ning selgitada, kuidas päringust tekib vastus.
:::

HTTP-server on töötav programm, mis:

1. kuulab kindlat porti;
2. võtab vastu päringu;
3. otsustab, millise vastuse saata;
4. lõpetab vastuse.

Enne koodi vaata üle [HTTP päring ja vastus](/veebiarendus/http-paring-ja-vastus).

## Minimaalne server

```js
import { createServer } from "node:http";

const server = createServer((request, response) => {
  console.log(request.method, request.url);

  response.statusCode = 200;
  response.setHeader("Content-Type", "text/plain; charset=utf-8");
  response.end("Tere serverist!");
});

server.listen(3000, () => {
  console.log("Server töötab: http://localhost:3000");
});
```

Käivita:

```bash
node server.js
```

Ava `http://localhost:3000`. Terminalis näed päringu meetodit ja teed.

## Server jääb kuulama

Tavaline skript lõpetab töö pärast viimast käsku. Server jääb töötama, sest see kuulab uusi ühendusi. Peata server terminalis klahvikombinatsiooniga `Ctrl+C`.

`localhost` tähendab sinu enda arvutit. Port `3000` aitab operatsioonisüsteemil suunata päringu õigesse programmi.

## Vastuse osad

```js
response.statusCode = 200;
response.setHeader("Content-Type", "application/json; charset=utf-8");
response.end(JSON.stringify({ message: "Tere!" }));
```

- `statusCode` kirjeldab päringu tulemust;
- `Content-Type` kirjeldab vastuse keha kuju;
- `response.end()` saadab keha ja lõpetab vastuse.

## Praktiline ülesanne: uuri serverit

1. Käivita server.
2. Ava brauseris `/`, `/products` ja `/missing`.
3. Vaata iga päringut Network-paneelis.
4. Muuda vastuse staatusekoodi ja `Content-Type` päist.
5. Selgita, mida brauser sai ning mida server terminalis nägi.

Kontrollitav tulemus: õppija suudab näidata sama päringut nii serveri logis kui ka brauseri Network-paneelis.

## Kontrollpunkt

- Mida tähendab, et server kuulab porti?
- Millised vastuse osad server määrab?
- Miks jääb server pärast käivitamist tööle?

Järgmisena: [Lihtsa API loomine](/nodejs/api-loomine).

## Allikad

- [Node.js: Anatomy of an HTTP transaction](https://nodejs.org/en/learn/modules/anatomy-of-an-http-transaction)
- [Node.js: HTTP](https://nodejs.org/api/http.html)
