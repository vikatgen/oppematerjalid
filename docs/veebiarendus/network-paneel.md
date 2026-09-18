---
title: Päringu uurimine Network-paneelis
description: Õpi kasutama DevToolsi Network-paneeli HTTP-päringu ja vastuse süsteemseks uurimiseks.
outline: deep
---

# Päringu uurimine Network-paneelis

::: info Õpiväljund
Pärast õppetundi oskad Network-paneeli põhjal kirjeldada päringu teekonda ning leida esimese ebaõnnestunud sammu.
:::

## Uurimise töövoog

1. Ava DevTools ja Network-paneel.
2. Laadi leht uuesti või korda tegevust.
3. Leia ebaõnnestunud või huvipakkuv päring.
4. Kontrolli URL-i ja meetodit.
5. Kontrolli staatusekoodi.
6. Loe päringu ja vastuse päiseid.
7. Kontrolli vastuse keha.
8. Vaata ajastust.

## Olulised vaated

- **Headers** – URL, meetod, staatus ja päised;
- **Payload** – saadetud päringu keha või parameetrid;
- **Preview** – mugavalt loetav vastus;
- **Response** – algne vastuse keha;
- **Timing** – päringu etappide kestused.

Nii näeb **Headers** vaade välja `https://fakestoreapi.com/products` päringu peal — General plokis URL, meetod ja staatus, all pool päringu enda päised:

![Chrome DevTools Network-paneeli Headers vaade fakestoreapi.com/products päringu jaoks, näidatud General ja Request headers plokid.](/veebiarendus/network-headers.jpg)

**Preview** näitab sama vastust mugavalt avatava puuna:

![Chrome DevTools Network-paneeli Preview vaade — fakestoreapi.com/products vastuse JSON-massiiv avatava puuna.](/veebiarendus/network-preview.jpg)

**Response** näitab vastuse toorkeha täpselt nii, nagu server selle saatis:

![Chrome DevTools Network-paneeli Response vaade — fakestoreapi.com/products vastuse toores JSON-tekst.](/veebiarendus/network-response.jpg)

## Harjutus Fake Store API-ga

Uuri `https://fakestoreapi.com/products` päringut ja kirjelda:

- request URL;
- request method;
- status code;
- response `content-type`;
- vastuse keha kuju;
- päringu kestus.

Seejärel kasuta valet URL-i ja võrdle tulemusi.

## Vea kirjeldamise mall

```text
Tegevus:
Päringu URL ja meetod:
Staatusekood või võrguviga:
Olulised päised:
Vastuse keha:
Esimene ootamatu tulemus:
Järgmine kontroll:
```

See kirjeldus aitab vältida ebamäärast teadet „API ei tööta”.

## Mõtesta

- Mida näitab Network-paneel, mida Console ei näita?
- Kuidas eristad HTTP-viga JSON-i töötlemise veast?
- Miks tuleb veaotsingul leida esimene ootamatu tulemus?

## Allikad

- [Chrome DevTools: Inspect network activity](https://developer.chrome.com/docs/devtools/network/)
- [Firefox DevTools: Network Monitor](https://firefox-source-docs.mozilla.org/devtools-user/network_monitor/)
