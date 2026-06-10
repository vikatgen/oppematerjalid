---
title: DOM ja sündmused
description: Kasuta TypeScriptiga DOM-elemente ja brauseri sündmusi ilma puuduvaid elemente eeldamata.
outline: deep
---

# DOM ja sündmused

::: info Õpiväljund
Pärast õppetundi oskad leida DOM-elemendi, kontrollida selle olemasolu ning kasutada sündmuse sihtmärki sobiva tüübiga.
:::

## DOM-otsing võib ebaõnnestuda

```ts
const form = document.querySelector<HTMLFormElement>("#booking-form");

if (!form) {
  throw new Error("Broneerimisvormi ei leitud.");
}
```

`querySelector()` tagastab elemendi või `null`, sest selektor ei pruugi dokumendis midagi leida.

Geneeriline argument `<HTMLFormElement>` kirjeldab, millist elementi ootame. See ei loo elementi ega kontrolli käitamise ajal, kas HTML on õige.

## Sisendi väärtus

```ts
const nameInput = document.querySelector<HTMLInputElement>("#participant-name");

if (!nameInput) {
  throw new Error("Nime sisendit ei leitud.");
}

console.log(nameInput.value);
```

Täpsem elemenditüüp teeb kättesaadavaks sellele elemendile omased omadused, näiteks `value`.

## Sündmuse tüüp

```ts
form.addEventListener("submit", (event: SubmitEvent) => {
  event.preventDefault();

  const formData = new FormData(form);
  const name = formData.get("name");

  if (typeof name !== "string" || name.trim() === "") {
    return;
  }

  console.log(name.trim());
});
```

Vormiandmed pärinevad kasutajalt. Ka TypeScripti projektis tuleb nende kuju kontrollida.

## Väldi pimesi tüübiväiteid

```ts
const button = document.querySelector("#save") as HTMLButtonElement;
button.disabled = true;
```

See kood käsib TypeScriptil arendajat uskuda, kuid element võib endiselt puududa. Eelista olemasolu kontrolli.

## Praktiline ülesanne

Koosta broneerimisvorm, mis:

- leiab vormi, nimevälja ja teateala;
- peatab vormi vaikimisi saatmise;
- kontrollib tühja nime;
- kuvab korrektse nime teatealal.

## Kontrolli tulemust

Eemalda ajutiselt HTML-ist üks vajalik element. Rakendus peab andma arusaadava vea, mitte juhusliku `Cannot read properties of null` teate.

## Mõtesta

- Miks ei tõesta `<HTMLInputElement>` elemendi olemasolu?
- Milline kontroll kuulub TypeScriptile ja milline kasutaja sisendi valideerimisele?

Järgmisena: [Asünkroonsus ja API-andmed](./api-andmed.md).

