import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { GetBooksByCategory } from "../ApiData/API";
import BookList from "../Components/BookList";

export default function Category() {
  const { categoryName } = useParams();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [favorite, setFavorites] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(stored);
  }, []);

  useEffect(() => {
    async function loadBooks() {
      try {
        setLoading(true);
        const data = await GetBooksByCategory(categoryName.toLowerCase());
        setBooks(data.results);
      } catch (error) {
        console.error("failed to fetch category books:", error);
      } finally {
        setLoading(false);
      }
    }
    loadBooks();
  }, [categoryName]);

  function addFavorite(book) {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    if (!storedFavorites.some((b) => b.id === book.id)) {
      const updated = [...storedFavorites, book];
      localStorage.setItem("favorites", JSON.stringify(updated));
    }
  }

  return (
    <>
      <h1>
        {categoryName.charAt(0).toUpperCase() + categoryName.slice(1)} Books
      </h1>
      {loading ? (
        <p>Loading books</p>
      ) : (
        <BookList
          books={books}
          onAddFavorites={addFavorite}
          favoriteBooks={favorite}
        />
      )}
      <ul>
        {books.map((book) => (
          <li key={book.id}>{book.title}</li>
        ))}
      </ul>
    </>
  );
}
