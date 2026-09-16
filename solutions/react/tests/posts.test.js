import test from "node:test";
import assert from "node:assert/strict";
import { filterPosts, toggleId, isPost, isUser } from "../src/utils/posts.js";

const posts = [
  { id: 1, userId: 1, title: "Reacti komponendid", body: "Sisu" },
  { id: 2, userId: 2, title: "API päringud", body: "Sisu" },
];

test("otsing eirab tõstutundlikkust ja väliseid tühikuid", () => {
  assert.deepEqual(filterPosts(posts, " REACT ", false, []), [posts[0]]);
});
test("otsing ja lemmikute filter rakenduvad koos", () => {
  assert.deepEqual(filterPosts(posts, "api", true, [1]), []);
  assert.deepEqual(filterPosts(posts, "", true, [2]), [posts[1]]);
});
test("tühi andmestik annab tühja tulemuse", () => {
  assert.deepEqual(filterPosts([], "", false, []), []);
});
test("filtreerimine ei muuda algandmeid", () => {
  const original = structuredClone(posts);
  filterPosts(posts, "react", true, [1]);
  assert.deepEqual(posts, original);
});
test("lemmiku lisamine ja eemaldamine ei muuda sisendmassiivi", () => {
  const original = Object.freeze([1]);
  assert.deepEqual(toggleId(original, 2), [1, 2]);
  assert.deepEqual(toggleId(original, 1), []);
  assert.deepEqual(original, [1]);
});
test("vigane API artikkel lükatakse tagasi", () => {
  assert.equal(isPost(posts[0]), true);
  assert.equal(isPost(null), false);
  assert.equal(isPost({ ...posts[0], id: "1" }), false);
  assert.equal(isPost({ ...posts[0], body: null }), false);
});
test("autor vajab kõiki kuvatavaid välju", () => {
  assert.equal(isUser({ id: 1, name: "Mari", username: "mari", email: "mari@example.test" }), true);
  assert.equal(isUser({ id: 1, name: "Mari" }), false);
});
