---
title: JavaScriptist TypeScriptiks
description: Migreeri olemasolev JavaScripti projekt järk-järgult TypeScriptiks ja paranda vead põhjuse järgi.
outline: deep
---

# JavaScriptist TypeScriptiks

::: info Õpiväljund
Pärast õppetundi oskad koostada olemasoleva JavaScripti projekti järkjärgulise TypeScriptile üleviimise plaani.
:::

## Ära kirjuta töötavat rakendust kohe ümber

Migreerimise eesmärk on säilitada olemasolev käitumine ja lisada kontrolli sammhaaval:

```text
töötav JavaScript
→ lisa TypeScripti tööriistad
→ kontrolli JavaScripti faile
→ nimeta üks moodul korraga .ts failiks
→ paranda selle mooduli piirid
→ kontrolli rakenduse käitumist
```

## JavaScripti kontrollimine

Olemasolevas projektis saab alustada JavaScripti failide kontrollimisest:

```json
{
  "compilerOptions": {
    "allowJs": true,
    "checkJs": true,
    "noEmit": true,
    "strict": true
  }
}
```

- `allowJs` lubab projektil JavaScripti faile kaasata;
- `checkJs` kontrollib ka JavaScripti faile;
- `noEmit` jätab väljundi loomise bundleri ülesandeks.

## Sobiv tööjärjekord

1. Lisa `npm run check`.
2. Pane olemasolev rakendus enne muudatusi tööle.
3. Alusta väikestest andmemudelitest ja puhastest funktsioonidest.
4. Liigu DOM-i ja API piiridele.
5. Paranda üks veakategooria korraga.
6. Käivita pärast iga sammu kontroll ja rakendus.

## Väldi vea peitmist

Need võtted võivad migratsiooni näiliselt kiiresti lõpetada:

```ts
const data: any = response;
const form = document.querySelector("#form")!;
const workshop = value as Workshop;
```

Iga võte eemaldab kontrolli just kohas, kus ebakindlus vajaks käsitlemist. Kasuta neid ainult siis, kui oskad eeldust põhjendada ja käitusaegse kontrolliga toetada.

## Praktiline ülesanne

Vali olemasolevast JavaScripti projektist üks moodul:

1. kirjelda selle sisendid ja väljundid;
2. nimeta fail `.ts` failiks;
3. paranda tüübivead ilma `any` kasutamata;
4. kontrolli varasem käitumine;
5. tee eraldi commit.

## Kontrolli tulemust

```bash
npm run check
npm run build
```

Rakenduse kasutaja jaoks peab käitumine jääma samaks.

## Mõtesta

- Millisest failist on kõige väiksema riskiga migratsiooni alustada?
- Miks on väikesed commit'id migratsiooni ajal eriti kasulikud?

Järgmisena: [Praktiline töö](./praktiline-too.md).

