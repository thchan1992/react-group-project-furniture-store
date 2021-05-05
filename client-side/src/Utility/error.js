import React from "react";
import homepage from "../assets/homepage.jpg";
import "./error.css";
import Card from "react-bootstrap/Card";

const Error = () => {
  return (
    <div className="text-error-colour">
      <h7 className="centered">
        <Card bg="dark">
          <Card.Title> Reason why you are here?</Card.Title>
          <Card.Body>
            - You are not authorised to access this page. <p />
            - You have been logged out, please log in again. <p />
            - The page you requested does not exist. <p />- Our server is out of
            service, please contact our IT department.
          </Card.Body>
        </Card>
      </h7>
      <img width="100%" src={homepage} />
    </div>
  );
};

export default Error;
