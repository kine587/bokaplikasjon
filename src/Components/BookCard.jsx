export default function BookCard({ book, onAddFavorites }) {
  return (
    <div className="book-card">
      <h3>{book.title}</h3>
      <p>By: {book.author?.map((a) => a.name).join(", ") || "unknown"}</p>
      <button onClick={() => onAddFavorites(book)}>Add to favorites</button>
    </div>
  );
}
