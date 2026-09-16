---
title: 7.2 Privaatsus ja andmeturve
description: Miks ei tohi tundlikke andmeid AI-vestlusesse kirjutada — Itaalia ChatGPT keelu ja Samsungi andmelekke näidetel.
---

# 7.2 Privaatsus ja andmeturve

::: tip Selle tunni järel...
- tead, mis juhtub sinu poolt AI-vestlusesse kirjutatud infoga;
- tead kaht reaalset juhtumit, kus andmete hooletu jagamine AI-tööriistaga tõi tõsiseid tagajärgi;
- oskad nimetada lihtsa reegli, mida tundliku info AI-le andmisel järgida.
:::

## Kuhu läheb see, mida sa AI-le kirjutad?

Kui sisestad teksti vestlusassistenti, ei kao see info kohe pärast vastuse saamist. Sõltuvalt tööriistast ja selle seadetest võib see: säilida sinu vestlusajaloos, olla nähtav tööriista pakkuja töötajatele turvalisuse/kuritarvituse kontrolliks, või teatud juhtudel isegi kasutusel mudeli edasisel treenimisel (kui vastavat seadet pole välja lülitatud). See ei tähenda, et tööriistad on "kurjad" — see tähendab, et **tundliku info AI-le sisestamine väärib sama ettevaatust kui selle saatmine e-kirjaga võõrale teenusepakkujale.**

## Itaalia keelustas ChatGPT ajutiselt (2023)

2023. aasta märtsis andis Itaalia andmekaitseamet (Garante) korralduse, mis kohustas OpenAI-d ajutiselt peatama ChatGPT kasutajate isikuandmete töötlemise Itaalias — esimene riik, mis ChatGPT sel moel ajutiselt keelustas. Põhjendused hõlmasid:
- puudulikku infot kasutajatele selle kohta, milliseid andmeid kogutakse;
- ebaselget õiguslikku alust isikuandmete kasutamiseks mudeli treenimisel;
- vanusekontrolli puudumist;
- ühte teatamata jäänud turvaintsidenti (andmeleket) 2023. aasta märtsis.

OpenAI taastas ligipääsu ligi kuu aja pärast, olles lisanud läbipaistvusteate, vanusekontrolli ja kasutajaõigused (nt õigus oma andmeid mudeli treenimisest keelata). 2024. aasta lõpus määras Garante OpenAI-le siiski **15 miljoni euro suuruse trahvi** just selle 2023. aasta turvaintsidendi teatamata jätmise ja ebapiisava õigusliku aluse eest ([The Hacker News, 2024](https://thehackernews.com/2024/12/italy-fines-openai-15-million-for.html); [Clifford Chance, 2023](https://www.cliffordchance.com/insights/resources/blogs/talking-tech/en/articles/2023/04/the-italian-data-protection-authority-halts-chatgpt-s-data-proce.html)).

## Samsungi töötajad lekitasid ärisaladusi ChatGPT-sse (2023)

20 päeva jooksul pärast seda, kui Samsung lubas töötajatel ChatGPT-d kasutada, juhtus vähemalt kolm intsidenti:
1. Insener kopeeris vigase pooljuhi andmebaasi **lähtekoodi** ChatGPT-sse, et paluda abi vea leidmisel.
2. Teine töötaja jagas konfidentsiaalset koodi, üritades leida lahendust defektsele seadmele.
3. Kolmas töötaja laadis üles terve **sisekoosoleku salvestuse** ja palus sellest koosolekuprotokolli teha.

Kõik kolm juhtumit tähendasid, et Samsungi ärisaladused jõudsid välisesse teenusesse, mille üle ettevõttel puudub kontroll. Samsung keelustas seepeale töötajatele avalike vestlusassistentide kasutamise ja hoiatas, et reeglite rikkumine võib kaasa tuua töölepingu lõpetamise ([Forbes, 2023](https://www.forbes.com/sites/siladityaray/2023/05/02/samsung-bans-chatgpt-and-other-chatbots-for-employees-after-sensitive-code-leak/)).

::: danger See on täpselt see risk, mida OWASP nimetab "Sensitive Information Disclosure"
Mõlemad juhtumid on reaalsed näited riskist, mille turvaorganisatsioon OWASP on tõstnud oma AI-rakenduste riskide nimekirjas teisele kohale — vaatame seda raamistikku täpsemalt [tunnis 7.4](./tund-04-riskijuhtimise-raamistikud).
:::

## Praktiline reegel

Enne tundliku info AI-vestlusesse kirjutamist küsi endalt: *"Kas ma saadaksin selle info e-kirjaga täiesti võõrale ettevõttele?"* Kui vastus on ei, ära seda ka AI-le kirjuta — vähemalt mitte tavalisse tarbijaversiooni. Ettevõtte tasandil lahendavad seda tavaliselt spetsiaalsed ärikontod (nt ChatGPT Enterprise, Claude Enterprise), mille lepingutingimused garanteerivad, et sisestatud andmeid mudeli treenimiseks **ei kasutata**.

## Kokkuvõte

Privaatsusrisk ei ole hüpoteetiline — Itaalia ja Samsungi juhtumid näitavad, et see realiseerub kiiresti ja reaalsete tagajärgedega, nii regulaatori trahvi kui ka ärisaladuse kaotuse näol. Lihtne teadlikkus sellest, kuhu info liigub, väldib enamikku probleemidest.

## Viited ja lisalugemine

- [The Hacker News — Italy Fines OpenAI €15 Million (2024)](https://thehackernews.com/2024/12/italy-fines-openai-15-million-for.html)
- [Clifford Chance — Itaalia andmekaitseameti ChatGPT otsus (2023)](https://www.cliffordchance.com/insights/resources/blogs/talking-tech/en/articles/2023/04/the-italian-data-protection-authority-halts-chatgpt-s-data-proce.html)
- [Forbes — Samsung Bans ChatGPT After Sensitive Code Leak (2023)](https://www.forbes.com/sites/siladityaray/2023/05/02/samsung-bans-chatgpt-and-other-chatbots-for-employees-after-sensitive-code-leak/)
