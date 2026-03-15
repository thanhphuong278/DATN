import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "./Activities.css";

const activitiesData = [
  {
    img: "/assets/images/Banner2.jpg",
    title: "Beach Activities",
    desc: "Chèo thuyền kayak, lướt sóng.",
    btn: "BOOK NOW",
  },
  {
    img: "/assets/images/Banner3.jpg",
    title: "Yoga Class",
    desc: "Thư giãn với lớp yoga buổi sáng.",
    btn: "JOIN US",
  },
  {
    img: "/assets/images/AnhNen.jpg",
    title: "Cooking Class",
    desc: "Học chế biến món ăn địa phương.",
    btn: "LEARN MORE",
  },
  {
    img: "/assets/images/background.jpg",
    title: "City Tour",
    desc: "Khám phá thành phố cùng hướng dẫn viên.",
    btn: "EXPLORE",
  },
  {
    img: "/assets/images/background.jpg",
    title: "City Tour",
    desc: "Khám phá thành phố cùng hướng dẫn viên.",
    btn: "EXPLORE",
  },
];

const Activities = () => {
  return (
    <section className="activities">
      <div className="activities-header">
        <h3>ACTIVITIES</h3>
        <h2>Enjoy Your Stay</h2>
        <p>Khám phá những trải nghiệm thú vị trong khu resort.</p>
      </div>

      <Swiper
        modules={[EffectCoverflow]}
        effect="coverflow"
        grabCursor={true}
        centeredSlides={true}
        slidesPerView="auto"
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 200,
          modifier: 2,
          slideShadows: false,
        }}
        className="activities-swiper"
      >
        {activitiesData.map((act, index) => (
          <SwiperSlide key={index} className="activity-card">
            <img src={act.img} alt={act.title} />
            <h4>{act.title}</h4>
            <p>{act.desc}</p>
            <button className="cta-btn">{act.btn}</button>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Activities;
