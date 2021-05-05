import React, { useEffect, useState } from "react";
import Component from "./supplierOrd_component/supplierOrd";
import { showOrdHistoryAPI_Func } from "../../api/api";
import { useHistory } from "react-router-dom";
import { authChecker } from "../../Utility/authChecker";

const SupplierOrd = ({ messageSetter }) => {
  const [orderList, setOrderList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dateTo, setDateTo] = useState("-");
  const [dateFrom, setDateFrom] = useState("-");
  const history = useHistory();
  const [sorting, setSorting] = useState("DESC");
  const [showSort, setShowSort] = useState("Order Date (Latest)");

  //a method that fetch order list based on the date range and sorting method
  const fetchOrder = () => {
    //show list of supplier orders
    showOrdHistoryAPI_Func(dateTo, dateFrom, sorting).then((response) => {
      if (response.data.error) {
        messageSetter(response.data.error, "danger", true);
        return;
      }
      authChecker(history, response, true);
      setOrderList(response.data.result);
    });
  };

  //fetch all the order before rendering
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
