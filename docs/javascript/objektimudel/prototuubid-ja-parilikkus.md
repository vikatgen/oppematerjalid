---
title: Prototüübid ja pärilikkus
description: Mõista, kuidas JavaScript otsib omadusi prototüübiahelast ning kuidas massiiv pärib meetodid.
outline: deep
---

# Prototüübid ja pärilikkus

::: info Õpiväljund
Pärast õppetundi oskad jälgida omaduse otsimist prototüübiahelas ning selgitada, kust massiiv saab `push()` meetodi.
:::

JavaScripti objekt ei pea kõiki kasutatavaid meetodeid ise sisaldama. Kui omadust objektil endal ei ole, otsib JavaScript seda objekti **prototüübist** ja vajadusel prototüübiahelast edasi.

## Oma omadus ja päritud omadus

```js
const student = {
  name: "Mari"
};

console.log(student.name);     // oma omadus
console.log(student.toString); // päritud meetod
```

`name` asub objektil `student`. `toString()` leitakse prototüübiahelast.

```js
console.log(Object.hasOwn(student, "name"));     // true
console.log(Object.hasOwn(student, "toString")); // false
```

## Omaduse otsimise teekond

Kui käivitad `student.toString()`, toimub lihtsustatud kujul järgmine:

1. otsi `toString` omadust objektil `student`;
2. kui seda pole, otsi objekti prototüübist;
3. jätka ahelas, kuni omadus leitakse;
4. kui ahel lõpeb, on tulemuseks `undefined`.

```js
console.log(Object.getPrototypeOf(student) === Object.prototype); // true
console.log(Object.getPrototypeOf(Object.prototype)); // null
```

`null` tähistab siin prototüübiahela lõppu.

## Kust massiiv saab meetodid?

```js
const grades = [4, 5, 3];

console.log(Object.hasOwn(grades, "push")); // false
console.log(Object.getPrototypeOf(grades) === Array.prototype); // true
console.log(typeof Array.prototype.push); // "function"
```

Massiiv ei sisalda igast meetodist eraldi koopiat. Massiivid pärivad ühised meetodid objektilt `Array.prototype`.

```text
grades
  └─> Array.prototype
        └─> Object.prototype
              └─> null
```

Seetõttu saab massiiv kasutada:

- `push()` ja `map()` meetodeid `Array.prototype` kaudu;
- `toString()` meetodit veel kaugemalt `Object.prototype` kaudu.

See on **prototüübiline pärilikkus**: objekt saab kasutada teise objekti kaudu leitavaid omadusi.

## Oma omadus võib päritud omaduse varjutada

```js
const product = {
  toString() {
    return "Toode";
  }
};

console.log(product.toString()); // "Toode"
```

JavaScript leiab `toString` meetodi juba objektilt endalt ega liigu prototüübiahelas edasi.

## Loo prototüübiga objekt

```js
const productActions = {
  getLabel() {
    return `${this.title}: ${this.price} €`;
  }
};

const product = Object.create(productActions);
product.title = "Hiir";
product.price = 25;

console.log(product.getLabel());
```

`product` sisaldab oma andmeid, kuid `getLabel()` leitakse objektilt `productActions`.

## Praktiline ülesanne: joonista ahel

Uuri järgmisi väärtusi:

```js
const values = [
  { name: "Mari" },
  [4, 5],
  new Date()
];

for (const value of values) {
  console.log(Object.getPrototypeOf(value));
}
```

Joonista iga väärtuse prototüübiahel kuni `null` väärtuseni. Märgi juurde, kust leitakse:

- tavalise objekti `toString()`;
- massiivi `push()`;
- kuupäeva `getFullYear()`.

Kontrollitav tulemus: oskad näidata, milline omadus kuulub objektile endale ja milline leitakse prototüübist.

::: details Ennusta
Kas järgmine avaldis on `true` või `false`?

```js
Array.prototype.isPrototypeOf([]);
```

Vastus on `true`, sest massiivil loodud objekt pärib `Array.prototype` objektilt.
:::

## Kontrollpunkt

- Mis juhtub, kui JavaScript ei leia omadust objektilt endalt?
- Kust saab massiiv `push()` meetodi?
- Miks jõuab massiivi prototüübiahel ka `Object.prototype` objektini?
- Mis vahe on objekti oma omadusel ja päritud omadusel?

Järgmisena: [Klassid ja instantsid](/javascript/objektimudel/klassid-ja-instantsid).

## Allikad

- [MDN: Inheritance and the prototype chain](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Inheritance_and_the_prototype_chain)
- [MDN: Object.getPrototypeOf](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getPrototypeOf)
