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
  setEdColumn,
  setChange,
  edColumn,
  change,
}) => {
  return (
    <div>
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
                setEdColumn(e.target.name);
                setChange(e.target.value);
              }}
            />
            <Button
              size="sm"
              variant="info"
              onClick={() => {
                updateItem(itemDetID, edColumn, change);
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
