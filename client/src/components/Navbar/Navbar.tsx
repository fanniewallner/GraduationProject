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
import styles from "./Navbar.module.scss";

interface Props {
  window?: () => Window;
}

const drawerWidth = 240;
const navItems = [
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
      <Link to={"/"} className={styles.flex}>
        <Typography variant="h6" color={theme.primaryColor}>
          Xtools
        </Typography>
      </Link>

      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.label} disablePadding>
            <ListItemButton>
              <Link
                to={item.path}
                style={{ textDecoration: "none", color: theme.primaryColor }}
              >
                <Typography variant="body1">{item.label}</Typography>
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
    <Box sx={{ width: "100%" }}>
      <CssBaseline />
      <AppBar
        component="nav"
        sx={{ backgroundColor: "transparent", boxShadow: "none" }}
      >
        <Toolbar id="back-to-top-anchor" className={styles.navbar__anchor}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="end"
            onClick={handleDrawerToggle}
            sx={{ display: { sm: "none" } }}
          >
            <MenuIcon sx={{ fontSize: "2rem" }} />
          </IconButton>
          <Link to={"/"} className={styles.flex}>
            <Typography
              variant="h6"
              component="div"
              sx={{
                display: {
                  xs: "none",
                  sm: "block",
                  color: theme.secondaryColor,
                },
              }}
            >
              Xtools
            </Typography>
          </Link>

          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {navItems.map((item) => (
              <Button key={item.label} className={styles.desktopLinks}>
                <Link
                  to={item.path}
                  style={{
                    textDecoration: "none",
                    color: theme.secondaryColor,
                  }}
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
