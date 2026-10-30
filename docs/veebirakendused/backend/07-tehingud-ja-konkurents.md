---
title: Tehingud ja konkurents
description: "Miks müüakse ilma kaitseta viimane pilet kahele inimesele, mis on tehing ja ROLLBACK, kuidas üks tingimuslik UPDATE ja lukk probleemi lahendavad ning mis on deadlock."
outline: deep
---

# 7. Tehingud ja konkurents

::: info Õpiväljund
Pärast seda lehte oskad selgitada, mis on tehing ja miks see on „kõik või mitte midagi”, kirjeldada, kuidas kaks samaaegset päringut võivad andmed rikkuda, ning põhjendada, miks broneering on üks andmebaasi lause.
:::

## Olukord

Populaarse kontserdi müük algab kell 10.00. Saalis on 100 kohta ja esimese minuti jooksul vajutab „Osta” tuhat inimest. Server teenindab paljusid päringuid **korraga**. Kaks küsimust:

1. Kui alles on **üks** pilet ja kaks inimest vajutavad täpselt samal hetkel, kas mõlemad saavad pileti?
2. Ostja tellib tavapileti ja VIP-pileti. Tavapilet broneeritakse, aga siis selgub, et VIP on otsas. Mis saab juba broneeritud tavapiletist?

Need on kaks eri probleemi. Esimene on **konkurents** (mitu asja korraga), teine on **tervikus** (mitu sammu peavad õnnestuma koos).

## Võrdlus: pangaülekanne

Kui kannad sõbrale 50 eurot, peab juhtuma kaks asja: sinu kontolt läheb 50 maha ja sõbra kontole tuleb 50 juurde. Kujuta ette, et pank teeks esimese ja siis kukuks server maha. Raha oleks kadunud.

Pank teeb mõlemad **ühe tervikuna**: kas mõlemad juhtuvad või ei juhtu kumbki. Seda nimetatakse **tehinguks** (*transaction*).

| Pangas | Piletirakenduses |
| --- | --- |
| Maha sinu kontolt | Piletitüübi loendur kasvab (`sold + 1`) |
| Juurde sõbra kontole | Tellimus ja piletid luuakse |
| Pooleli jäänud ülekanne tühistatakse | **ROLLBACK**: kõik tehingu muudatused tühistatakse |
| Ülekanne kinnitatakse | **COMMIT**: muudatused on lõplikud |

**Kus võrdlus ei kehti:** pangas paistab ülekanne ühe nupuvajutusena. Andmebaasis on tehing mitu eraldi lauset ja programmeerija peab ise ütlema, kus tehing algab ja lõpeb.

## Probleem 1: viimane pilet kahele

Kõige loomulikum kood on:

1. loe andmebaasist, mitu on müüdud (`sold = 99`);
2. kontrolli koodis: kas 99 + 1 mahub 100 sisse? Jah;
3. kirjuta andmebaasi `sold = 100` ja loo tellimus.

Ühe ostjaga töötab see suurepäraselt. Kahe samaaegse ostjaga loevad **mõlemad** arvu 99 enne, kui kumbki jõuab kirjutada. Mõlemad otsustavad, et pilet on alles. Tulemus: 101 piletit 100 kohale ja loendur näitab ikka 100, sest teine kirjutas esimese üle.

Sellist viga ei leia testimisel peaaegu kunagi, sest see juhtub ainult siis, kui kaks päringut satuvad täpselt samale hetkele. Päris müügi alguses juhtub see aga kindlasti.

### Lahendus: üks lause, mitte kolm

Lugemine, kontroll ja kirjutamine tehakse **ühe** andmebaasi lausega:

```sql
UPDATE ticket_types
SET sold = sold + 1
WHERE id = '…' AND sold + 1 <= capacity
RETURNING *;
```

- Andmebaas **lukustab rea** selle lause ajaks. Teine ostja peab ootama.
- Kui teine ostja saab järje, kontrollib andmebaas tingimust **uue** väärtusega: `100 + 1 <= 100` ei kehti, ükski rida ei muutu.
- Rakendus näeb, et midagi ei muutunud, ja vastab `409` („Piletitüüpi ei ole piisavalt alles”).

::: warning Tehing üksi ei aita
Kui paned „loe → kontrolli → kirjuta” tehingu sisse, loevad mõlemad ostjad ikkagi arvu 99. Tehing tagab, et sammud õnnestuvad **koos**, aga ei keela teisel samal ajal sama rida lugeda (PostgreSQL-i tavalisel isolatsioonitasemel). Konkurentsi lahendab lukk, mille tingimuslik UPDATE paneb.
:::

Viimane kaitsekiht on andmebaasis endas: piirang `sold <= capacity` (vt [andmebaasi lehte](./05-andmebaas-ja-seosed)) ei luba vigast arvu salvestada isegi siis, kui koodis on viga.

## Probleem 2: kõik või mitte midagi

Tellimus „1 tavapilet + 1 VIP” on kaks broneeringut. Kui tavapilet broneeritakse, aga VIP ei mahu, ei tohi tavapileti broneering alles jääda. Muidu on üks koht „müüdud” ilma tellimuseta ja seda ei saa enam keegi osta.

Seepärast käib kogu tellimuse loomine **ühes tehingus**: kõigi piletitüüpide broneerimine, tellimuse loomine ja piletite loomine. Kui üks samm ebaõnnestub, tühistatakse kõik.

## Katseta: kaks ostjat ja üks tellimus

<TransactionSimulator />

## Deadlock: kaks ootajat

Lukk tekitab uue ohu. Tellimus 1 broneerib tavapileti ja siis VIP-i, tellimus 2 samal ajal VIP-i ja siis tavapileti. Esimene hoiab tavapileti lukku ja ootab VIP-i. Teine hoiab VIP-i lukku ja ootab tavapiletit. Kumbki ei saa edasi. Seda nimetatakse **deadlock**'iks („surnud lukk”).

Andmebaas märkab seda ja katkestab ühe tehingu, aga kasutaja saab vea. Lahendus on lihtne: **lukusta alati samas järjekorras.** Meie rakendus sorteerib piletitüübid enne broneerimist id järgi, nii et kõik tellimused lukustavad ridu samas järjekorras.

## Mis tehingusse ei kuulu

Tehingu ajal on read lukus. Kõik, mis võtab kaua aega, hoiab teisi ootamas. Seepärast:

- **Makseteenuse poole ei pöörduta tehingu sees.** Välise teenuse vastus võib võtta sekundeid. Kõigepealt broneering (tehing, mõni millisekund), siis makseleht.
- Tehingu sees tehakse ainult andmebaasi töö, mis peab õnnestuma koos.

## Mis juhtuks ilma?

| Ilma | Tagajärg |
| --- | --- |
| Atomaarse UPDATE-ita (loe → kontrolli → kirjuta) | Populaarne üritus müüakse üle |
| Tehinguta | Ebaõnnestunud tellimused jätavad „kummituskohti”, mida keegi osta ei saa |
| Lukustamise järjekorrata | Aeg-ajalt kukuvad tellimused deadlock'iga läbi |
| Välise teenusega tehingu sees | Müügi alguses ootab kõik ühe aeglase makseteenuse taga |

## Kuidas see meie koodis välja näeb

::: details Broneering ja tehing (võib vahele jätta)
Repository: üks tingimuslik lause. `tx` on tehing, milles lause jookseb:

```ts
async reserve(eventId, id, quantity, tx) {
    const [ticketType] = await tx
        .update(ticketTypeSchema)
        .set({sold: sql`${ticketTypeSchema.sold} + ${quantity}`})
        .where(and(
            eq(ticketTypeSchema.id, id),
            sql`${ticketTypeSchema.sold} + ${quantity} <= ${ticketTypeSchema.capacity}`,
        ))
        .returning();
    return ticketType; // undefined → ei mahtunud
}
```

Service: kõik ühes tehingus. `throw` tehingu sees → ROLLBACK:

```ts
const items = [...dto.items].sort((a, b) => a.ticketTypeId.localeCompare(b.ticketTypeId)); // deadlock'i vastu

return this.db.transaction(async (tx) => {
    for (const item of items) {
        const reserved = await this.ticketTypeRepository.reserve(dto.eventId, item.ticketTypeId, item.quantity, tx);
        if (!reserved) {
            throw new ConflictError("Piletitüüpi ei ole piisavalt alles"); // → ROLLBACK → 409
        }
    }
    return this.orderRepository.create({...}, tickets, tx);
});
```

**Oluline:** iga päring tehingu sees peab saama `tx`. Kui kirjutad kogemata `this.db`, jookseb see lause tehingust väljas ja jääb ROLLBACK-i järel alles.
:::

## Kontrollküsimused

1. Miks ei piisa sellest, kui kood loeb `sold` väärtuse, kontrollib ja siis kirjutab?
2. Mida tähendab ROLLBACK?
3. Miks ei kutsuta makseteenust tehingu sees?
4. Kuidas vältida deadlock'i?

::: details Vastused
1. Kaks samaaegset päringut loevad sama väärtuse enne, kui kumbki kirjutab, ja mõlemad otsustavad vana info põhjal. Üks tingimuslik UPDATE lukustab rea ja kontrollib tingimust alati värske väärtusega.
2. Tehingu kõik muudatused tühistatakse, nagu neid poleks olnudki.
3. Väline teenus võib vastata sekundeid ja kogu selle aja oleksid piletitüüpide read lukus. Teised ostjad peaksid ootama.
4. Lukusta read alati samas järjekorras (nt sorteeri id järgi).
:::
