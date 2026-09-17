---
title: Internet
description: Õpi tundma interneti ja veebi toimimise aluseid ning kirjeldama veebipäringu teekonda brauserist serverini.
outline: deep
---

# Internet

::: info Tulemus
Pärast teema läbimist oskad Network-paneelis nähtava päringu põhjal kirjeldada, kuhu päring saadeti, mida serverilt küsiti ja kuidas server vastas.
:::

Internet ühendab seadmed ja võrgud. Veeb on üks interneti kaudu töötav teenus, mida kasutame brauseriga veebilehtede ja -rakenduste avamiseks.

Veebirakendus ei koosne ainult JavaScriptist. Brauser, võrk ja server suhtlevad kokkulepete abil, millest tähtsaim on HTTP.

```text
kasutaja tegevus
→ URL
→ HTTP-päring
→ server
→ HTTP-vastus
→ brauser
→ kasutajaliides
```

## Miks seda vaja on?

Kui rakendus ei saa andmeid, pead oskama eristada:

- kas URL on vale;
- kas päring jõudis serverini;
- kas server tagastas vea;
- kas vastuse keha on oodatud kujuga;
- kas brauser blokeeris vastuse CORS-i tõttu.

## Kuidas veeb töötab?

1. [Veebipäringu teekond](./paringuteekond.md)
2. [URL, domeen ja DNS](./url-domeen-ja-dns.md)
3. [HTTP päring ja vastus](./http-paring-ja-vastus.md)
4. [HTTP meetodid ja staatusekoodid](./meetodid-ja-staatusekoodid.md)
5. [Küpsised ja sessioonid](./kupsised-ja-sessioonid.md)
6. [Päritolu ja CORS](./cors.md)
7. [HTTP/1.1, HTTP/2 ja HTTP/3](./http-versioonid.md)
8. [Päringu uurimine Network-paneelis](./network-paneel.md)

## Seos teiste teemadega

- JavaScripti `fetch()` saadab HTTP-päringu.
- Node.js server võtab päringu vastu ja koostab vastuse.
- API testimine kontrollib vastuse käitumist.
- Nginx võib päringu enne Node.js rakendust vastu võtta.

HTTP mõistmine ühendab need teemad üheks tervikuks.

## Kust edasi õppida?

Kui see teema huvi pakub, on olemas tasuta ülikoolikursused, kust võtta järgmine samm — enamik neist ei nõua registreerumist ega tasu.

### Täismahus ülikoolikursused

- **[Brown University — CSCI 1680: Computer Networks](https://brown-csci1680.github.io/)** — jooksev kursus, samad loengud, mida selle teema allikatena juba kasutasime (DNS, TCP, TLS). Sisaldab loengusalvestusi ja ülesandeid. Eeldab mõningast eelnevat programmeerimis- ja süsteemide kogemust.
- **[MIT OpenCourseWare — 6.033: Computer System Engineering](https://ocw.mit.edu/courses/6-033-computer-system-engineering-spring-2018/), nädalad 5–7** — bakalaureusetaseme materjal, vabalt loetavad loengukonspektid ja klassikaline lugemine (nt Clarki "Design Philosophy of the DARPA Internet Protocols"). Ei nõua kunagi sisselogimist ega tasu — see on MIT OCW põhimõte.
- **[MIT OpenCourseWare — 6.829: Computer Networks](https://ocw.mit.edu/courses/6-829-computer-networks-fall-2002/)** — sügavam, magistritaseme kursus, tugineb teadusartiklitele ja RFC-dele. Sobib, kui alused on juba selged ja tahad minna oluliselt sügavamale.

::: warning Stanfordi CS144 kohta
Stanfordi tuntud "Introduction to Computer Networking" (CS144) käib otsingumootorites tihti tasuta ülikoolikursusena ringi, kuid tegelikkuses on Stanford Online'i praegune versioon tasuline (u 6300 USD) ja vanem avalik arhiiv (2010) on osaliselt sisselogimise taga. Sellepärast pole see siin soovituste hulgas.
:::

### Professionaalsel tasemel lugemine

- **[MDN Web Docs — Learn web development](https://developer.mozilla.org/en-US/docs/Learn_web_development)** — sama allikas, mida kasutasime iga tunni juures, kuid täismahus struktureeritud õppekavana.
- **[web.dev/learn](https://web.dev/learn)** (Google) — HTTP, jõudluse ja turvalisuse süvendatud moodulid tööstuse tasemel.
- **Ilya Grigorik, [*High Performance Browser Networking*](https://hpbn.co/)** — tasuta veebiraamat, mida tsiteerisime TLS-i ja HTTP/2 juures; kogu raamat tasub läbi lugeda, kui võrgu toimimine huvitab.
- **[The Bits and Bytes of Computer Networking](https://www.coursera.org/learn/computer-networking)** (Google, Coursera) — algajasõbralik, tasuta audit-võimalusega kursus, mis katab võrgunduse aluseid laiemalt kui ainult veeb.
