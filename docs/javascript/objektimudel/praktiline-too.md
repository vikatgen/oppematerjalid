---
title: Praktiline töö – ostukorvi mudel
description: Võrdle funktsioonidel ja klassidel põhinevat ostukorvi ning põhjenda valitud objektimudelit.
outline: deep
---

# Praktiline töö: ostukorvi mudel

::: info Õpiväljund
Pärast praktilist tööd oskad joonistada lahenduse objektide ja prototüüpide seosed ning põhjendada, kas klassid aitavad ülesannet lahendada.
:::

Sinu ülesanne on modelleerida tootekataloogi ostukorv kahel viisil. Eesmärk ei ole tõestada, et üks stiil on alati parem, vaid võrrelda lahenduste vastutusi ja seoseid.

## Nõuded

Ostukorv peab võimaldama:

- toodet lisada;
- toodet eemaldada ID järgi;
- leida toodete arvu;
- arvutada koguhinna;
- takistada vigase hinnaga toote lisamist.

Kasuta kontrollimiseks vähemalt järgmisi andmeid:

```js
const keyboard = { id: 1, title: "Klaviatuur", price: 49.9 };
const mouse = { id: 2, title: "Hiir", price: 24.9 };
```

## Lahendus A: andmed ja eraldi funktsioonid

Kasuta tavalist massiivi ning funktsioone, mis saavad ostukorvi argumendina.

```js
const cart = [];

function addProduct(cart, product) {
  // Täienda.
}
```

## Lahendus B: klass

Loo `Cart` klass, mis kapseldab toodete massiivi ja pakub samu tegevusi meetoditena.

```js
class Cart {
  #items = [];

  add(product) {
    // Täienda.
  }
}
```

## Kontrolljuhtumid

Mõlemad lahendused peavad andma samad tulemused:

| Tegevus | Oodatav tulemus |
|---|---|
| tühi ostukorv | arv `0`, koguhind `0` |
| lisa klaviatuur ja hiir | arv `2`, koguhind `74.8` |
| eemalda ID-ga `1` | ostukorvi jääb hiir |
| eemalda puuduv ID | programm ei jookse kokku |
| lisa negatiivse hinnaga toode | lisamine ebaõnnestub arusaadavalt |

## Joonista objektimudel

Joonista klassilahenduse kohta:

- muutuja, mis viitab `Cart` instantsile;
- instantsi oma omadused;
- `Cart.prototype`;
- vähemalt üks prototüübist leitav meetod;
- toodete massiiv ja selle seos `Array.prototype` objektiga.

## Põhjenda lahendust

Vasta:

1. Milline lahendus on selle ülesande puhul lihtsam lugeda?
2. Millist reeglit klass kapseldab?
3. Kust leiab `Cart` instants meetodi `add()`?
4. Kust leiab toodete massiiv meetodi `push()`?
5. Kas rakendus vajab mitut sõltumatut ostukorvi?
6. Millise probleemi klass lahendab ja millist lisakeerukust see tekitab?

## Valmis töö tunnused

- mõlemad lahendused läbivad samad kontrolljuhtumid;
- funktsioonidega lahendus ei sõltu klassist;
- klassilahenduse sisemist massiivi ei muudeta väljast otse;
- õppija oskab omaduse otsimise teekonna joonisel lahti seletada;
- valitud lahendus on põhjendatud ülesande vajadustega.

::: tip Dokumentatsioon on lubatud
Meetodite süntaksit ei pea peast mäletama. Oluline on osata leida sobiv dokumentatsioon, rakendada meetodit ja selgitada selle mõju objektile.
:::

## Edasine mõtestamine

- Mis muutuks, kui ostukorv peaks andmed `localStorage`-isse salvestama?
- Kas salvestamine peaks olema `Cart` alamklass või eraldi objekt, mida ostukorv kasutab?
- Miks on API-st saadud toodete massiiv endiselt massiiv, kuigi selle elemendid on tavalised objektid?

## Allikad

- [MDN: Working with objects](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_objects)
- [MDN: Classes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes)
