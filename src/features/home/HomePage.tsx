import React from "react";
import ImageSlider from "../../app/components/ui/ImageSlider";
import { Card, CardMedia, Grid, Typography } from "@mui/material";
import Slider from "../../app/components/ui/Slider";
import { SliderData } from "../../app/models/swiper";
import { useAppSelector } from "../../app/store/configureStore";
import { productSelectors } from "../catalog/catalogSlice";
import ProductCard from "../catalog/ProductCard";

export default function HomePage() {
  const products = useAppSelector(productSelectors.selectAll);

  const randomIndex = Math.floor(Math.random() * products.length);

  const randomProduct = products[randomIndex];

  const sliderData: SliderData[] = [
    {
      id: 1,
      title: "Slide 1",
      image: "https://example.com/slide1.jpg",
    },
    {
      id: 2,
      title: "Slide 2",
      image: "https://example.com/slide2.jpg",
    },
    {
      id: 3,
      title: "Slide 3",
      image: "https://example.com/slide3.jpg",
    },
    {
      id: 4,
      title: "Slide 4",
      image: "https://example.com/slide3.jpg",
    },
    {
      id: 5,
      title: "Slide 5",
      image: "https://example.com/slide3.jpg",
    },
    {
      id: 6,
      title: "Slide 6",
      image: "https://example.com/slide3.jpg",
    },
  ];

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
          <ProductCard product={randomProduct} isHomePage />
        </Grid>

        <Grid item xs={12}>
          <Card sx={{ height: 300 }}>
            <CardMedia
              component="img"
              image="https://picsum.photos/1366/768"
              alt="Rectangle"
            />
          </Card>
        </Grid>
      </Grid>

      <div className="my-20">
        <p className="text-3xl font-semibold mb-5">Markalar</p>
        <Slider slides={sliderData} />
      </div>
    </>
  );
}
