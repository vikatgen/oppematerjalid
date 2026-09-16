# Frontend 1 läbiviimine

## Maht ja eesmärk

14 kohtumist × 90 minutit = 1260 minutit ehk 21 kontakttundi. Õppija valmistab JavaScripti, Reacti ja React Routeriga API-l põhineva artiklikataloogi. Hinnatakse komponentide andmevoogu, kasutaja teekondi, vigade käsitlemist ning põhjendusi.

Õppijate lehed on `docs/react/`. Õpetaja juhendid ja `solutions/react/` lõppnäidis jäävad VitePressi avalikust sisust välja.

## Enne esimest tundi

1. Ava kursuse õpitee ja lõputöö nõuded.
2. Küsi funktsiooni, massiivi, map'i, sündmuse ja asünkroonsuse kohta üks väike praktiline küsimus. Vajadusel kasuta olemasoleva JavaScripti kursuse viiteid.
3. Kontrolli arvutites Node.js 24 LTS-i, npm-i, brauserit ja redaktorit.
4. Käivita õpetaja näidisrakendus ning kontrolli API kättesaadavust. Tõrke korral kasuta näidise kohalikku demo-API-t.
5. Esimeses tunnis piisab brauserist ja redaktorist. Vite paigaldatakse teises.

## Kursuse juhtimine

Kohtumised 2–12 kasutavad rütmi 10/20/20/30/10. 13. kohtumisel on 40 minutit lõpetamiseks, 14. kohtumisel testimine ja esitlused. Õppijad programmeerivad ka juhitud demo ajal, kuid iseseisvas osas peavad nad tegema vähemalt ühe ise põhjendatud muudatuse.

Põhiteel pole kohustuslikku kodutööd. Suure mahuga klassis kasuta paaristööd ja rolle. Ära kiirusta edasi, kui komponentide sisend ning olek on segamini: lühenda stiilitööd ja valikulisi laiendusi.

## Kontrollpunktid

| Kohtumine | Kontrolli |
|---|---|
| 1 | Komponentide puu ja deklaratiivse vaate selgitus |
| 4 | Sama kaart, kolm erinevat sisendit |
| 8 | Ühine lemmikute state ja otsing |
| 10 | Laadimine, viga, tühi tulemus ja uuesti proovimine |
| 12 | Artikli ja autori otseaadress ning võistlevad päringud |
| 14 | Töötav projekt, kontrolltabel, testid ja individuaalne selgitus |

## Tehnilised piirid

Kasutame React 19-t ning React Router 7 deklaratiivset režiimi. Reacti ametlik dokumentatsioon soovitab suuremate uute rakenduste jaoks raamistikke; siin valime Vite'i, et õppija näeks eraldi Reacti, Routeri ja päringu vastutusi.

Fetch efektis on teadlik õppemudel, mitte väide, et see on alati parim tootmislahendus. 14. tunnis tutvusta päringu vahemälu, loader'eid ja raamistikke järgmiste sammudena.

JSONPlaceholderi POST/PATCH/DELETE ei salvesta muudatust püsivalt. Mustandivormi nõue on sisendi kontroll. POST, localStorage ja avaldamine on laiendused.

## Hindamine

Kasuta õppijale nähtavat nelja kriteeriumiga rubriiki praktilise töö lehel. Ära anna punkte raamatukogude arvu eest. Eduka töö korral on põhiteekonnad kontrollitud ja õppija oskab teha väikese uue muudatuse.

Suure rühma esitlused tee paralleelselt paarides või väikestes rühmades. Õpetaja kogub individuaalse kontrolltabeli ja esitab pistelised põhjendusküsimused. Näidislahenduse kopeerimine ei tõenda õpiväljundit.

## Õpetaja näidislahendus

`solutions/react/README.md` kirjeldab käivitamist, teste ja võrguühenduseta demo kasutamist. Lõppnäidis ühendab põhitee. See ei ole 2. tunni stardifail ega asenda õppija tehtud samme.

Demo-API on kohalik testabivahend, mille vastuseid saab kontrollitult aeglustada või rikkuda. Õppijate päris API kontroll tuleb teha JSONPlaceholderi vastu.

## Allikad

- https://react.dev/learn — Reacti ametlik õppeteekond.
- https://react.dev/learn/build-a-react-app-from-scratch — Vite'i ja eraldi teekide roll.
- https://reactrouter.com/start/declarative/installation — Routeri valitud režiim.
- https://jsonplaceholder.typicode.com/guide/ — test-API leping.

