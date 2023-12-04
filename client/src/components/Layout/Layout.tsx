import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import { ThemeProvider } from "../../contexts/ThemeContext";

export const Layout = () => {
  return (
    <>
      <ThemeProvider>
        <Navbar />
        <Outlet />
      </ThemeProvider>
    </>
  );
};
