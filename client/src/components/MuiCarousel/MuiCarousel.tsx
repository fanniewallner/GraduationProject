import Carousel from "react-material-ui-carousel";
import Productcard from "../Productcard/Productcard";
import { useState, useEffect } from "react";
import { Container } from "@mui/material";
import useApi from "../../hooks/useApi";
import { IProduct } from "../../models/IProductcard";
import { IStrapiResponse } from "../../models/IStrapiResponse";

export const MuiCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const api = useApi();
  const [products, setProducts] = useState<
    IStrapiResponse<IProduct> | undefined
  >();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.getProducts();
        setProducts(response.data);
      } catch (error) {
        console.log(error);
      }
      console.log("produkter state", products);
    };

    fetchData();
  }, [api]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex < (products?.data.length ?? 0) - 1 ? prevIndex + 1 : 0
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : (products?.data.length ?? 1) - 1
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
      {Array.isArray(products?.data) &&
        products?.data.map(
          (
            { attributes, id }: { attributes: IProduct; id: number },
            index: number
          ) => (
            <Container
              key={index}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <Productcard product={attributes} />
            </Container>
          )
        )}
    </Carousel>
  );
};
