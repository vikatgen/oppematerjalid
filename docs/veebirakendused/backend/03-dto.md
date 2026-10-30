---
title: DTO, mis tohib sisse ja välja minna
description: Miks server ei võta päringu andmeid sellisena, nagu need tulid, ja miks ei saada andmebaasi rida otse kliendile. DTO sisendina ja väljundina, valideerimine ja liigsete väljade kaitse.
outline: deep
---

# 3. DTO: mis tohib sisse ja välja minna?

::: info Õpiväljund
Pärast seda lehte oskad selgitada, mis on DTO, miks eraldi sisend- ja väljundkuju on turvalisem kui andmete otse edasi andmine, ning eristada valideerimist äriloogikast.
:::

## Olukord

Korraldaja loob uue ürituse. Ta täidab vormi: pealkiri, kirjeldus, koht, aeg. Vajutab "Salvesta".

Nüüd on kaks küsimust:

1. **Sisse:** mida server brauserist vastu võtab? Mis siis, kui korraldaja (või keegi pahatahtlik) saadab peale vormi väljade ka midagi, mida vormis pole?
2. **Välja:** kui ostja küsib ürituse andmeid, mida talle saata? Kõike, mis andmebaasis on?

## Probleem 1: kes tohib mida öelda?

Vorm saadab serverile andmed JSON-ina:

```json
{ "title": "Sügiskontsert", "city": "Kuressaare" }
```

Aga brauseri päring on **kasutaja käes**. Keegi oskab sama päringu käsitsi saata ja panna sinna juurde:

```json
{
  "title": "Sügiskontsert",
  "city": "Kuressaare",
  "status": "published",
  "organizerId": "kellegi-teise-id"
}
```

Kui server võtaks kõik väljad **ilma küsimata** ja paneks andmebaasi, oleks tulemus: keegi on loonud ürituse **teise korraldaja nime alla** ja märkinud selle kohe **avaldatuks**, ilma et ürituse "päris omanik" seda näeks. Seda rünnakut nimetatakse inglise keeles *mass assignment*.

## Võrdlus: paberankeet

Kujuta ette kontoris paberankeeti. Sellel on **kindlad lahtrid**: nimi, aadress, telefon. Kui keegi kirjutab lehe serva "annan endale ka kõrgema palga", ei viitsi sekretär seda sisestada. Ta vaatab ainult lahtreid, mis ankeedil on.

| Kontoris | Rakenduses |
| --- | --- |
| Paberankeet kindlate lahtritega | **Sisend-DTO** (*Data Transfer Object*) |
| Sekretär kontrollib: kas nimi on täidetud, kas telefon on number | **Valideerimine** |
| Vaateaken (vitriin) poes: kliendile näidatakse ainult hinda ja toodet | **Väljund-DTO** |
| Laoraamat (sisemine, kuhu on kirjutatud ostuhind, tarnija) | **Andmebaasi rida** |

**Kus võrdlus ei kehti:** paberankeedi täitmist ei saa kasutaja teise lahtriga "täiendada", aga digitaalne päring saab. Seepärast tuleb kontroll teha **igal korral serveris**, mitte loota, et vorm piirab.

## Mis on DTO?

**DTO** (*Data Transfer Object*, "andmeedastusobjekt") on kokkulepitud kuju sellele, mis **liigub** kliendi ja serveri vahel. Täpselt kaks suunda:

| Suund | Küsimus | Meie rakenduses |
| --- | --- | --- |
| **Sisse** (päring) | Mida klient tohib saata? | Pealkiri, kirjeldus, koht, ajad. **Ei ole**: `id`, `status`, `organizerId` |
| **Välja** (vastus) | Mida klient tohib näha? | Avalik: ilma korraldaja id ja olekuta. Korraldajale: kõik, ka olek |

Seda, mida DTO-s pole, ei saa klient saata ega saa ka kogemata saada.

## Valideerimine: kas see on õigel kujul?

Sisend-DTO juures kontrollib server ka **kuju ja piire**:

- pealkiri on tekst ja pikkusega 1–255 märki;
- aadress on kehtiv veebiaadress;
- kuupäevad on kuupäevad;
- üritus lõpeb **pärast** algust.

Kui midagi ei kehti, vastab server `400` koos selgitusega, mis väljal mis viga:

```json
{
  "error": "Vigane päring",
  "details": { "title": ["Too small: expected string to have >=1 characters"] }
}
```

Nii saab frontend vea otse vormi vastava välja alla panna.

::: warning Valideerimine ei ole äriloogika
**Valideerimine** vastab küsimusele: "kas see päring on õiget kuju?" (*kas pealkiri on tekst?*)

**Äriloogika** vastab küsimusele: "kas rakenduse reeglid lubavad seda?" (*kas see on SINU üritus? kas see on veel mustand?*)

Esimene kuulub DTO juurde, teine service'i (vt eelmine leht).
:::

## Probleem 2: mida ostjale näidata?

Andmebaasis on ürituse kohta rohkem väljasid kui klient peaks nägema: korraldaja sisemine id, olek, loomise ja muutmise ajatempel.

| Väli | Korraldaja | Ostja (avalik) |
| --- | --- | --- |
| Pealkiri, aeg, koht | jah | jah |
| Korraldaja id | jah | **ei** |
| Olek (mustand/avaldatud) | jah | **ei** |
| Ajatemplid | jah | **ei** |

Kui saadaksime kogu rea, hakkaksid kõik sisemised väljad kogemata välja jooksma. Seepärast on **kaks väljund-DTO-d**, mis on kokku pandud käsitsi: ainult need väljad, mis peavad minema.

**Boonus:** kui andmebaasi tabelisse tuleb uus väli (nt `internalNotes`), siis ta **ei lähe automaatselt avalikuks**. Kuni DTO-sse ei ole teda lisatud, jääb ta serverisse.

## Katseta: saada ürituse loomise päring

Näites on juba üks pahatahtlik päring: see proovib ise määrata olekut ja omanikku. Vaata, mis neist väljadest saab. Siis proovi teisi näiteid või kirjuta JSON ise ümber.

<DtoPlayground />

Märka, et liigsed väljad **eemaldatakse vaikselt**: päring ei kuku läbi, aga need ei jõua kunagi andmebaasi. Vigased väljad seevastu annavad `400` ja midagi ei salvestata. Kuupäevade järjekorda kontrollitakse alles siis, kui väljad ise on korras.

## Mis juhtuks ilma?

| Ilma DTO-ta | Tagajärg |
| --- | --- |
| Sisendit ei kontrollita | Keegi loob ürituse teise nime alla, või paneb pealkirjaks 10 MB teksti |
| Väljundis on kogu rida | Avalikust vastusest leiab sisemisi andmeid |
| Vormi kuju sõltub tabelist | Iga tabeli muudatus lõhub frontend'i |

## Kuidas see meie koodis välja näeb

::: details Sisend-DTO (võib vahele jätta)
Kirjeldame sisendi kuju koos reeglitega:

```ts
const createEventDto = z.object({
    title: z.string().min(1).max(255),
    city: z.string().min(1).max(100),
    startsAt: isoDateTime,
    endsAt: isoDateTime,
    // ... status ja organizerId SIIN POLE
}).refine((dto) => dto.endsAt > dto.startsAt, {
    message: "Üritus peab lõppema pärast algust",
    path: ["endsAt"],
});
```

Controller kasutab seda nii:
```ts
const dto = createEventDto.parse(req.body); // viskab vea, kui kuju ei klapi
const event = await service.create(dto, req.user.id); // omanik tuleb sisselogitud kasutajalt
```

Märka, et `organizerId` ei tule päringust, vaid **sisselogitud kasutajalt**. Seda ei saa kasutaja ise määrata.
:::

::: details Väljund-DTO (võib vahele jätta)
Avalik vastus on käsitsi kokku pandud:

```ts
function toPublicEventResponse(event) {
    return {
        id: event.id,
        title: event.title,
        city: event.city,
        startsAt: event.startsAt.toISOString(), // kuupäev tekstina
        // organizerId, status, createdAt: ei lähe välja
    };
}
```

Kuupäevad muudetakse ka tekstiks (ISO-formaat), sest JSON ei oska kuupäevi, ainult teksti ja numbreid.
:::

## Kontrollküsimused

1. Miks ei tohi `organizerId` tulla kliendi saadetud päringu kehast?
2. Korraldaja saadab ürituse loomise päringu, kus `endsAt` on enne `startsAt`. Mis vastuse ta saab ja milline kiht selle annab?
3. Andmebaasi lisatakse väli `internalNotes`. Kas see satub kohe avalikku vastusesse? Miks?

::: details Vastused
1. Sest kliendi päring on kasutaja käes ja ta võiks määrata endale suvalise omaniku. Omanik võetakse **sisselogitud kasutajalt**, keda server on ise tuvastanud.
2. Ta saab vastuseks `400` ja selgituse väljal `endsAt`. Selle annab **valideerimine** (sisend-DTO reegel).
3. Ei, sest väljund-DTO on käsitsi koostatud ja seal seda välja pole. Avalikuks tuleb ta teha teadlikult.
:::
