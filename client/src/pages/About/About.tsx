import MediaGrid from "../../components/MediaGrid/MediaGrid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import useApi from "../../hooks/useApi";
import { useEffect, useState } from "react";
import { IAboutInfo } from "../../models/IAboutInfo";
import { useTheme } from "../../contexts/ThemeContext";
import styles from "./About.module.scss";

export const About = () => {
  const { theme } = useTheme();
  const [aboutData, setAboutData] = useState<IAboutInfo>();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loading, setLoading] = useState<boolean>(true);
  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm}px)`);
  const api = useApi();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.getAboutInfo();
        const message = response.data;
        setAboutData(message);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <Container className={styles.containerWrapper}>
      <Box
        className={
          isMobile
            ? styles.containerWrapper__box
            : styles.containerWrapper__boxDesktop
        }
      >
        <MediaGrid />

        <Box sx={{ width: "100%", pt: "3.5rem" }}>
          <Typography
            sx={{ whiteSpace: "pre-line" }}
            color={theme.secondaryColor}
          >
            {aboutData?.data.attributes.freeText}
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};
