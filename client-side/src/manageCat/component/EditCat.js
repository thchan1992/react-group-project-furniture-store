import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import React, { useState } from "react";
import { modifyCatAPI_Func } from "../../Utility/API";
import Message from "../../Utility/Message";

const EditCat = ({ data, setIsLoading }) => {
  const [itemCatName, setItemCatName] = useState("");
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

  const handleSubmit = (itemCatID) => {
    if (column && change) {
      const newData = { column, change, itemCatID };
      modifyCatAPI_Func(newData).then((response) => {
        messageSetter(response.data.message, "success");
        setItemCatName("");
        setCol("");
        setChange("");
        setIsLoading(true);
      });
    } else {
      messageSetter("No data was inserted", "danger");
    }
  };

  return (
    <div key={data.itemCatID}>
      <Message
        messageCont={messageCont}
        showMessage={showMessage}
        setShowMessage={setShowMessage}
      />
      <ul>{data.itemCatName}</ul>
      <Form.Control
        style={{ height: "40px", width: "200px" }}
        type="text"
        name="itemCatName"
        id="itemCatName"
        value={itemCatName}
        onChange={(e) => {
          setItemCatName(e.target.value);
          setCol(e.target.name);
          setChange(e.target.value);
        }}
      />
      <Button
        onClick={() => {
          handleSubmit(data.itemCatID);
        }}
      >
        Edit Name
      </Button>
    </div>
  );
};

export default EditCat;
