import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import React from "react";

//text box to be called by many child component for data input from the user
const Textbox = ({
  name,
  attriName,
  attribute,
  inputType,
  setter,
  placeholder,
}) => {
  return (
    <Form.Group>
      <Form.Label>
        <span className="text-box-property-style">{name}</span>
      </Form.Label>
      <br />
      <Form.Control
        className="text-box-property-style"
        style={{ height: "35px", width: "200px" }}
        type={inputType}
        name={attriName}
        id={attriName}
        value={attribute}
        placeholder={placeholder}
        onChange={(e) => setter(e.target.value)}
      />
    </Form.Group>
  );
};

export default Textbox;
