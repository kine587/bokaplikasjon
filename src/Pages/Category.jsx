import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { GetBooksByCategory } from "../ApiData/API";
import BookList from "../Components/BookList";
import { Box, Typography, CircularProgress } from "@mui/material";

export default function Category() {
  const { categoryName } = useParams();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [favorite, setFavorites] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(stored);
  }, []);

  useEffect(() => {
    async function loadBooks() {
      try {
        setLoading(true);
        const data = await GetBooksByCategory(categoryName.toLowerCase());
        setBooks(data.results);
      } catch (error) {
        console.error("failed to fetch category books:", error);
      } finally {
        setLoading(false);
      }
    }
    loadBooks();
  }, [categoryName]);

  function addFavorite(book) {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    if (!storedFavorites.some((b) => b.id === book.id)) {
      const updated = [...storedFavorites, book];
      localStorage.setItem("favorites", JSON.stringify(updated));
    }
  }

  return (
    <>
      <Box
        sx={{
          bgcolor: "#121212",
          color: "white",
          py: 6,
          px: 4,
          minHeight: "100vh",
          //width: "100vW",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{
            fontWeight: "bold",
            color: "#b944d0ff",
            textShadow: "0px 0px 8px rgba(185, 68, 208, 0.5)",
          }}
        >
          {categoryName
            ? categoryName.charAt(0).toUpperCase() + categoryName.slice(1)
            : "Category Books"}
        </Typography>
        {loading ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            sx={{ flexGrow: 1 }}
          >
            <CircularProgress sx={{ color: "#b944d0ff" }} />
          </Box>
        ) : (
          <Box
            sx={{
              mt: 4,
              width: "100%",
              maxWidth: "1400px",
            }}
          >
            <BookList
              books={books}
              onAddFavorites={addFavorite}
              favoriteBooks={favorite}
            />
          </Box>
        )}
      </Box>
    </>
  );
}
