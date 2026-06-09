---
title: SessionStorage
description: Õpi säilitama ühe brauserivahelehe ajutist kasutajaliidese olekut ning valima sobiva Web Storage salvestusruumi.
outline: deep
---

# SessionStorage: ajutine filtriolek

::: info Õpiväljund
Pärast õppetundi oskad valida ajutise ja püsiva brauserisalvestuse vahel ning taastada ühe vahelehe kasutajaliidese oleku `sessionStorage` abil.
:::

Ostukorv peab säilima ka järgmisel külastusel, mistõttu kasutasid selle jaoks `localStorage`-it. Otsingutekst ja valitud kategooria on teistsugune olek: kasutaja võib soovida neid säilitada lehe värskendamisel, kuid mitte tingimata järgmisel päeval.

Selles tunnis salvestad kataloogi filtrid ühe vahelehe tööseansiks.

## Eeldused ja töövahendid

- Sul on töötav otsinguväli, kategooriafilter ja `updateCatalog()` funktsioon.
- Oskad kasutada `localStorage`-it ning JSON-i teisendada.
- Oskad kontrollida brauseri salvestust DevToolsis.
- Soovituslik kestus on 60–75 minutit.

## Mis on `sessionStorage`?

`sessionStorage` kasutab sama võtme ja väärtuse API-t nagu `localStorage`:

```js
sessionStorage.setItem("example", "Tere");
console.log(sessionStorage.getItem("example"));
sessionStorage.removeItem("example");
```

Peamine erinevus on väärtuse eluiga ja ulatus:

| Omadus | `localStorage` | `sessionStorage` |
| --- | --- | --- |
| Säilib lehe uuesti laadimisel | jah | jah |
| Säilib vahelehe sulgemisel | tavaliselt jah | ei |
| Jaguneb sama veebiaadressi vahelehtede vahel | jah | ei, iga vaheleht kasutab oma seanssi |
| Sobiv näide | ostukorv, teemaeelistus | pooleliolev filter, ajutine vorm |

::: info Vahelehe kopeerimisel võib algolek kaasa tulla
Brauser võib kopeeritud või teisest lehest avatud vahelehele anda alguses olemasoleva seansi väärtused. Pärast seda on vahelehtede `sessionStorage` olekud eraldi.
:::

## Vali salvestusruum andmete tähenduse järgi

Küsi enne salvestamist:

1. Kas väärtus peab säilima pärast vahelehe sulgemist?
2. Kas sama väärtus peab olema nähtav teises sama rakenduse vahelehes?
3. Kas väärtus on väike, mittetundlik ja tekstina salvestatav?

Tootekataloogis:

- ostukorvi ID-d → `localStorage`;
- otsing ja kategooria → `sessionStorage`;
- serverist küsitud kogu tooteloend → ära salvesta praegu Web Storage'isse;
- parool või muu tundlik väärtus → ära salvesta Web Storage'isse.

## Koonda filtrid üheks objektiks

Sul on juba:

```js
let searchTerm = "";
let selectedCategory = "all";
```

Salvestamiseks koosta neist objekt:

```js
const FILTER_STORAGE_KEY = "productCatalog.filters";

function saveFilters() {
  const filters = {
    searchTerm,
    selectedCategory
  };

  sessionStorage.setItem(
    FILTER_STORAGE_KEY,
    JSON.stringify(filters)
  );
}
```

Ühe objekti salvestamine hoiab seotud väärtused ühe võtme all. Kui filtreid lisandub, saad objekti täiendada.

## Salvesta sündmuse järel

Täienda olemasolevaid töötlejaid:

```js
function handleSearchInput(event) {
  searchTerm = event.currentTarget.value.trim().toLowerCase();

  saveFilters();
  updateCatalog();
}

function handleCategoryChange(event) {
  selectedCategory = event.currentTarget.value;

  saveFilters();
  updateCatalog();
}
```

Nüüd kirjutatakse seansi olek pärast kasutaja valiku muutmist.

## Taasta ja kontrolli filtrid

Salvestatud väärtus võib puududa või olla vigane. Koosta taastamisfunktsioon:

```js
function loadFilters() {
  const storedFilters = sessionStorage.getItem(FILTER_STORAGE_KEY);

  if (storedFilters === null) {
    return {
      searchTerm: "",
      selectedCategory: "all"
    };
  }

  try {
    const parsedFilters = JSON.parse(storedFilters);

    if (
      typeof parsedFilters !== "object" ||
      parsedFilters === null ||
      Array.isArray(parsedFilters)
    ) {
      throw new Error("Filtrite salvestus ei ole objekt.");
    }

    return {
      searchTerm:
        typeof parsedFilters.searchTerm === "string"
          ? parsedFilters.searchTerm
          : "",
      selectedCategory:
        typeof parsedFilters.selectedCategory === "string"
          ? parsedFilters.selectedCategory
          : "all"
    };
  } catch (error) {
    console.error("Filtrite taastamine ebaõnnestus:", error);

    return {
      searchTerm: "",
      selectedCategory: "all"
    };
  }
}
```

Funktsioon tagastab alati sobiva kujuga filtriobjekti.

## Taasta nii olek kui ka vormielemendid

Kui taastad ainult muutujad, ei pruugi kasutajaliides neid näidata. Uuenda ka väljade omadused:

```js
const storedFilters = loadFilters();

searchTerm = storedFilters.searchTerm;
selectedCategory = storedFilters.selectedCategory;

searchInput.value = searchTerm;
categorySelect.value = selectedCategory;

updateCatalog();
```

Rakenduse käivitamisel peavad omavahel vastavuses olema:

- JavaScripti muutujad;
- otsinguvälja ja valikukasti väärtused;
- kuvatav tootenimekiri.

::: warning Kontrolli, kas taastatud valik on endiselt olemas
Kui kategooriavalikud muutuvad, ei pruugi vana `selectedCategory` enam sobida. Pärast väärtuse määramist kontrolli `categorySelect.value`; puuduva valiku korral kasuta `"all"` väärtust.
:::

```js
categorySelect.value = selectedCategory;

if (categorySelect.value === "") {
  selectedCategory = "all";
  categorySelect.value = "all";
}
```

## Lisa filtrite puhastamine

HTML:

```html
<button id="clear-filters" type="button">Puhasta filtrid</button>
```

JavaScript:

```js
const clearFiltersButton = document.querySelector("#clear-filters");

function handleClearFilters() {
  searchTerm = "";
  selectedCategory = "all";

  searchInput.value = "";
  categorySelect.value = "all";

  sessionStorage.removeItem(FILTER_STORAGE_KEY);
  updateCatalog();
}

clearFiltersButton.addEventListener("click", handleClearFilters);
```

## Kontrolli vahelehtede käitumist

Katseta:

1. määra otsing ja kategooria;
2. laadi sama vaheleht uuesti;
3. ava rakendus eraldi uues vahelehes;
4. muuda uues vahelehes filtreid;
5. sulge algne vaheleht ja ava rakendus uues seansis.

Oodatav tulemus:

- sama vahelehe uuesti laadimisel filtrid taastuvad;
- eri vahelehtede hilisemad muudatused ei kirjuta teineteise seanssi üle;
- vahelehe seansi lõppedes ajutine filtriolek kaob;
- `localStorage`-is olev ostukorv säilib sellest sõltumatult.

## Praktiline ülesanne: säilita ühe vahelehe filtrid

Täienda tootekataloogi nii, et otsing ja kategooria taastuvad sama vahelehe uuesti laadimisel.

### Nõuded

1. Filtrite salvestusvõti on konstandis.
2. `saveFilters()` salvestab ühe filtriobjekti `sessionStorage`-isse.
3. Filtrid salvestatakse otsingu ja kategooria muutmisel.
4. `loadFilters()` tagastab alati sobiva kujuga objekti.
5. Rakenduse käivitamisel taastatakse muutujad, vormielemendid ja kataloog.
6. Puuduva või tundmatu kategooria korral kasutatakse väärtust `"all"`.
7. Kasutaja saab filtrid ja nende salvestuse puhastada.

### Piirjuhud

Kontrolli:

- salvestust pole;
- otsing on tühi;
- kategooria on `"all"`;
- salvestatud JSON on vigane;
- salvestatud väärtus on massiiv või tekst, mitte objekt;
- salvestatud kategooriat pole valikukastis;
- vaheleht laaditakse uuesti ja hiljem suletakse.

### Vihjed

::: details Vihje 1
`sessionStorage` kasutab samu `setItem()`, `getItem()` ja `removeItem()` meetodeid nagu `localStorage`.
:::

::: details Vihje 2
Taasta filtrid enne esimest `updateCatalog()` kutset.
:::

::: details Vihje 3
Pärast muutujate taastamist määra ka:

```js
searchInput.value = searchTerm;
categorySelect.value = selectedCategory;
```
:::

### Kontrollitav tulemus

Valmis töös:

- taastuvad filtrid sama vahelehe värskendamisel;
- vastavad väljade väärtused kuvatavatele toodetele;
- ei peata vigane salvestus rakendust;
- kaob filtriolek pärast seansi lõppu;
- säilib `localStorage` ostukorv filtritest sõltumatult;
- oskad põhjendada mõlema salvestusruumi valikut.

## Mõtesta

1. Miks sobib ostukorv `localStorage`-isse, kuid ajutine otsing `sessionStorage`-isse?
2. Miks tuleb taastamisel uuendada nii muutujaid kui ka vormielemente?
3. Miks peab taastatud kategooriat kontrollima valikukasti võimaluste vastu?
4. Milliseid andmeid ei tohiks kummaski Web Storage salvestusruumis hoida?

## Laiendus

Lisa filtriolekule `hideUnavailable` väärtus. Taasta ka vastava nupu tekst ja kataloogi tulemus, et kogu filtrivaade oleks pärast lehe värskendamist järjepidev.

## Kokkuvõte

- `sessionStorage` säilitab väärtused ühe vahelehe tööseansi jooksul.
- `localStorage` sobib püsivale ja `sessionStorage` ajutisele olekule.
- Mõlemad Web Storage API-d salvestavad ainult teksti.
- Taastamisel tuleb kontrollida salvestuse kuju ja sobivust.
- Kasutajaliidese oleku taastamine tähendab nii muutujate, väljade kui ka vaate uuendamist.

## Edasi

Nüüd oskad säilitada brauseris püsivat ja ajutist olekut. Järgmisena õpid, kuidas rakendus saab [serverist andmeid küsida ilma kasutajaliidest peatamata](../asunkroonsus/sissejuhatus.md).

## Allikad

- [MDN: `Window.sessionStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage) — ühe vahelehe seansi salvestusruum.
- [MDN: Web Storage API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API) — `localStorage` ja `sessionStorage` võrdlus.
