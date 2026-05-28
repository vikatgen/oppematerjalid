# Rakenduste loomine — sissejuhatus moodulisse

::: info
See moodul aitab sul liikuda esimese aasta HTML/CSS/Tailwind/JS projektidest professionaalse veebiarenduse töövoogu. Eesmärk ei ole ainult uusi tööriistu paigaldada, vaid **mõista, miks** neid kasutatakse ja **kuidas** need koos töötavad.
:::

## Miks seda moodulit vajame?

Esimesel aastal saad veebilehe valmis HTML-i, CSS-i ja JavaScripti abil. See töötab, kuid projekt kasvades tekivad uued probleemid:

- failid muutuvad raskesti hallatavaks
- API võtmed satuvad kogemata koodi sisse
- meeskonnas on iga arendaja kood erineva stiiliga
- lehe avaldamine nõuab käsitsi failide kopeerimist

Professionaalses arenduses ei alusta iga projekt nullist — kasutatakse **templatet**, kus on juba paigas vajalikud tööriistad ja seadistused.

Selle mooduli lõpuks **ehitad sellise template'i ise samm-sammult** — iga peatükk lisab ühe uue osa — ja paned valmis projekti GitHubis template repository'ks.

---

## Meie läbiv projekt: sinu veebi template

Kogu moodul toimub ühes projektis, mida loed **nullist**:

1. Lood tühja kausta ja Git repository
2. Lisad tööriistu ükshaaval (iga peatükk üks teema)
3. Pushid valmis projekti GitHubi
4. Märgid repo **template repository'ks**

Järgmised projektid algavad nii: **Use this template → clone → npm install → npm run dev**.

---

## Õpieesmärgid

Selle mooduli lõpuks peaks õppija:

- oskama luua Vite projekti nullist
- mõistma, miks bundlerit ja arendusserverit kasutatakse
- oskama kasutada `.env` faili ja `import.meta.env` muutujaid
- mõistma erinevust arendusserveri, build'i ja preview vahel
- oskama seadistada Tailwind CSS, ESLinti ja Prettierit
- oskama avaldada projekti GitHubis template repository'na
- oskama selgitada, miks iga tööriist projektis on

---

## Soovitatud õppejärjekord

1. [Eelteadmiste kordamine](/rakenduste-loomine/eelteadmiste-kordamine) — terminal, Git, npm, projekti alustamine
2. [Bundler ja Vite](/rakenduste-loomine/bundler-ja-vite) — miks professionaalne keskkond?
3. [Projekti loomine nullist](/rakenduste-loomine/projekti-loomine-nullist) — Vite ja esimene `npm run dev`
4. [Keskkonnamuutujad Vite'iga](/rakenduste-loomine/keskkonnamuutujad-vitega) — `.env` ja konfiguratsioon
5. [Build ja preview](/rakenduste-loomine/build-ja-preview) — produktsiooniks valmistamine
6. [Tailwind Vite'iga](/rakenduste-loomine/tailwind-vitega) — CSS raamistik
7. [ESLint](/rakenduste-loomine/eslint) — koodi kvaliteet
8. [Prettier ja koodistiil](/rakenduste-loomine/prettier-ja-koodistiil) — ühtne vormindus
9. [Template repository GitHubis](/rakenduste-loomine/template-repository-githubis) — avaldamine ja taaskasutus
10. [Ülesanded](/rakenduste-loomine/assignments) — iseseisev harjutamine

---

## Eeltingimused

Enne alustamist peaks sul olema:

- HTML, CSS/Tailwind ja JavaScripti alused ([JavaScript moodul](/javascript/sissejuhatus-moodulisse))
- terminali ja Giti põhitõed ([Arendusvahendid I](/arendusvahendid-i/sissejuhatus))
- Node.js paigaldatud (kasuta õpetaja määratud **LTS** versiooni)
- GitHubi konto

::: tip Alusta kordamisega
Ära hüppa otse Vite juurde. Veendu esmalt, et oskad terminalis liikuda, Giti kasutada ja `npm init` käivitada. [Eelteadmiste kordamine](/rakenduste-loomine/eelteadmiste-kordamine) aitab seda kiirelt üle vaadata.
:::
