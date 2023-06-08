import {
  Divider,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import NotFound from "../../app/errors/NotFound";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { LoadingButton } from "@mui/lab";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import {
  addBasketItemAsync,
  removeBasketItemAsync,
} from "../basket/basketSlice";
import { fetchProductAsync, productSelectors } from "./catalogSlice";
import { StyledTextField } from "../../app/components/StyledComponents/CustomTexfFieldStlyed";

export default function ProductDetails() {
  const { basket, status } = useAppSelector((state) => state.basket);
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const product = useAppSelector((state) =>
    productSelectors.selectById(state, id!)
  );
  const { status: productStatus } = useAppSelector((state) => state.catalog);
  const [quantity, setQuantity] = useState(0);
  const item = basket?.items.find((i) => i.productId === product?.id);

  useEffect(() => {
    if (item) setQuantity(item.quantity);
    if (!product && id) {
      dispatch(fetchProductAsync(parseInt(id)));
    }
  }, [dispatch, id, item, product]);

  function hanleInputChange(event: any) {
    if (event.target.value >= 0) {
      setQuantity(parseInt(event.target.value));
    }
  }

  function handleUpdateCart() {
    if (!item || quantity > item.quantity) {
      const updatedQuantity = item ? quantity - item.quantity : quantity;
      dispatch(
        addBasketItemAsync({
          productId: product?.id!,
          quantity: updatedQuantity,
        })
      );
    } else {
      const updatedQuantity = item.quantity - quantity;
      dispatch(
        removeBasketItemAsync({
          productId: product?.id!,
          quantity: updatedQuantity,
        })
      );
    }
  }

  if (productStatus.includes("pendingFetchProduct"))
    return <LoadingComponent message="Loading product..." />;

  if (!product) return <NotFound />;

  return (
    <Grid container spacing={6}>
      <Grid item xs={6}>
        <img
          src={product.pictureUrl}
          alt={product.name}
          style={{ width: "100%" }}
        />
      </Grid>
      <Grid item xs={6}>
        <div className="bg-customBackground p-5 shadow-xl rounded-xl">
          <Typography variant="h3">{product.name}</Typography>
          <Divider sx={{ mb: 2, mt: 1 }} color="white" />
          <Typography variant="h4" className="text-primary">
            ${(product.price / 100).toFixed(2)}
          </Typography>
          <TableContainer>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell sx={{ color: "white" }}>Ürün Adı:</TableCell>
                  <TableCell sx={{ color: "white" }}>{product.name}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ color: "white" }}>
                    Ürün Açıklaması:
                  </TableCell>
                  <TableCell sx={{ color: "white" }}>
                    {product.description}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ color: "white" }}>Türü:</TableCell>
                  <TableCell sx={{ color: "white" }}>{product.type}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ color: "white" }}>Markası:</TableCell>
                  <TableCell sx={{ color: "white" }}>{product.brand}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ color: "white" }}>
                    Quantity in stock
                  </TableCell>
                  <TableCell sx={{ color: "white" }}>
                    {product.quantityInStock}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <Grid container spacing={2} mt={2}>
            <Grid item xs={6}>
              <StyledTextField
                onChange={hanleInputChange}
                variant="outlined"
                type="number"
                label="Sepetteki Miktar"
                fullWidth
                value={quantity}
              />
            </Grid>
            <Grid item xs={6}>
              <LoadingButton
                sx={{ height: "55px" }}
                disabled={item?.quantity === quantity || quantity === 0}
                color="primary"
                size="large"
                variant="contained"
                fullWidth
                loading={status.includes("pending")}
                onClick={handleUpdateCart}
              >
                {item ? "Update Cart" : "Add to Cart"}
              </LoadingButton>
            </Grid>
          </Grid>
        </div>
      </Grid>
    </Grid>
  );
}
