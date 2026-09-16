# Õpetaja juhend: 2. Projekt ja Vite

Õppijaleht: [Projekt ja Vite](../../docs/react/02-projekt-ja-vite.md).

## Ettevalmistus

Ava eelmise kohtumise töötav artiklikataloog. Kontrolli õppijalehe põhitee enne tundi. Näidislahendus asub repository kaustas `solutions/react`; see on õpetaja lõppversioon. Algajale näita ainult käimasoleva tunni jaoks vajalikku osa.

## Ajakava

10 min kordamine, 20 min selgitus, 20 min juhitud demo, 30 min iseseisev töö, 10 min kontroll. Kõik kokku 90 minutit. Kui kordamine võtab kauem, jäta vabatahtlik laiendus ära ja säilita praktilise töö ning kontrolli aeg.

## Demo: Jälgi brauseris nähtava pealkirja päritolu

Käivita projekt, ava main.jsx ja App.jsx kõrvuti. Muuda esmalt lehe h1 ning siis index.html title. Lase õppijatel enne salvestamist ennustada, milline osa muutub.

Palu enne käivitamist vähemalt kahel õppijal tulemust ennustada. Kutsu üks õppija brauseris nähtavat tulemust selgitama ning teine siduma seda konkreetse koodireaga.

## Levinud vead

npm käivitatakse vales kaustas; failinime suur- ja väiketäht ei ühti; Node'i versioon ei sobi.

Ära anna kohe valmis faili. Lase õppijal kõigepealt näidata esimest veateadet või valesti käituvat väärtust, seejärel leida selle päritolu.

## Mõtestamisküsimus

Kuidas jõuab App brauseri root-elemendini?

Võimalik põhjendus õpetajale: Node käitab Vite'i. Vite vahendab ja teisendab lähtekoodi. Brauser käitab rakendust.

## Hindamise tõend

Õppija näitab kolme faili seost ja käivitab build'i.

Viimase kümne minuti jooksul vali kontrolliks üks põhitee nõue. Märgi, kes vajab järgmise kohtumise alguses tuge. Hinda ka õppija selgitust, mitte ainult ekraanipilti.

## Diferentseerimine ja ligipääsetavus

Toeta aeglasemat õppijat olemasoleva töötava faili ning ühe täpselt piiritletud muudatusega. Lase esmalt selgitada soovitud käitumist. Kiire õppija valib õppijalehe laienduse alles pärast põhitee kontrollimist.

Näita näiteid piisava kirjasuurusega. Kirjelda ekraanil tehtud muudatust suuliselt. Paaris vahetatakse koodi kirjutaja ja kontrollija rolli. Klaviatuuriga kasutamine kuulub vormide ning navigatsiooni kontrolli.

## Jätkamine

Enne tunni lõppu tee õppijatega väike sisuline commit. Järgmine kohtumine algab selle käivitamisest. Puuduja saab jätkata eelmise töötava seisu ja õppijalehe abil.
