# Õiguste süsteem

## Õpieesmärgid

Selle peatüki lõpuks peaks õppija:

- oskama lugeda `ls -l` väljundit (omanik, grupp, õigused)
- mõistma erinevust failide ja kataloogide `r`, `w`, `x` õiguste vahel
- oskama muuta õigusi käsuga `chmod` (sümbol- ja numbriviis)
- oskama muuta faili omanikku ja gruppi (`chown`, `chgrp`)
- oskama valida turvalisi õigusi arenduskeskkonnas

---

# 1. Miks õigused on olulised?

Linuxis kontrollib **õiguste süsteem**, kes tohib faile lugeda, muuta või käivitada. Iga fail ja kataloog kuulub kasutajale (omanik) ja grupile — nagu õppisid [Kasutajad ja grupid](/linux/kasutajad-ja-grupid) peatükis.

Arendajana puutud õigustega kokku igal pool:

- skript ei käivitu, kui puudub `x` õigus
- `.env` fail on loetav teistele kasutajatele, kui õigused on liiga laiad
- Dockeri või Giti projekt ei tööta, kui kausta õigused on valed

::: tip Alusta alati väikestest õigustest
Anna ainult need õigused, mida tegelikult vaja on. Näiteks privaatne võti: `600`, skript: `755`, tavaline tekstifail: `644`.
:::

---

# 2. Õiguste vaatamine

```bash
ls -l                  # lihtne vaade
ls -la                 # näitab ka peidetud faile
```

**Näide väljundist:**

```text
-rwxrw-r-- 1 juku developers  1245 mai 28 14:30 script.sh
```

### Väljundi selgitus

| Osa | Tähendus |
|-----|----------|
| `-rwxrw-r--` | Õigused (10 tähemärki) |
| `1` | Linkide arv |
| `juku` | Omanik (owner) |
| `developers` | Grupp (group) |
| `1245` | Faili suurus (baitides) |
| `mai 28 14:30` | Viimane muutmise aeg |
| `script.sh` | Faili nimi |

### Õiguste tähendus (`rwxrw-r--`)

```text
- rwx   → omanik (owner)
  rw-   → grupp (group)
  r--   → teised (others)
```

| Täht | Tähendus | Failide puhul | Kataloogide puhul |
|------|----------|---------------|-------------------|
| `r` | Read (lugemine) | Faili sisu lugemine | Kataloogi sisu nägemine |
| `w` | Write (kirjutamine) | Faili muutmine | Failide lisamine/kustutamine |
| `x` | Execute (käivitamine) | Faili käivitamine | Kataloogi sisse minek (`cd`) |

Esimene märk (`-`) näitab faili tüüpi: `-` on tavaline fail, `d` on kataloog.

---

# 3. Õiguste muutmine — `chmod`

## Sümbolviis (kergem mõista)

```bash
chmod u+x fail.sh          # lisa omanikule execute õigus
chmod g+w fail.txt         # lisa grupile write õigus
chmod o-r fail.txt         # eemalda teistelt read õigus
chmod a+x script.sh        # lisa kõigile (u, g, o) execute
chmod u=rw,go=r fail.txt   # täpne määramine
```

Tähed: `u` = user (omanik), `g` = group, `o` = others, `a` = all.

## Numbriviis (kiirem, professionaalne)

Iga õiguste grupp saab numbri:

- `r = 4`
- `w = 2`
- `x = 1`

Liidetakse kokku: `rwx` = 4 + 2 + 1 = **7**, `rw-` = 4 + 2 = **6**, `r--` = **4**.

**Kõige levinumad kombinatsioonid:**

| Õigused | Number | Tähendus |
|---------|--------|----------|
| `rwxrwxrwx` | 777 | Kõik saavad kõike teha |
| `rwxr-xr-x` | 755 | Omanik teeb kõike, teised loevad/käivitavad |
| `rw-rw-r--` | 664 | Omanik ja grupp saavad lugeda/kirjutada |
| `rw-r--r--` | 644 | Omanik kirjutab, teised ainult loevad |
| `rwx------` | 700 | Ainult omanik |

::: warning Ära kasuta 777 tootmises
`chmod 777` annab kõigile täielikud õigused. Arenduses võib see ajutiselt probleemi lahendada, kuid serveris on see ohtlik — kasuta pigem `755` või `644`.
:::

**Näited:**

```bash
chmod 755 script.sh
chmod 644 dokument.txt
chmod 600 privaatne.key
```

---

# 4. Omaniku ja grupi muutmine

```bash
chown juku fail.txt              # muuda omanik
chown juku:developers fail.txt   # muuda omanik + grupp
chgrp developers fail.txt        # muuda ainult gruppi
```

Kataloogi rekursiivselt (kõik failid ja alamkaustad):

```bash
chown -R juku:developers ~/projektid/
```

::: tip `chown` nõuab tavaliselt sudo-d
Sa saad omanikuks muuta ainult faile, mis juba kuuluvad sulle — teiste kasutajate faile muudab `sudo chown ...`.
:::

---

# 5. Ülesanded

1. Loo fail `test.txt` ja vaata selle õigusi (`ls -l`).
2. Muuda õigusi nii, et ainult sina saad seda lugeda ja kirjutada (`chmod 600 test.txt`).
3. Loo skript `tervitus.sh` (nt `echo "Tere!"`), anna talle käivitamisõigus (`chmod 755 tervitus.sh`) ja käivita see.
4. Loo kataloog `projekt` ja anna grupile õigused lugeda ja kirjutada (`chmod 775 projekt` või `chmod g+rwx projekt`).
5. Proovi `su - teine_kasutaja` (vt [Kasutajad ja grupid](/linux/kasutajad-ja-grupid)) ja vaata, mida teine kasutaja sinu faile näeb.

Kui käsk annab veateate „Permission denied“, vaata [Tõrkeotsingu töövoog](/arendusvahendid-i/troubleshooting).
