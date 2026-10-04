---
title: "Võrgu üleandmine ja individuaalne praktiline kontroll"
description: "Kohtumine 11: Karli mängukeskuse võrgu lõpetamine, individuaalne veaotsing, projekti üleandmise kontroll, riskitabel ja enesehindamine."
outline: deep
---

# 11. Võrgu üleandmine ja individuaalne praktiline kontroll

::: info Õpiväljund
Pärast kohtumist oskad tõendada võrgu toimimist, leida ja parandada ühe seadistusvea ning anda üle dokumenteeritud võrguprojekti.
:::

::: danger Kavandatud, mitte läbi proovitud
Individuaalsete veafailide ja kontroll-lehe sisu valmistab ette õpetaja. Selle kohtumise ülesanded täpsustuvad pärast kohtumiste 5–10 läbiproovimist.
:::

## Mis Karli keskuses nüüd juhtub?

Karli keskus avatakse nädala pärast. Karl ei hakka ise iga päev võrku haldama. Mirjam peab seda **dokumentatsiooni järgi** edasi arendama ja vea korral parandama. Täna kontrollime kahte asja:

1. kas **sinu võrk** töötab ja on dokumenteeritud nii, et keegi teine saab selle üle võtta;
2. kas **sina** oskad leida ja parandada vea, mida sa ise ei teinud.

## Kontrollplaan (90 minutit)

| Aeg | Tegevus |
| --- | --- |
| 20 min | Lõpeta oma võrk ja koormusülesanne, kui need on pooleli |
| 30 min | Individuaalne veaotsing |
| 25 min | Võrgu üleandmise kontroll ja lühiselgitused |
| 15 min | Riskitabel ja enesehindamine |

## 1. Individuaalne veaotsing

Õpetaja annab sulle **koopia** võrgust, kus on **üks viga**. Viga võib olla:

- vale IP või mask;
- vale gateway;
- vale DHCP seadistus;
- vale DNS;
- vale ACL reegel.

Sinu töö:

1. Kirjuta üles **sümptom**: mida kasutaja näeb ("leht ei avane", "ei saa aadressi").
2. Otsi viga **süsteemselt**. Kasuta kohtumisel 7 õpitud veaotsingu loogikat: IP-ühendus, siis HTTP, siis DNS. Siis vaata seadistusi.
3. **Nimeta põhjus.**
4. **Paranda.**
5. Tee **järelkontroll**: näita, et sümptom on kadunud, ja kontrolli, et midagi muud ei läinud katki.

| Veaprotokolli lahter | Mida kirjutad |
| --- | --- |
| Sümptom | Mida kasutaja nägi |
| Kontrollid | Mida proovisid ja mis tulemusega |
| Põhjus | Mis oli tegelikult valesti |
| Parandus | Mida muutsid |
| Järelkontroll | Kuidas tõestasid, et töötab |

## 2. Üleandmise kontroll

Keegi teine peab saama sinu võrgu üle võtta. Kontrollime:

| Dokument | Kas on olemas? |
| --- | --- |
| Töötav `.pkt` fail | |
| Füüsiline skeem | |
| Loogiline skeem | |
| Aadressitabel ja DHCP plaan | |
| Ligipääsumaatriks | |
| Kontrolliprotokoll (lubatud ja keelatud testid) | |
| Riskianalüüs (vähemalt 3 riski) | |
| Seadmete loend ja koormushinnang | |
| Muudatuste päevik ja taastamise juhis | |

**Taastamise juhis** ütleb: kui võrk läheb katki, mida teha. Näiteks "ava viimane toimiv fail `10-isolated.pkt` ja kontrolli aadressitabelit".

Suure rühma korral selgitatakse paarides kontroll-lehe abil. Õpetaja vaatleb praktilist tööd ja kontrollib kirjalikke põhjendusi.

Kui kasutasid mõnes etapis **valmis vahefaili**, märgi see dokumentatsiooni ja näita, mida selles etapis ise muutsid. Valmis faili avamine ei asenda oma seadistamist.

## 3. Riskitabel

Koosta tabel **vähemalt kolme** riskiga mängukeskuse võrgule. Näited:

| Risk | Mõju mängukeskusele | Meede |
| --- | --- | --- |
| Külaline pääseb Staff serverisse | Andmed lekivad, server rikutakse | ACL Guest võrgul |
| Ruuteri haldus on avatud | Keegi muudab seadistust ja keskus seisab | Haldusparool, kaughalduse keelamine |
| Serveri aadress muutub (DHCP) | Leht ei avane | Staatiline aadress, välistus DHCP-s |

Lisa võimalusel ka **arvuti** ja **tarkvara** risk, mis ei seondu otseselt võrguga (nt uuendamata töötaja arvuti, liiga laiad failiõigused). Neid käsitleb [küberturvalisuse lugemismaterjal](/kuberturvalisus/sissejuhatus).

## 4. Enesehindamine

Vasta lühidalt:

1. Mida ma oskan nüüd teha, mida enne ei osanud?
2. Mis oli kõige raskem ja kuidas ma sellega hakkama sain?
3. Mida ma veel ei oska?

Paroolipoliitika, tarkvarauuenduste ja kasutaja- ning failiõiguste teemad on [küberturvalisuse lugemismaterjalis](/kuberturvalisus/sissejuhatus).

## Esitatav töö

- Lõplik projektikomplekt (tabel üleandmise kontrollist).
- Individuaalne veaprotokoll.
- Riskitabel ja enesehindamine.

**Kontroll:** nimeta põhjus, paranda see ja näita tegelikku järelkontrolli.

## Mis edasi?

Kui sinu võrk töötab ja on dokumenteeritud, on hea jätk:

- VLAN-id ühe kommutaatori eraldamiseks;
- päris seadmetel ehitamine.
