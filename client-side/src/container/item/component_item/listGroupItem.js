import React from "react";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import Form from "react-bootstrap/Form";

const ListGroupItem = ({
  userType,
  inputType,
  attributeName,
  attribute,
  placeholder,
  setter,
  updateItem,
  itemDetID,

  propName,
  property,
}) => {
  return (
    <div>
      {property != null && (
        <ListGroup.Item className="product-detail-text-style">
          <h1 className="product-attribute-text-style">{propName}</h1>{" "}
          {property}
        </ListGroup.Item>
      )}
      {userType == "A" && (
        <ListGroup.Item>
          {" "}
          <div className="flex-container">
            <Form.Control
              className="placeholder-style-item-edit-form"
              style={{ height: "35px", width: "200px" }}
              type={inputType}
              name={attributeName}
              id={attributeName}
              value={attribute}
              placeholder={placeholder}
              onChange={(e) => {
                setter(e.target.value);
              }}
            />
            <Button
              size="sm"
              variant="info"
              onClick={() => {
                updateItem(itemDetID, attributeName, attribute);
              }}
            >
              <span className="edit-product-detail-button-style">Update</span>
            </Button>
          </div>
        </ListGroup.Item>
      )}
    </div>
  );
};

export default ListGroupItem;

//  setEdColumn(e.target.name);
// setChange(e.target.value);
