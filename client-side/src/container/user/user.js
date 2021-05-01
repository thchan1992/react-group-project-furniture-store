import React, { useEffect, useState } from "react";
import {
  updateUserDetAPI_Func,
  modifyCardAPI_Func,
  fetchUserDetAPI_Func,
  fetchUserPayDet_Func,
  fetchPayMetAPI_Func,
} from "../../frame/API";
import "react-dragswitch/dist/index.css";
import Component from "./component/user";
import { useHistory, useParams } from "react-router-dom";

const User = ({ messageSetter }) => {
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
  const { userID } = useParams();
  const history = useHistory();

  const updateUser = () => {
    if (column && change) {
      if (verPass != userPass) {
        messageSetter("password verification failed", "danger", true);
        return;
      }
      const userID = user.userID;
      const newData = { userID, change, column };
      updateUserDetAPI_Func(newData).then((response) => {
        console.log(response);
        messageSetter(response.data.message, "success", true);
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
      messageSetter("not enough data is inserted", "danger", true);
    }
  };
  const updateCard = () => {
    if (cardNumber && payMetID && expire_Date && ccv) {
      const newCard = { payMetID, cardNumber, userID, expire_Date, ccv };
      modifyCardAPI_Func(newCard).then((response) => {
        setIsLoading(true);
        messageSetter(response.data.message, "success", true);
      });
    } else {
      messageSetter("not enough card detail", "danger", true);
    }
  };

  useEffect(() => {
    fetchUserDetAPI_Func(userID).then((response) => {
      if (!response.data.result || response.data.auth == false) {
        history.push("/error");
        window.location.reload(false);
      }
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
      <Component
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
        updateCard={updateCard}
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
    </div>
  );
};

export default User;
