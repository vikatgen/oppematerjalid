# Õpetaja juhend: Reacti mõtteviis

## Kohtumise tulemus

Õppija selgitab deklaratiivse kasutajaliidese põhimõtet ning jagab etteantud vaate põhjendatud komponentideks.

## Soovituslik ajakava

| Aeg | Tegevus |
|---|---|
| 0–10 min | Näita lõpurakenduse kavandit ja kogu õppijate pakutud komponendid tahvlile. |
| 10–25 min | Korda DOM-i käsitsi muutmist loenduri näite abil. |
| 25–40 min | Võrdle imperatiivset ja deklaratiivset lähenemist. |
| 40–55 min | Tutvusta komponenti ning komponendi definitsiooni ja eksemplari erinevust. |
| 55–75 min | Õppijad koostavad paaris artiklite kataloogi komponentide puu. |
| 75–85 min | Võrrelge lahendusi ja põhjendage erinevaid komponentide piire. |
| 85–90 min | Individuaalne väljumisküsimus. |

## Demo käik

1. Käivita või näita tavalise JavaScripti loendurit.
2. Lisa reegel, mis keelab nupu kümne vajutuse järel.
3. Küsi enne koodi lisamist, milliseid DOM-i osi peab nüüd muutma.
4. Näita sama vaadet Reacti JSX-ina.
5. Ära õpeta veel `useState` süntaksit detailselt. Keskendu seosele `state → JSX → DOM`.

## Küsimused õppijatele

- Milline väärtus kirjeldab praegu kasutajaliidese olekut?
- Millised ekraani osad sõltuvad väärtusest `count`?
- Kumb näide kirjeldab tulemust ja kumb muutmise samme?
- Milline osa artiklite kataloogis kordub?
- Millisel komponendil peaks olema vastutus kuvada üks artikkel?

## Tüüpilised väärarusaamad

### React uuendab iga muudatuse korral kogu HTML-lehte

Täpsusta, et React käivitab komponendi funktsiooni uue tulemuse arvutamiseks ja rakendab DOM-is vajalikud muudatused. Brauser ei laadi selle tõttu kogu dokumenti uuesti.

### Iga HTML-element peab olema eraldi komponent

Komponendi piir vajab põhjust. Üksik `div` või pealkiri ei vaja tavaliselt eraldi komponenti, kui see ei kordu ega täida iseseisvat ülesannet.

### Komponent on sama asi mis HTML-element

HTML-element on brauseri sisseehitatud element. Reacti komponent on meie kirjutatud funktsioon, mis võib tagastada mitu omavahel seotud elementi.

### React asendab JavaScripti

Reacti komponendid ja sündmuste töötlejad on JavaScript. JSX on süntaks, mida arendustööriistad teisendavad JavaScriptiks.

## Abistamise piir

Esimese vihjena palu õppijal leida lehe kolm suurt ala. Seejärel palu leida korduv kasutajaliidese osa. Ära anna kohe ette tervet komponentide puud.

## Hindamise tõendid

Õppija saavutas kohtumise tulemuse, kui ta:

- eristab DOM-i muutmise samme kasutajaliidese kirjelduse tulemusest;
- nimetab komponentide puus vanem- ja alamkomponendid;
- kasutab korduvate artiklikaartide jaoks ühte komponendi tüüpi;
- põhjendab vähemalt ühe komponendi piiri selle vastutuse või korduvuse kaudu.

## Väljumisküsimus

> Üks väärtus `cartCount` peab muutma navigatsiooni loendurit, tühja ostukorvi teadet ja tellimisnupu olekut. Selgita ühe või kahe lausega, miks aitab deklaratiivne kasutajaliides neid kooskõlas hoida.

Võimalik vastus: kõik kolm elementi kirjeldatakse sama `cartCount` väärtuse põhjal. Väärtuse muutumisel arvutab React nende uue kuvatava tulemuse.

## Diferentseerimine

- Raskustes õppijale anna kasutajaliidese suurte alade nimed ja lase tal paigutada ainult alamkomponendid.
- Kiire õppija võib lisada detailvaate komponentide puu ning otsustada, millised komponendid on loendivaatega ühised.
