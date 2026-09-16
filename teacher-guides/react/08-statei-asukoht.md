# Õpetaja juhend: 8. State’i asukoht

Õppijaleht: [State’i asukoht](../../docs/react/08-statei-asukoht.md).

## Ettevalmistus

Ava eelmise kohtumise töötav artiklikataloog. Kontrolli õppijalehe põhitee enne tundi. Näidislahendus asub repository kaustas `solutions/react`; see on õpetaja lõppversioon. Algajale näita ainult käimasoleva tunni jaoks vajalikku osa.

## Ajakava

10 min kordamine, 20 min selgitus, 20 min juhitud demo, 30 min iseseisev töö, 10 min kontroll. Kõik kokku 90 minutit. Kui kordamine võtab kauem, jäta vabatahtlik laiendus ära ja säilita praktilise töö ning kontrolli aeg.

## Demo: Leia ühise state'i omanik

Näita, miks Header ei tea kaardi lokaalsest state'ist. Tõsta ID-de massiiv Appi ja kanna callback läbi PostListi.

Palu enne käivitamist vähemalt kahel õppijal tulemust ennustada. Kutsu üks õppija brauseris nähtavat tulemust selgitama ning teine siduma seda konkreetse koodireaga.

## Levinud vead

Lemmikute arv dubleeritakse state'is; massiivi push muudab sama viidet; lapsel säilib teine isFavorite.

Ära anna kohe valmis faili. Lase õppijal kõigepealt näidata esimest veateadet või valesti käituvat väärtust, seejärel leida selle päritolu.

## Mõtestamisküsimus

Milline väärtus on tuletatud ja milline vajab mälu?

Võimalik põhjendus õpetajale: Arv ja nähtav loend on arvutused. Lemmikute valik ja sisestatud otsing on muutuv info.

## Hindamise tõend

Filtreerimine ei kaota lemmikuid ning loendur vastab kaartidele.

Viimase kümne minuti jooksul vali kontrolliks üks põhitee nõue. Märgi, kes vajab järgmise kohtumise alguses tuge. Hinda ka õppija selgitust, mitte ainult ekraanipilti.

## Diferentseerimine ja ligipääsetavus

Toeta aeglasemat õppijat olemasoleva töötava faili ning ühe täpselt piiritletud muudatusega. Lase esmalt selgitada soovitud käitumist. Kiire õppija valib õppijalehe laienduse alles pärast põhitee kontrollimist.

Näita näiteid piisava kirjasuurusega. Kirjelda ekraanil tehtud muudatust suuliselt. Paaris vahetatakse koodi kirjutaja ja kontrollija rolli. Klaviatuuriga kasutamine kuulub vormide ning navigatsiooni kontrolli.

## Jätkamine

Enne tunni lõppu tee õppijatega väike sisuline commit. Järgmine kohtumine algab selle käivitamisest. Puuduja saab jätkata eelmise töötava seisu ja õppijalehe abil.
