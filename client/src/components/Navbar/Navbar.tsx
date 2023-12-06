import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useTheme } from "../../contexts/ThemeContext";
import { Link } from "react-router-dom";

interface Props {
  window?: () => Window;
}

const drawerWidth = 240;
const navItems = [
  { label: "Hem", path: "/" },
  { label: "Produktkatalog", path: "/produkter" },
  { label: "Om Xtools", path: "/om-oss" },
  { label: "Kontakt", path: "/kontakt" },
  { label: "Köpvillkor", path: "/kopvillkor" },
];

export default function DrawerAppBar(props: Props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const { theme } = useTheme();

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box
      onClick={handleDrawerToggle}
      sx={{
        textAlign: "center",
        color: theme.primaryColor,
      }}
    >
      <Typography variant="h6" sx={{ my: 2 }}>
        Xtools
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.label} disablePadding>
            <ListItemButton sx={{ textAlign: "center" }}>
              <Link
                to={item.path}
                style={{ textDecoration: "none", color: theme.primaryColor }}
              >
                <Typography variant="body1" sx={{ color: "inherit" }}>
                  {item.label}
                </Typography>
              </Link>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        component="nav"
        sx={{
          backgroundColor: "transparent",
          boxShadow: "none",
        }}
      >
        <Toolbar
          id="back-to-top-anchor"
          sx={{ display: "flex", justifyContent: "flex-end" }}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="end"
            onClick={handleDrawerToggle}
            sx={{ mr: 0, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            Xtools
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {navItems.map((item) => (
              <Button key={item.label} sx={{ color: "#fff" }}>
                <Link
                  to={item.path}
                  style={{ textDecoration: "none", color: theme.primaryColor }}
                >
                  {item.label}
                </Link>
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          anchor="right"
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </Box>
  );
}
