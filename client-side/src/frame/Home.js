import React from "react";
import homepage from "../assets/homepage.jpg";
import "./Home.css";

const Home = () => {
  return (
    <div>
      <h1 className="centered">Let's Shop!</h1>
      <img src={homepage} />
    </div>
  );
};

export default Home;
