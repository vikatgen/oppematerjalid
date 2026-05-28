# Bundler ja Vite

## Õpieesmärgid

Selle peatüki lõpuks peaks õppija:

- oskama selgitada, miks lihtne HTML/CSS/JS projekt aja jooksul kitsaks jääb
- mõistma bundleri rolli veebiarenduses
- oskama nimetada, mida Vite arenduse ajal teeb
- mõistma, miks bundlerid vajavad Node.js keskkonda

---

## Vanast projektist professionaalsesse keskkonda

Esimesel aastal võis sinu projekt välja näha nii:

```text
my-website/
├── index.html
├── style.css
└── app.js
```

Brauser laadib need failid otse. Väikeses projektis see sobib.

Kui projekt kasvab, tekivad probleemid:

- palju JS faile — iga fail on eraldi HTTP päring
- API võti on koodis sees — oht lekkeks
- CSS ja JS pole optimeeritud — aeglane laadimine
- meeskonnas erinev koodistiil — raske lugeda

Professionaalne lahendus on **arenduskeskkond**, mis aitab neid probleeme lahendada.

---

# 1. Mis on bundler?

**Bundler** (moodulite komplekteerija) on tööriist, mis:

1. loeb projekti failid (JS, CSS, pildid)
2. jälgib `import`/`require` sõltuvusi
3. pakib need kokku optimeeritud failideks (**bundle**)

```text
app.js + utils.js + api.js + style.css
        ↓ bundler
    dist/assets/index-abc123.js
    dist/assets/index-def456.css
```

### Mida bundler teeb?

| Tegevus | Miks see oluline on |
|---------|---------------------|
| Sõltuvuste haldamine | Teab, millises järjekorras faile laadida |
| Failide kokkupakkimine | Vähem HTTP päringuid = kiirem leht |
| Minifitseerimine | Eemaldab tühikud ja kommentaarid |
| Tree-shaking | Eemaldab kasutamata koodi |
| Uue JS-i tugi | Teisendab ES6+ vanematele brauseritele |

---

# 2. Miks bundler vajab Node.js-i?

Bundlerid (Webpack, Vite, Parcel) on ise **Node.js rakendused**. Nad vajavad:

- **JavaScripti mootorit** — bundleri enda koodi käivitamiseks
- **npm-i** — pluginate ja teekide allalaadimiseks
- **failisüsteemi ligipääsu** — tuhande faili lugemiseks ja kirjutamiseks

Seetõttu käivitad terminalis käske nagu `npm run dev` — need käivitavad Node.js programmi, mis haldab sinu projekti.

Lisainfo: [Node.js, npm ja nvm](/arendusvahendid-i/nodejs-ja-nvm)

---

# 3. Mis on Vite?

**Vite** on kaasaegne bundler ja arendusserver. Me kasutame seda, sest:

- arendusserver käivitub **väga kiiresti**
- muudatused brauseris ilmuvad **kohe** (hot reload)
- build on lihtne: `npm run build`
- Tailwind, ESLint ja teised tööriistad integreeruvad hästi

Vite töötab kahes režiimis:

```text
Arendus (npm run dev)
  → Vite dev server
  → serveerib faile otse, kiire tagasiside

Produktsioon (npm run build)
  → Vite build
  → loob optimeeritud dist/ kausta
```

---

# 4. Arendus vs produktsioon

| | Arendus (`dev`) | Produktsioon (`build`) |
|--|-----------------|------------------------|
| Eesmärk | Kiire arendamine | Kiire veebileht kasutajale |
| Failid | Palju eraldi faile | Vähe optimeeritud faile |
| Kood | Loetav, kommentaaridega | Minifitseeritud |
| Server | Vite dev server | Staatiline hosting (nt GitHub Pages) |

Seda vahet uurime lähemalt peatükis [Build ja preview](/rakenduste-loomine/build-ja-preview).

---

# 5. dependencies vs devDependencies

Kui paigaldad Vite'i, lisatakse see `package.json` faili `devDependencies` sektsiooni:

```json
{
  "devDependencies": {
    "vite": "^6.0.0"
  }
}
```

**devDependencies** — tööriistad, mida vajad **ainult arenduse ajal** (bundler, linter, testid).

**dependencies** — teegid, mida rakendus vajab **töötamiseks** (nt UI raamistik).

Vite, ESLint ja Prettier on arendustööriistad — nad ei lähe lõppkasutajale kaasa.

Lisainfo: [npm ja package.json](/arendusvahendid-i/npm-ja-package-json)

---

## Kontrollpunkt

Vasta ise (kirjuta README-sse või märkmikku):

1. Miks ei piisa lihtsalt `index.html` + `app.js` struktuurist suuremas projektis?
2. Mis vahe on bundleril ja brauseril?
3. Mida Vite teeb käsu `npm run dev` käivitamisel?
4. Mis on `devDependencies`?

Kui suudad neile vastata, liigu edasi: [Projekti loomine nullist](/rakenduste-loomine/projekti-loomine-nullist).
