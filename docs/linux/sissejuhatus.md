# Linux — sissejuhatus moodulisse

::: info
See moodul tutvustab Linuxi põhitõdesid tarkvaraarendaja vaatenurgast. Kooliarvutites töötab **WSL** (Windows Subsystem for Linux), kus igal õpilasel on oma Linuxi keskkond.
:::

## Miks seda moodulit vajame?

Arendajana puutud tihti kokku Linuxi-põhiste tööriistadega: terminal, Docker, serverid ja CI/CD keskkonnad. Enne kui saad neid kasutada, pead mõistma, kuidas Linux kasutajaid, gruppe ja õigusi haldab.

Kui WSL on valesti seadistatud — näiteks käivitub alati `root` kasutajana — muutub igapäevane arendus ebamugavaks ja ohtlikuks. See moodul aitab seadistada keskkonna korrektselt ja mõista, miks see oluline on.

---

## Õpieesmärgid

Selle mooduli lõpuks peaks õppija:

- mõistma Linuxi kasutajakonto ja grupi rolli
- oskama luua uue kasutaja ja lisada ta vajalikesse gruppidesse
- oskama vahetada kasutajat terminalis (`su`)
- oskama seadistada WSL-i vaikimisi kasutaja
- oskama kontrollida kasutaja- ja grupiinfot (`whoami`, `id`, `/etc/passwd`, `/etc/group`)
- oskama lugeda ja muuta failiõigusi (`ls -l`, `chmod`, `chown`)
- oskama vaadata ja hallata protsesse (`ps`, `kill`, `htop`)

---

## Soovitatud õppejärjekord

1. [Kasutajad ja grupid](/linux/kasutajad-ja-grupid) — kasutaja loomine, grupid, WSL seadistus
2. [Õiguste süsteem](/linux/oiguste-susteem) — `ls -l`, `chmod`, `chown`
3. [Protsesside haldus](/linux/protsesside-haldus) — `ps`, `kill`, taustatööd

---

## Eeltingimused

Enne alustamist peaks sul olema:

- terminali ja shelli alused ([Terminal ja shell](/arendusvahendid-i/terminal-ja-shell))
- arusaam failisüsteemist ja kaustadest ([Arendusvahendid I](/arendusvahendid-i/sissejuhatus))
- WSL paigaldatud kooliarvutis

::: tip WSL taaskäivitamine
Kui muudad WSL-i seadistust (`/etc/wsl.conf`), pead WSL-i Windowsis taaskäivitama:

```powershell
wsl --shutdown
```

Seejärel ava WSL uuesti.
:::
