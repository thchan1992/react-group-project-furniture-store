import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import ShowItemComp from "./component/item";
import { host } from "../../frame/Constants";
import { addBaskItemAPI_Func } from "../../frame/API";
import Message from "../../frame/Message";
import {
  editItemAPI_Func,
  delImageAPI_Func,
  uploadImageAPIFunc,
  getItemDetAPI_Func,
} from "../../frame/API";

const ShowItem = ({ userID, userType, messageSetter }) => {
  const [edColumn, setEdColumn] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [data, setItem] = useState({});
  const [itemPrice, setItemPrice] = useState();
  const [itemQty, setItemQty] = useState();
  const [itemCatID, setItemCatID] = useState();
  const [image, setImage] = useState(null);
  const [itemName, setItemName] = useState("");
  const [itemDesp, setItemDesp] = useState("");
  const [itemThreshold, setItemThreshold] = useState();
  const [itemBasketQty, setItemBasketQty] = useState(0);
  const [change, setChange] = useState("");
  const { itemDetID } = useParams();

  const deactItem = (itemDetID) => {
    const column = "itemThreshold";
    const change = 0;
    const newData = {
      column,
      itemDetID,
      change,
    };
    editItemAPI_Func(newData).then((response) => {
      setIsLoading(true);
    });
  };

  const updateItem = (itemDetID, edColumn, change) => {
    if (change != "") {
      const column = edColumn;
      const newData = {
        column,
        itemDetID,
        change,
      };
      //API that edits the attributes.
      editItemAPI_Func(newData).then((response) => {
        messageSetter(response.data.message, "success", true);
        setItemName("");
        setItemCatID("");
        setImage(null);
        setItemDesp("");
        setItemThreshold("");
        setChange("");
        setIsLoading(true);
      });
    } else {
      messageSetter("No Value inserted", "danger", true);
    }
  };

  //function to modify the product image
  const updateImage = async (itemDetID) => {
    //API that deletes the current product image
    await delImageAPI_Func(itemDetID).then((response) => {
      //create a new FormData for storing the new image
      const fd = new FormData();
      //append the new image to the fd
      fd.append("image", image);
      uploadImageAPIFunc(fd).then((response) => {
        const itemUrl = host + "/" + response.data.fileName;
        const column = "itemUrl";
        updateItem(itemDetID, column, itemUrl);
      });
    });
  };

  const addBasketItem = () => {
    if (itemBasketQty == 0) {
      messageSetter("item quanty cannot be 0", "danger", true);
      return;
    }
    const itemDetID = data.itemDetID;
    const newData = { itemBasketQty, itemDetID, userID };
    addBaskItemAPI_Func(newData).then((response) => {
      messageSetter(response.data.message, "success", true);
    });
  };
  useEffect(() => {
    getItemDetAPI_Func(itemDetID).then((response) => {
      setItem(response.data.result);
      setIsLoading(false);
    });
  }, [isLoading]);

  return (
    <div>
      <ShowItemComp
        data={data}
        setItemName={setItemName}
        itemName={itemName}
        userType={userType}
        setImage={setImage}
        updateImage={updateImage}
        itemPrice={itemPrice}
        setItemPrice={setItemPrice}
        setEdColumn={setEdColumn}
        setChange={setChange}
        updateItem={updateItem}
        edColumn={edColumn}
        change={change}
        itemDesp={itemDesp}
        setItemDesp={setItemDesp}
        itemQty={itemQty}
        setItemQty={setItemQty}
        itemThreshold={itemThreshold}
        setItemThreshold={setItemThreshold}
        itemBasketQty={itemBasketQty}
        setItemBasketQty={setItemBasketQty}
        addBasketItem={addBasketItem}
        deactItem={deactItem}
      />
    </div>
  );
};
export default ShowItem;
