import React, { useEffect, useState } from "react";
import OrderDet from "./component/confirmation";
import {
  fetchBasketAPI_Func,
  fetchSalesAPI_Func,
  fetchSalesCostAPI_Func,
  deleteBaskAPI_Func,
} from "../../frame/API";
import { useHistory } from "react-router-dom";

const Confirmation = ({ userID }) => {
  const [orderList, setOrderList] = useState([]);
  const [totalCost, setTotalCost] = useState(null);
  const [deliveryDate, setDeliveryDate] = useState("");
  const [orderDate, setOrderDate] = useState("");
  const [orderRef, setOrderRef] = useState("");
  const history = useHistory();
  useEffect(async () => {
    await fetchBasketAPI_Func(userID).then((response) => {
      const basketItemID = response.data.result[0].basketItemID;
      fetchSalesAPI_Func(basketItemID, userID).then((response) => {
        setOrderList(response.data.result);
        setDeliveryDate(response.data.result[0].deliveryDate);
        setOrderDate(response.data.result[0].orderDate);
        setOrderRef(response.data.result[0].basketItemID);
        fetchSalesCostAPI_Func(basketItemID, userID).then((response) => {
          setTotalCost(response.data.result.totalCost);
          deleteBaskAPI_Func(userID).then((response) => {
            console.log(response.data.message);
          });
        });
      });
    });
  }, []);

  return (
    <OrderDet
      totalCost={totalCost}
      deliveryDate={deliveryDate}
      orderDate={orderDate}
      orderRef={orderRef}
      orderList={orderList}
    />
  );
};
export default Confirmation;
