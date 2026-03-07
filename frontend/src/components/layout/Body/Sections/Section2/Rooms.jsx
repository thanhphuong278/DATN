import React from "react";
import "./Rooms.css";

const Rooms = () => {
  return (
    <section className="rooms">
      <div className="rooms-header">
        <h3>THE STAY</h3>
        <h2>Choose Your Room</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et
          rhoncus lacus.
        </p>
      </div>

      <div className="room-list">
        <div className="room-card">
          <img src="/assets/images/Banner2.jpg" alt="Family Suite" />
          <h4>Family Suite</h4>
          <p>80m2 / 6 Guests / 4 Beds / 2 Bathrooms</p>
          <span className="price">$100 / Night</span>
        </div>

        <div className="room-card">
          <img src="/assets/images/Banner3.jpg" alt="Junior Suite" />
          <h4>Junior Suite</h4>
          <p>35m2 / 4 Guests / 3 Beds / 1 Bathroom</p>
          <span className="price">$100 / Night</span>
        </div>
      </div>

      <button className="cta-btn">VIEW ALL ROOM</button>
    </section>
  );
};

export default Rooms;
