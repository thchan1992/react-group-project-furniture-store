import emailjs from "emailjs-com";
import Form from "react-bootstrap/Form";
import { init } from "emailjs-com";
import { pk } from "../setPrimary";
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  showSuppAPI,
  addSuppOrderAPI,
  showCaterAPI,
  uploadImageAPI,
  host,
  addItemAPI,
} from "../Constants";
init("user_HHquVKgVDQ4SLVPz86Fm9");

function EmailJS(props) {
  const itemData = props.itemData;
  const itemDetIDs = itemData.itemDetIDs;
  const item = itemData.itemName;
  const [itemQty, setItemQty] = useState(itemData.itemQty);
  const [amount, setAmount] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [suppOrdID, setSuppOrdID] = useState("");
  const [suppID, setSuppID] = useState("");
  const [itemDetID, setItemDetID] = useState("");
  const [suppOrdQty, setSuppOrdQty] = useState("");
  const [orderDate, setOrderDate] = useState("");
  const [ordReceiveDate, setOrdReceiveDate] = useState("");
  const [orderList, setOrderList] = useState("");
  const [suppList, setSuppList] = useState([]);
  const [itemCatID, setItemCatID] = useState(0);

  const handleBuy = (event) => {
    var amount1 = parseInt(amount);
    var itemQty1 = itemQty;
    if (itemQty1 - amount1 < 3) {
      const suppOrdID = pk;

      const newOrder = {
        suppOrdID,
        suppID,
        itemDetID,
        itemCatID,
        suppOrdQty,
        orderDate,
        ordReceiveDate,
      };
      //API that adds the order details to the database
      axios
        .post(addSuppOrderAPI, newOrder)

        .then((response) => {
          window.alert(response.data.message);
        });
      emailjs.send("service_0xa7sfc", "template_7wve856").then(
        function (response) {
          console.log("SUCCESS!", response.status, response.text);
        },
        function (error) {
          console.log("FAILED...", error);
        }
      );
      itemQty1 -= amount1;
      setTransactions(transactions);

      setItemQty(itemQty1);
      //addTransaction (amount +"bal"+bal);

      event.preventDefault();
      setAmount("");
    } else {
      itemQty1 -= amount1;
      //addTransaction (amount +"bal"+bal);

      setTransactions(transactions);
      setItemQty(itemQty1);
      event.preventDefault();
      setAmount("");
    }
  };

  return (
    <Form>
      <h1>
        {" "}
        Sofa: {item} {itemDetID}
      </h1>
      <label for="amount">Amount</label>
      <br />
      <input
        type="text"
        id="amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}></input>
      <br />
      <label for="itemDetIDs">itemDetIDs</label>
      <br />
      <input
        type="text"
        id="itemQty"
        value={itemQty}
        onChange={(e) => setItemQty(e.target.value)}></input>
      <br />

      <label for="suppID">Supplier ID</label>
      <br />
      <input
        type="text"
        id="suppID"
        value={suppID}
        onChange={(e) => setSuppID(e.target.value)}></input>
      <br />

      <label for="itemDetID">Item Detail ID</label>
      <br />
      <input
        type="text"
        id="itemDetID"
        value={itemDetID}
        onChange={(e) => setItemDetID(e.target.value)}></input>
      <br />

      <label for="iemCatID">Item Category ID</label>
      <br />
      <input
        type="text"
        id="itemCatID"
        value={itemCatID}
        onChange={(e) => setItemCatID(e.target.value)}></input>
      <br />

      <label for="suppOrdQty">Suplier Quantity</label>
      <br />
      <input
        type="text"
        id="suppOrdQty"
        value={suppOrdQty}
        onChange={(e) => setSuppOrdQty(e.target.value)}></input>
      <br />

      <label for="orderDate">Order Date</label>
      <br />
      <input
        type="text"
        id="orderDate"
        value={orderDate}
        onChange={(e) => setOrderDate(e.target.value)}></input>

      <br />
      <label for="ordReceiveDate"> Receive Order Date</label>
      <br />
      <input
        type="text"
        id="ordReceiveDate"
        value={ordReceiveDate}
        onChange={(e) => setOrdReceiveDate(e.target.value)}></input>

      <br />

      <button type="submit" onClick={handleBuy}>
        BuyItem
      </button>
      <ul>{transactions}</ul>
    </Form>
  );
}
export default EmailJS;
