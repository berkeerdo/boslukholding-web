import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const ImageSlider = () => {
  return (
    <Carousel autoPlay swipeable showThumbs={false} className="max-w-2xl ">
      <div>
        <img src="https://picsum.photos/800/600" alt="random" />
      </div>
      <div>
        <img src="https://picsum.photos/800/600" alt="Random 2" />
      </div>
      <div>
        <img src="https://picsum.photos/800/600" alt="Random 3" />
      </div>
    </Carousel>
  );
};

export default ImageSlider;
