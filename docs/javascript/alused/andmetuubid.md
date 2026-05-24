# JavaScripti andmetüübid

## Õpieesmärgid

Selle peatüki lõpuks peaks õppija:

- oskama nimetada JavaScripti põhilisi andmetüüpe
- mõistma primitiivide ja objektide erinevust
- oskama kasutada `typeof` operaatorit tüübi kontrollimiseks
- mõistma, miks `null` ja `undefined` tähendavad erinevaid asju
- oskama tuua näiteid stringide, numbrite, objektide ja massiivide meetoditest
- mõistma, miks `===` on turvalisem kui `==`

JavaScriptis on **8 põhitüüpi**, mis jagunevad kaheks: **primitiivid** ja **objektid**.

**Primitiivsed andmetüübid (Väärtuspõhised)**

Primitiivid on mälus kergekaalulised ja hoiavad ühte konkreetset väärtust. JavaScriptis on **7 primitiivset tüüpi:**

- **`Number`** — kasutatakse nii täisarvude kui ka ujukomaarvude jaoks (piiranguga ±2⁵³). Lisaks tavalistele arvudele on olemas eriväärtused: `Infinity`, `-Infinity` ja `NaN` (*Not a Number*).
- **`BigInt`** — võimaldab töötada suvalise pikkusega täisarvudega, mis ületavad `Number` tüübi piire.
- **`String`** — teksti jaoks. JavaScriptis puudub eraldi tüüp üksiku sümboli jaoks. Teksti saab ümbritseda kolme tüüpi jutumärkidega, kusjuures *backticks* (`` ` ``) võimaldab teksti sisse panna muutujaid (`${...}`).
- **`Boolean`** — ainult kaks väärtust: `true` (tõene) ja `false` (väär).
- **`null`** — iseseisev tüüp, millel on vaid üks väärtus `null`. Tähistab tavaliselt *"tühja"* või *"teadmata"* väärtust.
- **`undefined`** — iseseisev tüüp väärtusega `undefined`. Tähendab, et muutuja on deklareeritud, kuid sellele pole veel väärtust omistatud.
- **`Symbol`** — kasutatakse objektidele unikaalsete identifikaatorite loomiseks.

**Objektid (Viitepõhised)**

Erinevalt primitiividest kasutatakse **`Object`** tüüpi andmekogumite ja keerukamate olemite salvestamiseks. Objektide alla kuuluvad ka erivormid nagu **massiivid** (*Arrays*) ja **funktsioonid**.

**Primitiivide "objekt-ümbrised"**

Kuigi primitiivid peavad olema kiired ja kerged, lubab JavaScript neil kasutada meetodeid (nt `str.toUpperCase()`). Selleks luuakse meetodi väljakutsumise hetkel ajutine **objekt-ümbris** (`String`, `Number`, `Boolean`, `Symbol`), mis pärast operatsiooni sooritamist kohe hävitatakse.

> `null` ja `undefined` puhul selliseid ümbriseid pole — neil **puuduvad meetodid**.

**Andmetüübid ja nende sisseehitatud meetodid**

Iga andmetüübiga tulevad kaasa kindlad tööriistad ehk **meetodid**, mida saab selle väärtuse peal kasutada. Meetod on funktsioon, mis kuulub mingi väärtuse või objekti juurde.

Näiteks stringi puhul saame muuta teksti suurteks tähtedeks:

```js
const nimi = "mari";

console.log(nimi.toUpperCase()); // "MARI"
```

Massiivide puhul saame andmeid läbi käia, filtreerida või muuta:

```js
const hinded = [2, 4, 5, 3, 5];

const positiivsedHinded = hinded.filter((hinne) => hinne >= 3);
console.log(positiivsedHinded); // [4, 5, 3, 5]

const hindedTekstina = hinded.map((hinne) => `Hinne: ${hinne}`);
console.log(hindedTekstina); // ["Hinne: 2", "Hinne: 4", "Hinne: 5", "Hinne: 3", "Hinne: 5"]
```

See on oluline, sest päris rakendustes ei kirjuta me kõike nullist ise. JavaScript annab meile juba palju valmis tööriistu:

| Tüüp | Näited meetoditest | Milleks kasutatakse? |
|---|---|---|
| `String` | `toUpperCase()`, `toLowerCase()`, `trim()`, `includes()` | teksti muutmine ja otsimine |
| `Number` | `toFixed()`, `toString()` | arvude vormindamine ja tekstiks muutmine |
| `Array` | `map()`, `filter()`, `find()`, `includes()`, `push()` | nimekirjade töötlemine |
| `Object` | `Object.keys()`, `Object.values()`, `Object.entries()` | objekti võtmete ja väärtuste lugemine |

Näiteks veebivormi kontrollimisel võib `trim()` aidata eemaldada kasutaja sisestatud üleliigsed tühikud:

```js
const email = "  mari@example.com  ";

console.log(email.trim()); // "mari@example.com"
```

::: info Pea meeles
Meetodid sõltuvad andmetüübist. Stringil on tekstiga seotud meetodid, massiivil on nimekirjaga seotud meetodid. `null` ja `undefined` ei luba meetodeid kasutada, sest nende väärtus tähendab, et tegelikku andmeobjekti pole olemas.
:::

**Massiivid ja objektid päris rakenduses**

Massiiv sobib nimekirjade jaoks. Näiteks klassi hinded, ostukorvi tooted või kasutaja teavitused.

```js
const cartItems = ["hiir", "klaviatuur", "monitor"];

console.log(cartItems.length); // 3
console.log(cartItems.includes("monitor")); // true
```

Objekt sobib ühe asja omaduste kirjeldamiseks. Näiteks kasutaja, toode või õpilane.

```js
const student = {
  name: "Marta",
  age: 16,
  isActive: true
};

console.log(student.name); // "Marta"
console.log(Object.keys(student)); // ["name", "age", "isActive"]
```

**`typeof` operaator**

Tüübi kontrollimiseks kasutatakse `typeof` operaatorit, mis tagastab tüübi nime sõnena:
```js
typeof 42;        // "number"
typeof "tere";    // "string"
typeof true;      // "boolean"
typeof undefined; // "undefined"
typeof null;      // "object"
typeof alert;     // "function"
```

Kaks olulist eripära:

- **`typeof null`** tagastab `"object"` — see on keele algusaegadest pärit **viga**, mis on säilitatud ühilduvuse huvides, kuigi `null` ei ole tegelikult objekt.
- **`typeof alert`** tagastab `"function"`, kuigi funktsioonid on tehniliselt objektid.

**Tüübimuundamine (Type Conversion)**

JavaScriptis saab tüüpe muuta kahel viisil: **eksplitsiitselt** (teadlikult) või **implitsiitselt** (automaatselt).

*Eksplitsiitne muundamine (Explicit Conversion)*

Arendaja muundab tüübi ise, kasutades sisseehitatud funktsioone:
```js
String(123);       // "123"
String(true);      // "true"
String(null);      // "null"

Number("42");      // 42
Number("tere");    // NaN
Number(true);      // 1
Number(false);     // 0
Number(null);      // 0
Number(undefined); // NaN

Boolean(1);        // true
Boolean(0);        // false
Boolean("");       // false
Boolean("tere");   // true
Boolean(null);     // false
```

*Implitsiitne muundamine (Implicit Coercion)*

JavaScript muundab tüüpe automaatselt, kui operandid ei ühti. See võib tekitada ootamatuid tulemusi:
```js
"5" + 1;   // "51"  — number muundatakse stringiks
"5" - 1;   // 4     — string muundatakse numbriks
"5" * "2"; // 10    — mõlemad muundatakse numbriks
true + 1;  // 2     — boolean muundatakse numbriks
false + 1; // 1
```

> `+` operaator eelistab string-ühendamist, kuid `-`, `*`, `/` eelistavad arvulist tehet — seega käituvad need erinevalt.

**Matemaatilised ja võrdlusoperaatorid**

Andmetüübid mõjutavad seda, kuidas operaatorid töötavad. Numbritega kasutatakse matemaatilisi operaatoreid:

```js
const price = 20;
const discount = 5;

console.log(price + discount); // 25
console.log(price - discount); // 15
console.log(price * 2);        // 40
console.log(price / 4);        // 5
console.log(price % 6);        // 2
```

`%` on jäägi operaator. Seda kasutatakse näiteks kontrollimiseks, kas arv jagub kahega:

```js
const number = 8;

console.log(number % 2 === 0); // true
```

Võrdlusoperaatorid annavad tulemuseks alati `boolean` väärtuse ehk `true` või `false`:

```js
const age = 17;

console.log(age >= 16); // true
console.log(age < 18);  // true
console.log(age === 17); // true
```

**Truthy ja falsy väärtused**

Kui väärtust kasutatakse tingimuslauses, muudab JavaScript selle vajadusel `boolean` väärtuseks. Mõned väärtused käituvad nagu `false`; neid nimetatakse **falsy** väärtusteks.

| Väärtus | Boolean väärtus |
|---|---|
| `false` | `false` |
| `0` | `false` |
| `""` | `false` |
| `null` | `false` |
| `undefined` | `false` |
| `NaN` | `false` |

Kõik ülejäänud väärtused on üldiselt **truthy**:

```js
Boolean("tere"); // true
Boolean(42);     // true
Boolean([]);     // true
Boolean({});     // true
```

See on oluline näiteks vormi kontrollimisel:

```js
const userName = "";

if (!userName) {
  console.log("Kasutajanimi on puudu");
}
```

**Range võrdlus: `===` vs `==`**

`==` (*loose equality*) teeb enne võrdlemist automaatse tüübimuundamise, mis võib anda üllatavaid tulemusi. `===` (*strict equality*) kontrollib nii **väärtust** kui ka **tüüpi** — muundamist ei toimu.
```js
0 == "0";   // true | string muundatakse numbriks
0 === "0";  // false | eri tüübid

1 == true;  // true | boolean muundatakse numbriks
1 === true; // false

null == undefined;  // true 
null === undefined; // false
```

> **Hea tava:** kasuta alati `===`, välja arvatud juhul, kui soovid teadlikult kontrollida nii `null` kui `undefined` korraga (ainus põhjendatud `==` kasutus).
```js
// Ainus levinud erand — kontrollib mõlemat korraga:
if (value == null) {
  // value on kas null või undefined
}
```

**`null` vs `undefined` — praktiline erinevus**

Mõlemad tähistavad "väärtuse puudumist", kuid nende tähendus ja kasutus on erinev.

`undefined` tekib **automaatselt**, kui muutuja on deklareeritud, kuid väärtust pole omistatud, funktsioon ei tagasta midagi, või objektiväli ei eksisteeri:
```js
let x;
console.log(x); // undefined

function foo() {}
console.log(foo()); // undefined

const obj = {};
console.log(obj.nimi); // undefined
```

`null` pannakse **teadlikult** arendaja poolt, et tähistada "tühja" või "lähtestatud" väärtust:
```js
let kasutaja = null; // kasutaja pole veel laaditud

// hiljem, kui andmed on saadud:
kasutaja = { nimi: "Marta" };
```

Kokkuvõte erinevustest:

| | `undefined` | `null` |
|---|---|---|
| **Tekib** | automaatselt | teadlikult |
| **Tähendus** | väärtus puudub / pole omistatud | väärtus on tahtlikult tühi |
| **`typeof`** | `"undefined"` | `"object"` |
| **Numbrina** | `NaN` | `0` |

## Levinud vead

Üks sagedane viga on arvude ja stringide segamine:

```js
const input = "5";

console.log(input + 2); // "52", mitte 7
```

Kui kasutaja sisestab vormi arvu, tuleb see tihti ise numbriks muuta:

```js
const input = "5";
const number = Number(input);

console.log(number + 2); // 7
```

Teine levinud viga on meetodi kasutamine `null` või `undefined` väärtusel:

```js
const userName = null;

// userName.toUpperCase(); // viga
```

Enne meetodi kasutamist peab olema kindel, et väärtus on olemas.

## Kokkuvõte

Andmetüüp ütleb JavaScriptile, millise väärtusega on tegemist ja milliseid operatsioone selle väärtusega teha saab. Stringidega töötame tekstina, numbritega arvutame, boolean väärtustega otsustame, objektide ja massiividega hoiame keerukamat infot.

## Harjutused

1. Loo string `fullName` ja kasuta selle peal `toUpperCase()` meetodit.
2. Loo massiiv vähemalt viie hindega ja kasuta `filter()` meetodit, et leida kõik positiivsed hinded.
3. Loo objekt `product`, millel on nimi, hind ja laoseisu väärtus.
4. Proovi brauseri konsoolis, mis vahe on avaldistel `"5" + 2` ja `Number("5") + 2`.
5. Selgita oma sõnadega, miks `null` ja `undefined` ei ole sama asi.