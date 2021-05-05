import { useHistory, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Component from "./basket_component/basket";
import { fetchBasketAPI_Func, totalCostAPI_Func } from "../../api/api";
import { authChecker } from "../../Utility/authChecker";

const Basket = ({ messageSetter }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [basketList, setBasketList] = useState([]);
  const [totalCost, setTotalCost] = useState(0);
  const [isReadyPay, setIsReadyPay] = useState(false);
  const history = useHistory();
  const { userID } = useParams();

  //load the basket
  useEffect(() => {
    fetchBasketAPI_Func(userID).then((response) => {
      if (response.data.error) {
        messageSetter(response.data.error, "danger", true);
        return;
      }
      authChecker(history, response, true);
      setBasketList(response.data.result);
      checkReadyPay(response.data.result.length);
      totalCostAPI_Func(userID).then((response) => {
        if (response.data.error) {
          messageSetter(response.data.error, "danger", true);
          return;
        }

        if (!response.data.result) {
          setTotalCost(0);
        } else {
          setTotalCost(response.data.result.totalCost);
        }
        setIsLoading(false);
      });
    });
  }, [isLoading]);

  const checkReadyPay = (result) => {
    var isReady = true;
    if (result == 0) {
      isReady = false;
    } else {
      for (var i = 0; i < basketList.length; i++) {
        if (basketList[i].status != "Available") {
          isReady = false;
          break;
        }
      }
    }
    setIsReadyPay(isReady);
  };

  return (
    <Component
      messageSetter={messageSetter}
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
