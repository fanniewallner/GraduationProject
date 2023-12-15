import { Box, Button, Container, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import useApi from "../../hooks/useApi";
import { useTheme } from "../../contexts/ThemeContext";
import styles from "./ProductList.module.scss";
import { IStrapiListResponse } from "../../models/IStrapiResponse";
import { IProduct } from "../../models/IProduct";
import ProductCard from "../../components/ProductCardComponent/ProductCardComponent";

export const ProductList = () => {
  const { theme } = useTheme();
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

  /*   const filteredProducts = filteredCategory
  ? products?.data.filter(({ product }: { product: IProduct }) => product.attributes.category.data.id === filteredCategory)
  : products?.data; */

  const resetFiltering = () => {
    setFilteredCategory(null);
  };

  //console.log("FILTERING", filteredProducts);

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
        {/*         {filteredProducts?.map((product, index) => (
          <Box key={product.id}>
            <ProductCard product={product} />
          </Box>
        ))} */}
        {products &&
          products?.data.map((product, index) => (
            <Box key={product.id}>
              <ProductCard product={product} />
            </Box>
          ))}
      </Container>
    </Box>
  );
};
