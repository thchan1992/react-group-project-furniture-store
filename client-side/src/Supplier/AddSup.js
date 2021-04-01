import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { host } from "../Constants";
import { pk } from "../setPrimary";

const AddSup = () => {
  const [suppName, setSuppName] = useState("");
  const [suppEmail, setSuppEmail] = useState("");
  const handleSubmit = () => {
    if (!suppName && !suppEmail) {
      window.alert("not enough data is inserted");
    } else {
      const suppID = pk;
      const newSup = { suppEmail, suppName, suppID };
      console.log(newSup);
      axios.post(host + "/suppliers/addSupplier", newSup).then((response) => {
        window.alert(response.data.message);
      });
    }
  };

  return (
    <div>
      <Form.Group as={Form.Row}>
        <Form.Label column sm={1}>
          Supplier Name
        </Form.Label>
        <Col sm={10}>
          <Form.Control
            style={{ height: "40px", width: "200px" }}
            type="text"
            name="suppName"
            id="suppName"
            value={suppName}
            onChange={(e) => setSuppName(e.target.value)}
          />
        </Col>{" "}
      </Form.Group>
      <Form.Group as={Form.Row}>
        {" "}
        <Form.Label column sm={1}>
          Supplier Email
        </Form.Label>
        <Col sm={10}>
          <Form.Control
            style={{ height: "40px", width: "200px" }}
            type="email"
            name="suppEmail"
            id="suppEmail"
            value={suppEmail}
            onChange={(e) => setSuppEmail(e.target.value)}
          />
        </Col>
      </Form.Group>

      <Button onClick={handleSubmit}>Submit</Button>
    </div>
  );
};

export default AddSup;
