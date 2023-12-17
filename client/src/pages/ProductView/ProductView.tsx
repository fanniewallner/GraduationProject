import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useApi from "../../hooks/useApi";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Typography,
} from "@mui/material";
import { IStrapiSingleResponse } from "../../models/IStrapiResponse";
import { useTheme } from "../../contexts/ThemeContext";
import Modal from "../../components/Modal/Modal";

export const ProductView = () => {
  const { id } = useParams();
  const { theme } = useTheme();
  const api = useApi();
  const [product, setProduct] = useState<IStrapiSingleResponse>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!id) {
          setLoading(true);
          throw new Error("Invalid product ID");
        }
        const response = await api.getProductById(id);
        setProduct(response.data);
      } catch (error) {
        setError("Error fetching product data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleClickOpen = () => {
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  console.log(product?.data.attributes.specification);

  const specs = product?.data.attributes.specification;
  const formattedSpecs = specs?.replace("n/", "\n");

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography>Error: {error}</Typography>;
  }

  return (
    <Container
      sx={{
        minHeight: "100vh",
        py: "5rem",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
      }}
    >
      {product && (
        <>
          <Container>
            <Box sx={{ width: "90%" }}>
              <img
                width="100%"
                height="auto"
                src={`http://localhost:1337${product?.data?.attributes?.image?.data?.attributes?.formats?.small?.url}`}
              />
            </Box>
          </Container>
          <Typography color={theme.secondaryColor}>
            {product.data.attributes.name}
          </Typography>
          <Typography color={theme.secondaryColor}>
            {product.data.attributes.price} kr exkl. moms
          </Typography>
          {product.data.attributes.stockStatus ?? (
            <Typography variant="h6">
              {product.data.attributes.stockStatus}
            </Typography>
          )}
          <Typography color={theme.secondaryColor}>
            {product.data.attributes.description}
          </Typography>
          <Box>
            <Typography color={theme.secondaryColor}>
              Specifikationer:
            </Typography>
            <Typography color={theme.secondaryColor}>
              {product.data.attributes.specification}
            </Typography>
          </Box>
          <Button onClick={handleClickOpen}>Skicka köpförfrågan</Button>
          <Modal open={openModal} handleClose={handleClose} />
          <Typography>
            Formulär här i modal när knapp klickad, snackbar när skickat
          </Typography>
        </>
      )}
    </Container>
  );
};
