import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Component from "./component_item/item";
import { host } from "../../api/url";
import { addBaskItemAPI_Func } from "../../api/api";
import { authChecker } from "../../utility/authChecker";
import { useHistory } from "react-router-dom";

import {
  editItemAPI_Func,
  delImageAPI_Func,
  uploadImageAPIFunc,
  getItemDetAPI_Func,
} from "../../api/api";

const ShowItem = ({ userID, userType, messageSetter }) => {
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

  //
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
        setImage(null);
        setNewVal({
          itemPrice: null,
          itemQty: null,
          itemName: null,
          itemDesp: null,
          itemThreshold: null,
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
    } else {
      messageSetter("No Photo has been selected", "danger", true);
    }
  };

  const addBasketItem = () => {
    if (itemBasketQty == 0) {
      messageSetter("item quanty cannot be 0", "danger", true);
      return;
    }
    const itemDetID = item.itemDetID;
    const newData = { itemBasketQty, itemDetID, userID };
    addBaskItemAPI_Func(newData).then((response) => {
      authChecker(history, response, false);
      messageSetter(response.data.message, "secondary", true);
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
export default ShowItem;
