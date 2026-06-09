---
title: Node.js keskkond
description: Mõista, kus Node.js JavaScripti käitab ning kuidas see erineb brauserikeskkonnast.
outline: deep
---

# Node.js keskkond

::: info Õpiväljund
Pärast õppetundi oskad selgitada, millal JavaScript töötab brauseris ja millal Node.js keskkonnas, ning valida ülesande jaoks sobiva käivituskeskkonna.
:::

JavaScript on programmeerimiskeel. **Brauser** ja **Node.js** on kaks erinevat keskkonda, mis oskavad JavaScripti käitada.

| Brauser | Node.js |
|---|---|
| Kuvab veebilehte ja haldab DOM-i | Käitab JavaScripti väljaspool brauserit |
| Pakub `window` ja `document` objekte | Pakub `process` ning ligipääsu failidele ja võrgule |
| Piirab ligipääsu kasutaja arvutile | Saab talle antud õigustega lugeda ja kirjutada faile |
| Käivitab kasutajaliidese koodi | Käivitab tööriistu, skripte ja servereid |

Mõlemad keskkonnad kasutavad sama JavaScripti keelt. Mõlemas saad kasutada näiteks muutujaid, funktsioone, massiive, `Promise`-eid, `URL`-i, `Date`-i ja `Intl`-i.

## Node.js kaks rolli meie töös

### 1. Arendustööriistade käivitaja

Kui käivitad terminalis `npm run dev`, võib Node.js käitada Vite'i. Sellisel juhul töötab:

- Vite Node.js keskkonnas;
- sinu veebirakendus brauseris.

Node.js aitab rakendust arendada, kuid rakenduse DOM-kood ei koli selle tõttu Node.js-i.

### 2. Serverirakenduse käivitaja

Node.js võib käitada programmi, mis võtab vastu HTTP-päringuid, loeb andmeid ja saadab vastuseid. Sellisel juhul on Node.js sinu rakenduse käivituskeskkond.

```text
brauseri JavaScript
        |
        | HTTP-päring
        v
Node.js server
        |
        | HTTP-vastus
        v
brauseri JavaScript
```

## Ennusta enne käivitamist

Millises keskkonnas võiks järgmine kood töötada?

```js
document.querySelector("h1").textContent = "Tere!";
```

```js
console.log(process.version);
```

::: details Vastus
Esimene näide vajab brauseri DOM-i ja `document` objekti. Teine näide kasutab Node.js-i pakutavat `process` objekti.
:::

## Praktiline katse

Loo fail `environment.js`:

```js
console.log("JavaScript töötab");
console.log("Node.js versioon:", process.version);
console.log("Kas document on olemas?", typeof document);
```

Käivita:

```bash
node environment.js
```

Selgita tulemuse põhjal:

1. milline rida kasutab JavaScripti keelt;
2. milline rida kasutab Node.js keskkonna võimalust;
3. miks `document` väärtus on `undefined`.

## Kontrollpunkt

Oskad teemat selgitada, kui saad vastata:

- Miks ei ole Node.js eraldi programmeerimiskeel?
- Mis töötab käsu `npm run dev` ajal Node.js-is ja mis brauseris?
- Miks ei saa Node.js failis vaikimisi DOM-i muuta?

Järgmisena: [Faili käivitamine ja keskkond](/nodejs/kaivituskeskkond).

## Allikad

- [Node.js: Introduction to Node.js](https://nodejs.org/en/learn/getting-started/introduction-to-nodejs)
- [MDN: JavaScript technologies overview](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/JavaScript_technologies_overview)
