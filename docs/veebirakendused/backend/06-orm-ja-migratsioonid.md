---
title: ORM ja migratsioonid
description: "Mis on ORM ja miks kirjutame andmebaasi päringuid koodis, mitte SQL-tekstina. Migratsioonid kui andmebaasi versioonihaldus ja miks vana migratsiooni ei tohi muuta."
outline: deep
---

# 6. ORM ja migratsioonid

::: info Õpiväljund
Pärast seda lehte oskad selgitada, mida teeb ORM, mis on migratsioon ja miks andmebaasi muudatused tehakse uute migratsioonidega, mitte vanu faile muutes.
:::

## Olukord

Eelmisel lehel nägid tabeleid. Nüüd on kaks küsimust:

1. **Kuidas kood andmebaasiga räägib?** Andmebaas mõistab SQL-i, rakendus on kirjutatud TypeScriptis (või Javas, PHP-s...).
2. **Kuidas jõuavad tabelid igasse andmebaasi?** Sinu arvutis, kolleegi arvutis, testides ja serveris peavad tabelid olema **täpselt ühesugused**. Ja kui homme lisandub üritusele pildi veerg, peab see jõudma kõikjale.

## ORM: tõlk koodi ja andmebaasi vahel

**ORM** (*Object-Relational Mapping*) tõlgib koodi ja andmebaasi vahel. Sa kirjutad päringu koodis, ORM teeb sellest SQL-i ja tagastab tulemuse koodi objektidena.

```ts
// ORM-iga: kood
const events = await db.select().from(eventSchema).where(eq(eventSchema.status, "published"));
```

```sql
-- sama SQL-ina, mille ORM saadab andmebaasile
SELECT * FROM events WHERE status = 'published';
```

Miks mitte kirjutada otse SQL-i?

| ORM-iga | Ilma (SQL tekstina) |
| --- | --- |
| Kirjaviga veeru nimes on punane **juba redaktoris** | Kirjaviga selgub alles siis, kui päring jookseb |
| Tulemuse tüüp on teada (`Event`), redaktor pakub välju | Tulemus on "midagi", välju tuleb meeles pidada |
| Kasutaja sisend läheb päringusse ohutult | Teksti kokkuliitmisel on oht **SQL-süstiks** |
| Tabeli kirjeldus on koodis, sellest tehakse migratsioonid | Tabelid ja kood võivad lahku minna |

**Kus ORM ei aita:** see ei tee halba päringut heaks. Kui küsid 100 000 rida korraga, küsib ORM ka. Seepärast peab arendaja ikkagi teadma, mis SQL selle taga on.

::: tip Repository ja ORM
[Kihtide lehel](./02-kihiline-arhitektuur) oli **repository** ainus koht, mis andmebaasiga räägib. Nüüd näed, millega see räägib: repository kasutab ORM-i. Kui ORM kunagi vahetub, muutub ainult repository.
:::

## Võrdlus: ehitusjoonise muudatused

Maja ehitamisel ei joonistata vana joonist üle. Iga muudatus on **eraldi leht**: "muudatus nr 5: lisa aken idaseinale". Kui ehitaja on muudatused 1–4 juba teinud, teeb ta ainult 5. Kui uus ehitaja alustab nullist, teeb ta järjest 1–5 ja saab sama maja.

| Ehitusel | Andmebaasis |
| --- | --- |
| Muudatuse leht | **Migratsioon** (fail, nt `0005_add_payment_id.sql`) |
| Muudatuste järjekord | Failide järjekord (number või aeg nimes) |
| Ehitaja märkmik "tehtud: 1–4" | Andmebaasi tabel, kuhu on kirjas rakendatud migratsioonid |
| Uus ehitaja nullist | Uus arvuti või testandmebaas |

**Kus võrdlus ei kehti:** kui ehitaja märkab, et vana joonist on muudetud, siis ta küsib. Andmebaas ei küsi. Ta näeb ainult, et fail nr 2 on juba tehtud, ja ei vaata seda enam kunagi.

## Migratsioon

**Migratsioon** on fail, mis kirjeldab ühte muudatust andmebaasi ülesehituses: loo tabel, lisa veerg, lisa indeks. Töö käib nii:

1. Muudad tabeli kirjeldust koodis (nt lisad üritusele `imageUrl`).
2. Tööriist võrdleb koodi eelmise seisuga ja **genereerib** migratsioonifaili.
3. Fail läheb koos koodiga Giti.
4. Iga andmebaas (sinu, kolleegi, server) **käivitab** faile, mida ta pole veel käivitanud.

Nii on andmebaasi ülesehitusel **ajalugu**, täpselt nagu koodil.

## Katseta: kolm andmebaasi

<MigrationLab />

Kui muutsid vana faili: sinu andmebaas ja server ei saanud veergu kunagi, sest nemad olid faili 0002 juba käivitanud. Kolleegi tühi andmebaas sai. Kõik kolm ütlevad "kõik migratsioonid on rakendatud", aga tabelid on **erinevad**. See viga ilmneb alles siis, kui kood proovib serveris veergu kasutada.

::: warning Reegel
Kui migratsioon on kuskil (eriti serveris) juba käivitatud, **ära seda muuda**. Tee uus migratsioon. Viga vanas migratsioonis parandatakse samuti uue migratsiooniga.
:::

## Mis juhtuks ilma?

| Ilma migratsioonideta | Tagajärg |
| --- | --- |
| Tabeleid muudetakse käsitsi | "Minu arvutis töötab": iga andmebaas on veidi erinev |
| Muudatusi ei ole Gitis | Keegi ei tea, millal ja miks veerg lisati |
| Uus arendaja | Peab kelleltki küsima, milliseid käske käivitada |
| Server | Uuendamisel ununeb üks muudatus ja rakendus kukub |

## Kuidas see meie koodis välja näeb

::: details Käsud ja failid (võib vahele jätta)
```bash
npm run db:generate   # võrdleb skeemi koodis ja loob uue migratsioonifaili
npm run db:migrate    # käivitab andmebaasis kõik veel käivitamata migratsioonid
```

Genereeritud fail on tavaline SQL:

```sql
-- migrations/20261025190527_add_stripe_payment_intent_to_orders.sql
ALTER TABLE "orders" ADD COLUMN "stripe_payment_intent_id" varchar(255);
```

Ühendus andmebaasiga luuakse ühes kohas ja antakse repository'dele:

```ts
export const db = drizzle({client: pool, casing: "snake_case"}); // koodis priceCents, andmebaasis price_cents
```
:::

**Teistes keeltes:** sama mõte, teised nimed. Java (Spring): JPA/Hibernate on ORM, Flyway või Liquibase teeb migratsioone. Flyway märkab ka muudetud vana faili (kontrollsumma järgi) ja keeldub käivitamast. PHP (Laravel): Eloquent ja `php artisan migrate`.

## Kontrollküsimused

1. Mida teeb ORM?
2. Miks lähevad migratsioonifailid Giti?
3. Migratsioonis 0003 on viga ja see on serveris juba käivitatud. Mida teed?
4. Kust teab andmebaas, milliseid migratsioone ta on juba käivitanud?

::: details Vastused
1. Tõlgib koodis kirjutatud päringud SQL-iks ja tulemused tagasi koodi objektideks. Lisaks kontrollib, et veergude nimed ja tüübid oleksid õiged.
2. Et iga arendaja ja server saaks samad muudatused samas järjekorras ning et muudatustel oleks ajalugu.
3. Teed **uue** migratsiooni, mis vea parandab. Vana faili muutmine ei jõuaks serverisse, sest server on selle juba käivitanud.
4. Andmebaasis on eraldi tabel, kuhu iga käivitatud migratsioon kirja pannakse.
:::
