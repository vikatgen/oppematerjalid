# Kohtumine 6: DHCP — õpetaja juhend

## Eesmärk ja ettevalmistus

Õppija viib kahe toimiva LAN-i kliendid DHCP-le ja tõendab õige seadistuse saamist. Õppija juhend: `docs/arvutivorgud/kohtumine-06-dhcp.md`.

Kontrolli enne tundi kasutatava Packet Traceri versiooni ja ruuterimudeliga allolev läbimäng. Õpetaja valmis võrgufaili ei kasutata. Kui eelmine töö jäi pooleli, lõpetab õppija selle oma salvestuses eelmise tunni juhendi abil. Kasuta eelmise tunni liidesenimesid. Cisco dokumentatsioon kinnitab IOS-i põhimõtteid, kuid ei tõenda simulaatori kõigi käskude tuge.

Klassis võib olla kaks lähteolukorda:

- Hoidla juhendi Henri `.21`, Kadri `.22` ja Mirjam `.21` oma LAN-is: staatilised kliendid on tulevases DHCP vahemikus.
- Jagatud vestluses kirjeldatud kaks klienti, kumbki oma LAN-is `.10`: aadressid on välistatavas alas, kuid Staff `.10` tuleb tulevasele serverile vabastada.

Õppija põhitee viib enne poolide loomist kõik olemasolevad arvutid DHCP-le. Esialgne aadressita olek on teadlik vaheetapp. Kui näitad võrdluseks staatilist klienti, kasuta välistatud aadressi ja vii ka see tunni lõpuks DHCP-le. Ära jäta staatilist klienti jagatavasse vahemikku ega Staff `.10` serveri jaoks hõivatuks.

## 90 minuti ajakava

| Aeg | Tegevus |
| --- | --- |
| 0–15 min | Kontrolli algfaili, tegelikke IP-sid, liideseid ja võrkudevahelist ühenduvust. Vajadusel lõpeta eelmine töö. |
| 15–25 min | IP-aadressi joonis, neli kliendiparameetrit, aadressivahemike joonis ja ennustused. |
| 25–45 min | Kõigi klientide üleminek, välistused, Gaming pool ja esimene toimiv kliendikontroll. |
| 45–60 min | Staff iseseisvalt, kummassegi LAN-i uus klient ning kontrolltabel ja rendid. |
| 60–70 min | Ühe uue kliendi DORA vaatlus. |
| 70–83 min | Vale lüüsi katse, seadistuse uuendamine, põhjendus ja taastamise kontroll. |
| 83–90 min | Individuaalne selgitus, tõendid, salvestamine ja taasavamine. |

Kui aeg napib, lühenda detailset DORA vaatlust. Säilita kliendikontrollid ja vea taastamine. Kiiremale õppijale sobib esialgse aadressihanke ja uuenduse võrdlus.

## Näidisseadistus kontrollimiseks

Õppija ei pea kopeerima terviklahendust. Kasuta seda tunnis eksinud seadistuse võrdlemiseks. Õpetajal pole vaja selle põhjal võrgufaili ette valmistada. Eeldus: õppija on eelmises töös ruuteri liidesed ja marsruutimise ise tööle pannud.

```text
enable
configure terminal
ip dhcp excluded-address 192.168.10.1 192.168.10.20
ip dhcp excluded-address 192.168.10.201 192.168.10.254
ip dhcp excluded-address 192.168.20.1 192.168.20.20
ip dhcp excluded-address 192.168.20.201 192.168.20.254
ip dhcp pool GAMING
network 192.168.10.0 255.255.255.0
default-router 192.168.10.1
dns-server 192.168.20.10
exit
ip dhcp pool STAFF
network 192.168.20.0 255.255.255.0
default-router 192.168.20.1
dns-server 192.168.20.10
exit
end
copy running-config startup-config
```

## Küsimused ja tüüpilised väärarusaamad

- „Mõlemal on sama mask, kas nad on samas võrgus?” Lase võrrelda IP-de võrguosi; `/24` korral `192.168.10` ja `192.168.20` erinevad.
- „Miks pool ei alga `.21` aadressiga?” `network` määrab alamvõrgu. Välistused piiravad jagatavat hulka. `.21–.200` sisaldab 180 aadressi.
- „Kas pooli nimi ütleb, millise kommutaatori kliente teenindada?” Nimi on haldaja silt; otse ühendatud kliendi puhul valitakse alamvõrk päringu vastuvõtnud ruuteriliidese järgi.
- „Kas ruuteri aadress muutus?” Pooli `default-router` edastab kliendi parameetri. Liidese aadress jääb samaks.
- „DNS ei vasta, kas DHCP on katki?” DNS-aadress võib olla õige ka enne DNS-teenuse olemasolu. Praegu ei hinnata nimelahendust.
- „Muutsin lüüsi, aga kõik töötab.” Lase kontrollida kliendi tegelikku väärtust ja küsida seadistus uuesti. Ära selgita vaatlust enne, kui muudetud parameeter on kliendis nähtav.
- „Kohe peab saama `.21`.” Ära hinda aadresside väljastamise järjekorda; hinda vahemikku, alamvõrku ja kordumatust.

Raskustes õppijale näita esmalt, kust leida hetkeväärtus ja oodatud väärtus. Siis suuna vastavat seadistust otsima. Ära kirjuta tema eest kogu Staff konfiguratsiooni. Paaristöö korral küsi kummaltki eraldi põhjendust.

Jooniste info on kirjas ka kõrvaltekstis ja tabelites; ära nõua vastamist üksnes värvi järgi. Kitsal ekraanil on aadressivahemikud üksteise all. DORA joonise alternatiiv on sõnumite sõnaline läbimine.

## Hindamine

Arvestatud töö tõendab kõiki järgmisi osi: kliendid on õiges vahemikus ja õigete parameetritega; rendid on serveris leitavad; mõlemad LAN-id suhtlevad; staatilisi kliente ei jää jagatavasse vahemikku; Staff `.10` on vaba; veakatse ja taastamine on dokumenteeritud.

Küsi individuaalselt: „Kuidas tead, et selle kliendi aadress tuli DHCP-st?”, „Miks serveri `.10` välistasime?” ja „Miks sama LAN vale lüüsiga veel töötab?”. Hea põhjendus seob kliendi väärtused serveri rendiga, staatilise aadressi välistamise konfliktiennetusega ning lüüsi eri alamvõrkude vahelise liiklusega.

## Praktilise läbimängu kontrollnimekiri

Need on nõutavad käsitsi kontrollid, mitte väide, et need on juba tehtud.

- [ ] Märgitud Packet Traceri versioon ja ruuterimudel: __________.
- [ ] Mõlemad lähteolukorrad kontrollitud; enne poolide loomist eemaldatud staatilised kliendiaadressid.
- [ ] Kõik neli välistust ja kaks pooli käsureal toetatud; väljundid kontrollitud.
- [ ] Iga olemasolev ja uus klient saab õige IP, maski, lüüsi ning DNS-aadressi.
- [ ] Kliendid seostatud `show ip dhcp binding` väljundiga; sama ja eri LAN-i pingid töötavad.
- [ ] Uue kliendi DORA vahetus on Simulation režiimis leitav; rendiuuendust ei peeta tingimata uueks DORA vahetuseks.
- [ ] `no default-router` ja uus lüüs rakenduvad; kliendi uuendatud lüüs on `.254`; sama LAN töötab, teise LAN-i katse ebaõnnestub.
- [ ] Õige lüüs taastatud serveril ja kõigil katse käigus vale väärtuse saanud klientidel; ühenduvus taastub.
- [ ] Ruuteri seadistus ja fail salvestatud; taasavamisel poolid olemas ning kliendid saavad õiged väärtused.
