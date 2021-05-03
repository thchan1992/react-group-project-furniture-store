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
  const [checkRe, setCheckRe] = useState(true);
  const [checkEx, setCheckEx] = useState(false);
  const [userDetail, setUserDetail] = useState("");
  const [paymentDet, setPaymentDet] = useState("");
  const [deliv, setDeliv] = useState(null);
  const [showEdit, setShowEdit] = useState(false);
  const [addr1, setAddr1] = useState(null);
  const [addr2, setAddr2] = useState(null);
  const [city, setCity] = useState(null);
  const [postcode, setPostcode] = useState(null);
  const history = useHistory();

  const handleCheckout = async () => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0");
    var yyyy = today.getFullYear();
    const orderDate = (yyyy + "-" + mm + "-" + dd).toString();

    const shipDate = new Date(today);
    shipDate.setDate(shipDate.getDate() + ship);
    var dd1 = String(shipDate.getDate()).padStart(2, "0");
    var mm1 = String(shipDate.getMonth() + 1).padStart(2, "0");
    var yyyy1 = shipDate.getFullYear();
    const deliveryDate = (yyyy1 + "-" + mm1 + "-" + dd1).toString();
    const checkFund = { totalCost, userID };

    checkFundAPI_Func(checkFund).then((response) => {
      authChecker(history, response, false);
      if (response.data.result == true) {
        checkStockAPI_Func(userID).then((response) => {
          authChecker(history, response, false);
          // redirect(response);
          if (response.data.result == true) {
            if (addr1 || addr2 || city || postcode) {
              const delivAddress =
                addr1 + " " + addr2 + " " + city + " " + postcode;
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
          } else {
            history.push("/Basket");
            messageSetter(
              "Some of the items are out of stock, please remove this item",
              "warning",
              true
            );
          }
        });
      } else {
        history.push("/Basket");
        messageSetter(
          "You do not have enough money for the order",
          "warning",
          true
        );
      }
    });
  };

  const finalisePayAct = (finalisePay) => {
    finalisePayAPI_Func(finalisePay).then((response) => {
      authChecker(history, response, false);
      // redirect(response);
      if (response.data.result == true) {
        history.push("/Basket/Payment/Confirmation");
        messageSetter(response.data.message, "success", true);
      } else {
        history.push("/Basket");
        messageSetter(response.data.message, "warning", true);
      }
    });
  };

  useEffect(() => {
    getCostBaskAPI_Func(userID).then((response) => {
      authChecker(history, response, false);
      setTotalCost(response.data.totalCost);
      fetchUserDetAPI_Func(userID).then((response) => {
        authChecker(history, response, false);
        setUserDetail(response.data.result);
        setDeliv(response.data.result.userAddress);
        fetchUserPayDet_Func(userID).then((response) => {
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
