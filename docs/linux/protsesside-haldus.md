# Protsesside haldus

## Õpieesmärgid

Selle peatüki lõpuks peaks õppija:

- mõistma, mis on Linuxi protsess ja PID
- oskama vaadata jooksvaid protsesse (`ps`, `ps aux`)
- oskama jälgida protsesse reaalajas (`top`, `htop`)
- oskama protsessi peatada või lõpetada (`kill`, `pkill`)
- oskama käivitada programme taustal ja hallata jobs'e (`&`, `jobs`, `fg`, `bg`)
- oskama otsida protsesse nime järgi (`pgrep`)

---

# 1. Mis on protsess?

Linuxis on **protsess** programm, mis töötab arvutis. Iga käsk, teenus või taustaprogramm on üks või mitu protsessi.

Igal protsessil on **PID** (Process ID) — unikaalne number, millega seda saab tuvastada ja hallata.

Arendajana puutud protsessidega kokku igal pool:

- arendusserver (`npm run dev`) jookseb taustal
- port on hõivatud, sest vana protsess ei lõppenud
- Dockeri konteinerid on eraldi protsessid
- serveri koormust vaadatakse `htop` abil

---

# 2. Protsesside vaatamine

```bash
ps                       # praeguse kasutaja protsessid
ps aux                   # täpsem väljund (soovitatav)
ps -u $(whoami)          # ainult oma protsessid
```

**Kõige kasulikum käsk alguses:**

```bash
ps aux | head -n 15
```

`ps aux` veerud:

| Veerg | Tähendus |
|-------|----------|
| `USER` | Protsessi omanik |
| `PID` | Protsessi ID |
| `%CPU` | Protsessori kasutus |
| `%MEM` | Mälu kasutus |
| `COMMAND` | Käivitatud programm |

---

# 3. Reaalajas protsesside jälgimine

```bash
top
```

`top` on vaikimisi olemas — näitab protsesse reaalajas. Väljumiseks vajuta `q`.

Mugavam alternatiiv on **htop**:

```bash
sudo apt update && sudo apt install htop -y
htop
```

`htop` on interaktiivsem: nooltega liikumine, F9 protsessi lõpetamiseks jne.

---

# 4. Protsessi peatamine ja lõpetamine

```bash
kill 1234              # saada protsessile signaal (lõpetab viisakalt)
kill -9 1234           # sunniviisiline lõpetamine (SIGKILL)
pkill -f "firefox"     # otsi protsessi nime järgi ja lõpeta
killall firefox        # lõpeta kõik sama nimega protsessid
```

`kill` ilma `-9`-ta annab protsessile võimaluse korralikult sulguda. `-9` kasuta ainult siis, kui protsess ei reageeri.

::: warning Ära lõpeta süsteemi protsesse
Ära lõpeta olulisi süsteemi protsesse (nt PID 1). Kui ei ole kindel, küsi õpetajalt. Harjutuses lõpeta ainult protsesse, mida ise käivitasid (nt `sleep`).
:::

---

# 5. Taustaprogrammid ja jobs

Kui käivitad käsu terminalis, jookseb see tavaliselt **esiplaanil** (foreground) — terminal ootab, kuni programm lõpeb, ja sa ei saa samal ajal uusi käske sisestada.

**Job** on shelli mõiste: töö, mille oled käivitanud **selles terminaliaknas**. Job võib olla:

- **esiplaanil** — aktiivne programm, millega hetkel suhtled (nt `nano`)
- **taustal** (background) — programm jookseb edasi, aga terminal on vaba uute käskude jaoks
- **peatatud** — programm on ajutiselt seiskunud (`Ctrl+Z`)

Käsk **`jobs`** näitab selle terminali job'e — mitte kõiki süsteemi protsesse (selleks on `ps`). Igal job'il on number, mida kasutatakse `fg` ja `bg` käskudes (nt `%1`).

```bash
sleep 100 &            # käivita programm taustal
jobs                   # vaata taustal jooksvaid töid
fg %1                  # too taustalt ette
```

Programmi ajutiseks peatamiseks vajuta `Ctrl+Z`, seejärel saad saata ta tagasi tausta:

```bash
bg %1                  # jätka taustal
```

---

# 6. Kasulikud käsud

| Käsk | Kirjeldus |
|------|-----------|
| `ps aux` | Kõik protsessid süsteemis |
| `ps -ef` | Täielik protsesside puu |
| `top` | Reaalajas protsesside jälgimine |
| `htop` | Parema kasutajaliidesega top |
| `pgrep -f nimi` | Otsib protsessi nime järgi |
| `pkill -f nimi` | Lõpetab protsessi nime järgi |
| `kill -9 PID` | Sunniviisiline lõpetamine |
| `jobs` | Selle terminali taustal jooksvad või peatatud tööd |

---

# 7. Ülesanded

1. Vaata `ps aux` abil, millised protsessid praegu jooksevad.
2. Installi `htop` ja vaata, kuidas see töötab.
3. Käivita `sleep 60 &` mitu korda ja vaata tulemust käsuga `jobs`.
4. Otsi üles üks `sleep` protsess käsuga `pgrep -f sleep` ja lõpeta see käsuga `kill`.
5. Käivita `nano`, vajuta `Ctrl+Z`, seejärel too see tagasi käsuga `fg`.

Kui port on hõivatud või protsess ei lõpe, vaata ka [Tõrkeotsingu töövoog](/arendusvahendid-i/troubleshooting).
