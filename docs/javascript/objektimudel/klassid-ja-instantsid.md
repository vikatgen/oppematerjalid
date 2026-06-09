---
title: Klassid ja instantsid
description: Loo klassiga sama struktuuri ja jagatud käitumisega objekte ning seosta klass prototüüpidega.
outline: deep
---

# Klassid ja instantsid

::: info Õpiväljund
Pärast õppetundi oskad luua klassist instantse ning selgitada, kuidas klassi meetodid seostuvad prototüübiga.
:::

Klass kirjeldab, kuidas luua sama tüüpi andmete ja käitumisega objekte. JavaScripti `class` süntaks kasutab taustal prototüübilist objektimudelit.

## Klass ja `new`

```js
class Product {
  constructor(id, title, price) {
    this.id = id;
    this.title = title;
    this.price = price;
  }

  getLabel() {
    return `${this.title}: ${this.price} €`;
  }
}

const keyboard = new Product(1, "Klaviatuur", 49.9);
const mouse = new Product(2, "Hiir", 24.9);
```

- `Product` on klass;
- `keyboard` ja `mouse` on instantsid;
- `constructor` seadistab uue objekti algoleku;
- `new` loob objekti ja käivitab konstruktori;
- `getLabel()` on instantsidele jagatud meetod.

## Instantsi andmed, prototüübi meetodid

```js
console.log(Object.hasOwn(keyboard, "title"));    // true
console.log(Object.hasOwn(keyboard, "getLabel")); // false

console.log(
  Object.getPrototypeOf(keyboard) === Product.prototype
); // true

console.log(
  keyboard.getLabel === mouse.getLabel
); // true
```

Igal instantsil on oma `title` ja `price`, kuid mõlemad leiavad sama `getLabel()` funktsiooni `Product.prototype` kaudu.

```text
keyboard ─┐
          ├─> Product.prototype ─> Object.prototype ─> null
mouse ────┘
```

## `instanceof` uurib prototüübiahelat

```js
console.log(keyboard instanceof Product); // true
console.log(keyboard instanceof Object);  // true
console.log([] instanceof Array);         // true
console.log([] instanceof Object);        // true
```

`instanceof` kontrollib, kas konstruktori `prototype` objekt asub väärtuse prototüübiahelas. See selgitab ka seda, miks massiiv on korraga `Array` instants ja objekt.

## Staatiline meetod kuulub klassile

```js
class Product {
  static isValidPrice(price) {
    return typeof price === "number" && price >= 0;
  }
}

console.log(Product.isValidPrice(10)); // true
```

Staatiline meetod kuulub klassile endale, mitte üksikule instantsile. `Array.isArray()` on sama põhimõtte tuttav näide.

## Millal klassi vaja ei ole?

Kui lood ainult ühe lihtsa andmeobjekti või töötled serverist saadud andmeid eraldi funktsioonidega, võib klass lisada rohkem süntaksit kui selgust.

```js
const product = { id: 1, title: "Hiir", price: 25 };

function getProductLabel(product) {
  return `${product.title}: ${product.price} €`;
}
```

Klass on töövahend korduva struktuuri, jagatud käitumise ja selgete reeglite väljendamiseks, mitte automaatselt parem objekt.

## Praktiline ülesanne: kursuse instantsid

Loo klass `Course`, mille:

- konstruktor saab kursuse nime ja maksimaalse õppijate arvu;
- igal instantsil on oma `students` massiiv;
- meetod `addStudent(name)` lisab õppija, kui ruumi on;
- meetod `getRemainingPlaces()` tagastab vabade kohtade arvu.

Kontrolli vähemalt kahe instantsiga, et ühe kursuse õppijad ei ilmu teise kursuse massiivi.

Kontrollitav tulemus: oskad näidata instantsi oma omadusi ja klassi prototüübil olevat jagatud meetodit.

## Kontrollpunkt

- Mida `new` klassiga kasutamisel loob?
- Millised väärtused kuuluvad tavaliselt instantsile ja millised prototüübile?
- Mida `instanceof` tegelikult kontrollib?
- Miks on `[] instanceof Object` tõene?

Järgmisena: [`this` ja meetodi väljakutse](/javascript/objektimudel/this-ja-meetodid).

## Allikad

- [MDN: Classes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes)
- [MDN: instanceof](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/instanceof)
