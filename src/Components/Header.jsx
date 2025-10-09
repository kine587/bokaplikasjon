import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import CategoryMeny from "./CategoryMenu.jsx";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  TextField,
  Button,
} from "@mui/material";

export default function Header() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/?search=${search}`);
      setSearch("");
    }
  };

  return (
    <>
      <AppBar
        position="static"
        sx={{
          backgroundColor: "#0a0a0aff",
          py: 2,
          alignItems: "center",
        }}
      >
        <Toolbar
          sx={{
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
            gap: 2,
          }}
        >
          <Typography
            variant="h1"
            component={Link}
            to="/"
            sx={{
              color: "#949e9fff",
              textDecoration: "none",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            BookApp
          </Typography>
          <Box
            component="form"
            onSubmit={handleSearch}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 2,
              width: "100%",
            }}
          >
            <TextField
              size="small"
              variant="outlined"
              placeholder="Søk etter bøker..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              sx={{
                backgroundColor: "white",
                borderRadius: 1,
                width: "250px",
              }}
            />
            <Button
              type="submit"
              variant="outlined"
              sx={{
                borderColor: "#b349dcff",
                color: "#b349dcff",
                "&:hover": { borderColor: "#71318bff", color: "#71318bff" },
              }}
            >
              Søk
            </Button>
            <Box sx={{ flexGrow: 1 }} />
            <Button
              component={Link}
              to="/Favorites"
              sx={{
                color: "#b349dcff",
                textTransform: "none",
                mr: 3,
              }}
            >
              Favorites
            </Button>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
              gap: 2,
              mt: 1,
            }}
          >
            <CategoryMeny />
          </Box>
        </Toolbar>
      </AppBar>
      {/* <header>
        <h1>
          <Link to="/">BookApp</Link>
        </h1>
        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Søk etter bøker..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button type="submit">Søk</button>
        </form>
        <nav>
          <Link to="/Favorites">Favorites</Link>
          <CategoryMeny />
        </nav>
      </header> */}
    </>
  );
}
