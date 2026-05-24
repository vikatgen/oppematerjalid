# Markdown ja README

## Õpieesmärgid

Selle peatüki lõpuks peaks õppija:

- mõistma, miks dokumentatsioon on arenduses oluline
- oskama kirjutada lihtsat Markdowni
- oskama koostada projekti `README.md` faili
- mõistma, millist infot README peaks sisaldama

---

# 1. Miks arendaja dokumentatsiooni kirjutab?

Kood ütleb arvutile, mida teha. Dokumentatsioon aitab inimesel aru saada, mis projekt see on, kuidas seda käivitada ja kuidas seda kasutada.

Dokumentatsioon on oluline ka siis, kui töötad üksi. Mõne nädala pärast ei pruugi enam täpselt meeles olla:

- millist käsku projekt vajab
- millist Node.js versiooni kasutati
- kust projekt alguse saab
- millised keskkonnamuutujad on vajalikud

Hea dokumentatsioon vähendab küsimusi ja aitab projekti kiiremini käima saada.

---

# 2. Mis on Markdown?

Markdown on lihtne tekstivorming, millega saab kirjutada pealkirju, nimekirju, linke, koodiplokke ja muud dokumentatsiooni.

Markdowni failide laiend on tavaliselt `.md`.

Näited:

- `README.md`
- `assignments.md`
- `notes.md`

GitHub ja paljud dokumentatsioonisüsteemid oskavad Markdowni ilusaks veebileheks kuvada.

---

# 3. Pealkirjad

Markdownis tehakse pealkirju `#` märgiga.

```md
# Pealkiri 1
## Pealkiri 2
### Pealkiri 3
```

Tavaliselt on lehel üks suur `#` pealkiri ja selle all väiksemad alapealkirjad.

---

# 4. Nimekirjad

Tavaline nimekiri:

```md
- esimene punkt
- teine punkt
- kolmas punkt
```

Nummerdatud nimekiri:

```md
1. Esimene samm
2. Teine samm
3. Kolmas samm
```

Nummerdatud nimekirja kasuta siis, kui järjekord on oluline.

---

# 5. Lingid ja kood

Link:

```md
[GitHub](https://github.com)
```

Inline kood:

```md
Käivita käsk `npm install`.
```

Mitmerealine koodiplokk:

````md
```bash
npm install
npm run dev
```
````

Koodiplokkide juures on hea lisada keele nimi, näiteks `bash`, `js` või `json`. See aitab koodi paremini esile tõsta.

---

# 6. README.md

`README.md` on projekti esmane dokumentatsioon. Kui keegi avab projekti GitHubis, näeb ta tavaliselt README faili esimesena.

Hea README vastab küsimustele:

- mis projekt see on?
- kuidas projekt käima panna?
- milliseid tööriistu on vaja?
- milliseid käske peab kasutama?
- kas on vaja keskkonnamuutujaid?

---

# 7. Lihtne README struktuur

Näide:

````md
# Minu projekt

Lühike kirjeldus, mida projekt teeb.

## Vajalikud tööriistad

- Node.js 20
- npm

## Paigaldamine

```bash
npm install
```

## Käivitamine

```bash
npm run dev
```

## Märkused

Projekt kasutab `.env` faili lokaalse seadistuse jaoks.
````

Selline README ei pea olema pikk. Tähtis on, et järgmine inimene saaks projekti käima.

---

# 8. Hea dokumentatsiooni harjumus

Kui lisad projekti uue käsu või seadistuse, uuenda ka README faili.

Näiteks kui lisad käsu:

```json
{
  "scripts": {
    "dev": "vite --host 0.0.0.0"
  }
}
```

siis README-s võiks olla kirjas:

````md
Arendusserveri käivitamine:

```bash
npm run dev
```
````

Dokumentatsioon ei ole eraldi asi peale arendust. See on osa arendusest.
