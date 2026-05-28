# Kasutajad ja grupid

## Õpieesmärgid

Selle peatüki lõpuks peaks õppija:

- mõistma, mis on Linuxi kasutajakonto ja grupp
- oskama luua uue kasutaja käsuga `adduser`
- oskama lisada kasutaja gruppidesse (`sudo`, `docker`, `adm`)
- oskama sisse logida teise kasutajana (`su`)
- oskama seadistada WSL-i vaikimisi kasutaja
- oskama kontrollida kasutaja- ja grupiinfot (`whoami`, `id`, `/etc/passwd`, `/etc/group`)

---

# 1. Mis on kasutajad ja grupid?

**Kasutajakonto** on Linuxis identiteet, mille kaudu süsteem teab, kes tegevusi teeb. Igal kasutajal on oma kodukaust (tavaliselt `/home/kasutajanimi`), parool ja õigused teatud failidele ja käskudele.

**Grupp** grupeerib kasutajaid ühiste õiguste jaoks. Näiteks:

- `sudo` — administraatori õigused (`sudo` käsu kasutamine)
- `docker` — Dockeri käivitamine ilma `sudo`-ta
- `adm` — süsteemi logide lugemine

Arendajana on oluline, et sinu tavakasutaja kuuluks vajalikesse gruppidesse, kuid ei töötaks pidevalt `root` kasutajana.

::: warning WSL ja root kasutaja
WSL käivitub tihti vaikimisi `root` kasutajana. See on ohtlik harjumus — `root`-ina saab kogemata süsteemi faile rikkuda. Soovitame seadistada vaikimisi kasutajaks oma tavakasutaja (vt jaotis 4).
:::

---

# 2. Uue kasutaja loomine

Soovitatav viis uue kasutaja loomiseks:

```bash
sudo adduser kasutajanimi
```

**Näide** (asenda `juku` oma kasutajanimega):

```bash
sudo adduser juku
```

See käsk loob:

- kasutaja `juku`
- kodukausta `/home/juku`
- küsib parooli ja lisainfot (võid vajutada Enter, kui pole vaja lisada)

---

# 3. Kasutaja lisamine gruppidesse

```bash
sudo usermod -aG sudo juku           # administraatori õigused
sudo usermod -aG docker juku         # Dockeri kasutamine
sudo usermod -aG adm juku            # süsteemi logid
```

**Mitme grupiga korraga:**

```bash
sudo usermod -aG sudo,docker,adm juku
```

::: tip Grupi muudatused jõustuvad pärast uuesti sisselogimist
Kui lisasid end uude gruppi, logi WSL-ist välja ja ava uuesti — või kasuta `su - kasutajanimi`, et gruppide muudatused jõustuksid.
:::

---

# 4. Sisselogimine teise kasutajana

```bash
su - juku
```

Käsul `su -` logitakse sisse teise kasutajana koos tema keskkonnaga (sh kodukaust).

Tagasi eelmise kasutaja juurde naasmiseks:

```bash
exit
```

---

# 5. WSL-i vaikimisi kasutaja muutmine

WSL käivitub sageli `root` kasutajana. Soovitame muuta vaikimisi kasutajaks oma tavakasutaja.

### Samm 1: muuda konfiguratsiooni faili

```bash
sudo nano /etc/wsl.conf
```

### Samm 2: lisa faili sisu

```ini
[user]
default=juku
```

Asenda `juku` oma kasutajanimega.

### Samm 3: salvesta fail

Salvesta (`Ctrl+O` → `Enter` → `Ctrl+X`).

### Samm 4: taaskäivita WSL Windows PowerShellis

```powershell
wsl --shutdown
```

Seejärel ava WSL uuesti — nüüd peaksid olema juba oma kasutajana. Kontrolli:

```bash
whoami
```

---

# 6. Kasulikud käsud

| Käsk | Kirjeldus |
|------|-----------|
| `whoami` | Näitab praegust kasutajat |
| `id` | Näitab kasutajat ja tema gruppe |
| `id juku` | Teise kasutaja info |
| `groups` | Praeguse kasutaja grupid |
| `cat /etc/passwd` | Kõik süsteemi kasutajad |
| `cat /etc/group` | Kõik grupid |
| `sudo passwd juku` | Muudab kasutaja parooli |
| `sudo userdel -r juku` | Kustutab kasutaja koos kodukaustaga |

Kui käsk annab veateate „Permission denied“, vaata [Tõrkeotsingu töövoog](/arendusvahendid-i/troubleshooting) — seal on selgitatud, miks `sudo` ei pruugi alati õige lahendus olla.

---

# 7. Ülesanded

1. Loo uus kasutaja oma nimega (näiteks `minu_nimi_dev`).
2. Lisa see kasutaja gruppidesse `sudo` ja `docker`.
3. Muuda WSL-i vaikimisi kasutajaks oma uus kasutaja.
4. Logi sisse uue kasutajana ja kontrolli `whoami`.
5. Loo kodukaustas kataloog `~/projektid` ja `~/harjutused`.
