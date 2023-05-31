import React from "react";
import ImageSlider from "../../app/components/ui/ImageSlider";
import { Grid } from "@mui/material";
import Slider from "../../app/components/ui/Slider";
import { SliderData } from "../../app/models/swiper";

export default function HomePage() {
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
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <ImageSlider />
        </Grid>
        <Grid sm={2}></Grid>
        <Grid item xs={12} sm={4}>
          {/* Product Card */}
          <div className="bg-gray-300 h-full">Product Card</div>
        </Grid>
        <Grid item xs={12}>
          {/* Long Rectangle */}
          <div className="bg-gray-300 h-64">Long Rectangle</div>
        </Grid>
      </Grid>
      <div className="my-20">
        <p className="text-3xl font-semibold mb-5">Markalar</p>
        <Slider slides={sliderData} />
      </div>
    </>
  );
}
