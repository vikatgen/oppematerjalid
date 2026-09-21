---
title: Rakendus ja pöördproksi
description: Kuidas käivitada oma rakendus systemd teenusena piiratud kasutaja all, ning kuidas Nginx seda pöördproksina tagant teenindab.
outline: deep
---

# Rakendus ja pöördproksi

::: info Õpiväljund
Pärast seda osa oskad selgitada, miks rakendus kuulab ainult loopbackil, miks tal on oma piiratud kasutaja, ning oled pannud rakenduse systemd teenusena tööle ja ühendanud selle Nginxiga pöördproksi kaudu.
:::

## Meeskonna üheteistkümnes küsimus sinule

Staatiline leht töötab, aga meeskonna rakendus pole staatiline fail — see on programm, mis peab reaalajas midagi arvutama ja vastama. Nüüd lisame köögi vastuvõtutöötaja (Nginxi) taha.

## Tagateenus loopbackil

Rakendus kuulab ainult `127.0.0.1` aadressil — mitte serveri avalikul aadressil. Nii nagu restorani köök ei võta tellimusi otse tänavalt vastu, ei pea ka rakendus olema otse võrgust ligipääsetav: klient pöördub alati Nginxi poole, ja **ainult Nginx** pöördub omakorda rakenduse poole samas masinas.

::: tip Mälupilt
[Pordid, localhost ja oma DNS](./pordid-localhost-ja-oma-dns) osas oli juba jutuks, et `127.0.0.1` tähendab "see sama masin, kus ma parasjagu töötan" — iga masina jaoks eraldi. See on täpselt see, mida siin ära kasutame: srv2 ei saagi kunagi otse srv1 rakendust `127.0.0.1:3000` kaudu avada, ainult srv1 ise saab.
:::

See vähendab otseselt ligipääsetavate teenuste hulka juba enne, kui tulemüürireeglitki mängu tulevad (need tulevad hilisemas teemas).

## Pöördproksi päised — kellele mida usaldada

Kui Nginx edastab päringu rakendusele, kaotab rakendus muidu info selle kohta, kes klient tegelikult oli — tema näeb ainult, et päring tuli Nginxilt endalt. Sellepärast lisab Nginx proksimisel juurde lisapäised:

| Päis | Mida ütleb |
| --- | --- |
| `Host` | milline nimi klient algselt küsis |
| `X-Forwarded-For` | kliendi (ja vaheastmete) tegelik aadress |
| `X-Forwarded-Proto` | kas algne päring oli HTTP või HTTPS |

::: warning Neid päiseid saab võltsida
Kui rakendus on **otse** ligipääsetav (mitte ainult loopbackil), saab pahatahtlik klient need päised ise kaasa panna ja valetada, kes ta on. Usalda `X-Forwarded-*` päiseid ainult siis, kui oled kindel, et rakenduseni pääseb **ainult** sinu enda usaldatud proksi kaudu — täpselt nii, nagu me loopbackiga tagame.
:::

## Oma kasutaja teenusele

Rakendus töötab omaenda, piiratud õigustega süsteemikasutaja all, mitte root'i all — nii nagu kokal on ligipääs köögile, mitte kogu maja peavõtmele. Kui rakenduses peaks olema viga, mida keegi ära kasutab, piiravad failisüsteemi õigused seda, mida see protsess üldse muuta saab.

## Käed külge: rakendusprotsess ja systemd teenus

**Kõik käsud jooksevad srv1 peal**, kui pole öeldud teisiti. Rakendus ise on tahtlikult lihtne HTTP tervisekontroll — mitte tootmiskõlbliku raamistiku soovitus. Andmebaasi see veel ei kasuta; see tuleb järgmises teemas eraldi.

```bash
sudo useradd --system --create-home --home-dir /srv/labapp --shell /usr/sbin/nologin labapp
```

`--system` teeb süsteemikonto (mitte tavalise sisselogitava kasutaja), `--home-dir` määrab kodukausta asukoha, `--shell /usr/sbin/nologin` keelab sellel kasutajal üldse sisse logida — ta on olemas ainult selleks, et rakendus tema all töötaks.

```bash
sudo nano /srv/labapp/app.py
```

**Faili `/srv/labapp/app.py` sisu:**

```python
from http.server import BaseHTTPRequestHandler, HTTPServer
import json

class Handler(BaseHTTPRequestHandler):
    def do_GET(self):
        body = json.dumps({"status": "ok", "service": "labapp"}).encode()
        self.send_response(200)
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

HTTPServer(("127.0.0.1", 3000), Handler).serve_forever()
```

Iga GET päring saab sama JSON-vastuse `{"status": "ok", "service": "labapp"}`. Viimane rida on kõige olulisem: server kuulab **ainult** `127.0.0.1` peal, pordil 3000 — mitte kõigil liidestel.

Salvesta `Ctrl+O`, kinnita `Enter`, välju `Ctrl+X`.

```bash
sudo nano /etc/systemd/system/labapp.service
```

**Faili `/etc/systemd/system/labapp.service` sisu:**

```ini
[Unit]
Description=Kooli labori HTTP rakendus
After=network.target

[Service]
User=labapp
Group=labapp
WorkingDirectory=/srv/labapp
ExecStart=/usr/bin/python3 /srv/labapp/app.py
Restart=on-failure
RestartSec=3
NoNewPrivileges=true
PrivateTmp=true
ProtectSystem=strict
ProtectHome=true

[Install]
WantedBy=multi-user.target
```

`User`/`Group` määravad, kelle õigustega protsess jookseb — meie äsja loodud `labapp`. `ExecStart` kasutab käivitatava programmi **täielikku teed**, mitte lihtsalt `python3` — nii ei sõltu teenus sellest, milline shelli seadistus kellelgi parasjagu on. `Restart=on-failure` koos `RestartSec=3`-ga taastab teenuse pärast viga, aga ei tee seda lõputult kiiresti. `NoNewPrivileges`, `PrivateTmp`, `ProtectSystem=strict` ja `ProtectHome` piiravad, mida see protsess süsteemis üldse teha saab, isegi kui midagi läheb valesti.

::: tip `After=network.target` ei taga internetti
See rida ütleb ainult, millises **järjekorras** systemd teenuseid käivitab — mitte, et võrk on selleks hetkeks tegelikult töökorras. Rakendus, mis vajab tegelikult töötavat võrku (nt andmebaasiühendust), vajab enamasti täpsemat sõltuvust — see teema tuleb järgmises osas.
:::

Salvesta `Ctrl+O`, kinnita `Enter`, välju `Ctrl+X`.

```bash
sudo systemctl daemon-reload
```

Laeb systemd teenusekirjeldused uuesti — vajalik alati pärast **uue** `.service` faili lisamist või olemasoleva muutmist.

```bash
sudo systemctl enable --now labapp
```

Sama muster, mis [Protsessid, teenused ja logid](./protsessid-teenused-ja-logid) osas: `enable` seadistab automaatse käivituse tuleviku jaoks, `--now` käivitab kohe.

```bash
curl http://127.0.0.1:3000/health
```

Testib rakendust **otse**, enne kui proksi vahele lisame — kui see juba ei tööta, on viga rakenduses endas, mitte Nginxis. Oodatav tulemus: JSON `{"status": "ok", ...}`.

Ava uuesti `/etc/nginx/sites-available/lab` ja lisa serveriploki sisse, olemasoleva `location /` kõrvale, uus plokk:

```nginx
    location /api/ {
        proxy_pass http://127.0.0.1:3000/;
        proxy_set_header Host $host;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
```

`location /api/` valib kõik `/api/` alguses teed. Lõpukaldkriipsuga `proxy_pass` asendab sobitatud `/api/` prefiksi kaldkriipsuga — nii jõuab `/api/health` tagateenusesse kui `/health`. Ülejäänud read lisavad eelmises sektsioonis kirjeldatud usalduspäised.

```bash
sudo nginx -t
sudo systemctl reload nginx
```

Kontrolli ja rakenda, täpselt sama muster, mis eelmises osas.

Kontrolli tulemust **srv2 pealt** (nüüd juba päris domeeninimega, kuna DNS [eelmisest teemast](./pordid-localhost-ja-oma-dns) töötab):

```bash
curl -i http://app.lab.test/api/health
```

Oodatav tulemus: `HTTP/1.1 200 OK` ja JSON vastus — päring läbis nüüd tervet rada: srv2 → DNS → Nginx srv1 peal → pöördproksi → rakendus loopbackil → vastus tagasi samal teel.

## Kokkuvõte

| Mõiste / käsk | Tähendus |
| --- | --- |
| Rakendus loopbackil | ligipääsetav ainult samalt masinalt, mitte otse võrgust |
| `X-Forwarded-*` päised | usalda ainult usaldatud proksi tagant |
| Süsteemikasutaja (`--shell nologin`) | piirab, mida rakendus vea korral muuta saab |
| `ExecStart` täielik tee | ei sõltu kasutaja shelli seadistusest |
| `proxy_pass http://127.0.0.1:3000/` | lõpukaldkriips asendab sobitatud tee prefiksi |

## Allikad

- [Nginx — proxy module (proxy_pass, proxy_set_header)](https://nginx.org/en/docs/http/ngx_http_proxy_module.html)
- [systemd.exec — ProtectSystem, ProtectHome, NoNewPrivileges](https://www.freedesktop.org/software/systemd/man/latest/systemd.exec.html)
- Näidisrakendus kasutab [Pythoni standardteegi HTTP serverit](https://docs.python.org/3.12/library/http.server.html)
