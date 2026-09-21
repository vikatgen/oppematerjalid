---
title: "Lõppprojekt: ülesanne ja vastuvõtukatsed"
description: Kursuse lõppprojekti lähteülesanne, 18 kohustuslikku vastuvõtukatset ja esitatava dokumentatsiooni struktuur.
outline: deep
---

# Lõppprojekt: ülesanne ja vastuvõtukatsed

::: info Õpiväljund
Pärast seda osa oskad koondada kogu kursuse jooksul ehitatud keskkonna üheks tõendatud, dokumenteeritud tervikuks — mitte lisada midagi uut, vaid tõendada, et olemasolev töötab ja on korratav.
:::

## Meeskonna kolmekümne teine küsimus sinule

Meeskonna juht kutsub sind lõpuks koosolekule: "meil on nüüd testkeskkond olemas — aga enne kui keegi teine seda päriselt kasutama hakkab, näita mulle, et see **tegelikult** töötab, ja anna see üle nii, et keegi teine suudaks seda hooldada, kui sind pole."

## Lähteülesanne — sama keskkond, mitte uus

Meeskond tahab kasutada veebirakenduse **testkeskkonda**, hoida näidisandmeid **MySQL-is** ja katsetada **kohalikke e-kirju**. Sina vastutad serveri ülesehituse, ligipääsu, seire, taastamise ja üleandmise eest.

::: tip Kasuta olemasolevat, ära ehita uut
Lõppprojekt kasutab **kursuse jooksul juba loodud** keskkonda (teemad 1–10). Klient ei telli käskude nimekirja, vaid **toimivat teenust ja hooldusvõimet** — lõppprojekt koondab kõik senise tervikuks, vältides teadlikult uut suurt funktsionaalsust. Veebimakk ja andmebaas võivad esimeses versioonis olla lahutatud teenused (nagu meie omadki) — oluline on see piir **dokumentatsioonis** selgeks teha, mitte seda peita. Oma Node/Express rakenduse päris ühendamine MySQL-iga on **laiendus**, mitte varjatud kohustus.
:::

## Kohustuslikud vastuvõtukatsed

Iga katse peab olema **mõõdetav**: konkreetne tegevus, konkreetne oodatav tulemus, konkreetne tõend. "Turvaline server" on liiga lai lubadus — "SSH ainult hostist, võtmega" on juba testitav nõue.

| ID | Katse | Oodatav tulemus | Kus see õpitud on |
| --- | --- | --- | --- |
| T01 | Mõlemad VM-id külmkäivituvad | IP-d püsivad, SSH võtmega töötab | [Liidesed ja püsiv IP-aadress](./liidesed-ja-pusiv-ip-aadress), [SSH-ühendus ja andmebaasi põhitõed](./ssh-uhendus-ja-andmebaasi-pohitoed) |
| T02 | DNS A ja MX otsepäring | õige aktiivne veebiserver ja `mail.lab.test` | [Pordid, localhost ja oma DNS](./pordid-localhost-ja-oma-dns) |
| T03 | Süsteemne nimepäring VM-is | `lab.test` läheb õigesse resolverisse | [Pordid, localhost ja oma DNS](./pordid-localhost-ja-oma-dns) |
| T04 | Staatiline veeb ja API | sisu õige, HTTP suunab HTTPS-i | [Nginx ja staatiline sait](./nginx-ja-staatiline-sait), [HTTPS ja TLS](./https-ja-tls) |
| T05 | Teenus pärast SSH sulgemist | API töötab teiselt masinalt küsituna | [Teenuse tervis ja veaotsing](./teenuse-tervis-ja-veaotsing) |
| T06 | MySQL CLI ja GUI | samad andmed, GUI muudatus kinnitatud | [Kasutajad, õigused ja tehingud](./kasutajad-oigused-ja-tehingud), [SSH tunnel ja graafiline haldus](./ssh-tunnel-ja-graafiline-haldus) |
| T07 | `labreader` muutmiskatse | õiguste keeld, ilma paroolita tõendina | [SSH tunnel ja graafiline haldus](./ssh-tunnel-ja-graafiline-haldus) |
| T08 | MySQL välisport | otse ei ole kättesaadav, tunnel töötab | [Kasutajad, õigused ja tehingud](./kasutajad-oigused-ja-tehingud) |
| T09 | Anna ja Jüri kirjavahetus | mõlemad saavad kirja TLS-ühendusega | [Thunderbird ja meili tõendamine](./thunderbird-ja-meili-toendamine) |
| T10 | Võõra SMTP domeeni katse | keeld RCPT etapis | [Thunderbird ja meili tõendamine](./thunderbird-ja-meili-toendamine) |
| T11 | CLI taastamine srv2-s | skeem ja andmed kattuvad koopiaga | [Taastamine teise serverisse](./taastamine-teise-serverisse) |
| T12 | GUI backup ja restore | native töö edukas, taastatud read olemas | [GUI varundus DBeaveriga](./gui-varundus-dbeaveriga) |
| T13 | Veebiteenuse migreerimine | teine server vastab, tagasipööre toimib | [Teenuse teisaldamine ja sõltumatu koopia](./teenuse-teisaldamine-ja-soltumatu-koopia) |
| T14 | Seire rikke ajal | OK, FAIL, OK | [Perioodiline tervisekontroll](./perioodiline-tervisekontroll) |
| T15 | Oma HTTP liikluse analüüs | õige IP, TCP ja HTTP selgitus | [Paketipüük ja rikkepäevik](./paketipuuk-ja-rikkepaevik) |
| T16 | Kasutaja seostamine seadmega | SSH kasutaja ja IP seos ajaliselt | [Paketipüük ja rikkepäevik](./paketipuuk-ja-rikkepaevik) |
| T17 | Füüsiline jaam | A ja B eri seadmetel teenindavad veebi | [Lüliti, marsruuter ja võrguseadme tulemüür](./luliti-marsruuter-ja-vorguseadme-tulemuur) |
| T18 | Ruuteri läbiliikluse reegel | HTTP lubatud, kuulav SSH blokeeritud | [Füüsiline tõend ja ühise taristu töökorraldus](./fuusiline-toend-ja-uhise-taristu-tookorraldus) |

::: warning T17–T18 vajavad füüsilist riistvara
Nii nagu [Lüliti, marsruuter ja võrguseadme tulemüür](./luliti-marsruuter-ja-vorguseadme-tulemuur) osas juba selgitasime, vajavad need kaks katset kooli poolt ette valmistatud füüsilist riistvara, mida meie kodulabor ei paku. **Puuduvat taristut ei asendata väljamõeldud tulemustega** — kui riistvara pole olemas, märgi need katsed selgesõnaliselt "hindamata", mitte "läbitud" või "ei kehti".
:::

## Esitatav kaust

| Fail | Sisu |
| --- | --- |
| `README.md` | eesmärk, versioonid, teadaolevad piirangud, käivitamine |
| `arhitektuur.md` | võrguskeem, IP-plaan, pordid, sõltuvused |
| `inventar.md` | teenuste ja seadmete omanikud, hooldus ning varundussiht ([Cockpit ja teenuste inventar](./cockpit-ja-teenuste-inventar) mustris) |
| `paigaldus.md` | sinu tegeliku keskkonna korratav juhend, viited kasutatud kursusesammudele |
| `turve.md` | ligipääsumaatriks, TLS ja saladuste käsitlemine ([Tulemüür ja UFW](./tulemuur-ja-ufw), [HTTPS ja TLS](./https-ja-tls)) |
| `taastamine.md` | koopia aeg, ulatus, täpsed sammud, RPO/RTO ja test ([Varunduse põhimõtted ja CLI dump](./varunduse-pohimotted-ja-cli-dump)) |
| `testid.md` | T01–T18 tulemused koos tõendite asukohaga |
| `rikkepaevik.md` | üks diagnoositud ja parandatud rike ([Paketipüük ja rikkepäevik](./paketipuuk-ja-rikkepaevik) mustris) |
| `toendid/` | puhastatud ekraanipildid ja enda labori logiväljavõtted |

::: warning Saladused ei kuulu avalikule lehele
Varukoopia päris sisu, privaatvõtmed ja paroolid **ei kuulu** avalikule VitePressi lehele — sama põhimõte, mis läbi kogu kursuse korduvalt kehtis. Kui õpetaja vajab kontrolliks reaalset ligipääsu, antakse see eraldi, piiratud ligipääsuga testkoopiana, mitte avalikus dokumentatsioonis.
:::

## Võrguskeem — kaart, mis aitab vale pöörde leida

Skeem peab näitama **hosti ja VM-e**, märkima **alamvõrgud ja vajalikud pordid**, ning eristama **internetti** ja **labori sisevõrku**. Ilus ikoonide kogum ilma aadresside ja teekondadeta ei ole piisav hooldusdokument — kaart peab aitama päriselt **vale pöörde üles leida**, kui midagi läheb valesti.

::: tip Mida skeemil tähendab `127.0.0.1`
Ainult **selle konkreetse masina** sisemist ühendust — sama põhimõte, mis [Pordid, localhost ja oma DNS](./pordid-localhost-ja-oma-dns) osas juba selgitasime. Skeemile kirjutatud `127.0.0.1` ilma masina nimeta on eksitav, sest see väärtus tähendab iga masina jaoks midagi muud.
:::

## Sõltuvuste kontroll — üks katkenud lüli avaldub mujal

Veeb sõltub proksist ja rakendusest. Meil sõltub kasutajakontost, TLS-ist ja teenustest. Nimed sõltuvad resolveri seadistusest. Haldaja peab teadma, **millist komponenti millises järjekorras** kontrollida.

::: warning Nime viga pole Nginxi viga
Kui `app.lab.test` viitab valele IP-le, on Nginxi **taaskäivitamine** halb esimene samm — põhjus on **nime suunamises** ([Pordid, localhost ja oma DNS](./pordid-localhost-ja-oma-dns)), mitte Nginxi protsessis endas. Sama distsipliin, mis [Protsessid, teenused ja logid](./protsessid-teenused-ja-logid) osa "neli küsimust" ja [Veaotsingu järjekord ja oma DHCP katse](./veaotsing-ja-oma-dhcp-katse) osa kihtide järjekord.
:::

## Kokkuvõte

| Mõiste | Tähendus |
| --- | --- |
| Lõppprojekt | olemasoleva keskkonna tõendamine ja koondamine, mitte uus funktsionaalsus |
| T01–T18 | mõõdetavad vastuvõtukatsed, igaühel konkreetne tõend |
| T17–T18 | vajavad füüsilist riistvara — puudumisel "hindamata", mitte väljamõeldud |
| Esitatav kaust | 8 dokumenti + tõendite kaust, saladusteta |
| Sõltuvuste järjekord | teada, millist kihti kontrollida enne järgmist |

## Allikad

Selle osa lähteülesanne ja hindamisvahendid põhinevad kursuse enda autori koostatud õpiväljunditel.
