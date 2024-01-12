import { Box, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "../../contexts/ThemeContext";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import styles from "./Footer.module.scss";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import useApi from "../../hooks/useApi";
import { IStrapiContactResponse } from "../../models/IStrapiResponse";

export const Footer = () => {
  const { theme } = useTheme();
  const api = useApi();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loading, setLoading] = useState(false);
  const [contactData, setContactData] = useState<IStrapiContactResponse>();
  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm}px)`);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.getContactInfo();
        const message = response.data;
        setContactData(message);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <Box
      data-cy="footer"
      className={styles.footerWrapper}
      sx={{
        backgroundColor: "black",
        color: theme.secondaryColor,
      }}
    >
      <Box className={styles.footerWrapper__contacts}>
        <Typography sx={{ color: "#7b8d7c", fontWeight: "bold" }}>
          Kontakt
        </Typography>
        <Typography sx={{ fontSize: isMobile ? "12px" : "16px" }}>
          {contactData?.data.attributes.company}
        </Typography>
        <Typography sx={{ fontSize: isMobile ? "12px" : "16px" }}>
          {contactData?.data.attributes.phonenumber}
        </Typography>
        <Typography
          data-cy="footer-email"
          sx={{ fontSize: isMobile ? "12px" : "16px" }}
        >
          {contactData?.data.attributes.email}
        </Typography>
      </Box>
      <Box className={styles.footerWrapper__freeText}>
        <Typography sx={{ color: "#7b8d7c", fontWeight: "bold" }}>
          XTools
        </Typography>
        <Typography sx={{ fontSize: isMobile ? "12px" : "16px" }}>
          {contactData?.data.attributes.freeText}
        </Typography>
      </Box>

      <Box className={styles.footerWrapper__socials}>
        <Typography sx={{ color: "#7b8d7c", fontWeight: "bold" }}>
          Följ oss
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <Link
            to={"https://www.facebook.com/xtools.se"}
            target="_blank"
            aria-label="See more pictures and references on our Facebook page"
            rel="noopener noreferrer"
          >
            <FacebookIcon
              sx={{
                color: theme.secondaryColor,
                fontSize: "2rem",
                "&:hover": {
                  color: "#969696",
                },
              }}
            />
          </Link>
          <Link
            to={"https://www.instagram.com/xtools.se/"}
            target="_blank"
            aria-label="See more pictures and references on our Instagram page"
            rel="noopener noreferrer"
          >
            <InstagramIcon
              sx={{
                color: theme.secondaryColor,
                fontSize: "2rem",
                "&:hover": {
                  color: "#969696",
                },
              }}
            />
          </Link>
        </Box>
      </Box>
    </Box>
  );
};
