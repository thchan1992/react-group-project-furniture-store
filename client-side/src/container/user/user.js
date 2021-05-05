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
import { authChecker } from "../../Utility/authChecker";

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

  const [userAddress, setUserAddress] = useState({
    addr1: null,
    addr2: null,
    city: null,
    postcode: null,
  });

  const history = useHistory();

  const updateUser = (column, change) => {
    if (column && change) {
      if (column == "userEmail" && !change.includes("@")) {
        messageSetter("Wrong Email Format: It must contain @", "danger", true);
        return;
      }
      if (
        column == "userPass" &&
        (verPass != user.userPass || user.userPass.length < 6)
      ) {
        messageSetter(
          "password verification failed or password is not long enough",
          "danger",
          true
        );
        return;
      }
      if (column == "userAddress") {
        change =
          change.addr1 +
          " " +
          change.addr2 +
          " " +
          change.city +
          " " +
          change.postcode;
      }

      const userID = curUser.userID;
      const newData = { userID, change, column };
      console.log(newData);
      updateUserDetAPI_Func(newData).then((response) => {
        if (response.data.error) {
          messageSetter(response.data.error, "danger", true);
          return;
        }
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
        setIsLoading(true);
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
        if (response.data.error) {
          messageSetter(response.data.error, "danger", true);
          return;
        }
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
      //no user found will be back to the error page
      if (response.data.error) {
        messageSetter(response.data.error, "danger", true);
        return;
      }
      authChecker(history, response, true);
      setCurUser(response.data.result);
      if (response.data.result.userType == "C") {
        //no user card found will be back to the error page
        fetchUserPayDet_Func(userID).then((response) => {
          if (response.data.error) {
            messageSetter(response.data.error, "danger", true);
            return;
          }
          authChecker(history, response, true);
          setShowCard(response.data.result.cardNumber);
          fetchPayMetAPI_Func().then((response) => {
            if (response.data.error) {
              messageSetter(response.data.error, "danger", true);
              return;
            }
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
        userAddress={userAddress}
        setUserAddress={setUserAddress}
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
