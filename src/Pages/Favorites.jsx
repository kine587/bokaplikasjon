import { useEffect, useState } from "react";

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);

  function removeFavorite(id) {
    const updated = favorites.filter((book) => book.id !== id);
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  }

  function addFavorites(book) {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];

    const exists = storedFavorites.some((b) => b.id === book.id);
    if (!exists) {
      const updateFavorites = [...storedFavorites, book];
      localStorage.setItem("favorites", JSON.stringify(updateFavorites));
    }
    setFavorites(addFavorites);
  }

  return (
    <>
      <h1>My favorite books</h1>
      {favorites.length === 0 ? (
        <p>No favorites yet.</p>
      ) : (
        <ul>
          {favorites.map((book) => (
            <li key={book.id}>
              {book.title}
              <button onClick={() => removeFavorite(book.id)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
