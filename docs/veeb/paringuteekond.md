---
title: Veebipäringu teekond
description: Õpi kirjeldama samme, mis toimuvad URL-i avamisest vastuse kuvamiseni.
outline: deep
---

# Veebipäringu teekond

::: info Õpiväljund
Pärast õppetundi oskad järjestada veebipäringu peamised sammud ning leida vea võimalikku asukohta.
:::

Kui avad aadressi või JavaScript käivitab `fetch()` päringu, peab brauser leidma serveri, looma ühenduse, saatma päringu ja töötlema vastuse.

## Lihtsustatud teekond

```text
1. Brauser loeb URL-i
2. DNS leiab domeenile IP-aadressi
3. Brauser loob serveriga ühenduse
4. HTTPS korral luuakse turvaline TLS-ühendus
5. Brauser saadab HTTP-päringu
6. Server töötleb päringut
7. Server saadab HTTP-vastuse
8. Brauser töötleb vastuse
```

Kõik sammud ei toimu iga päringu puhul nullist. Brauser võib kasutada vahemälu, olemasolevat ühendust ja varem leitud DNS-vastust.

## Brauser ja server täidavad eri rolle

Brauser:

- käivitab kasutajaliidese;
- saadab päringuid;
- rakendab brauseri turvareegleid;
- kuvab vastuse tulemuse.

Server:

- kuulab kindlal aadressil ja pordil;
- töötleb päringut;
- loeb või muudab andmeid;
- koostab vastuse.

## Kus võib viga tekkida?

| Sümptom | Võimalik koht |
| --- | --- |
| domeeni ei leitud | URL või DNS |
| ühendus ebaõnnestus | server, port, võrk või TLS |
| vastus on `404` | server ei leidnud ressurssi |
| vastus on `500` | serveri töötlemine ebaõnnestus |
| Network näitab vastust, JavaScript viskab vea | vastuse töötlemine või andmekuju |
| Console näitab CORS-i viga | brauseri päritolureegel ja serveri päised |

## Praktiline uurimine

Ava tootekataloog ja DevToolsi Network-paneel.

1. Laadi leht uuesti.
2. Leia HTML-, JavaScripti- ja API-päring.
3. Märgi iga päringu URL, meetod, staatus ja tüüp.
4. Selgita, millise sammu tulemust iga Network-paneeli rida kinnitab.

## Mõtesta

- Mis vahe on sellel, et server ei vasta, ja sellel, et server vastab `500` koodiga?
- Milliseid samme brauser teeb enne, kui `fetch()` saab `Response` objekti?
- Miks ei pruugi aeglane rakendus tähendada aeglast JavaScripti?

## Allikad

- [MDN: How the web works](https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Web_standards/How_the_web_works)
