import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import React from "react";
import Button from "react-bootstrap/Button";
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
    <Form.Group as={Form.Row}>
      <Form.Label column sm={1}>
        {name}
      </Form.Label>
      <Col sm={10}>
        {data}
        {showEd == true && (
          <>
            <Form.Control
              style={{ height: "40px", width: "200px" }}
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
                updateUser();
              }}
            >
              Update
            </Button>
          </>
        )}
      </Col>
    </Form.Group>
  );
};

export default EdUserTextbox;
