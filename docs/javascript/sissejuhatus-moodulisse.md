
# M6. Veebirakendused: JavaScript

::: info
See kursus aitab õppijal mõista programmeerimise algtõdesid ja kasutada JavaScripti veebirakenduste loomisel.
:::

:house: - 60 AT / 30 kohtumist
:calendar: - 70 IT

## Õpieesmärgid

Kursuse lõpuks peaks õppija:

- oskama jagada väikese programmeerimisprobleemi kontrollitavateks sammudeks
- mõistma, kuidas JavaScripti abil andmeid hoida, muuta ja kontrollida
- oskama valida lihtsa andmemudeli, kasutada tingimusi, tsükleid ja funktsioone
- oskama jälgida koodi täitmist ning leida lihtsa vea põhjuse
- mõistma, miks brauseris kasutatakse DOM-i ja sündmuseid
- oskama kirjutada lihtsat JavaScripti koodi, mis reageerib kasutaja tegevustele
- oskama kasutada brauseri arendustööriistu lihtsate vigade leidmiseks

## Miks JavaScripti õpitakse?

JavaScript on keel, mis muudab veebilehe interaktiivseks. HTML annab lehele struktuuri, CSS annab välimuse ja JavaScript lisab käitumise.

Näiteks JavaScripti abil saab:

- kontrollida, kas kasutaja täitis vormi õigesti
- arvutada ostukorvi kogusumma
- kuvada või peita menüüd
- lugeda nupuvajutust ja muuta lehe sisu
- küsida serverist andmeid ilma lehte uuesti laadimata

Kui õpilane vajutab veebilehel nuppu "Lisa ostukorvi", siis JavaScript otsustab, mis edasi juhtub: kas toodet on laos, mitu toodet ostukorvis on ja millist teadet kasutajale näidata.

## Kuidas kursus on üles ehitatud?

Kursus on jagatud kaheks suuremaks osaks.

Esimene osa keskendub programmeerimise alustele. Selle osa kontrollimiseks tuleb arutelu vormis eksam. Eksami toimumisaja anname teada vähemalt kuu aega enne, et jõuaksite valmistuda.

Esimese osa raames õpime probleemi enne koodi kavandama, andmeid modelleerima, otsuseid ja korduseid koostama, tegevusi funktsioonidesse jagama ning vigu süsteemselt otsima.

Vahekaitsmisel peab õppija oskama etteantud koodi oma sõnadega selgitada:

- millised on programmi sisendid, sammud ja väljund;
- kuidas kasutatakse muutujaid ja andmetüüpe;
- miks sobib andmete hoidmiseks objekt või massiiv;
- kuidas tingimused, tsüklid ja funktsioonid tulemuseni jõuavad;
- kuidas väärtused programmi täitmise ajal muutuvad;
- kuidas õppija kontrolliks tulemust või otsiks vea põhjust.

Lisalugemised, näiteks hoisting, strict mode ja massiivimeetodid, aitavad teemadest sügavamalt aru saada, kuid ei kuulu nõutava taseme alla.

Kui programmeerimise alustõed on selged, alustame JavaScripti brauseripõhise osaga: DOM, sündmused, asünkroonne programmeerimine ja lubadused.

Teise osa hindamine toimub praktilise tööga, kus kasutame JavaScripti veebirakenduste loomiseks:

- sündmuste loomine ja nendele reageerimine
- DOM-i manipuleerimine
- asünkroonne programmeerimine
- event loop
- lubadused (`Promise`, `async`/`await`)

## Soovitus õppimiseks

JavaScripti õppimisel on oluline koodi ise käivitada. Iga näite juures tasub avada brauseri DevTools Console või kasutada Node.js keskkonda ja proovida, mis juhtub, kui väärtuseid muuta.

Ära õpi ainult süntaksit pähe. Küsi iga teema juures:

- millist probleemi see lahendab?
- millal mul seda päris rakenduses vaja läheb?
- mis viga võib tekkida, kui ma seda valesti kasutan?
- kuidas ma kontrollin, et tulemus on õige?
