import { useState, useEffect } from "react";
import { FetchBooks, SearchBooks } from "../ApiData/API.js";
import BookList from "../Components/BookList.jsx";
import { useSearchParams } from "react-router-dom";
import { Box, Typography, CircularProgress, Pagination } from "@mui/material";

export default function Home() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search") || "";

  useEffect(() => {
    async function loadBooks() {
      try {
        setLoading(true);
        let data;
        if (search) {
          data = await SearchBooks(search, page);
        } else {
          data = await FetchBooks(page);
        }
        setBooks(data.results);
        setTotalPages(Math.ceil(data.count / 32));
      } catch (error) {
        console.error("Failed to fetch books:", error);
      } finally {
        setLoading(false);
      }
    }
    loadBooks();
  }, [page, search]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

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
      <Box display="flex" justifyContent="center" mt={4}>
        <Pagination
          count={totalPages}
          page={page}
          onChange={(e, value) => setPage(value)}
          color="primary"
          sx={{
            "& .MuiPaginationItem-root": {
              color: "#b944d0ff",
              "&.Mui-selected": {
                bgcolor: "#b944d0ff",
                color: "#fff",
              },
            },
          }}
        />
      </Box>
    </Box>
  );
}
