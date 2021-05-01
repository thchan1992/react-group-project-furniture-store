import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

const PickItemCat = ({ itemCatID, setItemCatID, itemCatList }) => {
  return (
    <Form.Group>
      <span className="user-attribute-text-style">Item Category ID</span>

      <div className="flex-container">
        <Form.Control
          style={{ height: "40px", width: "170px" }}
          readOnly
          value={itemCatID}
          placeholder="Select the Category"
        />
        <DropdownButton
          variant="dark"
          title=""
          onSelect={(e) => setItemCatID(e)}
        >
          {itemCatList.map((data) => (
            <Dropdown.Item
              className="user-detail-update-text-style"
              eventKey={data.itemCatID}
              key={data.itemCatID}
            >
              - {data.itemCatName} | {data.itemCatID}
            </Dropdown.Item>
          ))}
        </DropdownButton>
      </div>
    </Form.Group>
  );
};

export default PickItemCat;
