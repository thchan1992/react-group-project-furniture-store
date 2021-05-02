import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import React, { useState } from "react";
import axios from "axios";
import { modifySuppAPI_Func } from "../../../api/api";

import Card from "react-bootstrap/Card";

const EditSupp = ({ data, setIsLoading, messageSetter }) => {
  const [suppName, setSuppName] = useState("");
  const [suppEmail, setSuppEmail] = useState("");
  const [column, setCol] = useState("");
  const [change, setChange] = useState("");

  const handleSubmit = (suppID) => {
    if (column && change) {
      const newData = { column, change, suppID };
      modifySuppAPI_Func(newData).then((response) => {
        messageSetter(response.data.message, "success", true);
        setSuppName("");
        setSuppEmail("");
        setCol("");
        setChange("");
        setIsLoading(true);
      });
    } else {
      messageSetter("No data was inserted", "danger", true);
    }
  };

  return (
    <div key={data.suppID}>
      <Card.Header>
        {" "}
        <span className="category-text-style">
          {data.suppName} <br />
          {data.suppEmail}
        </span>
      </Card.Header>
      <Card.Body>
        {" "}
        <Form.Control
          style={{ height: "40px", width: "200px" }}
          type="text"
          name="suppName"
          id="suppName"
          value={suppName}
          onChange={(e) => {
            setSuppName(e.target.value);
            setCol(e.target.name);
            setChange(e.target.value);
          }}
        />
      </Card.Body>
      <Card.Footer>
        {" "}
        <Button
          onClick={() => {
            handleSubmit(data.suppID);
          }}
          className="category-edit-button-style"
          variant="info"
        >
          Edit Name
        </Button>
      </Card.Footer>
      <Card.Body>
        {" "}
        <Form.Control
          style={{ height: "40px", width: "200px" }}
          type="email"
          name="suppEmail"
          id="suppEmail"
          value={suppEmail}
          onChange={(e) => {
            setSuppEmail(e.target.value);
            setCol(e.target.name);
            setChange(e.target.value);
          }}
        />
      </Card.Body>
      <Card.Footer>
        {" "}
        <Button
          onClick={() => {
            handleSubmit(data.suppID);
          }}
          className="category-edit-button-style"
          variant="info"
        >
          Edit Email
        </Button>
      </Card.Footer>
    </div>
  );
};

export default EditSupp;
