import React, { useEffect, useState, useRef } from "react";
import homepage from "../assets/homepage.jpg";
import homepage2 from "../assets/homepage2.jpg";
import homepage3 from "../assets/homepage3.jpg";
import "./home.css";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";

import CardDeck from "react-bootstrap/CardDeck";
import Button from "react-bootstrap/Button";
import { useHistory } from "react-router-dom";
const Home = () => {
  const [item, setItem] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showCard, setShowCard] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("recentViewItem"));

    if ("value" in data == false || Object.keys(data.value).length === 0) {
      setIsLoading(false);
      return;
    }

    try {
      setItem(data.value);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
      return;
    }
    // if (data == null || typeof data.value != "object") {
    //   return;
    // }
    setShowCard(true);
    setIsLoading(false);
  }, [isLoading]);

  return (
    <Col
      style={{
        backgroundColor: "white",
      }}
    >
      <p />
      <CardDeck>
        <Card bg="dark">
          <Card.Img variant="bottom" src={homepage3} />
          <Card.Body>
            <h5 className="product-text-style"> CHKMV Furniture</h5>
          </Card.Body>
        </Card>
        {showCard && (
          <Card bg="secondary">
            <Card.Img variant="top" src={item.itemUrl} />
            <Card.Body>
              <Card.Title>
                <span className="home-page-product-title-style">
                  Your Recent Viewed Product
                </span>
              </Card.Title>
              <span className="home-page-product-detail-style">
                {" "}
                {item.itemName}
              </span>{" "}
              <h1 className="home-page-product-detail-style">
                Price: {item.itemPrice}
              </h1>{" "}
              <p />
              <Button
                variant="info"
                className="home-page-product-detail-style"
                onClick={() => {
                  history.push("/Item_detail/" + item.itemDetID);
                }}
              >
                check it out
              </Button>{" "}
              <p />
              <h5 className="home-page-product-detail-style">
                Take it before it is too late!
              </h5>
            </Card.Body>
          </Card>
        )}
        <Card bg="dark">
          <Card.Body>
            <div className="card-text-style">All our products are amazing!</div>
          </Card.Body>{" "}
          <Card.Img variant="top" src={homepage2} />
        </Card>
        <Card bg="info">
          {" "}
          <Card.Img variant="top" src={homepage} />
          <Card.Body>
            {" "}
            <div className="card-text-style">
              Let's do some shopping together!
            </div>
          </Card.Body>
        </Card>
      </CardDeck>
    </Col>
  );
};

export default Home;
