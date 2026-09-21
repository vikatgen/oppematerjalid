---
title: HTTPS ja TLS
description: Mida TLS tegelikult tõendab, mis on sertifikaadi SAN-väli, ning kuidas panna Nginx laborisertifikaadiga HTTPS-i teenindama.
outline: deep
---

# HTTPS ja TLS

::: info Õpiväljund
Pärast seda osa oskad selgitada, mida TLS krüpteerib ja mida sertifikaat tõendab (ning mida mitte), ning oled loonud srv1-le iseallkirjastatud sertifikaadi ja seadistanud Nginxi HTTPS-i teenindama.
:::

## Meeskonna seitsmeteistkümnes küsimus sinule

Meeskond küsib: "kas keegi saab meie liiklust pealt kuulata, kui see host-only võrgus liigub?" Praegu jah — kõik meie senine liiklus (staatiline leht, API) on liikunud lihttekstina HTTP üle. Selles osas lisame krüpteeringu.

## TLS eesmärk — kaks eraldi tõendust

**TLS krüpteerib transpordi** — see kaitseb sisu pealtkuulamise eest teel. Aga krüpteering üksi **ei tõenda**, et räägid õige serveriga — selleks on **sertifikaat**, mis seob nime (`app.lab.test`) avaliku võtmega. Suletud ümbrik kaitseb sisu, aga adressaadi identiteet peab olema eraldi kontrollitud.

::: warning Meie iseallkirjastatud sertifikaat pole automaatselt usaldatud
Päris avalikus veebis kinnitab sertifikaadi usaldusväärsust kolmas osapool (sertifitseerimisasutus), keda brauser juba usaldab. Meie labori sertifikaadi allkirjastame **ise** — see on õppelahendus, mitte avaliku veebimajutuse sertifikaadiprotsess. Brauser hoiatab selle eest õigustatult.
:::

## Sertifikaadi väljad — nimeline tõend

Sertifikaat pole ainult "krüpteering sisse lülitatud" lüliti — see on **nimeline tõend** kindlate väljadega:

| Väli | Tähendus |
| --- | --- |
| **SAN** (*Subject Alternative Name*) | milliste nimede jaoks see sertifikaat kehtib |
| Kehtivusaeg | ajaline piirang, mille järel sertifikaat aegub |
| Privaatvõti | jääb **ainult** serverisse, ei liigu kunagi kliendile |

Õige võtmega, aga vale nimega sertifikaat ei vasta brauseri küsimusele "kas see on tõesti `app.lab.test`?".

::: tip Miks IP-aadressi kaudu avades tekib nimeviga
Meie sertifikaat sisaldab SAN-is ainult DNS-nime `app.lab.test`, mitte IP-aadressi. Kui avad brauseris otse `https://192.168.56.10`, ei leia brauser sertifikaadi SAN-ist sobivat nime — täpselt sama loogika, mis [Nginx ja staatiline sait](./nginx-ja-staatiline-sait) osas serveriploki nimepõhise valikuga.
:::

## HTTPS ja rakendus — transport pole kõik

HTTPS kaitseb **võrguühendust**, aga rakendus vajab endiselt oma autentimist ja õiguste kontrolli — täpselt samad `labreader`/`labapp` piirangud, mis [Kasutajad, õigused ja tehingud](./kasutajad-oigused-ja-tehingud) osas juba seadistasime, kehtivad ka HTTPS-i taga edasi. Lukustatud kaubik võib ikkagi vedada kaupa valesse kohta — transpordikaitse ei kontrolli rakenduse äriloogikat ega kasutaja sisendi ohutust (SQL-i süst, XSS jms ei kao HTTPS-iga).

## Käed külge: iseallkirjastatud sertifikaat ja Nginxi TLS

**Kõik käsud srv1 peal.**

```bash
sudo openssl req -x509 -newkey rsa:3072 -sha256 -days 30 -nodes -keyout /etc/ssl/private/lab.key -out /etc/ssl/certs/lab.crt -subj "/CN=app.lab.test" -addext "subjectAltName=DNS:app.lab.test"
```

`req -x509` loob otse iseallkirjastatud sertifikaadi. `-newkey rsa:3072` genereerib uue RSA võtme. `-sha256` on allkirja räsialgoritm, `-days 30` piirab kehtivusaega 30 päevaga (labor, mitte tootmine). `-nodes` jätab privaatvõtme ilma paroolikrüpteeringuta, et Nginx saaks käivituda ilma paroolita sisestamata. `-keyout`/`-out` määravad väljundfailid, `-subj` seab nime ja `-addext` lisab SAN-välja.

```bash
sudo chmod 600 /etc/ssl/private/lab.key
```

Piirab privaatvõtme lugemise ainult failiomanikule — teised serveri kasutajad ei tohi seda lugeda. Sama põhimõte, mis SSH privaatvõtmete puhul: privaatvõti ei liigu kunagi kaugemale, kui hädavajalik.

```bash
sudo nano /etc/nginx/sites-available/lab
```

**Asenda faili `/etc/nginx/sites-available/lab` senine sisu tervikuna** järgnevaga:

```nginx
server {
    listen 80;
    server_name app.lab.test;
    return 301 https://app.lab.test$request_uri;
}
server {
    listen 443 ssl;
    server_name app.lab.test;
    ssl_certificate /etc/ssl/certs/lab.crt;
    ssl_certificate_key /etc/ssl/private/lab.key;
    root /var/www/lab;
    index index.html;
    location / {
        try_files $uri $uri/ =404;
    }
    location /api/ {
        proxy_pass http://127.0.0.1:3000/;
        proxy_set_header Host $host;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Esimene plokk kuulab endiselt HTTP porti 80, aga ainsa asjana **suunab** kõik `301`-ga HTTPS-i — `$request_uri` säilitab algse tee ja parameetrid suunamisel. Teine plokk aktiveerib TLS-i (`listen 443 ssl`) ja viitab äsja loodud sertifikaadile ning privaatvõtmele. Ülejäänud osa — staatiline `root`/`index` ja `/api/` pöördproksi — on täpselt sama, mis [Nginx ja staatiline sait](./nginx-ja-staatiline-sait) ja [Rakendus ja pöördproksi](./rakendus-ja-poordproksi) osades juba üles seadsime.

Salvesta `Ctrl+O`, kinnita `Enter`, välju `Ctrl+X`.

```bash
sudo nginx -t
sudo systemctl reload nginx
```

Sama tuttav muster — kontrolli enne, rakenda alles siis.

```bash
curl --cacert /etc/ssl/certs/lab.crt --resolve app.lab.test:443:127.0.0.1 https://app.lab.test/api/health
```

`--cacert` usaldab selle **ühe katse** jaoks konkreetselt meie enda laborisertifikaati (mitte muudab kogu süsteemi usaldust). `--resolve` määrab nime ja pordi vastavuse IP-le kohapeal, säilitades samal ajal TLS-i nimekontrolli SAN-i vastu. Oodatav tulemus: `200`/JSON vastus, **ilma** `-k` erandita (mis kõik sertifikaadikontrollid lihtsalt välja lülitaks).

::: tip Brauseri hoiatus on oodatud, mitte viga
Kui avad `https://app.lab.test` hosti brauseris, näed algul iseallkirjastatud sertifikaadi hoiatust — see on **oodatud**. Labori kontrolli põhitee on ülaltoodud `curl --cacert` katse, mitte brauseri hoiatuse pime "Advanced → Proceed" klõps. Avaliku tootmisdomeeni sertifikaatide automatiseerimine (nt Let's Encrypt) on omaette teema, mida see labor ei kata. Privaatvõtit ei kopeerita kunagi kliendile.
:::

## Kokkuvõte

| Mõiste / käsk | Tähendus |
| --- | --- |
| TLS | krüpteerib transpordi, ei tõenda üksi õiget serverit |
| Sertifikaat / SAN | nimeline tõend, kehtib ainult loetletud nimede jaoks |
| Privaatvõti (`chmod 600`) | jääb ainult serverisse, loetav ainult omanikule |
| `return 301 https://...` | HTTP suunab alati HTTPS-i, tee ja parameetrid säilivad |
| `curl --cacert --resolve` | tõendab krüpteeringut koos nime- ja sertifikaadikontrolliga |
| HTTPS ≠ rakenduse turvalisus | autentimine, õigused, sisendi valideerimine kehtivad ikka eraldi |

## Allikad

- [OpenSSL — req(1) manual](https://docs.openssl.org/master/man1/openssl-req/)
- [Nginx — SSL/TLS moodul](https://nginx.org/en/docs/http/ngx_http_ssl_module.html)
- [curl — --resolve ja --cacert](https://curl.se/docs/manpage.html)
