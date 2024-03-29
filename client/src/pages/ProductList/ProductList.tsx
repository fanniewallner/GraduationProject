import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Container from "@mui/material/Container";
import useMediaQuery from "@mui/material/useMediaQuery";
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
  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.md}px)`);
  const api = useApi();
  const [products, setProducts] = useState<IStrapiListResponse>();
  const [filteredCategory, setFilteredCategory] = useState<number | null>(null);
  const [sorting, setSorting] = useState<number | null>(null);
  const { search } = window.location;
  const [loading, setLoading] = useState(true);
  const [filteredAndSortedProducts, setFilteredAndSortedProducts] = useState<
    IProduct[] | null
  >();

  const fetchData = async (category?: number): Promise<IProduct[]> => {
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
      return response.data.data;
    } catch (error) {
      console.log(error);
      return [];
    } finally {
      setLoading(false);
    }
  };

  const fetchDataAndFilter = async () => {
    const params = new URLSearchParams(search);
    const newCategory = params.get("category");
    const sort = params.get("sort");
    let productList: IProduct[] = [];

    if (newCategory) {
      sessionStorage.setItem("filteredCategory", newCategory);
      productList = await fetchData(parseInt(newCategory, 10));
      window.history.replaceState({}, "", `?${params.toString()}`);

      if (sort) {
        const sortedList = await SortProducts(productList, parseInt(sort));
        setFilteredAndSortedProducts(sortedList);
      }
    } else {
      sessionStorage.clear();
      fetchData();
    }
  };

  useEffect(() => {
    fetchDataAndFilter();
  }, [search]);

  const SortProducts = (productList: IProduct[], sortValue: number) => {
    const params = new URLSearchParams(search);

    const filteredList: IProduct[] = JSON.parse(JSON.stringify(productList));

    if (filteredAndSortedProducts) {
      if (sortValue === 3) {
        filteredList.sort((a: IProduct, b: IProduct) =>
          a.attributes.name.localeCompare(b.attributes.name)
        );
      }
      if (sortValue === 4) {
        filteredList.sort((a: IProduct, b: IProduct) =>
          b.attributes.name.localeCompare(a.attributes.name)
        );
      }
      if (sortValue === 5) {
        filteredList.sort((a: IProduct, b: IProduct) =>
          a.attributes.price.localeCompare(b.attributes.price)
        );
      }
      if (sortValue === 6) {
        filteredList.sort((a: IProduct, b: IProduct) =>
          b.attributes.price.localeCompare(a.attributes.price)
        );
      }
    }

    window.history.replaceState({}, "", `?${params.toString()}`);
    return filteredList;
  };

  const resetFiltering = () => {
    setFilteredCategory(null);
    setFilteredAndSortedProducts(null);
    fetchData();
  };

  return (
    <Container className={styles.productListWrapper}>
      <Container
        data-cy="sortButtonContainer"
        sx={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          alignItems: "center",
          justifyContent: "center",
          gap: "0.5rem",
        }}
      >
        <Button
          data-cy="sortByCategory1"
          aria-label="Arbetsbänkar"
          sx={{
            backgroundColor:
              filteredCategory === 1 ? "#3D4F3E" : theme.contrastColor,
            color: theme.secondaryColor,
          }}
          className={`${styles.productListWrapper__filterButtons} ${
            filteredCategory === 1 ? "active" : ""
          }`}
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
          aria-label="filter by accessories button"
          sx={{
            backgroundColor:
              filteredCategory === 2 ? "#3D4F3E" : theme.contrastColor,
            color: theme.secondaryColor,
          }}
          className={`${styles.productListWrapper__filterButtons} ${
            filteredCategory === 2 ? "active" : ""
          }`}
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
            backgroundColor: !filteredCategory
              ? theme.primaryColor
              : theme.contrastColor,
            color: theme.secondaryColor,
          }}
          className={`${styles.productListWrapper__filterButtons} ${
            !filteredCategory ? "active" : ""
          }`}
          onClick={() => resetFiltering()}
        >
          Alla produkter
        </Button>
      </Container>
      <FilteringComponent filter={sorting} setFilter={setSorting} />
      {loading ? (
        <Container sx={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress sx={{ color: theme.secondaryColor }} />
        </Container>
      ) : (
        <Container
          data-cy="productList"
          sx={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            flexWrap: "wrap",
            gap: "1rem",
            alignContent: "center",
          }}
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
