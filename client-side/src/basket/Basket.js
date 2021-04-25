import { useHistory, Route } from "react-router-dom";
import React, { useEffect, useState } from "react";
import BasketList from "./component/BasketList";
import { fetchBasketAPI_Func, totalCostAPI_Func } from "../Utility/API";

const Basket = ({ userID }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [basketList, setBasketList] = useState([]);
  const [totalCost, setTotalCost] = useState(0);
  const [isReadyPay, setIsReadyPay] = useState(false);
  const history = useHistory();

  //load the basket
  useEffect(() => {
    fetchBasketAPI_Func(userID).then((response) => {
      console.log(response.data);
      setBasketList(response.data.result);
      var isReady = true;
      for (var i = 0; i < basketList.length; i++) {
        if (basketList[i].status != "Available") {
          isReady = false;
          break;
        }
      }
      setIsReadyPay(isReady);
      totalCostAPI_Func(userID).then((response) => {
        if (!response.data.result) {
          setTotalCost(0);
        } else {
          setTotalCost(response.data.result.totalCost);
        }

        setIsLoading(false);
      });
    });
  }, [isLoading]);

  return (
    <BasketList
      basketList={basketList}
      userID={userID}
      setIsLoading={setIsLoading}
      totalCost={totalCost}
      isReadyPay={isReadyPay}
      history={history}
    />
  );
};

export default Basket;
