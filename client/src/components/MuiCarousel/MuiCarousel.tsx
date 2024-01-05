import Carousel from "react-material-ui-carousel";
import { useState, useEffect } from "react";
import { Container, useMediaQuery } from "@mui/material";
import useApi from "../../hooks/useApi";

import { useTheme } from "../../contexts/ThemeContext";
import { IStrapiListResponse } from "../../models/IStrapiResponse";
import ProductCard from "../ProductCardComponent/ProductCardComponent";

export const MuiCarousel = () => {
  const { theme } = useTheme();
  const { breakpoints } = useTheme().theme;
  const isMobile = useMediaQuery(`(max-width: ${breakpoints.sm}px)`);
  const [currentIndex, setCurrentIndex] = useState(0);
  const api = useApi();
  const [products, setProducts] = useState<IStrapiListResponse>();

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

  const slides = isMobile ? 1 : 3;

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex < (products?.data.length ?? 0) - slides ? prevIndex + slides : 0
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - slides : (products?.data.length ?? 1) - slides
    );
  };

  return (
    <Carousel
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
      next={handleNext}
      prev={handlePrev}
      animation="slide"
      index={currentIndex}
      navButtonsAlwaysVisible={!isMobile}
    >
      {Array.isArray(products?.data) && (
        <Container
          key={currentIndex}
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: isMobile ? 0 : "1rem",
          }}
        >
          {Array.from({ length: slides }).map((_, i) => {
            const productIndex =
              (currentIndex + i) % (products?.data.length ?? 1);
            return (
              <ProductCard key={i} product={products.data[productIndex]} />
            );
          })}
        </Container>
      )}
    </Carousel>
  );
};
