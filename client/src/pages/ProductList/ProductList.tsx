import { Box, Button, Container, Typography } from "@mui/material";
import ProductCard from "../../components/ProductCard/ProductCard";
import { useState, useEffect } from "react";
import useApi from "../../hooks/useApi";
import { IProduct } from "../../models/IProductcard";
import { IStrapiResponse } from "../../models/IStrapiResponse";
import { useTheme } from "../../contexts/ThemeContext";
import styles from "./ProductList.module.scss";

export const ProductList = () => {
  const { theme } = useTheme();
  const api = useApi();
  const [products, setProducts] = useState<
    IStrapiResponse<IProduct> | undefined
  >();
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

  console.log("FILTERING", filteredProducts);

  return (
    <Box className={styles.productListWrapper}>
      <Button
        className={styles.productListWrapper__filterButtons}
        onClick={() => filterProductsByCategory(1)}
      >
        Arbetsbänkar
      </Button>
      <Button
        className={styles.productListWrapper__filterButtons}
        onClick={() => filterProductsByCategory(2)}
      >
        Tillbehör
      </Button>
      <Button
        className={styles.productListWrapper__filterButtons}
        onClick={() => resetFiltering()}
      >
        Alla produkter
      </Button>
      <Container className={styles.productListWrapper__productWrapper}>
        {filteredProducts?.map((product, index) => (
          <Box key={product.id}>
            <ProductCard
              productAttributes={product.attributes}
              productId={product.id}
            />
          </Box>
        ))}
        {!filteredProducts &&
          products?.data.map((product, index) => (
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
