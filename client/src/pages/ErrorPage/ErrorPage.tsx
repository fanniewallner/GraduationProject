import { Container, Typography, Button, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../contexts/ThemeContext";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";

export const ErrorPage = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  return (
    <Container
      sx={{
        height: "100vh",
        pt: "5rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "1rem",
      }}
    >
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
