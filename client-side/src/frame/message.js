import React, { useState, useEffect } from "react";
import Alert from "react-bootstrap/Alert";
import "./message.css";

//boostrap warning
const Message = ({ messageCont, showMessage, setShowMessage }) => {
  return (
    showMessage == true && (
      <Alert
        variant={messageCont.theme}
        onClose={() => setShowMessage(false)}
        dismissible
      >
        <Alert.Heading className="text-message">Message</Alert.Heading>
        <p className="text-message">{messageCont.text}</p>
      </Alert>
    )
  );
};

export default Message;
