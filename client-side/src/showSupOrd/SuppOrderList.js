import React, { useEffect, useState } from "react";
import SuppOrder from "./component/SuppOrder";
import { showOrdHistoryAPI_Func, updateStockAPI_Func } from "../Utility/API";

const SuppOrderList = ({ userType }) => {
  const [orderList, setOrderList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchOrder = () => {
    showOrdHistoryAPI_Func().then((response) => {
      setOrderList(response.data.result);
    });
  };

  useEffect(() => {
    fetchOrder();
    setIsLoading(false);
  }, [isLoading]);

  return <SuppOrder userType={userType} orderList={orderList} />;
};

export default SuppOrderList;
