# Arendusvahendid I ülesanded

## Ülesanne 1: Terminalis liikumine

1. Ava terminal.
2. Kontrolli, millises kaustas oled.
3. Liigu kodukausta.
4. Loo kaust `arendusvahendid-harjutus`.
5. Liigu loodud kausta.
6. Loo fail `README.md`.
7. Kontrolli kausta sisu käsuga `ls -la`.

Kirjuta üles käsud, mida kasutasid.

---

## Ülesanne 2: Shelli kontroll

Kontrolli oma arvutis:

- millist shelli kasutad
- kus asub shelli seadistusfail
- kas sul on olemas `.zshrc` või `.bashrc`
- kas oskad seadistusfaili tekstiredaktoris avada

Lisa seadistusfaili alias:

```bash
alias ll="ls -la"
```

Lae seadistus uuesti ja kontrolli, kas `ll` töötab.

---

## Ülesanne 3: PATH uurimine

Kontrolli järgmiste käskude asukohta:

```bash
which node
which npm
```

Seejärel vaata `PATH` muutujat:

```bash
echo $PATH
```

Vasta lühidalt:

- millised käsud olid olemas?
- millised käsud puudusid?
- millistest kaustadest shell programme otsib?

---

## Ülesanne 4: Node.js ja nvm

Kontrolli:

```bash
node -v
npm -v
nvm --version
nvm ls
```

Kui `nvm` on olemas, paigalda või vali õpetaja määratud Node.js versioon.

Näide:

```bash
nvm install 20
nvm use 20
node -v
```

Kirjuta üles, millist Node.js versiooni kasutad.

---

## Ülesanne 5: Arenduskeskkonna raport

Koosta lühike raport failis `README.md`.

Raportis peab olema:

- operatsioonisüsteem
- kasutatav shell
- Node.js versioon
- npm versioon
- nvm versioon või märge, et seda pole
- üks probleem, mis tekkis, ja kuidas seda lahendasid
