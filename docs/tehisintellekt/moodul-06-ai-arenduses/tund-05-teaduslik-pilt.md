---
title: 6.5 Kas AI tegelikult kiirendab arendajaid? Teaduslik pilt
description: METR-i 2025 randomiseeritud kontrollitud uuring näitas kogenud arendajate aeglustumist, mitte kiirenemist — ja Google Cloud'i DORA raport selgitab, miks.
---

# 6.5 Kas AI tegelikult kiirendab arendajaid? Teaduslik pilt

::: tip Selle tunni järel...
- tead METR-i 2025 randomiseeritud kontrollitud uuringu (RCT) tulemust ja selle ausaid piiranguid;
- oskad seda kõrvutada tunnis 6.2 nähtud positiivse GitHub/Accenture tulemusega;
- mõistad Google Cloud DORA raporti sünteesivat selgitust selle näiva vastuolu kohta.
:::

## Üllatav tulemus: METR 2025

[Tund 5.1](/tehisintellekt/moodul-05-ai-oppimises/tund-01-miks-ai-oppimises-toimib) ja [tund 5.3](/tehisintellekt/moodul-05-ai-oppimises/tund-03-keeruliste-mistete-oppimine) näitasid juba, et "AI kasutamine" ja "parem tulemus" ei ole automaatselt sama asi õppimises. Sama muster kordub arendajate reaalses töös.

Uurimisorganisatsioon METR viis 2025. aastal läbi range randomiseeritud kontrollitud uuringu (RCT): 16 kogenud avatud lähtekoodiga arendajat lahendasid 246 päris probleemi (keskmiselt ~2h igaüks) oma tuttavates, kõrge kvaliteedinõudega projektides — pooled ülesanded lahendati AI abiga, pooled ilma.

::: warning Tulemus
Arendajad olid AI kasutades **19% aeglasemad**, mitte kiiremad — ehkki nad ise ennustasid enne katset end olevat AI-ga 24% kiiremad, ja uskusid ka **pärast** katset, et olid olnud umbes 20% kiiremad, kui tegelikult olid. Aeg nihkus aktiivselt kodeerimiselt ja otsimiselt AI promptimisele, ootamisele ja väljundi ülevaatamisele.

Allikas: [METR — Early 2025 AI experienced OS dev study](https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/) — esmane allikas, RCT-disain.
:::

::: info Uuringu autorite endi aus piirang
See uuring **ei näita**, et AI ei tööta "enamiku arendajate" jaoks üldiselt. Valim oli kitsas: kogenud hooldajad, suured ja kvaliteetsed avatud lähtekoodiga projektid, kus tundmine ja kontekst on juba väga sügav. Autorid ei välista, et parem promptimine või seadistus (nt [tund 3.6](/tehisintellekt/moodul-03-promptimine/tund-06-prd-naide) laadne spetsifikatsiooni-lähenemine) muudaks tulemust.
:::

## Kuidas see kõrvutub tunni 6.2 positiivse tulemusega?

Kaks ranget uuringut, kaks näiliselt vastandlikku tulemust. Google Cloud'i **DORA 2025 raport** (~5000 vastajat, iga-aastane suuremahuline uuring tarkvaraarenduse tavade kohta) pakub sünteesi: AI kasutamine tarkvaraarenduses on jõudnud 90%-ni (+14 protsendipunkti aastaga), aga raporti keskne järeldus on:

> *"AI ei paranda meeskonda — see võimendab seda, mis juba olemas on."*

Kui aluseks olev protsess ja praktikad on tugevad (selged spetsifikatsioonid, head testid, väikesed kontrollitavad sammud — [tund 3.6](/tehisintellekt/moodul-03-promptimine/tund-06-prd-naide) mõttes), võimendab AI seda kasu. Kui protsess on nõrk või kontekst puudulik (nagu võib juhtuda ka väga kogenud arendajal keerulises, harjumatus töövoos), võimendab AI ka seda — aeglustumise ja segaduse kujul.

Allikas: [Google Cloud — 2025 DORA report](https://cloud.google.com/resources/content/2025-dora-ai-assisted-software-development-report) — esmane allikas.

::: info Läbiv joon terves kursuses
Täpselt sama põhimõte, mida nägime [tunnis 5.3](/tehisintellekt/moodul-05-ai-oppimises/tund-03-keeruliste-mistete-oppimine): AI väärtus ei tule tööriistast endast, vaid sellest, kui hästi see on protsessi sisse ehitatud ja kui aktiivselt/teadlikult seda kasutatakse.
:::

## Viited ja lisalugemine

- [METR — Early 2025 AI experienced OS dev study](https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/)
- [Google Cloud — 2025 DORA report](https://cloud.google.com/resources/content/2025-dora-ai-assisted-software-development-report)
- [Tund 6.2 — Reaalsed näited](./tund-02-ettevotete-naited)
- [Tund 5.3 — Praktikas: keeruliste mõistete õppimine](/tehisintellekt/moodul-05-ai-oppimises/tund-03-keeruliste-mistete-oppimine)
