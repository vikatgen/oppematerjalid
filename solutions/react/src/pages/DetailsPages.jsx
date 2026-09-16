import { Link, useParams } from "react-router";
import { useResource } from "../hooks/useResource.js";
import { isPost, isUser } from "../utils/posts.js";
import RequestStatus from "../components/RequestStatus.jsx";

export function PostDetailsPage() {
  const { postId } = useParams();
  const validId = /^[1-9]\d*$/.test(postId ?? "");
  const request = useResource(validId ? "/posts/" + postId : null);
  if (!validId) return <><h1>Vigane artikli ID</h1><p>ID peab olema positiivne täisarv.</p></>;
  if (request.status !== "success") return <><h1>Artikkel</h1><RequestStatus request={request} /></>;
  if (!isPost(request.data) || request.data.id !== Number(postId)) {
    return <><h1>Artikkel</h1><p role="alert">API artikli kuju on vigane.</p><button onClick={request.retry}>Proovi uuesti</button></>;
  }
  const post = request.data;
  return (
    <article>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
      <Link to={"/users/" + post.userId}>Vaata autorit</Link>
      <p><Link to="/posts">Tagasi artiklite juurde</Link></p>
    </article>
  );
}

export function UserDetailsPage() {
  const { userId } = useParams();
  const validId = /^[1-9]\d*$/.test(userId ?? "");
  const request = useResource(validId ? "/users/" + userId : null);
  if (!validId) return <><h1>Vigane autori ID</h1><p>ID peab olema positiivne täisarv.</p></>;
  if (request.status !== "success") return <><h1>Autor</h1><RequestStatus request={request} /></>;
  if (!isUser(request.data) || request.data.id !== Number(userId)) {
    return <><h1>Autor</h1><p role="alert">API autori kuju on vigane.</p><button onClick={request.retry}>Proovi uuesti</button></>;
  }
  return (
    <section>
      <h1>{request.data.name}</h1>
      <p>Kasutajanimi: {request.data.username}</p>
      <p>E-post: {request.data.email}</p>
      <Link to="/posts">Tagasi artiklite juurde</Link>
    </section>
  );
}
