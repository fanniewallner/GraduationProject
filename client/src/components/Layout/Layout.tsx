import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import { Box, Fab, Zoom } from "@mui/material";
import { useTheme } from "../../contexts/ThemeContext";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import useScrollTrigger from "@mui/material/useScrollTrigger";

interface LayoutProps {
  window?: () => Window;
}
export const Layout = (props: LayoutProps) => {
  const { theme } = useTheme();

  const handleScrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const trigger = useScrollTrigger({
    target: props.window ? props.window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });
  return (
    <Box>
      <Navbar />
      <Outlet />
      <Zoom in={trigger} unmountOnExit>
        <Fab
          size="small"
          onClick={handleScrollTop}
          sx={{
            position: "fixed",
            color: theme.secondaryColor,
            backgroundColor: theme.contrastColor,
            bottom: "5%",
            right: "10%",
          }}
        >
          <KeyboardArrowUpIcon />
        </Fab>
      </Zoom>
    </Box>
  );
};
