# Kohtumine 10: külalisvõrgu piirang — õpetaja juhend

## Õppija töö ulatus

Sihtrühm on esimese aasta tarkvaraarenduse õpilased, kes pole veel programmeerimise algkursust läbinud. Tunni eesmärk on juhendatud piirangu rakendamine ja tulemuse põhjendamine. Reeglite iseseisvat kirjutamist, pöördmaski arvutamist, VTY-liinide seadistamist ega koormusarvutust ei hinnata.

Õppija leht jääb senisele aadressile `docs/arvutivorgud/kohtumine-10-guest-eraldamine-ja-koormus.md`, et varasemad lingid toimiksid. Koormusarvutus asub eraldi valikulisel lehel `docs/arvutivorgud/lisaharjutus-vorgukoormus.md` ega ole ka kohtumise 11 kohustus.

## Enne tundi

Õppija avab oma töös 9A ehitatud `09a-external.pkt` faili; õpetaja valmisfaili pole vaja. Täiendavad välisvõrgu eeldused on juhendis `arvutivorgud-07-11-jargnevus.md`. Siin pole kaasa antud kontrollitud `.pkt` faili ning allolev kontrollnimekiri vajab sinu Packet Traceri mudeliga läbimängimist.

1. Gaming ja Staff kliendid kasutavad DHCP-d, oma LAN-i `.21–.200` vahemikku ning sisemist DNS-i `192.168.20.10`. Server on staatilisel `.10` aadressil.
2. Guest klient saab `192.168.30.21–.200/24`, lüüsi `192.168.30.1` ja DNS-i `203.0.113.10`. Töö 9A edasi-/tagasimarsruudid toimivad ja `valis.test` avaneb nime ning IP kaudu. NAT/PAT-i ei kasutata.
3. Määra Guest liidese tegelik nimi. Kui see pole `GigabitEthernet0/2`, anna õpilastele selle mudeli jaoks kohandatud rakendamisplokk.
4. Kontrolli, et lähtefailis pole juba kasutusel vana `GUEST-IN` loendit. Olemasoleva loendi avamine lisab või säilitab ridu, mitte ei asenda kogu loendit. Alustage õppija enda salvestatud töö 9A failist, kus piirangut pole veel lisatud. Ära lase õpilasel tundmatut vana loendit kustutada.
5. Rakendage tunnis õpetaja juhendamisel ruuteri ja pääsupunkti halduspiirangud alloleva kirjelduse järgi õppija enda failis. Õppijale näita tavakeelset otsust „külaline ei halda võrku”. See kaitse pole ainult Guest-aadressi keelav ACL-rida.

## Ruuteri halduse ettevalmistus

Kasuta laboriparooli. Ruuteri haldaja režiimi jaoks määra `enable secret` ja kontrolli kohaliku CLI kaudu `disable` → `enable` parooliküsimust. Õppija valib ja sisestab õpetaja juhendamisel laboriparooli; õpilane ei pea parooliräsi uurima ega protokolli kopeerima.

Sulge mittevajalikud võrgu kaudu sisselogimised kõigil mudeli VTY-liinidel. Näide mudelile, millel on liinid 0–4:

```text
configure terminal
line vty 0 4
transport input none
end
```

Kui mudelil on lisaks liinid 5–15, korda nende jaoks. Kontrolli `show running-config` väljundist kõiki VTY-vahemikke. Kui mudelis on veebihaldus kasutusel, keela toetatud käsudega ka HTTP/HTTPS-haldusteenused (IOS-is `no ip http server` ja `no ip http secure-server`). Kui mudel neid käske ega teenuseid ei toeta, märgi see piiranguks; VTY sulgemine üksi ei tõenda veebihalduse puudumist.

Pääsupunkti haldus asub Guest kliendiga samas LAN-is ja seda liiklust ruuteri ACL ei näe. Keela pääsupunkti kaughaldus või vali koos õppijaga selleks sobiv mudel. Kui seda pole simulaatoris võimalik tõendada, dokumenteeri piirang ja ära esita seda kontrollitud kaitsena.

## Täielik ligipääsureeglistik

Järgmine plokk eeldab puhast `GUEST-IN` loendit ja näidisliidest `GigabitEthernet0/2`. See on sama reeglistik, mida õppija juhendatult rakendab:

```text
enable
configure terminal
ip access-list extended GUEST-IN
permit udp any eq 68 any eq 67
deny ip 192.168.30.0 0.0.0.255 192.168.10.0 0.0.0.255
deny ip 192.168.30.0 0.0.0.255 192.168.20.0 0.0.0.255
deny ip any host 192.168.30.1
permit ip 192.168.30.0 0.0.0.255 any
exit
interface GigabitEthernet0/2
ip access-group GUEST-IN in
end
```

Serverilt kliendile tulev DHCP vastus liigub Guest liidesest välja; see pole siin rakendatava siseneva filtri suund. Kliendi DHCP erand asub enne Guest ruuteriaadressi keeldu, et lubada ka sellele aadressile saadetavad rendiuuendused. Esialgne `0.0.0.0` → `255.255.255.255` päring ja hilisem unicast-päring ei pruugi sobida samade keeldudega. Ära kasuta õpetusnäidet, mis lubab, et DHCP rea lõppu tõstmine katkestab alati esialgse aadressihanke.

Nimetatud loend on viis reeglit. `extended` on loendi tüüp, mitte loendi pikendamise tegevus. Õppija põhitekstis on numbrilised pordid; IOS võib kuvada 68 asemel `bootpc` ja 67 asemel `bootps`.

## 90 minuti läbiviimine

| Aeg | Tegevus |
| --- | --- |
| 0–10 min | Lähtefail ja probleemi näitamine |
| 10–25 min | Tavakeelsed otsused, teekondade joonis ja ennustus |
| 25–40 min | Ühe reegli näide ja DHCP rea ühine lahtilugemine |
| 40–55 min | Valmis loendi rakendamine; õpilane tuvastab seadme ja liidese |
| 55–75 min | Neli enne/pärast kontrolli paarides; rollid vahetuvad |
| 75–85 min | Individuaalne põhjendus ja vajadusel parandus |
| 85–90 min | Ruuteri seadistuse ja `.pkt` faili salvestamine |

## Hindamine ja abi

Arvestatud tööks on neli tegelike tulemustega enne/pärast kontrolli, toimiv fail ja põhjendus: „Oskar ei saa Staff lehte avada, aga Mirjam saab sama serveri samal IP-l avada; seega server töötab ja piirang puudutab külalist.” Lisaks peab Oskari DHCP ja väline leht töötama.

Kopeerimine on lubatud. Küsi enne rakendamist „Millist seadet ja ühendust muudame?” ning pärast „Mis muutus ja mis peab edasi töötama?”. Süntaksiviga võib õpetaja aidata parandada; tulemust peab õppija ise kontrollima ja selgitama.

Kui õpilane takerdub, piira järgmine tegevus ühe nähtava sammuga: leia brauser, ava üks aadress või vaata üks DHCP-parameeter. Kiiremale õppijale sobib lisakontroll Gaming sihtaadressiga; iseseisev ACL-i muutmine pole põhiosa.

## Õpetaja täielik kontrollnimekiri

Allolev loend pole märge juba tehtud praktiliste katsete kohta.

- [ ] Packet Traceri versioon, ruuterimudel ja Guest liides üles märgitud.
- [ ] Enne piirangut töötavad kõik neli õppija kontrolli; Oskar pääseb ka Staff serveri lehele.
- [ ] Õige loend ja järjekord on nähtav käsuga `show access-lists`; `show ip interface` näitab Guest liidesel sisenevat `GUEST-IN` loendit.
- [ ] Oskar küsib DHCP-seadistuse uuesti, neli parameetrit on õiged ja serveri renditabelis leidub vastav aadress.
- [ ] Guest väline leht töötab IP ning nime kaudu ja Guest DNS on endiselt väline.
- [ ] Sama Staff HTTP töötab Gaming ja Staff kliendist, kuid ei tööta Guestist.
- [ ] Gaming kliendi tegelik DHCP-aadress vastab sama LAN-i kliendilt, kuid mitte Guestist. Ära eelda kindlat `.21` aadressi.
- [ ] Ruuteri Guest IP ping on filtri järel blokeeritud; seda ei kasutata DHCP või välise HTTP rikke tõendina.
- [ ] Ruuteri mittevajalik kaughaldus on suletud kõigil liinidel ja võimalikel haldusteenustel; testitud aadressid ja protokollid on kirjas. Väljalülitatud teenuse vastuse puudumist ei omistata üksnes ACL-ile.
- [ ] Pääsupunkti halduse kaitse või simulaatori piirangud on eraldi kirjas.
- [ ] `copy running-config startup-config` tehtud, fail `10-isolated.pkt` salvestatud ja taasavamisel kontrollid korratud.

## Tehnilised allikad

- [Cisco IOS-i nimetatud ACL-id](https://www.cisco.com/c/en/us/td/docs/routers/ios/config/17-x/sec-vpn/b-security-vpn/m_sec-acl-named.html) — esimese sobiva reegli ning loendi rakendamise põhimõtted.
- [Cisco IOS-i turvaseadistuse juhend](https://www.cisco.com/c/en/us/support/docs/ip/access-lists/13608-21.html) — haldusjuurdepääsu piiramine.
