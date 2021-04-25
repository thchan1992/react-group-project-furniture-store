import React, { useState } from "react";
import { addSupp_Func } from "../Utility/API";
import { pk } from "../setPrimary";
import AddSupForm from "./component/AddSupForm";
import Message from "../Utility/Message";

const AddSup = () => {
  const [suppName, setSuppName] = useState("");
  const [suppEmail, setSuppEmail] = useState("");
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
    if (!suppName && !suppEmail) {
      messageSetter("not enough data is inserted", "danger");
    } else {
      const suppID = pk;
      const newSup = { suppEmail, suppName, suppID };
      addSupp_Func(newSup).then((response) => {
        messageSetter(response.data.message, "success");
      });
      setSuppName("");
      setSuppEmail("");
    }
  };

  return (
    <div>
      {" "}
      <Message
        messageCont={messageCont}
        showMessage={showMessage}
        setShowMessage={setShowMessage}
      />{" "}
      <AddSupForm
        suppName={suppName}
        setSuppName={setSuppName}
        suppEmail={suppEmail}
        setSuppEmail={setSuppEmail}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default AddSup;
