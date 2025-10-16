import BookCard from "./BookCard";
import { Grid, Typography } from "@mui/material";

export default function BookList({
  books,
  onAddFavorites,
  onRemoveFavorite,
  favoriteBooks,
}) {
  if (!books || books.lenght === 0) {
    return (
      <Typography variant="body1" align="center" sx={{ mt: 4 }}>
        No books found
      </Typography>
    );
  }

  return (
    <Grid container spacing={2} justifyContent="center" sx={{ mt: 4 }}>
      {books.map((book) => (
        <Grid
          key={book.id}
          size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
          sx={{
            display: "flex",
            justifyContent: "center",
            maxWidth: 250,
          }}
        >
          <BookCard
            book={book}
            onAddFavorite={onAddFavorites}
            onRemoveFavorite={onRemoveFavorite}
            favoriteBooks={favoriteBooks}
          />
        </Grid>
      ))}
    </Grid>
  );
}

/* import BookCard from "./BookCard";
import { Box, Typography } from "@mui/material";

export default function BookList({
  books,
  onAddFavorites,
  onRemoveFavorite,
  favoriteBooks,
}) {
  if (!books || books.length === 0) {
    return (
      <Typography variant="body1" align="center" sx={{ mt: 4 }}>
        No books found
      </Typography>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: 2, // spacing between cards
        mt: 4,
      }}
    >
      {books.map((book) => (
        <BookCard
          key={book.id}
          book={book}
          onAddFavorite={onAddFavorites}
          onRemoveFavorite={onRemoveFavorite}
          isFavorite={favoriteBooks?.some((b) => b.id === book.id)}
        />
      ))}
    </Box>
  );
}
 */
