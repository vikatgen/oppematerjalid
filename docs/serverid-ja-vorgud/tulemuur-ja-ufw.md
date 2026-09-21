---
title: Tulemüür ja UFW
description: Ohumudel, vähimate õiguste põhimõte serveris, ning kuidas UFW abil lubada ainult põhjendatud ühendusi ja keelata kõik muu vaikimisi.
outline: deep
---

# Tulemüür ja UFW

::: info Õpiväljund
Pärast seda osa oskad koostada lihtsa ohumudeli, selgitada, miks vaikimisi keeld on turvalisem lähtepunkt kui vaikimisi luba, ning oled UFW abil piiranud srv1 ligipääsu ainult põhjendatud ühendustele.
:::

## Meeskonna kuueteistkümnes küsimus sinule

Kõik meie senised teenused (veeb, andmebaas) töötavad, aga praegu ei ole midagi, mis piiraks, kes serveriga üldse rääkida tohib peale meie enda kontrollitud host-only võrgu. Meeskonna turbevastutaja küsib otse: "kas keegi teine peaks pääsema `3306` porti proovima?"

::: tip Kui CIA-mudel juba tuttav
[Küberturvalisuse alused: CIA, risk, vara, oht](/kuberturvalisus/alused-cia-risk-oht) osa kattis juba konfidentsiaalsuse, tervikluse ja käideldavuse mõisted üldiselt. Siin rakendame samu mõisteid **konkreetselt oma serverile**, mitte üldiselt.
:::

## Ohumudel — enne reegleid, mõtle läbi

"Paneme tulemüüri" ei ole iseenesest täielik ohumudel. Ohumudel vastab kolmele küsimusele:

1. Mida me kaitseme (vara)?
2. Mille eest me kaitseme (võimalik vea või ründaja tee)?
3. Millise kontrolliga, mille mõju saab hiljem testida?

Meie labori kontekstis: kaitseme andmebaasi (`koolilab`) soovimatu kaugühenduse eest ja serveri haldusligipääsu (SSH) eest, kes iganes host-only võrgus muidu oleks.

## Vähimad õigused — juba tuttav muster uues kohas

::: tip Sama muster, uus tase
[Rakendus ja pöördproksi](./rakendus-ja-poordproksi) osas piirasime, mida `labapp` Linuxi kasutaja teha saab. [Kasutajad, õigused ja tehingud](./kasutajad-oigused-ja-tehingud) osas piirasime, mida `labapp` MySQL konto teha saab. Tulemüür on kolmas kiht sama põhimõtet: piirame, **kust** üldse ühendusi vastu võetakse — administraatoriõiguse (kõikjalt kõike lubav reegel) peaks jääma erandiks, mitte vaikimisi olekuks.
:::

## Hosti tulemüür — värav, mitte teenus ise

Tulemüür on väravavalvur: ta kontrollib külalise lähtekohta ja soovitud "ust" (porti), aga **ei ava ust ise**. Kui luugi taga (nt port 80) ei tööta ühtegi teenust, ei aita ka lubav tulemüürireegel — sama moodi nagu `ufw allow 80` ei paigalda iseenesest veebiserverit.

::: warning Lubatud port ei tõenda töötavat teenust
Need on kaks eraldi kontrolli: kas tulemüür **laseb** ühenduse läbi, ja kas midagi selle pordi taga üldse **vastab**. [Teenuse tervis ja veaotsing](./teenuse-tervis-ja-veaotsing) osa 502-vea loogika kehtib siingi — üks kontroll ei tõenda teist.
:::

## Suund ja olek — incoming, outgoing, ja vastused

**Incoming** (sisenev) puudutab serverisse **saabuvat** liiklust — see on, mida enamasti piirame. **Outgoing** (väljuv) puudutab serveri enda **algatatud** liiklust. Kaasaegne tulemüür on **olekuline** (*stateful*): ta tunneb ära, et sissetulev pakett on juba olemasoleva, serveri enda algatatud ühenduse **vastus**, mitte uus sissetulek — nii nagu väljuva telefonikõne vastus pole suvaline uus külastaja.

::: tip Miks `apt update` töötab ka siis, kui incoming on keelatud
Server ise algatab ühenduse paketihoidlasse (outgoing, lubatud). Vastuspaketid tulevad tagasi juba **olemasoleva** ühenduse osana, mitte uue sissetuleva ühendusena — olekuline filter laseb need läbi, ilma et peaksime eraldi incoming-reeglit lisama.
:::

## Sidumisaadress ja tulemüür — kaks eri kaitsekihti

`127.0.0.1` sidumine (nagu meie `labapp` rakendus ja MySQL juba kasutavad) piirab, **kust masinast** ühendus üldse tulla saab. Tulemüür piirab, **kust võrgust** ühendus üle võrgu läbi lastakse. Need on eraldiseisvad kaitsekihid — MySQL jääb loopbackile kättesaamatuks isegi siis, kui mõni tulemüürireegel peaks eksikombel liiga laialt lubama.

## Käed külge: UFW srv1 peal

**Hoia VirtualBoxi konsool avatuna kogu selle osa vältel** — kui reeglites peaks olema viga, on konsool sinu varutee tagasi sisse, kui SSH peaks kogemata blokeeruma. Reeglid eeldavad hosti aadressi `192.168.56.1`.

```bash
sudo apt install ufw openssl
```

Paigaldab tulemüüri haldusvahendi ja TLS tööriista — viimast vajame [järgmises osas](./https-ja-tls).

```bash
sudo ufw default deny incoming
```

Keelab vaikimisi **kõik** uued sisenevad ühendused — iga vajalik sissepääs peab olema selgesõnaliselt põhjendatud, mitte vastupidi.

```bash
sudo ufw default allow outgoing
```

Lubab serveri enda algatatud väljuvad ühendused — paketihoidlad ja muud vajalikud päringud jäävad tööle.

```bash
sudo ufw allow from 192.168.56.1 to any port 22 proto tcp
```

Lubab SSH **ainult** hosti aadressilt — mitte kogu host-only võrgult. `from` määrab lähtekoha, `to any` kohaliku siht(aadressi), `proto tcp` transpordiprotokolli. Haldusligipääsu ei pea avama tervele laborivõrgule.

```bash
sudo ufw allow from 192.168.56.0/24 to any port 80 proto tcp
sudo ufw allow from 192.168.56.0/24 to any port 443 proto tcp
```

Lubab kogu laborivõrgul HTTP ja HTTPS ühendusi — staatiline veeb, proksi ja [järgmises osas](./https-ja-tls) lisanduv HTTPS peavad kõigile laborivõrgu masinatele töötama.

```bash
sudo ufw allow from 192.168.56.0/24 to any port 53 proto udp
sudo ufw allow from 192.168.56.0/24 to any port 53 proto tcp
```

Lubab laborivõrgul DNS päringuid nii UDP kui TCP kaudu (DNS kasutab TCP-d vajadusel, näiteks pikemate vastuste puhul, mitte ainult UDP-d) — nii jääb [Pordid, localhost ja oma DNS](./pordid-localhost-ja-oma-dns) osas üles seatud `dnsmasq` klientidele kättesaadavaks.

::: warning Kinnita reeglid enne, mitte pärast
Enne `ufw enable` käivitamist veendu, et SSH lubareegel (port 22 hosti aadressilt) on juba nimekirjas — vastasel juhul lukustad end serverist välja. Hoia konsool avatuna kuni oled uue ühenduse hosti terminalist üle kontrollinud.
:::

```bash
sudo ufw enable
```

Lülitab tulemüüri sisse ja rakendab kogu ettevalmistatud poliitika.

```bash
sudo ufw status numbered
```

Näitab aktiivseid reegleid koos numbritega — võrdle tulemust oma kavandatud ligipääsumaatriksiga. Oodatav tulemus: ainult põhjendatud laborireeglid nimekirjas; portidele **3000** (rakendus) ja **3306** (MySQL) ei tohi olla ühtegi avalikku lubareeglit — need jäävad kättesaadavaks ainult loopbacki kaudu, nagu eelnevates teemades seadistasime.

::: warning Kui katsetad DHCP-d uuesti
[Veaotsingu järjekord ja oma DHCP katse](./veaotsing-ja-oma-dhcp-katse) osa DHCP katse eeldab, et sel hetkel polnud tulemüüri veel aktiveeritud. Kui teed seda katset uuesti pärast UFW sisselülitamist, vajab see eraldi, liidesepõhist DHCP-reeglit — ära jäta DHCP teenust lihtsalt tööle ilma vastava tulemüürireeglita.
:::

Kontrolli hosti terminalist, et olemasolev SSH-ühendus (võtmega, [SSH-ühendus ja andmebaasi põhitõed](./ssh-uhendus-ja-andmebaasi-pohitoed) osast tuttav) ikka töötab **uues aknas**, enne kui vana konsooli sulged.

## Kokkuvõte

| Mõiste / käsk | Tähendus |
| --- | --- |
| Ohumudel | vara + oht + testitav kontroll, mitte lihtsalt "paneme tulemüüri" |
| `default deny incoming` | vaikimisi keeld, iga luba peab olema põhjendatud |
| Olekuline (*stateful*) tulemüür | tunneb ära olemasoleva ühenduse vastuse, mitte ainult uut sissetulekut |
| `127.0.0.1` sidumine vs tulemüür | kaks eraldiseisvat kaitsekihti, mitte sama asi kahes kohas |
| `ufw allow from <IP> to any port <port>` | luba **kelle** ja **millise pordi** jaoks, mitte "kõik" |
| Portidele 3000/3306 avalik luba puudub | rakendus ja MySQL jäävad ainult loopbacki taha |

## Allikad

- [Ubuntu Server — UFW tulemüüri juhend](https://ubuntu.com/server/docs/how-to/security/firewalls/)
- [Küberturvalisuse alused: CIA, risk, vara, oht](/kuberturvalisus/alused-cia-risk-oht)
