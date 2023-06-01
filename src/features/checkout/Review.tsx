import { Grid, Typography } from "@mui/material";
import BasketTable from "../basket/BasketTable";
import BasketSummary from "../basket/BasketSummary";
import { BasketItem } from "../../app/models/basket";

export default function Review() {
  const basketItems: BasketItem[] = [
    {
      productId: 1,
      name: "Product 1",
      price: 100,
      quantity: 1,
      pictureUrl: "https://via.placeholder.com/150",
      brand: "Brand 1",
      type: "Type 1",
    },
    {
      productId: 2,
      name: "Product 2",
      price: 100,
      quantity: 2,
      pictureUrl: "https://via.placeholder.com/150",
      brand: "Brand 2",
      type: "Type 2",
    },
    {
      productId: 3,
      name: "Product 3",
      price: 100,
      quantity: 3,
      pictureUrl: "https://via.placeholder.com/150",
      brand: "Brand 3",
      type: "Type 3",
    },
  ];

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Sipariş Önizlemesi
      </Typography>
      <BasketTable items={basketItems} isBasket={false} />
      <Grid container>
        <Grid item xs={6} />
        <Grid item xs={6}>
          <BasketSummary />
        </Grid>
      </Grid>
    </>
  );
}
