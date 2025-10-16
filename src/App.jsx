import { Outlet } from "react-router-dom";
import Header from "./Components/Header.jsx";
import { CssBaseline } from "@mui/material";

function App() {
  return (
    <>
      <CssBaseline />
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  );
}
export default App;
