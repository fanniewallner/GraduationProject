import { useEffect, useState } from "react";
import useApi from "../../hooks/useApi";
import { Box, Container, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "../../contexts/ThemeContext";
import styles from "./PurchaseConditions.module.scss";

export const PurchaseConditions = () => {
  const api = useApi();
  const { theme } = useTheme();
  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm}px)`);
  const [loading, setLoading] = useState(true);
  const [contact, setContact] = useState<string>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.getPurchaseConditions();
        const message = response.data.data.attributes.text;
        setContact(message);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  console.log(contact);
  return (
    <Container
      className={styles.purchaseConditionWrapper}
      sx={{ flexDirection: isMobile ? "column" : "row" }}
    >
      <Box sx={{ maxWidth: isMobile ? "100%" : "60%" }}>
        <img
          loading="lazy"
          src="/xtoolslogo.png"
          alt="XTools Logo"
          style={{ width: isMobile ? "100%" : "60%", height: "auto" }}
        />
      </Box>
      <Typography
        variant="h5"
        fontFamily={"Poppins"}
        color={theme.secondaryColor}
      >
        Köpvillkor
      </Typography>
      <Box
        sx={{
          paddingTop: "2rem",
          height: "60vh",
          width: isMobile ? "100%" : "60%",
          overflowY: "scroll",
        }}
      >
        <Typography
          sx={{ whiteSpace: "pre-line", color: theme.secondaryColor }}
        >
          {contact}
        </Typography>
      </Box>
    </Container>
  );
};
