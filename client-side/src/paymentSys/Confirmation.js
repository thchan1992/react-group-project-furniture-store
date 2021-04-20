import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import OrderDet from "./component/OrderDet";
import emailjs from "emailjs-com";
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
                    //to check the specific row which has specified itemDetID.
                    var len = response.data.result.length;
                    for(var i = 0; i<len;i++){
                      var itemDetID = response.data.result[i].itemDetID;}
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
