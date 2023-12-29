import MediaGrid from "../../components/MediaGrid/MediaGrid";
import { Container, Typography } from "@mui/material";
import { useTheme } from "../../contexts/ThemeContext";
import useApi from "../../hooks/useApi";
import { useEffect, useState } from "react";
import { IAboutInfo } from "../../models/IAboutInfo";

export const About = () => {
  const [aboutData, setAboutData] = useState<IAboutInfo>();
  const [loading, setLoading] = useState<boolean>(true);
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
  const { theme } = useTheme();
  return (
    <>
      <Container sx={{ minHeight: "100vh", paddingTop: "5rem" }}>
        <Typography variant="h6" color={theme.secondaryColor}>
          Om XTools
        </Typography>
        <MediaGrid />
        <Typography color={theme.secondaryColor}>
          {aboutData?.data.attributes.freeText}
        </Typography>
      </Container>
    </>
  );
};
