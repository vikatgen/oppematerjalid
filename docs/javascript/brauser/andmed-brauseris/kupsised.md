---
title: Küpsised
description: Lisalugemine küpsiste eesmärgist, serveriga liikumisest ja turvaomadustest.
outline: deep
---

# Küpsised

::: warning Lisamaterjal
Loe seda materjali, kui soovid mõista, kuidas brauser saab väikeseid tekstiväärtuseid HTTP-päringutega automaatselt serverile saata ja miks autentimisküpsiseid seadistab tavaliselt server.
:::

Küpsis (*cookie*) on väike tekstiväärtus, mille brauser seob veebiaadressiga. Erinevalt `localStorage`-ist võivad sobivad küpsised liikuda automaatselt HTTP-päringutega serverile.

## Küpsis ja Web Storage lahendavad eri probleeme

| Omadus | Küpsis | `localStorage` |
| --- | --- | --- |
| Liigub sobivate päringutega serverile | jah | ei |
| JavaScript saab alati lugeda | ei, `HttpOnly` küpsist ei saa | jah |
| Tüüpiline kasutus | serveri seanss, väike serveriga seotud väärtus | kasutajaliidese püsiv olek |
| Maht | väike | küpsisest suurem |

Ära kasuta küpsist lihtsalt seetõttu, et soovid brauseris midagi salvestada. Ostukorvi või filtrite kohaliku oleku jaoks sobib sageli Web Storage paremini.

## Serveri määratud küpsis

Server saab vastuses saata päise:

```http
Set-Cookie: sessionId=abc123; HttpOnly; Secure; SameSite=Lax
```

Brauser salvestab küpsise ja saadab selle sobivatel tulevastel päringutel serverile:

```http
Cookie: sessionId=abc123
```

JavaScript ei pea küpsist iga päringu juurde käsitsi lisama.

## Olulised küpsise omadused

### `HttpOnly`

```http
HttpOnly
```

Keelab JavaScriptil küpsise lugemise `document.cookie` kaudu. Seda kasutatakse sageli autentimisseansi küpsise kaitsmiseks.

### `Secure`

```http
Secure
```

Lubab küpsise saatmist ainult turvalise HTTPS-ühenduse kaudu, välja arvatud mõned kohaliku arenduse erandid.

### `SameSite`

```http
SameSite=Lax
```

Piirab küpsise saatmist teiste saitide kontekstis ning aitab vähendada osa CSRF-rünnakute riski.

Võimalikud väärtused on `Strict`, `Lax` ja `None`. `SameSite=None` vajab ka `Secure` omadust.

### `Path` ja `Domain`

Need määravad, milliste aadresside päringutega küpsis kaasa läheb.

### `Expires` ja `Max-Age`

Need määravad küpsise eluea. Ilma nendeta on küpsis tavaliselt seansiküpsis.

## JavaScriptiga loetav küpsis

JavaScript saab luua küpsise:

```js
document.cookie = "catalogView=grid; SameSite=Lax";
```

Lugemine:

```js
console.log(document.cookie);
```

`document.cookie` tagastab ühe tekstirea kõigi JavaScriptile nähtavate küpsistega:

```text
catalogView=grid; theme=dark
```

API on ajalooline ja ebamugav:

- väärtused tuleb tekstist eraldada;
- nimed ja väärtused tuleb kodeerida;
- `HttpOnly` küpsiseid ei näe;
- kirjutamine ei asenda kogu `document.cookie` teksti, vaid määrab ühe küpsise.

## Kodeeri nimi ja väärtus

```js
const cookieName = encodeURIComponent("catalogView");
const cookieValue = encodeURIComponent("ruudustik");

document.cookie =
  `${cookieName}=${cookieValue}; Max-Age=3600; SameSite=Lax`;
```

`encodeURIComponent()` aitab vältida erimärkide segunemist küpsise süntaksiga.

## Kustuta küpsis

Küpsis eemaldatakse, määrates selle eluea lõppenuks:

```js
document.cookie =
  "catalogView=; Max-Age=0; SameSite=Lax";
```

Kustutamisel peavad `Path` ja `Domain` vastama algse küpsise seadistusele.

## Miks autentimisküpsist ei looda tavaliselt JavaScriptiga?

Serveripoolne autentimisküpsis saab olla `HttpOnly`, mistõttu lehe JavaScript ei saa seda varastada või kogemata logida.

```http
Set-Cookie: sessionId=abc123; HttpOnly; Secure; SameSite=Lax
```

JavaScriptiga loodud küpsis ei saa olla `HttpOnly`. Seetõttu peaks turvalise seansiküpsise seadistama server.

::: danger Ära salvesta parooli küpsisesse
Küpsis ei ole paroolihoidla. Autentimissüsteem vajab serveripoolset turvamudelit, HTTPS-i ning sobivaid küpsise omadusi.
:::

## Küpsised ja `fetch()`

Sama päritoluga päringutel saadab brauser sobivad küpsised tavaliselt kaasa. Teise päritoluga päringute puhul sõltub kaasamine `credentials` valikust ja serveri CORS-seadistusest:

```js
fetch("https://api.example.com/profile", {
  credentials: "include"
});
```

See ei tähenda, et iga server lubab küpsisega ristpäritolu päringut. Server peab seda teadlikult toetama.

## Kontrolli küpsiseid DevToolsis

Chrome'i ja Chromiumi-põhistes brauserites:

1. ava DevTools;
2. vali **Application**;
3. ava **Storage → Cookies**;
4. vali veebiaadress;
5. kontrolli nime, väärtust, domeeni, teed ja turvaomadusi.

Network-paneelis saad päringu ja vastuse päistest kontrollida `Cookie` ning `Set-Cookie` kasutamist.

## Uurimisülesanne: võrdle küpsist ja localStorage'it

Kohaliku serveri kaudu avatud katselehel:

```js
document.cookie =
  "catalogView=grid; Max-Age=3600; SameSite=Lax";

localStorage.setItem("catalogView", "grid");
```

Seejärel:

1. leia mõlemad väärtused DevToolsis;
2. laadi leht uuesti;
3. kontrolli Network-paneelis sama päritolu päringu päiseid;
4. selgita, kumb väärtus võib serverile automaatselt liikuda;
5. kustuta mõlemad väärtused sobiva API-ga.

## Mõtesta

1. Miks ei sobi iga kasutajaliidese eelistus küpsisesse?
2. Mida kaitseb `HttpOnly`?
3. Miks peab server autentimisküpsise seadistamisel kasutama turvaomadusi?
4. Mis vahe on `localStorage` väärtuse ja küpsise liikumisel HTTP-päringuga?

## Kokkuvõte

- Küpsis on väike tekstiväärtus, mis võib liikuda automaatselt HTTP-päringutega.
- `HttpOnly`, `Secure` ja `SameSite` aitavad küpsise kasutust piirata.
- Serveripoolse seansi küpsise seadistab tavaliselt server.
- `document.cookie` näeb ainult JavaScriptile lubatud küpsiseid.
- Web Storage sobib paljude kasutajaliidese eelistuste jaoks küpsisest paremini.

## Allikad

- [MDN: Using HTTP cookies](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Cookies) — küpsiste eesmärk ja turvaomadused.
- [MDN: `Document.cookie`](https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie) — JavaScriptiga nähtavate küpsiste API.
- [MDN: `Request.credentials`](https://developer.mozilla.org/en-US/docs/Web/API/Request/credentials) — küpsiste kaasamine `fetch()` päringutes.
