import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import React from "react";

const Textbox = ({ name, attriName, attribute, inputType, setter }) => {
  return (
    <Form.Group as={Form.Row}>
      <Form.Label column sm={1}>
        {name}
      </Form.Label>
      <Col sm={10}>
        <Form.Control
          style={{ height: "40px", width: "200px" }}
          type={inputType}
          name={attriName}
          id={attriName}
          value={attribute}
          onChange={(e) => setter(e.target.value)}
        />
      </Col>
    </Form.Group>
  );
};

export default Textbox;
