import Button from "react-bootstrap/Button";
import React, { useEffect, useState } from "react";
import { host } from "../Constants";
import { pk } from "../setPrimary";
import PickItemCat from "./container/PickItemCat";
import ItemDetForm from "./container/ItemDetForm";
import SupOrdForm from "./container/SupOrdForm";
import {
  addItemAPIFunc,
  addSuppOrderAPIFunc,
  uploadImageAPIFunc,
  showCaterAPI_Func,
  showSuppAPI_Func,
} from "../Utility/API";
import Message from "../Utility/Message";

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
  const [suppList, setSuppList] = useState([]);
  const [showMessage, setShowMessage] = useState(false);
  const [messageCont, setMessageCont] = useState({
    text: "",
    theme: "",
  });

  const messageSetter = (text, theme) => {
    setMessageCont({
      text: text,
      theme: theme,
    });
    setShowMessage(true);
  };

  //use Effect to fetch item list.
  useEffect(() => {
    showCaterAPI_Func().then((response) => {
      setItemCatList(response.data.result);
    });
    showSuppAPI_Func().then((response) => {
      setSuppList(response.data.result);
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
        window.alert(response.data.message);
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
        };
        //API that adds the order details to the database
        addSuppOrderAPIFunc(newOrder).then((response) => {
          messageSetter(response.data.message, "success");
        });
      });
    });
  };

  return (
    <div>
      <Message
        messageCont={messageCont}
        showMessage={showMessage}
        setShowMessage={setShowMessage}
      />
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
          />
          {/*onClick button to submit the item detail and supplier order */}
          <Button onClick={handleSubmit}>upload</Button>
        </div>
      )}
    </div>
  );
};
export default AddItem;
