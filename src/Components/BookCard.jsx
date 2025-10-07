import { Link } from "react-router-dom";

export default function BookCard({ book, onAddFavorites, favoriteBooks = [] }) {
  const isFavorite = favoriteBooks.some((b) => b.id === book.id);
  const cover = book.formats["image/jpeg"];
  /* const readLink = book.formats["text/html"]; */
  return (
    <div className="book-card">
      <Link to={`/book/${book.id}`}>
        <img src={cover} alt={book.title} width={150} height={220} />
        <h3>{book.title}</h3>
      </Link>
      <p>By: {book.author?.map((a) => a.name).join(", ")}</p>
      {/* {readLink && (
        <a href={readLink} target="_blank" rel="noopener noreferrer">
          Read book
        </a>
      )} */}
      <button onClick={() => onAddFavorites(book)} disabled={isFavorite}>
        {isFavorite ? "Favorited" : "Add to Favorites"}
      </button>
    </div>
  );
}
