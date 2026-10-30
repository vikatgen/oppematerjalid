# Interaktiivsed komponendid

## Millal lisada

Ainult siis, kui mõiste on **protsess, millel on harud või muutuv olek** (päringu teekond, tehing, voog). Määratluse jaoks pole komponenti vaja. Lehel on kõige rohkem üks komponent ja leht peab olema arusaadav ka ilma selleta.

## Ülesehitus

```
components/
  StepSimulator.vue            ühine põhi: olukord → ennustus → sammud → tulemus
  <teema>/
    <nimi>Simulation.mjs       puhas funktsioon (ilma Vue'ta), testitav
    <Nimi>Simulator.vue        õhuke ümbris: valikud, ennustused, `#state` pilu
tests/
  <teema>-<nimi>.test.mjs      node:test, käivitub `npm test` ja CI-s enne buildi
```

Olemasolevad:

| Komponent | Leht | Tüüp |
| --- | --- | --- |
| `RequestSimulator` | backend 1: päringu ja vastuse tsükkel | `StepSimulator` |
| `PublishSimulator` | backend 2: kihid | `StepSimulator` |
| `DtoPlayground` | backend 3: DTO | Oma komponent (JSON-i redaktor, tulemus uueneb kohe), sest samme pole. Loogika on ikka eraldi `dtoSimulation.mjs`-is |
| `MiddlewareOrder` | backend 4: middleware ja veatöötlus | Oma komponent (järjestamise ülesanne nooltega, 4 päringut kontrollitakse korraga). Loogika `middlewareSimulation.mjs`-is |
| `SchemaExplorer` | backend 5: andmebaas ja seosed | Oma komponent (tegevused kuhjuvad, tabelid näitavad lisatud, muudetud ja kustutatud ridu). Loogika `schemaSimulation.mjs`-is |
| `MigrationLab` | backend 6: ORM ja migratsioonid | Oma komponent (failid ja kolm andmebaasi). Loogika `migrationSimulation.mjs`-is |
| `TransactionSimulator` | backend 7: tehingud ja konkurents | `StepSimulator`, kihid Ostja A, Ostja B, Andmebaas. Iga samm kannab andmebaasi seisu (`db`) |

Kui teema ei ole samm-sammult teekond (nt redaktor või järjestamine), tee oma komponent, aga hoia sama kuju: puhas loogika eraldi, testid, samad CSS-muutujad (`--vp-c-*`), mobiilivaade ja `aria-live` tulemuse juures.

## Uue simulaatori lisamine

1. Kirjuta `simulate(settings)`, mis tagastab `{ steps, ... }`. Iga samm: `{ layer, title, explanation }`, valikuliselt `rejected`, `response: { code, body }` ja oma lipud (nt `read`, `write`).
2. Kirjuta testid kõigile valikute kombinatsioonidele.
3. Tee ümbris, mis annab `StepSimulator`-ile `settings`, `predictions`, `layers`, `simulate`, `request`, `checkPrediction`, `describeOutcome` ning täidab `#state` pilu (vasakpoolne tulemuse paneel).
4. Registreeri komponent `theme/index.ts`-is ja kasuta markdownis `<NimiSimulator />`.

Simulatsioon peab vastama `event-management-api` päris käitumisele (staatusekoodid, kontrollide järjekord).
