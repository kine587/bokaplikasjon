import { useState, useEffect } from "react";
import { FetchBooks, SearchBooks } from "../ApiData/API.js";
import BookList from "../Components/BookList.jsx";
import { useSearchParams } from "react-router-dom";

export default function Home() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search") || "";

  useEffect(() => {
    async function loadBooks() {
      try {
        setLoading(true);
        const data = search ? await SearchBooks(search) : await FetchBooks();
        setBooks(data.results);
      } catch (error) {
        console.error("Failed to fetch books:", error);
      } finally {
        setLoading(false);
      }
    }
    loadBooks();
  }, [search]);

  function addFavorites(book) {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    if (!storedFavorites.some((b) => b.id === book.id)) {
      const updated = [...storedFavorites, book];
      localStorage.setItem("favorites", JSON.stringify(updated));
    }
  }

  return (
    <>
      <h1>Welcome to Gutendex Library</h1>

      {loading ? (
        <p>Loading books...</p>
      ) : (
        <BookList books={books} onAddFavorites={addFavorites} />
      )}
    </>
  );
}
