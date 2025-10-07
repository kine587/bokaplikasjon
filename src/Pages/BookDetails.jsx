import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function BookDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`https://gutendex.com/books?ids=${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Noe gikk galt");
        return res.json();
      })
      .then((data) => {
        setBook(data.results[0]);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);
  if (loading) return <p>Laster...</p>;
  if (error) return <p>Feil: {error}</p>;

  function addFavorite(book) {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    if (!storedFavorites.some((b) => b.id === book.id)) {
      const updated = [...storedFavorites, book];
      localStorage.setItem("favorites", JSON.stringify(updated));
      alert(`${book.title} added to favorites!`);
    }
  }

  const cover = book?.formats?.["image/jpeg"];
  const readLink = Object.entries(book.formats).find(([key]) =>
    key.includes("text/html")
  )?.[1];

  return (
    <>
      <h1>{book.title}</h1>
      <p>{book.author}</p>
      <img src={cover} alt={book.title} />
      <p>Languages: {book.languages.join(", ")}</p>
      <p>Downloads: {book.download_count.toLocaleString()}</p>
      {readLink && (
        <a href={readLink} target="_blank" rel="noopener noreferrer">
          Read the book online
        </a>
      )}
      <button onClick={() => addFavorite(book)}>Add to favorite</button>
      <button onClick={() => navigate(-1)}>Back</button>
    </>
  );
}
