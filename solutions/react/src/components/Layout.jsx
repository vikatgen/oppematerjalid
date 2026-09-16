import { NavLink, Outlet } from "react-router";

export default function Layout({ favoriteCount }) {
  return (
    <>
      <a className="skip-link" href="#main">Liigu põhisisu juurde</a>
      <header>
        <nav aria-label="Peamenüü">
          <NavLink to="/" end>Avaleht</NavLink>
          <NavLink to="/posts">Artiklid</NavLink>
          <NavLink to="/about">Info</NavLink>
        </nav>
        <p>Lemmikuid: {favoriteCount}</p>
      </header>
      <main id="main"><Outlet /></main>
      <footer>Frontend 1 · Artiklite õppereakendus</footer>
    </>
  );
}
