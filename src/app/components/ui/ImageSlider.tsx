import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const ImageSlider = () => {
  return (
    <Swiper
      spaceBetween={16}
      slidesPerView={1}
      rewind={true}
      loop={true}
      pagination={{
        dynamicBullets: true,
        clickable: true,
      }}
      navigation
      modules={[Pagination, Autoplay, Navigation]}
      autoplay={true}
    >
      <SwiperSlide>
        <img src="https://picsum.photos/1366/768" alt="random" />
      </SwiperSlide>
      <SwiperSlide>
        <img src="https://picsum.photos/1366/768" alt="Random 2" />
      </SwiperSlide>
      <SwiperSlide>
        <img src="https://picsum.photos/1366/768" alt="Random 3" />
      </SwiperSlide>
    </Swiper>
  );
};

export default ImageSlider;
