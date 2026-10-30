---
title: Autentimine ja autoriseerimine
description: "Kes sa oled ja mida sa tohid: kaks eri küsimust. Rollid, omaniku kontroll, 401 vs 403 ja miks võõra pileti puhul vastatakse 404."
outline: deep
---

# 8. Autentimine ja autoriseerimine

::: info Õpiväljund
Pärast seda lehte oskad eristada autentimist autoriseerimisest, selgitada rolli ja omaniku kontrolli vahet ning valida õige vastuse: `401`, `403` või `404`.
:::

## Olukord

Rakenduses on neli tüüpi kasutajaid: ostja, korraldaja, turvamees ja admin. Iga päringu juures tuleb vastata **kahele erinevale küsimusele**:

1. **Kes sa oled?** Kas sa oled sisse loginud ja kas see on tõesti sinu konto?
2. **Mida sa tohid?** Kas sinu rollil on see tegevus lubatud? Kas see üritus või pilet on **sinu oma**?

Need kaks küsimust on nii erinevad, et neil on eraldi nimed.

## Võrdlus: hotell

Hotelli registratuuris näitad passi. Administraator kontrollib, kas oled see, kes ütled. Siis saad **võtmekaardi**.

Võtmekaart avab sinu toa ja jõusaali, aga mitte teiste külaliste tube ega personaliruume. Koristaja kaart avab kõiki tube, aga mitte kontorit.

| Hotellis | Rakenduses | Nimi |
| --- | --- | --- |
| Passi kontroll registratuuris | Sisselogimine | **Autentimine**: kes sa oled? |
| Võtmekaart | Sessioon (küpsis) | Tõend, et oled juba kontrollitud |
| Kaart avab jõusaali, mitte kontorit | Roll lubab ürituse luua, mitte rolle muuta | **Autoriseerimine**: mida sa tohid? |
| Kaart avab **sinu** toa, mitte naabri oma | Saad muuta **oma** üritust, mitte teise korraldaja oma | Omaniku kontroll |

**Kus võrdlus ei kehti:** hotelli uks kontrollib kaarti ainult siis, kui ust avad. Server kontrollib **igal päringul** uuesti, sest ta ei mäleta eelmist päringut (vt [päringu ja vastuse tsükkel](./01-paringu-ja-vastuse-tsukkel)).

## Kolm kontrolli, kolm kohta

| Kontroll | Küsimus | Kus | Vastus, kui ei |
| --- | --- | --- | --- |
| **Sisselogimine** | Kas tean, kes sa oled? | Middleware (`requireAuth`) | `401 Unauthorized` |
| **Roll** | Kas sinu rollil on see lubatud? | Middleware (`requireRole`) | `403 Forbidden` |
| **Omanik** | Kas see asi on sinu oma? | Service | `403` või `404` |

Miks on omaniku kontroll service'is, mitte middleware'is? Middleware näeb ainult päringut: kes sa oled ja mis aadress see on. Kelle oma on üritus 1, seda teab ainult **andmebaas**. Selle küsimiseks on service.

::: tip 401 vs 403 vs 404
- **`401`**: "Ma ei tea, kes sa oled." Lahendus: logi sisse.
- **`403`**: "Tean, kes sa oled, aga sa ei tohi." Uuesti sisselogimine ei aita.
- **`404`** võõra asja puhul: "Sellist asja pole" (sinu jaoks). Kasutame seda piletite juures, et keegi ei saaks proovimise teel teada, millised pileti numbrid on olemas.
:::

## Katseta: kes mida tohib?

<AccessMatrix />

Märka mustreid:

- **Sisse logimata** saab ainult avalikku nimekirja näha. Kõik muu annab `401` ja see otsustatakse enne kõike muud.
- **Korraldaja 2** on õige rolliga, aga üritus 1 pole tema oma. Middleware laseb ta läbi, service peatab.
- **Turvamees 2** on õige rolliga, aga ta pole selle ürituse turvameeste nimekirjas.
- **Admin** läbib kõik kontrollid. Seepärast antakse admini rolli väga vähestele.

## Rollid meie rakenduses

| Roll | Mida teeb | Kuidas roll tekib |
| --- | --- | --- |
| `attendee` | Ostab pileteid | Vaikimisi kõigil uutel kasutajatel |
| `organizer` | Loob üritusi ja piletitüüpe | Admin annab |
| `security` | Skännib pileteid nende ürituste uksel, kuhu korraldaja ta lisas | Admin annab rolli, korraldaja lisab üritusele |
| `admin` | Haldab kasutajaid ja rolle, näeb kõike | Esimene admin luuakse käsurealt |

**Oluline:** kasutaja ei saa oma rolli ise määrata. Kui registreerimisel saaks saata `"role": "admin"`, teeks igaüks end adminiks. Roll on DTO-st välja jäetud (vt [DTO leht](./03-dto)).

## Mis juhtuks ilma?

| Ilma | Tagajärg |
| --- | --- |
| Sisselogimise kontrollita | Igaüks saab kõike, ka ilma kontota |
| Rollideta | Iga ostja saab üritusi luua ja kustutada |
| Omaniku kontrollita | Korraldaja saab muuta konkurendi üritust (OWASP-i kõige levinum API viga) |
| 404 asemel 403 | Ründaja saab proovides teada, millised piletid on olemas |

## Kuidas see meie koodis välja näeb

::: details Route'id ja service (võib vahele jätta)
Roll kontrollitakse routeri juures, üks kord kõigile selle routeri aadressidele:

```ts
eventRouter.use(requireAuth, requireRole("organizer")); // 401, siis 403
```

Omanik kontrollitakse service'is, sest selleks on vaja ürituse andmeid:

```ts
async findOwnedById(id: string, user: AuthUser): Promise<Event> {
    const event = await this.findById(id);
    if (user.role !== "admin" && event.organizerId !== user.id) {
        throw new ForbiddenError("See ei ole sinu üritus");
    }
    return event;
}
```

Roll on kasutaja väli, mida kasutaja ise muuta ei saa:

```ts
role: {
    type: ["attendee", "organizer", "security", "admin"],
    defaultValue: "attendee",
    input: false, // registreerimisel ei saa rolli kaasa saata
},
```
:::

## Kontrollküsimused

1. Mis vahe on autentimisel ja autoriseerimisel?
2. Korraldaja proovib muuta teise korraldaja üritust. Mis vastuse ta saab ja kes selle otsustab?
3. Miks on omaniku kontroll service'is, mitte middleware'is?
4. Miks vastatakse võõra pileti puhul `404`, mitte `403`?

::: details Vastused
1. Autentimine kontrollib, **kes** sa oled (sisselogimine). Autoriseerimine kontrollib, **mida** sa tohid (roll, omanik).
2. `403`. Middleware laseb ta läbi (roll on õige), service näeb, et üritus pole tema oma.
3. Omaniku teadasaamiseks on vaja andmebaasist ürituse andmeid. Middleware näeb ainult päringut.
4. `403` ütleks, et selline pilet on olemas. `404` ei reeda midagi.
:::
