import React from 'react';
import './Home.css';


const HeroSection = () => {
  return (
    <section className="hero-section">
      <div className="text-content">
        <h2>
          Feeding the people’s <br />
          hungry by <span>your</span> hands <br />
          then fulfill <span>your</span> heart...
        </h2>
      </div>
      <div className="image-content">
        <img
          src="https://weareworldchallenge.com/wp-content/uploads/2024/01/Orphanages.jpg" // Replace with actual image link
          alt="Children smiling"
          className="hero-image"
        />
      </div>
    </section>
  );
};



export default HeroSection;
