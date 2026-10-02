---
title: Info ja failide jagamine
description: "Kohtumine 6: Liis jagas OneDrive'i kausta kõigile, kellel on link. OneDrive ja SharePoint, jagamislingid ja õigused, kanali valik, isikuandmed ja GDPR ning arendaja vaates .gitignore ja saladused."
outline: deep
---

# 6. Info ja failide jagamine

::: info Õpiväljund
Pärast tundi valid failile sobiva hoiukoha ja jagamisviisi, seadistad õigused õigesti ja tead, millal failis olev info ei tohi liikuda (HK 2.2).
:::

Liis ja kaks klassikaaslast teevad rühmatööd. Liis loob OneDrive'is kausta "Rühmatöö", paneb sinna kõik materjalid ja vajutab "Jaga". Menüüs on mitu valikut, aga ta ei loe neid, vaid valib esimese, mis tundub kõige lihtsam, ja saadab lingi grupivestlusse.

Mõne tunni pärast kirjutab keegi teisest rühmast: "Tänan, et jagasid oma materjali, on abiks!" Liis ei jaganud seda neile. Aga link, mille ta saatis, töötas **kõigile, kellel link oli**, ja keegi oli seda edasi saatnud.

## Kuhu fail kuulub: OneDrive või SharePoint?

Microsoft 365-s on failide jaoks kaks põhikohta. Microsofti dokumentatsiooni järgi:

- **OneDrive** on koht failidele, mida jagad inimestega, keda sa kutsud. Sinna salvestatu on **privaatne, kuni sa selle jagad**. See sobib isiklikele ja mustandfailidele.
- **SharePoint** on koht meeskonna ja organisatsiooni sisule. Teamsi meeskonna loomisel tekib automaatselt ka SharePointi sait ja dokumendikogu meeskonna failide jaoks.

Teisisõnu: **Teamsi failid on tegelikult SharePointis.**

| Fail | Kuhu | Põhjus |
| --- | --- | --- |
| Liisi isiklik märkmik ja mustand | OneDrive | Privaatne, kuni jagan |
| Rühmatöö kolmele | Teamsi meeskonna failid (SharePoint) või OneDrive'i jagatud kaust | Kõik liikmed pääsevad ligi |
| Kooli või firma ühine materjal | SharePoint | Hallatav õigustega |
| Suur fail, mida peab teine alla laadima | Link OneDrive'ist | E-posti manus võib olla liiga suur |

## Jagamise viisid ja õigused

Kui Liis vajutab OneDrive'is "Jaga", näeb ta mitut linki. Microsofti dokumentatsioon nimetab neid nii (menüü nimed võivad eesti keeles olla veidi erinevad):

| Valik | Kes pääseb ligi | Risk |
| --- | --- | --- |
| **Anyone** | Igaüks, kellel on link, ka kui keegi selle edasi saatis | Kõrge. Sa ei tea, kes seda näeb |
| **People in your organization** | Igaüks organisatsioonist (kool), kellel on link | Keskmine. Link võib levida kogu koolis |
| **People with existing access** | Ainult need, kes juba pääsevad | Madal. Ei muuda õigusi |
| **Specific people** | Ainult sinu nimetatud inimesed | **Madalaim. Soovituslik** |

Kooli seadistus võib mõne valiku keelata. See on tavaline ja tähendab, et kool on selle ohtliku otsustanud ära võtta.

Lisaks lingi liigile saad määrata:

- **Allow editing** (lubab muuta). Kui see on välja lülitatud, saab inimene ainult vaadata.
- **Block download** (blokeerib allalaadimise). Inimene saab faili vaadata, kuid mitte endale alla laadida.

### Liisi parandus

Mis Liis oleks pidanud tegema? Ta oleks valinud **Specific people** ja sisestanud oma kaaslaste nimed. Mõlemad saavad muuta, keegi teine ei pääse ligi. Kui keegi edastab lingi, ei tööta see võõra jaoks.

Kui Liis juba eksis, saab ta olukorda parandada:

1. Vali fail või kaust ja ava **Manage access** (halda juurdepääsu).
2. Eemalda vale link.
3. Loo uus link ainult õigetele inimestele.

Rakendus ei saa tagasi võtta seda, mis juba nähtud on, kuid link muutub kasutuks.

### Õiguste tase

Õigused on tavaliselt kolme tasemega.

| Õigus | Mida tohib |
| --- | --- |
| **Vaatamine** | Avada ja lugeda |
| **Muutmine** | Lisaks muuta sisu |
| **Täisõigus (omanik)** | Lisaks muuta teiste õigusi ja kustutada |

SharePointis on sama mõte kujundatud **gruppidena**: **Owners** (omanikud, täisõigus), **Members** (liikmed, saavad lisada ja muuta) ja **Visitors** (külalised, saavad ainult lugeda). Vähimate õiguste põhimõte kehtib siin samamoodi nagu mujal: anna ainult see õigus, mida inimene vajab ([Kontod, paroolid ja õigused](/kuberturvalisus/kontod-ja-oigused)).

### Versioonid ja ühine muutmine

OneDrive ja SharePoint salvestavad failist **versioone**. Kui kaaslane kogemata kustutab pool teksti, saad avada versiooniajaloo ja taastada varasema versiooni. Ühes Wordi või PowerPointi failis saavad mitu inimest töötada **korraga**. Nii ei ole vaja saata faile edasi-tagasi nimedega `rühmatöö_v2_lõplik_UUS.docx`.

## Valik: e-post, link või mälupulk?

| Meetod | Millal sobib | Miks mitte |
| --- | --- | --- |
| **E-posti manus** | Väike fail, mida saad üks kord | Kopeeritakse. Pärast ei saa õigusi enam muuta. Suured failid ei mahu |
| **Link OneDrive'ist** | Fail, mida jagatakse ja muudetakse | Peab õigesti seadistama |
| **Mälupulk** | Ei ole võrku, kohapeal | Kaob, nakatub, kontrolli puudub |
| **Teams (kanali fail)** | Meeskonna ühised failid | Peab olema õige kanal |

Põhimõte: **jaga linki, mitte koopiat.** Link osutab alati ühele ja samale failile, mille õigusi saad hiljem muuta. Koopia on aga lahkunud sinu kontrolli alt.

## Isikuandmed ja GDPR

Mõned failid ei tohi liikuda, ükskõik kui hästi sa neid jagad. Need on failid, mis sisaldavad **isikuandmeid**.

**Isikuandmed** on igasugune teave, mille põhjal saab inimest tuvastada. Andmekaitse Inspektsiooni järgi on need näiteks nimi, isikukood, aadress, telefon, e-post ja foto. Isikuandmete kaitse üldmäärus (**GDPR**, eesti keeles IKÜM) kehtib kogu EL-is.

Mõned põhimõtted, mis Liisi jaoks olulised:

| Põhimõte | Mida see Liisile tähendab |
| --- | --- |
| **Minimeerimine** | Kogu ja jaga ainult seda, mida tegelikult vaja |
| **Eesmärgipärasus** | Kasuta andmeid ainult selleks, milleks need anti |
| **Säilitamise piirang** | Ära hoia andmeid kauem, kui vaja |
| **Nõusolek** | Foto avaldamiseks või isikliku info jagamiseks küsi luba |

Näide: Liis teeb klassi kohta kontaktlehe ja paneb sinna kõigi telefoninumbrid, sünnikuupäevad ja kodused aadressid, et teised saaksid tähistada sünnipäevi. **Kes selle andmete jagamisega nõustus?** Kui keegi ei küsinud, ei tohi ta seda teha. Lisaks on kogu kontaktileht nüüd failis, mis võib sattuda valedesse kätesse.

AKI selgituse järgi võib laps alates 13. eluaastast ise otsustada, kas soovib kasutada infoühiskonna teenuseid (nt sotsiaalmeedia kontot), ilma vanema nõusolekuta. Teiste inimeste andmete jagamisel on hea tava küsida nende nõusolekut ja jagada ainult seda, mis on vajalik. Organisatsioonis (kool, tööandja) kehtivad lisaks organisatsiooni enda andmekaitsereeglid.

### Mida teha, kui jagasid kogemata

1. Peata jagamine (**Manage access**).
2. Teata sellest oma õpetajale või ülemale. Kui tegemist on teiste isikuandmetega, võib olla tegemist **isikuandmetega seotud intsidendiga**, mida kool või ettevõte peab käsitlema.
3. Ära püüa seda varjata.

## Google Drive: teoreetiline võrdlus

Õppekava mainib alamteemana ka Google Drive'i. Sinu koolis on Google'i teenused keelatud, seega me seda **ei kasuta**. Aga põhimõte on sama, mis OneDrive'is, ja kui peaksid kunagi töökohal Google Drive'iga kokku puutuma, saad tuttavat mõtet rakendada:

| Põhimõte | OneDrive / SharePoint | Google Drive |
| --- | --- | --- |
| Isiklik fail on vaikimisi privaatne | Jah | Jah |
| Jagamine lingi või nimeliste inimestega | Jah | Jah |
| Õigustase (vaata, muuda) | Jah | Jah |
| Ühine muutmine ja versioonid | Jah | Jah |
| Ohtlikum valik: "igaüks lingiga" | Anyone | Sarnane valik olemas |

Seega: **mõtle sama moodi, ükskõik mis teenus see on.** Küsi: kes näeb, mida tohib, kuidas tühistada.

## Arendaja vaates: kood ei ole failijagamine

Kui sa jagad lähtekoodi, ei kasuta sa OneDrive'i, vaid **Giti ja GitHubi**. Põhjused:

- **Ajalugu.** Git jälgib iga muudatust, kes ja millal tegi.
- **Koostöö.** Mitu inimest saavad töötada samas koodis ilma üksteise tööd üle kirjutamata.
- **Ülevaatus.** Muudatused läbivad pull requesti.

Aga repo ei ole koht kõige jaoks. Mida sinna **ei panda**:

| Mida | Miks |
| --- | --- |
| Paroolid, API võtmed, tokenid | Kes repo näeb, näeb võtmeid (vt [kohtumine 4](./kohtumine-04-identiteedi-kaitse)) |
| `.env` fail | Sisaldab seadistusi ja saladusi |
| Isikuandmed (reaalsed kasutajate andmed) | GDPR |
| Suured genereeritud kaustad (`node_modules`) | Pole vaja, genereeritakse uuesti |

Selle jaoks on fail **`.gitignore`**, mis ütleb Gitile, mida ignoreerida.

```text
# .gitignore
.env
node_modules/
dist/
```

Kui avalikku repo'sse pushid saladuse, aitab GitHubi **push protection**, mis tuvastab tuntud saladuste vormingud ja blokeerib pushi. See ei asenda hoolikust, sest tuvastab ainult teatud vorminguid.

## Praktiline töö: Liisi rühmatöö kaust

Töö tehakse **testfailidega**. Ära paiguta sellesse kausta päris isikuandmeid, hindeid ega isiklikke dokumente.

**A. Kausta seadistamine**

1. Loo OneDrive'is kaust "Rühmatöö_test" ja pane sinna kolm testfaili (näiteks tühi Wordi dokument, märkmed, pilt, mis ei sisalda isikuid).
2. Jaga kausta **ühe kaaslasega** nii, et sa kasutad linki **Specific people**, annad **muutmise** õiguse.
3. Katsetage: kaaslane muudab faili, sina vaatad versioone ja taastad varasema versiooni.
4. Eemalda jagamine (**Manage access**) ja kontrolli, et kaaslane enam ligi ei pääse.

**B. Õiguste tabel**

Kirjuta tabel, kus iga rida on üks tegevus ja veerud on: mida tegid, millist õigust kasutasid, miks see õigus on piisav. **Ära tee ekraanipilte, kus on teiste inimeste nimed.** Kirjelda sõnadega.

**C. Kanali valik**

Otsusta kolme juhtumi puhul, kuidas fail jagada ja miks:

1. 200 MB videofail rühmatööst, mida pead saatma õpetajale.
2. Kontaktileht klassi sünnipäevade jaoks.
3. Veebirakenduse lähtekood rühmatööna.

**D. Arendaja**

Kirjuta `.gitignore` fail, mis ignoreerib `.env`, `node_modules/` ja `dist/`, ja selgita ühe lausega, miks iga rida seal on.

**Esitatav töö:** portfoolio osa 6 (jagamise protokoll, õiguste tabel, kanali valik, `.gitignore`). **Seos: HK 2.2.**

## Kokkuvõte

| Mõiste | Tähendus |
| --- | --- |
| OneDrive | Isiklik, privaatne kuni jagad |
| SharePoint | Meeskonna ja organisatsiooni failid; Teamsi failid on seal |
| Specific people | Turvaline jagamislink: ainult nimetatud inimesed |
| Anyone | Igaüks lingiga, kõrge risk |
| Manage access | Koht, kust jagamist tühistada |
| Isikuandmed | Teave, mille põhjal inimest tuvastada saab |
| `.gitignore` | Ütleb Gitile, mida ei pane repo'sse |

Reegel: **jaga linki, mitte koopiat; jaga kitsalt ja anna ainult vajalik õigus.**

## Allikad

- [Microsoft Support: Share OneDrive files and folders](https://support.microsoft.com/en-us/office/share-onedrive-files-and-folders-9fcc2f7d-de0c-4cec-93b0-a82024800c07)
- [Microsoft Learn: Understanding permission levels in SharePoint](https://learn.microsoft.com/en-us/sharepoint/understanding-permission-levels)
- [Microsoft Learn: Introduction to Microsoft Teams](https://learn.microsoft.com/en-us/microsoftteams/teams-overview)
- [Andmekaitse Inspektsioon: Mõisted](https://www.aki.ee/isikuandmed/kkk/moisted)
- [Andmekaitse Inspektsioon: Lapsel on õigus oma isikuandmete üle otsustada](https://www.aki.ee/uudised/lapsel-samuti-oigus-oma-isikuandmete-ule-otsustada-sotsiaalmeedias)
- [GitHub Docs: Secret scanning push protection](https://docs.github.com/en/code-security/secret-scanning/introduction/about-push-protection)
