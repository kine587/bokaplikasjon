const API_URL = "https://gutendex.com/books";

export async function FetchBooks(page = 1) {
  const response = await fetch(`${API_URL}/?page=${page}`);
  return response.json();
}

export async function SearchBooks(search) {
  const response = await fetch(
    `${API_URL}?search=${encodeURIComponent(search)}`
  );
  return response.json();
}

export async function GetBooksByCategory(topic) {
  const response = await fetch(`${API_URL}?topic=${encodeURIComponent(topic)}`);
  return response.json();
}

export async function Details(id) {
  const response = await fetch(`${API_URL}?ids=${id}`);
  return response.json();
}
