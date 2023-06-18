import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import CP1 from "../../../assets/CP1.jpg";
import CP2 from "../../../assets/CP2.gif";
import CP3 from "../../../assets/CP3.jpg";

const ImageSlider = () => {
  return (
    <Swiper
      spaceBetween={16}
      slidesPerView={1}
      rewind={true}
      loop={true}
      navigation
      modules={[Autoplay, Navigation]}
      autoplay={true}
      scrollbar={{ draggable: true }}
      style={{
        maxHeight: 400,
        maxWidth: 800,
        aspectRatio: "16/9",
      }}
    >
      <SwiperSlide style={{ aspectRatio: "16/9" }}>
        <img src={CP2} alt="random" style={{ objectFit: "contain" }} />
      </SwiperSlide>
      <SwiperSlide style={{ aspectRatio: "16/9" }}>
        <img src={CP1} alt="Random 2" style={{ objectFit: "contain" }} />
      </SwiperSlide>
      <SwiperSlide style={{ aspectRatio: "16/9" }}>
        <img src={CP3} alt="Random 3" style={{ objectFit: "contain" }} />
      </SwiperSlide>
    </Swiper>
  );
};

export default ImageSlider;
