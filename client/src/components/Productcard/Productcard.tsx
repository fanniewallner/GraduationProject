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
  product: IProduct;
};

export default function ProductCard(product: IProductCardProps) {
  const { theme } = useTheme();
  const navigate = useNavigate();
  //console.log(product.product.image.data.attributes.formats.small.url);
  // const imageUrl = product.product.image.data.attributes.formats.small;
  return (
    <Card sx={{ width: 330, minHeight: 300 }}>
      <CardMedia
        component="img"
        alt={product.product.title}
        height="200"
        //image={`http://localhost:1337${imageUrl}`}
        onError={(e) => console.error("Error loading image:", e)}
      />
      <CardContent>
        <Typography
          color={theme.contrastColor}
          gutterBottom
          variant="h5"
          component="div"
          display="flex"
          flexWrap="wrap"
        >
          {product.product.title}
        </Typography>
        <Typography color={theme.contrastColor} variant="body2">
          {product.product.price} kr exkl. moms
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          onClick={() => navigate(`/produktkatalog/${product.product.id}`)}
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
