import React from "react";
import homepage from "../assets/homepage.jpg";
import "./home.css";

const Error = () => {
  return (
    <div>
      <h1 className="centered">You are not authorised to access this page.</h1>
      <img src={homepage} />
    </div>
  );
};

export default Error;
