import { Box, Typography } from "@mui/material";
import { useTheme } from "../../contexts/ThemeContext";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import styles from "./Footer.module.scss";
import useApi, { CONTACT_ENDPOINT } from "../../hooks/useApi";
import { IContact } from "../../models/IContact";

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
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography>{data?.data.attributes.website}</Typography>
        <Typography>{data?.data.attributes.company}</Typography>
        <Typography>{data?.data.attributes.phonenumber}</Typography>
      </Box>
      <Box>
        <Typography>{data?.data.attributes.email}</Typography>
      </Box>
      <Box>
        <Typography>{data?.data.attributes.freeText}</Typography>
      </Box>
      <Box>
        <FacebookIcon sx={{ color: theme.secondaryColor, fontSize: "2rem" }} />
        <InstagramIcon sx={{ color: theme.secondaryColor, fontSize: "2rem" }} />
        <YouTubeIcon sx={{ color: theme.secondaryColor, fontSize: "2rem" }} />
      </Box>
    </Box>
  );
};
