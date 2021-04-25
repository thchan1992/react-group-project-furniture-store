import Button from "react-bootstrap/Button";
import Textbox from "../Utility/Textbox";
import React, { useState } from "react";
import { addCatAPI_Func } from "../Utility/API";
import { pk } from "../setPrimary";
import Message from "../Utility/Message";
const AddCat = () => {
  const [itemCatName, setItemCatName] = useState("");
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

  const handleSubmit = () => {
    if (!itemCatName) {
      messageSetter("no name is insert", "danger");
    } else {
      const itemCatID = pk;
      const newCat = { itemCatName, itemCatID };
      addCatAPI_Func(newCat).then((response) => {
        messageSetter(response.data.message, "success");
      });
    }
  };

  return (
    <div>
      <Message
        messageCont={messageCont}
        showMessage={showMessage}
        setShowMessage={setShowMessage}
      />

      <Textbox
        name={"Category Name"}
        attriName={"itemCatName"}
        attribute={itemCatName}
        inputType={"text"}
        setter={setItemCatName}
      />
      <Button onClick={handleSubmit}>Submit</Button>
    </div>
  );
};

export default AddCat;
