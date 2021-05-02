import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Textbox from "../../../frame/Textbox";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";

const CredForm = ({ user, setUser, payMetList, updateCard }) => {
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
                value={user.payMetID}
                placeholder="Select the Payment Method"
              />
              <DropdownButton
                alignRight
                variant="dark"
                title=""
                onSelect={(e) => setUser({ ...user, payMetID: e })}
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
            attribute={user.cardNumber}
            inputType={"number"}
            setter={(e) => {
              setUser({ ...user, cardNumber: e });
            }}
          />
          <Textbox
            name={"expire Date"}
            attriName={"expire_Date"}
            attribute={user.expire_Date}
            inputType={"date"}
            setter={(e) => {
              setUser({ ...user, expire_Date: e });
            }}
          />{" "}
          <Textbox
            name={"ccv"}
            attriName={"ccv"}
            attribute={user.ccv}
            inputType={"number"}
            setter={(e) => {
              setUser({ ...user, ccv: e });
            }}
          />
          {updateCard != null && (
            <Button onClick={updateCard} variant="info">
              <span className="user-detail-update-button-style">
                Add the card
              </span>
            </Button>
          )}
        </Card.Body>
      </Card>
    </Col>
  );
};

export default CredForm;
