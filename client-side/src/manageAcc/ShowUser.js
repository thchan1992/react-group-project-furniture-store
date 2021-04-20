import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { host } from "../Constants";
import EditUserForm from "./component/EditUserForm";

import EditCard from "./component/EditCard";

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

  const updateUser = () => {
    if (column && change) {
      if (verPass != userPass) {
        window.alert("password verification failed");
        return;
      }
      const userID = user.userID;
      const newData = { userID, change, column };
      console.log(newData);
      axios
        .put(host + "/account/personalDetails/edit", newData)
        .then((response) => {
          window.alert(response.data.message);
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
      window.alert("not enough data is inserted");
    }
  };
  const updateCard = () => {
    if (cardNumber && payMetID && expire_Date && ccv) {
      const newCard = { payMetID, cardNumber, userID, expire_Date, ccv };
      axios
        .put("http://localhost:8080/account/paymentEdit", newCard)
        .then((response) => {
          setIsLoading(true);
          console.log(response);
          window.alert(response.data.message);
        });
    } else {
      window.alert("not enough card detail");
    }
  };

  useEffect(() => {
    //remove it later
    axios.get(host + "/account/personalDetails/" + userID).then((response) => {
      setUser(response.data.result);
      axios
        .get("http://localhost:8080/account/paymentDetails/" + userID)
        .then((response) => {
          setShowCard(response.data.result.cardNumber);
          setIsLoading(false);
        });
    });
    axios.get("http://localhost:8080/payMet/").then((response) => {
      setPayMetList(response.data.result);
    });
  }, [isLoading]);

  return (
    <div>
      {" "}
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
