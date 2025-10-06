import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { GetBooksByCategory } from "../ApiData/API";

export default function Category() {
  const { CategoryName } = useParams();
  const [books, setBooks] = useState([]);

  useEffect(() => {
    async function loadBooks() {
      const data = await GetBooksByCategory(CategoryName);
      setBooks(data.results);
    }
    loadBooks();
  }, [CategoryName]);

  return (
    <>
      <h1>{CategoryName} Books</h1>
      <ul>
        {books.map((book) => (
          <li key={book.id}>{book.title}</li>
        ))}
      </ul>
    </>
  );
}
