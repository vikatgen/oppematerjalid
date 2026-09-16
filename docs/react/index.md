---
title: React
description: Reacti, API päringute ja React Routeri 14 kohtumisega õpitee.
outline: deep
---

# React

::: info Teema eesmärk
Õpid ehitama Reactiga mitme vaatega veebirakenduse, mis koosneb korduvkasutatavatest komponentidest, haldab muutuvat olekut ning laadib andmeid välisest API-st.
:::

React aitab kirjeldada kasutajaliidest komponentide kaudu. Alustame Reacti mõtteviisist, liigume komponentide ja oleku juurde ning ühendame lõpuks rakenduse API ja React Routeriga.

## Läbiv projekt: artiklite kataloog

Teema jooksul valmib artiklite kataloog, mis kasutab [JSONPlaceholderi](https://jsonplaceholder.typicode.com/) avalikku test-API-t.

Lõplik rakendus:

- laadib API-st artiklid ja autorid;
- võimaldab artikleid otsida ning filtreerida;
- avab artikli ja autori eraldi aadressil;
- võimaldab märkida artikleid lemmikuks;
- kuvab laadimise, vea ja tühja tulemuse olekuid;
- sisaldab ühist navigatsiooni ja 404-lehte.

```text
/                 avaleht
/posts            artiklite loend
/posts/:postId    artikli detailvaade
/users/:userId    autori detailvaade
/about            rakenduse info
```

::: warning Test-API piirang
JSONPlaceholder vastab ka andmete lisamise, muutmise ja kustutamise päringutele, kuid ei salvesta muudatusi püsivalt andmebaasi.
:::

## Õppekorraldus

Teema koosneb 14 kohtumisest. Üks kohtumine kestab 90 minutit. Igas kohtumises lisandub läbivasse rakendusse üks kontrollitav oskus või funktsioon.

| Kohtumine | Teema | Kohtumise tulemus |
|---|---|---|
| 1 | [Reacti mõtteviis](./01-reacti-motteviis.md) | Selgitad komponentide ja deklaratiivse kasutajaliidese põhimõtet. |
| 2 | [Projekt ja Vite](./02-projekt-ja-vite.md) | Käivitad Reacti projekti ning selgitad selle põhiliste failide rolli. |
| 3 | [JSX ja komponendid](./03-jsx-ja-komponendid.md) | Jagad kasutajaliidese komponentideks ning kirjutad korrektset JSX-i. |
| 4 | [Props ja kompositsioon](./04-props-ja-kompositsioon.md) | Edastad komponentidele andmeid ja koostad väiksematest komponentidest suurema vaate. |
| 5 | [Sündmused ja state](./05-sundmused-ja-state.md) | Muudad kasutajaliidest sündmuste ning `useState` abil. |
| 6 | [Loendid ja tingimused](./06-loendid-ja-tingimused.md) | Kuvad andmetest loendi ja valid tingimuse põhjal sobiva vaate. |
| 7 | [Vormid](./07-vormid.md) | Seod sisestusväljad Reacti olekuga ja töötled vormi saatmist. |
| 8 | [State’i asukoht](./08-statei-asukoht.md) | Tõstad ühise oleku sobivasse vanemkomponenti ja väldid dubleeritud state'i. |
| 9 | [Efektid](./09-efektid.md) | Kasutad `useEffect` Hooki välise süsteemiga sünkroonimiseks. |
| 10 | [API-andmed](./10-api-andmed.md) | Laadid API-st andmed ning haldad laadimise, vea ja tulemuse olekut. |
| 11 | [React Router](./11-react-router.md) | Seadistad rakenduse põhivaated ja navigeerimise. |
| 12 | [Dünaamilised marsruudid](./12-dunaamilised-marsruudid.md) | Seod URL-i parameetri detailvaate ja API päringuga. |
| 13 | [Rakenduse tervik](./13-rakenduse-tervik.md) | Koondad komponendid, API-loogika ja marsruudid terviklikuks rakenduseks. |
| 14 | [Kontrollimine ja esitlus](./14-kontrollimine-ja-esitlus.md) | Kontrollid nõudeid, parandad vead ning põhjendad oma lahendust. |

## Soovituslik kohtumise rütm

| Aeg | Tegevus |
|---|---|
| 10 min | Eelmise kohtumise meenutamine ja töötava tulemuse kontrollimine |
| 20 min | Uus mõiste koos väikese näitega |
| 20 min | Õpetaja juhitud programmeerimine |
| 30 min | Iseseisev või paaris praktiline ülesanne |
| 10 min | Lahenduste võrdlemine ja mõtestamine |

## Tehnilised kokkulepped

- Kasutame JavaScripti ja funktsionaalseid Reacti komponente.
- Loome projekti Vite abil.
- Kasutame Reacti Hooke, näiteks `useState` ja `useEffect`.
- Teeme võrgupäringud brauseri `fetch()` funktsiooniga.
- Seadistame vaated React Routeri abil.
- Kontrollime koodi brauseri arendustööriistade ja React DevToolsiga.

## Eelteadmised ja töömaht

Enne selle teemaga alustamist peaksid oskama:

- luua HTML-i ja CSS-i abil lihtsa kasutajaliidese;
- kasutada JavaScripti muutujaid, funktsioone, objekte ja massiive;
- reageerida brauseri sündmustele ning muuta DOM-i;
- kasutada `async`/`await` süntaksit ja teha `fetch()` päringuid;
- käivitada npm-i skripte terminalis.

Vajaduse korral korda [JavaScripti brauserikeskkonna materjale](/javascript/brauser/sissejuhatus) ja [rakenduste loomise töövahendeid](/rakenduste-loomine/sissejuhatus). Esimese kohtumise aruteluga kontrollime lähteoskusi.

14 × 90 minutit on 21 kontakttundi ehk 28 akadeemilist tundi. Kohustuslik projekt valmib tundides. Kiirematele mõeldud laiendused ei kuulu kohustusliku mahu hulka.

## Materjali kasutamine

Iga kohtumise lehel on selgitused, näited, praktiline ülesanne ja kontrollitav tulemus. Numbrid määravad õppejärjekorra. Failinimed koodinäidete juures viitavad sinu eraldi Reacti projektile. Osalise näite juures on kirjas, kuhu see olemasolevas failis paigutada.

- [Praktilise töö nõuded ja hindamine](./praktiline-too.md)
- [Reacti sõnastik](./sonastik.md)

Põhitee kasutab React 19-t, React Router 7 deklaratiivset režiimi ja Node.js 24 LTS-i. Iga õppijaprojekti lockfile määrab täpsed paigaldatud versioonid. POST-päring, lemmikute püsimine värskendamisel, URL-i otsing ja veebimajutus on valikulised laiendused.

## Hindamine

Kujundav hindamine toimub kohtumiste praktiliste ülesannete ja töötava tulemuse põhjal. Kursuse lõpus esitleb õppija valminud rakendust ning põhjendab vähemalt komponentide jaotust, state'i asukohta, API päringu olekuid ja marsruutide ülesehitust.

## Alustamine

Alusta esimesest kohtumisest: [Reacti mõtteviis](./01-reacti-motteviis.md).

## Allikad

- [React Learn](https://react.dev/learn) — Reacti ametlik õppematerjal.
- [React Router](https://reactrouter.com/start/declarative/routing) — deklaratiivse marsruutimise ametlik juhend.
- [JSONPlaceholder Guide](https://jsonplaceholder.typicode.com/guide/) — kursusel kasutatava test-API näited.
