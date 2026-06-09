---
title: this ja meetodi väljakutse
description: Mõista, kuidas funktsiooni väljakutse viis määrab this väärtuse ning millal kasutada bind meetodit.
outline: deep
---

# `this` ja meetodi väljakutse

::: info Õpiväljund
Pärast õppetundi oskad ennustada `this` väärtust meetodi väljakutsel ning parandada objekti küljest eraldatud meetodi probleemi.
:::

`this` ei tähenda automaatselt „objekt, mille sisse funktsioon kirjutati”. Tavalise funktsiooni puhul sõltub `this` väärtus sellest, **kuidas funktsioon välja kutsutakse**.

## Meetodi väljakutse

```js
const cart = {
  items: ["Hiir"],

  getCount() {
    return this.items.length;
  }
};

console.log(cart.getCount()); // 1
```

Väljakutses `cart.getCount()` asub punktist vasakul `cart`, seega viitab `this` objektile `cart`.

## Meetodi eraldamisel kaob väljakutse objekt

```js
const getCount = cart.getCount;

// getCount(); // TypeError
```

Muutuja `getCount` viitab endiselt samale funktsioonile, kuid väljakutse pole enam kujul `cart.getCount()`. Funktsioon ei saa selle põhjal teada, et `this` peaks olema `cart`.

## `bind()` loob seotud funktsiooni

```js
const boundGetCount = cart.getCount.bind(cart);

console.log(boundGetCount()); // 1
```

`bind()` loob uue funktsiooni, mille `this` väärtus on määratud.

## Sama meetod, erinev objekt

```js
function describe() {
  return `${this.name}: ${this.role}`;
}

const student = { name: "Mari", role: "õppija", describe };
const teacher = { name: "Joonas", role: "õpetaja", describe };

console.log(student.describe());
console.log(teacher.describe());
```

Funktsioon on sama, kuid `this` väärtus sõltub väljakutse objektist.

## Noolefunktsioon käitub teisiti

Noolefunktsioon ei loo oma `this` väärtust. See kasutab ümbritseva skoobi `this` väärtust, mistõttu ei sobi see tavaliselt objektile dünaamilise meetodi kirjutamiseks.

```js
const user = {
  name: "Mari",
  getName: () => this.name
};

console.log(user.getName()); // ei tagasta ootuspäraselt "Mari"
```

Noolefunktsioon on kasulik näiteks meetodi sees callback-funktsioonina, kui soovid säilitada meetodi `this` väärtuse:

```js
class Cart {
  constructor(items) {
    this.items = items;
  }

  printItems() {
    this.items.forEach((item) => {
      console.log(this.items.length, item);
    });
  }
}
```

## Praktiline ülesanne: ennusta ja paranda

```js
const counter = {
  value: 0,

  increase() {
    this.value += 1;
    return this.value;
  }
};

const increase = counter.increase;
```

1. Ennusta `counter.increase()` tulemus.
2. Ennusta `increase()` käitumine.
3. Loo `bind()` abil funktsioon, mis suurendab endiselt `counter.value` väärtust.
4. Selgita, miks funktsioonide kood on sama, kuid tulemus erineb.

Kontrollitav tulemus: oskad tuvastada väljakutse objekti või põhjendada, miks seda ei ole.

## Kontrollpunkt

- Millest sõltub tavalise funktsiooni `this`?
- Miks võib meetodi muutujasse salvestamine selle käitumist muuta?
- Mida `bind()` tagastab?
- Miks ei sobi noolefunktsioon alati objekti meetodiks?

Järgmisena: [Kapseldamine, pärimine ja kompositsioon](/javascript/objektimudel/oop-pohimotted).

## Allikad

- [MDN: this](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this)
- [MDN: Function.prototype.bind](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind)
