export default function BookCard({ book, onAddFavorites, favoriteBooks = [] }) {
  const isFavorite = favoriteBooks.some((b) => b.id === book.id);
  return (
    <div className="book-card">
      <h3>{book.title}</h3>
      <p>By: {book.author?.map((a) => a.name).join(", ") || "unknown"}</p>
      <button onClick={() => onAddFavorites(book)} disabled={isFavorite}>
        {isFavorite ? "Favorited" : "Add to Favorites"}
      </button>
    </div>
  );
}
