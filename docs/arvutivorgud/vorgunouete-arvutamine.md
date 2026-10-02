---
title: Võrgunõuete arvutamine ja hindamine
description: "Tund 5: ülemus küsib Marilt, kas kontori internetiühendus jätkub. Kuidas arvutada vajalik läbilaskevõime samaaegsete kasutajate, videovoogude ja failiedastuse põhjal."
outline: deep
---

# Võrgunõuete arvutamine ja hindamine

::: info Õpiväljund
Pärast tundi oskad koostada lihtsa arvutuse, mis hindab väikese ettevõtte võrgu vajalikku läbilaskevõimet, nimetada oma eeldused ning selgitada, miks pelgalt kasutajate arvust ei piisa.
:::

## Ülemus küsib: "Kas meie internet jätkub?"

[Eelmises tunnis](./vorgu-koormuse-mootmine) mõõtis Mari, kui palju võrku üks inimene kasutab. Nüüd tuleb tema juurde ülemus: "Meie firmas on 20 töötajat. Kontoris on internetileping 50 Mbit/s. Kas sellest piisab? Või tellime kiirema?"

Siin ei aita mõõtmine, sest küsimus on tuleviku kohta. Mari peab **arvutama**.

Arvutamiseks tuleb teada kolme asja:

1. **Kes ja mida teeb?** (kontoritöö, videokõne, failiedastus)
2. **Kui palju igaüks vajab?** (Mbit/s alla ja üles)
3. **Kui paljud teevad seda korraga?** (samaaegsus)

Kõik need on **eeldused**. Hea arvutuse tunnus on see, et eeldused on kirjas ja neid saab muuta. Kui ülemus ütleb "aga meil on tegelikult 25 töötajat", muudab Mari ühe numbri ja arvutab uuesti.

## Mari lähtearvud

Mari kirjutab üles, mida ta teab. Osa numbreid saab ta mõõtmisest, osa teenusepakkujate soovitustest.

| Tegevus | Soovituslik kiirus | Allikas |
| --- | --- | --- |
| Video 720p (HD) | 3 Mbit/s või rohkem | Netflix |
| Video 1080p (Full HD) | 5 Mbit/s või rohkem | Netflix |
| Video 4K (Ultra HD) | 15 Mbit/s või rohkem | Netflix |
| Zoom grupivideo 720p | 2,6 Mbit/s üles, 1,8 Mbit/s alla | Zoom |

Kontoritöö (e-post, dokumendid, veebilehed) vajab inimese kohta vähe ja täpset universaalset arvu pole. Mari kasutab oma eelmise tunni mõõtmist ja eeldab: **1 Mbit/s alla ja 0,5 Mbit/s üles** töötaja kohta.

::: tip Eeldus, mitte reegel
Need numbrid ei ole tõde, vaid Mari valik. Netflixi 5 Mbit/s 1080p jaoks on soovitus, päris video võib sõltuvalt kvaliteedist vajada vähem või rohkem. Seepärast kirjutab Mari iga arvu kõrvale, kust see on.
:::

## Mari arvutuskäik

**Mari eeldused:**

- 20 töötajat.
- Igal hetkel on aktiivne umbes 70% neist (osa on koosolekutel, osa puhkusel või väljas).
- Kontoritöö: 1 Mbit/s alla ja 0,5 Mbit/s üles töötaja kohta.
- Igal hetkel võib toimuda üks videokoosolek 6 osalejaga samast kontorist (Zoom HD: 2,6 üles, 1,8 alla osaleja kohta).
- Päeva lõpus laetakse varukoopiana üles 2 GB.

### 1. Kontoritöö

```text
Alla:  20 × 0,7 × 1   = 14 Mbit/s
Üles:  20 × 0,7 × 0,5 =  7 Mbit/s
```

### 2. Videokoosolek (alla ja üles eraldi)

Internetiühendus on tihti **asümmeetriline**: allalaadimine on kiirem kui üleslaadimine. Videokõne vajab mõlemat, seepärast arvuta suunad **eraldi**.

```text
Alla:  6 × 1,8 = 10,8 Mbit/s
Üles:  6 × 2,6 = 15,6 Mbit/s
```

### 3. Liida kokku

```text
Alla:  14 + 10,8 = 24,8 Mbit/s
Üles:   7 + 15,6 = 22,6 Mbit/s
```

### 4. Lisa varu

Päris liiklus on ebaühtlane ja ühendus ei jõua kunagi täis kiiruseni. Seepärast lisab Mari **varu 30%**. See on tema valik, mitte seadus, nii et ta kirjutab selle eeldusena üles.

```text
Alla:  24,8 × 1,3 ≈ 32 Mbit/s
Üles:  22,6 × 1,3 ≈ 29 Mbit/s
```

### 5. Varukoopia

`2 GB = 2 × 8 000 Mbit = 16 000 Mbit` (1 GB = 8 000 Mbit).

Kui üleslaadimiseks jääb 20 Mbit/s: `16 000 ÷ 20 = 800 s ≈ 13 minutit`. Päeva lõpus, kui kõik on koju läinud, pole see probleem. Kui varukoopia tehtaks keset päeva, jääks videokoosolek ilma, sest üleslaadimine on täis.

### 6. Hinnang ülemusele

> Ühendus peaks andma **vähemalt ~32 Mbit/s alla ja ~29 Mbit/s üles**. Praegune 50 Mbit/s lubab seda, **kui üleslaadimine on samuti 50**. Enamik koduse tüüpi lepinguid on aga asümmeetrilised (nt 50 alla / 10 üles), mille puhul ei piisa. Siis on kitsaskoht üleslaadimine.

## Kitsaskoht: aeglaseim lüli

Isegi kui internetileping on piisav, võib mõni teine osa ahelas piirata. **Kitsaskoht** on osa, mis piirab kogu ahelat.

```mermaid
flowchart LR
    A["Töötajate arvutid<br/>1 Gbit/s kaabel"] --> B["Kommutaator<br/>1 Gbit/s"]
    B --> C[Ruuter]
    C --> D["Internetileping<br/>10 Mbit/s üles"]
    D --> E[Teenus]
```

Siin on kitsaskoht internetileping üleslaadimisel (10 Mbit/s). Kommutaatori kiirendamine ei aitaks. Mari ülesanne on leida see lüli, mis otsustab.

## Miks ainult kasutajate arvust ei piisa?

Ülemus võib küsida: "Meil on 20 inimest, kas ei piisa 20 × midagi?" Mari vastab: sõltub, **mida nad teevad**.

| Firma | Töötajaid | Tegevus | Ligikaudne vajadus alla |
| --- | --- | --- | --- |
| A | 20 | Ainult kirjutavad dokumente | ~14 Mbit/s |
| B | 5 | Kõik vaatavad korraga 4K videot (15 Mbit/s) | 75 Mbit/s |

Väiksem firma vajab rohkem. Tegelik vajadus sõltub:

- **mida** kasutajad teevad;
- **mitu neist korraga**;
- **mis suunas** (alla või üles);
- **kui palju varu** on vaja.

## Praktiline töö: sinu kord olla Mari

Õpetaja annab rühmale näidisettevõtte (töötajate arv, tegevused). Teie olete Mari ja vastate ülemuse küsimusele.

1. Kirjutage üles **kõik eeldused** (samaaegsus, kiirused tegevuse kohta, varu) ja mainige iga eelduse allikat või põhjendust.
2. Arvutage alla- ja üleslaadimise vajadus **eraldi**.
3. Arvutage failiedastuse aeg (näiteks 5 GB võtab ühe ühendusega mitu minutit?). Vihje: 1 GB = 8 000 Mbit.
4. Leidke kitsaskoht antud seadmete ja ühenduse põhjal.
5. Kirjutage kaks lauset ülemusele: kas olemasolev ühendus piisab ja miks.
6. Põhjendage, miks ainult kasutajate arvust ei piisa.

**Esitatav töö:** arvutuskäik, eeldused ja põhjendatud hinnang.

## Kokkuvõte

| Samm | Mida teha |
| --- | --- |
| 1 | Kirjuta tegevused ja eeldused |
| 2 | Arvuta alla ja üles eraldi |
| 3 | Võta arvesse samaaegsus |
| 4 | Lisa varu |
| 5 | Leia kitsaskoht |
| 6 | Põhjenda hinnang |

## Allikad

- [Netflix Help Center: Internet connection speed recommendations](https://help.netflix.com/en/node/306)
- [Zoom: System requirements for Zoom](https://support.zoom.com/hc/en/article?id=zm_kb&sysparm_article=KB0060748)
- [Cloudflare Learning: What is bandwidth?](https://www.cloudflare.com/learning/network-layer/what-is-bandwidth/)
