import { Box, Button, Container } from "@mui/material";
import { useState, useEffect } from "react";
import fetchData from "/git/Examensarbete/client/src/hooks/useApi";
import Productcard from "../Productcard/Productcard";
import { IProduct } from "../../models/IProductcard";
import { ThemeContext } from "@emotion/react";

export const Carousel = () => {
  const [currentIndexes, setCurrentIndexes] = useState(0);
  const { loading, error, data } = fetchData(
    "http://localhost:1337/api/products?populate=*"
  );
  const [isLoading, setIsLoading] = useState(true);

  const handleNext = () => {
    setCurrentIndexes((prevIndex) =>
      prevIndex < (data?.data.length ?? 0) - 1 ? prevIndex + 1 : 0
    );
  };

  const handlePrev = () => {
    setCurrentIndexes((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : (data?.data.length ?? 1) - 1
    );
  };

  useEffect(() => {
    if (!loading) {
      setIsLoading(false);
      console.log(data);
      console.log(data?.data.map((item) => item.attributes.image));
    }
  }, [loading]);

  return (
    <Container
      sx={{
        flexDirection: "row",
        justifyContent: "center",
        width: "100%",
        overflow: "hidden",
      }}
    >
      <Button sx={{ color: "white" }} onClick={() => handlePrev()}>
        Prev
      </Button>
      <Box
        sx={{
          display: "flex",
          transition: "transform 0.5s ease",
          gap: "2rem",
          transform: `translateX(-${currentIndexes * 100}%)`,
          width: "500px",
          overflow: "hidden",
        }}
      >
        {data?.data.map((item: { attributes: IProduct; id: number }) => (
          <Productcard key={item.id} product={item.attributes} />
        ))}
      </Box>
      <Button sx={{ color: "white" }} onClick={() => handleNext()}>
        Next
      </Button>
    </Container>
  );
};
