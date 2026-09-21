---
title: Teenuse teisaldamine ja sõltumatu koopia
description: Kuidas teisaldada terve veebiteenus srv1-st srv2-sse ilma katkestuseta enne testi, lülitada DNS ümber, ning miks samas hostis olev teine VM ei ole päris 3-2-1 varukoopia.
outline: deep
---

# Teenuse teisaldamine ja sõltumatu koopia

::: info Õpiväljund
Pärast seda osa oskad selgitada teenuse migreerimise õiget järjekorda (valmista ette → testi → alles siis lülita), oled teisaldanud veebiteenuse srv1-st srv2-sse, ning oskad selgitada, miks 3-2-1 põhimõte nõuab rohkemat kui teist VM-i samal kettal.
:::

## Meeskonna kahekümne kuues küsimus sinule

Andmebaasi taastamine on tõendatud kahel viisil. Meeskonna viimane, kõige suurem küsimus: "kas me oskaksime kogu veebiteenuse teise masinasse üle tõsta, kui srv1-ga peaks midagi juhtuma?" See on selle teema kõige mahukam harjutus — mõõda ka enda katkestusaega, see ongi sinu isiklik RTO andmepunkt.

## 3-2-1 põhimõte — miks teine VM samal kettal ei piisa

**Hoia mitu koopiat**, ja vähenda sõltuvust **ühest** kandjast või rikkekohast. Vähemalt **üks** koopia peab jääma **eraldi asukohta**.

::: warning srv2 samal hostil ei ole sõltumatu varukoopia
Kolm võtit samas kadunud kotis ei aita midagi. srv1 ja srv2 **samal füüsilisel hostil** jagavad sama füüsilist rikkekohta (kettarike, hosti riistvararike, kogemata kustutamine) — see harjutus aitab **taastamisprotsessi harjutada**, aga ei kaitse hosti enda kadumise eest. Selle teema lõpus ("Käed külge: sõltumatu koopia") lisame tegeliku eraldi asukoha.
:::

## Teenuse migreerimine — järjekord on tähtis

1. **Valmista ette** uus server.
2. **Taasta** failid ja andmed.
3. **Testi** enne nime ümberlülitamist.
4. **Säilita** tagasipöördumise võimalus.

::: tip Miks DNS-i ei vaheta esimese sammuna
Kolimise ajal peab **uus köök** enne klientide tulekut juba töötama. DNS-i vahetus ei paigalda teenuseid ega liiguta andmeid ise — see ainult suunab kliendid uude kohta. Kui vahetad DNS-i enne, kui uus keskkond on valmis ja testitud, suunad kliendid katkise teenuse juurde.
:::

Selle harjutuse eesmärk on **läbi teha täielik teisaldus koos mõõdetud katkestusega** — algne srv1 jääb kogu aeg alles tagasipöördumise võimalusena. Koopia sisaldab õppemaki koodi, staatilisi faile ja systemd kirjeldust; **privaatvõtmeid ega pärisandmeid arhiivi ei lisata**. Rakenduse enda DB-ühenduse migreerimine pole selle maki osa (meie näidisrakendus MySQL-i ei kasuta).

## Käed külge: veebiteenuse arhiveerimine

**Kus: srv1.** Mõõda praegusest hetkest oma katkestusaega.

```bash
sudo tar -czf /home/oppur/backup/lab-web.tar.gz -C / var/www/lab srv/labapp/app.py etc/systemd/system/labapp.service
```

`tar` pakib failid ühte arhiivi, `-c` loob uue arhiivi, `-z` tihendab gzip-iga, `-f` määrab väljundfaili. `-C /` valib juurkausta, ja sellele järgnevad **suhtelised** teed (`var/www/lab`, `srv/labapp/app.py`, `etc/systemd/system/labapp.service`) määravad täpselt, mis arhiivi läheb — ainult need kolm asja, mitte kogu server.

```bash
sudo chown oppur:oppur ~/backup/lab-web.tar.gz
```

Määrab arhiivi omanikuks tavakasutaja, sest hosti `scp` ühendub `oppur` kontoga ja peab saama faili lugeda.

**Hosti terminalist**, samamoodi nagu [Taastamine teise serverisse](./taastamine-teise-serverisse) osas:

```bash
scp -i ~/.ssh/koolilabor oppur@192.168.56.10:backup/lab-web.tar.gz ./lab-web.tar.gz
scp -i ~/.ssh/koolilabor ./lab-web.tar.gz oppur@192.168.56.20:lab-web.tar.gz
```

Sama kaheastmeline muster: srv1 → host → srv2.

## Käed külge: taastamine srv2 peale

**Kõik käsud srv2 peal.**

```bash
sudo apt install nginx python3
sudo useradd --system --create-home --home-dir /srv/labapp --shell /usr/sbin/nologin labapp
```

Sama paigaldus- ja kasutajaloomiskäsk, mis [Nginx ja staatiline sait](./nginx-ja-staatiline-sait) ja [Rakendus ja pöördproksi](./rakendus-ja-poordproksi) osadest tuttavad — **failiarhiiv ei paigalda programme ega loo süsteemikasutajaid ise**, need tuleb teha eraldi. Kui `labapp` kasutaja on juba varasema katse käigus loodud, ära loo teist korda.

```bash
tar -tzf ~/lab-web.tar.gz
```

`-t` **loetleb** arhiivi sisu ilma lahti pakkimata, `-z` avab gzip-i. **Kontrolli enne root-õigustes lahtipakkimist**, et arhiiv sisaldab täpselt eespool loetletud kolme asja — mitte ootamatuid süsteemifaile.

```bash
sudo tar --no-same-owner -xzf /home/oppur/lab-web.tar.gz -C /
```

`-x` pakib lahti, `-C /` määrab sihtkoha (samad suhtelised teed taastuvad õigetesse absoluutsetesse asukohtadesse). `--no-same-owner` väldib lähtehosti numbriliste kasutaja-ID-de otsest ülekandmist — root-õigustes käivitamisel saavad failid root-omandi, mis on siin piisav, kuna teenuse enda kasutaja (`labapp`) vajab ainult **lugemisõigust**, mitte kirjutamist.

Korda [Rakendus ja pöördproksi](./rakendus-ja-poordproksi) osa `daemon-reload` ja `enable --now labapp` käske. Loo Nginxi `lab` fail [HTTPS ja TLS](./https-ja-tls) osa **täieliku HTTPS serveriploki** järgi, sama `app.lab.test` nimega — sealhulgas loo srv2-le **uus** `app.lab.test` sertifikaat sama OpenSSL käsuga.

::: warning See ei kirjuta üle meilisertifikaati
srv2-l on juba `mail-lab.crt`/`mail-lab.key` (`mail.lab.test` jaoks, [Meiliserveri põhitõed ja postkastid](./meiliserveri-pohitoed-ja-postkastid) osast). Uus `lab.crt`/`lab.key` (`app.lab.test` jaoks) on **eraldi failipaar** — kaks eri nime, kaks eri sertifikaati, ei sega teineteist.
:::

Loo `sites-enabled` link [Nginx ja staatiline sait](./nginx-ja-staatiline-sait) käsuga, tee `nginx -t` ja `reload`.

Lisa srv2 tulemüürile **samad** laborivõrgu 80- ja 443-reeglid, mis [Tulemüür ja UFW](./tulemuur-ja-ufw) osas srv1-le tegime:

```bash
sudo ufw allow from 192.168.56.0/24 to any port 80 proto tcp
sudo ufw allow from 192.168.56.0/24 to any port 443 proto tcp
```

::: tip srv2 tulemüür on juba töökorras — see ainult lisab reegli
[srv2 tulemüür ja avatud edastus](./srv2-tulemuur-ja-avatud-edastus) osas seadsime srv2-le juba oma UFW poliitika (22/587/993/25). `ufw allow` **lisab** uue reegli olemasolevale poliitikale — see ei nulli ega taaskäivita midagi, olemasolevad reeglid (sh port 25 ainult srv1-lt) jäävad kehtima muutumatult.
:::

## Käed külge: testi enne DNS-i vahetust

**Kus: srv2.** See kontrollib **kohalikku** koopiat ja tema **uut** sertifikaati, ilma DNS-i puudutamata.

```bash
curl --cacert /etc/ssl/certs/lab.crt --resolve app.lab.test:443:127.0.0.1 https://app.lab.test/api/health
```

Sama `--resolve` muster, mis [HTTPS ja TLS](./https-ja-tls) osast — seob nime **selle ühe katse jaoks** uue serveri loopbackiga. Oodatav tulemus: sama API JSON vastus, mis srv1-l. **Uus teenus peab töötama enne**, kui ükski kasutaja tegelikult sinnapoole suunatakse.

## Käed külge: DNS-i ümberlülitus

**Kus: srv1.** Muuda `dnsmasq` failis **ainult** `app.lab.test` host-record aadressiks `.20` — jäta `srv1.lab.test` (`.10`) ja `mail.lab.test` (`.20`, juba nii) puutumata.

```bash
sudo dnsmasq --test
sudo systemctl restart dnsmasq
```

Sama kontrolli-ja-rakenda muster, mis [Pordid, localhost ja oma DNS](./pordid-localhost-ja-oma-dns) osast.

Hosti `/etc/hosts` failis tõsta **ainult** `app.lab.test` rida `.20` peale, `srv1.lab.test` jääb `.10`.

Kontrolli `dig @` päringuga, et uus A-kirje kehtib. Hosti brauser näeb nüüd **uue** serveri sertifikaati — selle identiteet tuleb kliendis uuesti kontrollida, samamoodi nagu [HTTPS ja TLS](./https-ja-tls) osas esimest korda.

## Käed külge: tagasipöördumise proov

Taasta DNS-i ja `/etc/hosts` faili `app.lab.test` väärtus tagasi `.10`-ks ja kontrolli, et **vana** teenus (srv1) töötab endiselt. See ongi "säilita tagasipöördumise võimalus" samm konkreetselt läbi tehtud, mitte ainult lubatud.

::: warning Vana koopia jääb alles
Vana koopia (srv1 teenus) eemaldatakse alles **pärast** kokkulepitud kontrolli, mitte selle labori käigus. Lõppprojektis võib valida, kumb server jääb aktiivseks — aga see valik ja selle põhjus peavad kajastuma dokumentatsioonis ja testides.
:::

## Käed külge: sõltumatu koopia

Kopeeri hosti `backup` kaust kooli **lubatud eraldi** varundussihti (nt õpetaja määratud failiserveri isiklikku piiratud kausta) — see siht tuleb enne tundi õpetajal täpsustada. Kirjuta siht ja ligipääs tööpäevikusse **ilma saladusteta**. Laadi sealt üks koopia tagasi ja võrdle räsi — see on tegelik 3-2-1 "eraldi asukoht" samm, mida teine VM samal kettal ei täida.

## Esitatav tõend

Meeskonnale kinnituseks jäta alles:

- Algse ja taastatud `notes` tabeli võrdlus, koos räside võrdlusega.
- GUI backup/restore edu ([eelmisest osast](./gui-varundus-dbeaveriga)).
- Uue veebiserveri (srv2) test enne ja pärast DNS-vahetust.
- Oma mõõdetud RPO/RTO hinnang.
- Selgesõnaline märge, et kontod, sertifikaadid ja sõltuvused seadistati **uuesti** (taastamisprotokoll ei jäta seda vaikimisi märkimata) — üks õnnestunud tabeliimport ei tõenda kogu teenuse taastamist.

## Suur pilt: kus me praegu oleme

Meeskonna kõige ebamugavam küsimus ("kui srv1 täna hommikul kaoks?") on nüüd vastatud päriselt: sul on tõendatud CLI ja GUI andmebaasi varukoopia, tõendatud täielik veebiteenuse teisaldus koos mõõdetud katkestusega, ja üks koopia väljaspool seda hosti. Sa tead ka ausalt, mida see **ei** kata — nt privaatvõtmeid ja pärisandmeid arhiividesse teadlikult ei lisatud, need vajavad iga kord uuesti seadistamist.

Kõik senine on keskendunud sellele, mis juhtub, kui midagi **katki läheb**. Järgmine teema küsib ennetavama küsimuse: kuidas me üldse **teada saame**, kui midagi on valesti, enne kui keegi kaebab?

## Kokkuvõte

| Mõiste / käsk | Tähendus |
| --- | --- |
| 3-2-1 | mitu koopiat, mitu kandjat, vähemalt üks eraldi asukohas |
| Valmista → taasta → testi → lülita | õige migreerimisjärjekord, DNS viimasena |
| `tar -tzf` enne `-xzf` | kontrolli sisu enne root-õigustes lahtipakkimist |
| `--no-same-owner` | väldib lähtehosti UID-de otsest ülekannet |
| Test enne DNS-vahetust (`--resolve`) | uus teenus peab töötama enne kasutajate suunamist |
| Tagasipöördumise proov | "säilita tagasitee" läbi tehtud, mitte ainult lubatud |

## Allikad

- [GNU tar manual](https://www.gnu.org/software/tar/manual/tar.html)
- [MySQL — mysqldump Reference](https://dev.mysql.com/doc/refman/8.0/en/mysqldump.html)
