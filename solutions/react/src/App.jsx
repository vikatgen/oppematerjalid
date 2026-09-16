import { useEffect, useState } from "react";
import { Routes, Route, Link } from "react-router";
import Layout from "./components/Layout.jsx";
import PostsPage from "./pages/PostsPage.jsx";
import { PostDetailsPage, UserDetailsPage } from "./pages/DetailsPages.jsx";
import { toggleId } from "./utils/posts.js";

function HomePage() {
  return <section><h1>Artiklikataloog</h1><p>Leia artikkel ja märgi see lemmikuks.</p><Link to="/posts">Ava artiklid</Link></section>;
}
function AboutPage() {
  return (
    <section>
      <h1>Rakenduse info</h1>
      <p>Frontend 1 õppereakendus. Andmeallikas: JSONPlaceholder.</p>
      <p>Test-API ei salvesta muudatusi püsivalt. Mustandivorm kontrollib sisendit ainult kohapeal.</p>
      <p>Lemmikud säilivad vaadete vahel, aga lähtestuvad lehe värskendamisel.</p>
    </section>
  );
}
function NotFoundPage() {
  return <section><h1>Lehte ei leitud</h1><Link to="/posts">Tagasi artiklite juurde</Link></section>;
}

export default function App() {
  const [favoriteIds, setFavoriteIds] = useState([]);
  function toggleFavorite(id) {
    setFavoriteIds(previous => toggleId(previous, id));
  }
  useEffect(() => {
    const previous = document.title;
    document.title = "Artiklikataloog: " + favoriteIds.length + " lemmikut";
    return () => { document.title = previous; };
  }, [favoriteIds.length]);
  return (
    <Routes>
      <Route element={<Layout favoriteCount={favoriteIds.length} />}>
        <Route index element={<HomePage />} />
        <Route path="posts" element={<PostsPage favoriteIds={favoriteIds} onToggle={toggleFavorite} />} />
        <Route path="posts/:postId" element={<PostDetailsPage />} />
        <Route path="users/:userId" element={<UserDetailsPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
