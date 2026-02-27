# JavaScripti andmetüübid

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