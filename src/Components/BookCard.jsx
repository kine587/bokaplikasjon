import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
} from "@mui/material";

export default function BookCard({
  book,
  onAddFavorite,
  onRemoveFavorite,
  isFavorite,
}) {
  const cover = book.formats["image/jpeg"];
  const title = book.title;

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
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            px: 2,
            py: 1,
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontSize: "1rem",
              lineHeight: 1.2,
              mb: 1,
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
            }}
          >
            {title}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: "#bdbdbd",
            }}
          >
            {book.authors?.length
              ? book.authors.map((a) => a.name).join(", ")
              : "unknown autor"}
          </Typography>
        </CardContent>
        <Box
          sx={{
            display: "flex",
            gap: 1,
            p: 2,
          }}
        >
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
          {onAddFavorite && (
            <Button
              variant="outlined"
              size="small"
              onClick={() => onAddFavorite(book)}
              disabled={isFavorite}
              sx={{
                borderColor: "#b944d0ff",
                color: "#b944d0ff",
                "&hover": { bgcolor: "#b944d020" },
                flex: 1,
              }}
            >
              {isFavorite ? "Added" : "Favorite"}
            </Button>
          )}
          {onRemoveFavorite && (
            <Button
              variant="outlined"
              size="small"
              onClick={() => onRemoveFavorite(book.id)}
              sx={{
                bgcolor: "#b944d0ff",
                color: "#b944d0ff",
                "&hover": { bgcolor: "#b944d020" },
                flex: 1,
              }}
            >
              Remove
            </Button>
          )}
        </Box>
      </Card>
    </div>
  );
}
