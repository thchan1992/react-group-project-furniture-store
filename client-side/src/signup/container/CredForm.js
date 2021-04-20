import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Textbox from "../../Utility/Textbox";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

const CredForm = ({
  payMetID,
  setPayMetID,
  cardNumber,
  setCardNumber,
  expire_Date,
  setExpire_Date,
  ccv,
  setCcv,
  payMetList,
}) => {
  return (
    <div>
      <Form.Group as={Form.Row}>
        <Form.Label className="text-center" column sm={1}>
          Payment Method
        </Form.Label>
        <Col sm={10} className="flex-container">
          <Form.Control
            style={{ height: "40px", width: "170px" }}
            readOnly
            value={payMetID}
            placeholder="Select the Payment Method"
          />
          <DropdownButton
            variant="dark"
            title=""
            onSelect={(e) => setPayMetID(e)}
          >
            {payMetList.map((data) => (
              <Dropdown.Item
                className="text-style-item-upperCase"
                eventKey={data.payMetID}
                key={data.payMetID}
              >
                - {data.payMetName} | {data.payMetID}
              </Dropdown.Item>
            ))}
          </DropdownButton>
        </Col>
      </Form.Group>
      <Textbox
        name={"card number"}
        attriName={"cardNumber"}
        attribute={cardNumber}
        inputType={"number"}
        setter={setCardNumber}
      />
      <Textbox
        name={"expire Date"}
        attriName={"expire_Date"}
        attribute={expire_Date}
        inputType={"date"}
        setter={setExpire_Date}
      />{" "}
      <Textbox
        name={"ccv"}
        attriName={"ccv"}
        attribute={ccv}
        inputType={"number"}
        setter={setCcv}
      />
    </div>
  );
};

export default CredForm;
