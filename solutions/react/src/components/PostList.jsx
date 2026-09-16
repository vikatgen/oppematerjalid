import { Link } from "react-router";

function PostCard({ post, isFavorite, onToggle }) {
  return (
    <article>
      <h2><Link to={"/posts/" + post.id}>{post.title}</Link></h2>
      <p>{post.body}</p>
      <button type="button" aria-pressed={isFavorite} onClick={() => onToggle(post.id)}>
        {isFavorite ? "Eemalda lemmikutest" : "Lisa lemmikuks"}
      </button>
    </article>
  );
}

export default function PostList({ posts, favoriteIds, onToggle }) {
  if (posts.length === 0) return <p role="status">Artikleid ei leitud.</p>;
  return (
    <ul className="posts">
      {posts.map(post => (
        <li key={post.id}>
          <PostCard post={post} isFavorite={favoriteIds.includes(post.id)} onToggle={onToggle} />
        </li>
      ))}
    </ul>
  );
}
