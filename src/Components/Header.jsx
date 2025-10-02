import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import CategoryMeny from "./CategoryMenu.jsx";

export default function Header() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/?search=${search}`);
      setSearch("");
    }
  };

  return (
    <>
      <header>
        <h1>
          <Link to="/">BookApp</Link>
        </h1>
        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Søk etter bøker..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button type="submit">Søk</button>
        </form>
        <nav>
          <CategoryMeny />
          <Link to="/Favorites">Favorites</Link>
        </nav>
      </header>
    </>
  );
}
