import test from "node:test";
import assert from "node:assert/strict";
import { getJson } from "../src/services/api.js";

test("API tagastab JSON-i ja edastab katkestamise signaali", async t => {
  const controller = new AbortController();
  t.mock.method(globalThis, "fetch", async (url, options) => {
    assert.equal(url, "https://jsonplaceholder.typicode.com/posts");
    assert.equal(options.signal, controller.signal);
    return new Response(JSON.stringify([{ id: 1 }]), { status: 200 });
  });
  assert.deepEqual(await getJson("/posts", controller.signal), [{ id: 1 }]);
});
test("HTTP 404 muutub olekukoodiga veaks", async t => {
  t.mock.method(globalThis, "fetch", async () => new Response("{}", { status: 404 }));
  await assert.rejects(getJson("/posts/999"), error => error.status === 404);
});
test("vigane JSON ei muutu edukaks andmeks", async t => {
  t.mock.method(globalThis, "fetch", async () => new Response("<html>"));
  await assert.rejects(getJson("/posts"), SyntaxError);
});
test("võrguviga edastatakse kasutajaliidesele käsitlemiseks", async t => {
  t.mock.method(globalThis, "fetch", async () => { throw new TypeError("Offline"); });
  await assert.rejects(getJson("/posts"), /Offline/);
});
test("katkestatud päring jääb eristatavaks", async t => {
  t.mock.method(globalThis, "fetch", async () => { throw new DOMException("Katkestatud", "AbortError"); });
  await assert.rejects(getJson("/posts"), error => error.name === "AbortError");
});
