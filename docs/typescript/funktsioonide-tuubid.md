---
title: Funktsioonide tüübid
description: Kirjelda funktsiooni sisend, väljund ja callback TypeScripti tüüpidega.
outline: deep
---

# Funktsioonide tüübid

::: info Õpiväljund
Pärast õppetundi oskad kirjeldada funktsiooni sisendi ja väljundi tüübid ning kasutada tüübikindlat callback-funktsiooni.
:::

Funktsioon on kokkulepe:

- millised väärtused ta vastu võtab;
- millise reegli järgi ta töötab;
- millise väärtuse ta tagastab.

TypeScript kontrollib sisendi ja väljundi **tüüpe**, kuid funktsiooni sisuline reegel tuleb arendajal endal korrektselt kirjutada.

```ts
function getRemainingPlaces(capacity: number, booked: number): number {
  return capacity - booked;
}
```

Parameetrite tüübid tuleb tavaliselt kirjutada. Tagastustüübi suudab TypeScript sageli tuletada, kuid avaliku funktsiooni juures võib selge tagastustüüp aidata kokkulepet nähtavaks teha.

```ts
getRemainingPlaces(20, 6); // 14
getRemainingPlaces(5, 5);  // 0
```

::: warning Tüüp ei tõesta ärireeglit
TypeScript kontrollib, et `capacity` ja `booked` on arvud ning tulemus on arv. Ta ei tea automaatselt, kas broneeritud kohtade arv tohib olla negatiivne või mahutavusest suurem.
:::

## Valikulised parameetrid

```ts
function createLabel(title: string, room?: string): string {
  return room ? `${title} (${room})` : title;
}
```

`room?: string` tähendab, et väärtus võib olla `string` või `undefined`.

## `void`

```ts
function showMessage(message: string): void {
  console.log(message);
}
```

`void` kirjeldab funktsiooni, mille tulemust kutsuja ei kasuta.

## Callback'i tüüp

```ts
type WorkshopFilter = (capacity: number, booked: number) => boolean;

const hasPlaces: WorkshopFilter = (capacity, booked) => {
  return booked < capacity;
};
```

Callback'i tüüp kirjeldab funktsiooni kuju, mitte selle konkreetset lahendust.

## Praktiline ülesanne: töötoa funktsioonid

Loo Vite projektis fail `src/workshop-functions.ts`. Selles ülesandes ei kasuta me veel töötoa objekti. Funktsioonid saavad vajalikud väärtused eraldi parameetritena, et keskenduda funktsioonide tüüpidele.

Lisa kõigile loodavatele funktsioonidele `export`, et neid saaks `src/main.ts` failis importida ja käivitada.

Kõigi ülesande funktsioonide sisendite kokkulepe:

- `capacity` on positiivne täisarv;
- `booked` on null või positiivne täisarv;
- `booked` võib olla `capacity` väärtusest suurem, et käsitleda vigast ülebroneeritud olekut.

TypeScript kontrollib, et sisendid on arvud. Ta ei kontrolli automaatselt, kas arvud vastavad sellele kokkuleppele.

### 1. Vabade kohtade arv

Koosta funktsioon:

```ts
function getRemainingPlaces(capacity: number, booked: number): number
```

Funktsioon:

- saab töötoa maksimaalse kohtade arvu `capacity`;
- saab juba broneeritud kohtade arvu `booked`;
- tagastab vabade kohtade arvu;
- ei tagasta kunagi negatiivset arvu.

| Kutsung | Oodatav tulemus |
| --- | ---: |
| `getRemainingPlaces(20, 6)` | `14` |
| `getRemainingPlaces(5, 5)` | `0` |
| `getRemainingPlaces(5, 8)` | `0` |

### 2. Kas broneeringut saab teha?

Koosta funktsioon:

```ts
function canBook(capacity: number, booked: number): boolean
```

Funktsioon tagastab:

- `true`, kui vähemalt üks koht on vaba;
- `false`, kui töötuba on täis või ülebroneeritud.

| Kutsung | Oodatav tulemus |
| --- | --- |
| `canBook(20, 6)` | `true` |
| `canBook(5, 5)` | `false` |
| `canBook(5, 8)` | `false` |

Kasuta funktsiooni sees varem loodud `getRemainingPlaces()` funktsiooni. Nii jääb vabade kohtade arvutamise reegel ühte kohta.

### 3. Töötoa sildi vormindamine

Koosta funktsioon:

```ts
function formatWorkshop(title: string, room?: string): string
```

Funktsioon tagastab:

- ruumi olemasolul teksti kujul `"Pealkiri (Ruum)"`;
- puuduva ruumi korral ainult pealkirja.

| Kutsung | Oodatav tulemus |
| --- | --- |
| `formatWorkshop("TypeScript", "A-204")` | `"TypeScript (A-204)"` |
| `formatWorkshop("TypeScript")` | `"TypeScript"` |

### 4. Sama tüüpi filtrid

Lisa funktsioonitüüp:

```ts
type WorkshopFilter = (capacity: number, booked: number) => boolean;
```

Koosta sama tüübi põhjal kaks callback-funktsiooni:

- `hasPlaces`;
- `isPopular`.

Nende reeglid:

- `hasPlaces` tagastab `true`, kui vähemalt üks koht on vaba;
- `isPopular` tagastab `true`, kui broneeritud on vähemalt 75% kohtadest.

| Kutsung | Oodatav tulemus |
| --- | --- |
| `hasPlaces(20, 6)` | `true` |
| `hasPlaces(5, 5)` | `false` |
| `isPopular(20, 15)` | `true` |
| `isPopular(20, 14)` | `false` |

Funktsioonid peavad tagastama väärtuse ega tohi ise `console.log()` kasutada.

## Kontrolli tulemust

Lisa faili `src/main.ts` ajutised kontrollid:

```ts
import {
  canBook,
  formatWorkshop,
  getRemainingPlaces,
  hasPlaces,
  isPopular
} from "./workshop-functions";

console.log(getRemainingPlaces(20, 6));          // 14
console.log(getRemainingPlaces(5, 8));           // 0
console.log(canBook(5, 5));                      // false
console.log(formatWorkshop("TypeScript", "A-204")); // TypeScript (A-204)
console.log(formatWorkshop("TypeScript"));       // TypeScript
console.log(hasPlaces(20, 6));                   // true
console.log(isPopular(20, 14));                  // false
console.log(isPopular(20, 15));                  // true
```

Seejärel käivita tüübikontroll:

```bash
npm run check
```

Tegelike tulemuste nägemiseks käivita rakendus:

```bash
npm run dev
```

Ava rakendus brauseris ning vaata DevToolsi Console-paneeli. Console'is kuvatavad väärtused peavad vastama koodikommentaarides kirjeldatud tulemustele.

Kontrolli valmis lahendust:

- [ ] kõik viis funktsiooni tagastavad tabelites kirjeldatud tulemused;
- [ ] funktsioonide parameetritel ja tagastusväärtustel on sobivad tüübid;
- [ ] `hasPlaces` ja `isPopular` kasutavad `WorkshopFilter` tüüpi;
- [ ] `canBook` kasutab `getRemainingPlaces()` funktsiooni;
- [ ] funktsioonid ei väljasta ise midagi;
- [ ] brauseri Console'is kuvatakse oodatud kontrollväärtused;
- [ ] `npm run check` lõpeb veata.

Proovi seejärel ajutiselt kutsuda funktsiooni vale tüüpi väärtusega:

```ts
getRemainingPlaces(20, "6");
```

TypeScript peab vea enne programmi käivitamist leidma. Eemalda vigane kutsung pärast kontrollimist.

::: details Vihje: ära tagasta negatiivset vabade kohtade arvu
Kasuta `Math.max()` funktsiooni, et valida arvutatud tulemuse ja nulli vahel suurem väärtus.
:::

::: details Vihje: kuidas arvutada täituvuse protsenti?
Jaga broneeritud kohtade arv maksimaalse kohtade arvuga. 75% kümnendmurruna on `0.75`.
:::

## Mõtesta

- Miks on väärtust tagastavat funktsiooni lihtsam testida kui ainult terminali kirjutavat funktsiooni?
- Millist viga suudab TypeScript nende funktsioonide puhul leida ja millist ärireegli viga mitte?
- Miks kasutab `canBook()` eraldi arvutamise asemel `getRemainingPlaces()` funktsiooni?
- Millal tasub tagastustüüp eraldi välja kirjutada?

Järgmisena: [Objektide tüübid](./objektide-tuubid.md).
