import { Box, Typography } from "@mui/material";
import { useTheme } from "../../contexts/ThemeContext";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import styles from "./Footer.module.scss";
import { getContactInfo } from "../../hooks/useApi";
import { IContact } from "../../models/IContact";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export const Footer = () => {
  const { theme } = useTheme();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<IContact>();

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await getContactInfo("/api/contact");
        setData(data);
      } catch (error) {
        console.error("Error fetching contact info:", error);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  return (
    <Box
      className={styles.footerWrapper}
      sx={{
        backgroundColor: theme.contrastColor,
        color: theme.secondaryColor,
      }}
    >
      <Box className={styles.footerWrapper__contacts}>
        <Typography variant="h6">Kontakt</Typography>
        <Typography>{data?.data.attributes.company}</Typography>
        <Typography>{data?.data.attributes.phonenumber}</Typography>
        <Typography>{data?.data.attributes.email}</Typography>
      </Box>
      <Box className={styles.footerWrapper__freeText}>
        <Typography variant="h6">Xtools</Typography>
        <Typography>{data?.data.attributes.freeText}</Typography>
      </Box>

      <Box className={styles.footerWrapper__socials}>
        <Typography variant="h6">Följ oss</Typography>
        <Box sx={{ display: "flex", flexDirection: "row" }}>
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
            <YouTubeIcon
              sx={{ color: theme.secondaryColor, fontSize: "2rem" }}
            />
          </Link>
        </Box>
      </Box>
    </Box>
  );
};
