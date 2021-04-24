import React, { useState, useEffect } from "react";
import Alert from "react-bootstrap/Alert";
const Message = ({ messageCont, showMessage, setShowMessage }) => {
  return (
    showMessage == true && (
      <Alert
        variant={messageCont.theme}
        onClose={() => setShowMessage(false)}
        dismissible
      >
        <Alert.Heading>Message</Alert.Heading>
        <p>{messageCont.text}</p>
      </Alert>
    )
  );
};

export default Message;

// import Message from "../Utility/Message";

//   const [showMessage, setShowMessage] = useState(false);
//   const [messageCont, setMessageCont] = useState({
//     text: "",
//     theme: "",
//   });

// const messageSetter = (text, theme) => {
//   setMessageCont({
//     text: text,
//     theme: theme,
//   });
//   setShowMessage(true);
// };

// <Message
//   messageCont={messageCont}
//   showMessage={showMessage}
//   setShowMessage={setShowMessage}
// />
