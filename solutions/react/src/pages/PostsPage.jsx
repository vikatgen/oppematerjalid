import { useState } from "react";
import { useResource } from "../hooks/useResource.js";
import { filterPosts, isPost } from "../utils/posts.js";
import PostList from "../components/PostList.jsx";
import RequestStatus from "../components/RequestStatus.jsx";
import PostDraftForm from "../components/PostDraftForm.jsx";

export default function PostsPage({ favoriteIds, onToggle }) {
  const request = useResource("/posts");
  const [query, setQuery] = useState("");
  const [favoritesOnly, setFavoritesOnly] = useState(false);

  if (request.status !== "success") return <><h1>Artiklid</h1><RequestStatus request={request} /></>;
  if (!Array.isArray(request.data) || !request.data.every(isPost)) {
    return <><h1>Artiklid</h1><p role="alert">API artiklite kuju on vigane.</p><button onClick={request.retry}>Proovi uuesti</button></>;
  }
  const posts = filterPosts(request.data, query, favoritesOnly, favoriteIds);
  return (
    <>
      <h1>Artiklid</h1>
      <label htmlFor="search">Otsi pealkirja järgi</label>
      <input id="search" type="search" value={query} onChange={e => setQuery(e.target.value)} />
      <label className="checkbox">
        <input type="checkbox" checked={favoritesOnly} onChange={e => setFavoritesOnly(e.target.checked)} />
        Ainult lemmikud
      </label>
      <button onClick={() => { setQuery(""); setFavoritesOnly(false); }}>Tühjenda filtrid</button>
      <p role="status">Leitud artikleid: {posts.length}</p>
      <PostList posts={posts} favoriteIds={favoriteIds} onToggle={onToggle} />
      <PostDraftForm />
    </>
  );
}
