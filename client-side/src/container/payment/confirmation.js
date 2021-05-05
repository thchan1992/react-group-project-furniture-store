import React, { useEffect, useState } from "react";
import Component from "./confirmation_component/confirmation";
import {
  fetchBasketAPI_Func,
  fetchSalesAPI_Func,
  fetchSalesCostAPI_Func,
  deleteBaskAPI_Func,
} from "../../api/api";
import { useHistory } from "react-router-dom";
import { authChecker } from "../../Utility/authChecker";

const Confirmation = ({ userID, messageSetter }) => {
  const [orderList, setOrderList] = useState([]);
  const [totalCost, setTotalCost] = useState(null);
  const [deliveryDate, setDeliveryDate] = useState("");
  const [orderDate, setOrderDate] = useState("");
  const [orderRef, setOrderRef] = useState("");
  const history = useHistory();
  useEffect(async () => {
    await fetchBasketAPI_Func(userID).then((response) => {
      if (response.data.error) {
        messageSetter(response.data.error, "danger", true);
        return;
      }
      authChecker(history, response, false);
      const basketItemID = response.data.result[0].basketItemID;
      fetchSalesAPI_Func(basketItemID, userID).then((response) => {
        if (response.data.error) {
          messageSetter(response.data.error, "danger", true);
          return;
        }
        authChecker(history, response, true);
        setOrderList(response.data.result);
        setDeliveryDate(response.data.result[0].deliveryDate);
        setOrderDate(response.data.result[0].orderDate);
        setOrderRef(response.data.result[0].basketItemID);
        fetchSalesCostAPI_Func(basketItemID, userID).then((response) => {
          if (response.data.error) {
            messageSetter(response.data.error, "danger", true);
            return;
          }
          authChecker(history, response, true);
          setTotalCost(response.data.result.totalCost);
          deleteBaskAPI_Func(userID).then((response) => {
            console.log(response.data.message);
          });
        });
      });
    });
  }, []);

  return (
    <Component
      totalCost={totalCost}
      deliveryDate={deliveryDate}
      orderDate={orderDate}
      orderRef={orderRef}
      orderList={orderList}
    />
  );
};
export default Confirmation;
