import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import ShowItemComp from "./component/ShowItemComp";
import { host, editItemAPI, delImageAPI, uploadImageAPI } from "../Constants";
import { addBaskItemAPI_Func } from "../Utility/API";
import Message from "../Utility/Message";
const ShowItem = ({ userID, userType }) => {
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

  const updateItem = (itemDetID, edColumn, change) => {
    if (change != "") {
      const column = edColumn;
      const newData = {
        column,
        itemDetID,
        change,
      };
      //API that edits the attributes.
      axios
        .put(editItemAPI, newData, {
          headers: {
            "x-access-token": localStorage.getItem("token"),
          },
        })
        .then((response) => {
          messageSetter(response.data.message, "success");
          setItemName("");
          setItemCatID("");
          setImage(null);
          setItemDesp("");
          setItemThreshold("");
          setChange("");
          setIsLoading(true);
        });
    } else {
      messageSetter("No Value inserted", "danger");
    }
  };

  //function to modify the product image
  const updateImage = async (itemDetID) => {
    //API that deletes the current product image
    await axios
      .delete(delImageAPI + itemDetID, {
        headers: {
          "Content-Type": "multipart/form-data",
          "x-access-token": localStorage.getItem("token"),
        },
      })
      .then((response) => {
        //create a new FormData for storing the new image
        const fd = new FormData();
        //append the new image to the fd
        fd.append("image", image);
        axios
          .post(uploadImageAPI, fd, {
            headers: {
              "Content-Type": "multipart/form-data",
              "x-access-token": localStorage.getItem("token"),
            },
          })
          .then((response) => {
            const itemUrl = host + "/" + response.data.fileName;
            const column = "itemUrl";
            updateItem(itemDetID, column, itemUrl);
          });
      });
  };

  const addBasketItem = () => {
    if (itemBasketQty == 0) {
      messageSetter("item quanty cannot be 0", "danger");

      return;
    }
    const itemDetID = data.itemDetID;
    const newData = { itemBasketQty, itemDetID, userID };
    addBaskItemAPI_Func(newData).then((response) => {
      console.log(response);
      messageSetter(response.data.message, "success");
    });
  };
  useEffect(() => {
    axios
      .get("http://localhost:8080/itemDetail/" + itemDetID)
      .then((response) => {
        console.log("data", response);
        setItem(response.data.result);
        console.log("datadetail", data);
        setIsLoading(false);
      });
  }, [isLoading]);

  return (
    <div>
      <Message
        messageCont={messageCont}
        showMessage={showMessage}
        setShowMessage={setShowMessage}
      />
      <ShowItemComp
        data={data}
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
      />
    </div>
  );
};
export default ShowItem;
