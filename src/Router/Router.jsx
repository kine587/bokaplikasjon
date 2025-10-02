/* import React from "react"; */
import App from "../App.jsx";
import Home from "../pages/Home.jsx";
import Category from "../pages/Category.jsx";
import Favorites from "../pages/Favorites.jsx";
import BookDetails from "../pages/BookDetails.jsx";
import ErrorPage from "../pages/ErrorPage.jsx";

import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    /* errorElement: <ErrorPage />, */
    children: [
      { index: true, element: <Home /> },
      { path: "category/:category", element: <Category /> },
      { path: "favorites", element: <Favorites /> },
      { path: "book/:id", element: <BookDetails /> },
      { path: "*", element: <ErrorPage /> },
    ],
  },
]);

export default router;
