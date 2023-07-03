import React, { useEffect, useState } from "react";
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
  const [currentProductIndex, setCurrentProductIndex] = useState(0);
  const currentProduct = products[currentProductIndex];
  const [showSkeleton, setShowSkeleton] = useState(true);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setProductParams({ searchTerm: "", types: [], brands: [] }));
    dispatch(fetchProductsAsync());

    const timer = setTimeout(() => {
      setCurrentProductIndex((prevIndex) => {
        const nextIndex = prevIndex + 1 >= products.length ? 0 : prevIndex + 1;
        return nextIndex;
      });
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [dispatch, products.length]);

  useEffect(() => {
    const showSkeletonTimer = setTimeout(() => {
      setShowSkeleton(true);
    }, 1000);

    return () => {
      clearTimeout(showSkeletonTimer);
    };
  }, [currentProduct]);

  useEffect(() => {
    const showProductTimer = setTimeout(() => {
      setShowSkeleton(false);
    }, 1000);
    return () => {
      clearTimeout(showProductTimer);
    };
  }, [currentProduct]);

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
          {showSkeleton ? (
            <ProductCardSkeleton />
          ) : (
            <ProductCard product={currentProduct} />
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
