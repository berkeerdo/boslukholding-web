import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Avatar } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../store/configureStore";
import { useEffect } from "react";
import {
  fetchFilters,
  setProductParams,
} from "../../../features/catalog/catalogSlice";
import { useNavigate } from "react-router-dom";

export default function BrandCarousel() {
  const { brands } = useAppSelector((state) => state.catalog);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const brandSelect = (value: string) => {
    navigate("/products", { state: { showFilters: true } });
    dispatch(setProductParams({ brands: [value] })); // Bu satırı değiştirin
  };

  useEffect(() => {
    dispatch(fetchFilters());
  }, [dispatch]);

  return (
    <div className="w-full">
      <Swiper
        spaceBetween={16}
        slidesPerView={5}
        navigation
        rewind={true}
        loop={true}
        modules={[Autoplay, Navigation]}
        autoplay={true}
      >
        {brands.map((brand) => (
          <SwiperSlide key={brand} onClick={() => brandSelect(brand)}>
            <div className="flex flex-col justify-center items-center h-64 w-full cursor-pointer">
              <Avatar
                alt={brand}
                src={`https://logo.clearbit.com/${brand}.com`}
                sx={{ width: 100, height: 100, objectFit: "cover" }}
                variant="rounded"
              />
              <p className="text-xl font-semibold mt-1">{brand}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
