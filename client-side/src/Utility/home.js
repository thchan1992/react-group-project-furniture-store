import React, { useEffect, useState, useRef } from "react";
import homepage from "../assets/homepage.jpg";
import homepage2 from "../assets/homepage2.jpg";
import homepage3 from "../assets/homepage3.jpg";
import "./home.css";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import CardDeck from "react-bootstrap/CardDeck";
import Button from "react-bootstrap/Button";
import { useHistory } from "react-router-dom";
const Home = () => {
  const getCache = require("localstorage-ttl");
  const [item, setItem] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [showCard, setShowCard] = useState(true);
  const history = useHistory();

  useEffect(() => {
    try {
      const data = JSON.parse(localStorage.getItem("recentViewItem"));
      setItem(data.value);
    } catch (err) {
      setShowCard(false);
    }
    setIsLoading(false);
  }, [isLoading]);

  return (
    <Col
      style={{
        backgroundColor: "white",
      }}
    >
      <CardDeck>
        {showCard && (
          <Card bg="secondary">
            <Card.Header>
              <Card.Title>
                <span className="home-page-product-title-style">
                  Your Recent Viewed Product
                </span>
              </Card.Title>
            </Card.Header>
            <Card.Body>
              <span className="home-page-product-detail-style">
                {" "}
                {item.itemName}
              </span>{" "}
              <img src={item.itemUrl} className="product-align-center" />
              <h1 className="home-page-product-detail-style">
                Price: {item.itemPrice}
              </h1>{" "}
              <h5 className="home-page-product-detail-style">
                Take it before it is too late!
              </h5>
              <p />
              <Button
                variant="info"
                className="home-page-product-detail-style"
                onClick={() => {
                  history.push("/Item_detail/" + item.itemDetID);
                }}
              >
                check it out
              </Button>
            </Card.Body>
          </Card>
        )}

        <Card bg="dark">
          <Card.Img variant="bottom" src={homepage3} />
          <Card.Body>
            <h5 className="product-text-style"> CHKMV Furniture</h5>
          </Card.Body>
        </Card>

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

//  <Row>
//         <Col>
//           <Card>
//             <Card.Header>Header</Card.Header>
//             <Card.Body>{item.itemName}</Card.Body>
//           </Card>

//           <h1 className="centered">Let's Shop!</h1>
//           <img className="back-ground" src={homepage} />
//         </Col>
//         <Col>s</Col>
//       </Row>
//       <Row>
//         {" "}
//         <Col>s</Col>
//         <Col>s</Col>
//       </Row>
