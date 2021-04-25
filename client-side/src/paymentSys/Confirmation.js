import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  fetchBasketAPI_Func,
  fetchSalesAPI_Func,
  fetchSalesCostAPI_Func,
  checkThresholdAPI_Func,
  deleteBaskAPI_Func,
  addSuppOrderAPIFunc,
  updateStockAPI_Func
} from "../Utility/API";

import OrderDet from "./component/OrderDet";
import emailjs from "emailjs-com";
import { init } from "emailjs-com";
import { pk } from "../setPrimary";
init("user_HHquVKgVDQ4SLVPz86Fm9");
const Confirmation = ({ userID }) => {
  const [orderList, setOrderList] = useState([]);
  const [totalCost, setTotalCost] = useState(null);
  const [deliveryDate, setDeliveryDate] = useState("");
  const [orderDate, setOrderDate] = useState("");
  const [orderRef, setOrderRef] = useState("");
  const [restockList, setRestockList] = useState([]);

  useEffect(async () => {
    await fetchBasketAPI_Func(userID).then((response) => {
      const basketItemID = response.data.result[0].basketItemID;
      fetchSalesAPI_Func(basketItemID, userID).then((response) => {
        console.log("order:", response.data);
        setOrderList(response.data.result);
        setDeliveryDate(response.data.result[0].deliveryDate);
        setOrderDate(response.data.result[0].orderDate);
        setOrderRef(response.data.result[0].basketItemID);
        fetchSalesCostAPI_Func(basketItemID, userID).then((response) => {
          console.log(response.data);
          setTotalCost(response.data.result.totalCost);
          checkThresholdAPI_Func(userID).then((response) => {
            //the restock list
            setRestockList(response.data.result);
//this loop is to add the supplier order details and increase the stock level as soon as the auto email is sent to the respective supplier.
           var len = response.data.result.length;
           for(var i = 0; i<len;i++)
           {
             var itemDetID = response.data.result[i].itemDetID;
             var itemCatID = response.data.result[i].itemCatID;
             const suppOrdID = pk+i;
             var today = new Date();
             var orderDate = today.getFullYear()+'-'+today.getMonth()+'-'+today.getDate();

//use if condition to choose suppID =2
            if ((itemDetID ===2 && itemCatID ===1)|| (itemDetID ===4 && itemCatID ===2)|| (itemDetID ===6 && itemCatID ===3)|| (itemDetID === 8 && itemCatID ===4)){
              const newOrder = {
                suppOrdID,
                suppID :2,
                itemDetID:itemDetID,
                itemCatID:itemCatID,
                suppOrdQty:100,
                orderDate :orderDate,
                ordReceiveDate:orderDate,
              };
              addSuppOrderAPIFunc(newOrder).then((response) => {
                window.alert(response.data.message);
              });
              const newData = {
                suppOrdID,
                ordReceiveDate:orderDate,
                itemDetID:itemDetID,
                suppOrdQty:100
              };
              console.log(newData);
              updateStockAPI_Func(newData).then((response) => {
                console.log(response.data);
                window.alert(response.data.message);
              });}
//use if condition to choose suppID =1
            if ((itemDetID ===1 && itemCatID ===1)|| (itemDetID ===3 && itemCatID ===2)|| (itemDetID ===5 && itemCatID ===3)|| (itemDetID === 7 && itemCatID ===4)){
              const newOrder = {
                suppOrdID,
                suppID :1,
                itemDetID:itemDetID,
                itemCatID:itemCatID,
                suppOrdQty:100,
                orderDate :orderDate,
                ordReceiveDate:orderDate,
              };
              addSuppOrderAPIFunc(newOrder).then((response) => {
                window.alert(response.data.message);});
                
                const newData = {
                  suppOrdID,
                  ordReceiveDate:orderDate,
                  itemDetID:itemDetID,
                  suppOrdQty:100
                };
                console.log(newData);
                updateStockAPI_Func(newData).then((response) => {
                  console.log(response.data);
                  window.alert(response.data.message);
                });}
            }

//this loop is for to send an auto email          
//to check the specific row which has specified itemDetID.
                    var len = response.data.result.length;
                    for(var i = 0; i<len;i++)
                    {
                      var itemDetID = response.data.result[i].itemDetID;
                     
                    var templateParams = {itemDetID: itemDetID,};

//this will send email to JK.
                    if (itemDetID ===1 || itemDetID ===3 || itemDetID ===5 || itemDetID === 7 ){emailjs.send("service_0xa7sfc", "template_37cez8j",templateParams).then(function (response) {
                      console.log("SUCCESS!", response.status, response.text);
                    },
                    function (error) {
                      console.log("FAILED...", error);}); }

//this will send an email to IK
                    if (itemDetID ===2 || itemDetID ===4 || itemDetID ===6 || itemDetID === 8 ){emailjs.send("service_0xa7sfc", "template_7wve856",templateParams).then(function (response) {
                      console.log("SUCCESS!", response.status, response.text);
                    },
                    function (error) {
                      console.log("FAILED...", error);}); }
                  }

            deleteBaskAPI_Func(userID).then((response) => {
              console.log(response.data.message);
            });
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
