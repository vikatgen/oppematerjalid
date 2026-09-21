---
title: Teenuse tervis ja veaotsing
description: Mida levinud HTTP veakoodid tegelikult ütlevad, kuidas rakenduse ja Nginxi logisid koos lugeda, ning juhitud rike 502 vea nägemiseks omal käel.
outline: deep
---

# Teenuse tervis ja veaotsing

::: info Õpiväljund
Pärast seda osa oskad levinud HTTP veakoodide (403, 404, 502, 504) järgi otsustada, kummast kihist viga otsida, tead, mida rakenduse logisse **mitte** kirjutada, ning oled ise näinud ja parandanud 502 vea.
:::

## Meeskonna kaheteistkümnes küsimus sinule

Praegu töötab kõik nii, nagu peab — aga meeskond küsib ausalt: "mis juhtub siis, kui midagi **ei** tööta?" Enne kui saad öelda "jah, teenus on valmis", pead nägema, kuidas see katki läheb, ja oskama seda ka parandada.

## Levinud HTTP veakoodid — vihje, mitte lõplik diagnoos

| Kood | Tähendus | Kumb kiht tavaliselt süüdi |
| --- | --- | --- |
| 403 | ligipääs keelatud | Nginxi failiõigused või seadistus |
| 404 | ressurssi ei leitud | vale tee, puuduv fail, vale `root`/`location` |
| 502 | proksi ei saanud sobivat tagateenuse vastust | Nginx on üleval, aga **rakendus** ei vasta |
| 504 | tagateenuse vastus aegus | rakendus vastab, aga liiga aeglaselt |

::: tip Miks 502 ei tähenda "server on maas"
Vastupidi: 502 tõendab, et Nginx ise **töötab** ja üritas ausalt rakenduseni jõuda, aga ei saanud sealt sobivat vastust. Sama loogika kehtis juba [Pordid, localhost ja oma DNS](./pordid-localhost-ja-oma-dns) osas "connection refused" kohta — veakood ütleb, kus rada katkes, mitte alati, miks.
:::

## Kaks logi, üks lugu

Nginxi ja rakenduse logid täiendavad teineteist — vastuvõtt ja köök peavad kumbki oma päevikut. Kasuta juba tuttavat käsku [Protsessid, teenused ja logid](./protsessid-teenused-ja-logid) osast:

```bash
journalctl -u labapp -n 30 --no-pager
```

Nginxi enda vealogi asub tavaliselt failis `/var/log/nginx/error.log` — kontrolli seda `tail`-iga, kui `journalctl` rakenduse logi ei selgita.

::: warning Saladused ei kuulu logisse
Kui rakendus hiljem hakkab autentimist tegema, ära logi kunagi paroole ega tokeneid — isegi mitte vea korral. Päringu aeg või identifikaator piisab logide sidumiseks, ilma et peaksid sisu ennast logima.
:::

## Käed külge: juhitud rike

**Käsud jooksevad srv1 peal**, kontroll srv2 pealt. Ära muuda samal ajal Nginxi seadistust — tahame näha täpselt **ühe** rikke mõju.

```bash
sudo systemctl stop labapp
```

Peatab rakenduse tahtlikult.

Kontrolli srv2 pealt:

```bash
curl -i http://app.lab.test/api/health
```

Oodatav tulemus: `HTTP/1.1 502 Bad Gateway`. See on täpselt eelmises tabelis kirjeldatud olukord — Nginx elab, rakendus mitte.

Uuri, mida logi ütleb:

```bash
journalctl -u labapp -n 10 --no-pager
```

Peaks näitama, et teenus on peatatud (`stop` käsu tõttu, mitte krahhi tõttu) — oluline erinevus, kui uurid päriselt juhtunud riket hiljem tagantjärele.

Taasta teenus:

```bash
sudo systemctl start labapp
```

Kontrolli uuesti:

```bash
curl -i http://app.lab.test/api/health
```

Oodatav tulemus: taas `HTTP/1.1 200 OK`.

## Käivitumise kontroll — mitte ainult "praegu töötab"

::: warning Ära usalda ainult avatud terminaliakent
Kui rakendus töötab praegu, sest sina ise käivitasid selle käsitsi terminalis ja see aken on veel lahti, ei tõenda see, et teenus käivitub **iseenesest** pärast serveri taaskäivitust. Point sellest, et lisasime `labapp` süsteemi **teenusena** (mitte lihtsalt käsitsi käivitatud protsessina), oli just see — testi seda päriselt.
:::

1. Sulge SSH aken (või vähemalt ära jäta rakendust käsitsi terminalis käima lootma).
2. Kontrolli brauserist või `curl`-iga, et `/api/health` ikka vastab.
3. Taaskäivita srv1 (`sudo reboot`) ja oota — [Esimese serveri loomine](./esimese-serveri-loomine) osast tuttav ooteaeg kehtib ikka.
4. Pärast taaskäivitust kontrolli uuesti nii `systemctl status labapp` kui `curl http://app.lab.test/api/health` — mõlemad peavad töötama **ilma**, et sa midagi käsitsi uuesti käivitaksid.

## Esitatav tõend

Meeskonnale (ja endale) kinnituseks jäta alles:

- Staatilise lehe õnnestunud päring.
- API 200-vastus (nii `127.0.0.1:3000` otse kui `app.lab.test/api/` kaudu).
- Teenuse olek pärast taaskäivitust (`systemctl status labapp`).
- 502 rikke ja parandamise lühike päevik — mida nägid, mida kontrollisid, mis lahendas.

## Suur pilt: kus me praegu oleme

Meeskonna algne palve — "koht, kus rakendus reaalselt töötaks" — on nüüd täidetud esimest korda päriselt: `app.lab.test` vastab brauserile, ja selle taga on nii staatiline sisu kui ka päris rakendusprotsess, mis taastub iseseisvalt ka taaskäivituse järel. Sa oskad ka juba eristada, kummas kihis (Nginx, proksi või rakendus) viga tegelikult asub, mitte ainult, et "midagi ei tööta".

Praegu on kõik andmed, mida rakendus vajaks, ainult programmikoodi sees — päriselus vajab enamik rakendusi ka **andmebaasi**, kuhu andmed püsivalt salvestada. Järgmine teema toobki meeskonna järgmise palve: andmebaasiserveri, mida saab hallata nii käsurealt kui graafiliselt.

## Kokkuvõte

| Kood/käsk | Tähendus |
| --- | --- |
| 403 / 404 | tavaliselt Nginxi kihi probleem |
| 502 | Nginx elab, tagateenus mitte |
| 504 | tagateenus vastab, aga liiga aeglaselt |
| `journalctl -u labapp` | rakenduse enda lugu |
| `/var/log/nginx/error.log` | Nginxi enda lugu |
| Taaskäivituse test | ainus tõestus, et teenus ei sõltu avatud terminalist |

## Allikad

- [Nginx — HTTP status codes ja proxy vead](https://nginx.org/en/docs/http/ngx_http_proxy_module.html)
- [systemd — journalctl manual](https://www.freedesktop.org/software/systemd/man/latest/journalctl.html)
