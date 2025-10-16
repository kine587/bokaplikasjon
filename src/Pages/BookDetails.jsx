import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  CircularProgress,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";

export default function BookDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`https://gutendex.com/books?ids=${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Noe gikk galt");
        return res.json();
      })
      .then((data) => {
        setBook(data.results[0]);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);
  if (loading)
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignContent="center"
        minHeight="100vh"
        sx={{
          bgcolor: "#121212",
        }}
      >
        <CircularProgress
          sx={{
            color: "#b944d0ff",
          }}
        />
      </Box>
    ); /* <p>Laster...</p>; */
  if (error)
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignContent="center"
        minHeight="100vh"
        sx={{
          bgcolor: "#121212",
          color: "white",
        }}
      >
        <Typography variant="h6">Feil: {error}</Typography>
      </Box>
    ); /* <p>Feil: {error}</p>; */

  function addFavorite(book) {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    if (!storedFavorites.some((b) => b.id === book.id)) {
      const updated = [...storedFavorites, book];
      localStorage.setItem("favorites", JSON.stringify(updated));
      alert(`${book.title} added to favorites!`);
    }
  }

  const cover = book?.formats?.["image/jpeg"];
  const readLink = Object.entries(book.formats).find(([key]) =>
    key.includes("text/html")
  )?.[1];

  return (
    <Box
      sx={{
        bgcolor: "#121212",
        color: "white",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        //alignItems: "center",
        px: 6,
      }}
    >
      <Card
        sx={{
          bgcolor: "#1e1e1e",
          color: "white",
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          width: { xs: "90%", md: "70%", lg: "50%" },
          //            width: "100vw",
          maxHeight: "55vh",
          borderRadius: 3,
          boxShadow: "none",
          overflow: "hidden",
        }}
      >
        {cover && (
          <CardMedia
            component="img"
            image={cover}
            alt={book.title}
            sx={{
              width: { xs: "100%", md: "30%" },
              height: "auto",
              objectFit: "cover",
            }}
          />
        )}
        <CardContent
          sx={{
            flex: 1,
            p: { xs: 3, md: 6 },
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 2,
            maxWidth: "1400px",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              color: "#b944d0ff",
            }}
          >
            {book.title}
          </Typography>

          <Typography
            variant="subtitle1"
            sx={{
              color: "#bdbdbd",
            }}
          >
            {book.authors?.length ? book.authors[0].name : "unknown author"}
          </Typography>

          <Typography variant="body1">
            Languages: {book.languages.join(", ")}
          </Typography>
          <Typography variant="body1">
            Downloads: {book.download_count.toLocaleString()}
          </Typography>

          {readLink && (
            <Button
              variant="contained"
              href={readLink}
              target="_Blank"
              rel="noopener noreferrer"
              sx={{
                bgcolor: "#b944d0ff",
                "&:hover": { bgcolor: "#8a35a0" },
              }}
            >
              Read online
            </Button>
          )}
          <Box
            sx={{
              display: "flex",
              gap: 2,
              mt: 3,
            }}
          >
            <Button
              variant="outlined"
              onClick={() => addFavorite(book)}
              sx={{
                borderColor: "#b944d0ff",
                color: "#b944d0ff",
                "&hover": {
                  bgcolor: "#b944d20",
                  borderColor: "#b944d0ff",
                },
              }}
            >
              Add to favorite
            </Button>
            <Button
              variant="text"
              onClick={() => navigate(-1)}
              sx={{
                color: "#b944d0ff",
                "&hover": { textDecoration: "none" },
              }}
            >
              Back
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
