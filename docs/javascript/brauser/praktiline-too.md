---
title: Brauserirakenduse praktiline töö
description: DOM-i, sündmuste, salvestamise ja võrgupäringu ühendamine tervikrakenduseks.
outline: deep
---

# Brauserirakenduse praktiline töö: tootekataloog

::: info Tulemus
Lood väikese interaktiivse veebirakenduse, mis ühendab DOM-i, sündmused, brauserisalvestuse ja serveripäringu.
:::

Brauseriosa jooksul ehitatud tootekataloog kasutab lõppversioonis Fake Store API tooteandmeid ning kuvab need DOM-is.

Rakendus peab vähemalt:

- küsima Fake Store API-st toodete nimekirja `fetch()` abil;
- kuvama tooted DOM-is tootekaartidena;
- võimaldama kasutajal tooteid otsida või filtreerida;
- võimaldama kasutajal lisada toote lemmikutesse või ostukorvi;
- säilitama valitud oleku `localStorage` abil;
- kuvama laadimis- ja veaolekut.

## Seos õppetundidega

Iga brauseriosa tund täiendab sama projekti. Hoia lahendus alguses lihtsas HTML-, CSS- ja JavaScripti projektis.

Pärast brauseriosa viiakse sama rakendus [Rakenduste loomise](/rakenduste-loomine/sissejuhatus) moodulis Vite'i-põhisesse projekti ning lisatakse professionaalse töövoo seadistused.
