import { Box, Button, Container, Typography } from "@mui/material";
import styles from "./Home.module.scss";
import { useTheme } from "../../contexts/ThemeContext";
import { MuiCarousel } from "../../components/MuiCarousel/MuiCarousel";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();

  return (
    <>
      <Container
        className={`${styles.logoContainer}`}
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box className={styles.heroContainer}>
          <Box
            component="img"
            src="xtoolslogo.png"
            className={`${styles.logoImg}`}
          />
          <Box className={styles.heroContainer__text}>
            <Typography variant="h6" color={theme.secondaryColor}>
              Portabla
              <Typography variant="h6" color={theme.contrastColor}>
                arbetsbänkar
              </Typography>
              tillverkade i Sverige
            </Typography>
            <Button
              onClick={() => navigate("/produktkatalog")}
              sx={{
                backgroundColor: theme.contrastColor,
                color: theme.secondaryColor,
                boxShadow: "3",
              }}
            >
              Till produktkatalogen
            </Button>

            <Box sx={{ textAlign: "start" }}>
              <Typography color={theme.secondaryColor}>
                "Det ska vara lätt att jobba rätt".
              </Typography>
              <Typography color={theme.secondaryColor}>
                XTools tillverkar portabla arbetsbänkar för hantverkare som
                tröttnat att arbeta på golvet eller på tillfälliga arbetsbockar
                och bänkar. En bra arbetsbänk skapar möjlighet för en trevligare
                och mer ergonomisk arbetsmiljö.Bänken kommer med fiffiga
                funktioner och kan dessutom kompletteras med tillbehör som
                passar just din profession. Detta möjliggör ett mer
                tidseffektivt arbete och ett snyggt slutresultat.
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box className={styles.flexContainer}>
          <Typography variant="h6" color={theme.secondaryColor}>
            Produkter i fokus
          </Typography>
          <MuiCarousel />
        </Box>
      </Container>
    </>
  );
};
