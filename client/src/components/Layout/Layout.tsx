import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import { Box, Fab, Zoom } from "@mui/material";
import { useTheme } from "../../contexts/ThemeContext";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import styles from "./Layout.module.scss";
import { Footer } from "../Footer/Footer";
import { ProductCartContext } from "../../contexts/ProductCardContext";
import { useReducer, useState } from "react";
import {
  ProductsReducer,
  initialCartState,
} from "../../reducers/ProductsReducer";
import Modal from "../Modal/Modal";
interface LayoutProps {
  window?: () => Window;
}
export const Layout = (props: LayoutProps) => {
  const [state, dispatch] = useReducer(ProductsReducer, initialCartState);
  const { theme } = useTheme();
  const [openModal, setOpenModal] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState<boolean>(false);

  const handleClickOpen = () => {
    setOpenModal(true);
  };

  console.log(state);

  const handleClose = () => {
    setOrderConfirmed(false);
    setOpenModal(false);
  };

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
    <ProductCartContext.Provider value={{ state, dispatch }}>
      <Box className={styles.layoutWrapper}>
        <Navbar handleClickOpen={handleClickOpen} />
        <Modal
          open={openModal}
          handleClose={handleClose}
          orderConfirmed={orderConfirmed}
          setOrderConfirmed={setOrderConfirmed}
          products={state}
        />
        <Outlet />
        <Footer />
        <Zoom in={trigger} unmountOnExit>
          <Fab
            size="small"
            className={styles.fabIcon}
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
    </ProductCartContext.Provider>
  );
};
