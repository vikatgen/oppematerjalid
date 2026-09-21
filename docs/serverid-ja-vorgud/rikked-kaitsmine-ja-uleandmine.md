---
title: Rikked, kaitsmine ja üleandmine
description: Juhitud rikkekaardid, üleandmise eelne turbe kontroll, paarilise audit ja individuaalne kaitsmine — kursuse lõpetuseks.
outline: deep
---

# Rikked, kaitsmine ja üleandmine

::: info Õpiväljund
Pärast seda osa oskad diagnoosida ühe kontrollitud rikke enne parandamist, läbida üleandmise-eelse turbe kontrolli, ning selgitada suuliselt, mida ja miks sinu keskkonnas iga otsus teeb.
:::

## Meeskonna kolmekümne kolmas küsimus sinule

Viimane küsimus, mille meeskond esitab, ei ole tehniline: "kas sa suudad seda ka **selgitada**, mitte ainult käivitada?"

## Keskkonna külmutamine — enne proovisõitu ei vahetata mootorit

Enne kaitsmist **fikseeri töötavad versioonid** ja **salvesta vajalikud seadistused**. Väldi uute tööriistade lisamist vahetult enne kaitsmist.

::: tip Külmutamine on ajutine, mitte lõplik
See ei tähenda turvauuenduste lõplikku lõpetamist — see on **ajutine** hindamise ajal tehtavate muudatuste kontroll, et dokumenteeritud algseis aitaks riket tekitada ja sellest teadlikult taastuda, ilma segavate samaaegsete muudatusteta.
:::

## Juhitud rikkekaardid

Õpetaja teeb **korraga ainult ühe** muudatuse ja talleb algse väärtuse — sama "üks muudatus korraga" põhimõte, mis [Protsessid, teenused ja logid](./protsessid-teenused-ja-logid) osast juba tuttav. Kaardid ei puutu pärisandmeid.

| Kaart | Õpetaja muudatus | Oodatav diagnoos | Taastamine |
| --- | --- | --- | --- |
| R1 | Peata `labapp` | Nginx 502, loopback API keeld, teenus `inactive` | `start labapp`, sama API test ([Teenuse tervis ja veaotsing](./teenuse-tervis-ja-veaotsing)) |
| R2 | Muuda hosti `app.lab.test` hosts-rida valeks | VM-i `dig` õige, hosti ühendus vale | õige hosts-rida ja uus ühendus ([Pordid, localhost ja oma DNS](./pordid-localhost-ja-oma-dns)) |
| R3 | Muuda Nginxi `proxy_pass` port 3001-ks | tagateenus 3000 töötab, proksi siht vale | 3000, `nginx -t`, `reload` ([Rakendus ja pöördproksi](./rakendus-ja-poordproksi)) |
| R4 | Thunderbirdis vale kasutajanimi | TLS töötab, autentimine ebaõnnestub | õige kohalik nimi ([Thunderbird ja meili tõendamine](./thunderbird-ja-meili-toendamine)) |
| R5 | Eemalda `notes` testrea muudetud väärtus eraldi taastamisskeemis | kontrollandmed ei ühti | import uude tühja skeemi ja võrdlus ([Taastamine teise serverisse](./taastamine-teise-serverisse)) |

::: warning Rikkekaardid ei puuduta päris kasutusandmeid ega ohtlikke toiminguid
Ära kasuta rikkekaardina hosti ketta täitmist, kõigi tulemüürireeglite kustutamist ega avaliku teenuse koormamist — kõik rikked peavad olema **kontrollitud ja tagasipööratavad**, sama distsipliin, mis kogu kursuse vältel.
:::

Terve VM-i taastamine **ei ole** iga rikke esimene mõistlik samm — kõigepealt hinda **vea ulatust ja andmekao riski**, samamoodi nagu [Teenuse tervis ja veaotsing](./teenuse-tervis-ja-veaotsing) osas juba õppisime kihtide järgi diagnoosima, enne kui midagi drastilist ette võtta.

## Turbe kontroll — proovi kõiki lukke, mitte ainult peaukse käepidet

Üleandmise eel:

- Kontrolli **õigusi ja kuulamisaadresse** (loopback, tulemüür).
- Proovi **nii lubatud kui keelatud** ühendusi — mitte ainult ühte suunda.
- Eemalda dokumentidest **saladused**.

::: tip Miks keelatud DB kaugport SSH-tunnelit ei takista
Tunnel kasutab **lubatud** SSH-d ja serveri enda **kohalikku** DB-ühendust — [SSH tunnel ja graafiline haldus](./ssh-tunnel-ja-graafiline-haldus) osas juba nägime, et tunnel ei "ava" MySQL-i kaugporti, vaid pakendab olemasoleva loopback-ühenduse SSH sisse. Tulemüürireeglid vajavad alati **põhjendusi**, mitte ainult "on lubatud"/"on keelatud" nimekirja.
:::

## Paarilise audit

Paariline **järgib** sinu dokumentatsiooni sõna-sõnalt, autor **jälgib**, kus paariline takerdub. Hindamisel jääb igaühe selgitus **individuaalseks**, isegi kui dokumentatsioon on jagatud.

::: tip Teine silmapaar leiab "ilmselged" augud
Kui paariline jääb mõnes sammus seisma, on lahendus **täpsustada seda sammu dokumentatsioonis** ja proovida uuesti — mitte lihtsalt suuliselt õiget vastust öelda. Kirjaliku juhendi parandamine on osa hindest, mitte kõrvaltegevus.
:::

## Suuline kaitsmine

Haldaja peab suutma **kolleegile seletada**, mida ta muudab, mitte ainult käske peast loetlema. Selgita alati:

1. Käsu **eesmärki**.
2. **Mõjutatud kihti** (kas see puudutab võrku, teenust, andmeid, õigusi?).
3. Valitud **õiguse või pordi põhjendust**.

::: tip Miks me ei kasutanud kõikjal `sudo` ja `chmod 777`
Need annaksid **põhjendamatuid** õigusi ja **peidaksid** õiguste tegeliku probleemi — täpselt sama õppetund, mis kogu kursuse vältel korduvalt esile tuli: vähimate õiguste põhimõte [Rakendus ja pöördproksi](./rakendus-ja-poordproksi), [Kasutajad, õigused ja tehingud](./kasutajad-oigused-ja-tehingud) ja [Tulemüür ja UFW](./tulemuur-ja-ufw) osadest.
:::

## Individuaalse kaitsmise küsimused

Õpetaja valib vähemalt kolm ja ühe näitamise:

- Miks muutub `localhost` masinate vahel? ([Pordid, localhost ja oma DNS](./pordid-localhost-ja-oma-dns))
- Miks pole vaja UFW-s porti 3306 avada? ([Tulemüür ja UFW](./tulemuur-ja-ufw))
- Miks kontrollime TLS-i puhul just **nime**, mitte ainult krüpteeringut? ([HTTPS ja TLS](./https-ja-tls))
- Mida `single-transaction` tagab ja mida mitte? ([Varunduse põhimõtted ja CLI dump](./varunduse-pohimotted-ja-cli-dump))
- Kuidas eristada DNS riket 502 veast? ([Teenuse tervis ja veaotsing](./teenuse-tervis-ja-veaotsing))
- Miks kahe VM-i koopia ei kaitse füüsilise hosti kadumise eest? ([Teenuse teisaldamine ja sõltumatu koopia](./teenuse-teisaldamine-ja-soltumatu-koopia))
- Millises ahelas piiratakse ruuteri läbivat liiklust? ([Lüliti, marsruuter ja võrguseadme tulemüür](./luliti-marsruuter-ja-vorguseadme-tulemuur))

## Tootmiskeskkonna piir — harjutusväljak, mitte tihe liiklus

Labori domeen (`lab.test`) ja iseallkirjastatud sertifikaat on **õppelahendus**. Päris teenus vajab lisaks käideldavuse ja vastutuse plaani; avalik meil vajab eraldi ettevalmistust.

::: warning Mida tuleb avaliku veebi jaoks ümber teha
**Domeen** (päris, registreeritud), **usaldatud sertifikaat** (mitte iseallkirjastatud), **välisvõrk** (mitte host-only), **seire** (laiem kui meie üks HTTP-kontroll), **varundussiht** (päriselt eraldi, mitte ainult teine VM), ja **hooldusprotsess** vastavalt tegelikele nõuetele. Tulemusi ei esitata automaatselt tootmiskõlbliku taristuna — harjutusväljak õpetab juhtimist, aga tihedasse liiklusse minek vajab rohkem tingimusi, kui see kursus katab.
:::

## Õpitulemus

Pärast seda kursust oskad:

- Keskkonda **luua**.
- Seda **kontrollida ja selgitada**.
- Seda **taastada ja üle anda**.

Tarkvaraarendajana oskad nüüd eristada **koodiviga** võrgu-, protsessi- ja ligipääsuveast — see on aluspõhi, millele järgmised (nt tootmisele lähemad) teemad saavad **ehitada**, mitte mida asendada.

## Suur pilt: terve kursuse kokkuvõte

Sissejuhatuses alustasid nooremarendajana väikeses meeskonnas, kellel oli ainult üks arendaja sülearvutis töötav rakendus. Nüüd on sul: kaks serverit oma püsivate aadressidega, oma DNS ja DHCP tundmine, Linuxi failisüsteem ja teenuste haldus, SSH-ühendus ilma VirtualBoxi konsoolita, veebiteenus koos pöördproksiga, andmebaas koos kontrollitud kasutajaõigustega, tulemüür ja HTTPS, oma meiliserver kahe päris postkastiga, tõendatud varukoopiad ja terve teenuse migratsioon, automaatne seire ja oskus lugeda oma võrguliiklust, ning teadmine, kus VirtualBoxi labori piir lõpeb ja päris füüsiline taristu algab.

Kõige tähtsam, mida see kursus proovis õpetada, ei ole ükski üksik käsk — see on **harjumus küsida "kuidas ma seda tõendan?"** enne, kui usud, et miski töötab. Iga teema lõpus oleme küsinud sedasama küsimust uuesti, uues kontekstis. See harjumus jääb sinuga kaugemale kui ükski konkreetne käsurea süntaks.

## Kokkuvõte

| Mõiste | Tähendus |
| --- | --- |
| Keskkonna külmutamine | ajutine hindamise stabiilsus, mitte turvauuenduste lõpetamine |
| Juhitud rike (R1–R5) | üks kontrollitud muudatus, diagnoos enne parandust |
| Turbe kontroll | proovi nii lubatud kui keelatud ühendust, mitte ainult ühte |
| Paarilise audit | teine silmapaar leiab "ilmselged" puudujäägid dokumentatsioonis |
| Tootmiskeskkonna piir | labor õpetab juhtimist, aga pole automaatselt tootmiskõlblik |
| Kursuse tuum | harjumus tõendada, mitte ainult uskuda, et miski töötab |

## Allikad

Selle osa lähteülesanne ja hindamisvahendid põhinevad kursuse enda autori koostatud õpiväljunditel.
