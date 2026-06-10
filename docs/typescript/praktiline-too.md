---
title: Praktiline töö
description: Migreeri töötoa broneerimisrakendus JavaScriptist TypeScriptiks ning põhjenda loodud tüüpe ja kontrolle.
outline: deep
---

# Praktiline töö: broneerimisrakenduse migreerimine

::: info Hinnatav tulemus
Migreerid olemasoleva JavaScripti rakenduse TypeScriptiks nii, et rakenduse põhikäitumine säilib ning tüübid muudavad andmed, olekud ja välised piirid kontrollitavaks.
:::

## Lähteolukord

Rakendus võimaldab:

- kuvada töötubasid;
- filtreerida vabu töötubasid;
- valida töötoa;
- sisestada osaleja nime;
- saata broneeringu;
- kuvada laadimis-, õnnestumis- ja veaolekut.

Õpetaja annab töötava JavaScripti lähteprojekti või lubab kasutada varasemat projekti.

## Kohustuslikud nõuded

### Projekti seadistus

- projekt kasutab TypeScripti ja `"strict": true` seadistust;
- `npm run check` kontrollib tüüpe;
- `npm run build` loob töötava rakenduse;
- lähtekood ei kasuta põhjendamata `any`, `!` ega `as` võtteid.

### Andmemudel

- `Workshop`, `Participant` ja `Booking` on selgelt modelleeritud;
- töötoa olek on literal-union;
- laadimisolek on eristatud union;
- puuduvad väärtused on tüüpides nähtavad.

### Rakenduse piirid

- vajalikud DOM-elemendid kontrollitakse;
- vormisisend valideeritakse;
- API vastust käsitletakse alguses `unknown` väärtusena;
- HTTP-viga ja vigase kujuga JSON annavad arusaadava veaoleku.

### Tööprotsess

- migratsioon on jagatud vähemalt kolmeks sisuliseks commit'iks;
- README kirjeldab käivitamist ja kontrollimist;
- õppija oskab selgitada vähemalt kolme TypeScripti abil leitud probleemi.

## Soovituslik tööjärjekord

1. Käivita JavaScripti lähteprojekt ja kirjelda põhikäitumine.
2. Lisa TypeScript, `tsconfig.json` ja `check` skript.
3. Migreeri andmemudelid ning puhtad funktsioonid.
4. Migreeri DOM ja sündmused.
5. Migreeri API päring ning valideerimine.
6. Paranda ülejäänud vead ja kontrolli build'i.
7. Täienda README-d ning valmista ette lahenduse selgitus.

## Valmisoleku kontroll

```bash
npm install
npm run check
npm run build
npm run dev
```

Kontrolli brauseris:

- töötubade laadimist;
- korrektset broneeringut;
- tühja nime;
- täit või tühistatud töötuba;
- serveri viga;
- vigase kujuga vastust.

## Hindamisrubriik

| Kriteerium | Arvestatud tulemus |
| --- | --- |
| Andmemudel | Tüübid väljendavad nõutavaid, puuduvaid ja piiratud väärtusi |
| Funktsioonid | Sisendid ja väljundid on arusaadavad ning `any` ei peida probleeme |
| Välised andmed | DOM, vorm ja API andmed kontrollitakse käitusajal |
| Tööriistad | `check`, `build` ja rakendus töötavad |
| Tööprotsess | Commit'id ja README võimaldavad töö käiku jälgida |
| Selgitus | Õppija põhjendab tüüpe, kontrolle ja tehtud valikuid |

## Laiendus

- Lisa geneeriline `Result<T>` API tulemuste jaoks.
- Lisa Vitesti unit-testid puhastele funktsioonidele.
- Koosta Node.js TypeScripti API sama andmemudeliga.

Lisaharjutused: [TypeScripti ülesanded](./assignments.md).
