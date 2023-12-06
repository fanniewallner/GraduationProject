import { Box, Button, Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import styles from "./Home.module.scss";
import { useTheme } from "../../contexts/ThemeContext";
import Productcard from "../../components/Productcard/Productcard";

export const Home = () => {
  const [scroll, setScroll] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        backgroundColor: theme.primaryBackgroundColor,
      }}
    >
      <Box className={`${styles.logoContainer} ${scroll ? "scroll" : ""} `}>
        <Box
          component="img"
          src="xtoolslogo.png"
          className={`${styles.logoImg} ${scroll ? "scroll" : ""} `}
        />
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "center",
          border: "3px solid red",

          position: "relative",
          top: "425px",
          width: "80%",
          gap: "1rem",
          /*         height: "auto", */
        }}
      >
        <Typography
          variant="h6"
          color={theme.secondaryColor}
          textAlign="center"
        >
          Portabla arbetsbänkar tillverkade i Sverige
        </Typography>
        <Button
          sx={{
            backgroundColor: theme.contrastColor,
            color: theme.secondaryColor,
          }}
        >
          Till produktkatalogen
        </Button>
        <Box>
          <Typography color={theme.secondaryColor}>
            "Det ska vara lätt att jobba rätt".
          </Typography>
          <Typography color={theme.secondaryColor}>
            XTools tillverkar portabla arbetsbänkar för hantverkare som tröttnat
            att arbeta på golvet eller på tillfälliga arbetsbockar och bänkar.
            En bra arbetsbänk skapar möjlighet för en trevligare och mer
            ergonomisk arbetsmiljö.Bänken kommer med fiffiga funktioner och kan
            dessutom kompletteras med tillbehör som passar just din profession.
            Detta möjliggör ett mer tidseffektivt arbete och ett snyggt
            slutresultat.
          </Typography>
        </Box>

        <Box sx={{ backgroundColor: "pink" }}>
          <Typography>Produkturval</Typography>
          <Productcard
            image={"/vite.svg"}
            title={"Produkt 1"}
            price={12345}
            description={""}
            specification={""}
            id={""}
          />
        </Box>
      </Box>
    </Container>
  );
};
