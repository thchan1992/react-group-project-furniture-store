import { useHistory, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import BasketList from "./component/basket";
import { fetchBasketAPI_Func, totalCostAPI_Func } from "../../frame/API";

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
      if (!response.data.result || response.data.auth == false) {
        history.push("/error");
        window.location.reload(false);
      }
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
