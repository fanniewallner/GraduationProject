import Carousel from "react-material-ui-carousel";
import Productcard from "../Productcard/Productcard";
import { useState, useEffect } from "react";
import { Container } from "@mui/material";
import useApi, { PRODUCT_ENDPOINT } from "../../hooks/useApi";
import { IProduct } from "../../models/IProductcard";

export const MuiCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  /*   const { loading, data } = fetchData(
    "http://localhost:1337/api/products?populate=*"
  );
  const [isLoading, setIsLoading] = useState(true); */

  const { loading, error, data } = useApi<IProduct>(PRODUCT_ENDPOINT);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex < (data?.data.length ?? 0) - 1 ? prevIndex + 1 : 0
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : (data?.data.length ?? 1) - 1
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
    >
      {data?.data.map((item, i) => (
        <Container key={i} sx={{ display: "flex", justifyContent: "center" }}>
          <Productcard product={item.attributes} />
        </Container>
      ))}
    </Carousel>
  );
};
