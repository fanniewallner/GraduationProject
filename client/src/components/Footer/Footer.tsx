import { Box, Typography } from "@mui/material";
import { useTheme } from "../../contexts/ThemeContext";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import styles from "./Footer.module.scss";

export const Footer = () => {
  const { theme } = useTheme();
  return (
    <Box
      data-cy="footer"
      className={styles.footerWrapper}
      sx={{
        backgroundColor: theme.contrastColor,
        color: theme.secondaryColor,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography>hemsida</Typography>
        <Typography>kreativa snicakre AB</Typography>
        <Typography>telefon</Typography>
      </Box>
      <Box>
        <Typography>email</Typography>
      </Box>
      <Box>
        <Typography>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Provident
          corrupti, nobis autem veritatis beatae nesciunt consequatur modi illo
          sapiente quibusdam, ipsa assumenda dolorum error obcaecati.
        </Typography>
      </Box>
      <Box>
        <FacebookIcon sx={{ color: theme.secondaryColor, fontSize: "2rem" }} />
        <InstagramIcon sx={{ color: theme.secondaryColor, fontSize: "2rem" }} />
        <YouTubeIcon sx={{ color: theme.secondaryColor, fontSize: "2rem" }} />
      </Box>
    </Box>
  );
};
