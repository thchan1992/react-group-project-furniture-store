import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Textbox from "../../../frame/Textbox";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";

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
  updateCard,
}) => {
  return (
    <Col>
      <Card>
        <Card.Header>
          <span className="sales-report-title">Credit Card Form</span>
        </Card.Header>
        <Card.Body>
          <Form.Group>
            <Form.Label>
              <span className="user-attribute-text-style">Payment Method</span>
            </Form.Label>
            <br />
            <div className="flex-container">
              <Form.Control
                style={{ height: "40px", width: "170px" }}
                readOnly
                value={payMetID}
                placeholder="Select the Payment Method"
              />
              <DropdownButton
                alignRight
                variant="dark"
                title=""
                onSelect={(e) => setPayMetID(e)}
              >
                {payMetList.map((data) => (
                  <Dropdown.Item eventKey={data.payMetID} key={data.payMetID}>
                    <span className="user-detail-text-style">
                      - {data.payMetName} | {data.payMetID}
                    </span>
                  </Dropdown.Item>
                ))}
              </DropdownButton>
            </div>
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
          <Button onClick={updateCard} variant="info">
            <span className="user-detail-update-button-style">
              Add the card
            </span>
          </Button>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default CredForm;
