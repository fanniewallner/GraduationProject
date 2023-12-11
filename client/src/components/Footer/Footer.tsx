import { Box, Typography } from "@mui/material";
import { useTheme } from "../../contexts/ThemeContext";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import styles from "./Footer.module.scss";
import useApi, { CONTACT_ENDPOINT } from "../../hooks/useApi";
import { IContact } from "../../models/IContact";
import { Link } from "react-router-dom";

export const Footer = () => {
  const { theme } = useTheme();
  const { loading, error, data } = useApi<IContact>(CONTACT_ENDPOINT);
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <Box
      className={styles.footerWrapper}
      sx={{
        backgroundColor: theme.contrastColor,
        color: theme.secondaryColor,
      }}
    >
      <Box className={styles.footerWrapper__contacts}>
        <Typography>{data?.data.attributes.website}</Typography>
        <Typography>{data?.data.attributes.company}</Typography>
        <Typography>{data?.data.attributes.phonenumber}</Typography>
      </Box>
      <Box>
        <Typography>{data?.data.attributes.email}</Typography>
      </Box>
      <Box className={styles.footerWrapper__freeText}>
        <Typography>{data?.data.attributes.freeText}</Typography>
      </Box>
      <Box className={styles.footerWrapper__socials}>
        <Link
          to={"https://www.facebook.com/xtools.se"}
          target="_blank"
          rel="noopener noreferrer"
        >
          <FacebookIcon
            sx={{ color: theme.secondaryColor, fontSize: "2rem" }}
          />
        </Link>
        <Link
          to={"https://www.instagram.com/xtools.se/"}
          target="_blank"
          rel="noopener noreferrer"
        >
          <InstagramIcon
            sx={{ color: theme.secondaryColor, fontSize: "2rem" }}
          />
        </Link>
        <Link to={"#"} target="_blank" rel="noopener noreferrer">
          <YouTubeIcon sx={{ color: theme.secondaryColor, fontSize: "2rem" }} />
        </Link>
      </Box>
    </Box>
  );
};
