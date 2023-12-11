import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { IProduct } from "/git/examensarbete/client/src/models/iproductcard.js";
import { useTheme } from "../../contexts/ThemeContext";
import styles from "./Productcard.module.scss";

interface ProductcardProps {
  product: IProduct;
}

export default function Productcard({ product }: ProductcardProps) {
  //const navigate = useNavigate();
  const { theme } = useTheme();

  console.log(product.image.data.attributes.url);
  return (
    <Card className={styles.cardComponent}>
      <CardActionArea>
        <CardMedia
          component="img"
          width="200"
          height="200"
          image={`http://localhost:1337${product.image.data.attributes.url}`}
          alt={product.title}
        />
        {/*  <CardContent> */}
        {/*           <Typography color={"black"} gutterBottom variant="h6" component="div">
            {product.title}
          </Typography>
          <Typography variant="body2" color={theme.contrastColor}>
            {product.price} kr
          </Typography> */}
        {/*  <Typography variant="body2" color="text.secondary">
            {product.description}
          </Typography>
          <Typography>{product.specification}</Typography> */}
        {/*         </CardContent> */}
      </CardActionArea>
      {/*       <CardActions>
        <Button
          sx={{
            backgroundColor: theme.contrastColor,
            color: theme.secondaryColor,
            boxShadow: 3,
          }}
          size="small"
          onClick={() => navigate(`/produkter/${props.id}`)}
        >
          Till produkten
        </Button>
      </CardActions> */}
    </Card>
  );
}
