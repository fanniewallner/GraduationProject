import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useApi from "../../hooks/useApi";
import { IStrapiResponse } from "../../models/IStrapiResponse";
import { IProduct } from "../../models/IProductcard";
import { Box, CircularProgress, Typography } from "@mui/material";

export const ProductView = () => {
  const { id } = useParams();
  const api = useApi();
  const [product, setProduct] = useState<IProduct>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!id || isNaN(Number(id))) {
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

  console.log(product, "PROD VIEW");

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
          <Typography sx={{ color: "white" }}>
            {product.specification}
          </Typography>
          <Typography>hejhejhej</Typography>
          <Typography color="white">{product.description}</Typography>
        </>
      )}
    </Box>
  );
};
