import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";

const BannerCarousel = () => {
  const banners = ["/cart.jpeg", "/cart2.jpeg", "/cart3.png"];

  return (
    <Swiper loop={true} modules={[Autoplay]} autoplay={{ delay: 2000 }}>
      {banners.map((banner, idx) => (
        <SwiperSlide key={idx}>
          <img src={banner} className="w-full h-64 object-cover" />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default BannerCarousel;
