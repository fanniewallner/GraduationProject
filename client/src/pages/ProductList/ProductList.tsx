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
import FilteringComponent from "../../utils/FilteringComponent";
import { IProduct } from "../../models/IProduct";

export const ProductList = () => {
  const { theme } = useTheme();
  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm}px)`);
  const api = useApi();
  const [products, setProducts] = useState<IStrapiListResponse>();
  const [filteredCategory, setFilteredCategory] = useState<number | null>(null);
  const [sorting, setSorting] = useState<number | null>(null);
  const { search } = window.location;
  const [filteredAndSortedProducts, setFilteredAndSortedProducts] =
    useState<IProduct[]>();

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
    filterAndSortProducts();
  }, [filteredCategory, sorting]);

  const filterAndSortProducts = () => {
    const params = new URLSearchParams(search);
    let filteredList: IProduct[] = products?.data || [];

    if (filteredCategory) {
      params.set("category", filteredCategory.toString());
      filteredList =
        products?.data.filter((product) =>
          filteredCategory
            ? product.attributes.category.data.id === filteredCategory
            : true
        ) || [];
    }

    let sortedList: IProduct[] = filteredList;

    if (sorting === 3) {
      sortedList.sort((a: IProduct, b: IProduct) =>
        a.attributes.name.localeCompare(b.attributes.name)
      );
    } else if (sorting === 4) {
      sortedList.sort((a: IProduct, b: IProduct) =>
        b.attributes.name.localeCompare(a.attributes.name)
      );
    } else if (sorting === 5) {
      sortedList.sort((a: IProduct, b: IProduct) =>
        a.attributes.price.localeCompare(b.attributes.price)
      );
    } else if (sorting === 6) {
      sortedList.sort((a: IProduct, b: IProduct) =>
        b.attributes.price.localeCompare(a.attributes.price)
      );
    }

    setFilteredAndSortedProducts(sortedList);
    window.history.replaceState({}, "", `?${params.toString()}`);
  };

  const resetFiltering = () => {
    const params = new URLSearchParams(search);
    setFilteredCategory(null);
    params.delete("category");
    window.location.search = params.toString();
  };
  /* 
  const handleCategoryParams = (categoryId: number) => {
    setFilteredCategory(categoryId);
    const params = new URLSearchParams(search);
    if (categoryId !== null) {
      params.set("category", categoryId.toString());
      window.location.search = params.toString();
      filterAndSortProducts();
    }
  }; */
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
        <Typography>{sorting}</Typography>
        <Button
          sx={{
            backgroundColor: theme.contrastColor,
            color: theme.secondaryColor,
          }}
          className={styles.productListWrapper__filterButtons}
          onClick={() => setFilteredCategory(1)}
        >
          Arbetsbänkar
        </Button>
        <Button
          sx={{
            backgroundColor: theme.contrastColor,
            color: theme.secondaryColor,
          }}
          className={styles.productListWrapper__filterButtons}
          onClick={() => setFilteredCategory(2)}
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
      <FilteringComponent filter={sorting} setFilter={setSorting} />
      <Container
        sx={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
        className={styles.productListWrapper__productWrapper}
      >
        {filteredAndSortedProducts
          ? filteredAndSortedProducts?.map((product) => (
              <Box key={product.id}>
                <ProductCard product={product} />
              </Box>
            ))
          : products?.data.map((product) => (
              <Box key={product.id}>
                <ProductCard product={product} />
              </Box>
            ))}
      </Container>
    </Container>
  );
};
