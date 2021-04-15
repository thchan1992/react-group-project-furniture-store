import Button from "react-bootstrap/Button";
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
import { pk } from "../setPrimary";
import PickItemCat from "./container/PickItemCat";
import ItemDetForm from "./container/ItemDetForm";
import SupOrdForm from "./container/SupOrdForm";

const AddItem = ({ userType }) => {
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
  const [ordReceiveDate, setOrdReceiveDate] = useState("");
  const [suppList, setSuppList] = useState([]);

  //use Effect to fetch item list.
  useEffect(() => {
    axios.get(showCaterAPI).then((response) => {
      setItemCatList(response.data.result);
    });
    axios.get(showSuppAPI).then((response) => {
      setSuppList(response.data.result);
    });
  }, []);

  //handle the submission
  const handleSubmit = async () => {
    const fd = new FormData();
    fd.append("image", image);
    //API that uploads the image to the database
    await axios
      .post(uploadImageAPI, fd, {
        headers: {
          "Content-Type": "multipart/form-data",
          "x-access-token": localStorage.getItem("token"),
        },
      })
      .then((response) => {
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
        };
        //API that adds the item details to the database
        axios
          .post(addItemAPI, newItem, {
            headers: {
              "x-access-token": localStorage.getItem("token"),
            },
          })
          .then((response) => {
            window.alert(response.data.message);
          });
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
        axios.post(addSuppOrderAPI, newOrder).then((response) => {
          window.alert(response.data.message);
        });
      });
  };

  return (
    <div>
      <h1>Add New Item</h1>{" "}
      {userType === "A" && (
        <div>
          {/*Drop down button to select item category */}
          <PickItemCat
            itemCatID={itemCatID}
            setItemCatID={setItemCatID}
            itemCatList={itemCatList}
          />
          {/* product detail form */}
          <ItemDetForm
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
          />
          {/*Supplier order form */}
          <SupOrdForm
            suppID={suppID}
            setSuppID={setSuppID}
            suppList={suppList}
            suppOrdQty={suppOrdQty}
            setSuppOrdQty={setSuppOrdQty}
            orderDate={orderDate}
            setOrderDate={setOrderDate}
            ordReceiveDate={ordReceiveDate}
            setOrdReceiveDate={setOrdReceiveDate}
          />
          {/*onClick button to submit the item detail and supplier order */}
          <Button onClick={handleSubmit}>upload</Button>
        </div>
      )}
    </div>
  );
};
export default AddItem;
