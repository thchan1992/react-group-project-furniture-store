import React, { useEffect, useState } from "react";
import { getUserOrdAPI_Func } from "../../api/api";
import Component from "./order_component/order";
import { useHistory, useParams } from "react-router-dom";
import { authChecker } from "../../Utility/authChecker";
const Order = ({ messageSetter }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [orderList, setOrderList] = useState([]);
  const history = useHistory();
  const [sorting, setSorting] = useState("DESC");
  const { userID } = useParams();
  const [showSort, setShowSort] = useState("Most recent Order");

  useEffect(() => {
    //get user order lists
    getUserOrdAPI_Func(userID, sorting).then((response) => {
      if (response.data.error) {
        messageSetter(response.data.error, "danger", true);
        return;
      }
      authChecker(history, response, true);
      setOrderList(response.data.result);
      setIsLoading(false);
    });
  }, [isLoading]);
  return (
    <Component
      orderList={orderList}
      history={history}
      setSorting={setSorting}
      setShowSort={setShowSort}
      setIsLoading={setIsLoading}
      showSort={showSort}
    />
  );
};

export default Order;
