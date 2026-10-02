---
title: "Jõudlus: Postman ja Newman"
description: "Kohtumine 9: keskmine vastuseaeg on hea, aga kasutajad kurdavad. Postmani kollektsioon ja testid, Newman käsurealt, vastuseaja keskmine, p95 ja maksimum. Praktikum: kollektsiooni laiendamine ja jõudluse mõõtmine."
outline: deep
---

# 9. Jõudlus: Postman ja Newman

::: info Õpiväljund
Pärast tundi oskad koostada Postmani kollektsiooni kontrollidega, käivitada seda Newmaniga, mõõta vastuseaega (keskmine, p95, maksimum) ja põhjendada, miks keskmine võib olla eksitav (HK 3.3).
:::

Anu kirjutab: "Mõnikord on rakendus väga aeglane. Täna ootasin pool minutit."

Tiit vaatab Kaareli mõõtmisi: "Keskmine vastuseaeg on 150 millisekundit. See on suurepärane." Kaarel on kahtlev. Kui rakendus oleks **alati** aeglane, näeks keskmine halb välja. Aga kui see on **vahel** väga aeglane, võib keskmine olla hea ja kasutaja kogemus ikkagi halb.

Mõelgem kümnest päringust, millest üheksa võtab 80 ms ja üks 800 ms:

| Mõõt | Väärtus |
| --- | --- |
| Keskmine | (9 x 80 + 800) / 10 = **152 ms** |
| Maksimum | **800 ms** |
| **p95** | **800 ms** |

Keskmine 152 ms ütleb "kõik on hästi". Aga üks kasutaja kümnest ootas **10 korda kauem**. [Testimise aluste kohtumisel 8](/testimise-alused/kohtumine-08-joudlus-ja-turvalisus) kohtusid p95-ga. Nüüd mõõdad seda ise.

## Postman: päringud ja kontrollid

Kohtumisel 2 importisid Postmani kollektsiooni ja käivitasid selle. Nüüd õpid seda **kirjutama**.

**Kollektsioon** (*collection*) on päringute rühm, mida saab ühe korraga käivitada. Postman salvestab selle JSON-failina (`postman/rannamoisa.postman_collection.json`), mida saab hoida Giti hoidlas.

| Mõiste | Mida teeb |
| --- | --- |
| **Päring** (*request*) | Üks HTTP päring: meetod, URL, keha |
| **Muutuja** (`{{baseUrl}}`) | Väärtus, mida saab mujal kasutada. Keskkonna muutuja `baseUrl` ütleb, kus rakendus jookseb |
| **Pre-request script** | JavaScript, mis jookseb **enne** päringut (nt arvutab kuupäeva) |
| **Tests** | JavaScript, mis jookseb **pärast** vastust ja kontrollib seda |
| **Collection Runner** | Käivitab kogu kollektsiooni järjest |

Kontrolli kirjutamine Postmanis näeb välja nagu Vitestis:

```js
pm.test("201 ja hind 37.5", function () {
  pm.response.to.have.status(201);
  pm.expect(pm.response.json().price).to.eql(37.5);
});

pm.test("vastus on alla 500 ms", function () {
  pm.expect(pm.response.responseTime).to.be.below(500);
});
```

Vastuse mõõdetud aeg on `pm.response.responseTime` (millisekundites).

### Andmete edastamine päringute vahel

Töötoa loomise päring annab vastuseks töötoa `id`. Järgmine päring (avamine) vajab seda. Postmanis salvestad `id` **muutujasse**:

```js
pm.collectionVariables.set("workshopId", pm.response.json().id);
```

ja kasutad seda URL-is: `{{baseUrl}}/workshops/{{workshopId}}/publish`. Nii moodustub **stsenaarium**, nagu kohtumisel 7, aga ilma koodi kirjutamata.

## Newman: kollektsioon käsurealt

Postmani graafiline liides sobib uurimiseks. **Newman** käivitab sama kollektsiooni **käsurealt**: see sobib automaatseks käivitamiseks ja salvestab tulemuse faili.

Praktikumirepos on selleks käsk:

```bash
npm start            # ühes terminalis: rakendus jookseb
npm run newman       # teises terminalis: kollektsioon, 20 kordust
npm run p95          # arvutab iga päringu keskmise, p95 ja maksimumi
```

`npm run newman` käivitab kollektsiooni **20 korda järjest** (korduste vahel 20 ms pausiga) ja salvestab tulemuse faili `postman/tulemus.json`. Käsk kasutab `npx`-i ja laadib Newmani esimesel korral alla (vajab internetti).

`npm run p95` loeb selle faili ja prindib iga päringu kohta tabeli:

```text
päring        n   keskm     p95     max
...
```

## Mõõdikud: keskmine, p95, maksimum

| Mõõt | Mida ütleb | Nõrkus |
| --- | --- | --- |
| **Keskmine** | Üldine tase | Peidab harvad aeglased päringud |
| **Mediaan** | Keskmine kasutaja kogemus | Ei näe aeglaseid saba |
| **p95** | 95% päringutest on selle aja piires või kiiremini | Vajab piisavalt kordusi (20 on vähe, aga nähtav) |
| **Maksimum** | Kõige halvem juhtum | Üks juhuslik hüpe võib seda mõjutada |

p95 arvutamiseks järjesta ajad kasvavalt ja võta element kohal `ceil(0,95 x n)`. Kümne väärtuse korral on see 10. koht (suurim), 20 väärtuse korral 19. koht.

Kuidas määrata **künnis**? Nõuetes ei ole jõudluse kohta midagi. Kaarel peab Anuga **kokku leppima kvaliteedieesmärgi**, näiteks "95% päringutest vastatakse alla 500 ms". See on ISO/IEC 25010 omaduse "toimivus" (*performance efficiency*) konkreetne tõlge, millega on mõtet testida.

### Mida selline mõõtmine **ei** tee

Newman saadab päringud **ükshaaval**, nii et see mõõdab **ühe kasutaja vastuseaega**. See **ei ole koormustest**: sada kasutajat korraga käituksid teisiti. Lisaks mõjutavad tulemust sinu arvuti koormus, esimene "külm" päring ja võrk. Seetõttu kasuta tulemusi **suhtena** ("see päring on teistest kordades aeglasem"), mitte absoluutarvuna.

## Postman vs Vitest (HK 3.3)

| | Vitest + Supertest | Postman + Newman |
| --- | --- | --- |
| Kes kirjutab | Arendaja / testija koodis | Ka mittekoodija graafiliselt |
| Kus jookseb | Rakendus testi sees | **Käimasolev** server väljastpoolt |
| Tugevus | Kiire, täpne, kombineeritav mockidega | Uurimine, jõudluse mõõtmine, jagatav kollektsioon |
| Nõrkus | Vajab koodi | Aeglasem, vähem paindlik |

Kumbki ei asenda teist. Kasuta **mõlemat** ja kirjuta üles, miks.

## Praktikum

Sul on 55-60 minutit. Failid: `postman/rannamoisa.postman_collection.json`, `postman/local.postman_environment.json`, `scripts/p95.js`.

### 1. Algmõõtmine

```bash
npm start
npm run newman
npm run p95
```

Kirjuta tabel: iga päringu keskmine, p95 ja maksimum. Milline päring on teistest selgelt erinev? Kas **keskmine** ja **p95** ütlevad sellest päringust sama?

### 2. Täienda kollektsiooni olemasolevaid päringuid

Kaks päringut kollektsioonis kontrollivad praegu ainult staatust. Lisa neile **Tests** sakis kontrollid:

| Päring | Mida kontrollida |
| --- | --- |
| Vaata töötuba | Töötoa olek ja vabade kohtade arv vastavad eelmises päringus tehtud registreeringule (kasuta muutujaid) |
| Aruanne | Vastuseaja künnis (otsusta ise, millega põhjendad) |

### 3. Lisa vähemalt neli uut päringut

Lisa kollektsiooni päringud, mis kontrollivad:

- vigase sisendiga töötoa loomist (staatus ja `error.code`);
- korduvat registreerimist sama e-postiga (staatus ja `error.code`);
- makstud registreeringu tühistamist ja tagasimakset;
- olematu ressursi päringut.

Kasuta muutujaid (`{{workshopId}}`, `{{registrationId}}`) ja pre-request skripti, kus on vaja uut kuupäeva või e-posti. Iga päring peab kontrollima **vähemalt kahte asja**.

### 4. Mõõda uuesti ja uuri

Käivita `npm run newman` ja `npm run p95` uuesti. Seejärel proovi rohkem kordusi:

```bash
npx newman run postman/rannamoisa.postman_collection.json -e postman/local.postman_environment.json -n 50 --delay-request 20 --reporters cli,json --reporter-json-export postman/tulemus.json
npm run p95
```

Mis muutus? Kas p95 on stabiilsem kui 20 korra puhul? Kirjuta lühike **jõudlusraport**: milline päring on aeglane, millised arvud seda näitavad, ja milline künnis oleks mõistlik.

### 5. Postman vs Vitest

Võta kaks kontrolli, mille tegid nii Postmanis kui Vitestis (nt tühistamine). Võrdle: kui palju aega kulus, mida kumbki leiaks ja mida mitte. Täienda päevikus kommentaari **Vahendid** (kohtumisest 2).

## Tõendid päevikusse

Lisa oma [päevikusse](./sissejuhatus#paevik) kommentaar **Kohtumine 9** ja kirjuta sinna:

- [ ] Täiendatud Postmani kollektsioon (`postman/*.json`), vähemalt neli uut päringut
- [ ] p95 tabel 20 ja 50 korra kohta (fail `postman/tulemus.json` jääb sinu arvutisse, päevikusse kopeeri tabel)
- [ ] Jõudlusraport (aeglane päring, arvud, künnis ja põhjendus)
- [ ] Postman vs Vitest võrdlus kahe konkreetse näitega

## Refleksioon

1. Miks kasutaja kogemust kirjeldab p95 paremini kui keskmine?
2. Miks Newmani mõõtmine ei ole koormustest?
3. Kuidas leppid Anuga kokku jõudluse künnise?

## Allikad

- [Postman: testskriptid](https://learning.postman.com/docs/tests-and-scripts/write-scripts/test-scripts/) ja [Newman](https://learning.postman.com/docs/collections/using-newman-cli/newman-options/).
- ISO/IEC 25010 "toimivus" (*performance efficiency*). Vt [Testimise alused, kohtumine 2](/testimise-alused/kohtumine-02-kvaliteet).
- [Testimise alused, kohtumine 8](/testimise-alused/kohtumine-08-joudlus-ja-turvalisus): jõudlustestimise liigid ja p95.
- Anu, Tiit ja arvud (80 ms, 800 ms) on väljamõeldud näide.
