import { Swiper, SwiperSlide } from "swiper/react";
import { SliderData } from "../../models/swiper";
import { Autoplay, Navigation, Pagination } from "swiper";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

interface Props {
  slides: SliderData[];
}

export default function Slider({ slides }: Props) {

//   const [prevEl, setPrevEl] = useState<HTMLElement | null>(null)
// const [nextEl, setPrevEl] = useState<HTMLElement | null>(null)

  return (
    <div className="w-full">
      <Swiper
        spaceBetween={16}
        slidesPerView={3}
        navigation
        rewind={true}
        loop={true}
        modules={[Pagination, Autoplay, Navigation]}
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
