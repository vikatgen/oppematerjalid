export function filterPosts(posts, query, favoritesOnly, favoriteIds) {
  const needle = query.trim().toLowerCase();
  return posts.filter(post =>
    post.title.toLowerCase().includes(needle) &&
    (!favoritesOnly || favoriteIds.includes(post.id))
  );
}

export function toggleId(ids, id) {
  return ids.includes(id) ? ids.filter(value => value !== id) : [...ids, id];
}

export function isPost(post) {
  return post !== null && typeof post === "object" &&
    Number.isInteger(post.id) && post.id > 0 &&
    Number.isInteger(post.userId) && post.userId > 0 &&
    typeof post.title === "string" && typeof post.body === "string";
}

export function isUser(user) {
  return user !== null && typeof user === "object" &&
    Number.isInteger(user.id) && user.id > 0 &&
    typeof user.name === "string" && typeof user.username === "string" &&
    typeof user.email === "string";
}
