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
  const history = useHistory();
  const [userAddress, setUserAddress] = useState({
    addr1: null,
    addr2: null,
    city: null,
    postcode: null,
  });

  //handle the user detail modification
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
        if (!change.addr1 || !change.city || !change.postcode) {
          messageSetter("Address format is not correct", "danger", true);
          return;
        }
        change =
          change.addr1 +
          ", " +
          change.addr2 +
          ", " +
          change.city +
          ", " +
          change.postcode;
      }

      const userID = curUser.userID;
      const newData = { userID, change, column };
      //api that updates user detail based on the table column, modification and userID
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

  //function that handle the updating user card detail
  const updateCard = () => {
    if (user.cardNumber && user.payMetID && user.expire_Date && user.ccv) {
      const payMetID = user.payMetID;
      const cardNumber = user.cardNumber;
      const userID = curUser.userID;
      const expire_Date = user.expire_Date;
      const ccv = user.ccv;
      const newCard = { payMetID, cardNumber, userID, expire_Date, ccv };
      //api that modifies card detail
      modifyCardAPI_Func(newCard).then((response) => {
        if (
          response.data.error ==
          "SQLITE_CONSTRAINT: UNIQUE constraint failed: paymentDetail.cardNumber"
        ) {
          messageSetter("Credit card already exists", "danger", true);
          return;
        }
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

  //fetching few api before renderinf
  useEffect(() => {
    //api that get users' detail
    fetchUserDetAPI_Func(userID).then((response) => {
      if (response.data.error) {
        messageSetter(response.data.error, "danger", true);
        return;
      }
      authChecker(history, response, true);
      setCurUser(response.data.result);
      if (response.data.result.userType == "C") {
        //api that gets users' card detail
        fetchUserPayDet_Func(userID).then((response) => {
          if (response.data.error) {
            messageSetter(response.data.error, "danger", true);
            return;
          }
          authChecker(history, response, true);
          setShowCard(response.data.result.cardNumber);
          //api that fetchs payment method
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
