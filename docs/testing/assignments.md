# Testimise ülesanded

## Ülesanne 1: Jest seadistamine ja esimesed testid

Seadista Jest projekt nullist ja kirjuta testid järgmistele funktsioonidele:

- `canBook(capacity, currentBookings)` — kontrollib, kas broneerida saab
- `validateEmail(email)` — kontrollib emaili formaati
- `divide(a, b)` — jagamine koos veakäsitlusega

Kasuta TDD tsüklit: Red → Green → Refactor.

Täpsemad juhised leiad [testimise aluste peatükist](/testing/fundamentals).

---

## Ülesanne 2: Mock repository ja service kihi testimine

Kirjuta unit testid `BookingService` klassile, kasutades mock repository objekte.

Testi järgmisi stsenaariume:
- Broneeringu loomine õnnestub
- Workshop on täis → viga
- Kasutaja on juba broneerinud → viga
- Workshop ei eksisteeri → viga

Täpsemad juhised leiad [praktilise töötoa peatükist](/testing/workshop).

---

## Ülesanne 3: Integration testid Supertestiga

Kirjuta integration testid Express API endpointidele:

- `GET /health` → 200
- `POST /users` → kasutaja loomine + veajuhtumid
- `POST /workshops` → workshop loomine + veajuhtumid
- `POST /bookings` → broneeringu loomine + ärireeglite kontroll

Täpsemad juhised leiad [praktilise töötoa peatükist](/testing/workshop).
