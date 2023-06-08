import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
} from "@mui/material";
import { Product } from "../../app/models/product";
import { Link } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
import { currencyFormat } from "../../app/utils/utils";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { addBasketItemAsync } from "../basket/basketSlice";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const { status } = useAppSelector((state) => state.basket);
  const dispatch = useAppDispatch();

  return (
    <Card sx={{ maxWidth: 345 }} className="bg-customBackground text-gray-200">
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: "#FF6F00" }}>
            {product.name.charAt(0).toUpperCase()}
          </Avatar>
        }
        title={product.name}
        titleTypographyProps={{
          sx: { fontWeight: "bold", color: "white" },
        }}
      />
      <CardMedia
        sx={{ height: 140, backgroundSize: "contain", bgcolor: "grey.200" }}
        image={product.pictureUrl}
        title={product.name}
      />
      <CardContent>
        <Typography gutterBottom color="#FF6F00" variant="h5">
          {currencyFormat(product.price)}
        </Typography>
        <Typography variant="body2" color="white">
          {product.brand} / {product.type}
        </Typography>
      </CardContent>
      <CardActions className="flex items-center justify-between">
        <LoadingButton
          loading={status.includes("pendingAddItem" + product.id)}
          onClick={() =>
            dispatch(addBasketItemAsync({ productId: product.id }))
          }
          size="small"
        >
          Sepete Ekle
        </LoadingButton>
        <Button component={Link} to={`/products/${product.id}`} size="small">
          Görüntüle
        </Button>
      </CardActions>
    </Card>
  );
}
