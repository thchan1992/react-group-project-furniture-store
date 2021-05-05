import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Component from "./component_addBaskItem/addBaskItem";
import { addBaskItemAPI_Func } from "../../api/api";
import { authChecker } from "../../Utility/authChecker";

const AddBaskItem = ({ userType, userID, itemDetID, messageSetter }) => {
  const history = useHistory();
  const [itemBasketQty, setItemBasketQty] = useState(0);

  //handle the case where user add an item to the basket
  const addBasketItem = (itemDetID) => {
    if (itemBasketQty <= 0) {
      messageSetter("item quanty cannot be 0", "danger", true);
      return;
    }
    const newData = { itemBasketQty, itemDetID, userID };

    //api that adds the basket item
    addBaskItemAPI_Func(newData).then((response) => {
      if (response.data.error) {
        messageSetter(response.data.error, "danger", true);
        return;
      }
      authChecker(history, response, false);
      messageSetter(response.data.message, "success", true);
    });
  };

  return (
    <Component
      userType={userType}
      itemBasketQty={itemBasketQty}
      setItemBasketQty={setItemBasketQty}
      itemDetID={itemDetID}
      addBasketItem={addBasketItem}
      history={history}
      messageSetter={messageSetter}
    />
  );
};

export default AddBaskItem;
