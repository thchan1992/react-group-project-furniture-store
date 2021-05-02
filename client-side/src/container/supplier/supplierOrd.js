import React, { useEffect, useState } from "react";
import SuppOrder from "./component/supplierOrd";
import { showOrdHistoryAPI_Func, updateStockAPI_Func } from "../../frame/API";
import { useHistory } from "react-router-dom";

const SuppOrderList = ({ userType }) => {
  const [orderList, setOrderList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dateTo, setDateTo] = useState("-");
  const [dateFrom, setDateFrom] = useState("-");
  const history = useHistory();
  const fetchOrder = () => {
    showOrdHistoryAPI_Func(dateTo, dateFrom).then((response) => {
      if (!response.data.result || response.data.auth == false) {
        history.push("/error");
        window.location.reload(false);
      }
      console.log();
      setOrderList(response.data.result);
    });
  };

  useEffect(() => {
    fetchOrder();
    setIsLoading(false);
  }, [isLoading]);

  return (
    <SuppOrder
      userType={userType}
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
