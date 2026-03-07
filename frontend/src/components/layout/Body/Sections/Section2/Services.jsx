import React from "react";
import "./Services.css";

const Services = () => {
  return (
    <section className="services">
      <div className="service-card">
        <img src="/assets/images/Banner2.jpg" alt="Dining" />
        <div className="service-content">
          <h3>DINE & DRINK</h3>
          <h2>5 Star Michelin</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et
            rhoncus lacus.
          </p>
          <p>
            <strong>Open Daily:</strong> 7:00pm - 11:00pm
          </p>
          <button className="cta-btn">DINING WITH US</button>
        </div>
      </div>

      <div className="service-card">
        <img src="/assets/images/Banner3.jpg" alt="Spa & Wellness" />
        <div className="service-content">
          <h3>SPA & WELLNESS</h3>
          <h2>Mission: Revival</h2>
          <p>
            Integer at blandit nibh. Suspendisse malesuada bibendum bibendum.
            Nam mi ex, dictum non rhoncus dapibus, pellentesque ac justo.
          </p>
          <p>
            <strong>Questions?</strong> Call us at 984 08 08 09
          </p>
          <button className="cta-btn">FIND OUT MORE</button>
        </div>
      </div>
    </section>
  );
};

export default Services;
