# Tailwind Vite'iga

## Õpieesmärgid

Selle peatüki lõpuks peaks õppija:

- oskama seadistada Tailwind CSS v4 Vite projektis
- mõistma `@tailwindcss/vite` plugina rolli
- oskama kasutada Tailwind utility-klasside HTML-is
- oskama kontrollida, et Tailwind töötab nii dev kui build režiimis

---

## Tailwind meie projektis

Tailwind CSS võimaldab stiile kirjutada otse HTML klassidena:

```html
<button class="bg-blue-500 text-white px-4 py-2 rounded">
  Nupp
</button>
```

Seda oled juba varem kasutanud. Nüüd integreerime Tailwindi **Vite build-protsessi**, et stiilid optimeeritaks produktsioonis automaatselt.

Dokumentatsioon: [Tailwind CSS](https://tailwindcss.com/docs)

---

# 1. Paigalda Tailwind

```bash
npm install -D tailwindcss @tailwindcss/vite
```

`-D` lipp lisab paketid `devDependencies` sektsiooni — need on arendustööriistad, mitte lõppkasutaja sõltuvused.

---

# 2. Seadista Vite plugin

Loo või uuenda `vite.config.js`:

```js
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [tailwindcss()],
});
```

Plugin ütleb Vite'ile: "töötle CSS-i Tailwindi reeglite järgi".

---

# 3. Lisa Tailwind CSS faili

Ava `style.css` ja lisa ülemisse ritta:

```css
@import "tailwindcss";
```

Veendu, et `index.html` viitab CSS failile:

```html
<link rel="stylesheet" href="/style.css" />
```

---

# 4. Kasuta klasse HTML-is

Lisa või muuda elemente Tailwind klassidega:

```html
<h1 class="text-3xl font-bold text-gray-900 mb-4">
  Minu veebi template
</h1>

<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
  <!-- sisu -->
</div>
```

---

# 5. Kontrolli dev ja build režiimis

**Arendus:**

```bash
npm run dev
```

Muuda Tailwind klassi — muudatus peaks kohe brauseris nähtav olema.

**Produktsioon:**

```bash
npm run build
npm run preview
```

Tailwind genereerib build'i ajal ainult **kasutatud** klassid — lõpp-CSS on väike.

---

## Miks Tailwind + Vite?

| Ilma bundlerita | Vite + Tailwind |
|-----------------|-----------------|
| Kogu Tailwind CSS fail brauserisse | Ainult kasutatud klassid |
| Käsitsi CSS failide haldamine | Automaatne optimeerimine build'is |
| CDN link (aeglane, suur) | Kohalik, optimeeritud |

---

## Kontrollpunkt

1. `vite.config.js` sisaldab `tailwindcss()` pluginat
2. `style.css` sisaldab `@import "tailwindcss";`
3. HTML-is on Tailwind klassid ja need on brauseris nähtavad
4. `npm run build` + `npm run preview` näitab stiile korrektselt

Commit pärast Tailwindi lisamist:

```bash
git add .
git commit -m "Lisa Tailwind CSS"
```

Kui Tailwind töötab, liigu edasi: [ESLint](/rakenduste-loomine/eslint).
