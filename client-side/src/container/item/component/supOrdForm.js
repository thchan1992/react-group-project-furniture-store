import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import React, { useEffect, useState } from "react";
import Textbox from "../../../frame/Textbox";

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
      <Form.Group>
        <span className="user-attribute-text-style">Supplier ID</span>
        <div className="flex-container">
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
                className="user-detail-update-text-style"
                eventKey={data.suppID}
                key={data.suppID}
              >
                - {data.suppName} | {data.suppID}
              </Dropdown.Item>
            ))}
          </DropdownButton>
        </div>
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
