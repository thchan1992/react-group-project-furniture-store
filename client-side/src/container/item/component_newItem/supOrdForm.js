import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import React, { useEffect, useState } from "react";
import Textbox from "../../../utility/Textbox";

const SupOrdForm = ({ suppList, item, setItem }) => {
  return (
    <div>
      {" "}
      <Form.Group>
        <span className="user-attribute-text-style">Supplier ID</span>
        <div className="flex-container">
          <Form.Control
            style={{ height: "40px", width: "170px" }}
            readOnly
            value={item.suppID}
            placeholder="Select the Supplier ID"
          />
          <DropdownButton
            variant="dark"
            title=""
            onSelect={(e) => setItem({ ...item, suppID: e })}
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
    </div>
  );
};
export default SupOrdForm;
