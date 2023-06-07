import { Grid } from "@mui/material";
import { Product } from "../../app/models/product";
import ProductCard from "./ProductCard";
import { useAppSelector } from "../../app/store/configureStore";
import ProductCardSkeleton from "./ProductCardSkeleton";

interface Props {
  products: Product[];
}

export default function ProductList(props: Props) {
  const { productsLoaded } = useAppSelector((state) => state.catalog);

  return (
    <Grid container spacing={4}>
      {props.products.map((product) => (
        <Grid item xs={4}>
          {!productsLoaded ? (
            <ProductCardSkeleton />
          ) : (
            <ProductCard key={product.id} product={product} />
          )}
        </Grid>
      ))}
    </Grid>
  );
}
