/* import React from "react"; */
import App from "../App.jsx";
import Home from "../Pages/Home.jsx";
import Category from "../Pages/Category.jsx";
import Favorites from "../Pages/Favorites.jsx";
import BookDetails from "../Pages/BookDetails.jsx";
import ErrorPage from "../Pages/ErrorPage.jsx";

import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    /* errorElement: <ErrorPage />, */
    children: [
      { index: true, element: <Home /> },
      { path: "category/:categoryName", element: <Category /> },
      { path: "favorites", element: <Favorites /> },
      { path: "book/:id", element: <BookDetails /> },
      { path: "*", element: <ErrorPage /> },
    ],
  },
]);

export default router;
