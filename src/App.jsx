import { Outlet } from "react-router-dom";
import "./App.css";
import Header from "./Components/Header.jsx";

function App() {
  return (
    <>
      <h1>Hei</h1>
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  );
}
export default App;
