import { Link } from "react-router-dom";

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
    <>
      <ul>
        {categories.map((cat) => (
          <li key={cat}>
            <Link to={`/category/${cat.toLowerCase()}`}>{cat}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}
