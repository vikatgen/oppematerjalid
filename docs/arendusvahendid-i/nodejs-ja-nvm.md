# Node.js, npm ja nvm

## Õpieesmärgid

Selle peatüki lõpuks peaks õppija:

- mõistma Node.js ja npm rolli veebiarenduses
- oskama kontrollida Node.js ja npm versiooni
- mõistma, miks Node.js versioonihaldurit kasutatakse
- oskama kontrollida, kas Node.js tuleb `nvm` kaudu
- oskama kasutada projekti jaoks sobivat Node.js versiooni

---

# 1. Mis on Node.js?

Node.js võimaldab JavaScripti käivitada väljaspool brauserit. Veebiarenduses kasutatakse seda näiteks:

- arendusserverite käivitamiseks
- sõltuvuste paigaldamiseks
- build-protsesside käivitamiseks
- backend-rakenduste loomiseks

Node.js paigaldusega tuleb tavaliselt kaasa ka `npm`.

---

# 2. Mis on npm?

`npm` on Node.js paketihaldur. Selle abil paigaldatakse ja käivitatakse JavaScripti projekti sõltuvusi.

Näited:

```bash
npm install
npm run dev
npm run build
```

Projektis olevad käsud on tavaliselt kirjas failis `package.json`.

---

# 3. Node.js ja npm kontrollimine

Node.js versioon:

```bash
node -v
```

npm versioon:

```bash
npm -v
```

Käsu asukoht:

```bash
which node
which npm
```

Kui kasutusel on `nvm`, võib asukoht olla näiteks:

```bash
/Users/student/.nvm/versions/node/v20.11.1/bin/node
```

Kui asukoht on näiteks `/usr/local/bin/node`, võib Node.js olla paigaldatud muu tööriistaga.

---

# 4. Mis on nvm?

`nvm` tähendab **Node Version Manager**. See võimaldab arvutis hoida mitut Node.js versiooni ja nende vahel vahetada.

See on kasulik, sest erinevad projektid võivad vajada erinevat Node.js versiooni.

Näiteks:

- üks projekt kasutab Node.js 18
- teine projekt kasutab Node.js 20
- uus projekt kasutab Node.js 22

Ilma versioonihaldurita võib versioonide vahetamine olla tülikas ja tekitada konflikte.

---

# 5. nvm kontrollimine

`nvm` olemasolu kontroll:

```bash
nvm --version
```

Kui käsk ei tööta, võib põhjus olla üks neist:

- `nvm` pole paigaldatud
- shelli seadistusfail ei lae `nvm` seadistust
- terminal tuleb uuesti avada

Kontrolli ka shelli seadistusfaili:

```bash
echo $SHELL
```

zsh puhul peaks `~/.zshrc` failis olema `nvm` laadimise osa. See võib välja näha näiteks nii:

```bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
```

---

# 6. Node.js versiooni paigaldamine nvm abil

Viimase LTS versiooni paigaldamine:

```bash
nvm install --lts
```

Kindla versiooni paigaldamine:

```bash
nvm install 20
```

Versiooni kasutamine:

```bash
nvm use 20
```

Vaikimisi versiooni määramine:

```bash
nvm alias default 20
```

Paigaldatud versioonide vaatamine:

```bash
nvm ls
```

---

# 7. Projekti Node.js versioon

Projektis võib olla fail `.nvmrc`, kus on kirjas soovitud Node.js versioon.

Näide `.nvmrc` sisust:

```text
20
```

Sellises projektis saab kasutada:

```bash
nvm use
```

Kui vajalik versioon pole veel paigaldatud:

```bash
nvm install
```

---

# 8. Levinud probleemid

Kui `node -v` töötab, aga projekt ei käivitu, kontrolli:

- kas oled õiges projektikaustas
- kas `npm install` on tehtud
- kas projekt vajab kindlat Node.js versiooni
- kas `package.json` sisaldab käsku, mida käivitad

Näiteks kui käsk `npm run dev` ei tööta, vaata esmalt `package.json` faili `scripts` osa.
