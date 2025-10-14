import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from "@mui/material";

export default function BookCard({ book /* favoriteBooks = [] */ }) {
  /* const isFavorite = favoriteBooks.some((b) => b.id === book.id); */
  const cover = book.formats["image/jpeg"];
  const title = book.title;
  /* const author = book.author?.[0]?.name; */

  return (
    <div>
      <Card
        sx={{
          bgcolor: "#201c1cff",
          color: "white",
          borderRadius: 2,
          boxShadow: 3,
          width: 250,
          height: 400,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          textAlign: "center",
        }}
      >
        {cover && (
          <CardMedia
            component="img"
            image={cover}
            alt={title}
            sx={{
              height: 200,
              width: "100%",
              borderTopLeftRadius: 8,
              borderTopRightRadius: 8,
            }}
          />
        )}
        <CardContent
          sx={{
            flexGrow: 1,
            width: 250,
            padding: "8px 12px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontSize: "1rem",
              lineHeight: 1.2,
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
            }}
          >
            {title}
          </Typography>
        </CardContent>
        <Button
          component={Link}
          to={`/book/${book.id}`}
          variant="contained"
          size="small"
          sx={{
            bgcolor: "#9c3aa3ff",
            "&:hover": { bgcolor: "#7c3188ff" },
            borderRadius: "0 0 8px 8px",
            fontSize: "0.75rem",
            padding: "4px 10px",
            minWidth: "auto",
            mb: 1,
          }}
        >
          Details
        </Button>
      </Card>
    </div>
  );
}
