import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import { useHistory, Route } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";

const Payment = ({ userID }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [totalCost, setTotalCost] = useState(null);
  const [deliveryDate, setDeliveryDate] = useState(null);
  const [orderDate, setOrderDate] = useState(null);
  const history = useHistory();

  const handleCheckout = async () => {
    if (!orderDate || !deliveryDate) {
      window.alert("no date");
      return;
    }
    const checkFund = { totalCost, userID };
    await axios
      .post("http://localhost:8080/payment/checkFund", checkFund)
      .then((response) => {
        if (response.data.result == true) {
          axios
            .get("http://localhost:8080/payment/checkStock/" + userID)
            .then((response) => {
              if (response.data.result == true) {
                const finalisePay = { userID, deliveryDate, orderDate };
                axios
                  .put("http://localhost:8080/payment/finalise", finalisePay)
                  .then((response) => {
                    console.log(response);
                    if (response.data.result == true) {
                      window.alert(response.data.message);
                      history.push("/Basket/Payment/Confirmation");
                    } else {
                      window.alert(response.data.message);
                      history.push("/Basket");
                    }
                  });
              } else {
                window.alert("Some of the items are out of stock..");
                //redirect the page now
                history.push("/Basket");
              }
            });
        } else {
          window.alert("you dont have enough fund for the checkout");
          history.push("/Basket");
        }
      });
  };
  useEffect(() => {
    axios
      .get("http://localhost:8080/payment/getCostAndBaskID/" + userID)
      .then((response) => {
        setTotalCost(response.data.totalCost);
      });
  }, [isLoading]);

  return (
    <div>
      {userID} {totalCost}
      <Form.Group as={Form.Row}>
        <Form.Label column sm={1}>
          Order Date
        </Form.Label>
        <Col sm={10}>
          <Form.Control
            style={{ height: "40px", width: "200px" }}
            type="date"
            name="orderDate"
            id="orderDate"
            value={orderDate}
            onChange={(e) => setOrderDate(e.target.value)}
          />
        </Col>
      </Form.Group>
      <Form.Group as={Form.Row}>
        <Form.Label column sm={1}>
          Delivery Date
        </Form.Label>
        <Col sm={10}>
          <Form.Control
            style={{ height: "40px", width: "200px" }}
            type="date"
            name="deliveryDate"
            id="deliveryDate"
            value={deliveryDate}
            onChange={(e) => setDeliveryDate(e.target.value)}
          />
        </Col>
      </Form.Group>
      <Button
        onClick={() => {
          handleCheckout();
        }}
      >
        Check Out
      </Button>
    </div>
  );
};
export default Payment;
