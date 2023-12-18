import { Box, Button, Container, useMediaQuery } from "@mui/material";
import { useState, useEffect } from "react";
import useApi from "../../hooks/useApi";
import { useTheme } from "../../contexts/ThemeContext";
import styles from "./ProductList.module.scss";
import { IStrapiListResponse } from "../../models/IStrapiResponse";
import ProductCard from "../../components/ProductCardComponent/ProductCardComponent";
import FilteringComponent from "../../utils/FilteringComponent";

export const ProductList = () => {
  const { theme } = useTheme();
  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm}px)`);
  const api = useApi();
  const [products, setProducts] = useState<IStrapiListResponse>();
  const [filteredCategory, setFilteredCategory] = useState<number | null>(null);
  const [sorting, setSorting] = useState<number | null>(null);
  const { search } = window.location;

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

  useEffect(() => {
    const params = new URLSearchParams(search);
    const categoryId = params.get("category");
    if (categoryId) {
      setFilteredCategory(parseInt(categoryId, 10));
    } else {
      setFilteredCategory(null);
    }
  }, [search]);

  const filterProductsByCategory = (categoryId: number | null) => {
    setFilteredCategory(categoryId);
    const params = new URLSearchParams(search);
    if (categoryId !== null) {
      params.set("category", categoryId.toString());
    } else {
      params.delete("category");
    }
    window.location.search = params.toString();
  };

  const resetFiltering = () => {
    const params = new URLSearchParams(search);
    setFilteredCategory(null);
    params.delete("category");
    window.location.search = params.toString();
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
      <FilteringComponent />
      <Container
        sx={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
        className={styles.productListWrapper__productWrapper}
      >
        {products?.data
          .filter((product) =>
            filteredCategory
              ? product.attributes.category.data.id === filteredCategory
              : true
          )
          .map((product, index) => (
            <Box key={product.id}>
              <ProductCard product={product} />
            </Box>
          ))}
      </Container>
    </Container>
  );
};
