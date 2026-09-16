# Frontend 1 õpetaja näidisrakendus

Kursuse põhitee lõppversioon: React 19, React Router 7 deklaratiivne režiim ja Vite. Kasuta Node.js 24 LTS-i. Lockfile määrab kontrollitud täpsed sõltuvused.

## Käivitamine

Käivita selles kaustas:

```bash
npm ci
npm run dev
```

Tavarežiim kasutab JSONPlaceholderi avalikku API-t. Õppijad loovad 2. tunnis oma projekti; see kaust on õpetaja lõppnäidis.

## Võrguühenduseta demo

```bash
npm run demo
```

Demo kasutab kolme kohalikku näidisartiklit ja kahte näidisautorit. Vite'i väike arendusserveri lisa vastab aadressidel /demo-api/posts, /demo-api/posts/1 ja /demo-api/users/1. See pole kursuse backend'i ülesanne. .env.demo sisaldab ainult avalikku baasaadressi.

Tõrke demonstreerimiseks macOS-i/Linuxi terminalis:

```bash
DEMO_SCENARIO=error npm run demo
DEMO_SCENARIO=empty npm run demo
DEMO_SCENARIO=bad-shape npm run demo
DEMO_SCENARIO=slow npm run demo
```

Käivita korraga üks server. PowerShellis sea näiteks `$env:DEMO_SCENARIO="error"`, seejärel `npm run demo`. Pärast katset eemalda muutuja `Remove-Item Env:DEMO_SCENARIO`.

Demo-API töötab ainult arendusserveris. Tavapärane build kasutab päris API-t. Ära avalda demo-build'i eeldades, et API-lisa töötab staatilises majutuses.

## Kontrollimine

```bash
npm test
npm run build
npm run preview
```

Automaattestid kontrollivad filtreid, muutmatust, lemmikute lülitamist, andmekuju ning HTTP/võrgu/JSON-i vigu. Need kasutavad kontrollitud vastuseid ega sõltu avaliku API saadavusest.

Käsitsi kontrolli:

- otsingut ja ainult lemmikute filtrit koos;
- lemmikute säilimist infolehele minnes ja tagasi tulles;
- artikli ja autori otseaadresse ning värskendamist;
- vigast ID-d, puuduvat ressurssi ja tundmatut marsruuti;
- laadimise, vea, vigase andmekuju ja tühja vastuse olekuid;
- klaviatuuriga menüüd ning mustandivormi;
- kiiresti detaili vahetades aegunud vastuse eiramist.

## Teadlikud piirid

- Lemmikud säilivad Appi mälus, kuid mitte brauseri värskendamisel.
- Mustandivorm valideerib sisendit, kuid ei saada POST-päringut.
- Kohandatud Hook ei tee vahemälu ega päringute deduplitseerimist.
- Veebimajutus peab BrowserRouteri otseaadresside jaoks toetama SPA fallback'i.
- Sisendi kontroll brauseris ei asenda serveripoolset kontrolli.

Need piirid vastavad kursuse põhiteele. LocalStorage, POST, URL-otsing ning avaldamine on õppija laiendused.
