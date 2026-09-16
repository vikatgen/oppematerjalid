import { useState } from "react";

export default function PostDraftForm() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [message, setMessage] = useState("");
  function handleSubmit(event) {
    event.preventDefault();
    if (title.trim().length < 3) {
      setMessage("Pealkirjas peab olema vähemalt 3 märki.");
      return;
    }
    if (body.trim().length < 10) {
      setMessage("Sisutekstis peab olema vähemalt 10 märki.");
      return;
    }
    setMessage("Mustand sobib. Serverisse seda veel ei saadetud.");
  }
  return (
    <form onSubmit={handleSubmit}>
      <h2>Artikli mustand</h2>
      <label htmlFor="draft-title">Pealkiri</label>
      <input id="draft-title" value={title} onChange={e => setTitle(e.target.value)} aria-describedby="draft-feedback" />
      <label htmlFor="draft-body">Sisutekst</label>
      <textarea id="draft-body" value={body} onChange={e => setBody(e.target.value)} aria-describedby="draft-feedback" />
      <button type="submit">Kontrolli mustandit</button>
      <p id="draft-feedback" role="status">{message}</p>
    </form>
  );
}
