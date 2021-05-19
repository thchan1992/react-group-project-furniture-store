import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Component from "./component_items/item";
import { host } from "../../api/url";
import { addBaskItemAPI_Func } from "../../api/api";
import { authChecker } from "../../Utility/authChecker";
import { useHistory } from "react-router-dom";

import {
  editItemAPI_Func,
  delImageAPI_Func,
  uploadImageAPIFunc,
  getItemDetAPI_Func,
} from "../../api/api";

const Item = ({ userID, userType, messageSetter }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [item, setItem] = useState({});
  const [newVal, setNewVal] = useState({
    itemPrice: null,
    itemQty: null,
    itemName: null,
    itemDesp: null,
    itemThreshold: null,
  });
  const history = useHistory();
  const [image, setImage] = useState(null);
  const [itemBasketQty, setItemBasketQty] = useState(0);
  const { itemDetID } = useParams();
  const getCache = require("localstorage-ttl");

  //A method to deactivate an item so users cannot see it on the website
  const deactItem = (itemDetID) => {
    const column = "itemThreshold";
    const change = 0;
    const newData = {
      column,
      itemDetID,
      change,
    };
    //An api to edit the item
    editItemAPI_Func(newData).then((response) => {
      if (response.data.error) {
        messageSetter(response.data.error, "danger", true);
        return;
      }
      authChecker(history, response, false);
      setIsLoading(true);
    });
  };

  //update the item based on the table column and the new value and itemDetID
  const updateItem = (itemDetID, edColumn, change) => {
    if (
      (change != "" && newVal.itemPrice) ||
      newVal.itemQty ||
      newVal.itemName ||
      newVal.itemDesp ||
      newVal.itemThreshold
    ) {
      const column = edColumn;
      const newData = {
        column,
        itemDetID,
        change,
      };
      //API that edits the attributes of the item
      editItemAPI_Func(newData).then((response) => {
        if (response.data.error) {
          messageSetter(response.data.error, "danger", true);
          return;
        }
        authChecker(history, response, false);
        setImage("");
        setNewVal({
          itemPrice: "",
          itemQty: "",
          itemName: "",
          itemDesp: "",
          itemThreshold: "",
        });

        setIsLoading(true);
      });
    } else {
      messageSetter("No Value inserted", "danger", true);
    }
  };

  //function to modify the product image
  const updateImage = async (itemDetID) => {
    if (image != null) {
      //API that deletes the current product image
      await delImageAPI_Func(itemDetID).then((response) => {
        if (response.data.error) {
          messageSetter(response.data.error, "danger", true);
          return;
        }
        authChecker(history, response, false);
        //create a new FormData for storing the new image
        const fd = new FormData();
        //append the new image to the fd
        fd.append("image", image);
        uploadImageAPIFunc(fd).then((response) => {
          if (response.data.error) {
            messageSetter(response.data.error, "danger", true);
          }
          const itemUrl = host + "/" + response.data.fileName;
          const column = "itemUrl";
          //update the itemUrl after getting the result from uploadImageAPIFunc
          updateItem(itemDetID, column, itemUrl);
        });
      });
    } else {
      messageSetter("No Photo has been selected", "danger", true);
    }
  };

  //handle the case where users add an item to their basket
  const addBasketItem = () => {
    if (itemBasketQty == 0) {
      messageSetter("item QTY cannot be 0", "danger", true);
      return;
    }
    const itemDetID = item.itemDetID;
    const newData = { itemBasketQty, itemDetID, userID };
    //API to add the item
    addBaskItemAPI_Func(newData).then((response) => {
      authChecker(history, response, false);
      if (response.data.error) {
        messageSetter(response.data.error, "danger", true);
        return;
      } else if (response.data.message) {
        messageSetter(response.data.message, "success", true);
      }
    });
  };

  useEffect(() => {
    //fetch the item detail
    getItemDetAPI_Func(itemDetID).then((response) => {
      if (response.data.error) {
        messageSetter(response.data.error, "danger", true);
        return;
      }
      authChecker(history, response, true);
      getCache.set("recentViewItem", response.data.result, []);
      setItem(response.data.result);
      setIsLoading(false);
    });
  }, [isLoading]);

  return (
    <div>
      <Component
        newVal={newVal}
        setNewVal={setNewVal}
        item={item}
        userType={userType}
        setImage={setImage}
        updateImage={updateImage}
        updateItem={updateItem}
        itemBasketQty={itemBasketQty}
        setItemBasketQty={setItemBasketQty}
        addBasketItem={addBasketItem}
        deactItem={deactItem}
        messageSetter={messageSetter}
      />
    </div>
  );
};
export default Item;
