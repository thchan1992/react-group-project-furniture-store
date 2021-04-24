import React, { useEffect, useState } from "react";
import EditUserForm from "./component/EditUserForm";
import {
  updateUserDetAPI_Func,
  modifyCardAPI_Func,
  fetchUserDetAPI_Func,
  fetchUserPayDet_Func,
  fetchPayMetAPI_Func,
} from "../Utility/API";
import EditCard from "./component/EditCard";
import Message from "../Utility/Message";

const ShowUser = ({ userID }) => {
  const [userEmail, setUserEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userAddress, setUserAddress] = useState("");
  const [userPass, setUserPass] = useState("");
  const [verPass, setVerPass] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [column, setCol] = useState("");
  const [change, setChange] = useState("");
  const [user, setUser] = useState({});
  const [showEd, setShowEd] = useState(false);
  const [showCard, setShowCard] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [payMetID, setPayMetID] = useState("");
  const [expire_Date, setExpire_Date] = useState("");
  const [ccv, setCcv] = useState("");
  const [payMetList, setPayMetList] = useState([]);
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

  const updateUser = () => {
    if (column && change) {
      if (verPass != userPass) {
        messageSetter("password verification failed", "danger");
        return;
      }
      const userID = user.userID;
      const newData = { userID, change, column };
      updateUserDetAPI_Func(newData).then((response) => {
        console.log(response);
        messageSetter(response.data.message, "success");
        setIsLoading(true);
        setUserEmail("");
        setFirstName("");
        setLastName("");
        setUserAddress("");
        setUserPass("");
        setVerPass("");
        setCol("");
        setChange("");
      });
    } else {
      messageSetter("not enough data is inserted", "danger");
    }
  };
  const updateCard = () => {
    if (cardNumber && payMetID && expire_Date && ccv) {
      const newCard = { payMetID, cardNumber, userID, expire_Date, ccv };
      modifyCardAPI_Func(newCard).then((response) => {
        setIsLoading(true);
        messageSetter(response.data.message, "success");
      });
    } else {
      messageSetter("not enough card detail", "danger");
    }
  };

  useEffect(() => {
    fetchUserDetAPI_Func(userID).then((response) => {
      setUser(response.data.result);
      fetchUserPayDet_Func(userID).then((response) => {
        setShowCard(response.data.result.cardNumber);
        setIsLoading(false);
      });
    });
    fetchPayMetAPI_Func().then((response) => {
      setPayMetList(response.data.result);
    });
  }, [isLoading]);

  return (
    <div>
      {" "}
      <Message
        messageCont={messageCont}
        showMessage={showMessage}
        setShowMessage={setShowMessage}
      />
      <EditCard
        updateCard={updateCard}
        showEd={showEd}
        showCard={showCard}
        payMetID={payMetID}
        setPayMetID={setPayMetID}
        cardNumber={cardNumber}
        setCardNumber={setCardNumber}
        expire_Date={expire_Date}
        setExpire_Date={setExpire_Date}
        ccv={ccv}
        setCcv={setCcv}
        payMetList={payMetList}
      />
      <EditUserForm
        user={user}
        showEd={showEd}
        firstName={firstName}
        setFirstName={setFirstName}
        setCol={setCol}
        setChange={setChange}
        updateUser={updateUser}
        lastName={lastName}
        setLastName={setLastName}
        userEmail={userEmail}
        setUserEmail={setUserEmail}
        userAddress={userAddress}
        setUserAddress={setUserAddress}
        userPass={userPass}
        setUserPass={setUserPass}
        verPass={verPass}
        setVerPass={setVerPass}
        setShowEd={setShowEd}
      />
    </div>
  );
};

export default ShowUser;
