import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useApi from "../../hooks/useApi";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Breadcrumbs,
  Button,
  CircularProgress,
  Container,
  Typography,
} from "@mui/material";
import { IStrapiSingleResponse } from "../../models/IStrapiResponse";
import { useTheme } from "../../contexts/ThemeContext";
import Modal from "../../components/Modal/Modal";
import BrokenImageIcon from "@mui/icons-material/BrokenImage";
import { ExpandMore } from "@mui/icons-material";
import BreadCrumbsHelper from "../../utils/BreadcrumbsHelper";

export const ProductView = () => {
  const { id } = useParams();
  const { theme } = useTheme();
  const api = useApi();
  const [product, setProduct] = useState<IStrapiSingleResponse>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState<boolean>(false);
  const [brokenImageUrl, setBrokenImageUrl] = useState<boolean>(false);

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

  const breadcrumbs = [
    { label: "Hem", href: "/" },
    { label: "Produkter", href: "/produktkatalog" },
  ];

  const handleClickOpen = () => {
    setOpenModal(true);
  };

  const handleClose = () => {
    setOrderConfirmed(false);
    setOpenModal(false);
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography>Error: {error}</Typography>;
  }

  return (
    <Container
      sx={{
        minHeight: "100vh",
        py: "5rem",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
      }}
    >
      <BreadCrumbsHelper items={breadcrumbs} />
      {product && (
        <>
          <Box sx={{ width: "100%", p: "0", m: "0" }}>
            <img
              width="100%"
              height="auto"
              src={`http://localhost:1337${product?.data?.attributes?.image?.data?.attributes?.formats?.small?.url}`}
              onError={(e) => setBrokenImageUrl(true)}
            />
            {brokenImageUrl && (
              <Box>
                <BrokenImageIcon />
              </Box>
            )}
          </Box>
          <Container></Container>
          <Typography variant="h6" color={theme.secondaryColor}>
            {product.data.attributes.name}
          </Typography>
          <Typography color={theme.secondaryColor}>
            {product.data.attributes.price} kr exkl. moms
          </Typography>
          {product.data.attributes.stockStatus ?? (
            <Typography variant="h6">
              {product.data.attributes.stockStatus}
            </Typography>
          )}
          <Button
            sx={{
              backgroundColor: theme.contrastColor,
              color: theme.secondaryColor,
              width: "50%",
            }}
            onClick={handleClickOpen}
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
              expandIcon={<ExpandMore sx={{ color: theme.contrastColor }} />}
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
              expandIcon={<ExpandMore sx={{ color: theme.contrastColor }} />}
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
          <Modal
            open={openModal}
            handleClose={handleClose}
            orderConfirmed={orderConfirmed}
            setOrderConfirmed={setOrderConfirmed}
            product={product}
          />
        </>
      )}
    </Container>
  );
};
