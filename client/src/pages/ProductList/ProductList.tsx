import {
  Box,
  Button,
  CircularProgress,
  Container,
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
  const [loading, setLoading] = useState(true);
  const [filteredAndSortedProducts, setFilteredAndSortedProducts] = useState<
    IProduct[] | null
  >();

  const fetchData = async (category?: number) => {
    if (!category || category !== null) {
      const params = new URLSearchParams(search);
      params.delete("category");
      window.history.replaceState(
        {},
        "",
        `${window.location.pathname}?${params.toString()}`
      );
    }
    try {
      const response = await api.getProducts(category);
      setProducts(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchDataAndFilter = async () => {
    const params = new URLSearchParams(search);
    const newCategory = params.get("category");

    if (newCategory) {
      console.log(newCategory);
      sessionStorage.setItem("filteredCategory", String(newCategory));
      fetchData(parseInt(newCategory, 10));
      window.history.replaceState({}, "", `?${params.toString()}`);
    } else {
      sessionStorage.clear();
      fetchData();
    }

    //SortProducts();
  };

  useEffect(() => {
    fetchDataAndFilter();
  }, [search]);

  const SortProducts = () => {
    const params = new URLSearchParams(search);
    let sortedList: IProduct[] = [...(products?.data || [])];

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
    setFilteredCategory(null);
    setFilteredAndSortedProducts(null);

    fetchData();
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
          onClick={() => {
            setFilteredCategory(1);
            const params = new URLSearchParams(window.location.search);
            params.set("category", "1");
            window.history.replaceState({}, "", `?${params.toString()}`);
          }}
        >
          Arbetsbänkar
        </Button>
        <Button
          sx={{
            backgroundColor: theme.contrastColor,
            color: theme.secondaryColor,
          }}
          className={styles.productListWrapper__filterButtons}
          onClick={() => {
            setFilteredCategory(2);
            const params = new URLSearchParams(window.location.search);
            params.set("category", "2");
            window.history.replaceState({}, "", `?${params.toString()}`);
          }}
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
      {loading ? (
        <CircularProgress sx={{ color: theme.secondaryColor }} />
      ) : (
        <Container
          sx={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
          className={styles.productListWrapper__productWrapper}
        >
          {filteredAndSortedProducts && filteredAndSortedProducts?.length > 0
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
      )}
    </Container>
  );
};
