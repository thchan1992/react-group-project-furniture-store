import React, { useEffect, useState } from "react";
import Component from "./supplierOrd_component/supplierOrd";
import { showOrdHistoryAPI_Func, updateStockAPI_Func } from "../../api/api";
import { useHistory } from "react-router-dom";
import { authChecker } from "../../utility/authChecker";

const SuppOrderList = () => {
  const [orderList, setOrderList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dateTo, setDateTo] = useState("-");
  const [dateFrom, setDateFrom] = useState("-");
  const history = useHistory();
  const fetchOrder = () => {
    showOrdHistoryAPI_Func(dateTo, dateFrom).then((response) => {
      authChecker(history, response, true);
      console.log(response);
      setOrderList(response.data.result);
    });
  };

  useEffect(() => {
    fetchOrder();
    setIsLoading(false);
  }, [isLoading]);

  return (
    <Component
      orderList={orderList}
      dateTo={dateTo}
      setDateTo={setDateTo}
      dateFrom={dateFrom}
      setDateFrom={setDateFrom}
      setIsLoading={setIsLoading}
    />
  );
};

export default SuppOrderList;
