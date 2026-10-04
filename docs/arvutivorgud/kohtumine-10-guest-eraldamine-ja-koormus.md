---
title: "Guest eraldamine ja mängukeskuse koormus"
description: "Kohtumine 10: Oskar ei tohi jõuda Mirjami serverisse. ACL-i põhimõte, filtri rakendamine Guest liidesele, lubatud ja keelatud testid, haldusparool ning koormusarvutus."
outline: deep
---

# 10. Guest eraldamine ja mängukeskuse koormus

::: info Õpiväljund
Pärast kohtumist oskad rakendada külalisvõrgule ligipääsupoliitika, tõendada lubatud ja keelatud ühenduste toimimist, seadistada ruuteri haldusparooli ning arvutada mängukeskuse võrgukoormust.
:::

::: danger Kavandatud, mitte läbi proovitud
ACL-i käsud on tüüpilised Cisco IOS käsud, kuid neid ei ole selle labori Packet Traceri failis veel kontrollitud. Käske, reeglite järjekorda ja DHCP-liikluse säilimist tuleb piloodis testida enne õppijatega kasutamist. See on kursuse kõige tihedam kohtumine.
:::

## Mis Karli keskuses nüüd juhtub?

Eelmisel kohtumisel jõudis Oskar internetti, aga `ping 192.168.20.10` vastas ka. Mirjam küsib: "Kas Oskar näeb minu serverit?" Karl vaatab ja vastus on **jah**. See on probleem.

Täna paneme külalisvõrgule **reegli**: Guest võib jõuda internetti, aga mitte keskuse sisevõrkudesse.

## ACL: ligipääsureeglite loend

**ACL** (*Access Control List*) on ruuteri reeglite loend, mis ütleb, millised paketid läbi lastakse ja millised blokeeritakse. See on nagu uksehoidja, kellel on nimekiri: "Ainult need võivad sisse."

Kolm põhimõtet:

1. **Reegleid loetakse ülevalt alla.** Esimene sobiv reegel otsustab. Kui pakett sobib reegliga, lõpetatakse lugemine.
2. **Lõpus on peidetud "keela kõik".** Kui ükski reegel ei sobi, pakett keelatakse. Sellepärast peab loend ka **lubama** kõik, mida vaja.
3. **Suund loeb.** Reegel kehtib ruuterisse **sisenevale** liiklusele (*in*) või väljuvale (*out*) liidesel. Me kasutame Guest liidesel **sisenevat** suunda: pakett filtreeritakse kohe, kui see Guest võrgust ruuterisse jõuab.

**Piir:** ACL on **pakettfilter** õppelabori jaoks, mitte tulemüür tootmiskeskkonnas. Päris keskkonnas on rohkem vajalik.

## Kohustuslik ligipääsupoliitika

See on ligipääsumaatriks kohtumisest 3, mille nüüd rakendame:

| Kust | Kuhu | Nõue |
| --- | --- | --- |
| Guest | DHCP | Saab IP, maski, gateway ja DNS-i |
| Guest | Väline DNS ja HTTP | Töötab |
| Guest | Gaming seadmed | **Keelatud** |
| Guest | Staff arvuti ja server | **Keelatud** |
| Guest | Võrguseadmete haldus | **Keelatud** |

### Reeglid ja nende järjekord

Reeglite järjekord on oluline, sest esimene sobiv võidab:

1. **Luba DHCP** (kliendi päring ruuterisse). **Esimesena**, sest ilma selleta ei saa külaline aadressi. Kui see jääb viimaseks, on enne tulnud keelav reegel ja külaline ei saa aadressi.
2. **Keela Guest → Gaming võrk.**
3. **Keela Guest → Staff võrk.**
4. **Keela Guest → ruuter ise** (haldus).
5. **Luba ülejäänu** (internet ja väline DNS/HTTP).

```text
enable
configure terminal
ip access-list extended GUEST-IN
 permit udp any eq bootpc any eq bootps
 deny ip 192.168.30.0 0.0.0.255 192.168.10.0 0.0.0.255
 deny ip 192.168.30.0 0.0.0.255 192.168.20.0 0.0.0.255
 deny ip any host 192.168.30.1
 permit ip 192.168.30.0 0.0.0.255 any
 exit
interface GigabitEthernet0/2
 ip access-group GUEST-IN in
 end
```

| Rida | Mida see teeb |
| --- | --- |
| `permit udp any eq bootpc any eq bootps` | Lubab DHCP päringu (kliendi port 68 → serveri port 67) |
| `deny ip 192.168.30.0 0.0.0.255 192.168.10.0 0.0.0.255` | Keelab Guest võrgu liikluse Gaming võrku |
| `deny ip 192.168.30.0 0.0.0.255 192.168.20.0 0.0.0.255` | Keelab Guest võrgu liikluse Staff võrku |
| `deny ip any host 192.168.30.1` | Keelab Guest võrgu liikluse ruuteri enda aadressile (haldus) |
| `permit ip 192.168.30.0 0.0.0.255 any` | Lubab ülejäänud liikluse (internet) |

`0.0.0.255` on **vastupidine mask** (*wildcard mask*): see ütleb, millised aadressi osad võivad erineda. `192.168.30.0 0.0.0.255` tähendab "kõik aadressid `192.168.30.x`". Selle põhimõtte oled juba õppinud: kolm esimest arvu peavad olema samad, viimane võib olla mis tahes.

::: warning Käsud kontrollida
`bootpc` ja `bootps` on DHCP portide nimed. Kui Packet Tracer neid nimesid ei tunne, kasuta numbreid (`eq 68`, `eq 67`). Kontrolli käsu kuju oma versioonis.
:::

### Kontroll pärast reeglite lisamist

Esimene kontroll on **DHCP**. Pärast filtri lisamist lülita Oskari sülearvuti WiFi välja ja uuesti sisse (või lülita DHCP-st Static'ile ja tagasi). Kas ta saab ikka `192.168.30.x` aadressi? Kui ei saa, on DHCP reegel puudu või vales järjekorras.

## Testmaatriks

Kuidas tõestame, et poliitika töötab? Testime **nii lubatud kui keelatud** tegevusi. Üksnes "ping ei vasta" ei tõenda midagi: ka ruuter, mis on välja lülitatud, ei vasta.

**Õige tõend** on: sama teenus **töötab ühest kohast ja ei tööta teisest**. Näiteks HTTP server Staff võrgus.

| # | Kust | Mida teeb | Oodatav tulemus | Tegelik |
| --- | --- | --- | --- | --- |
| 1 | Henri-PC (Gaming) | Avab `http://gaming.test` | Avaneb | |
| 2 | Mirjam-PC (Staff) | Avab `http://gaming.test` | Avaneb | |
| 3 | Oskar-Laptop (Guest) | Avab `http://192.168.20.10` | **Ei avane** | |
| 4 | Oskar-Laptop | `ping 192.168.10.21` (Gaming) | **Ei vasta** | |
| 5 | Oskar-Laptop | Avab välise testlehe | Avaneb | |
| 6 | Oskar-Laptop | Saab DHCP-st aadressi | Saab | |
| 7 | Oskar-Laptop | Katse ühenduda ruuteri halduseni | **Ei õnnestu** | |

Read 1 ja 3 koos on tõend: sama server ja sama leht on Staffist kättesaadav ja Guestist mitte. Rida 5 tõendab, et külalisele **lubatud** teenus jääb kasutatavaks. Poliitika, mis blokeerib kõik, on sama vigane kui poliitika, mis ei blokeeri midagi.

## Mis juhtuks, kui…

1. **DHCP-reegel on viimane, mitte esimene.** Tõsta `permit udp ...` loendi lõppu ja lase Oskari sülearvutil aadress uuesti küsida. Kas ta saab? Vaata, miks. Esimeseks sobib reegel, mis keelab, ja DHCP päring ei jõua kunagi lubava reegli juurde. Külalisele paistab see nii: "WiFi-ga ühendus on, aga internetti ei ole."
2. **Viimane `permit ip ... any` puudub.** Vaata, mis Oskari välise lehega juhtub. Loendi lõpus on peidetud "keela kõik", nii et ka internet katkeb. Külaline ei saa enam midagi teha. See on turvaline, aga mängukeskus ei vaja seda.

Mõlemal juhul taasta algne loend.

## Võrguseadme haldus

Reegel külalisvõrgu eest ruuterisse (rida 4 ülal) kaitseb ruuteri seadistust. Aga **pääsupunkti enda haldus** on eraldi küsimus. Pääsupunkt asub samas Guest võrgus ja sinna sisenevat liiklust ruuteri ACL **ei filtreeri**, sest see ei läbi ruuterit. Seepärast:

- Vaata pääsupunkti haldusvõimalusi ja keela kaughaldus, kui mudel seda lubab.
- Märgi dokumentatsiooni, **milliseid** piiranguid sa ei suutnud rakendada.

### Ruuteri haldusparool

Seadistame ruuterile parooli, et seadistust ei saaks muuta igaüks, kes selleni jõuab:

```text
configure terminal
enable secret <labori parool>
service password-encryption
end
```

Parooli kohta:

- Kasuta labori jaoks mõeldud parooli, mitte oma päris parooli.
- `enable secret` hoiab parooli krüpteeritult. Seda parooli küsitakse, kui keegi ruuteris `enable` käsu annab.
- **Kaugele ligipääsu** ei ava me lihtsalt "testimiseks". Kui kaughaldus pole vajalik, jääb see sisse lülitamata.

Pärast seadistust kontrolli: vaata `show running-config` väljundist, et parool on krüpteeritud ja et kaughaldus ei ole lubatud.

## Mängukeskuse koormus

Eelmine osa oli **turve**. Nüüd vaatame **võimsust**: kas keskuse internetiühendus jaksab, kui sinna tuleb 20 mängijat? Mõisted (Mbit/s ja MB/s, ribalaius, edastuskiirus, viivitus, paketikadu) õppisid [kohtumisel 3](./kohtumine-03-vorguplaan-ja-packet-tracer#kui-suurt-uhendust-keskus-vajab). Siin teeme arvutuse.

Packet Traceris ei ehita me 20 arvutit ja simulatsiooniaeg ei ole päris kiiruse tõend. Seepärast **arvutame**.

### Mida arvutuseks vaja on

1. **Kes ja mida teeb?** (mäng, video, uuendus)
2. **Kui palju igaüks vajab?** (Mbit/s alla ja üles)
3. **Kui paljud teevad seda korraga?** (samaaegsus)

Kõik need on **eeldused**. Hea arvutuse tunnus on see, et eeldused on kirjas ja neid saab muuta. Kui Karl ütleb "meil tuleb tegelikult 25 mängijat", muudad ühe numbri ja arvutad uuesti.

Eeldused:

| Tegevus | Eeldus (ühe mängija kohta) | Alla | Üles | Allikas |
| --- | --- | --- | --- | --- |
| Online mäng | Karli enda eeldus | 3 Mbit/s | 1 Mbit/s | Eeldus, **ei ole mõõdetud** |
| 1080p video (5 mängijat korraga) | Netflixi soovitus | 5 Mbit/s | | [Netflix](https://help.netflix.com/en/node/306) |
| Mängu uuendus (üks mängija korraga) | Karli eeldus | 50 Mbit/s | | Eeldus |

::: tip Eeldus, mitte reegel
Netflixi 5 Mbit/s on 1080p jaoks soovitus. Päris video võib vajada vähem või rohkem. Mängunumbrid on Karli oma valik. Seepärast kirjutad iga arvu kõrvale, kust see on.
:::

### Arvutuskäik

**Alla ja üles eraldi.** Internetiühendus on tihti **asümmeetriline**: allalaadimine on kiirem kui üleslaadimine. Mäng vajab mõlemat, seepärast arvuta suunad eraldi.

```text
Alla:  20 × 3 + 5 × 5 + 1 × 50 = 60 + 25 + 50 = 135 Mbit/s
Üles:  20 × 1                                  =  20 Mbit/s
```

**Lisa varu.** Päris liiklus on ebaühtlane ja ühendus ei jõua kunagi täis kiiruseni. Lisa **20% varu**. See on valik, mitte seadus, nii et kirjuta see eeldusena üles.

```text
Alla:  135 × 1,2 = 162 Mbit/s
Üles:   20 × 1,2 =  24 Mbit/s
```

Karli keskus vajab ühendust, mis annab vähemalt umbes **162 Mbit/s alla ja 24 Mbit/s üles**, **kui eeldused vastavad tõele**.

### Kitsaskoht

Isegi kui ühenduse allalaadimine on piisav, võib mõni teine osa ahelas piirata. **Kitsaskoht** on osa, mis piirab kogu ahelat.

Karli internetipakkuja pakub paketti **200 Mbit/s alla ja 10 Mbit/s üles**. Võrdle:

| Suund | Vaja | Pakett annab | Piisab? |
| --- | --- | --- | --- |
| Alla | 162 Mbit/s | 200 Mbit/s | Jah |
| Üles | 24 Mbit/s | 10 Mbit/s | **Ei** |

Siin on kitsaskoht **üleslaadimine**. Kommutaatori kiirendamine ei aitaks. Karl peab leidma paketi, mis annab üles vähemalt 24 Mbit/s.

### Miks ainult mängijate arvust ei piisa

| Keskus | Mängijaid | Tegevus | Ligikaudne vajadus alla |
| --- | --- | --- | --- |
| A | 20 | Kõik mängivad (3 Mbit/s) | 60 Mbit/s |
| B | 5 | Kõik vaatavad korraga 4K videot (15 Mbit/s) | 75 Mbit/s |

Väiksem keskus vajab rohkem. Tegelik vajadus sõltub sellest, **mida** mängijad teevad, **mitu neist korraga**, **mis suunas** ja **kui palju varu** on vaja. (4K video 15 Mbit/s põhineb samuti Netflixi soovitusel.)

### Mõõtmine

Üks lühike mõõtmine päris keskkonnas (failiedastuse aeg, `ping`) või õpetaja antud mõõteandmed. Kui kasutad õpetaja andmeid, märgi, et õppija ise ei mõõtnud.

## Esitatav töö

- Fail `10-isolated.pkt`.
- Täidetud testmaatriks (7 rida).
- Haldusmuudatuse protokoll: mida seadistasid, miks ja kuidas kontrollisid.
- Koormusarvutus eeldustega: alla ja üles eraldi, varu ning kitsaskoht.

**Kontroll:** keelatud sisemine HTTP ebaõnnestub Guestist, sama teenus töötab Gamingust ja Staffist, väline teenus Guestist jääb tööle.

Kui filter vajab rohkem aega, lõpetatakse see siin ning mõõtmine ja arvutus viiakse üheteistkümnenda kohtumise esimesse 20 minutisse. **Guest eraldamisest ei loobuta.**

## Kokkuvõte

| Mõiste | Tähendus |
| --- | --- |
| ACL | Ruuteri reeglite loend |
| Reeglite järjekord | Esimene sobiv reegel otsustab |
| Vastupidine mask | `0.0.0.255` tähendab "viimane arv võib olla mis tahes" |
| Testmaatriks | Lubatud ja keelatud tegevuste tulemused |
| Ribalaius | Maksimaalne võimalik edastus |
| Kitsaskoht | Ahela aeglaseim lüli, mis piirab tervikut |
| Asümmeetriline ühendus | Allalaadimine on kiirem kui üleslaadimine |
