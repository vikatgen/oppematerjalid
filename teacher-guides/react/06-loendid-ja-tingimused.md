# Õpetaja juhend: 6. Loendid ja tingimused

Õppijaleht: [Loendid ja tingimused](../../docs/react/06-loendid-ja-tingimused.md).

## Ettevalmistus

Ava eelmise kohtumise töötav artiklikataloog. Kontrolli õppijalehe põhitee enne tundi. Näidislahendus asub repository kaustas `solutions/react`; see on õpetaja lõppversioon. Algajale näita ainult käimasoleva tunni jaoks vajalikku osa.

## Ajakava

10 min kordamine, 20 min selgitus, 20 min juhitud demo, 30 min iseseisev töö, 10 min kontroll. Kõik kokku 90 minutit. Kui kordamine võtab kauem, jäta vabatahtlik laiendus ära ja säilita praktilise töö ning kontrolli aeg.

## Demo: Seosta key artikli identiteediga

Asenda käsitsi kaardid map'iga. Märgi lemmik, pööra koopial järjekord ja võrdle ID ning indeksiga võtmeid.

Palu enne käivitamist vähemalt kahel õppijal tulemust ennustada. Kutsu üks õppija brauseris nähtavat tulemust selgitama ning teine siduma seda konkreetse koodireaga.

## Levinud vead

Callback'i return ununeb; key asub vale elemendi juures; sort muudab algset massiivi.

Ära anna kohe valmis faili. Lase õppijal kõigepealt näidata esimest veateadet või valesti käituvat väärtust, seejärel leida selle päritolu.

## Mõtestamisküsimus

Mis juhtub lokaalse state'iga, kui artikkel eemaldatakse filtriga puust?

Võimalik põhjendus õpetajale: Puust eemaldatud kaardi lokaalne state kaob. Sama key aitab säilitada identiteeti allesjäänud kaartide ümberjärjestamisel.

## Hindamise tõend

Uus artikkel ilmub andmefaili muutmisega, tühi loend annab teate.

Viimase kümne minuti jooksul vali kontrolliks üks põhitee nõue. Märgi, kes vajab järgmise kohtumise alguses tuge. Hinda ka õppija selgitust, mitte ainult ekraanipilti.

## Diferentseerimine ja ligipääsetavus

Toeta aeglasemat õppijat olemasoleva töötava faili ning ühe täpselt piiritletud muudatusega. Lase esmalt selgitada soovitud käitumist. Kiire õppija valib õppijalehe laienduse alles pärast põhitee kontrollimist.

Näita näiteid piisava kirjasuurusega. Kirjelda ekraanil tehtud muudatust suuliselt. Paaris vahetatakse koodi kirjutaja ja kontrollija rolli. Klaviatuuriga kasutamine kuulub vormide ning navigatsiooni kontrolli.

## Jätkamine

Enne tunni lõppu tee õppijatega väike sisuline commit. Järgmine kohtumine algab selle käivitamisest. Puuduja saab jätkata eelmise töötava seisu ja õppijalehe abil.
