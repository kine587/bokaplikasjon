import { Link } from "react-router-dom";
import { Box, Button } from "@mui/material";

export default function CategoryMenu() {
  const categories = [
    "Fiction",
    "Mystery",
    "Thriller",
    "Romance",
    "Fantasy",
    "Morality",
    "Society",
    "Power",
    "Justice",
    "Adventure",
    "Tragedy",
    "War",
    "Philosophy",
  ];

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        gap: 2,
      }}
    >
      {categories.map((cat) => (
        <Button
          key={cat}
          component={Link}
          to={`/category/${cat.toLowerCase()}`}
          variant="text"
          sx={{
            color: "#b944d0ff",
            textTransform: "none",
            "&:hover": { color: "#822794ff" },
          }}
        >
          {cat}
        </Button>
      ))}
    </Box>
  );
}
