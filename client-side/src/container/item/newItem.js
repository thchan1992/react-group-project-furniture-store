import React, { useEffect, useState } from "react";
import { host } from "../../api/url";
import { pk } from "../../Utility/setPrimary";
import { useHistory } from "react-router-dom";
import Component from "./component_newItem/newItem";
import {
  addItemAPIFunc,
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

  useEffect(() => {
    //use Effect to fetch item list.
    showCaterAPI_Func().then((response) => {
      if (response.data.error) {
        messageSetter(response.data.error, "danger", true);
        return;
      }
      //set the category list for user to choose when creating a new item
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

  //function that make the order date
  const dateMaker = (date) => {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  };

  //handle submission of the new item
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
    item.orderDate = dateMaker(new Date());
    item.ordReceiveDate = dateMaker(new Date());

    //api to add the new item
    addItemAPIFunc(item).then((response) => {
      if (response.data.error) {
        messageSetter(response.data.error, "danger", true);
        return;
      }
      authChecker(history, response, false);
      uploadImage();
    });
  };

  //method to upload the picture after adding the new item to the database
  const uploadImage = () => {
    const fd = new FormData();
    fd.append("image", image);
    //upload the image to the API function
    uploadImageAPIFunc(fd).then((response) => {
      //get the url of image in the server
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

  //use the url from the uploadImageAPIFunc to update the itemUrl in the database by using setItemImageAPI_Func
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
