export default {
    base: process.env.VITEPRESS_BASE ?? "/oppematerjalid/",
    lang: "et-EE",
    title: "J-SWE",
    description: "Kuressaare Ametikooli tarkvaraarenduse õppematerjalid: JavaScript, TypeScript, Node.js, testimine, Linux, Docker, Nginx, andmebaasid",

    themeConfig: {
        nav: [
            { text: "Avaleht", link: "/" },
        ],

        sidebar: {
            "/": [
            {
                text: "Internet",
                collapsed: true,
                items: [
                    { text: "Sissejuhatus", link: "/veeb/sissejuhatus" },
                    { text: "Veebipäringu teekond", link: "/veeb/paringuteekond" },
                    { text: "URL, domeen ja DNS", link: "/veeb/url-domeen-ja-dns" },
                    { text: "HTTP päring ja vastus", link: "/veeb/http-paring-ja-vastus" },
                    { text: "Meetodid ja staatusekoodid", link: "/veeb/meetodid-ja-staatusekoodid" },
                    { text: "Päritolu ja CORS", link: "/veeb/cors" },
                    { text: "Network-paneel", link: "/veeb/network-paneel" },
                ]
            },
            {
                text: "JavaScript",
                collapsed: true,
                items: [
                    { text: "Sissejuhatus moodulisse", link: "/javascript/sissejuhatus-moodulisse" },
                    {
                        text: "Programmeerimise alused",
                        collapsed: true,
                        items: [
                            { text: "Probleemi lahendamine", link: "/javascript/alused/probleemi-lahendamine" },
                            { text: "Muutujad", link: "/javascript/alused/muutujad" },
                            { text: "Andmetüübid", link: "/javascript/alused/andmetuubid" },
                            { text: "Objektid ja massiivid", link: "/javascript/alused/objektid-ja-massiivid" },
                            { text: "Tingimuslaused", link: "/javascript/alused/tingimuslaused" },
                            { text: "Korduslaused (tsükkel)", link: "/javascript/alused/korduslaused" },
                            { text: "Funktsioonid", link: "/javascript/alused/funktsioonid" },
                            { text: "Koodi jälgimine ja silumine", link: "/javascript/alused/koodi-jalgimine-ja-silumine" },
                            { text: "Mooduli vahekaitsmine", link: "/javascript/alused/kaitsmine" },
                            {
                                text: "Lisalugemine",
                                collapsed: true,
                                items: [
                                    { text: "Kuidas muutuja töötab?", link: "/javascript/lisalugemine/kuidas-muutuja-tootab" },
                                    { text: "Kuidas funktsioon töötab?", link: "/javascript/lisalugemine/kuidas-funktsioon-tootab" },
                                    { text: "Massiivimeetodid ja callback'id", link: "/javascript/lisalugemine/massiivimeetodid-ja-callbackid" },
                                    { text: "Väärtuste võrdlemine", link: "/javascript/lisalugemine/vaartuste-vordlemine" },
                                    { text: "Levinud veateated", link: "/javascript/lisalugemine/levinud-veateated" },
                                    { text: "Strict mode", link: "/javascript/lisalugemine/strict-mode" },
                                ]
                            },
                        ]
                    },
                    {
                        text: "Brauserikeskkond",
                        collapsed: true,
                        items: [
                            { text: "Sissejuhatus", link: "/javascript/brauser/sissejuhatus" },
                            {
                                text: "DOM: leia ja muuda",
                                collapsed: true,
                                items: [
                                    { text: "Brauseri arenduskeskkond", link: "/javascript/brauser/dom/arenduskeskkond" },
                                    { text: "JavaScripti käivitamine", link: "/javascript/brauser/dom/dokumendi-laadimine" },
                                    { text: "DOM-puu", link: "/javascript/brauser/dom/dom-puu" },
                                    { text: "DOM-elementide otsimine", link: "/javascript/brauser/dom/dom-elementide-otsimine" },
                                    { text: "Attribuudid ja omadused", link: "/javascript/brauser/dom/atribuudid-ja-omadused" },
                                    { text: "Dokumendi sisu muutmine", link: "/javascript/brauser/dom/dokumendi-muutmine" },
                                    { text: "Stiilid ja klassid", link: "/javascript/brauser/dom/stiilid-ja-klassid" },
                                    { text: "Elementide lisamine ja eemaldamine", link: "/javascript/brauser/dom/nodede-lisamine-ja-eemaldamine" },
                                ]
                            },
                            {
                                text: "Sündmused: reageeri",
                                collapsed: true,
                                items: [
                                    { text: "Mis on brauseri sündmused?", link: "/javascript/brauser/sundmused/sissejuhatus" },
                                    { text: "UI sündmused", link: "/javascript/brauser/sundmused/ui-sundmused" },
                                    { text: "Brauseri vaikimisi käitumine", link: "/javascript/brauser/sundmused/brauser-vaikimisi-kaitumine" },
                                    { text: "Vormid", link: "/javascript/brauser/sundmused/vormid" },
                                    { text: "Sündmuste delegeerimine", link: "/javascript/brauser/sundmused/sundmuste-delegeerimine" },
                                ]
                            },
                            {
                                text: "Andmed brauseris: salvesta",
                                collapsed: true,
                                items: [
                                    { text: "LocalStorage: püsiv olek", link: "/javascript/brauser/andmed-brauseris/localstorage" },
                                    { text: "SessionStorage: ajutine olek", link: "/javascript/brauser/andmed-brauseris/sessionstorage" },
                                ]
                            },
                            {
                                text: "Asünkroonsus: küsi serverist",
                                collapsed: true,
                                items: [
                                    { text: "Asünkroonne JavaScript", link: "/javascript/brauser/asunkroonsus/sissejuhatus" },
                                    { text: "Promise", link: "/javascript/brauser/asunkroonsus/promise" },
                                    { text: "Async ja await", link: "/javascript/brauser/asunkroonsus/async-await" },
                                    { text: "Fetch: küsi serverist", link: "/javascript/brauser/asunkroonsus/fetch" },
                                    { text: "Laadimis- ja veaolekud", link: "/javascript/brauser/asunkroonsus/laadimis-ja-veaolekud" },
                                ]
                            },
                            { text: "Praktiline töö", link: "/javascript/brauser/praktiline-too" },
                            {
                                text: "Brauseriosa lisamaterjalid",
                                collapsed: true,
                                items: [
                                    { text: "Window objekt", link: "/javascript/brauser/dom/brauser-window" },
                                    { text: "Elemendi koordinaadid", link: "/javascript/brauser/dom/koordinaadid" },
                                    { text: "Kohandatud sündmused", link: "/javascript/brauser/sundmused/kohandatud-sundmused" },
                                    { text: "Mutatsiooni jälgimine", link: "/javascript/brauser/sundmused/mutatsiooni-jalgimine" },
                                    { text: "Event loop: mikro ja makro", link: "/javascript/brauser/sundmused/event-loop-mikro-ja-makro" },
                                    { text: "Küpsised", link: "/javascript/brauser/andmed-brauseris/kupsised" },
                                    { text: "IndexedDB", link: "/javascript/brauser/andmed-brauseris/indexed-db" },
                                ]
                            },
                        ],
                    },
                    {
                        text: "Node.js keskkond",
                        collapsed: true,
                        items: [
                            { text: "Sissejuhatus", link: "/nodejs/introduction" },
                            { text: "Faili käivitamine ja keskkond", link: "/nodejs/kaivituskeskkond" },
                            { text: "Moodulid, npm ja package.json", link: "/nodejs/moodulid" },
                            { text: "Failisüsteem ja protsess", link: "/nodejs/failisusteem-ja-protsess" },
                            { text: "Esimene HTTP-server", link: "/nodejs/http-server" },
                            { text: "Lihtsa API loomine", link: "/nodejs/api-loomine" },
                            { text: "Express ja middleware", link: "/nodejs/express" },
                        ]
                    },
                    {
                        text: "JavaScripti praktilised töövahendid",
                        collapsed: true,
                        items: [
                            { text: "URL ja URLSearchParams", link: "/javascript/toovahendid/url" },
                            { text: "Date ja ajahetked", link: "/javascript/toovahendid/date" },
                            { text: "Intl ja vormindamine", link: "/javascript/toovahendid/intl" },
                        ]
                    },
                ]
            },
            {
                text: "Rakenduste loomine",
                collapsed: true,
                items: [
                    { text: "Sissejuhatus moodulisse", link: "/rakenduste-loomine/sissejuhatus" },
                    { text: "Eelteadmiste kordamine", link: "/rakenduste-loomine/eelteadmiste-kordamine" },
                    { text: "Bundler ja Vite", link: "/rakenduste-loomine/bundler-ja-vite" },
                    { text: "Projekti loomine nullist", link: "/rakenduste-loomine/projekti-loomine-nullist" },
                    { text: "Keskkonnamuutujad Vite'iga", link: "/rakenduste-loomine/keskkonnamuutujad-vitega" },
                    { text: "Build ja preview", link: "/rakenduste-loomine/build-ja-preview" },
                    { text: "Tailwind Vite'iga", link: "/rakenduste-loomine/tailwind-vitega" },
                    { text: "ESLint", link: "/rakenduste-loomine/eslint" },
                    { text: "Prettier ja koodistiil", link: "/rakenduste-loomine/prettier-ja-koodistiil" },
                    { text: "Template repository GitHubis", link: "/rakenduste-loomine/template-repository-githubis" },
                    { text: "Ülesanded", link: "/rakenduste-loomine/assignments" }
                ]
            },
            {
                text: "React",
                collapsed: true,
                items: [
                    { text: "Õpitee", link: "/react/" },
                    { text: "1. Reacti mõtteviis", link: "/react/01-reacti-motteviis" },
                    { text: "2. Projekt ja Vite", link: "/react/02-projekt-ja-vite" },
                    { text: "3. JSX ja komponendid", link: "/react/03-jsx-ja-komponendid" },
                    { text: "4. Props ja kompositsioon", link: "/react/04-props-ja-kompositsioon" },
                    { text: "5. Sündmused ja state", link: "/react/05-sundmused-ja-state" },
                    { text: "6. Loendid ja tingimused", link: "/react/06-loendid-ja-tingimused" },
                    { text: "7. Vormid", link: "/react/07-vormid" },
                    { text: "8. State'i asukoht", link: "/react/08-statei-asukoht" },
                    { text: "9. Efektid", link: "/react/09-efektid" },
                    { text: "10. API-andmed", link: "/react/10-api-andmed" },
                    { text: "11. React Router", link: "/react/11-react-router" },
                    { text: "12. Dünaamilised marsruudid", link: "/react/12-dunaamilised-marsruudid" },
                    { text: "13. Rakenduse tervik", link: "/react/13-rakenduse-tervik" },
                    { text: "14. Kontrollimine ja esitlus", link: "/react/14-kontrollimine-ja-esitlus" },
                    { text: "Praktiline töö ja hindamine", link: "/react/praktiline-too" },
                    { text: "Sõnastik", link: "/react/sonastik" },
                ]
            },
            {
                text: "Objektimudel ja OOP",
                collapsed: true,
                items: [
                    { text: "JavaScripti objektimudel", link: "/javascript/objektimudel/sissejuhatus" },
                    { text: "Prototüübid ja pärilikkus", link: "/javascript/objektimudel/prototuubid-ja-parilikkus" },
                    { text: "Klassid ja instantsid", link: "/javascript/objektimudel/klassid-ja-instantsid" },
                    { text: "this ja meetodi väljakutse", link: "/javascript/objektimudel/this-ja-meetodid" },
                    { text: "Kapseldamine, pärimine ja kompositsioon", link: "/javascript/objektimudel/oop-pohimotted" },
                    { text: "Praktiline töö: ostukorvi mudel", link: "/javascript/objektimudel/praktiline-too" },
                ]
            },
            {
                text: "TypeScript",
                collapsed: true,
                items: [
                    { text: "Sissejuhatus moodulisse", link: "/typescript/sissejuhatus" },
                    { text: "Miks TypeScript?", link: "/typescript/miks-typescript" },
                    { text: "Projekt ja tsconfig.json", link: "/typescript/projekt-ja-tsconfig" },
                    { text: "Põhitüübid ja tüübijäreldus", link: "/typescript/pohituubid-ja-tuubijareldus" },
                    { text: "Funktsioonide tüübid", link: "/typescript/funktsioonide-tuubid" },
                    { text: "Objektide tüübid", link: "/typescript/objektide-tuubid" },
                    { text: "Union-tüübid ja kitsendamine", link: "/typescript/union-ja-kitsendamine" },
                    { text: "Puuduvad ja tundmatud väärtused", link: "/typescript/null-ja-unknown" },
                    { text: "DOM ja sündmused", link: "/typescript/dom-ja-sundmused" },
                    { text: "Asünkroonsus ja API-andmed", link: "/typescript/api-andmed" },
                    { text: "TypeScript Node.js-is ja pakettides", link: "/typescript/nodejs-ja-paketid" },
                    { text: "Klassid ja liidesed", link: "/typescript/klassid-ja-liidesed" },
                    { text: "Geneerikud ja utility-tüübid", link: "/typescript/geneerikud-ja-utility-tuubid" },
                    { text: "JavaScriptist TypeScriptiks", link: "/typescript/migreerimine" },
                    { text: "Praktiline töö", link: "/typescript/praktiline-too" },
                    { text: "Ülesanded", link: "/typescript/assignments" },
                ]
            },
            {
                text: "Testimine",
                collapsed: true,
                items: [
                    { text: "Sissejuhatus moodulisse", link: "/testing/sissejuhatus" },
                    { text: "Testimise alused", link: "/testing/fundamentals" },
                    { text: "Unit testid (Vitest)", link: "/testing/unit-testing" },
                    { text: "Mockimine ja testitav kood", link: "/testing/mocking" },
                    { text: "Integration testid", link: "/testing/integration-testing" },
                    { text: "API testimine", link: "/testing/api-testing" },
                    { text: "UI testimine (Playwright)", link: "/testing/ui-testing" },
                    { text: "Jõudlus (Postman)", link: "/testing/performance-testing-postman" },
                    { text: "Praktiline töötuba", link: "/testing/workshop" },
                    { text: "Ülesanded", link: "/testing/assignments" }
                ]
            },
            {
                text: "Arendusvahendid I",
                collapsed: true,
                items: [
                    { text: "Sissejuhatus moodulisse", link: "/arendusvahendid-i/sissejuhatus" },
                    { text: "Terminal ja shell", link: "/arendusvahendid-i/terminal-ja-shell" },
                    { text: "Failisüsteem ja projektistruktuur", link: "/arendusvahendid-i/failisusteem-ja-projektistruktuur" },
                    { text: "Node.js, npm ja nvm", link: "/arendusvahendid-i/nodejs-ja-nvm" },
                    { text: "npm ja package.json", link: "/arendusvahendid-i/npm-ja-package-json" },
                    { text: "Keskkonnamuutujad", link: "/arendusvahendid-i/keskkonnamuutujad" },
                    { text: "Git ja GitHub", link: "/arendusvahendid-i/git-ja-github" },
                    { text: "Markdown ja README", link: "/arendusvahendid-i/markdown-ja-readme" },
                    { text: "Tõrkeotsingu töövoog", link: "/arendusvahendid-i/troubleshooting" },
                    { text: "Ülesanded", link: "/arendusvahendid-i/assignments" }
                ]
            },
            {
                text: "Linux",
                collapsed: true,
                items: [
                    { text: "Sissejuhatus moodulisse", link: "/linux/sissejuhatus" },
                    { text: "Kasutajad ja grupid", link: "/linux/kasutajad-ja-grupid" },
                    { text: "Õiguste süsteem", link: "/linux/oiguste-susteem" },
                    { text: "Protsesside haldus", link: "/linux/protsesside-haldus" }
                ]
            },
            {
                text: "Arendusvahendid II",
                collapsed: true,
                items: [
                    {
                        text: "Nginx",
                        collapsed: true,
                        items: [
                            { text: "Alused", link: "/nginx/basics" },
                            { text: "Reverse proxy", link: "/nginx/reverse-proxy" },
                            { text: "Ülesanded", link: "/nginx/assignments" }
                        ]
                    },
                    {
                        text: "Docker",
                        collapsed: true,
                        items: [
                            { text: "Alused", link: "/docker/basics" },
                            { text: "Docker Compose", link: "/docker/compose" },
                            { text: "Ülesanded", link: "/docker/assignments" }
                        ]
                    },
                ],
            },
            {
                text: "Andmebaasid",
                collapsed: true,
                items: [
                    { text: "Prisma ORM", link: "/databases/prisma" },
                ]
            }
            ]
        },

        socialLinks: [
            { icon: "github", link: "https://github.com/vikatgen/testing-handbook/tree/master" }
        ],

        footer: {
            message: "Õppematerjal sisekasutuseks (Kuressaare Ametikool).",
            copyright: "©"
        }
    }
};
