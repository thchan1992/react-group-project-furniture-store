import { useHistory } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Component from "./payment_component/payment";
import {
  checkFundAPI_Func,
  checkStockAPI_Func,
  finalisePayAPI_Func,
  fetchUserPayDet_Func,
  fetchUserDetAPI_Func,
  getCostBaskAPI_Func,
} from "../../api/api";

import { authChecker } from "../../Utility/authChecker";

const Payment = ({ userID, messageSetter }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [totalCost, setTotalCost] = useState(null);
  const [ship, setShip] = useState(5);
  const [userDetail, setUserDetail] = useState("");
  const [paymentDet, setPaymentDet] = useState("");
  const [deliv, setDeliv] = useState(null);
  const [showEdit, setShowEdit] = useState(false);
  const history = useHistory();
  const [checkRe, setCheckRe] = useState(true);
  const [checkEx, setCheckEx] = useState(false);
  const [addr1, setAddr1] = useState(null);
  const [addr2, setAddr2] = useState(null);
  const [city, setCity] = useState(null);
  const [postcode, setPostcode] = useState(null);

  //a function that makes a date with a format that can be recognised by the sqlite
  const setDate = (offset) => {
    const today = new Date();
    today.setDate(today.getDate() + offset);
    var dd1 = String(today.getDate()).padStart(2, "0");
    var mm1 = String(today.getMonth() + 1).padStart(2, "0");
    var yyyy1 = today.getFullYear();
    return (yyyy1 + "-" + mm1 + "-" + dd1).toString();
  };

  //handle the user when checking out
  const handleCheckout = () => {
    const checkFund = { totalCost, userID };
    //API that checks if users have enough fund
    checkFundAPI_Func(checkFund).then((response) => {
      if (response.data.error) {
        messageSetter(response.data.error, "danger", true);
        return;
      }
      authChecker(history, response, false);

      if (response.data.result == true) {
        //API that checks if stock level is enough for users order
        checkStockAPI_Func(userID).then((response) => {
          if (response.data.error) {
            messageSetter(response.data.error, "danger", true);
            return;
          }
          authChecker(history, response, false);
          if (response.data.result == true) {
            //if both stock and funds are okay, function prepares the order detail
            prepareOrder();
          } else {
            history.push("/Basket/" + userID);
            messageSetter(
              "Some of the items are out of stock, please remove this item",
              "warning",
              true
            );
          }
        });
      } else {
        history.push("/Basket/" + userID);
        messageSetter(
          "You do not have enough money for the order",
          "warning",
          true
        );
      }
    });
  };

  // a function that prepare users' order
  const prepareOrder = () => {
    const deliveryDate = setDate(ship);
    console.log("delivery", deliveryDate);
    const orderDate = setDate(0);
    if (addr1 || addr2 || city || postcode) {
      const delivAddress = addr1 + " " + addr2 + " " + city + " " + postcode;
      const finalisePay = {
        userID,
        deliveryDate,
        orderDate,
        delivAddress,
      };
      finalisePayAct(finalisePay);
    } else {
      const delivAddress = deliv;
      const finalisePay = {
        userID,
        deliveryDate,
        orderDate,
        delivAddress,
      };
      finalisePayAct(finalisePay);
    }
  };

  //An API that finalise users' order and redirect to the confirmation.js
  const finalisePayAct = (finalisePay) => {
    finalisePayAPI_Func(finalisePay).then((response) => {
      if (response.data.error) {
        messageSetter(response.data.error, "danger", true);
        return;
      }
      authChecker(history, response, false);

      if (response.data.result == true) {
        history.push("/Basket/Payment/Confirmation");
        messageSetter(response.data.message, "success", true);
      } else {
        history.push("/Basket/" + userID);
        messageSetter(response.data.message, "warning", true);
      }
    });
  };

  //fetch all these information before rendering
  useEffect(() => {
    //get basket total cost
    getCostBaskAPI_Func(userID).then((response) => {
      if (response.data.error) {
        messageSetter(response.data.error, "danger", true);
        return;
      }
      authChecker(history, response, false);
      setTotalCost(response.data.totalCost);
      //get users' detail
      fetchUserDetAPI_Func(userID).then((response) => {
        if (response.data.error) {
          messageSetter(response.data.error, "danger", true);
          return;
        }
        authChecker(history, response, false);
        setUserDetail(response.data.result);
        setDeliv(response.data.result.userAddress);
        //get user payment detail
        fetchUserPayDet_Func(userID).then((response) => {
          if (response.data.error) {
            messageSetter(response.data.error, "danger", true);
            return;
          }
          authChecker(history, response, false);
          setPaymentDet(response.data.result);
        });
      });
    });
  }, [isLoading]);

  return (
    <div>
      {" "}
      <Component
        userID={userID}
        history={history}
        paymentDet={paymentDet}
        userDetail={userDetail}
        deliv={deliv}
        showEdit={showEdit}
        addr1={addr1}
        setAddr1={setAddr1}
        addr2={addr2}
        setAddr2={setAddr2}
        city={city}
        setCity={setCity}
        postcode={postcode}
        setPostcode={setPostcode}
        setShowEdit={setShowEdit}
        checkRe={checkRe}
        setCheckRe={setCheckRe}
        setCheckEx={setCheckEx}
        setShip={setShip}
        checkEx={checkEx}
        handleCheckout={handleCheckout}
      />
    </div>
  );
};
export default Payment;
