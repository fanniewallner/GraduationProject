import { useEffect, useState } from "react";
import useApi from "../../hooks/useApi";
import { Container, Typography } from "@mui/material";

export const PurchaseConditions = () => {
  const api = useApi();
  const [loading, setLoading] = useState(true);
  const [contact, setContact] = useState<string>();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.getPurchaseConditions();
        const message = response.data.data.attributes.text;
        setContact(message);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  console.log(contact);
  return (
    <Container sx={{ minHeight: "100vh", pt: "5rem" }}>
      <Typography sx={{ whiteSpace: "pre-line" }}>{contact}</Typography>
    </Container>
  );
};
