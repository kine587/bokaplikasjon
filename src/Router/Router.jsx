import React from "react";
import App from "./App.jsx";
import Home from "./pages/Home.jsx";
import Category from "./pages/Category.jsx";
import Favorites from "./pages/Favorites.jsx";

import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: "Category", element: <Category /> },
      { path: "favorites", element: <Favorites /> },
      { path: "Book/:id", element: <BookDetails /> },
    ],
  },
]);

export default router;
