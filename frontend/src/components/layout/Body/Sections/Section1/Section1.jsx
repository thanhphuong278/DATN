import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./Section1.css";
import Button from "../../../../common/Button/Button";

const Section1 = () => {
  const slides = [
    {
      title: "The Quintessence Of Rest",
      subtitle: "So close, so peaceful",
      img: "../../../../../../public/assets/images/AnhNen.jpg",
    },
    {
      title: "Luxury Spa & Wellness",
      subtitle: "Relax, enjoy and feel good",
      img: "../../../../../../public/assets/images/Banner2.jpg",
    },
    {
      title: "Exclusive Dining Experience",
      subtitle: "Taste the best cuisine",
      img: "../../../../../../public/assets/images/Banner3.jpg",
    },
  ];

  return (
    <section className="section1">
      <Swiper
        spaceBetween={30}
        slidesPerView={1}
        loop
        autoplay={{ delay: 5000 }}
        pagination={{ clickable: true }}
        navigation
        modules={[Autoplay, Pagination, Navigation]}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div
              className="slide"
              //   style={{
              //     backgroundImage: `url("../../../../../../public/assets/images/background.jpg")`,
              //   }}
            >
              <div
                className="overlay"
                style={{ backgroundImage: `url(${slide.img})` }}
              >
                <h2>{slide.title}</h2>
                <p>{slide.subtitle}</p>
                <div className="buttons">
                  <Button>EXPLORE ROOMS</Button>
                  <Button>CHECK AVAILABILITY</Button>
                  <Button>BOOK NOW</Button>
                </div>
                <div className="socials">
                  <i className="fab fa-facebook"></i>
                  <i className="fab fa-twitter"></i>
                  <i className="fab fa-instagram"></i>
                  <i className="fab fa-youtube"></i>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Section1;
