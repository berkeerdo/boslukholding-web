import { Swiper, SwiperSlide } from "swiper/react";
import { SliderData } from "../../models/swiper";

interface Props {
  slides: SliderData[];
}

export default function Slider({ slides }: Props) {
  return (
    <div className="w-full">
      <Swiper
        spaceBetween={16}
        slidesPerView={3}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="bg-gray-300 h-64 w-full">
              <img
                src={slide.image}
                alt={slide.title}
                className="h-full w-full object-cover"
              />
              <div className="absolute bottom-4 left-4 text-white text-xl font-semibold">
                {slide.title}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
