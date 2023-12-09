import fetchData from "/git/Examensarbete/client/src/hooks/useApi";
//import fetchData from "../hooks/DataSer7vice";

import { useEffect, useState } from "react";
//import { Carousel } from "react-bootstrap";

export const ProductList = () => {
  const { loading, error, data } = fetchData(
    "http://localhost:1337/api/products"
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!loading) {
      setIsLoading(false);
      console.log(data);
    }
  }, [loading]);

  //if (isLoading) return <Loader></Loader>;
  if (error) return <p>error</p>;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      {/*   {data.data.map((review: IReview) => (
        <div key={review.id}>
          <ReviewCard
            value={review.attributes.rating}
            name={review.attributes.name}
            review={review.attributes.review}
          ></ReviewCard>
        </div>
      ))} */}
    </div>
    /*     <Carousel>
      {reviews.map((review, index) => (
        <Carousel.Item key={index}>
          <ReviewCard
            value={review.value}
            name={review.name}
            review={review.review}
          />
        </Carousel.Item>
      ))}
    </Carousel> */
  );
};
