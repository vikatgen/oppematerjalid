---
title: Testimine II
description: "M7. Tarkvarasüsteemide testimine, Testimine II. Testiplaan ja stsenaariumid, testimisvahendid, ühiktestid, mock-klassid, integratsioonitestid, mõõtmised, veaaruanded ja testiaruanne (10 kohtumist)."
outline: deep
---

# Testimine II

::: info Õpiväljund
**ÕV3.** Tagab rakenduse või teenuse toimimise vastavuse nõuetele, kasutades sobivusel automaattestimist.
:::

## Hindamiskriteeriumid

- **HK 3.1.** Rakendab testimisplaani ja teststsenaariumeid.
- **HK 3.2.** Kasutab mooduli testimisel vähemalt 2 erinevat testimismeetodit.
- **HK 3.3.** Kasutab vähemalt 2 erinevat testivahendit, näiteks testimise tarkvara.
- **HK 3.4.** Loob rakendusele ühiktestid.
- **HK 3.5.** Loob ja kasutab mock-klasse ühiktesti skoobist väljapoole jäävate osade testimiseks.
- **HK 3.6.** Testib automaattestidega enda ja teiste koostatud rakendusi.

## Mida see moodul õpetab

[Testimise alused](/testimise-alused/sissejuhatus) vastas küsimusele **mida ja miks** testida. Siin teed seda ise: koostad testiplaani, valid vahendid, kirjutad ühiktestid ja integratsioonitestid, mõõdad, kui hästi testid töötavad, ning õpid vead kirja panema ja nende parandamist jälgima.

Iga kohtumine on 1,5 tundi ja **suurem osa sellest on praktikum**. Teooria on selleks, et praktikumis oleks selge, mida ja miks sa teed.

## Tegelane ja ettevõte

**Kaarel** töötab endiselt ettevõttes **Tammelaan Tarkvara OÜ**. Alguses oli ta noor testija. Nüüd vastutab ta **Rannamõisa Käsitöökeskuse** töötubade registreerimise rakenduse kvaliteedi eest: Reet kirjutab koodi, Kaarel peab ütlema, kas see vastab nõuetele.

| Nimi | Roll |
| --- | --- |
| Kaarel | Testija (sinu tegelane) |
| Reet | Arendaja, kirjutab registreerimise loogika |
| Tiit | Projektijuht, tahab teada, millal on valmis |
| Anu | Käsitöökeskuse juhataja, kliendi esindaja |
| Mihkel | Süsteemiadministraator |

Kõik nimed, ettevõtted, hinnad ja reeglid on **väljamõeldud**. Standardid ja nimetatud tööriistad (Vitest, Supertest, Postman) on päris.

## Praktikumirepo

Kõik praktilised ülesanded tehakse ühes väikeses repos. Aluseks on **mallrepo** [vikatgen/testimine-ii-praktikum-student](https://github.com/vikatgen/testimine-ii-praktikum-student) (GitHubi *template repository*). Sa teed sellest oma koopia:

1. Ava [mallrepo](https://github.com/vikatgen/testimine-ii-praktikum-student) ja vajuta **Use this template → Create a new repository**.
2. Vali nähtavuseks **Private** (nii ei näe kaaslased sinu lahendusi).
3. Lisa õpetaja kaastöötajaks (**Settings → Collaborators**), et ta näeks sinu edenemist.
4. Klooni oma repo ja käivita testid:

```bash
git clone <sinu repo aadress>
cd <sinu repo kaust>
npm install
npm test
```

Vajalik on Node.js 20 või uuem. Repos on:

| Kaust | Sisu |
| --- | --- |
| `spetsifikatsioon/nouded.md` | Rannamõisa nõuded NR-1 ... NR-14 ja API kirjeldus |
| `src/` | Rakendus (umbes 460 rida, ilma andmebaasita) |
| `harjutused/` | Testid, mida sa täidad. Igas failis on ülesanded, mis kukuvad teatega **"Test on kirjutamata"** |
| `postman/` | Postmani kollektsioon ja keskkond |
| `.github/` | Issue vormid (stsenaarium, veaaruanne, küsimus) ja testide automaatne käivitus (GitHub Actions) |

Alguses läbivad vaid näited. **Sinu töö on iga ülesanne ühe kaupa päris testiks teha.**

## Töö GitHubis

Selles moodulis töötad nii, nagu töötatakse tarkvaraettevõttes:

- **Stsenaariumid, veaaruanded ja küsimused** kirjutad GitHubi **Issues** alla vormidega (rippmenüüd ja väljad, mitte tabelid).
- **Testid** käivituvad iga `git push`-iga automaatselt (**GitHub Actions**, CI). Punane tähendab, et mõni test kukub.
- **Dokumendid ja märkused** (testiplaan, otsustustabel, testiaruanne, refleksioonid) kirjutad ühte **päevikusse**: GitHubi issue'sse, mitte koodi hulka.
- **Testi nimi algab nõude numbriga** (`NR-4: grupisoodus`), nii on nõude ja testi seos otsinguga leitav.

## Kuidas kohtumine kulgeb

| Osa | Aeg | Sisu |
| --- | --- | --- |
| Lugu | 5-10 min | Midagi juhtub Kaarelile |
| Teooria | 15 min | Mõiste või meetod ja selle näide |
| Praktikum | 55-60 min | Ülesanded praktikumirepos |
| Refleksioon | 5 min | Mida õppisid, mis oli raske |

## Päevik {#paevik}

Päevik on **üks GitHubi issue** sinu repos. See on sinu töö dokumentatsioon väljaspool koodi, nii nagu päris tiimis hoitakse testplaane ja aruandeid koodist eraldi.

**Loomine (kohtumisel 1):** Issues → New issue → **Päevik**. Pane issue pealkirja `[PÄEVIK]` järele oma nimi, loo see ja kinnita (**Pin issue**).

**Kasutamine:** iga kohtumise lõpus lisa issue'le **uus kommentaar** selle malliga:

```markdown
## Kohtumine N: pealkiri

**Tehtud:** üks-kaks lauset, mida tegid

**Märkused:** tõendite loendi punktid sellest kohtumisest

**Lingid:** issue'd (#12, #13), pull request, testifailid. Detailid on issue'des, siia piisab lingist ja ühest lausest

**Refleksioon:** 2-3 lauset (mis oli raske, mida õppisid)
```

Suuremad dokumendid (testiplaan, otsustustabel, mutandid, mõõdikud, testiaruanne) lisa samuti **kommentaarina** oma pealkirjaga (nt `## Testiplaan`). GitHub joonistab ka Mermaidi diagrammid ja Markdowni tabelid. Õpetaja loeb sinu päevikut ja vastab sinna kommentaaridega.

## Issue on töö elutsükkel

Iga **stsenaarium** ja iga **viga** elab oma issue's **algusest lõpuni**. Kõik, mis sellest tööst on teada, on ühes kohas:

| Etapp | Mis issue's | Kus see on |
| --- | --- | --- |
| **Loomine** | Stsenaarium või veaaruanne (vorm) | Issue esimene postitus |
| **Töö käigus** | Käsitsi läbimise tulemus, taasesitus, märkused | Kommentaarid |
| **Automatiseerimine** | Automaattesti nimi (`NR-x: ...`), commit | Kommentaar |
| **Parandus** | Pull request, mis sisaldab `Closes #...` | PR kirjeldus ja issue ajajoon |
| **Lõpetamine** | Issue suletakse (põhjusega) | Staatus |

**Päevik** on kokkuvõte ja indeks: seal on lingid issue'dele (#12, #13), märkused ja refleksioon. Detailid on issue's.

## Portfoolio ja hindamine

Iga kohtumise lõpus on **tõendite loend**. Tõendid on päevikus ja sinu repos: päevik, testid kaustas `harjutused/`, stsenaariumid, veaaruanded ja küsimused issue'dena ning pull requestid. Õpetaja näeb neid, sest ta on sinu repo kaastöötaja.

| HK | Tõend |
| --- | --- |
| 3.1 | Testiplaan, stsenaariumid (issue'd), nõuete katvus, testiaruanne |
| 3.2 | Testid, mis kasutavad kahte meetodit: ekvivalentsiklassid ja piirväärtused ning otsustustabel või olekud |
| 3.3 | Testid kahe vahendiga: Vitest (koos Supertestiga) ja Postman |
| 3.4 | Ühiktestid (kohtumised 3 ja 5) |
| 3.5 | Ise kirjutatud mock-klassid (kohtumine 4) |
| 3.6 | Testid oma rakenduse vastu ja vea elutsükkel: veaaruanded (issue'd), parandus ja pull request (kohtumised 8 ja 10). Teise inimese rakenduse testimine käib samal viisil (`TARGET_URL`), seda eraldi ei harjutata |

## Kohtumised

| # | Teema | HK |
| --- | --- | --- |
| 1 | [Nõuetest testiplaanini](./kohtumine-01-nouded-ja-testiplaan) | 3.1 |
| 2 | [Automatiseerida või mitte: vahendid ja keskkond](./kohtumine-02-vahendid-ja-keskkond) | 3.3 |
| 3 | [Ühiktestid ja testiandmete valik](./kohtumine-03-uhiktestid) | 3.4, 3.2 |
| 4 | [Mockid ja ise kirjutatud mock-klassid](./kohtumine-04-mockid) | 3.5, 3.4 |
| 5 | [Otsustustabel ja olekud](./kohtumine-05-otsustustabel-ja-olekud) | 3.2 |
| 6 | [Integratsioonitestid I: Supertest](./kohtumine-06-integratsioon-i) | 3.3, 3.4 |
| 7 | [Integratsioonitestid II: registreerimine ja tühistamine](./kohtumine-07-integratsioon-ii) | 3.3, 3.4 |
| 8 | [Mõõtmised: katvus, jälgitavus, mutatsioonid](./kohtumine-08-moodikud) | 3.1, 3.6 |
| 9 | [Jõudlus: Postman ja Newman](./kohtumine-09-joudlus) | 3.3 |
| 10 | [Vea elutsükkel ja testiaruanne](./kohtumine-10-vead-ja-testiaruanne) | 3.6, 3.1 |

Tõendid kokku: [Ülesanded](./assignments).
