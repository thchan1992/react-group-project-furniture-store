import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { fetchSalesAPI_Func, fetchSalesCostAPI_Func } from "../../api/api";
import Component from "../payment/confirmation_component/confirmation";
import { useHistory } from "react-router-dom";
import { authChecker } from "../../Utility/authChecker";

const OrderDetail = ({ userID, messageSetter }) => {
  const [orderList, setOrderList] = useState([]);
  const [totalCost, setTotalCost] = useState(null);
  const [deliveryDate, setDeliveryDate] = useState("");
  const [orderDate, setOrderDate] = useState("");
  const [orderRef, setOrderRef] = useState("");
  const { basketItemID } = useParams();

  const history = useHistory();

  useEffect(() => {
    //fetch the order detail
    fetchSalesAPI_Func(basketItemID, userID).then((response1) => {
      if (response1.data.error) {
        messageSetter(response1.data.error, "danger", true);
        return;
      }
      authChecker(history, response1, true);
      //set all the order detail
      setOrderList(response1.data.result);
      setDeliveryDate(response1.data.result[0].deliveryDate);
      setOrderDate(response1.data.result[0].orderDate);
      setOrderRef(response1.data.result[0].basketItemID);
      //api to get the total cost of the sales
      fetchSalesCostAPI_Func(basketItemID, userID).then((response2) => {
        if (response2.data.error) {
          messageSetter(response2.data.error, "danger", true);
          return;
        }
        authChecker(history, response2, true);
        setTotalCost(response2.data.result.totalCost);
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

export default OrderDetail;
