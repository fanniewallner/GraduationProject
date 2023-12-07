import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../contexts/ThemeContext";

export interface ProductcardProps {
  image: string;
  title: string;
  price: number;
  description: string;
  specification: string;
  id: string;
}

export default function Productcard(props: ProductcardProps) {
  const navigate = useNavigate();
  const { theme } = useTheme();
  return (
    <Card sx={{ width: 225 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="200"
          width="150"
          image={props.image}
          alt={props.title}
        />
        <CardContent>
          <Typography
            color={theme.contrastColor}
            gutterBottom
            variant="h6"
            component="div"
          >
            {props.title}
          </Typography>
          <Typography variant="body2" color={theme.contrastColor}>
            {props.price} kr exkl. moms
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {props.description}
          </Typography>
          <Typography>{props.specification}</Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
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
      </CardActions>
    </Card>
  );
}
