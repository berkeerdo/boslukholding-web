import React, { useEffect } from "react";
import ImageSlider from "../../app/components/ui/ImageSlider";
import { Grid, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import {
  fetchProductsAsync,
  productSelectors,
  setProductParams,
} from "../catalog/catalogSlice";
import ProductCard from "../catalog/ProductCard";
import BrandCarousel from "../../app/components/ui/Slider";
import ProductCardSkeleton from "../catalog/ProductCardSkeleton";
import SuggestedProducts from "../../app/components/ui/SuggestedProducts";

export default function HomePage() {
  const products = useAppSelector(productSelectors.selectAll);
  const randomIndex = Math.floor(Math.random() * products.length);
  const randomProduct = products[randomIndex];
  const { productsLoaded } = useAppSelector((state) => state.catalog);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setProductParams({ searchTerm: "", types: [], brands: [] }));
    dispatch(fetchProductsAsync());
  }, [dispatch]);

  return (
    <>
      <Grid container spacing={4}>
        <Grid item xs={12} lg={8} mt={2}>
          <ImageSlider />
        </Grid>
        <Grid item xs={12} lg={4}>
          <Typography variant="h6" gutterBottom>
            Ürün Önerisi
          </Typography>
          {!productsLoaded ? (
            <ProductCardSkeleton />
          ) : (
            <ProductCard product={randomProduct} />
          )}
        </Grid>

        <Grid item xs={12}>
          <SuggestedProducts products={products} />
        </Grid>
      </Grid>

      <div className="my-20">
        <p className="text-3xl font-semibold mb-5">Markalar</p>
        <BrandCarousel />
      </div>
    </>
  );
}
