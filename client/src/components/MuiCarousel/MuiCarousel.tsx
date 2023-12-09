import Carousel from "react-material-ui-carousel";
import Productcard from "../Productcard/Productcard";
import { useState, useEffect } from "react";
import fetchData from "/git/Examensarbete/client/src/hooks/useApi";

export const MuiCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { loading, data } = fetchData(
    "http://localhost:1337/api/products?populate=*"
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!loading) {
      setIsLoading(false);
    }
  }, [loading]);

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
      next={() => {
        handleNext;
      }}
      prev={() => {
        handlePrev;
      }}
      animation="slide"
      index={currentIndex}
    >
      {data?.data.map((item, i) => (
        <Productcard key={i} product={item.attributes} />
      ))}
    </Carousel>
  );
};
