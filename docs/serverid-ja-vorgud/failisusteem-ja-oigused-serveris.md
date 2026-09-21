---
title: Failisüsteem ja failiõigused serveris
description: Linuxi failipuu, absoluutne ja suhteline tee, ning miks failiõigused serveris on rangemad kui sinu enda sülearvutis.
outline: deep
---

# Failisüsteem ja failiõigused serveris

::: info Õpiväljund
Pärast seda osa oskad leida serveris õiged kohad seadistuste ja logide jaoks, ning selgitada, miks üks konkreetne õiguste kombinatsioon (640) sobib serveri seadistusfailile paremini kui teised.
:::

## Meeskonna neljas küsimus sinule

Serverid on olemas ja ajakohased, aga tühjad. Enne kui saad sinna midagi paigaldada, pead oskama seal turvaliselt liikuda ja faile muuta — nii, et sa kogemata ei jäta salajast infot (nt tulevast andmebaasi parooli) kõigile serveris olevatele kasutajatele loetavaks.

::: tip Kui chmod ja ls -l on sulle juba tuttavad
Kui oled juba läbinud [Õiguste süsteem](/linux/oiguste-susteem) mooduli, tead juba `ls -l`, `chmod` ja `chown` põhitõdesid. Siin ei korda me seda kõike uuesti — vaatame, mis on **serveris** teisiti kui sinu enda sülearvuti WSL-keskkonnas.
:::

## Kust asjad serveris asuvad

Linuxi failisüsteem on nagu hoone kindlate osakondadega — faili asukoht juba ütleb midagi tema eesmärgi kohta:

| Kaust | Mis seal on |
| --- | --- |
| `/` | Juurkaust — kõik teised kaustad on selle "sees" |
| `/etc` | Teenuste **seadistusfailid** (nt hiljem `/etc/nginx`) |
| `/var` | **Muutuv** teenuseinfo — logid, andmebaasi failid |
| `/home` | Kasutajate kodukaustad, sinu oma on `/home/oppur` |

::: warning `/` ja `/root` ei ole sama asi
`/` on kogu failisüsteemi juur. `/root` on hoopis juurkasutaja (`root`) enda kodukaust — sama moodi nagu `/home/oppur` on kasutaja `oppur` kodu. Need kaks käivad tihti käsikäes segamini.
:::

## Absoluutne ja suhteline tee

**Absoluutne tee** algab alati kaldkriipsuga (`/`) ja viib samasse kohta, ükskõik millisest kaustast sa käsu käivitad — täpselt nagu täisaadress viib alati samasse majja. **Suhteline tee** sõltub sellest, kus sa **praegu** oled — nagu "järgmine uks" tähendab erinevat asja sõltuvalt sellest, kus sa parasjagu seisad. Kaks punkti (`..`) tähendab "üks kaust ülespoole".

::: tip `etc` ja `/etc` ei ole tavaliselt sama asi
`/etc` on absoluutne tee ja viib alati samasse kohta. Pelgalt `etc` on suhteline — see viitab kausta `etc` **praeguse asukoha sees**, mis on olemas ainult siis, kui juhtud olema täpselt kaustas `/`. Serverijuhendites kasutame süsteemsete failide puhul alati absoluutseid teid, et vältida segadust.
:::

## Miks just 640 serveri seadistusfailidele

Meenuta numbriviisi: `r=4`, `w=2`, `x=1`. `640` tähendab: omanikule `rw` (4+2=6), grupile ainult `r` (4), teistele mitte midagi (0).

See ei ole suvaline valik. Serveri seadistusfailid sisaldavad hiljem päris asju, mida kaitsta — andmebaasi paroole, API võtmeid. Serveris võib olla mitu kasutajakontot (nt sina ja kolleegid), ja "teised" (`others`) tähendab siin **kõiki neist**, kes ei ole faili omanik ega selle grupi liige. `640` tagab, et need inimesed ei näe faili sisu üldse, samas kui grupi liikmed (kellele see spetsiifiliselt vajalik on) saavad seda vähemalt lugeda.

::: warning Teenuse kasutaja pole sina
Kui fail on sulle (`oppur`) loetav, ei tähenda see, et see on loetav ka teenusele, mis seda faili päriselt kasutama peab. Nginx näiteks ei tööta tingimata sinu kasutajana, vaid oma eraldi teenusekasutajana — see tähendab, et faili nähtavust tuleb kontrollida **selle teenuse kasutaja vaates**, mitte oma enda kasutaja vaates. Sellele tuleme tagasi, kui hakkame Nginxit seadistama.
:::

## Käed külge: loo ja kaitse fail srv1 peal

Käivita järgmised käsud srv1 terminalis (VirtualBoxi konsoolil), ükshaaval.

```bash
pwd
```

Näitab su praeguse töökataloogi täielikku (absoluutset) teed — tavaliselt `/home/oppur`. Ilma seda teadmata ei saa suhtelistest teedest aru.

```bash
ls -la
```

`-l` näitab detaile (omanik, grupp, õigused), `-a` ka peidetud kirjeid (nt `.ssh` kaust, millest räägime järgmises osas).

```bash
mkdir -p ~/labor
```

Loob kausta `labor` sinu kodukaustas. `-p` ei anna viga, kui vanemkaust juba on olemas — kasulik harjumus, mis säästab hiljem tüütuid vigu.

```bash
nano ~/labor/selgitus.txt
```

Ava fail redaktoris ja kirjuta paar lauset serveri rollist. Salvesta `Ctrl+O`, `Enter`, ja välju `Ctrl+X`.

```bash
chmod 640 ~/labor/selgitus.txt
```

Määrab õigused, millest eespool rääkisime.

```bash
ls -l ~/labor/selgitus.txt
```

Kontrolli tulemust — rida peaks algama täpselt `-rw-r-----`.

::: tip Proovi kohe katki teha
Muuda faili õigused ajutiselt olematuks (`chmod 000 ~/labor/selgitus.txt`), proovi faili sisu vaadata (`cat ~/labor/selgitus.txt`) — peaksid saama "Permission denied". Taasta seejärel `chmod 640 ~/labor/selgitus.txt` ja kontrolli uuesti `ls -l`-ga. See tõestab, et number tegelikult midagi reaalselt mõjutab, mitte ainult teoorias.
:::

## Ketas ja mälu — kaks eri asja

```bash
df -h
```

Näitab, kui palju kettaruumi on failisüsteemidel vaba. `-h` tähendab inimloetavaid ühikuid (GB, MB) suvaliste baitide asemel. Täis ketas võib hiljem katkestada nii andmebaasi kui ka logimise — tasub osata seda kontrollida.

```bash
free -h
```

Näitab RAM-i ja swapi kasutust. Pane tähele eriti `available` veergu. See on eraldi asi kettaruumist: üks ei asenda teist, kuigi swap saab osaliselt mäluga seotud survet leevendada.

## Kokkuvõte

| Käsk / mõiste | Mida see näitab |
| --- | --- |
| `pwd` | praegune asukoht (absoluutse tee jaoks vajalik) |
| `/etc`, `/var`, `/home` | seadistused, muutuv teenuseinfo, kasutajate kodud |
| `chmod 640` | omanik rw, grupp r, teised mitte midagi — sobib seadistusfailile |
| `df -h` / `free -h` | ketta- ja mäluruum — kaks erinevat piirangut |

## Allikad

- [Linux Filesystem Hierarchy Standard (FHS)](https://refspecs.linuxfoundation.org/FHS_3.0/fhs-3.0.html)
- [Õiguste süsteem (chmod, chown põhitõed)](/linux/oiguste-susteem)
