---
title: HTTP päring ja vastus
description: Õpi kirjeldama HTTP-päringu ja vastuse algusrida, päiseid ning keha.
outline: deep
---

# HTTP päring ja vastus

::: info Õpiväljund
Pärast õppetundi oskad eristada HTTP-päringu ja vastuse päiseid ning keha ja selgitada nende rolli.
:::

HTTP suhtlus koosneb päringust ja vastusest.

## Päringu mudel

```http
POST /products HTTP/1.1
Host: api.example.com
Content-Type: application/json
Accept: application/json

{"title":"Must seljakott","price":39.99}
```

Päringus on:

- meetod ja soovitud tee;
- päised ehk metaandmed;
- valikuline keha.

## Vastuse mudel

```http
HTTP/1.1 201 Created
Content-Type: application/json
Cache-Control: no-store

{"id":7,"title":"Must seljakott","price":39.99}
```

Vastuses on:

- staatusekood ja kirjeldus;
- päised;
- valikuline keha.

## Levinud päised

| Päis | Tähendus |
| --- | --- |
| `Content-Type` | mis kujul on keha |
| `Accept` | millist vastuse kuju klient eelistab |
| `Authorization` | autentimise info |
| `Cache-Control` | vahemällu salvestamise reeglid |
| `Origin` | päringu algatanud päritolu |
| `Access-Control-Allow-Origin` | millisele päritolule brauser võib vastuse anda |

Päis ei ole sama mis keha. `Content-Type: application/json` kirjeldab keha, kuid ei ole ise JSON-andmed.

## Keha kuju

HTTP keha võib sisaldada näiteks:

- JSON-i;
- HTML-i;
- teksti;
- pilti;
- vormiandmeid;
- faili.

Klient ja server peavad keha kuju osas kokku leppima.

## Praktiline uurimine

Vali Network-paneelis Fake Store API päring.

Kirjelda:

1. päringu URL ja meetod;
2. päringu olulised päised;
3. vastuse staatusekood;
4. vastuse `Content-Type`;
5. vastuse keha kuju.

## Allikad

- [MDN: HTTP messages](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Messages)
- [MDN: HTTP headers](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers)
