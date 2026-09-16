import { defineConfig } from "vite";

const posts = [
  { id: 1, userId: 1, title: "Reacti komponendid", body: "Komponent kirjeldab ühte kasutajaliidese osa." },
  { id: 2, userId: 2, title: "API päringud", body: "Laadimisel ja vea korral vajab kasutaja tagasisidet." },
  { id: 3, userId: 1, title: "Reacti olek", body: "Ühine olek kuulub sobivasse vanemkomponenti." },
];
const users = [
  { id: 1, name: "Mari Näidis", username: "mari", email: "mari@example.test" },
  { id: 2, name: "Jüri Näidis", username: "jyri", email: "jyri@example.test" },
];

export default defineConfig({
  esbuild: { jsx: "automatic" },
  plugins: [{
    name: "lesson-demo-api",
    configureServer(server) {
      server.middlewares.use("/demo-api", (req, res) => {
        const path = new URL(req.url, "http://localhost").pathname;
        let status = 200;
        let data;
        if (path === "/posts") data = posts;
        else if (path === "/empty") data = [];
        else if (path === "/fail") { status = 503; data = { message: "Demo viga" }; }
        else if (/^\/posts\/\d+$/.test(path)) data = posts.find(post => post.id === Number(path.split("/")[2]));
        else if (/^\/users\/\d+$/.test(path)) data = users.find(user => user.id === Number(path.split("/")[2]));
        if (data === undefined) { status = 404; data = {}; }
        if (process.env.DEMO_SCENARIO === "error") { status = 503; data = {}; }
        if (process.env.DEMO_SCENARIO === "empty" && path === "/posts") data = [];
        if (process.env.DEMO_SCENARIO === "bad-shape") data = { unexpected: true };
        setTimeout(() => {
          res.writeHead(status, { "Content-Type": "application/json" });
          res.end(JSON.stringify(data));
        }, process.env.DEMO_SCENARIO === "slow" ? 3000 : 350);
      });
    },
  }],
});
