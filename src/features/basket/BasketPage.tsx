import { Button, Grid } from "@mui/material";
import BasketSummary from "./BasketSummary";
import { Link } from "react-router-dom";
import BasketTable from "./BasketTable";
import { useAppSelector } from "../../app/store/configureStore";

export default function BasketPage() {
  const { basket } = useAppSelector((state) => state.basket);

  if (basket?.items.length === 0)
    return (
      <div className="flex items-center justify-center flex-col">
        <h1 className="text-2xl">Sepetinizde ürün bulunmamaktadır.</h1>
        <Link to={"/products"} className="text-blue-500">
          Ürünlere gitmek için tıklayınız
        </Link>
      </div>
    );

  return (
    <>
      <BasketTable items={basket!.items} />
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
