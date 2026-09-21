---
title: Nginx ja staatiline sait
description: Mis vahe on veebiserveril ja rakendusel, mis on serveriplokk, ning kuidas panna Nginx srv1 peal esimest korda päris lehte näitama.
outline: deep
---

# Nginx ja staatiline sait

::: info Õpiväljund
Pärast seda osa oskad selgitada, mis vahe on veebiserveril ja rakendusel, mis on staatiline ja dünaamiline sisu, ning oled pannud Nginxi srv1 peal näitama enda loodud lehte oma domeeninime all.
:::

## Meeskonna kümnes küsimus sinule

Serveritel on nüüd püsivad aadressid, oma nimed ja oma DNS. Meeskonna järgmine palve on kõige otsesem seni: "kas me saame juba brauserist midagi näha?" Selles osas paneme `app.lab.test` taha esimest korda päris veebilehe.

::: tip Kui HTTP juba tuttav
[Arvutivõrgud ja küberturvalisus](/arvutivorgud/sissejuhatus) moodul kattis HTTP päringu-vastuse põhitõed juba üldiselt. Siin on fookus kitsam: kuidas **Nginx konkreetselt** otsustab, millise vastuse ta tagastab.
:::

## Veebiserver ja rakendus — kaks eri rolli

Kujuta ette restorani: **Nginx on vastuvõtutöötaja**, kes võtab tellimuse vastu ja toob valmis roa. **Rakendus on köögis töötav kokk**, kes tellimuse tegelikult valmistab. Praegu, selles osas, pole veel kööki — vastuvõtutöötaja toob ise valmis roa sahvrist (**staatiline fail**). Järgmises osas lisame köögi (**rakendusprotsessi**) juurde.

::: tip Miks järjekord on tähtis
Kui staatiline fail juba töötab, tead kindlalt, et Nginx ise, `server_name` ja `root` on õigesti seadistatud. Kui järgmises osas lisandub rakendus ja midagi läheb valesti, tead kohe, et viga on **uues** osas (rakenduses või proksis), mitte Nginxi baasseadistuses.
:::

**Staatiline** vastus tuleb otse failist — sama sisu iga kord. **Dünaamiline** vastus tekib programmi tööst hetkel, kui päring saabub — võib iga kord erineda. Mõlemad kasutavad sama HTTP protokolli; erinevus on ainult selles, kust vastus pärineb.

## Serveriplokk — kes vastab millisele nimele

Ühel Nginxil võib olla mitu **serveriplokki** (`server { }`), igaüks oma nime ja kaustaga — nii nagu ühes majas võib olla mitu ettevõtet eri uksesiltidega. `server_name` ütleb, millisele **Host** päisele see plokk vastab; `root` ütleb, millisest kaustast failid tulevad.

::: warning IP ja nimi võivad anda erineva vastuse
Kui avad brauseris otse IP-aadressi (mitte nime), ei saada brauser Host päist nii, nagu Nginx ootab sobitamiseks — võid sattuda hoopis vaikimisi serveriplokile. See pole viga, vaid Nginxi tavapärane käitumine: ta valib serveriploki **nime**, mitte ainult sihtaadressi järgi.
:::

## Käed külge: staatiline leht srv1 peal

**Kõik käsud selles osas jooksevad srv1 peal**, kui pole öeldud teisiti.

```bash
sudo apt install nginx python3
```

Paigaldab Nginxi kohe, ja Pythoni juba ette järgmise osa rakenduse jaoks (Pythoni standardteek, sõltuvusteta — fookus jääb serverihaldusel, mitte raamistiku valikul).

```bash
sudo mkdir -p /var/www/lab
```

Loob veebifailide kausta — hoiame oma labori lehe eraldi Nginxi vaikimisi tervituslehest.

```bash
sudo nano /var/www/lab/index.html
```

**Faili `/var/www/lab/index.html` sisu:**

```html
<!doctype html>
<html lang="et"><meta charset="utf-8"><title>Kooli labor</title><h1>Minu server töötab</h1><p>Keskkond: srv1</p></html>
```

Salvesta `Ctrl+O`, kinnita `Enter`, välju `Ctrl+X`.

```bash
sudo nano /etc/nginx/sites-available/lab
```

**Faili `/etc/nginx/sites-available/lab` sisu:**

```nginx
server {
    listen 80;
    server_name app.lab.test;
    root /var/www/lab;
    index index.html;
    location / {
        try_files $uri $uri/ =404;
    }
}
```

`listen` kuulab HTTP porti, `server_name` sobitab nime, `root` määrab dokumendikausta ja `index` vaikimisi faili. `location /` käsitleb kõiki teid. `try_files` otsib failinime või kausta ja tagastab puudumisel 404. Dollariga nimed (`$uri`) on Nginxi enda muutujad, neid ei kirjuta ise välja.

```bash
sudo ln -s /etc/nginx/sites-available/lab /etc/nginx/sites-enabled/lab
```

Loob sümboolse lingi aktiivsete saitide kausta — Ubuntu Nginx loeb saite ainult `sites-enabled` kaustast, mitte `sites-available`-st otse. Kui käsk ütleb `File exists`, on link juba olemas — ära käivita jõuga (`-f`) enne, kui oled kontrollinud, kas olemasolev link on õige.

```bash
sudo nginx -t
```

`-t` kontrollib seadistuse süntaksit **enne** rakendamist. Oota vastust `syntax is ok` ja `test is successful`.

```bash
sudo systemctl reload nginx
```

Palub Nginxil uue seadistuse laadida, ilma teenust katkestamata — sama `reload` käsk, mis [Protsessid, teenused ja logid](./protsessid-teenused-ja-logid) osas juba tuttavaks sai.

Kontrolli tulemust **srv2 pealt**:

```bash
curl -i -H "Host: app.lab.test" http://192.168.56.10
```

`-i` näitab päiseid, `-H` seab Host päise käsitsi. **Miks käsitsi IP + Host päis, mitte lihtsalt domeeninimi?** Nii testid sa täpselt seda, kas Nginx ise valib õige serveriploki — ilma sõltuvuseta sellest, kas DNS (eelmisest teemast) parasjagu töötab. Kaks eri kihti, kaks eri testi.

Oodatav tulemus: `HTTP/1.1 200 OK` ja kehas "Minu server töötab".

Kui DNS töötab (eelmisest teemast), toimib ka lihtsam vorm:

```bash
curl -i http://app.lab.test
```

## Kokkuvõte

| Mõiste / käsk | Tähendus |
| --- | --- |
| Nginx vs rakendus | vastuvõtutöötaja vs kokk köögis — praegu köök veel puudub |
| Staatiline vs dünaamiline | fail vs programmi hetketöö — mõlemad HTTP peal |
| `server_name` / `root` | milline nimi, milline kaust — serveriplokk valitakse nime järgi |
| `sudo nginx -t` | kontrolli **enne** rakendamist |
| `curl -H "Host: ..."` | testi serveriplokki eraldi DNS-ist |

## Allikad

- [Nginx — Server blocks / server_name](https://nginx.org/en/docs/http/server_names.html)
- [Nginx — beginner's guide](https://nginx.org/en/docs/beginners_guide.html)
