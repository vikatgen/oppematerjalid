---
title: Kapseldamine, pärimine ja kompositsioon
description: Rakenda OOP põhimõtteid ning põhjenda pärimise ja kompositsiooni valikut.
outline: deep
---

# Kapseldamine, pärimine ja kompositsioon

::: info Õpiväljund
Pärast õppetundi oskad kasutada kapseldamist ja klassipärimist ning põhjendada, millal eelistada pärimisele kompositsiooni.
:::

Objektorienteeritud programmeerimine ehk OOP korraldab programmi objektide ümber, mis seovad oleku ja sellega seotud käitumise. JavaScripti klassid kasutavad selle väljendamiseks prototüübilist objektimudelit.

## Kapseldamine kaitseb objekti reegleid

Kapseldamine tähendab, et objekt kontrollib ise, kuidas tema olekut muuta.

```js
class Cart {
  #items = [];

  add(product) {
    if (!product || product.price < 0) {
      throw new Error("Vigane toode");
    }

    this.#items.push(product);
  }

  getCount() {
    return this.#items.length;
  }

  getItems() {
    return [...this.#items];
  }
}
```

Privaatset välja `#items` ei saa klassist väljast otse muuta. Avalikud meetodid kirjeldavad lubatud tegevusi ja saavad enne muutmist reegleid kontrollida.

## Klassipärimine kasutab prototüübiahelat

```js
class Product {
  constructor(title, price) {
    this.title = title;
    this.price = price;
  }

  getLabel() {
    return `${this.title}: ${this.price} €`;
  }
}

class DigitalProduct extends Product {
  constructor(title, price, downloadUrl) {
    super(title, price);
    this.downloadUrl = downloadUrl;
  }

  getDownloadUrl() {
    return this.downloadUrl;
  }
}
```

`extends` ühendab klasside prototüübid:

```text
digitalProduct
  └─> DigitalProduct.prototype
        └─> Product.prototype
              └─> Object.prototype
                    └─> null
```

Seetõttu saab `DigitalProduct` instants kasutada nii enda kui ka `Product` klassi meetodeid.

`super()` käivitab ülemklassi konstruktori. Tuletatud klassi konstruktor peab kutsuma `super()` enne `this` kasutamist.

## Meetodi ülekirjutamine

Alamklass võib päritud meetodi oma versiooniga varjutada:

```js
class DigitalProduct extends Product {
  getLabel() {
    return `${super.getLabel()} (digitaalne)`;
  }
}
```

JavaScript leiab esmalt lähima meetodi. `super.getLabel()` võimaldab kutsuda ülemklassi versiooni.

## Pärimine kirjeldab „on üks liik” seost

Pärimine sobib, kui alamklass on tõepoolest üldisema mõiste eriliik ja peab järgima sama kokkulepet.

```text
DigitalProduct on Product
```

Pärimine loob klasside vahel tugeva seose. Kui ülemklass muutub, võib see mõjutada kõiki alamklasse.

## Kompositsioon kirjeldab „kasutab” või „sisaldab” seost

```js
class Cart {
  constructor(storage) {
    this.storage = storage;
  }

  add(product) {
    this.storage.save(product);
  }
}
```

```text
Cart kasutab storage objekti
```

Kompositsioon ühendab koostööd tegevad objektid ilma neid üheks pärilikkusahelaks muutmata. See on sageli paindlikum, sest kasutatava osa saab asendada.

## Kas massiivi pärilikkus ja klassipärimine on sama asi?

Mõlemad kasutavad JavaScripti prototüübiahelat:

- massiiv pärib meetodid `Array.prototype` kaudu;
- `extends` ühendab alamklassi prototüübi ülemklassi prototüübiga.

Erinevus on selles, et massiivi erikäitumine on JavaScripti käivituskeskkonna sisseehitatud osa. Oma klasside puhul kujundad objektide reeglid ja seosed ise.

## Praktiline ülesanne: vali seos

Modelleeri:

- `Product`;
- `DigitalProduct`;
- `Cart`;
- salvestusobjekt, millel on `save()` meetod.

Kasuta pärimist ainult seal, kus saad lõpetada lause „X on Y liik”. Kasuta kompositsiooni seal, kus saad öelda „X kasutab Y-d”.

Kontrollitav tulemus: oskad koodi ja prototüübiahela abil põhjendada, milline käitumine on päritud ning milline objekt teisele edastati.

## Kontrollpunkt

- Millist probleemi kapseldamine lahendab?
- Kuidas `extends` seostub prototüübiahelaga?
- Millal on pärimine sobiv?
- Miks võib kompositsioon olla paindlikum?

Järgmisena: [Praktiline töö: ostukorvi mudel](/javascript/objektimudel/praktiline-too).

## Allikad

- [MDN: Private elements](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Private_elements)
- [MDN: extends](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/extends)
