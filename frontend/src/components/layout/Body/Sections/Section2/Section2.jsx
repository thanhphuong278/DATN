import React from "react";
import ResortIntro from "./ResortIntro";
import Rooms from "./Rooms";
import Services from "./Services";

const Section2 = () => {
  return (
    <section className="section2">
      <ResortIntro />
      <Rooms />
      <Services />
    </section>
  );
};

export default Section2;
