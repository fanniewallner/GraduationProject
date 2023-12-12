import { Box, Typography } from "@mui/material";
import { useTheme } from "../../contexts/ThemeContext";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import styles from "./Footer.module.scss";
import { IContact } from "../../models/IContact";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import useApi from "../../hooks/useApi";

export const Footer = () => {
  const { theme } = useTheme();
  const api = useApi();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<IContact>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.getContactInfo();
        setData(response.data);
      } catch (error) {
        console.log(error);
      }
      console.log("kontaktstate", data);
    };

    fetchData();
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
