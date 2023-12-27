import {
  Box,
  Button,
  CircularProgress,
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
  const [loading, setLoading] = useState(true);
  const [filteredAndSortedProducts, setFilteredAndSortedProducts] = useState<
    IProduct[] | null
  >();

  useEffect(() => {
    try {
      const productsFromLS = localStorage.getItem(
        "filteredAndSortedProductList"
      );
      if (productsFromLS && JSON.parse(productsFromLS).length > 0) {
        console.log("FROM LS", productsFromLS);
        const previousProducts = JSON.parse(productsFromLS);
        setProducts({ data: previousProducts });
        setFilteredAndSortedProducts(previousProducts);
        console.log("LS", products);
      } else {
        console.log("ELSE - hämtat data", products);
        fetchData();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchData = async () => {
    const response = await api.getProducts();
    const responseData = response.data.data;

    setProducts(response.data);
    setFilteredAndSortedProducts(responseData);
    localStorage.setItem(
      "filteredAndSortedProductList",
      JSON.stringify(responseData)
    );
  };

  useEffect(() => {
    filterAndSortProducts();
  }, [filteredCategory, sorting]);

  const filterAndSortProducts = () => {
    const params = new URLSearchParams(search);
    let filteredList: IProduct[] = products?.data || [];

    //const productsFromLS = localStorage.getItem("filteredAndSortedProductList");

    /*     if (productsFromLS && JSON.parse(productsFromLS).length > 0) {
      const previousProducts = JSON.parse(productsFromLS);
      setFilteredAndSortedProducts(previousProducts);
      return;
    } */

    const currentFilter = params.get("category");
    if (filteredCategory && filteredCategory.toString() !== currentFilter) {
      params.set("category", filteredCategory.toString());
      filteredList =
        products?.data.filter((product) =>
          filteredCategory
            ? product.attributes.category.data.id === filteredCategory
            : true
        ) || [];
    } /* else {
      const productsFromLS = localStorage.getItem("filteredAndSortedProductList");
      const previousProducts = JSON.parse(productsFromLS);
      setFilteredAndSortedProducts(previousProducts);
    }
 */
    let sortedList: IProduct[] = [...filteredList];

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
    localStorage.setItem(
      "filteredAndSortedProductList",
      JSON.stringify(sortedList)
    );
    console.log("FILTER FN LS", sortedList);
  };

  const resetFiltering = () => {
    const params = new URLSearchParams(search);
    setFilteredCategory(null);
    params.delete("category");
    setFilteredAndSortedProducts(null);
    window.history.replaceState({}, "", window.location.pathname);
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
      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            gap: "1rem",
            alignItems: "center",
          }}
        >
          <CircularProgress sx={{ color: theme.contrastColor }} />
          <Typography sx={{ color: theme.contrastColor }}>Loading..</Typography>
        </Box>
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
          {filteredAndSortedProducts !== null
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
