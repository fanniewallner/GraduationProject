import Carousel from "react-material-ui-carousel";
import Productcard from "../Productcard/Productcard";
import { useState, useEffect } from "react";
import { Container } from "@mui/material";
import useApi, { PRODUCT_ENDPOINT } from "../../hooks/useApi";
import { IProduct } from "../../models/IProductcard";
import { IStrapiResponse } from "../../models/IStrapiResponse";

export const MuiCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const { loading, error, data } =
    useApi<IStrapiResponse<IProduct>>(PRODUCT_ENDPOINT);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: Something went wrong</div>;
  }

  console.log(data, "produktdata");

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
      {data?.data.map((item, index) => (
        <Container
          key={index}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <Productcard product={item.attributes} />
        </Container>
      ))}
    </Carousel>
  );
};
