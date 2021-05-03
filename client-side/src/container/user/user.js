import React, { useEffect, useState } from "react";
import {
  updateUserDetAPI_Func,
  modifyCardAPI_Func,
  fetchUserDetAPI_Func,
  fetchUserPayDet_Func,
  fetchPayMetAPI_Func,
} from "../../api/api";
import "react-dragswitch/dist/index.css";
import Component from "./user_component/user";
import { useHistory, useParams } from "react-router-dom";
import { authChecker } from "../../utility/authChecker";

const User = ({ messageSetter }) => {
  const [user, setUser] = useState({
    firstName: null,
    lastName: null,
    userEmail: null,
    userAddress: null,
    userPass: null,
    payMetID: null,
    expire_Date: null,
    cardNumber: null,
    ccv: null,
  });
  const [verPass, setVerPass] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [curUser, setCurUser] = useState({});
  const [showEd, setShowEd] = useState(false);
  const [showCard, setShowCard] = useState("");
  const [payMetList, setPayMetList] = useState([]);
  const { userID } = useParams();
  const history = useHistory();

  const updateUser = (column, change) => {
    if (column == "userEmail" && !change.includes("@")) {
      messageSetter("Wrong Email Format: It must contain @", "danger", true);
      return;
    }

    if (column && change) {
      if (verPass != user.userPass) {
        messageSetter("password verification failed", "danger", true);
        return;
      }
      const userID = curUser.userID;
      const newData = { userID, change, column };
      updateUserDetAPI_Func(newData).then((response) => {
        authChecker(history, response, false);
        messageSetter(response.data.message, "success", true);
        setIsLoading(true);
        setUser({
          firstName: null,
          lastName: null,
          userEmail: null,
          userAddress: null,
          userPass: null,
          payMetID: null,
          expire_Date: null,
          cardNumber: null,
          ccv: null,
        });
      });
    } else {
      messageSetter("not enough data is inserted", "danger", true);
    }
  };
  const updateCard = () => {
    if (user.cardNumber && user.payMetID && user.expire_Date && user.ccv) {
      const payMetID = user.payMetID;
      const cardNumber = user.cardNumber;
      const userID = curUser.userID;
      const expire_Date = user.expire_Date;
      const ccv = user.ccv;
      const newCard = { payMetID, cardNumber, userID, expire_Date, ccv };
      modifyCardAPI_Func(newCard).then((response) => {
        authChecker(history, response, false);
        setIsLoading(true);
        setUser({
          firstName: null,
          lastName: null,
          userEmail: null,
          userAddress: null,
          userPass: null,
          payMetID: null,
          expire_Date: null,
          cardNumber: null,
          ccv: null,
        });
        messageSetter(response.data.message, "success", true);
      });
    } else {
      messageSetter("not enough card detail", "danger", true);
    }
  };

  useEffect(() => {
    fetchUserDetAPI_Func(userID).then((response) => {
      authChecker(history, response, true);
      setCurUser(response.data.result);
      if (response.data.result.userType == "C") {
        fetchUserPayDet_Func(userID).then((response) => {
          authChecker(history, response, true);
          setShowCard(response.data.result.cardNumber);
          fetchPayMetAPI_Func().then((response) => {
            setPayMetList(response.data.result);
          });
        });
      }
      setIsLoading(false);
    });
  }, [isLoading]);

  return (
    <div>
      <Component
        user={user}
        setUser={setUser}
        curUser={curUser}
        showEd={showEd}
        updateUser={updateUser}
        verPass={verPass}
        setVerPass={setVerPass}
        setShowEd={setShowEd}
        updateCard={updateCard}
        showCard={showCard}
        payMetList={payMetList}
      />
    </div>
  );
};

export default User;
