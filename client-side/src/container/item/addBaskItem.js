import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Component from "./component_addBaskItem/addBaskItem";
import { addBaskItemAPI_Func } from "../../api/api";
import { authChecker } from "../../utility/authChecker";

const AddBaskItem = ({ userType, userID, itemDetID, messageSetter }) => {
  const history = useHistory();
  const [itemBasketQty, setItemBasketQty] = useState(0);

  const addBasketItem = (itemDetID) => {
    if (itemBasketQty <= 0) {
      messageSetter("item quanty cannot be 0", "danger", true);
      return;
    }
    const newData = { itemBasketQty, itemDetID, userID };

    addBaskItemAPI_Func(newData).then((response) => {
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
