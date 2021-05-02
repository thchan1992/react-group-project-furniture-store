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
    <Form.Group>
      <Form.Label>
        <span className="user-attribute-text-style">{name}</span>
      </Form.Label>
      <br />
      <Form.Control
        className="user-detail-update-text-style"
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
