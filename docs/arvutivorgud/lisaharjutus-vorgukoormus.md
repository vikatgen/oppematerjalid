---
title: "Lisaharjutus: kui suurt ühendust mängukeskus vajab?"
description: "Valikuline harjutus: arvuta ühe tegevuse koormus, võrdle ühenduse kiirusega ning lisa soovi korral üleslaadimine ja varu."
outline: deep
---

# Lisaharjutus: kui suurt ühendust mängukeskus vajab?

See on **valikuline hilisem harjutus**, mis jätkab [kohtumisel 3](./kohtumine-03-vorguplaan-ja-packet-tracer#kui-suurt-uhendust-keskus-vajab) õpitud ühikuid. See ei kuulu kohtumise 10 ega 11 kohustusliku töö hulka. Võid kasutada kalkulaatorit.

## 1. Alustame ühest tegevusest

Karl ootab 20 mängijat. Harjutuses **eeldame**, et igaüks vajab mängimiseks 3 Mbit/s allalaadimist. See on arvutuseks antud oletus, mitte konkreetse mängu mõõdetud vajadus.

Kui kõik mängivad korraga:

```text
20 mängijat × 3 Mbit/s = 60 Mbit/s
```

Karl võrdleb kahte väljamõeldud ühendust:

| Ühendus | Allalaadimise kiirus | Kas arvutatud 60 Mbit/s mahub sellesse? |
| --- | --- | --- |
| A | 50 Mbit/s | Ei |
| B | 100 Mbit/s | Jah |

**Proovi ise:** mis muutub, kui mängijaid on 10? Aga 30? Kirjuta arvutus ja vali kummalgi juhul ühendus.

Arvutatud summa mahtumine ei tõenda veel head mängukogemust: olulised on ka viivitus, paketikadu ja muu samal ajal toimuv liiklus.

## 2. Lisa üleslaadimine

Järgmise sammu jaoks eeldame, et iga mängija saadab välja 1 Mbit/s andmeid.

```text
20 × 1 Mbit/s = 20 Mbit/s üles
```

Ühendus, mille kiirus on **100 Mbit/s alla ja 10 Mbit/s üles**, mahutab meie allalaadimise arvu, kuid üleslaadimisest jääb puudu. Seda piiravat osa nimetame **kitsaskohaks**.

**Proovi ise:** kas ühendus 100 Mbit/s alla ja 30 Mbit/s üles mahutab mõlemad arvutatud vajadused?

## 3. Lisa soovi korral varu

Otsustame jätta 20% lisavaru. See on meie valik, mitte üldine reegel. 20% arvust 60 on 12.

```text
Alla: 60 + 12 = 72 Mbit/s
Üles: 20 + 4 = 24 Mbit/s
```

**Proovi ise:** kas eelmine 100/30 ühendus mahutab ka varuga arvud? Selgita, miks pole ainult allalaadimisnumbri vaatamine piisav.

## Kontrolli oma mõttekäiku

Märgi vastuses mängijate arv, ühe mängija oletatav vajadus, arvutuskäik ja võrreldava ühenduse mõlemad kiirused. Kui muudad eeldusi, muutub ka tulemus. Packet Traceri simulatsiooniaeg ei ole selle arvutuse mõõtetulemus.
