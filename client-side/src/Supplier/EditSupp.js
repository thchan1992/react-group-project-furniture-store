import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import React, { useState } from "react";
import axios from "axios";
import { host } from "../Constants";

const EditSupp = ({ data, setIsLoading }) => {
  const [suppName, setSuppName] = useState("");
  const [suppEmail, setSuppEmail] = useState("");
  const [column, setCol] = useState("");
  const [change, setChange] = useState("");

  const handleSubmit = (suppID) => {
    if (column && change) {
      const newData = { column, change, suppID };
      axios.put(host + "/suppliers/edit/", newData).then((response) => {
        window.alert(response.data.message);
        setSuppName("");
        setSuppEmail("");
        setCol("");
        setChange("");
        setIsLoading(true);
      });
    } else {
      window.alert("No data was inserted");
    }
  };

  return (
    <div key={data.suppID}>
      <ul>{data.suppName}</ul>
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

      <Button
        onClick={() => {
          handleSubmit(data.suppID);
        }}
      >
        Edit Name
      </Button>
      <ul>{data.suppEmail}</ul>
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
      <Button
        onClick={() => {
          handleSubmit(data.suppID);
        }}
      >
        Edit Email
      </Button>
    </div>
  );
};

export default EditSupp;
