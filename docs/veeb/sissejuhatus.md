---
title: Kuidas veeb töötab?
description: Õpi kirjeldama veebipäringu teekonda brauserist serverini ja vastuse jõudmist rakenduseni.
outline: deep
---

# Kuidas veeb töötab?

::: info Tulemus
Pärast teema läbimist oskad Network-paneelis nähtava päringu põhjal kirjeldada, kuhu päring saadeti, mida serverilt küsiti ja kuidas server vastas.
:::

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

## Teemad

1. [Veebipäringu teekond](./paringuteekond.md)
2. [URL, domeen ja DNS](./url-domeen-ja-dns.md)
3. [HTTP päring ja vastus](./http-paring-ja-vastus.md)
4. [HTTP meetodid ja staatusekoodid](./meetodid-ja-staatusekoodid.md)
5. [Päritolu ja CORS](./cors.md)
6. [Päringu uurimine Network-paneelis](./network-paneel.md)

## Seos teiste teemadega

- JavaScripti `fetch()` saadab HTTP-päringu.
- Node.js server võtab päringu vastu ja koostab vastuse.
- API testimine kontrollib vastuse käitumist.
- Nginx võib päringu enne Node.js rakendust vastu võtta.

HTTP mõistmine ühendab need teemad üheks tervikuks.
