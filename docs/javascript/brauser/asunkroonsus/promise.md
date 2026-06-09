---
title: Promise
description: Õpi töötlema tulevikus õnnestuvat või ebaõnnestuvat asünkroonset tulemust.
outline: deep
---

# Promise

::: info Õpiväljund
Pärast õppetundi oskad ühendada olemasoleva `Promise` objektiga õnnestumise ja ebaõnnestumise töötlejad ning jälgida tulemuse liikumist ahelas.
:::

Asünkroonne tegevus ei anna lõpptulemust kohe. JavaScript kasutab tulevikus valmiva tulemuse kirjeldamiseks sageli **Promise'i** ehk lubadust.

Selles tunnis kasutad olemasolevaid Promise'e. Uue `Promise` objekti käsitsi konstrueerimine on keerulisem võte; tunnis antakse vajalik konstruktsioon valmis töövahendina.

## Eeldused ja töövahendid

- Oskad selgitada, miks asünkroonne tulemus saabub hiljem.
- Oskad kasutada funktsioone ja nende tagastusväärtuseid.
- Oskad jälgida Console'i väljundite järjekorda.
- Soovituslik kestus on 60–75 minutit.

## Promise kirjeldab tulevast tulemust

Promise võib olla kolmes olekus:

- **pending** – tegevus on pooleli;
- **fulfilled** – tegevus õnnestus ja tulemus on olemas;
- **rejected** – tegevus ebaõnnestus ning olemas on vea põhjus.

Kui Promise on fulfilled või rejected olekus, on see lõppenud ega muutu enam teiseks.

## Olemasolev Promise taimerist

Järgmine abifunktsioon tagastab Promise'i:

```js
function wait(milliseconds) {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
}
```

Selle funktsiooni sisemine konstruktsioon on siin antud töövahend. Keskendu tagastatud Promise'i kasutamisele:

```js
const waitPromise = wait(1000);

console.log(waitPromise);
```

Vahetult pärast loomist on Promise tavaliselt `pending`.

## Töötle õnnestumist `.then()` abil

```js
wait(1000).then(() => {
  console.log("Üks sekund möödus.");
});

console.log("Taimer käivitati.");
```

Console:

```text
Taimer käivitati.
Üks sekund möödus.
```

`.then()` saab funktsiooni, mis käivitub Promise'i õnnestumisel.

## Promise võib anda väärtuse

Kasuta tunni jaoks antud abifunktsiooni:

```js
function getDemoProducts() {
  return wait(1000).then(() => {
    return [
      { id: 1, title: "Must seljakott" },
      { id: 2, title: "Hall T-särk" }
    ];
  });
}
```

Töötle väärtust:

```js
getDemoProducts().then((products) => {
  console.log("Tooted:", products);
});
```

Promise'i tulemus jõuab `.then()` töötleja parameetrisse.

## Tagastusväärtus liigub järgmisse `.then()` töötlejasse

```js
getDemoProducts()
  .then((products) => {
    return products.length;
  })
  .then((productCount) => {
    console.log("Toodete arv:", productCount);
  });
```

Iga `.then()` tagastab uue Promise'i. Töötleja tagastusväärtusest saab ahela järgmise sammu tulemus.

::: tip Promise'i ahel kirjeldab sammude järjekorda
Kasuta tagastamist, et järgmine samm saaks eelmise sammu tulemuse. Ära peida tulemusi tarbetult globaalsetesse muutujatesse.
:::

## Töötle ebaõnnestumist `.catch()` abil

Kasuta harjutuseks funktsiooni, mis mõnikord tagastab rejected Promise'i:

```js
function getDemoProducts(shouldFail) {
  return wait(1000).then(() => {
    if (shouldFail) {
      throw new Error("Näidistoodete laadimine ebaõnnestus.");
    }

    return [
      { id: 1, title: "Must seljakott" },
      { id: 2, title: "Hall T-särk" }
    ];
  });
}
```

Käsitle viga:

```js
getDemoProducts(true)
  .then((products) => {
    console.log("Tooted:", products);
  })
  .catch((error) => {
    console.error("Laadimise viga:", error.message);
  });
```

`.catch()` käivitub, kui:

- algne Promise ebaõnnestub;
- mõni eelnev `.then()` töötleja viskab vea;
- mõni eelnev samm tagastab ebaõnnestunud Promise'i.

## Lõpeta töövoog `.finally()` abil

```js
getDemoProducts(false)
  .then((products) => {
    console.log("Tooted:", products);
  })
  .catch((error) => {
    console.error(error.message);
  })
  .finally(() => {
    console.log("Laadimiskatse lõppes.");
  });
```

`.finally()` käivitub nii õnnestumise kui ebaõnnestumise järel. See sobib näiteks laadimisnupu uuesti lubamiseks.

## Tagasta Promise ahelast

Kui `.then()` sees algab järgmine asünkroonne samm, tagasta selle Promise:

```js
wait(500)
  .then(() => {
    console.log("Esimene ootus valmis.");
    return wait(500);
  })
  .then(() => {
    console.log("Teine ootus valmis.");
  });
```

Kui `return` puudub, ei oota järgmine `.then()` sisemist tegevust.

## Levinud vead

### Tulemust proovitakse kasutada liiga vara

```js
let products;

getDemoProducts(false).then((result) => {
  products = result;
});

console.log(products); // tõenäoliselt undefined
```

### Viga jäetakse käsitlemata

```js
getDemoProducts(true).then((products) => {
  console.log(products);
});
```

Rejected Promise võib tekitada Console'is käsitlemata Promise'i vea.

### Töötleja tagastus unustatakse

```js
getDemoProducts(false)
  .then((products) => {
    products.length;
  })
  .then((count) => {
    console.log(count); // undefined
  });
```

## Praktiline ülesanne: simuleeritud toodete laadimine Promise'iga

Kasuta antud `wait()` ja `getDemoProducts(shouldFail)` funktsioone. Täienda tootekataloogi laadimisnuppu.

### Nõuded

1. Nupu vajutamisel käivitatakse `getDemoProducts(shouldFail)`.
2. Õnnestumisel antakse tooted `renderProducts()` funktsioonile.
3. Õnnestumisel kuvatakse toodete arv.
4. Ebaõnnestumisel kuvatakse arusaadav veateade.
5. `.finally()` lubab laadimisnupu uuesti.
6. Lahenduses ei kasutata asünkroonse tulemuse edastamiseks globaalset ajutist muutujat.

### Piirjuhud

Kontrolli:

- Promise õnnestub;
- Promise ebaõnnestub;
- tagastatud toodete massiiv on tühi;
- `.then()` töötlejas tekib tahtlik viga;
- laadimisnuppu proovitakse ootamise ajal uuesti vajutada.

### Vihjed

::: details Vihje 1
Pane `renderProducts(products)` õnnestumise `.then()` töötlejasse.
:::

::: details Vihje 2
Vea tekst asub `error.message` väärtuses.
:::

::: details Vihje 3
Nupu uuesti lubamine sobib `.finally()` töötlejasse.
:::

### Kontrollitav tulemus

Valmis töös:

- jõuab Promise'i väärtus õigesse töötlejasse;
- kuvatakse õnnestumisel tooted ja ebaõnnestumisel veateade;
- lõpeb laadimisolek mõlemal juhul;
- oskad selgitada fulfilled, rejected ja pending olekut;
- oskad näidata, kuidas tagastusväärtus liigub Promise'i ahelas.

## Mõtesta

1. Miks ei saa Promise'i tulemust kasutada kohe järgmisel real?
2. Mida teeb `.then()` töötleja tagastusväärtus?
3. Milliste vigade puhul käivitub ahela lõpus olev `.catch()`?
4. Miks sobib `.finally()` laadimisnupu lubamiseks?

## Laiendus

Lisa ahelasse samm, mis tagastab ainult toodete nimedest koosneva uue massiivi. Kasuta selle koostamiseks tsüklit, mille tööd saad rida-realt jälgida.

## Kokkuvõte

- Promise kirjeldab tulevikus õnnestuvat või ebaõnnestuvat tulemust.
- `.then()` töötleb õnnestumist ja annab väärtuse järgmisele sammule.
- `.catch()` töötleb ahela ebaõnnestumist.
- `.finally()` käivitub mõlema lõpptulemuse järel.
- Asünkroonse sammu Promise tuleb ahelast tagastada.

## Edasi

Järgmises tunnis kirjutad sama asünkroonse töövoo loetavamalt [`async` ja `await` abil](./async-await.md).

## Allikad

- [MDN: Using promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises) — Promise'i ahelad ja vigade käsitlemine.
- [MDN: `Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) — Promise'i olekud ja meetodid.
