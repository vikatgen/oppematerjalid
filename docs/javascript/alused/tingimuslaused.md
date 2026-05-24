# Tingimuslaused

## Õpieesmärgid

Selle peatüki lõpuks peaks õppija:

- mõistma, miks programmid peavad otsuseid tegema
- oskama kirjutada `if`, `else if` ja `else` tingimuslauseid
- oskama kasutada võrdlus- ja loogikaoperaatoreid
- mõistma `truthy` ja `falsy` väärtuste rolli tingimustes
- oskama valida lihtsa `if` ja `switch` lause vahel

## Miks tingimuslauseid vaja on?

Päris rakendus ei tee alati sama asja. Programm peab otsustama, mida teha sõltuvalt andmetest.

Näiteks:

- kas kasutaja on sisse logitud?
- kas ostukorvis on piisavalt tooteid tasuta tarne jaoks?
- kas õpilase hinne on positiivne?
- kas parool on piisavalt pikk?

Tingimuslause abil saab programm valida erineva tegevuse.

```js
const grade = 4;

if (grade >= 3) {
  console.log("Töö on arvestatud");
} else {
  console.log("Töö tuleb uuesti teha");
}
```

## `if`, `else if` ja `else`

`if` kontrollib, kas tingimus on tõene. Kui tingimus on `true`, käivitatakse selle ploki kood.

```js
const age = 17;

if (age >= 18) {
  console.log("Kasutaja on täisealine");
}
```

Kui võimalikke tulemusi on rohkem, saab kasutada `else if` ja `else` harusid.

```js
const score = 72;

if (score >= 90) {
  console.log("Väga hea");
} else if (score >= 50) {
  console.log("Arvestatud");
} else {
  console.log("Tuleb harjutada");
}
```

JavaScript kontrollib tingimusi ülevalt alla. Kui esimene sobiv tingimus leitakse, siis ülejäänud harusid enam ei kontrollita.

## Võrdlusoperaatorid

Tingimus annab tulemuseks tavaliselt `boolean` väärtuse ehk `true` või `false`.

| Operaator | Tähendus | Näide |
|---|---|---|
| `===` | võrdub väärtuse ja tüübi poolest | `age === 16` |
| `!==` | ei võrdu | `role !== "admin"` |
| `>` | suurem kui | `score > 50` |
| `<` | väiksem kui | `score < 50` |
| `>=` | suurem või võrdne | `age >= 18` |
| `<=` | väiksem või võrdne | `price <= 100` |

Kasuta üldjuhul `===`, mitte `==`, sest `===` ei tee automaatset tüübimuundamist.

```js
console.log(5 == "5");  // true
console.log(5 === "5"); // false
```

## Loogikaoperaatorid

Mitut tingimust saab ühendada loogikaoperaatoritega.

| Operaator | Tähendus | Näide |
|---|---|---|
| `&&` | ja | vanus on vähemalt 18 ja kasutaja on aktiivne |
| `||` | või | kasutaja on admin või õpetaja |
| `!` | mitte | kasutaja ei ole sisse logitud |

```js
const age = 17;
const hasPermission = true;

if (age >= 16 && hasPermission) {
  console.log("Saab osaleda");
}
```

```js
const role = "teacher";

if (role === "admin" || role === "teacher") {
  console.log("Ligipääs lubatud");
}
```

```js
const isLoggedIn = false;

if (!isLoggedIn) {
  console.log("Palun logi sisse");
}
```

## `switch`

`switch` sobib siis, kui kontrollitakse ühe muutuja mitut kindlat väärtust.

```js
const day = "esmaspäev";

switch (day) {
  case "esmaspäev":
    console.log("Nädal algab");
    break;
  case "reede":
    console.log("Nädal hakkab lõppema");
    break;
  default:
    console.log("Tavaline koolipäev");
}
```

`break` lõpetab vastava haru. Kui `break` puudub, liigub kood järgmisesse harusse edasi.

## Levinud vead

Võrdlemise asemel kasutatakse kogemata omistamist:

```js
let age = 16;

if (age = 18) {
  console.log("See tingimus töötab valesti");
}
```

Õige on kasutada võrdlusoperaatorit:

```js
if (age === 18) {
  console.log("Kasutaja on 18-aastane");
}
```

Teine levinud viga on liiga keeruline tingimus. Kui tingimus muutub raskesti loetavaks, tasub osa sellest panna eraldi muutujasse.

```js
const hasEnoughPoints = score >= 50;
const hasSubmittedWork = true;

if (hasEnoughPoints && hasSubmittedWork) {
  console.log("Töö on arvestatud");
}
```

## Harjutused

1. Kirjuta tingimus, mis kontrollib, kas hinne on positiivne.
2. Kirjuta tingimus, mis kontrollib, kas kasutaja nimi ei ole tühi.
3. Loo muutuja `cartTotal` ja kontrolli, kas tasuta tarne rakendub alates 50 eurost.
4. Kirjuta `switch`, mis väljastab nädalapäeva põhjal erineva sõnumi.
