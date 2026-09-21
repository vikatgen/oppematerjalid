---
title: Teine server ja esimene snapshot
description: Ehitame srv2 samamoodi nullist (mitte kloonides) ja teeme esimese taastepunkti — ning saame selgeks, miks snapshot ei ole varukoopia.
outline: deep
---

# Teine server ja esimene snapshot

::: info Õpiväljund
Pärast seda osa on sul kaks iseseisvat Ubuntu serverit ja üks salvestatud snapshot, ning oskad selgitada, miks snapshot ja varukoopia ei ole sama asi.
:::

## Miks mitte lihtsalt kloonida srv1?

VirtualBoxis on nupp **Clone**, mis teeks srv1-st täpse koopia paari klikiga. See tundub kiirem tee srv2 loomiseks — aga me *ei* tee seda, ja põhjus on õpetlik.

Kloon kopeerib ka kõik, mis peab olema **unikaalne**: IP-aadressi, MAC-aadressi (võrgukaardi identifikaatorit), `machine-id` (süsteemi enda identifikaatorit) ja SSH hostivõtmeid (server tõendab nende abil hiljem oma identiteeti sinu SSH kliendile). Kui srv1 ja srv2 jagaksid neid, tekiksid võrgus konfliktid ja segadus, mille lahtiharutamine oleks palju keerulisem kui lihtsalt paigaldus uuesti läbi teha.

Sellepärast kordame srv2 jaoks täpselt [samu samme, mida srv1 jaoks juba tegime](./esimese-serveri-loomine) — **sõna otseses mõttes kõik**, alates uue VM-i loomisest kuni "Esimesed käsud" jaotise lõpuni: sama kaks võrgukaarti, Ubuntu Server nullist paigaldatud, sama pakettide komplekt (`curl nano openssh-server dnsutils tcpdump netcat-openbsd`) ja SSH teenuse sisselülitamine. Ainult nimi on läbivalt `srv2` (VM nimi, server name paigaldajas, hiljem ka IP `192.168.56.20`).

::: tip Miks samad paketid, kui serveritel tuleb erinev roll?
`curl`, `nano`, `dnsutils`, `tcpdump` ja `netcat-openbsd` pole seotud kummagi serveri tulevase rolliga — need on üldised diagnostikatööriistad, mida vajad iga serveri peal, olenemata sellest, mis teenus sellel lõpuks jookseb. Rolli-spetsiifilised paketid (Nginx, MySQL, Postfix/Dovecot) tulevad hiljem, teema kaupa, ainult sinna serverisse, kus neid päriselt vaja on.
:::

## Server kontrollitult sulgemine

Enne kui teeme snapshoti, sulgeme masina korrektselt — mitte VirtualBoxi aknast ristikesega, vaid käsurealt seest:

```bash
sudo shutdown -h now
```

`shutdown` alustab süsteemi korrektset sulgemist (kõik teenused saavad võimaluse end korralikult lõpetada, mitte lihtsalt "tapetud"). `-h` tähendab, et pärast sulgemist masin **peatub** (comparable väljalülitatud arvutiga), mitte ei taaskäivitu. `now` tähendab, et seda tehakse kohe, mitte hiljem kokkulepitud ajal.

VirtualBoxi aknas peaks masina olek nüüd näitama **Powered Off**.

## Snapshot — labori "salvestuspunkt"

**Snapshot** talletab kogu virtuaalmasina hetkeseisu — kõik, mis kettal ja mälus parasjagu on — nii, et saad hiljem sellesse hetke tagasi minna, kui midagi katki läheb.

Vali VirtualBoxis masin, ava **Snapshots → Take**, ja pane nimeks `01-puhas-ubuntu`. Kirjelduse väljale kirjuta kuupäev, kasutatud ISO nimi ja see, et paketid on värskelt uuendatud — tulevikus, kui snapshoteid koguneb rohkem, aitab see sul meelde tuletada, mis seisu igaüks kujutab.

::: tip Proovi kohe järele
Enne kui liigud edasi järgmisesse teemasse, tee väike test: käivita VM, loo terminalis üks tühine tekstifail (`touch test.txt`), sulge masin ja taasta snapshot `01-puhas-ubuntu`. Käivita masin uuesti ja kontrolli, et fail `test.txt` on kadunud. See tõestab, et snapshot päriselt "keeras aja tagasi" — mitte ainult teoorias.
:::

## Miks snapshot ei ole varukoopia

See on üks kõige olulisemaid asju, mida sellel kursusel õpid, ja seda küsitakse sinult veel korduvalt tagasi: **snapshot ei kaitse sind kettarikke eest**, sest snapshot elab **samal** virtuaalkettal kui masin ise. Kui see ketas riknab või kustub, kaob koos sellega ka iga snapshot, mis sellel asub.

Mõtle sellest nagu mängu salvestuspunktist samal mälukaardil — kui mälukaart läheb katki, ei aita ka kõige hoolikamalt tehtud salvestuspunktid enam midagi. Päris **varukoopia** peab alati asuma füüsiliselt mujal ja olema taastatav eraldi sihtkohta — sellest räägime pikemalt hilisemas teemas, kus teeme päris varunduse ja taastamise MySQL andmebaasile.

## Kokkuvõte

| Mõiste | Mida see teeb | Mida see EI tee |
| --- | --- | --- |
| Kloon | Loob VM-i täpse koopia, k.a unikaalsed identifikaatorid | Ei sobi meile: tekitaks IP/MAC/SSH-võtme konflikte |
| Snapshot | Talletab VM-i hetkeseisu samal kettal, kiire tagasipööramiseks | Ei kaitse ketta enda rikke eest — pole varukoopia |
| Varukoopia | Eraldi asukohas, eraldi taastatav | (Sellest lähemalt hilisemas teemas) |

## Suur pilt: kus me praegu oleme

Vaatame korraks tagasi meeskonna algsele palvele: "ehita meile koht, kus rakendus reaalselt töötaks." Praeguseks on sul olemas kaks tühja, aga töökorras "maja" — `srv1` ja `srv2`, mõlemad ajakohaste pakettidega, mõlemal SSH juba töös, ja mõlemast on olemas puhas taastepunkt, kui midagi peaks katki minema.

Ükski neist ei tee veel midagi kasulikku — seal ei jookse rakendust, andmebaasi ega meiliserverit. See on täpselt nagu ehitusel: enne sisustust ehitatakse tühi, aga kindel maja, kus on elekter ja vesi olemas. Praegu on meil "elekter ja vesi" täpselt sellised: masin käivitub, sa pääsed sinna ligi, ja kui midagi katki läheb, saad tagasi pöörduda.

Järgmine probleem, mille meeskond sulle annab: praegu pead iga käsu jaoks VirtualBoxi akna avama ja seal klõpsama — see ei mahu kokku pildiga, kus terve meeskond peab serverit kaugelt hooldama. Järgmine teema (Linux, failid, õigused ja kaughaldus) lahendab just selle: **kaugühendus** üle SSH, nii et keegi ei pea enam füüsiliselt VirtualBoxi akent nägema, et serverit hooldada — täpselt nii, nagu see pärismaailmas ka käib.

## Allikad

- [Oracle VirtualBox User Manual — Snapshots](https://docs.oracle.com/en/virtualization/virtualbox/7.2/user/snapshots.html)
