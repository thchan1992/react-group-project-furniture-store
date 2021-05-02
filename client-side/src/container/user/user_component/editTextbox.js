import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import React from "react";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";

const EdUserTextbox = ({
  name,
  attriName,
  attribute,
  inputType,
  setter,
  data,
  showEd,
  updateUser,
}) => {
  return (
    <div>
      <ListGroup.Item>
        <span className="user-attribute-text-style">{name}</span>
        <br />
        <span className="user-detail-text-style">{data}</span>
      </ListGroup.Item>{" "}
      {showEd == true && (
        <ListGroup.Item>
          <div className="flex-container">
            <Form.Control
              style={{ height: "40px", width: "200px" }}
              className="user-detail-update-text-style"
              type={inputType}
              name={attriName}
              id={attriName}
              value={attribute}
              onChange={(e) => setter(e)}
            />{" "}
            <Button
              size="sm"
              variant="info"
              onClick={() => {
                updateUser(attriName, attribute);
              }}
            >
              <span className="user-detail-update-button-style">Update</span>
            </Button>
          </div>{" "}
        </ListGroup.Item>
      )}
    </div>
  );
};

export default EdUserTextbox;
