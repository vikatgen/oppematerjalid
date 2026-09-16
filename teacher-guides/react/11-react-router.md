# Õpetaja juhend: 11. React Router

Õppijaleht: [React Router](../../docs/react/11-react-router.md).

## Ettevalmistus

Ava eelmise kohtumise töötav artiklikataloog. Kontrolli õppijalehe põhitee enne tundi. Näidislahendus asub repository kaustas `solutions/react`; see on õpetaja lõppversioon. Algajale näita ainult käimasoleva tunni jaoks vajalikku osa.

## Ajakava

10 min kordamine, 20 min selgitus, 20 min juhitud demo, 30 min iseseisev töö, 10 min kontroll. Kõik kokku 90 minutit. Kui kordamine võtab kauem, jäta vabatahtlik laiendus ära ja säilita praktilise töö ning kontrolli aeg.

## Demo: Säilita navigatsioon laadimise ajal

Tõsta päring PostsPage'i, jäta lemmikud Appi. Näita Back/Forward nuppe ja Home lingi end omadust.

Palu enne käivitamist vähemalt kahel õppijal tulemust ennustada. Kutsu üks õppija brauseris nähtavat tulemust selgitama ning teine siduma seda konkreetse koodireaga.

## Levinud vead

Routeri komponent paikneb väljaspool BrowserRouterit; lemmikud liiguvad kogemata PostsPage'i; tekib pesastatud main.

Ära anna kohe valmis faili. Lase õppijal kõigepealt näidata esimest veateadet või valesti käituvat väärtust, seejärel leida selle päritolu.

## Mõtestamisküsimus

Miks lemmikud säilivad, kuid query lähtestub?

Võimalik põhjendus õpetajale: App jääb paigale, kuid PostsPage eemaldatakse ja paigaldatakse uuesti.

## Hindamise tõend

Põhilehed, aktiivne link ja 404 töötavad; ühine menüü püsib päringu vea ajal.

Viimase kümne minuti jooksul vali kontrolliks üks põhitee nõue. Märgi, kes vajab järgmise kohtumise alguses tuge. Hinda ka õppija selgitust, mitte ainult ekraanipilti.

## Diferentseerimine ja ligipääsetavus

Toeta aeglasemat õppijat olemasoleva töötava faili ning ühe täpselt piiritletud muudatusega. Lase esmalt selgitada soovitud käitumist. Kiire õppija valib õppijalehe laienduse alles pärast põhitee kontrollimist.

Näita näiteid piisava kirjasuurusega. Kirjelda ekraanil tehtud muudatust suuliselt. Paaris vahetatakse koodi kirjutaja ja kontrollija rolli. Klaviatuuriga kasutamine kuulub vormide ning navigatsiooni kontrolli.

## Jätkamine

Enne tunni lõppu tee õppijatega väike sisuline commit. Järgmine kohtumine algab selle käivitamisest. Puuduja saab jätkata eelmise töötava seisu ja õppijalehe abil.
