import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import OrderDet from "./component/OrderDet";

const Confirmation = ({ userID }) => {
  const [orderList, setOrderList] = useState([]);
  const [totalCost, setTotalCost] = useState(null);
  const [deliveryDate, setDeliveryDate] = useState("");
  const [orderDate, setOrderDate] = useState("");
  const [orderRef, setOrderRef] = useState("");
  const [restockList, setRestockList] = useState([]);

  useEffect(async () => {
    await axios
      .get("http://localhost:8080/basket/" + userID)
      .then((response) => {
        const basketItemID = response.data.result[0].basketItemID;
        axios
          .get("http://localhost:8080/sales/" + basketItemID + "/" + userID)
          .then((response) => {
            console.log("order:", response.data);
            setOrderList(response.data.result);
            setDeliveryDate(response.data.result[0].deliveryDate);
            setOrderDate(response.data.result[0].orderDate);
            setOrderRef(response.data.result[0].basketItemID);
            axios
              .get(
                "http://localhost:8080/sales/totalCost/" +
                  basketItemID +
                  "/" +
                  userID
              )
              .then((response) => {
                console.log(response.data);
                setTotalCost(response.data.result.totalCost);
                axios
                  .get("http://localhost:8080/item/checkThreshold/" + userID)
                  .then((response) => {
                    console.log(response.data.result);
                    //the restock list
                    setRestockList(response.data.result);
                    //this is where you call email js function.

                    axios
                      .delete("http://localhost:8080/basket/delete/" + userID)
                      .then((response) => {
                        console.log(response.data.message);
                      });
                  });
              });
          });
      });
  }, []);
  //email function

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
