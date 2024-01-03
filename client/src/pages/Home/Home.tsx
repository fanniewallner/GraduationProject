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
      <Container className={styles.logoContainer}>
        <Box className={styles.heroContainer}>
          <Box
            data-cy="logo"
            component="img"
            alt="XTools-logo"
            src="xtoolslogo.webp"
            className={styles.logoImg}
          />
          <Box className={styles.heroContainer__text}>
            <Typography variant="h5" color={theme.secondaryColor}>
              Portabla{" "}
              <span
                style={{
                  color: theme.secondaryColor,
                  background: theme.contrastColor,
                }}
              >
                arbetsbänkar
              </span>{" "}
              tillverkade i Sverige
            </Typography>
            <Button
              data-cy="actionButton"
              onClick={() => navigate("/produktkatalog")}
              sx={{
                backgroundColor: theme.contrastColor,
                color: theme.secondaryColor,
                boxShadow: "3",
                width: "75%",
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
