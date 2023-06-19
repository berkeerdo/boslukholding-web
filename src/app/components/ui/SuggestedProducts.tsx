import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Product } from "../../models/product";
import ProductCard from "../../../features/catalog/ProductCard";
import { Typography, useMediaQuery, useTheme } from "@mui/material";

interface Props {
  products: Product[];
}

const SuggestedProducts = ({ products }: Props) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("xs"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.between("sm", "md"));

  const randomProducts = [];
  const numberOfRandomProducts = 5;

  for (let i = 0; i < numberOfRandomProducts; i++) {
    const randomIndex = Math.floor(Math.random() * products.length);
    const randomProduct = products[randomIndex];
    randomProducts.push(randomProduct);
  }

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Sizin İçin Seçtiklerimiz
      </Typography>
      <Swiper
        spaceBetween={10}
        slidesPerView={isSmallScreen ? 1 : isMediumScreen ? 2 : 3}
        navigation
        rewind={true}
        loop={true}
        modules={[Autoplay, Navigation]}
        autoplay={true}
        style={{ maxWidth: "100%" }}
      >
        {randomProducts.map((randomProduct) => (
          <SwiperSlide key={randomProduct.id}>
            <ProductCard product={randomProduct} isDynamic />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default SuggestedProducts;
