import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import React, { useState } from "react";
import axios from "axios";
import { modifySuppAPI_Func } from "../../Utility/API";
import Message from "../../Utility/Message";

const EditSupp = ({ data, setIsLoading }) => {
  const [suppName, setSuppName] = useState("");
  const [suppEmail, setSuppEmail] = useState("");
  const [column, setCol] = useState("");
  const [change, setChange] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [messageCont, setMessageCont] = useState({
    text: "",
    theme: "",
  });

  const messageSetter = (text, theme) => {
    setMessageCont({
      text: text,
      theme: theme,
    });
    setShowMessage(true);
  };

  const handleSubmit = (suppID) => {
    if (column && change) {
      const newData = { column, change, suppID };
      modifySuppAPI_Func(newData).then((response) => {
        messageSetter(response.data.message, "success");
        setSuppName("");
        setSuppEmail("");
        setCol("");
        setChange("");
        setIsLoading(true);
      });
    } else {
      messageSetter("No data was inserted", "danger");
    }
  };

  return (
    <div key={data.suppID}>
      <Message
        messageCont={messageCont}
        showMessage={showMessage}
        setShowMessage={setShowMessage}
      />
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
