---
title: Klassid ja liidesed
description: Rakenda TypeScripti tüüpe klassides ning kasuta interface'i klassi avaliku kokkuleppe kirjeldamiseks.
outline: deep
---

# Klassid ja liidesed

::: info Õpiväljund
Pärast õppetundi oskad kirjeldada klassi andmed ja avaliku käitumise TypeScripti tüüpidega ning põhjendada `implements` kasutamist.
:::

TypeScript ei muuda JavaScripti klasside prototüübilist tööpõhimõtet. See lisab klassi omaduste, konstruktori ja meetodite kontrolli.

## Tüübitud klass

```ts
class Workshop {
  readonly id: number;
  title: string;
  capacity: number;
  private participants: string[] = [];

  constructor(id: number, title: string, capacity: number) {
    this.id = id;
    this.title = title;
    this.capacity = capacity;
  }

  addParticipant(name: string): boolean {
    if (this.participants.length >= this.capacity) {
      return false;
    }

    this.participants.push(name);
    return true;
  }

  getRemainingPlaces(): number {
    return this.capacity - this.participants.length;
  }
}
```

- `readonly` takistab ID muutmist TypeScripti koodis;
- `private` piirab omaduse kasutamise klassi sisse;
- `strictPropertyInitialization` kontrollib, et omadused saaksid algväärtuse.

## `interface` kui avalik kokkulepe

```ts
interface Bookable {
  addParticipant(name: string): boolean;
  getRemainingPlaces(): number;
}

class Workshop implements Bookable {
  // klass peab pakkuma mõlemad meetodid
}
```

`implements` kontrollib, et klass vastab liidesele. See ei lisa klassile meetodeid ega muuda käitusaegset JavaScripti.

## Ära loo klassi ainult tüübi pärast

Kui vajad ainult andmekuju, piisab sageli `interface`-ist:

```ts
interface WorkshopData {
  id: number;
  title: string;
  capacity: number;
}
```

Klass on kasulik siis, kui objekt peab kaitsma oma olekut ja pakkuma sellega seotud käitumist. API-st saabuvad lihtsad andmeobjektid ei pea automaatselt klassi instantsideks muutuma.

## Praktiline ülesanne

Koosta `Bookable` liides ja seda rakendav `Workshop` klass:

- ID on muutumatu;
- osalejate massiiv on väljast peidetud;
- osalejat ei saa lisada täis töötuppa;
- vabade kohtade arv on meetodiga loetav.

Kontrolli vähemalt kahe klassi instantsiga, et nende osalejate massiivid ei jagaks sama olekut.

## Kontrolli tulemust

Eemalda ajutiselt üks liideses nõutud meetod ning kontrolli, et TypeScript leiab vea. Proovi muuta privaatset massiivi väljaspool klassi.

## Mõtesta

- Mida `implements` kontrollib ja mida ta käitamise ajal ei tee?
- Millal on lihtne andmeobjekt klassist selgem lahendus?

Järgmisena: [Geneerikud ja utility-tüübid](./geneerikud-ja-utility-tuubid.md).

