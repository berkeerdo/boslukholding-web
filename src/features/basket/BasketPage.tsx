import { Button, Grid } from "@mui/material";
import BasketSummary from "./BasketSummary";
import { Link } from "react-router-dom";
import BasketTable from "./BasketTable";
import { BasketItem } from "../../app/models/basket";

export default function BasketPage() {
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
      <BasketTable items={basketItems} />
      <Grid container my={2}>
        <Grid item xs={6} />
        <Grid item xs={6}>
          <BasketSummary />
          <Button
            component={Link}
            to="/checkout"
            variant="contained"
            size="large"
            fullWidth
            className="mt-1 bg-customButtonBackground hover:bg-customButtonBackgroundHover"
          >
            Siparişi Tamamla
          </Button>
        </Grid>
      </Grid>
    </>
  );
}
