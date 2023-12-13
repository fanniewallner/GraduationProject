import { Box, Button, Container, Typography } from "@mui/material";
import ProductCard from "../../components/ProductCard/ProductCard";
import { useState, useEffect } from "react";
import useApi from "../../hooks/useApi";
import { IProduct } from "../../models/IProductcard";
import { IStrapiResponse } from "../../models/IStrapiResponse";
import { useTheme } from "../../contexts/ThemeContext";

export const ProductList = () => {
  const { theme } = useTheme();
  const api = useApi();
  const [products, setProducts] = useState<
    IStrapiResponse<IProduct> | undefined
  >();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.getProducts();
        setProducts(response.data);
      } catch (error) {
        console.log(error);
      }
      console.log("produkter state productlist", products);
    };

    fetchData();
  }, []);
  return (
    <Box
      sx={{
        minHeight: "100vh",
        pt: "6rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "1rem",
        pb: "1rem",
      }}
    >
      <Button
        sx={{
          width: "50%",
          backgroundColor: theme.contrastColor,
          color: theme.secondaryColor,
        }}
      >
        Arbetsbänkar
      </Button>
      <Button
        sx={{
          backgroundColor: theme.contrastColor,
          color: theme.secondaryColor,
          width: "50%",
        }}
      >
        Tillbehör
      </Button>
      <Button
        sx={{
          width: "50%",
          backgroundColor: theme.contrastColor,
          color: theme.secondaryColor,
        }}
      >
        Alla produkter
      </Button>
      <Typography variant="h6" color={theme.secondaryColor}>
        Nu visas xx produkter
      </Typography>
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          alignItems: "center",
        }}
      >
        {products?.data.map((product, index) => (
          <Box key={product.id}>
            <ProductCard
              productAttributes={product.attributes}
              productId={product.id}
            />
          </Box>
        ))}
      </Container>
    </Box>
  );
};
