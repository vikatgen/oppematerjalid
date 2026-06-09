---
title: JavaScript brauseris
description: Brauserikeskkonna teemad ja praktilise töö eesmärk.
outline: deep
---

# JavaScript brauseris

::: info Brauseriosa tulemus
Brauseriosa lõpuks oskad luua interaktiivse veebirakenduse, mis loeb ja muudab DOM-i, reageerib kasutaja tegevustele, säilitab andmeid ning küsib andmeid serverist.
:::

## Eeldused

Enne brauseriosa alustamist peaksid oskama:

- kavandada väikese programmi lahenduse;
- kasutada objekte ja massiive;
- koostada tingimusi, tsükleid ja funktsioone;
- jälgida koodi täitmist ning leida lihtsa vea põhjuse.

## Kuidas õppimist hinnatakse?

Eesmärk ei ole kirjutada kogu lahendus peast. Õppija peab oskama:

- selgitada oma sõnadega, mida kasutatud kontseptsioon teeb;
- põhjendada, miks valitud võte ülesandesse sobib;
- jälgida koodi täitmist ja ennustada olulisi tulemusi;
- kasutada õppematerjali ning dokumentatsiooni lahenduse koostamiseks;
- kontrollida tulemust ja leida vea põhjust.

Süntaks ja töövõtted kinnistuvad harjutamisega. Mõistmine tähendab, et oskad lahendust lugeda, selgitada, kohandada ja kontrollida.

## Kuidas rakendus valmib?

Brauseriosa järgib rakenduse loomise töövoogu:

1. **Käivita:** ühenda JavaScript HTML-dokumendiga ja kasuta DevToolsi.
2. **Leia:** loe DOM-puud ning leia vajalikud elemendid.
3. **Muuda:** uuenda teksti, omadusi, atribuute, klasse ja elemente.
4. **Reageeri:** kuula kasutaja tegevusi ning töötle vorme.
5. **Salvesta:** säilita rakenduse olek brauseris.
6. **Küsi serverist:** kasuta asünkroonset koodi ja `fetch()` päringuid.
7. **Ehita tervik:** ühenda õpitud oskused praktiliseks veebirakenduseks.

## Läbiv projekt: tootekataloog

Brauseriosa jooksul ehitad samm-sammult väikese tootekataloogi. Iga õppetund lisab samale rakendusele ühe nähtava oskuse:

| Etapp | Rakendusele lisanduv tulemus |
|---|---|
| Brauseri arenduskeskkond | töötav HTML-, CSS- ja JavaScripti algprojekt |
| DOM-i lugemine | lehe elementide leidmine ja kontrollimine |
| DOM-i muutmine | kohalike tooteandmete kuvamine tootekaardina |
| Sündmused | nupud, otsing, filtrid ja vormisisend |
| Brauseri andmed | lemmikute või ostukorvi säilitamine |
| Asünkroonsus | toodete laadimine Fake Store API-st |
| Praktiline töö | terviklik kataloog laadimis-, vea- ja tühja olekuga |

Alguses kasutad lokaalseid näidisandmeid. Nii saad õppida DOM-i ja sündmuseid ilma võrgupäringu lisakeerukuseta. `fetch()` tunnis asendad lokaalsed andmed API vastusega.

::: tip Seos järgmise mooduliga
[Rakenduste loomise](/rakenduste-loomine/sissejuhatus) moodulis võtad sama tootekataloogi ning viid selle Vite'i, keskkonnamuutujate, kvaliteeditööriistade ja produktsioonibuildi peale.
:::

## Asünkroonsuse roll

Asünkroonne programmeerimine on JavaScripti täitmismudeli osa, mida kasutame brauseris praktiliselt serveripäringute ja teiste ootamist vajavate tegevuste jaoks.

Õpid kasutama `Promise`, `async`/`await` ja `fetch()` võtteid. Kui soovid mõista event loop'i, mikroülesannete ja makroülesannete täpsemat toimimist, loe [event loop'i lisamaterjali](./sundmused/event-loop-mikro-ja-makro.md).

## Hindamine

Brauseriosa hinnatakse praktilise tööga. Valmis rakendus peab:

- kuvama ja muutma DOM-i sisu;
- reageerima kasutaja sündmustele;
- töötlema vormisisendit;
- säilitama vähemalt osa olekust brauseris;
- tegema asünkroonse päringu;
- näitama laadimis-, õnnestumis- ja veaolekut.
