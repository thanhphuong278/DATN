import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./Section1.css";
import Button from "../../../../common/Button/Button";
// import banner from "../../../../../../public/assets/images/Banner2.jpg"; 


const Section1 = () => {


  return (
    <section className="section1">
      <div className="container-section1">
        <div className="left">
          {/* <div className="badge">NỀN TẢNG HỌC VÀ LUYỆN THI TOPIK SỐ 1</div> */}

          <h1>
            Học và Luyện Thi <br />
            <span>TOPIK TRỰC TUYẾN</span>
          </h1>

          <p className="subtitle">
            Tự tin chinh phục TOPIK từng bước        </p>

          <p className="description">
            Trải nghiệm nền tảng luyện đề TOPIK trực tuyến với mô phỏng 100% format và thời gian thi thật, giúp bạn tự tin bước vào kỳ thi chính thức với sự chuẩn bị tốt nhất.
          </p>

          <div className="features">
            <span>🎯 Đề chuẩn</span>
            <span>⏱️ Giờ thật</span>
            <span>📊 Kết quả tức thì</span>
          </div>

          <div className="actions">
            <button className="btn"><link rel="stylesheet" href="/exam" />Bắt đầu thi thử ngay →</button>
          </div>
        </div>

        {/* <div className="right">
        <img src={banner} alt="banner" />
      </div> */}
      </div>
    </section>
  );
};

export default Section1;
