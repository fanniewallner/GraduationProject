import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useApi from "../../hooks/useApi";
import { Box, CircularProgress, Container, Typography } from "@mui/material";
import { IStrapiSingleResponse } from "../../models/IStrapiResponse";

export const ProductView = () => {
  const { id } = useParams();
  const api = useApi();
  const [product, setProduct] = useState<IStrapiSingleResponse>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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

  console.log(product);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography>Error: {error}</Typography>;
  }

  return (
    <Box sx={{ minHeight: "100vh", py: "5rem" }}>
      {product && (
        <>
          <Container>
            <img
              src={`http://localhost:1337${product?.data.attributes.image.data.attributes.formats.small.url}`}
            />
          </Container>
          <Typography sx={{ color: "white" }}>
            {product.data.attributes.name}
          </Typography>
          <Typography color="white">
            {product.data.attributes.description}
          </Typography>
        </>
      )}
    </Box>
  );
};
