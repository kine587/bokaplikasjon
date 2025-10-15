import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BookList from "../Components/BookList";
import { Box, Typography, Button } from "@mui/material";

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);

  function removeFavorite(id) {
    const updated = favorites.filter((book) => book.id !== id);
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  }

  if (!favorites.length) {
    return (
      <Box
        sx={{
          bgcolor: "#121212",
          color: "white",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          px: 3,
        }}
      >
        <Typography
          variant="h4"
          sx={{
            mb: 2,
            color: "#b944d0ff",
          }}
        >
          No favorites yet
        </Typography>
        <Button
          component={Link}
          to="/"
          variant="contained"
          sx={{
            bgcolor: "#b944d0ff",
            "&hover": { bgcolor: "#8a35a0" },
          }}
        >
          Browse books
        </Button>
      </Box>
    );
  }

  return (
    <>
      <Box
        sx={{
          bgcolor: "#121212",
          color: "white",
          minHeight: "100vh",
          py: 6,
          px: 3,
        }}
      >
        <Typography
          variant="h3"
          align="center"
          sx={{
            mb: 4,
            color: "#b944d0ff",
          }}
        >
          My favorites
        </Typography>
        <BookList
          books={favorites}
          onRemoveFavorites={removeFavorite}
          favoriteBooks={favorites}
        />
      </Box>
    </>
  );
}
