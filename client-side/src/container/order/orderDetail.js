import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import {
  fetchBasketAPI_Func,
  fetchSalesAPI_Func,
  fetchSalesCostAPI_Func,
  deleteBaskAPI_Func,
} from "../../api/api";
import Button from "react-bootstrap/esm/Button";
import Component from "../payment/confirmation_component/confirmation";
import { useHistory } from "react-router-dom";
import { authChecker } from "../../Utility/authChecker";

const ViewOrderDetail = ({ userID }) => {
  const [orderList, setOrderList] = useState([]);
  const [totalCost, setTotalCost] = useState(null);
  const [deliveryDate, setDeliveryDate] = useState("");
  const [orderDate, setOrderDate] = useState("");
  const [orderRef, setOrderRef] = useState("");
  const { basketItemID } = useParams();
  const [orderDet, setOrderDet] = useState({});
  const history = useHistory();

  useEffect(() => {
    fetchSalesAPI_Func(basketItemID, userID).then((response1) => {
      if (response1.data.error) {
        window.alert(response1.data.error);
        return;
      }
      authChecker(history, response1, true);
      setOrderList(response1.data.result);
      setDeliveryDate(response1.data.result[0].deliveryDate);
      setOrderDate(response1.data.result[0].orderDate);
      setOrderRef(response1.data.result[0].basketItemID);
      fetchSalesCostAPI_Func(basketItemID, userID).then((response2) => {
        if (response2.data.error) {
          window.alert(response2.data.error);
          return;
        }
        authChecker(history, response2, true);
        setTotalCost(response2.data.result.totalCost);
        setOrderDet({
          totalCost: response2.data.result.totalCost,
          deliveryDate: response1.data.result[0].deliveryDate,
          orderDate: response1.data.result[0].orderDate,
          orderRef: basketItemID,
          orderList: response1.data.result,
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

export default ViewOrderDetail;
