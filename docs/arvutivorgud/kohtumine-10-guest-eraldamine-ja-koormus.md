---
title: "Külaline pääseb välisvõrku, aga töötajate serverisse mitte"
description: "Kohtumine 10: otsustame, mida külaline tohib teha, rakendame juhendi abil valmis piirangu ja kontrollime nelja tulemust."
outline: deep
---

<script setup>
import './guest-figures.css'
</script>

# 10. Külaline pääseb välisvõrku, aga töötajate serverisse mitte

::: info Õpiväljund
Pärast kohtumist oskad juhendi abil rakendada külalisvõrgu piirangu ning kontrollidega näidata, et külaline pääseb välisele lehele, kuid töötajate serverisse mitte.
:::

## Probleem: Oskar pääseb liiga kaugele

Kohtumisel 9 ühendasime Oskari sülearvuti Guest võrku ja töös 9A ehitasime välise testserveri. Ta sai automaatselt võrguandmed ja avas välise testlehe. Aga ta sai avada ka töötajate serveri lehe aadressil `http://192.168.20.10`.

Mirjam küsib: „Külalisel pole töötajate serverisse asja. Kas saame selle ligipääsu ära võtta nii, et väline leht töötaks edasi?”

Täna teeme just seda. **Sina otsustad, mida lubada, rakendad koos õpetajaga valmis reeglid ja kontrollid tulemust.** Käske ei pea mälu järgi kirjutama. Kopeerimine on lubatud, kui tead, millist seadet muudad ja mis peaks muutuma.

## Enne alustamist

1. Ava oma toimiv `09a-external.pkt` ja salvesta koopia nimega `10-isolated.pkt`.
2. Kontrolli Oskari WiFi ühendust. Ta peab olema võrgus `Karli-Guest`.
3. Välise testlehe nimi on `valis.test` ja DNS-serveri IP `203.0.113.10`; need seadistasid ise töös 9A.
4. Õpetaja näitab, milline `R-Center` ruuteri liides on ühendatud Guest pääsupunktiga. Allpool on näidisnimi `GigabitEthernet0/2`; kui sinu mudelil on teine nimi, annab õpetaja sobiva käsu.

Ruuterid, serverid ja kõik kolm DHCP-pooli on sinu senistes töödes seadistatud. Õpetaja kontrollib enne tegevust ka ruuteri ja pääsupunkti halduse piiranguid. Kui väline leht praegu ei tööta, paranda see õpetajaga enne uute reeglite lisamist.

## 1. Lepime kokku, mida külaline tohib teha

| Oskari tegevus | Meie otsus | Miks? |
| --- | --- | --- |
| Küsib DHCP-lt võrguandmeid | **Lubatud** | Muidu ei saa uus külaline võrku kasutada |
| Avab välise testlehe ja kasutab välist DNS-i | **Lubatud** | See on külalisvõrgu eesmärk |
| Ühendub Gaming arvutitega | **Keelatud** | Külaline ei vaja mänguarvutitele ligipääsu |
| Avab Staff serveri või ühendub töötajate arvutitega | **Keelatud** | Töötajate seadmed jäävad töötajatele |
| Muudab ruuteri või pääsupunkti seadistust võrgu kaudu | **Keelatud** | Külaline ei halda keskuse võrku |

<figure class="guest-figure" aria-labelledby="guest-path-caption">
  <div class="guest-figure-title">Oskari liiklus jõuab kõigepealt ruuterini</div>
  <div class="guest-path-start"><strong>Oskar · Guest</strong><span>→</span><strong>R-Center · kontrollib reegleid</strong></div>
  <div class="guest-paths">
    <div class="guest-allow"><strong>→ LUBATUD</strong><span>Väline leht ja väline DNS</span></div>
    <div class="guest-deny"><strong>× KEELATUD</strong><span>Staff server ja Gaming arvutid</span></div>
  </div>
  <div class="guest-dhcp"><strong>DHCP jääb lubatuks:</strong> Oskar saab ruuterilt endiselt võrguandmed.</div>
  <figcaption id="guest-path-caption">Ruuter kontrollib seda läbivat liiklust. Pääsupunkti enda halduse kaitset kontrollime tunnis õpetajaga eraldi.</figcaption>
</figure>

**Ennusta:** kui keelaksime külalisele kogu liikluse, kas oleksime ülesande õigesti lahendanud? Selgita tabeli abil.

## 2. Kontrollime, kuidas võrk praegu töötab

Tee allolevas tabelis neli kontrolli ja täida veerg **„Enne”**. „Väline leht” tähendab sinu töö 9A serverit: `http://valis.test` ehk `http://203.0.113.10`.

| Kontroll | Enne: tegelik tulemus | Pärast: tegelik tulemus | Pärast peab olema |
| --- | --- | --- | --- |
| Oskar küsib DHCP-seadistuse uuesti | | | Saab õige seadistuse |
| Oskar avab välise testlehe **nime kaudu** | | | Avaneb |
| Oskar avab `http://192.168.20.10` | | | Ei avane |
| Mirjam avab `http://192.168.20.10` | | | Avaneb |

DHCP kontrolliks ava Oskaril **Desktop → IP Configuration** ja vali **Static → DHCP**. Vaata, kas IP jääb vahemikku `192.168.30.21–192.168.30.200`, mask on `255.255.255.0`, lüüs on `192.168.30.1` ja DNS on nüüd **`203.0.113.10`**. Kui näed veel `192.168.20.10`, lõpeta töö 9A DNS-i vahetamise samm enne piirangu lisamist.

Veebilehe kontrolliks kasuta arvuti **Desktop → Web Browser** vaadet. Enne piirangu lisamist peaksid mõlemad arvutid Staff serveri lehe avama.

## 3. Kuidas ruuter meie otsustest aru saab?

Ruuter vajab otsuseid kindlas käsuvormis. Neid nimetatakse **ligipääsureegliteks** ehk **ACL-iks** (*Access Control List*).

Näiteks meie otsus **„Luba arvutil DHCP-serverilt võrguandmeid küsida”** on ruuteri jaoks:

```text
permit udp any eq 68 any eq 67
```

Loeme seda vasakult paremale:

| Käsu osa | Lihtne tähendus |
| --- | --- |
| `permit` | Luba |
| `udp` | See rida puudutab UDP liiklust; DHCP kasutab UDP-d |
| esimene `any` | Saatja IP võib olla ükskõik milline, sest uuel kliendil pole veel õiget IP-d |
| `eq 68` | Saatja port peab olema 68: DHCP kliendi port |
| teine `any` | Saaja aadressi siin ei piirata: klient võib alles serverit otsida |
| `eq 67` | Saaja port peab olema 67: DHCP serveri port |

`eq` tähendab „võrdub”. Pordid 68 ja 67 tähistavad siin kliendi ja serveri DHCP suhtlust, mitte jagatavaid IP-aadresse. Ruuter võib neid numbreid näidata nimedega `bootpc` ja `bootps`. Neid nimesid ega numbreid ei pea pähe õppima.

**Reeglite järjekord loeb:** ruuter loeb ülevalt alla ning esimene sobiv reegel otsustab. Näiteks tuleb vajalik DHCP suhtlus lubada enne ruuteri Guest-aadressi keelamist. Kasutame õpetajaga etteantud järjekorda.

## 4. Rakendame valmis reeglid koos õpetajaga

Ava **R-Center → CLI**. Õpetaja aitab vajadusel jõuda käsureale `R-Center>`. Kui oled juba `R-Center#` real, alusta käsust `configure terminal`.

Kopeeri järgmine plokk. Loe enne selle all olevast tabelist, mida iga rida teeb:

```text
enable
configure terminal
ip access-list extended GUEST-IN
permit udp any eq 68 any eq 67
deny ip 192.168.30.0 0.0.0.255 192.168.10.0 0.0.0.255
deny ip 192.168.30.0 0.0.0.255 192.168.20.0 0.0.0.255
deny ip any host 192.168.30.1
permit ip 192.168.30.0 0.0.0.255 any
end
```

| Rida algab | Mida teeme? |
| --- | --- |
| `enable`, seejärel `configure terminal` | Läheme ruuteri seadistamise režiimi, nagu eelmistes tundides |
| `ip access-list extended GUEST-IN` | Loome nimega `GUEST-IN` reeglistiku. `extended` on selle liik: saab arvestada nii saatjat, saajat kui ka porte |
| `permit udp ...` | Lubame DHCP päringu |
| `deny ip ... 192.168.10.0 ...` | Keelame Guest → Gaming liikluse |
| `deny ip ... 192.168.20.0 ...` | Keelame Guest → Staff liikluse |
| `deny ip any host 192.168.30.1` | Keelame muu liikluse ruuteri Guest-aadressile; eelnev DHCP erand jääb lubatuks |
| `permit ip 192.168.30.0 ... any` | Lubame ülejäänud Guest liikluse, sealhulgas välise lehe ja välise DNS-i |
| `end` | Väljume seadistamisest |

`deny` tähendab „keela” ja `host` üht aadressi. Kirjapaar `192.168.30.0 0.0.0.255` tähistab selles käsus kogu Guest `/24` võrku. Teised samakujulised paarid tähistavad Gaming ja Staff võrku. **Täna kasutame valmis kuju; seda maski ise arvutama ei pea.**

Vaata koos õpetajaga tulemust:

```text
show access-lists
```

Nüüd on reeglid olemas, kuid need tuleb veel Guest ühendusel kasutusele võtta. Ütle enne järgmist plokki, milline liides sinu failis Guest pääsupunktini viib. Seejärel rakenda õpetajaga:

```text
configure terminal
interface GigabitEthernet0/2
ip access-group GUEST-IN in
end
```

- `interface ...` valib Guest liidese.
- `ip access-group GUEST-IN in` paneb meie reeglid kontrollima **Guest võrgust ruuterisse saabuvat liiklust**.
- `end` lõpetab seadistamise.

Kui näed veateadet, peatu ja näita seda õpetajale. Ära muuda teiste LAN-ide ega välisvõrgu liidest.

## 5. Kontrollime, mis muutus

Täida nüüd sama nelja kontrolli tabeli veerg **„Pärast”**. Küsi Oskaril DHCP-seadistus uuesti ning kontrolli kõiki nelja parameetrit, mitte ainult varem saadud IP olemasolu.

**Õige tulemus:** Oskar avab välise lehe, kuid Staff serveri lehte ei ava. Mirjam avab sama Staff serveri lehe endiselt. Nii näitad, et server töötab ja piirang puudutab külalist.

::: tip Kui midagi ei lähe ootuspäraselt
- **Oskar ei saa võrguandmeid:** kontrolli õpetajaga WiFi ühendust ja DHCP lubavat rida.
- **Oskar ei ava ka välist lehte:** kontrolli, kas reeglistiku lõpus on ülejäänud liiklust lubav rida. Kui leht avaneb IP, aga mitte nime kaudu, vaata välist DNS-aadressi.
- **Oskar avab ikka Staff serveri lehe:** kontrolli Staff keeldu ja seda, kas reeglid rakendati õigele liidesele.
- **Mirjam ei ava serveri lehte:** kontrolli kõigepealt serveri HTTP-teenust ja Mirjami ühendust. See ei ole soovitud tulemus.
:::

Ruuteri Guest-aadressi `192.168.30.1` ping on nende reeglite järel keelatud. Selle ebaõnnestumine üksi ei näita, et välisühendus või DHCP on katki.

Kui vajad taastamist, ava salvestatud `09a-external.pkt` koopia ja korda juhendit õpetajaga. Esita toimiv tulemus.

## Esitatav töö

- Fail `10-isolated.pkt`. Salvesta ruuteri seadistus käsuga `copy running-config startup-config`, kinnita pakutud sihtnimi Enteriga ja salvesta ka `.pkt` fail.
- Nelja kontrolli **tegelikud tulemused enne ja pärast** piirangu rakendamist.
- Lühike selgitus: millise riski vähendasid ning millised kaks kontrolli koos tõendavad, et Staff server töötab, aga külaline ei pääse sellele ligi?

Paaris töötades vahetage seadistaja ja kontrollija rolli. Mõlemad peavad oskama tulemust oma sõnadega põhjendada. Õpetaja kontrollib lisaks Gaming võrgu ja võrguseadmete halduse kaitset.

## Mõtesta

1. Miks peab DHCP pärast piirangu lisamist edasi töötama?
2. Miks ei piisa tõendist „Oskaril leht ei avane”?
3. Kas WiFi nimi `Karli-Guest` üksi keelaks Staff serverisse pääsemise?

## Soovi korral hiljem

Kui põhiosa on tehtud, saad eraldi [võrgukoormuse lisaharjutuses](./lisaharjutus-vorgukoormus) arvutada, kui suurt ühendust mängukeskus vajab. See ei kuulu selle kohtumise kohustusliku töö hulka.
