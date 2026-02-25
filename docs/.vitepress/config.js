export default {
    base: process.env.VITEPRESS_BASE ?? "/oppematerjalid/",
    lang: "et-EE",
    title: "J-SWE",
    description: "Kuressaare Ametikooli tarkvaraarenduse õppematerjalid: JavaScript, Node.js, testimine, Docker, Nginx, andmebaasid",

    themeConfig: {
        nav: [
            { text: "Avaleht", link: "/" },
            { text: "JavaScript", link: "/javascript/sissejuhatus-moodulisse" },
            { text: "Node.js", link: "/nodejs/introduction" },
        ],

        sidebar: [
            {
                text: "JavaScript",
                collapsed: true,
                items: [
                    { text: "Sissejuhatus moodulisse", link: "/javascript/sissejuhatus-moodulisse" },
                    {
                        text: "Programmeerimise alused",
                        collapsed: true,
                        items: [
                            { text: "Muutujad", link: "/javascript/alused/muutujad" },
                            { text: "Andmetüübid", link: "/javascript/alused/andmetuubid" },
                            { text: "Tingimuslaused", link: "/javascript/alused/tingimuslaused" },
                            { text: "Korduslaused (tsükkel)", link: "/javascript/alused/korduslaused" },
                            { text: "Funktsioonid", link: "/javascript/alused/funktsioonid" },
                            { text: "Mooduli vahekaitsmine", link: "/javascript/alused/kaitsmine" },
                        ]
                    },
                    {
                        text: "Brauser keskkond",
                        collapsed: true,
                        items: [
                            {
                                text: "DOM",
                                collapsed: true,
                                items: [
                                    { text: "Arenduskeskkond - brauser", link: "/javascript/brauser/dom/arenduskeskkond" },
                                    { text: "Window objekt", link: "/javascript/brauser/dom/brauser-window" },
                                    { text: "DOM puu", link: "/javascript/brauser/dom/dom-puu" },
                                    { text: "DOM elementide otsimine", link: "/javascript/brauser/dom/dom-elementide-otsimine" },
                                    { text: "Nodede lisamine ja eemaldamine", link: "/javascript/brauser/dom/nodede-lisamine-ja-eemaldamine" },
                                    { text: "Attribuudid ja omadused", link: "/javascript/brauser/dom/atribuudid-ja-omadused" },
                                    { text: "Dokumendi muutmine", link: "/javascript/brauser/dom/dokumendi-muutmine" },
                                    { text: "Stiilid ja klassid", link: "/javascript/brauser/dom/stiilid-ja-klassid" },
                                    { text: "Koordinaadid", link: "/javascript/brauser/dom/koordinaadid" },
                                ]
                            },
                            {
                                text: "Sündmused",
                                collapsed: true,
                                items: [
                                    { text: "Mis on brauseri sündmused?", link: "/javascript/brauser/sundmused/sissejuhatus" },
                                    { text: "Sündmuste delegeerimine", link: "/javascript/brauser/sundmused/sundmuste-delegeerimine" },
                                    { text: "Brauseri vaikimisi käitumine", link: "/javascript/brauser/sundmused/brauser-vaikimisi-kaitumine" },
                                    { text: "Kohandatud sündmused", link: "/javascript/brauser/sundmused/kohandatud-sundmused" },
                                    { text: "UI sündmused", link: "/javascript/brauser/sundmused/ui-sundmused" },
                                    { text: "Vormid", link: "/javascript/brauser/sundmused/vormid" },
                                    { text: "Dokumendi laadimine", link: "/javascript/brauser/sundmused/dokumendi-laadimine" },
                                    { text: "Event loop: mikro ja makro", link: "/javascript/brauser/sundmused/event-loop-mikro-ja-makro" },
                                    { text: "Mutatsiooni jälgimine", link: "/javascript/brauser/sundmused/mutatsiooni-jalgimine" },
                                ]
                            },
                            {
                                text: "Andmed brauseris",
                                collapsed: true,
                                items: [
                                    { text: "Küpsised", link: "/javascript/brauser/andmed-brauseris/kupsised" },
                                    { text: "LocalStorage", link: "/javascript/brauser/andmed-brauseris/localstorage" },
                                    { text: "SessionStorage", link: "/javascript/brauser/andmed-brauseris/sessionstorage" },
                                    { text: "IndexedDB", link: "/javascript/brauser/andmed-brauseris/indexed-db" },
                                ]
                            }
                        ],
                    },
                ]
            },
            {
                text: "Testimine",
                collapsed: false,
                items: [
                    { text: "Testimise alused ja TDD", link: "/testing/fundamentals" },
                    { text: "Mockimine ja arhitektuur", link: "/testing/tdd-and-mocking" },
                    { text: "API testimine (scaffold)", link: "/testing/api-testing" },
                    { text: "Praktiline töötuba", link: "/testing/workshop" },
                    { text: "Ülesanded", link: "/testing/assignments" }
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
        ],

        socialLinks: [
            { icon: "github", link: "https://github.com/vikatgen/testing-handbook/tree/master" }
        ],

        footer: {
            message: "Õppematerjal sisekasutuseks (Kuressaare Ametikool).",
            copyright: "©"
        }
    }
};
