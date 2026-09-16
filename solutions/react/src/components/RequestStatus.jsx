export default function RequestStatus({ request }) {
  if (request.status === "loading") return <p role="status">Laadin andmeid…</p>;
  if (request.status === "error") {
    return (
      <section>
        <p role="alert">
          {request.error.status === 404
            ? "Andmeid ei leitud."
            : "Andmete laadimine ebaõnnestus. Kontrolli ühendust ja proovi uuesti."}
        </p>
        <button onClick={request.retry}>Proovi uuesti</button>
      </section>
    );
  }
  return null;
}
