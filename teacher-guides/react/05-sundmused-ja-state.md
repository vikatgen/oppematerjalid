# Õpetaja juhend: 5. Sündmused ja state

Õppijaleht: [Sündmused ja state](../../docs/react/05-sundmused-ja-state.md).

## Ettevalmistus

Ava eelmise kohtumise töötav artiklikataloog. Kontrolli õppijalehe põhitee enne tundi. Näidislahendus asub repository kaustas `solutions/react`; see on õpetaja lõppversioon. Algajale näita ainult käimasoleva tunni jaoks vajalikku osa.

## Ajakava

10 min kordamine, 20 min selgitus, 20 min juhitud demo, 30 min iseseisev töö, 10 min kontroll. Kõik kokku 90 minutit. Kui kordamine võtab kauem, jäta vabatahtlik laiendus ära ja säilita praktilise töö ning kontrolli aeg.

## Demo: Ennusta state'i hetktõmmist

Märgi üks kaart lemmikuks. Logi setterile järgnevat väärtust. Näita, et teine kaart säilitab oma oleku.

Palu enne käivitamist vähemalt kahel õppijal tulemust ennustada. Kutsu üks õppija brauseris nähtavat tulemust selgitama ning teine siduma seda konkreetse koodireaga.

## Levinud vead

Sündmusefunktsioon kutsutakse JSX-is kohe välja; kasutatakse count++; Hook asub tingimuses.

Ära anna kohe valmis faili. Lase õppijal kõigepealt näidata esimest veateadet või valesti käituvat väärtust, seejärel leida selle päritolu.

## Mõtestamisküsimus

Miks logi näitab vana väärtust?

Võimalik põhjendus õpetajale: Setter tellib järgmise renderduse. Käimasoleva sündmuse funktsioon näeb senist hetktõmmist.

## Hindamise tõend

Kaardi nupp vahetab olekut ja õppija kirjeldab sündmust, setterit ning renderdust.

Viimase kümne minuti jooksul vali kontrolliks üks põhitee nõue. Märgi, kes vajab järgmise kohtumise alguses tuge. Hinda ka õppija selgitust, mitte ainult ekraanipilti.

## Diferentseerimine ja ligipääsetavus

Toeta aeglasemat õppijat olemasoleva töötava faili ning ühe täpselt piiritletud muudatusega. Lase esmalt selgitada soovitud käitumist. Kiire õppija valib õppijalehe laienduse alles pärast põhitee kontrollimist.

Näita näiteid piisava kirjasuurusega. Kirjelda ekraanil tehtud muudatust suuliselt. Paaris vahetatakse koodi kirjutaja ja kontrollija rolli. Klaviatuuriga kasutamine kuulub vormide ning navigatsiooni kontrolli.

## Jätkamine

Enne tunni lõppu tee õppijatega väike sisuline commit. Järgmine kohtumine algab selle käivitamisest. Puuduja saab jätkata eelmise töötava seisu ja õppijalehe abil.
