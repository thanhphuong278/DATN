import React from "react";
import "./Body.css";

import Section1 from "./Sections/Section1/Section1";
import Section2 from "./Sections/Section2/Section2";
import Activities from "./Sections/Section3/Activities";

const Body = () => {
  return (
    <div className="body-container">
      <Section1 />
      <Section2 />
      <Activities />
    </div>
  );
};

export default Body;
