import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import useApi from "../../hooks/useApi";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  CircularProgress,
  Container,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { IStrapiSingleResponse } from "../../models/IStrapiResponse";
import { useTheme } from "../../contexts/ThemeContext";

import BrokenImageIcon from "@mui/icons-material/BrokenImage";
import { ExpandMore } from "@mui/icons-material";
import { ProductCartContext } from "../../contexts/ProductCardContext";
import { ActionType } from "../../reducers/ProductsReducer";

export const ProductView = () => {
  const { id } = useParams();
  const { theme } = useTheme();
  const api = useApi();
  const [loading, setLoading] = useState<boolean>(true);
  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm}px)`);
  const [product, setProduct] = useState<IStrapiSingleResponse>();
  const [error, setError] = useState<string | null>(null);
  const [brokenImageUrl, setBrokenImageUrl] = useState<boolean>(false);
  const { dispatch } = useContext(ProductCartContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!id) {
          setLoading(true);
          throw new Error("Invalid product ID");
        }
        const response = await api.getProductById(id);
        setProduct(response.data);
      } catch (error) {
        setError("Error fetching product data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const addToCart = () => {
    if (product) {
      dispatch({ type: ActionType.ADDED_PRODUCT, payload: product.data });
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography>Error: {error}</Typography>;
  }

  return (
    <Container sx={{ py: "5rem" }}>
      <Container
        sx={{
          minHeight: "100vh",
          pt: "2rem",
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          gap: "1rem",
        }}
      >
        {product && (
          <>
            <Box sx={{ width: isMobile ? "100%" : "40%", p: "0", m: "0" }}>
              <img
                alt={product.data.attributes.name}
                style={{ width: "100%", height: "auto" }}
                src={`http://localhost:1337${product?.data?.attributes?.image?.data?.attributes?.formats?.small?.url}`}
                onError={() => setBrokenImageUrl(true)}
              />
              {brokenImageUrl && (
                <Box>
                  <BrokenImageIcon />
                </Box>
              )}
            </Box>
            <Container sx={{ display: "flex", flexDirection: "column" }}>
              <Typography variant="h6" color={theme.secondaryColor}>
                {product.data.attributes.name}
              </Typography>
              <Typography color={theme.secondaryColor}>
                {product.data.attributes.price} kr exkl. moms
              </Typography>
              {product.data.attributes.stockStatus ? (
                <Typography variant="h6" sx={{ color: theme.primaryColor }}>
                  {product.data.attributes.stockStatus}
                </Typography>
              ) : null}
              <Button
                aria-label="purchase button"
                sx={{
                  backgroundColor: theme.contrastColor,
                  color: theme.secondaryColor,
                  width: "50%",
                  mb: "1rem",
                }}
                onClick={addToCart}
                disabled={product.data.attributes.stockStatus !== null}
              >
                Köp
              </Button>
              <Accordion
                defaultExpanded
                sx={{
                  backgroundColor: theme.primaryBackgroundColor,
                  boxShadow: "none",
                  borderTop: `1px solid ${theme.contrastColor}`,
                }}
              >
                <AccordionSummary
                  expandIcon={
                    <ExpandMore sx={{ color: theme.contrastColor }} />
                  }
                >
                  <Typography color={theme.secondaryColor}>
                    Produktbeskrivning
                  </Typography>
                </AccordionSummary>

                <AccordionDetails>
                  <Typography color={theme.secondaryColor}>
                    {product.data.attributes.description}
                  </Typography>
                </AccordionDetails>
              </Accordion>
              <Accordion
                sx={{
                  backgroundColor: theme.primaryBackgroundColor,
                  boxShadow: "none",
                  borderTop: `1px solid ${theme.contrastColor}`,
                }}
              >
                <AccordionSummary
                  expandIcon={
                    <ExpandMore sx={{ color: theme.contrastColor }} />
                  }
                >
                  <Typography color={theme.secondaryColor}>
                    Specifikationer:
                  </Typography>
                </AccordionSummary>

                <AccordionDetails>
                  <Typography
                    color={theme.secondaryColor}
                    sx={{ whiteSpace: "pre-line" }}
                  >
                    {product.data.attributes.specification}
                  </Typography>
                </AccordionDetails>
              </Accordion>
              {/*               <Modal
                open={openModal}
                handleClose={handleClose}
                orderConfirmed={orderConfirmed}
                setOrderConfirmed={setOrderConfirmed}
                products={state}
              /> */}
            </Container>
          </>
        )}
      </Container>
    </Container>
  );
};
