import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import styles from "./Home.module.scss";
import { useTheme } from "../../contexts/ThemeContext";
import { MuiCarousel } from "../../components/MuiCarousel/MuiCarousel";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm}px)`);

  return (
    <>
      <Container
        className={
          isMobile ? styles.logoContainer : styles.logoContainerDesktop
        }
      >
        <Box className={styles.heroContainer}>
          <Box sx={{ width: isMobile ? "100%" : "40%" }}>
            <img
              data-cy="logo"
              loading="lazy"
              alt="XTools-logo"
              src="/xtoolslogo.webp"
              className={styles.logoImg}
            />
          </Box>

          <Box className={styles.heroContainer__text}>
            <Typography
              variant="h5"
              color={theme.secondaryColor}
              fontFamily={"Poppins"}
              sx={{ marginBottom: "0.5rem" }}
            >
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
              aria-label="Till produktkatalogen"
              tabIndex={0}
              data-cy="actionButton"
              onClick={() => navigate("/produktkatalog")}
              sx={{
                backgroundColor: theme.contrastColor,
                color: theme.secondaryColor,
              }}
            >
              Till produktkatalogen
            </Button>

            <Box sx={{ textAlign: "start" }}>
              <Typography color={theme.secondaryColor}>
                Det ska vara lätt att jobba rätt.
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
        {!isMobile ? (
          <Box className={styles.flexContainer}>
            <Typography
              variant="h6"
              color={theme.secondaryColor}
              fontFamily={"Poppins"}
            >
              Produkter i fokus
            </Typography>
            <MuiCarousel />
          </Box>
        ) : null}
      </Container>
    </>
  );
};
