import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useTheme } from "../../contexts/ThemeContext";
import { IProduct } from "../../models/IProductcard";
import { useNavigate } from "react-router-dom";

type IProductCardProps = {
  productAttributes: IProduct;
  productId: number;
};

export default function ProductCard({
  productAttributes,
  productId,
}: IProductCardProps) {
  const { theme } = useTheme();
  const navigate = useNavigate();

  const handleRedirect = () => {
    if (productId !== undefined) {
      navigate(`/produktkatalog/${productId}`);
    }
  };
  return (
    <Card sx={{ width: 330, minHeight: 300 }}>
      <CardMedia
        component="img"
        alt={productAttributes.title}
        height="200"
        image={`http://localhost:1337${productAttributes?.image?.data?.attributes?.formats?.small?.url}`}
        onError={(e) => console.error("Error loading image:", e)}
      />
      <CardContent>
        <Typography color={theme.contrastColor} variant="h5">
          {productAttributes.title}
        </Typography>
        <Typography color={theme.contrastColor} variant="body2">
          {productAttributes.price} kr exkl. moms
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          onClick={handleRedirect}
          sx={{
            backgroundColor: theme.secondaryBackgroundColor,
            color: "white",
          }}
          size="small"
        >
          Mer info
        </Button>
      </CardActions>
    </Card>
  );
}
