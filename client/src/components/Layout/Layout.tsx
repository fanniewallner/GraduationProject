import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import { Box } from "@mui/material";
import { useTheme } from "../../contexts/ThemeContext";

export const Layout = () => {
  const { theme } = useTheme();
  return (
    <Box
      sx={{
        backgroundColor: theme.primaryBackgroundColor,
        minHeight: "100vh",
        position: "relative",
      }}
    >
      <Navbar />
      <Outlet />
    </Box>
  );
};
