import {
  Box,
  Button,
  Container,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useState, useEffect } from "react";
import useApi from "../../hooks/useApi";
import { useTheme } from "../../contexts/ThemeContext";
import styles from "./ProductList.module.scss";
import { IStrapiListResponse } from "../../models/IStrapiResponse";
import ProductCard from "../../components/ProductCardComponent/ProductCardComponent";

export const ProductList = () => {
  const { theme } = useTheme();
  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm}px)`);
  const api = useApi();
  const [products, setProducts] = useState<IStrapiListResponse>();
  const [filteredCategory, setFilteredCategory] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.getProducts();
        setProducts(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const filterProductsByCategory = (categoryId: number | null) => {
    setFilteredCategory(categoryId);
  };

  const filteredProducts = filteredCategory
    ? products?.data.filter(
        (product) => product.attributes.category.data.id === filteredCategory
      )
    : products?.data;

  const resetFiltering = () => {
    setFilteredCategory(null);
  };

  return (
    <Container className={styles.productListWrapper}>
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1rem",
          py: "1rem",
          width: isMobile ? "100%" : "20%",
        }}
      >
        <Button
          sx={{
            backgroundColor: theme.contrastColor,
            color: theme.secondaryColor,
          }}
          className={styles.productListWrapper__filterButtons}
          onClick={() => filterProductsByCategory(1)}
        >
          Arbetsbänkar
        </Button>
        <Button
          sx={{
            backgroundColor: theme.contrastColor,
            color: theme.secondaryColor,
          }}
          className={styles.productListWrapper__filterButtons}
          onClick={() => filterProductsByCategory(2)}
        >
          Tillbehör
        </Button>
        <Button
          sx={{
            backgroundColor: theme.contrastColor,
            color: theme.secondaryColor,
          }}
          className={styles.productListWrapper__filterButtons}
          onClick={() => resetFiltering()}
        >
          Alla produkter
        </Button>
      </Container>
      <Container
        sx={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
        }}
        className={styles.productListWrapper__productWrapper}
      >
        {filteredProducts?.map((product, index) => (
          <Box key={product.id}>
            <ProductCard product={product} />
          </Box>
        ))}
        {!filteredProducts &&
          products?.data.map((product, index) => (
            <Box key={product.id}>
              <ProductCard product={product} />
            </Box>
          ))}
      </Container>
    </Container>
  );
};
