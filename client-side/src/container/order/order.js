import React, { useEffect, useState } from "react";
import { getUserOrdAPI_Func } from "../../api/api";
import Component from "./order_component/order";
import { useHistory, useParams } from "react-router-dom";
import { authChecker } from "../../Utility/authChecker";
const Order = ({ messageSetter }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [orderList, setOrderList] = useState([]);
  const history = useHistory();
  const { userID } = useParams();

  useEffect(() => {
    //get user order lists
    getUserOrdAPI_Func(userID).then((response) => {
      if (response.data.error) {
        messageSetter(response.data.error, "danger", true);
        return;
      }
      authChecker(history, response, true);
      setOrderList(response.data.result);
    });
  }, [isLoading]);
  return <Component orderList={orderList} history={history} />;
};

export default Order;
