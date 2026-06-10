---
title: TypeScripti ülesanded
description: Lühikesed harjutused TypeScripti põhioskuste kinnistamiseks.
outline: deep
---

# TypeScripti ülesanded

## 1. Leia TypeScripti vastutus

Kirjelda viie vea puhul, kas selle peaks leidma TypeScript, käitusaegne valideerimine või automaattest:

- funktsioon saab arvu asemel teksti;
- server tagastab puuduva `title` omaduse;
- broneering lubatakse täis töötuppa;
- DOM-element puudub;
- omaduse nimi on koodis valesti kirjutatud.

## 2. Modelleeri töötuba

Koosta `Workshop` tüüp, mis sisaldab muutumatut ID-d, pealkirja, mahutavust, osalejaid, valikulist ruumi ja piiratud olekut.

## 3. Muuda vigased olekud võimatuks

Asenda eraldi `loading`, `error` ja `data` muutujad eristatud union'iga.

## 4. Kontrolli DOM-i

Koosta vormi töötleja, mis kontrollib vajalike elementide ja kasutaja sisendi olemasolu.

## 5. Kontrolli API vastust

Loe JSON `unknown` väärtusena ning koosta tüübikaitse vähemalt kolme nõutava omaduse kontrollimiseks.

## 6. Kirjuta geneeriline otsing

Koosta `findById<T extends { id: number }>()`, mis tagastab eristatud `Result<T>` tulemuse.

## 7. Migreeri üks moodul

Vali olemasolevast JavaScripti projektist üks fail, migreeri see TypeScriptiks ja kirjelda README-s:

- millised vead TypeScript leidis;
- millise vea oleks leidnud alles töötav rakendus;
- millist tüüpi oli kõige raskem kirjeldada ja miks.

