import Button from "react-bootstrap/Button";
import React, { useEffect, useState } from "react";
import { host } from "../../frame/Constants";
import { pk } from "../../setPrimary";
import { useHistory } from "react-router-dom";
import Component from "./component/newItem";
import {
  addItemAPIFunc,
  addSuppOrderAPIFunc,
  uploadImageAPIFunc,
  showCaterAPI_Func,
  showSuppAPI_Func,
} from "../../frame/API";

const AddItem = ({ userType, messageSetter }) => {
  const [itemPrice, setItemPrice] = useState(0);
  const [itemQty, setItemQty] = useState(0);
  const [itemCatID, setItemCatID] = useState(0);
  const [image, setImage] = useState(null);
  const [itemName, setItemName] = useState("");
  const [itemDesp, setItemDesp] = useState("");
  const [itemThreshold, setItemThreshold] = useState(0);
  const [itemCatList, setItemCatList] = useState([]);
  const [suppID, setSuppID] = useState("");
  const [suppOrdQty, setSuppOrdQty] = useState("");
  const [orderDate, setOrderDate] = useState("");
  const [suppList, setSuppList] = useState([]);
  const history = useHistory();

  //use Effect to fetch item list.
  useEffect(() => {
    showCaterAPI_Func().then((response) => {
      setItemCatList(response.data.result);
      showSuppAPI_Func().then((response) => {
        if (!response.data.result || response.data.auth == false) {
          history.push("/error");
          window.location.reload(false);
        }
        setSuppList(response.data.result);
      });
    });
  }, []);

  //handle the submission
  const handleSubmit = async () => {
    const fd = new FormData();
    fd.append("image", image);
    //API that uploads the image to the database
    await uploadImageAPIFunc(fd).then((response) => {
      const itemUrl = host + "/" + response.data.fileName;
      const itemDetID = pk;
      const newItem = {
        itemThreshold,
        itemQty,
        itemCatID,
        itemName,
        itemDesp,
        itemUrl,
        itemDetID,
        itemPrice,
        suppID,
      };

      addItemAPIFunc(newItem).then((response) => {
        const suppOrdID = pk;
        const ordReceiveDate = orderDate;
        const newOrder = {
          suppOrdID,
          suppID,
          itemDetID,
          itemCatID,
          suppOrdQty,
          orderDate,
          ordReceiveDate,
          itemName,
        };
        //API that adds the order details to the database
        addSuppOrderAPIFunc(newOrder).then((response) => {
          if (response.data.auth == false) {
            history.push("/error");
            window.location.reload(false);
          }
          messageSetter(response.data.message, "success", true);
        });
      });
    });
  };

  return (
    <div>
      <Component
        userType={userType}
        itemCatID={itemCatID}
        setItemCatID={setItemCatID}
        itemCatList={itemCatList}
        itemName={itemName}
        setItemName={setItemName}
        itemPrice={itemPrice}
        setItemPrice={setItemPrice}
        itemThreshold={itemThreshold}
        setItemThreshold={setItemThreshold}
        itemQty={itemQty}
        setItemQty={setItemQty}
        itemDesp={itemDesp}
        setItemDesp={setItemDesp}
        setImage={setImage}
        suppID={suppID}
        setSuppID={setSuppID}
        suppList={suppList}
        suppOrdQty={suppOrdQty}
        setSuppOrdQty={setSuppOrdQty}
        orderDate={orderDate}
        setOrderDate={setOrderDate}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};
export default AddItem;
