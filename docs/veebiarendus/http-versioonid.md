---
title: HTTP/1.1, HTTP/2 ja HTTP/3
description: Õpi selgitama, miks uuemad HTTP versioonid teevad lehe laadimise kiiremaks ja kust seda Network-paneelis näha.
outline: deep
---

# HTTP/1.1, HTTP/2 ja HTTP/3

::: info Õpiväljund
Pärast õppetundi oskad selgitada, mille poolest HTTP/2 ja HTTP/3 erinevad HTTP/1.1-st, ja leida Network-paneelist, millist versiooni päring kasutas.
:::

Sõnum ise ([HTTP päring ja vastus](./http-paring-ja-vastus.md)) on kõigis versioonides sisuliselt sama: meetod, tee, päised, keha. Erinevus on selles, **kuidas** sõnumid ühenduse kaudu liiguvad.

## HTTP/1.1: üks päring korraga ühenduse kohta

HTTP/1.1-s peab brauser iga samaaegse päringu jaoks tavaliselt avama uue TCP-ühenduse (brauserid piiravad seda tavaliselt ~6 ühendusega päritolu kohta). Kui leht laeb 30 pilti, konkureerivad need piiratud arvu ühenduste pärast.

```text
Ühendus 1: --- päring A --- vastus A --- päring D --- vastus D ---
Ühendus 2: --- päring B --- vastus B -------------------------
Ühendus 3: --- päring C --- vastus C -------------------------
```

Kui üks vastus viibib, blokeerib see sama ühenduse järgmisi päringuid — seda nimetatakse *head-of-line blocking*'uks.

## HTTP/2: multipleksimine ühel ühendusel

HTTP/2 saadab kõik päringud/vastused **ühe** TCP-ühenduse peal paralleelselt, jagades need väikesteks kaadriteks (*frames*), mis põimuvad omavahel ja pannakse vastuvõtjal uuesti kokku:

```text
Üks TCP-ühendus:
  [A-kaader][B-kaader][A-kaader][C-kaader][B-kaader]...
```

See vähendab uute TCP- ja TLS-käepigistuste arvu ([Veebipäringu teekond](./paringuteekond.md)) ja lahendab HTTP/1.1 ühenduste-vahelise piirangu. Kuid kuna HTTP/2 töötab endiselt TCP peal, blokeerib **ühe paketi kadu** ikkagi kõiki selle TCP-ühenduse päringuid, kuni pakett uuesti saadetakse — TCP tasandi *head-of-line blocking* jääb alles.

## HTTP/3: TCP asemel QUIC

HTTP/3 ei kasuta enam TCP-d, vaid UDP-põhist protokolli nimega QUIC. QUIC toob multipleksimise otse transpordikihile, nii et ühe voo (*stream*) paketi kadu ei blokeeri enam teisi vooge samal ühendusel. QUIC lõimib ka TLS-käepigistuse enda sisse, mistõttu uue ühenduse loomine vajab vähem edasi-tagasi käike kui TCP+TLS eraldi.

| | HTTP/1.1 | HTTP/2 | HTTP/3 |
| --- | --- | --- | --- |
| Transport | TCP | TCP | QUIC (UDP) |
| Ühendusi päritolu kohta | mitu | üks | üks |
| Päringute multipleksimine | ei | jah | jah |
| Paketikao mõju | blokeerib ühenduse | blokeerib ühenduse (TCP tasand) | mõjutab ainult üht voogu |

Server ja klient peavad versiooni osas kokku leppima — vana server vastab ikka HTTP/1.1-ga, uus server võib pakkuda HTTP/2 või HTTP/3, kui brauser seda toetab.

## Praktiline uurimine

Ava DevToolsi Network-paneel ([Network-paneel](./network-paneel.md)) ja lisa veergude ribale (paremklõps päisel) veerg **Protocol**.

1. Laadi mõni leht uuesti.
2. Leia päring, mis kasutab `h2` (HTTP/2) ja päring, mis kasutab `h3` või `h3-*` (HTTP/3), kui selliseid leidub.
3. Võrdle sama päritolu päringute arvu paralleelsust HTTP/1.1 ja HTTP/2 puhul.

## Allikad

- Old Dominion University CS 431/531: [HTTP/2 and HTTP/3](https://cs531-f19.github.io/slides/lecture-10-http2-http3.pdf)
- Ilya Grigorik, [*High Performance Browser Networking* — HTTP/2 peatükk](https://hpbn.co/http2/)
