import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import React from "react";

const Textbox = ({
  name,
  attriName,
  attribute,
  inputType,
  setter,
  placeholder,
}) => {
  return (
    <Form.Group as={Form.Row}>
      <Form.Label column sm={2}>
        {name}
      </Form.Label>
      <Col sm={10}>
        <Form.Control
          style={{ height: "35px", width: "200px" }}
          type={inputType}
          name={attriName}
          id={attriName}
          value={attribute}
          placeholder={placeholder}
          onChange={(e) => setter(e.target.value)}
        />
      </Col>
    </Form.Group>
  );
};

export default Textbox;
