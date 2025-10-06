import BookCard from "./BookCard";

export default function BookList({
  books,
  onAddFavorites,
  favoriteBooks = [],
}) {
  if (!books || books.lenght === 0) {
    return <p>No books found</p>;
  }

  return (
    <div className="books-grid">
      {books.map((book) => (
        <BookCard
          key={book.id}
          book={book}
          onAddFavorites={onAddFavorites}
          favoriteBooks={favoriteBooks}
        />
      ))}
    </div>
  );
}
