import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { GetBooksByCategory } from "../ApiData/API";
import BookList from "../Components/BookList";
import { Box, Typography, CircularProgress, Pagination } from "@mui/material";

export default function Category() {
  const { categoryName } = useParams();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [favorite, setFavorites] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(stored);
  }, []);

  useEffect(() => {
    async function loadBooks() {
      try {
        setLoading(true);
        const data = await GetBooksByCategory(categoryName.toLowerCase(), page);
        setBooks(data.results);
        setTotalPages(Math.ceil(data.count / 32));
      } catch (error) {
        console.error("failed to fetch category books:", error);
      } finally {
        setLoading(false);
      }
    }
    loadBooks();
  }, [categoryName, page]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  function addFavorite(book) {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    if (!storedFavorites.some((b) => b.id === book.id)) {
      const updated = [...storedFavorites, book];
      localStorage.setItem("favorites", JSON.stringify(updated));
    }
  }

  return (
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
