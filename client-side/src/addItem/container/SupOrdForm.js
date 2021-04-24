import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import React, { useEffect, useState } from "react";
import Textbox from "../../Utility/Textbox";

const SupOrdForm = ({
  suppID,
  setSuppID,
  suppList,
  suppOrdQty,
  setSuppOrdQty,
  orderDate,
  setOrderDate,
}) => {
  return (
    <div>
      {" "}
      <Form.Group as={Form.Row}>
        <Form.Label className="text-center" column sm={1}>
          Supplier ID
        </Form.Label>
        <Col sm={10} className="flex-container">
          <Form.Control
            style={{ height: "40px", width: "170px" }}
            readOnly
            value={suppID}
            placeholder="Select the Supplier ID"
          />
          <DropdownButton
            variant="dark"
            title=""
            onSelect={(e) => setSuppID(e)}
          >
            {suppList.map((data) => (
              <Dropdown.Item
                className="text-style-item-upperCase"
                eventKey={data.suppID}
                key={data.suppID}
              >
                - {data.suppName} | {data.suppID}
              </Dropdown.Item>
            ))}
          </DropdownButton>
        </Col>
      </Form.Group>
      <Textbox
        name={"Supplier Order Quantity"}
        attriName={"suppOrdQty"}
        attribute={suppOrdQty}
        inputType={"number"}
        setter={setSuppOrdQty}
      />
      <Textbox
        name={"Order Date"}
        attriName={"orderDate"}
        attribute={orderDate}
        inputType={"date"}
        setter={setOrderDate}
      />
    </div>
  );
};
export default SupOrdForm;
