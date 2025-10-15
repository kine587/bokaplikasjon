import { useState, useEffect } from "react";
import { FetchBooks, SearchBooks } from "../ApiData/API.js";
import BookList from "../Components/BookList.jsx";
import { useSearchParams } from "react-router-dom";
import { Box, Typography, CircularProgress, Container } from "@mui/material";

export default function Home() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search") || "";

  useEffect(() => {
    async function loadBooks() {
      try {
        setLoading(true);
        const data = search ? await SearchBooks(search) : await FetchBooks();
        setBooks(data.results);
      } catch (error) {
        console.error("Failed to fetch books:", error);
      } finally {
        setLoading(false);
      }
    }
    loadBooks();
  }, [search]);

  function addFavorites(book) {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    if (!storedFavorites.some((b) => b.id === book.id)) {
      const updated = [...storedFavorites, book];
      localStorage.setItem("favorites", JSON.stringify(updated));
    }
  }

  if (loading)
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="80vh"
      >
        <CircularProgress color="secondary" />
      </Box>
    );

  return (
    <>
      <Box
        sx={{
          // width: "100vw",
          minHeight: "100vh",
          px: 4,
          py: 6,
          bgcolor: "#121212",
          color: "white",
        }}
      >
        <Typography
          variant="h3"
          align="center"
          gutterBottom
          sx={{
            color: "#b349cff",
            fontWeight: "bold",
          }}
        >
          Welcome to Gutendex Library
        </Typography>
        {books.length === 0 ? (
          <Typography
            variant="subtitle1"
            align="center"
            sx={{
              color: "#bdbdbd",
            }}
          >
            No books found
          </Typography>
        ) : (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <BookList books={books} onAddFavorites={addFavorites} />
          </Box>
        )}
      </Box>
      {/* <h1>Welcome to Gutendex Library</h1>

      {loading ? (
        <p>Loading books...</p>
      ) : (
        <BookList books={books} onAddFavorites={addFavorites} />
      )} */}
    </>
  );
}
