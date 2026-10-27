# Kohtumise 10 lihtsustamise kavand

Staatus: rakendatud. Õppija peatükk, joonis, nelja kontrolli hindamine ja seotud kursusenõuded on uuendatud. Koormusarvutus on eraldi valikuline lisaharjutus. Packet Traceri läbimäng jääb õpetajale.

## Sihtrühm ja eesmärk

Esimese aasta tarkvaraarenduse õpilased, kes pole programmeerimise algkursust veel läbinud. Eeldame ainult eelnevates võrgutundides praktiliselt kasutatud teadmisi: kolm LAN-i, IP-aadress, lüüs, DHCP, DNS ja veebilehe kontrollimine. Käsurida on neile tuttav üksikute juhendatud tegevuste kaudu; iseseisvat reeglikeele kirjutamist ei eeldata.

Tunni nimi: **„Külaline pääseb välisvõrku, aga töötajate serverisse mitte”**.

Õpiväljund: õppija rakendab juhendi abil etteantud külalisvõrgu piirangu ning tõendab võrdluskatsetega, et külalisele lubatud teenus töötab ja töötajate server jääb kättesaamatuks.

## Miks praegune materjal vajab muutmist?

Praegu ühendab tund ligipääsureeglid, Cisco reeglikeele, pordinimede lühendid, pöördmaski, liikluse suuna, DHCP erandid, ruuteri halduse, parooliräsid ja koormusarvutuse. Uusi mõisteid on liiga palju ühe praktilise oskuse õppimiseks. Pelgalt käskude juurde pikemate seletuste lisamine ei vähenda seda koormust piisavalt.

`extended` on reeglistiku liik, mitte juhis olemasolevat loendit pikemaks teha. Õppijale piisab sõnast „ligipääsureeglid”; tööriistas nähtav `extended` tuleb ühe lausega ära seletada, ilma ACL-i liikide võrdlust nõudmata.

## Õppija põhitee

1. **Näe probleemi.** Oskar avab praegu nii välise lehe kui Staff serveri lehe. Õppija märgib, kumb peaks töötama ja kumb mitte.
2. **Lepi kokku reeglid tavakeeles.** Külaline saab võrguandmed, pääseb välisele lehele ja välisele DNS-ile, kuid ei pääse Gaming/Staff seadmete ega võrguseadmete halduseni.
3. **Ennusta tulemus joonisel.** Näita Guest → ruuter → väline server lubatud teekonnana ning Guest → Staff keelatud teekonnana. Näita DHCP saamist eraldi lubatud tegevusena. Värvide kõrval on alati sõnad „lubatud” ja „keelatud”.
4. **Vaata üht õpetaja näidet.** Õpetaja seob ühe tavakeelse reegli vastava käsureaga. Ülejäänud toimiv seadistus on ette antud, mitte õpilase tuletatav.
5. **Rakenda valmis reeglistik juhendatult.** Õppija võib kontrollitud käsuploki kopeerida. Ta tuvastab, millises seadmes ja liidesel muudatus tehakse, ning ütleb enne rakendamist, millist tulemust ootab. Iga rea kõrval on lihtne tähenduse selgitus.
6. **Kontrolli tulemust.** Täida lühike enne/pärast tabel, kasutades tegelikke IP-aadresse. Õpetaja etteantud halduspiirangud jäävad toimima.
7. **Põhjenda.** Õppija nimetab riski, valitud piirangu ja tõendi, et võrk ei ole lihtsalt tervikuna katki.

Kõik kohustuslikud juhised jäävad põhiteksti. Lisateave, näiteks pöördmaskide üksikasjad ja DHCP uuenduste eri edastusviisid, on selgelt valikuline.

## Kuidas seletada DHCP lubamise rida?

Kasuta põhitekstis numbrilisi porte:

```text
permit udp any eq 68 any eq 67
```

Tähendus ühe lausega: **„Luba kliendi DHCP-päring serverile.”** Seejärel loetakse käsk vasakult paremale:

| Käsk | Selgitus |
| --- | --- |
| `permit` | Luba |
| `udp` | Järgnev reegel käib UDP liikluse kohta; DHCP kasutab UDP-d |
| esimene `any` | Saatja IP võib olla ükskõik milline; uus klient ei tea veel oma IP-d |
| `eq 68` | Saatja port peab olema 68, DHCP kliendi port |
| teine `any` | Saaja aadressi siin ei piirata; klient võib alles serverit otsida |
| `eq 67` | Saaja port peab olema 67, DHCP serveri port |

`eq` tähendab „võrdub”. Tööriist võib näidata numbrite asemel nimesid: `bootpc` = 68 ja `bootps` = 67. Need nimed pole eraldi õpitav teema. Joonis seob rea tegevusega „arvuti küsib võrguandmeid”. Õppija ei pea seda rida mälu järgi koostama ega pordinumbreid pähe õppima.

See rida lubab kliendi päringu; ruuterist kliendile tulev vastus on teine suund. Algaja põhitee ei pea hõlmama DHCP pakettide kõiki erijuhtumeid. Õpetaja juhendamisel rakendatav täiskonfiguratsioon peab need siiski õigesti käsitlema.

## Kohustuslikud kontrollid

| Katse | Enne piirangut | Pärast piirangut |
| --- | --- | --- |
| Oskar küsib DHCP-seadistuse uuesti | Saab õige seadistuse | Saab endiselt õige seadistuse |
| Oskar avab välise lehe nime kaudu | Avaneb | Avaneb |
| Oskar avab Staff serveri lehe IP kaudu | Avaneb | Ei avane |
| Mirjam avab sama serveri lehe sama IP kaudu | Avaneb | Avaneb |

Õige seadistus tähendab oma LAN-i aadressi, maski, lüüsi ja välist DNS-i. Vajadusel aitab õpetaja kontrollida ka renditabelit. Sama serveri kontroll samal IP-l eemaldab võrdlusest erinevate DNS-ide mõju.

Gaming võrgu ja haldusjuurdepääsu kontrollid säilivad õpetaja täielikus kontrollnimekirjas. Õppija näeb ka neid tavakeelses reeglitabelis, kuid ei pea samas tunnis eraldi õppima VTY-liine, haldusprotokolle ega räsialgoritme.

## 90 minuti ajakava

| Aeg | Tegevus |
| --- | --- |
| 0–10 min | Toimiva lähtefaili avamine ja probleemi näitamine |
| 10–25 min | Lubatud/keelatud tegevuste tabel, joonis ja ennustused |
| 25–40 min | Õpetaja näide: üks reegel ja DHCP rea lahtilugemine |
| 40–55 min | Etteantud reeglistiku juhendatud rakendamine |
| 55–75 min | Enne/pärast kontrollid paarides, rollide vahetamine |
| 75–85 min | Individuaalne põhjendus ja vajadusel parandamine |
| 85–90 min | Toimiva töö ja kontrolltabeli salvestamine |

## Mis liigub mujale?

- Koormusarvutus eraldi hilisemaks harjutuseks. Alusta seal ühest tegevusest ja lihtsast korrutamisest; lisa üleslaadimine ja varu järk-järgult. Seda ei lisata automaatselt kohtumise 11 kohustuslikele hindamistegevustele.
- Ruuteri halduse sulgemine ja keerukad tehnilised erandid õpetaja ettevalmistusse. Õppijale selgitatakse riski ning näidatakse rakendatud kaitset.
- ACL-i iseseisev kirjutamine, pöördmaskide tuletamine, reeglite ümberjärjestamise veakatsed ja DHCP uuendusjuhtude võrdlus valikuliseks jätkuks pärast põhioskuse omandamist.

## Rakendamise ulatus järgmises etapis

1. Kirjuta kohtumise 10 õppijale mõeldud põhitekst ümber selle kavandi järgi; lisa otsuse ja teekondade joonis ning lühikesed käsuselgitused.
2. Lisa õpetajajuhendisse täielik tehniline seadistus ja kontrollid, sealhulgas Guest DNS, DHCP, Gaming/Staff piirangud ning võrguseadmete haldus.
3. Säilita töötav `10-isolated.pkt` tulemus ning olemasolev IP- ja DNS-plaan. Muutub õppija töö ulatus, mitte külalisvõrgu vajalik kaitse.
4. Ühtlusta `assignments.md`, sissejuhatuse kohtumiste tabel ja kohtumise 11 ajakava: koormusarvutus ei tohi jääda mujale peidetud kohustuseks.
5. Hinda lubatud/keelatud tulemuse põhjendamist ja kontrollimist. Cisco süntaksi mälu järgi kirjutamine pole hindamiskriteerium.

Kavand ei lisa kontrollitud Packet Traceri faili. Õpetaja kontrollib kasutatava mudeliga täieliku konfiguratsiooni enne tundi.

## Täpsustus: õpilase enda fail

Õpetaja ei valmista võrgufaile ette. Välise testvõrgu ehitab õppija töös 9A; 10. kohtumine algab tema enda `09a-external.pkt` failist. Halduspiirangud rakendatakse tunnis juhendatult. Ajalooline kavand ei tähenda eelvalmistatud failide nõuet.
