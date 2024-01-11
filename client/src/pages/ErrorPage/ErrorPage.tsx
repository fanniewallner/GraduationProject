import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import { useTheme } from "../../contexts/ThemeContext";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import styles from "./ErrorPage.module.scss";

export const ErrorPage = () => {
  const { theme } = useTheme();
  return (
    <Container className={styles.containerWrapper}>
      <SentimentVeryDissatisfiedIcon
        sx={{ color: theme.secondaryColor, fontSize: "5rem" }}
      />
      <Typography variant="h1" color={theme.secondaryColor}>
        404
      </Typography>
      <Typography color={theme.secondaryColor}>
        Sidan kunde tyvärr inte hittas..
      </Typography>
      <Typography color={theme.secondaryColor}>
        Vi arbetar för att få tillbaka den, men under tiden kan du kika vidare
        på {""}
        <Link
          style={{ color: theme.secondaryColor, textDecoration: "underline" }}
          component={Link}
          href="/produktkatalog"
        >
          produktkatalogen.
        </Link>
        Eller kika vidare på{" "}
        <Link
          style={{ color: theme.secondaryColor, textDecoration: "underline" }}
          component={Link}
          href="/"
        >
          startsidan
        </Link>{" "}
        vet jag!
      </Typography>
      <Typography color={theme.secondaryColor}>
        Vill du ha kontakt med oss? Mejla oss på kreativasnickare@gmail.com
      </Typography>
    </Container>
  );
};
