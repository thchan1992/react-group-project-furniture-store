import React, { useEffect, useState } from "react";
import Component from "./supplierOrd_component/supplierOrd";
import { showOrdHistoryAPI_Func, updateStockAPI_Func } from "../../api/api";
import { useHistory } from "react-router-dom";
import { authChecker } from "../../Utility/authChecker";

const SupplierOrd = () => {
  const [orderList, setOrderList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dateTo, setDateTo] = useState("-");
  const [dateFrom, setDateFrom] = useState("-");
  const history = useHistory();
  const [sorting, setSorting] = useState("DESC");
  const [showSort, setShowSort] = useState("Order Date (Latest)");
  const fetchOrder = () => {
    console.log(dateTo, dateFrom, sorting);
    showOrdHistoryAPI_Func(dateTo, dateFrom, sorting).then((response) => {
      console.log(response.data.result);
      if (response.data.error) {
        window.alert(response.data.error);
        return;
      }
      authChecker(history, response, true);

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
      showSort={showSort}
      setSorting={setSorting}
      setShowSort={setShowSort}
    />
  );
};

export default SupplierOrd;
