import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { IProduct } from "/git/examensarbete/client/src/models/iproductcard.js";
import { useTheme } from "../../contexts/ThemeContext";
import styles from "./Productcard.module.scss";
import { useNavigate } from "react-router-dom";

interface ProductcardProps {
  product: IProduct;
}

export default function Productcard({ product }: ProductcardProps) {
  const navigate = useNavigate();
  const imageUrl = product.image.data.attributes.formats.thumbnail.url;

  return (
    <Card className={styles.cardComponent}>
      {product ? (
        <CardActionArea>
          <CardMedia
            component="img"
            width="200"
            height="200"
            image={`http://localhost:1337${imageUrl}`}
            alt={product.title}
            onClick={() => navigate(`/produkt/${product.id}`)}
          />
        </CardActionArea>
      ) : null}
    </Card>
  );
}
