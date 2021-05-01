import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import AddBaskItem_Comp from "./component/addBaskItem";
import { addBaskItemAPI_Func } from "../../frame/API";

const ShowItem = ({ userType, userID, itemDetID, messageSetter }) => {
  const history = useHistory();
  const [itemBasketQty, setItemBasketQty] = useState(0);

  const addBasketItem = (itemDetID) => {
    if (itemBasketQty <= 0) {
      messageSetter("item quanty cannot be 0", "danger", true);
      return;
    }
    const newData = { itemBasketQty, itemDetID, userID };
    addBaskItemAPI_Func(newData).then((response) => {
      messageSetter(response.data.message, "success", true);
    });
  };

  return (
    <AddBaskItem_Comp
      userType={userType}
      itemBasketQty={itemBasketQty}
      setItemBasketQty={setItemBasketQty}
      itemDetID={itemDetID}
      addBasketItem={addBasketItem}
      history={history}
    />
  );
};

export default ShowItem;
