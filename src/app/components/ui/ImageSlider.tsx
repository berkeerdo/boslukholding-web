import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const ImageSlider = () => {
  return (
    <Carousel autoPlay swipeable showThumbs={false} >
      <div>
        <img src="https://picsum.photos/1366/768" alt="random" />
      </div>
      <div>
        <img src="https://picsum.photos/1366/768" alt="Random 2" />
      </div>
      <div>
        <img src="https://picsum.photos/1366/768" alt="Random 3" />
      </div>
    </Carousel>
  );
};

export default ImageSlider;
