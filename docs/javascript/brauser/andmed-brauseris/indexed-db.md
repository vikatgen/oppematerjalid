---
title: IndexedDB
description: Lisalugemine suuremate struktureeritud andmekogude asünkroonsest salvestamisest brauseris.
outline: deep
---

# IndexedDB

::: warning Lisamaterjal
Loe seda materjali, kui soovid brauseris säilitada rohkem struktureeritud andmeid kui väikesed Web Storage tekstiväärtused.
:::

`localStorage` sobib väikese oleku, näiteks ostukorvi ID-de või kasutajaliidese eelistuse jaoks. Kui rakendus peab hoidma palju objekte, tegema võtme järgi otsinguid või töötama võrguühenduseta, pakub brauser `IndexedDB` andmebaasi.

## Millal IndexedDB-d kaaluda?

IndexedDB sobib näiteks:

- suurema tootekataloogi kohalikuks vahemäluks;
- võrguühenduseta töötava rakenduse andmeteks;
- paljude objektide võtme järgi otsimiseks;
- failide ja muude suuremate väärtuste hoidmiseks;
- struktureeritud andmete tehinguteks.

Väikese tõeväärtuse või mõne ID salvestamiseks on `localStorage` lihtsam.

## Võrdlus Web Storage'iga

| Omadus | Web Storage | IndexedDB |
| --- | --- | --- |
| Väärtuse kuju | ainult tekst | struktureeritud väärtused |
| API | sünkroonne | asünkroonne |
| Otsimine | võtme järgi | võtmed ja indeksid |
| Tehingud | puuduvad | olemas |
| Sobiv andmehulk | väike | suurem |

IndexedDB API on Web Storage'ist keerulisem, sest andmebaasi avamine, päringud ja tehingud annavad tulemuse hiljem.

## Vaimne mudel

```text
andmebaas
└── objektisalv (object store)
    ├── kirje võtmega 1
    ├── kirje võtmega 2
    └── kirje võtmega 3
```

- **andmebaas** kuulub veebiaadressile;
- **objektisalv** sarnaneb ühe andmetüübi kogumiga;
- **kirje** on salvestatud väärtus;
- **võti** tuvastab kirje;
- **indeks** võimaldab otsida muu omaduse järgi;
- **tehing** määrab, millistesse salvedesse ja kuidas operatsioonid tehakse.

IndexedDB ei ole relatsiooniline SQL-andmebaas.

## Ava andmebaas

```js
const request = indexedDB.open("productCatalog", 1);
```

Argumendid:

- andmebaasi nimi;
- skeemi versioon.

Avamise päring annab tulemuse sündmuste kaudu:

```js
request.addEventListener("success", () => {
  const database = request.result;
  console.log("Andmebaas avatud:", database);
});

request.addEventListener("error", () => {
  console.error("Avamine ebaõnnestus:", request.error);
});
```

## Loo objektisalv versiooniuuendusel

Kui andmebaas luuakse esimest korda või versioon suureneb, toimub `upgradeneeded` sündmus:

```js
request.addEventListener("upgradeneeded", () => {
  const database = request.result;

  if (!database.objectStoreNames.contains("products")) {
    database.createObjectStore("products", {
      keyPath: "id"
    });
  }
});
```

`keyPath: "id"` tähendab, et iga toote `id` omadus on tema võti.

::: warning Andmebaasi struktuuri muudetakse versiooniuuendusel
Objektisalvede ja indeksite loomine toimub `upgradeneeded` ajal. Tavapärane andmete lugemine ja kirjutamine kasutab tehinguid.
:::

## Lisa või uuenda kirje

Pärast edukat avamist:

```js
const database = request.result;

const transaction = database.transaction(
  "products",
  "readwrite"
);

const productStore = transaction.objectStore("products");

productStore.put({
  id: 1,
  title: "Must seljakott",
  price: 39.99
});
```

`put()` lisab uue kirje või asendab sama võtmega olemasoleva kirje.

Tehingu režiimid:

- `"readonly"` lugemiseks;
- `"readwrite"` muutmiseks.

## Loe kirje võtme järgi

```js
const transaction = database.transaction(
  "products",
  "readonly"
);

const productStore = transaction.objectStore("products");
const getRequest = productStore.get(1);

getRequest.addEventListener("success", () => {
  console.log("Leitud toode:", getRequest.result);
});

getRequest.addEventListener("error", () => {
  console.error("Lugemine ebaõnnestus:", getRequest.error);
});
```

Kui kirjet ei leita, on tulemus `undefined`.

## Loe kõik kirjed

```js
const getAllRequest = productStore.getAll();

getAllRequest.addEventListener("success", () => {
  console.log("Kõik tooted:", getAllRequest.result);
});
```

Suure andmehulga puhul kasutatakse sageli kursoreid või indekseid, et mitte kõiki kirjeid korraga mällu laadida.

## Tehing on töö ühik

Tehing koondab ühe või mitme objektisalve operatsioonid:

```js
const transaction = database.transaction(
  "products",
  "readwrite"
);

transaction.addEventListener("complete", () => {
  console.log("Kõik muudatused salvestati.");
});

transaction.addEventListener("error", () => {
  console.error("Tehing ebaõnnestus:", transaction.error);
});
```

Ära eelda, et `put()` rea järel on kogu tehing juba lõpetatud. Tehingu `complete` sündmus kinnitab lõpetamise.

## Indeksid

Kui soovid otsida toodet kategooria järgi, saad versiooniuuendusel luua indeksi:

```js
const productStore = request.transaction.objectStore("products");

if (!productStore.indexNames.contains("category")) {
  productStore.createIndex("category", "category");
}
```

Seejärel saab indeksi kaudu otsida:

```js
const categoryIndex = productStore.index("category");
const categoryRequest = categoryIndex.getAll("kotid");
```

Indeks muudab teatud omaduse järgi otsimise eesmärgipäraseks, kuid lisab andmebaasi skeemile keerukust.

## IndexedDB ja Promise'id

IndexedDB algne API kasutab päringuobjekte ja sündmuseid, mitte Promise'e. Päris projektides kasutatakse sageli abiteeki, mis pakub Promise'i-põhist API-t.

Enne abiteegi kasutamist tasub mõista:

- andmebaasi versiooni;
- objektisalve;
- võtit ja indeksit;
- tehingut;
- asünkroonset õnnestumist ning viga.

## Võimalik seos tootekataloogiga

Fake Store API toodete kohalik vahemälu võiks töötada nii:

1. küsi tooted serverist;
2. salvesta edukas vastus IndexedDB-sse;
3. järgmisel avamisel kuva esmalt kohalik vahemälu;
4. proovi serverist värskemad andmed küsida;
5. uuenda andmebaasi ja vaadet.

See nõuab otsust, millal andmed aeguvad ja kumb tulemus on usaldusväärne. IndexedDB üksi ei lahenda andmete värskuse probleemi.

## Kontrolli andmebaasi DevToolsis

Chrome'i ja Chromiumi-põhistes brauserites:

1. ava DevTools;
2. vali **Application**;
3. ava **Storage → IndexedDB**;
4. vali andmebaas ja objektisalv;
5. kontrolli kirjeid ning võtmeid.

## Uurimisülesanne: üks toode andmebaasis

Koosta väike katse:

1. ava andmebaas `productCatalog`;
2. loo versioonis `1` objektisalv `products` võtmega `id`;
3. lisa üks tooteobjekt;
4. loe sama toode võtmega tagasi;
5. kontrolli kirjet DevToolsis;
6. selgita, millal toimusid `upgradeneeded`, `success` ja tehingu `complete`.

Ära ühenda seda kohe kogu tootekataloogi lahendusega. Esmalt veendu, et mõistad andmebaasi avamise, skeemi ja tehingu rolle.

## Mõtesta

1. Miks ei sobi suur tooteobjektide kogu hästi `localStorage`-isse?
2. Mis vahe on objektisalvel ja kirjel?
3. Miks vajab IndexedDB skeemi muutmine uut versiooni?
4. Miks ei tähenda `put()` rea käivitumine veel tehingu lõppemist?
5. Millise probleemi lahendab indeks?

## Kokkuvõte

- IndexedDB on brauseri asünkroonne struktureeritud andmebaas.
- Andmed paiknevad võtmetega kirjetena objektisalvedes.
- Andmebaasi skeemi muudetakse versiooniuuendusel.
- Lugemine ja kirjutamine toimub tehingutes.
- IndexedDB sobib suuremale või võrguühenduseta kasutatavale andmekogule, mitte igale väikesele eelistusele.

## Allikad

- [MDN: IndexedDB API](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API) — API kontseptsioonid ja kasutus.
- [MDN: Using IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Using_IndexedDB) — andmebaasi avamine, skeem ja tehingud.
