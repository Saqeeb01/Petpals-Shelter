import React from 'react';
import '../styles/Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <div className="banner">
        <h1>Welcome to Petpals Shelter</h1>
        <p>Find your new furry friend and make a difference in their life.</p>
        <a href="/register" className="cta-button">
          Register to Adopt Pets
        </a>
      </div>
    </div>
  );
};

export default Home;
