import React from "react";
import homepage from "../assets/homepage.jpg";
import "./Home.css";

const Error = () => {
  return (
    <div>
      <h1 className="centered">
        The page you requested does not exist or you are not authorised to view
        the page.
      </h1>
      <img src={homepage} />
    </div>
  );
};

export default Error;
