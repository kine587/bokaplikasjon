localStorage.setItem("favorites", JSON.stringify());

function addFavorites(book) {
  const storedFavorites = JSON.parse(localStorage.getItem("favorites"));

  const exists = storedFavorites.some((book) => b.id === book.id);
  if (!exists) {
    const updateFavorites = [...storedFavorites, book];
    localStorage.setItem("favorites", JSON.stringify(updateFavorites));
  }
}
