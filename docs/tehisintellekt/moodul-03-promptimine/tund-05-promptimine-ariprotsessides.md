---
title: 3.5 Promptimine äriprotsessides
description: Kuidas kasutada promptimisoskust igapäevaste äriprotsesside toetamiseks — koos uuringutulemuste ja tervikliku näitega.
---

# 3.5 Promptimine äriprotsessides

::: tip Selle tunni järel...
- oskad siduda promptimisoskuse konkreetsete äriprotsesside ja ärieesmärkidega;
- tead, mida uuringud näitavad AI-abi mõju kohta töötajate tootlikkusele;
- oskad ehitada lihtsast, ebamäärasest prompti täieliku tööprompti.
:::

## Tagasi ärieesmärkide juurde

[Tunnis 1.3](/tehisintellekt/moodul-01-mis-on-ai/tund-03-kus-kasutatakse) nägime, et AI kasutamist ettevõttes tasub vaadata läbi konkreetse ärieesmärgi — kulude kokkuhoid, tootlikkus, kliendikogemus, käibe kasv, riskijuhtimine. Promptimisoskus on tööriist, mille abil üksik töötaja neid eesmärke igapäevaselt ise toetada saab, ilma et oleks vaja spetsiaalset tarkvaraarendust:

| Ärieesmärk | Igapäevane promptimise kasutus |
|---|---|
| Tootlikkus ja tõhusus | Kirjade, aruannete ja kokkuvõtete esimese versiooni kiire koostamine |
| Kliendikogemus | Kliendikirjadele vastamise mustandite kiirem koostamine, tõlkimine |
| Käibe kasv ja innovatsioon | Turundustekstide, tootekirjelduste, ideede esialgsete versioonide loomine |
| Riskijuhtimine ja vastavus | Pikkade dokumentide (lepingud, juhendid) kiire kokkuvõtte tegemine läbivaatuseks |

## Mida näitavad uuringud

Kõige põhjalikum senine uuring AI-abi mõjust reaalsel töökohal jälgis USA suurettevõtte 5179 klienditoe töötajat enne ja pärast AI-vestlusassistendi kasutuselevõttu (3 miljonit vestlust). Tulemus: AI-abi kasutamine tõstis lahendatud juhtumite arvu tunnis keskmiselt **15%** — kusjuures vähem kogenud töötajate tootlikkus kasvas kuni **34%**, samas kui kõige kogenumate töötajate tulemus muutus vähe ([Brynjolfsson, Li, Raymond, *Quarterly Journal of Economics*, 2025](https://academic.oup.com/qje/article/140/2/889/7990658); [NBER töövihik, 2023](https://www.nber.org/papers/w31161)).

::: info Miks see praktikas oluline on
Uuring näitas ka, et kasu polnud ühtlane — kogenematutele töötajatele aitas AI kõige rohkem, sest see andis neile juurdepääsu mustritele, mida kogenud kolleegid juba teadsid. See tähendab: promptimisoskus ei asenda valdkonnateadmisi, aga see aitab vähem kogenud inimesel kiiremini järele jõuda.
:::

## Näide: ebamäärasest promptist tööprompiks

Kombineerime selle mooduli varasemad tehnikad ([3.2](./tund-02-prompti-anatoomia), [3.3](./tund-03-rollid-ja-naited)) ühe reaalse äriprotsessi peal — kliendikirjale vastamine.

**1. samm — ebamäärane prompt:**
```
Vasta sellele kliendikirjale.
```

**2. samm — lisame konteksti ja ülesande:**
```
Oled e-poe klienditoe töötaja. Klient kirjutas, et tema tellimus on hilinenud.
Vasta talle, selgita viivitust ja vabanda.
```

**3. samm — lisame formaadi ja rolli ([3.3](./tund-03-rollid-ja-naited)):**
```
Oled sõbralik, aga professionaalne e-poe klienditoe töötaja.
Klient kirjutas, et tema tellimus on hilinenud.

Kirjuta vastus, mis:
- vabandab viivituse pärast;
- selgitab, et see on tarnija-poolne logistikaviivitus;
- pakub hüvitiseks 10% allahindlust järgmiselt ostult;
- on maksimaalselt 100 sõna pikk.

Kliendi kiri: "Tellisin nädal tagasi pesumasina, aga see pole ikka veel kohale jõudnud..."
```

Kolmas versioon annab mudelile piisavalt konteksti, et esimene vastus oleks tõenäoliselt otse kasutatav — säästes iteratsioonivoore, mida käsitlesime [tunnis 3.4](./tund-04-iteratiivne-promptimine).

## Kokkuvõte

Promptimine ei ole omaette tehniline oskus, mida kasutatakse "AI pärast" — see on praktiline tööriist, mis aitab tavatöötajal iga päev kiiremini ja ühtlasema kvaliteediga tulemusi saavutada, olgu tegu kirja, kokkuvõtte või esialgse mustandiga. Järgmises moodulis vaatame, milliste konkreetsete tööriistadega seda igapäevaselt teha.

## Viited ja lisalugemine

- Brynjolfsson, E., Li, D., Raymond, L. (2025). ["Generative AI at Work"](https://academic.oup.com/qje/article/140/2/889/7990658), *Quarterly Journal of Economics*
- [NBER Working Paper 31161 — Generative AI at Work (2023)](https://www.nber.org/papers/w31161)
