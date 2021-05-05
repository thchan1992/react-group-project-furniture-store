import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { getUserOrdAPI_Func } from "../../api/api";
import Component from "./order_component/order";
import { useHistory, useParams } from "react-router-dom";
import { authChecker } from "../../Utility/authChecker";
const Order = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [orderList, setOrderList] = useState([]);
  const history = useHistory();
  const { userID } = useParams();

  useEffect(() => {
    getUserOrdAPI_Func(userID).then((response) => {
      if (response.data.error) {
        window.alert(response.data.error);
        return;
      }
      authChecker(history, response, true);
      setOrderList(response.data.result);
    });
  }, [isLoading]);
  return <Component orderList={orderList} history={history} />;
};

export default Order;
