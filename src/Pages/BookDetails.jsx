import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

export default function BookDetails() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`https://gutendex.com/books/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Noe gikk galt");
        return res.json();
      })
      .then((data) => {
        setBook(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);
  if (loading) return <p>Laster...</p>;
  if (error) return <p>Feil: {error}</p>;

  return (
    <>
      <h1>{book.title}</h1>
      <p>{book.author}</p>
    </>
  );
}
