---
title: Geneerikud ja utility-tüübid
description: Loo tüübikindlaid taaskasutatavaid funktsioone ning tuleta olemasolevast andmemudelist uusi tüüpe.
outline: deep
---

# Geneerikud ja utility-tüübid

::: info Õpiväljund
Pärast õppetundi oskad kasutada geneerikut ja utility-tüüpi olukorras, kus see vähendab korduvat tüübitööd.
:::

## Geneerik säilitab tüübi

```ts
function getFirst<T>(items: T[]): T | undefined {
  return items[0];
}

const firstName = getFirst(["Mari", "Jaan"]); // string | undefined
const firstId = getFirst([10, 20]);            // number | undefined
```

`T` tähistab tüüpi, mis selgub funktsiooni kasutamisel. Erinevalt `any` tüübist säilib seos sisendi ja väljundi vahel.

## Geneeriline tulemus

```ts
type Result<T> =
  | { ok: true; data: T }
  | { ok: false; error: string };

function findById<T extends { id: number }>(
  items: T[],
  id: number
): Result<T> {
  const item = items.find((item) => item.id === id);

  return item
    ? { ok: true, data: item }
    : { ok: false, error: "Kirjet ei leitud" };
}
```

`extends { id: number }` piirab geneeriku väärtustele, millel on numbriline ID.

## Utility-tüübid

```ts
type WorkshopUpdate = Partial<Workshop>;
type WorkshopCard = Pick<Workshop, "id" | "title" | "status">;
type NewWorkshop = Omit<Workshop, "id">;
type WorkshopsByStatus = Record<WorkshopStatus, Workshop[]>;
```

- `Partial<T>` teeb omadused valikuliseks;
- `Pick<T, K>` valib omadused;
- `Omit<T, K>` eemaldab omadused;
- `Record<K, V>` kirjeldab võtmete ja väärtuste kogumit.

Ära kasuta utility-tüüpi ainult lühema süntaksi pärast. Uus tüüp peab väljendama päris kasutusjuhtu.

## Praktiline ülesanne

Koosta:

- `NewWorkshop` uue töötoa loomiseks;
- `WorkshopCard` nimekirjas kuvamiseks;
- geneeriline `findById()` funktsioon;
- `Result<T>` tulemus leidmise õnnestumiseks või ebaõnnestumiseks.

## Kontrolli tulemust

`findById()` peab töötama nii töötubade kui ka osalejate massiiviga, kuid mitte objektidega, millel puudub numbriline `id`.

## Mõtesta

- Millise seose säilitab geneerik, mida `any` ei säilita?
- Millal oleks eraldi selgelt nimetatud tüüp utility-tüübist arusaadavam?

Järgmisena: [JavaScriptist TypeScriptiks](./migreerimine.md).

