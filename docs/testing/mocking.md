# Mockimine ja testitav kood

## Miks mockida?

Unit test peab olema **kiire ja isoleeritud**. Kui funktsioon loeb andmebaasist või teeb HTTP päringu, testid muutuvad aeglaseks ja ebastabiilseks.

**Mock** (või teised test double'id) asendab päris sõltuvuse kontrollitud versiooniga. Nii testid ainult **äriloogikat**, mitte Postgresi ega võrku.

---

## Õpieesmärgid

- Eristada test double tüüpe (stub, mock, fake, spy)
- Kasutada Vitest mock funktsioone
- Mõista dependency injection'i
- Tunda testitavat kihilist arhitektuuri

---

## 1. Test double'id

| Tüüp | Mida teeb | Näide |
|------|-----------|-------|
| **Dummy** | Ei tee midagi, täidab signatuuri | `{}` placeholder |
| **Stub** | Tagastab fikseeritud väärtuse | `() => 5` |
| **Fake** | Lihtsustatud implementatsioon | in-memory "andmebaas" |
| **Spy** | Salvestab, kuidas kutsuti | `vi.fn()` + kontroll |
| **Mock** | Stub + ootused väljakutsete kohta | `expect(mock).toHaveBeenCalledWith(...)` |

Vitestis kasutame peamiselt `vi.fn()` mockide jaoks.

---

## 2. Miks mitte päris andmebaasi unit testis?

```js
// Halb unit test — tegelikult integration test
const user = await db.user.create({ name: "Ada" });
expect(user.id).toBeDefined();
```

Probleemid: aeglane, sõltub Dockerist, ei ole deterministlik.

Unit test service kihile:

```js
import { describe, test, expect, vi, beforeEach } from "vitest";
import { BookingService } from "./bookingService.js";

describe("BookingService", () => {
  let mockRepo;

  beforeEach(() => {
    mockRepo = {
      countBookings: vi.fn(),
      createBooking: vi.fn()
    };
  });

  test("ei luba broneerida kui täis", async () => {
    mockRepo.countBookings.mockResolvedValue(10);

    const service = new BookingService(mockRepo, { capacity: 10 });

    await expect(service.createBooking(1, 1)).rejects.toThrow("Workshop is full");
    expect(mockRepo.createBooking).not.toHaveBeenCalled();
  });
});
```

---

## 3. Vitest mock API

```js
import { vi } from "vitest";

const fn = vi.fn();
fn.mockReturnValue(42);
fn.mockResolvedValue({ id: 1 }); // async

expect(fn).toHaveBeenCalled();
expect(fn).toHaveBeenCalledWith(1, "workshop");
expect(fn).toHaveBeenCalledTimes(1);
```

Mooduli mockimine:

```js
vi.mock("./database.js", () => ({
  getUser: vi.fn(() => ({ id: 1, name: "Ada" }))
}));
```

---

## 4. Dependency injection (DI)

**Halb** — kõva sõltuvus:

```js
import { prisma } from "./db.js";

export async function createBooking(data) {
  return prisma.booking.create({ data });
}
```

**Hea** — sõltuvus antakse sisse:

```js
export class BookingService {
  constructor(bookingRepository) {
    this.bookingRepository = bookingRepository;
  }

  async createBooking(workshopId, userId, capacity) {
    const count = await this.bookingRepository.countBookings(workshopId);
    if (count >= capacity) {
      throw new Error("Workshop is full");
    }
    return this.bookingRepository.createBooking({ workshopId, userId });
  }
}
```

Testis annad mock repository; tootmises päris repository.

---

## 5. Testitav arhitektuur — kihid

Probleem: kogu loogika ühes Express route'is.

```js
router.post("/bookings", async (req, res) => {
  const workshop = await prisma.workshop.findUnique({ ... });
  const count = await prisma.booking.count({ ... });
  // ... 30 rida ...
});
```

Lahendus: eralda vastutused.

```
Route → Controller → Service → Repository → Database
```

| Kiht | Vastutus |
|------|----------|
| Route | URL + HTTP meetod |
| Controller | req/res, validatsioon |
| Service | Äriloogika |
| Repository | Andmebaasi päringud |

**Service** on unit testide sihtmärk — mock repository, kiire test.

---

## 6. Millal mockida, millal mitte?

**Mocki unit testides**, kui:

- sõltuvus on aeglane (DB, HTTP)
- sõltuvus on ebastabiilne (väline API)
- tahad testida ainult ühte kihti

**Ära mocki integration testides**, kui:

- tahad kontrollida päris koostööd
- testid API + andmebaasi voogu

Liigne mockimine teeb testid habraks — mockitud käitumine ei pruugi vastata päris süsteemile.

---

## 7. Isolatsioon

- Ära kasuta globaalset muutujat testide vahel
- `beforeEach` — värskenda mockid iga testi ees
- Ära sõltu juhuslikkusest (`Math.random`) ilma injekteerimata

---

## 8. Kontrollküsimused

- Mis vahe on stub'il ja mock'il?
- Miks service kiht on hea koht unit testidele?
- Mis on dependency injection ühe lausega?

---

## 9. Edasi

Järgmine samm: [Integration testid](/testing/integration-testing) — kui mitu kihti peavad koos töötama.

### Allikad

- [Martin Fowler — Test Double](https://martinfowler.com/bliki/TestDouble.html)
- [Vitest — Mocking](https://vitest.dev/guide/mocking.html)
