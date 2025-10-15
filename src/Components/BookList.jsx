import BookCard from "./BookCard";
import { Grid, Box } from "@mui/material";

export default function BookList({
  books,
  onAddFavorites,
  onRemoveFavorites,
  favoriteBooks,
}) {
  if (!books || books.lenght === 0) {
    return <p>No books found</p>;
  }

  return (
    <div>
      <Box sx={{ flexGrow: 1, padding: 4 }}>
        <Grid container spacing={2} justifyContent="center">
          {books.map((book) => (
            <Grid key={book.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
              <BookCard
                book={book}
                onAddFavorites={onAddFavorites}
                onRemoveFavorites={onRemoveFavorites}
                favoriteBooks={favoriteBooks}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
}
