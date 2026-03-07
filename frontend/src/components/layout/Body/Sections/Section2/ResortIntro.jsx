import React from "react";
import "./ResortIntro.css";

const ResortIntro = () => {
  return (
    <section className="resort-intro">
      <div className="intro-text">
        <h3>WELCOME</h3>
        <h2>The Resort</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et
          rhoncus lacus. Aliquam porttitor sit amet diam non placerat. Curabitur
          convallis, tellus ante finibus libero...
        </p>
        <button className="cta-btn">READ MORE</button>
      </div>
      <div className="intro-image">
        <img src="/assets/images/AnhNen.jpg" alt="Resort view" />
      </div>
    </section>
  );
};

export default ResortIntro;
