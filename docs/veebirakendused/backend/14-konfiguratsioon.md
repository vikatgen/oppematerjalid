---
title: Konfiguratsioon ja saladused
description: "Keskkonnamuutujad, .env ja .env.example, saladused, sama kood eri keskkondades (12 faktorit) ja miks server peab vigase seadistuse korral kohe käivitumata jääma."
outline: deep
---

# 14. Konfiguratsioon ja saladused

::: info Õpiväljund
Pärast seda lehte oskad selgitada, miks seadistus ja saladused ei ole koodis, eristada `.env` ja `.env.example` faili ning põhjendada, miks server kontrollib seadistuse käivitamisel üle.
:::

## Olukord

Sama piletirakendus jookseb mitmes kohas:

- arendaja arvutis (andmebaas `localhost`-is, Stripe'i testrežiim);
- testides (eraldi testandmebaas);
- serveris päris kasutajatega (päris andmebaas, päris maksed).

Kood on igal pool **sama**. Erinevad on aadressid, paroolid ja võtmed. Kuidas anda koodile õiged väärtused nii, et paroolid ei satuks Giti?

## Võrdlus: korteri võti

Ehitusfirma ehitab ühesuguseid kortereid. Joonised (kood) on kõigil samad ja neid võib avalikult näidata. Iga korteri **võti** (saladus) on aga erinev ja see antakse ainult omanikule. Võtit ei joonistata joonisele.

| Võrdluses | Rakenduses |
| --- | --- |
| Ühesugused joonised | Kood (Gitis, kõigile nähtav) |
| Iga korteri oma võti | Keskkonnamuutujad: andmebaasi parool, API võtmed |
| Võtmekarp ukse kõrval, mitte joonisel | `.env` fail serveris, mitte Gitis |
| Nimekiri „sellel korteril on 2 võtit” | `.env.example`: millised muutujad on vaja, ilma väärtusteta |

**Kus võrdlus ei kehti:** kaotatud võtme puhul vahetatakse lukk. Gitti sattunud saladus jääb ajalukku ka pärast faili kustutamist. Ainus lahendus on saladus kohe **vahetada**.

## Keskkonnamuutujad

**Keskkonnamuutuja** on nimi ja väärtus, mille operatsioonisüsteem annab programmile käivitamisel (`PORT=3000`). Kood loeb väärtuse nime järgi ega tea, kust see tuli.

| Fail | Sisu | Gitis? |
| --- | --- | --- |
| `.env` | Päris väärtused: paroolid, võtmed | **Ei** (`.gitignore`-is) |
| `.env.example` | Muutujate nimed ja selgitused, väärtused tühjad | Jah |
| `.env.test` | Testide väärtused (testandmebaas, võltsitud võtmed) | Jah, kui seal pole päris saladusi |

Uus arendaja kopeerib `.env.example` → `.env` ja täidab väärtused. Ta näeb kohe, mida on vaja.

## Sama kood, eri keskkonnad

| Muutuja | Arendus | Test | Toodang |
| --- | --- | --- | --- |
| `NODE_ENV` | `development` | `test` | `production` |
| `DATABASE_URL` | `localhost:5432/events` | `localhost:5433/app_test` | `db.internal:5432/events` |
| `LOG_LEVEL` | `info` | `silent` | `warn` |
| `FRONTEND_URL` | `http://localhost:5173` | `http://localhost:5173` | `https://piletid.example` |
| `STRIPE_SECRET_KEY` | `sk_test_…` | `sk_test_…` | `sk_live_…` |

See on üks [12 faktori](https://12factor.net/config) põhimõtetest: **seadistus on keskkonnas, mitte koodis**. Sama kood (sama Giti versioon) saab joosta igal pool, ainult keskkond on erinev.

## Kontrolli kohe käivitamisel

`process.env` väärtused on alati **tekst**, ja puuduv muutuja on lihtsalt `undefined`. Kui seda ei kontrollita, ilmneb viga alles siis, kui kood muutujat esimest korda kasutab. Näiteks esimese ostja maksel, kell 3 öösel.

Seepärast kontrollib meie server **kõik** muutujad käivitamisel ühe skeemiga üle (sama zod, mis DTO-de puhul). Kui midagi on puudu või vigane, kirjutab ta, mis täpselt, ja **keeldub käivitumast**. Seda nimetatakse *fail fast*: parem kohe ja selgelt kui hiljem ja segaselt.

## Katseta: kas server käivitub?

<EnvLab />

Märka:

- puuduv `LOG_LEVEL` saab **vaikeväärtuse**, aga puuduv `DATABASE_URL` peatab käivitamise: ilma andmebaasita pole mõtet alustada;
- `PORT=kolmtuhat` on tekst, mis ei ole number. Kontroll muudab teksti numbriks ja annab vea, kui see ei õnnestu;
- `pk_test_…` on Stripe'i **avalik** võti (brauseri jaoks). Serveris on vaja salajast. Selline segadus on levinud ja kontroll püüab selle kinni.

## Saladuste reeglid

- **Mitte koodi, mitte Giti.** Ka mitte „ajutiselt”.
- **Mitte logisse.** Kui logid seadistust, näita ainult algust (`sk_t••••`).
- **Mitte frontend'i.** Kõik, mis on brauseri koodis, on kõigile nähtav. Vite'i `VITE_`-eesliitega muutujad lähevad brauserisse, seega sinna ainult avalikud väärtused.
- **Igal keskkonnal oma.** Arenduse ja toodangu võtmed on erinevad. Lekkinud arenduse võti ei ohusta päris andmeid.
- **Lekkis? Vaheta.** Kustutamine Gitist ei aita, ajalugu jääb alles.

## Mis juhtuks ilma?

| Ilma | Tagajärg |
| --- | --- |
| Saladused koodis | Kes näeb repot, näeb paroole. Avalikus repos leiavad robotid need minutitega |
| `.env.example`-ita | Uus arendaja ei tea, milliseid muutujaid on vaja |
| Kontrollita käivitamisel | Server käivitub, aga kukub esimese päringu juures segase veaga |
| Ühised võtmed kõigis keskkondades | Arendaja arvuti leke ohustab päris kasutajate andmeid |

## Kuidas see meie koodis välja näeb

::: details Seadistuse kontroll (võib vahele jätta)
```ts
const envSchema = z.object({
    NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
    PORT: z.coerce.number().int().min(1024).max(65535).default(3000), // tekst → number
    DATABASE_URL: z.url(),
    BETTER_AUTH_SECRET: z.string().min(32),
    STRIPE_SECRET_KEY: z.string().startsWith("sk_"),
    // ...
});

const result = envSchema.safeParse(process.env);
if (!result.success) {
    console.error(`Invalid environment variable: ${z.prettifyError(result.error)}`);
    process.exit(1); // ei käivitu
}
export const env = result.data; // ülejäänud kood kasutab ainult seda, mitte process.env-i
```

Ülejäänud kood loeb `env.DATABASE_URL`, mitte `process.env.DATABASE_URL`. Nii on tüüp õige (`PORT` on number) ja kontroll on tehtud.
:::

## Kontrollküsimused

1. Mis vahe on `.env` ja `.env.example` failil?
2. Miks peab server vigase seadistuse korral käivitumata jääma?
3. Saladus sattus kogemata Giti. Kas faili kustutamisest piisab?
4. Kas Stripe'i salajase võtme võib panna frontend'i `.env` faili muutujasse `VITE_STRIPE_KEY`?

::: details Vastused
1. `.env` sisaldab päris väärtusi ega lähe Giti. `.env.example` näitab, milliseid muutujaid on vaja, ilma väärtusteta, ja on Gitis.
2. Muidu ilmneb viga alles siis, kui muutujat kasutatakse, ja see võib olla tunde hiljem ning segane. Käivitamisel on viga kohe näha koos põhjusega.
3. Ei. Saladus jääb Giti ajalukku. See tuleb kohe vahetada (uus võti, vana tühistada).
4. Ei. `VITE_` muutujad pannakse brauseri koodi ja on kõigile nähtavad. Brauserisse sobib ainult avalik võti (`pk_`).
:::
