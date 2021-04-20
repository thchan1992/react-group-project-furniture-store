import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";

import React from "react";

import Textbox from "../../Utility/Textbox";

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
      <h1>Payment & Delivery Detail</h1>
      <h5>Card: {paymentDet.cardNumber}</h5>
      <h5>
        Name: {userDetail.firstName} {userDetail.lastName}
      </h5>
      <h5>Email: {userDetail.userEmail}</h5>
      <h5>Shipping Address: {deliv}</h5>
      {showEdit == true && (
        <div>
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
        </div>
      )}
      <Button
        onClick={() => {
          if (showEdit == false) {
            setShowEdit(true);
          } else {
            setShowEdit(false);
          }
        }}
      >
        check different address
      </Button>
      <h5>Delivery Method: </h5>
      <Col sm={10}>
        <Form.Check
          className="text-style-item"
          checked={checkRe}
          type="checkbox"
          label="Regular Shipping - 5 days delivery"
          onChange={() => {
            if (checkRe === false) {
              setCheckRe(true);
              setCheckEx(false);
              setShip(5);
            } else {
            }
          }}
        />
      </Col>
      <Col sm={10}>
        <Form.Check
          className="text-style-item"
          checked={checkEx}
          type="checkbox"
          label="Express Shipping - Next day delivery"
          onChange={() => {
            if (checkEx === false) {
              setCheckEx(true);
              setCheckRe(false);
              setShip(1);
            } else {
            }
          }}
        />
      </Col>

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

export default PaymentDet;
