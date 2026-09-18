---
title: HTTP meetodid ja staatusekoodid
description: Õpi valima päringu eesmärki kirjeldava HTTP-meetodi ning tõlgendama vastuse staatusekoodi.
outline: deep
---

# HTTP meetodid ja staatusekoodid

::: info Õpiväljund
Pärast õppetundi oskad põhjendada HTTP-meetodi valikut ja tõlgendada levinud staatusekoode.
:::

## Meetod kirjeldab kavatsust

| Meetod | Tüüpiline eesmärk |
| --- | --- |
| `GET` | loe ressurssi |
| `POST` | loo uus ressurss või käivita tegevus |
| `PUT` | asenda ressurss tervikuna |
| `PATCH` | muuda osa ressursist |
| `DELETE` | eemalda ressurss |

URL kirjeldab ressurssi, meetod tegevust:

```text
GET    /products/7
PATCH  /products/7
DELETE /products/7
```

## Staatusekoodide rühmad

| Rühm | Tähendus |
| --- | --- |
| `1xx` | informatsioon |
| `2xx` | päring õnnestus |
| `3xx` | suunamine või vahemälu |
| `4xx` | klient peab päringut parandama |
| `5xx` | server ei suutnud korrektset päringut töödelda |

Levinud koodid:

- `200 OK` – päring õnnestus;
- `201 Created` – ressurss loodi;
- `204 No Content` – õnnestus, vastuse keha puudub;
- `400 Bad Request` – päring on vigane;
- `401 Unauthorized` – autentimine puudub või ei sobi;
- `403 Forbidden` – tegevus pole lubatud;
- `404 Not Found` – ressurssi ei leitud;
- `409 Conflict` – päring läheb praeguse olekuga konflikti;
- `500 Internal Server Error` – serveris tekkis ootamatu viga.

## Staatusekood ei räägi kogu lugu

Klient peab sageli lugema ka vastuse keha:

```json
{
  "error": "Product is out of stock"
}
```

API peaks kasutama sobivat staatusekoodi ja arusaadavat veakeha.

## Praktiline ülesanne

Vali sobiv meetod ja oodatav staatus:

1. kõigi toodete küsimine;
2. uue toote loomine;
3. toote hinna muutmine;
4. olematu toote küsimine;
5. toote kustutamine ilma vastuse kehata.

Põhjenda iga valikut.

## Allikad

- [MDN: HTTP request methods](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Methods)
- [MDN: HTTP response status codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status)
