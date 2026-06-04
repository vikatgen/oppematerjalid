# Strict mode

```"use strict";``` - strict mode ehk range režiim toodi JavaScripti **ECMAScript 5** versioonis.

```"use strict"``` ehk range režiim muudab JavaScripti koodi paremaks kahel peamisel viisil: suurendades turvalisust ja võimaldades mootoritel koodi kiiremini käivitada.

**Turvalisuse suurendamine ja vigade vältimine**

-  **Vaiksete vigade asendamine:** Range režiim muudab JavaScripti senised "vaiksed vead" (vead, mis varem koodi ei seiskunud, kuid võisid põhjustada ootamatut käitumist) reaalseteks vigadeks, mis viskavad erindi.
-  **Deklareerimata muutujate keeld:** Üks olulisemaid turvameetmeid on see, et muutujat ei saa kasutada ilma seda deklareerimata (näiteks ```let```, ```const``` abil). Kui tavarežiimis loob deklareerimata muutujale väärtuse omistamine (nt ```x = 3.14;```) automaatselt uue globaalse muutuja, siis ranges režiimis annab see süsteemse vea. See hoiab ära juhuslikud lekked globaalsesse skoopi.
-  **Tuleviku ühilduvus:** See keelab teatud süntaksi ja märksõnad, mida võidakse kasutusele võtta ECMAScripti tulevastes versioonides.

**Koodi kiiruse parandamine**
- **Mootori optimeerimine:** JavaScripti mootoritel (nt brauserites) on keeruline optimeerida koodi, mis on segane või halvasti struktureeritud. Range režiim parandab koodis teatud ebakõlad, mis teevad **JavaScripti mootoritele optimeerimise lihtsamaks.**
- **Efektiivsem täitmine:** Tänu neile parandustele ja selgemale struktuurile võib range režiimi kood joosta mõnikord **kiiremini** kui identne kood, mis ei ole ranges režiimis.

**Rakendamine**

Range režiimi sisselülitamiseks lisatakse skripti või funktsiooni algusesse tekstiline direktiiv ```"use strict";```. Oluline on märkida, et kaasaegsetes JavaScripti struktuurides, nagu klassid ja moodulid, on range režiim automaatselt sisse lülitatud ja direktiivi eraldi lisamine pole vajalik.

-------