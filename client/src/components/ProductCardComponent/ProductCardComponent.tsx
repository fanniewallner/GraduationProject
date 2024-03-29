import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useTheme } from "../../contexts/ThemeContext";
import { useNavigate } from "react-router-dom";
import { IProduct } from "../../models/IProduct";
import styles from "./ProductCardComponent.module.scss";

type IProductCardProps = {
  product: IProduct;
};

export default function ProductCard({ product }: IProductCardProps) {
  const { theme } = useTheme();
  const navigate = useNavigate();

  const handleRedirect = () => {
    if (product.id !== undefined) {
      navigate(`/produktkatalog/${product.id}`);
    }
  };

  return (
    <>
      <Card className={styles.card}>
        <CardMedia
          loading="lazy"
          component="img"
          alt={product.attributes.name}
          height="200"
          image={`http://localhost:1337${product?.attributes.image?.data?.attributes?.formats?.small?.url}`}
          onError={(e) => console.error("Error loading image:", e)}
        />
        <CardContent>
          <Typography color={theme.contrastColor} variant="h5">
            {product.attributes.name}
          </Typography>
          <Typography color={theme.contrastColor} variant="body2">
            {product.attributes.price} kr exkl. moms
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            aria-label="Go to product button"
            sx={{
              backgroundColor: theme.contrastColor,
              color: theme.secondaryColor,
            }}
            onClick={handleRedirect}
          >
            Mer info
          </Button>
        </CardActions>
      </Card>
    </>
  );
}
