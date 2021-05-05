import React, { useEffect, useState } from "react";
import { host } from "../../api/url";
import { pk } from "../../Utility/setPrimary";
import { useHistory } from "react-router-dom";
import Component from "./component_newItem/newItem";
import {
  addItemAPIFunc,
  addSuppOrderAPIFunc,
  uploadImageAPIFunc,
  showCaterAPI_Func,
  showSuppAPI_Func,
  setItemImageAPI_Func,
} from "../../api/api";
import { authChecker } from "../../Utility/authChecker";

const NewItem = ({ messageSetter }) => {
  const [item, setItem] = useState({
    itemThreshold: 0,
    itemQty: 0,
    itemCatID: "",
    itemName: "",
    itemDesp: "",
    itemUrl: "",
    itemDetID: "",
    itemPrice: 0,
    suppID: "",
  });
  const [image, setImage] = useState(null);
  const [itemCatList, setItemCatList] = useState([]);
  const [suppList, setSuppList] = useState([]);
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);

  //use Effect to fetch item list.
  useEffect(() => {
    showCaterAPI_Func().then((response) => {
      if (response.data.error) {
        messageSetter(response.data.error, "danger", true);
        return;
      }
      setItemCatList(response.data.result);
      showSuppAPI_Func().then((response) => {
        if (response.data.error) {
          messageSetter(response.data.error, "danger", true);
          return;
        }
        authChecker(history, response, true);
        setSuppList(response.data.result);
        setIsLoading(false);
      });
    });
  }, [isLoading]);

  const handleSubmit = () => {
    if (
      !item.itemThreshold ||
      !item.itemQty ||
      !item.itemCatID ||
      !item.itemName ||
      !item.itemDesp ||
      !item.itemPrice ||
      !item.suppID ||
      !image
    ) {
      messageSetter("Make sure filling up all the fields", "warning", true);
      return;
    }
    item.itemDetID = pk();
    item.suppOrdID = pk() + 1;
    item.suppOrdQty = item.itemQty;
    const today = new Date();
    item.orderDate =
      today.getFullYear() + "-" + today.getMonth() + "-" + today.getDate();
    item.ordReceiveDate =
      today.getFullYear() + "-" + today.getMonth() + "-" + today.getDate();

    addItemAPIFunc(item).then((response) => {
      if (response.data.error) {
        messageSetter(response.data.error, "danger", true);
        return;
      }
      authChecker(history, response, false);
      uploadImage();
    });
  };

  const uploadImage = () => {
    const fd = new FormData();
    fd.append("image", image);
    uploadImageAPIFunc(fd).then((response) => {
      if (response.data.fileName) {
        const itemUrl = host + "/" + response.data.fileName;
        const itemDetID = item.itemDetID;
        const newData = { itemUrl, itemDetID };
        updateImageUrl(newData);
      } else {
        messageSetter(
          "Image upload has been interrupted, please try it again later",
          "warning",
          true
        );
        return;
      }
    });
  };

  const updateImageUrl = (newData) => {
    setItemImageAPI_Func(newData).then((response) => {
      if (response.data.error) {
        messageSetter(response.data.error, "danger", true);
        return;
      }
      authChecker(history, response, false);

      setItem({
        itemThreshold: 0,
        itemQty: 0,
        itemCatID: "",
        itemName: "",
        itemDesp: "",
        itemUrl: "",
        itemDetID: "",
        itemPrice: 0,
        suppID: "",
      });
      setImage(null);
      setIsLoading(true);
      messageSetter("new item has been added", "success", true);
    });
  };

  return (
    <div>
      <Component
        itemCatList={itemCatList}
        setImage={setImage}
        suppList={suppList}
        handleSubmit={handleSubmit}
        item={item}
        setItem={setItem}
      />
    </div>
  );
};
export default NewItem;
