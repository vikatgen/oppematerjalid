---
title: 9.2 N-gramm mudelid — esimene matemaatiline keelemudel
description: Tingimuslik tõenäosus, maksimaalse tõepära valem, silumine ja n-gramm mudelite piirangud.
---

# 9.2 N-gramm mudelid — esimene matemaatiline keelemudel

::: tip Selle tunni järel...
- oskad arvutada bigramm-mudeli tõenäosuse käsitsi, väikese näitekorpuse pealt;
- tunned valemit `P(wi | wi-1) = C(wi-1, wi) / C(wi-1)` ja tead, mida iga tähis tähendab;
- tead, miks nähtud andmetes puuduolev sõnapaar ei tähenda, et see on keeleliselt võimatu, ja mida silumine (*smoothing*) selle vastu teeb;
- oskad nimetada kolm n-gramm mudelite piirangut, mis viivad meid järgmise tunni juurde.
:::

## Kõige lihtsam matemaatiline mudel

[Eelmine tund](./tund-01-mis-on-keelemudel) tutvustas ideed: keelemudel annab lausele või sõnale usutavuse numbri. **N-gramm mudel** on ajalooliselt esimene ja lihtsaim viis see number tegelikult arvutada.

Idee: sõna tõenäosus sõltub piiratud arvust vahetult eelnevatest sõnadest.

- **Unigramm** — arvestab 0 eelnevat sõna (lihtsalt, kui sage see sõna üldiselt on).
- **Bigramm** — arvestab 1 eelnevat sõna.
- **Trigramm** — arvestab 2 eelnevat sõna.

Mudelisse sisenevaks ühikuks (*token*, vt [tund 2.4](/tehisintellekt/moodul-02-kuidas-ai-tootab/tund-04-tokenid)) saab olla täht, sõna või sõnaosa — allpool kasutame sõnu, sest need on kõige intuitiivsemad.

## Tingimuslik tõenäosus: "koer sööb konti"

Võtame lause *"koer sööb konti"* ja küsime: mis on sõna "konti" tõenäosus?

- **Unigramm**: `P("konti")` — kui sage on "konti" üldiselt tekstis, ilma kontekstita.
- **Bigramm**: `P("konti" | "sööb")` — kui sage on "konti" pärast sõna "sööb".
- **Trigramm**: `P("konti" | "koer sööb")` — kui sage on "konti" pärast sõnapaari "koer sööb".

Igaüks neist on **tingimuslik tõenäosus** — mitte "kui sage on X üldiselt", vaid "kui sage on X, arvestades, mis oli enne" (tähis `|` loetakse "tingimusel, et" või "arvestades, et").

## Terve lause tõenäosus: ahelreegel

N-gramm mudel arvutab hõlpsalt üksiku sõna tõenäosuse konteksti järel, aga tihti on vaja **terve lause** tõenäosust. Selle saab ligikaudselt arvutada, korrutades kokku kõikide sõnade tingimuslikud tõenäosused — nagu teatejooksus, kus iga sõna "annab teatepulga" edasi:

```
P("koer sööb konti") =
    P(koer | <s>) × P(sööb | koer) × P(konti | sööb) × P(</s> | konti)
```

Siin tähistavad `<s>` ja `</s>` lause algust ja lõppu — nn pseudo-sõnad, mis lasevad mudelil arvestada ka esimese sõna ja lause lõpu tõenäosust, mitte ainult keskel olevaid sõnu.

## Kust need tõenäosused tegelikult tulevad? Maksimaalse tõepära meetod

Kõik ülalolev on kasutu, kuni pole selge, **kust need arvud tulevad**. Vastus on lihtne: loendamine.

Sõnadesse pandult: *"kui sageli tuli sõna "sööb" pärast sõna "koer", jagatud kõigi kordadega, kui sõna "koer" üldse esines"*.

Sama mõte, aga lühema tähistusega (kus `C(x)` tähendab "kui palju kordi x tekstikorpuses esines"):

```
P(wi | wi-1) = C(wi-1, wi) / C(wi-1)
```

### Näide arvudega

Olgu meie kogu treeningkorpus (teadlikult naeruväärselt väike, et saaks käsitsi loendada) kolm lauset:

```
<s> I am Sam </s>
<s> Sam I am </s>
<s> I do not like green eggs and ham </s>
```

Loeme käsitsi:

- Sõna "I" tuleb pärast `<s>` 2 korral (1. ja 3. lause), `<s>` esineb kokku 3 korral → `P(I | <s>) = 2/3 ≈ 0,67`
- "Sam" tuleb pärast `<s>` 1 korral → `P(Sam | <s>) = 1/3 ≈ 0,33`
- "I" esineb kokku 3 korda, ja "am" tuleb pärast seda 2 korda (1. ja 2. lause) → `P(am | I) = 2/3 ≈ 0,67`
- "am" esineb 2 korda, "Sam" tuleb pärast seda 1 korra → `P(Sam | am) = 1/2 = 0,5`
- "Sam" esineb 2 korda, `</s>` tuleb pärast seda 1 korra → `P(</s> | Sam) = 1/2 = 0,5`
- "I" esineb 3 korda, "do" tuleb pärast seda 1 korra → `P(do | I) = 1/3 ≈ 0,33`

See on kogu maksimaalse tõepära meetod — ei mingit muud "õppimist", ainult loendus ja jagamine.

## Probleem: nulltõenäosused

Mis on lause `<s> I like </s>` tõenäosus, kasutades sama kolme-lausega korpust?

`P(I | <s>) = 0,67`, aga "I" ei ole selles korpuses **kunagi** järgnenud sõnaga "like" — seega `P(like | I) = 0`. Ja `0,67 × 0 = 0`.

Maksimaalse tõepära meetod annab kõigile treeningandmetes nägematutele sõnapaaridele automaatselt **0 tõenäosuse** — mis tähendaks, et lause on keeleliselt võimatu. Aga tegelikult on "I like" täiesti tavaline ingliskeelne sõnapaar — probleem ei ole see, et see on võimatu, vaid see, et **meie treeningkorpus on liiga väike**, et seda juhust näidata.

## Lahendus: silumine (*smoothing*)

Reaalsete, suurte treeningkorpuste puhul on samamoodi — ükskõik kui suur korpus, ikka jääb haruldasi, aga täiesti võimalikke sõnapaare, mida see ei sisalda. Lahenduseks on **silumine**: võetakse veidi tõenäosusmassi sageli nähtud sõnapaaridelt ("rikkad") ja antakse veidi ka haruldastele või nägematutele sõnapaaridele ("vaesed") — nagu Robin Hood.

See tagab, et miski ei saa täpselt 0 tõenäosust, ja mudel "üldistab" pisut paremini nähtud näidetest kaugemale. 1990ndatest kuni 2000ndateni oli suur osa keelemudelite teadusest just erinevate silumismeetodite (nt Witten-Bell, Kneser-Ney) täiustamine.

## Kolm piirangut, mis viivad edasi

N-gramm mudelid on lihtsad ja kiired, aga neil on kolm olulist piirangut:

1. **Ei oska seostada sarnase tähendusega sõnu.** Mudel arvutab "she bought a car" ja "she purchased a car" täiesti eraldi statistikaga — ta ei "tea", et "bought" ja "purchased" tähendavad ühte ja sama, kuigi need on kirjapildilt täiesti erinevad.
2. **Ei oska sõnu "vahele jätta".** "koer sööb mullast konti" ja "koer sööb hiigelsuurt konti" — mudel peab neid täiesti erinevateks n-grammideks, kuigi tuum ("koer sööb ... konti") on sama.
3. **Kontekst on väga piiratud.** Sõna-põhiste mudelite puhul kasutatakse tavaliselt maksimaalselt 4-grammi (3 eelnevat sõna) — pikema konteksti lisamine ei aita enam palju, sest sama pika sõnajada nägemine treeningandmetes muutub üha haruldasemaks.

Kõik kolm piirangut lahendab osaliselt üks ja seesama idee — **sõnavektorid**, millest juba põgusalt juttu oli [tunnis 2.4](/tehisintellekt/moodul-02-kuidas-ai-tootab/tund-04-tokenid). [Järgmine tund](./tund-03-sonavektorid-ja-narvivorgud) süveneb sellesse.

## Viited ja lisalugemine

- Jurafsky, D. & Martin, J. H. — [Speech and Language Processing, ptk 3: N-gram Language Models](https://web.stanford.edu/~jurafsky/slp3/3.pdf)
- [Wikipedia — N-gram language model](https://en.wikipedia.org/wiki/Word_n-gram_language_model)
- [Wikipedia — Additive smoothing](https://en.wikipedia.org/wiki/Additive_smoothing)
