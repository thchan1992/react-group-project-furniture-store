import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";

import React from "react";

import Textbox from "../../../frame/Textbox";
import "./payment.css";

const PaymentDet = ({
  paymentDet,
  userDetail,
  deliv,
  showEdit,
  addr1,
  setAddr1,
  addr2,
  setAddr2,
  city,
  setCity,
  postcode,
  setPostcode,
  setShowEdit,
  checkRe,
  setCheckRe,
  setCheckEx,
  setShip,
  checkEx,
  handleCheckout,
}) => {
  return (
    <div>
      <Card bg="light">
        <Card.Header>
          {" "}
          <h1>Payment & Delivery Detail</h1>
        </Card.Header>
        <Card.Body>
          <ListGroup>
            <ListGroup.Item>
              <span className="payment-attribute-text-style">Card: </span>{" "}
              <br />
              <span className="payment-attribute-detail-text-style">
                {" "}
                {paymentDet.cardNumber}
              </span>
            </ListGroup.Item>
            <ListGroup.Item>
              <span className="payment-attribute-text-style">
                Customer Name:{" "}
              </span>{" "}
              <br />
              <span className="payment-attribute-detail-text-style">
                {" "}
                {userDetail.firstName} {userDetail.lastName}
              </span>{" "}
            </ListGroup.Item>
            <ListGroup.Item>
              <span className="payment-attribute-text-style">
                Contact Email:{" "}
              </span>{" "}
              <br />
              <span className="payment-attribute-detail-text-style">
                {" "}
                {userDetail.userEmail}
              </span>{" "}
            </ListGroup.Item>
            <ListGroup.Item>
              <span className="payment-attribute-text-style">
                Shipping Address:
              </span>
              <br />
              <span className="payment-attribute-detail-text-style">
                {deliv}
              </span>
            </ListGroup.Item>
            <ListGroup.Item>
              <span className="payment-attribute-text-style">
                Delivery Method:
              </span>

              <Form.Check
                className="text-style-item"
                checked={checkRe}
                type="checkbox"
                label={
                  <span className="payment-attribute-detail-text-style">
                    Regular Shipping - 5 days delivery
                  </span>
                }
                onChange={() => {
                  if (checkRe === false) {
                    setCheckRe(true);
                    setCheckEx(false);
                    setShip(5);
                  } else {
                  }
                }}
              />
              <Form.Check
                className="text-style-item"
                checked={checkEx}
                type="checkbox"
                label={
                  <span className="payment-attribute-detail-text-style">
                    Express Shipping - Next day delivery
                  </span>
                }
                onChange={() => {
                  if (checkEx === false) {
                    setCheckEx(true);
                    setCheckRe(false);
                    setShip(1);
                  } else {
                  }
                }}
              />
            </ListGroup.Item>

            {showEdit == true && (
              <ListGroup.Item>
                <Textbox
                  name={"Address line"}
                  attriName={"addr1"}
                  attribute={addr1}
                  inputType={"text"}
                  setter={setAddr1}
                />
                <Textbox
                  name={"Address line"}
                  attriName={"addr2"}
                  attribute={addr2}
                  inputType={"text"}
                  setter={setAddr2}
                />
                <Textbox
                  name={"City"}
                  attriName={"city"}
                  attribute={city}
                  inputType={"text"}
                  setter={setCity}
                />
                <Textbox
                  name={"post code"}
                  attriName={"postcode"}
                  attribute={postcode}
                  inputType={"text"}
                  setter={setPostcode}
                />
              </ListGroup.Item>
            )}
            <ListGroup.Item>
              <Button
                className="change-shipping-text-style"
                variant="warning"
                onClick={() => {
                  if (showEdit == false) {
                    setShowEdit(true);
                  } else {
                    setShowEdit(false);
                  }
                }}
              >
                change shipping address
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card.Body>
        <Card.Footer>
          <ListGroup.Item>
            {" "}
            <Button
              onClick={() => {
                handleCheckout();
              }}
              className="checkout-basket-text-style"
            >
              Check Out
            </Button>
          </ListGroup.Item>
        </Card.Footer>
      </Card>
    </div>
  );
};

export default PaymentDet;
