import React, { useEffect, useState } from "react";
import Component from "./salesReport_component/salesReport";
import { showSalesAPI_Func } from "../../api/api";
import { useHistory } from "react-router-dom";
import { authChecker } from "../../utility/authChecker";
const SalesReport = () => {
  const [sorting, setSorting] = useState("ASC");
  const [column, setColumn] = useState("orderDate");
  const [salesList, setSalesList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [dateTo, setDateTo] = useState("-");
  const [dateFrom, setDateFrom] = useState("-");
  const [showSort, setShowSort] = useState("orderDate(A to Z)");
  const history = useHistory();
  //Function to fetch the sorted items
  const fetchSales = () => {
    showSalesAPI_Func(sorting, column, dateFrom, dateTo).then((response) => {
      authChecker(history, response, true);
      setSalesList(response.data.result);
    });
  };

  //use Effect to fetch item list.
  useEffect(() => {
    fetchSales();
    setIsLoading(false);
  }, [isLoading]);

  //Sorting Item by Name (A to Z), Name(Z to A), Price(low to high), Price(high to low).
  //Admin can update any Item's Name, Price, Description, Quantity, Threshold and Image.
  return (
    <Component
      dateFrom={dateFrom}
      setDateFrom={setDateFrom}
      dateTo={dateTo}
      setDateTo={setDateTo}
      fetchSales={fetchSales}
      setColumn={setColumn}
      setSorting={setSorting}
      setIsLoading={setIsLoading}
      salesList={salesList}
      showSort={showSort}
      setShowSort={setShowSort}
    />
  );
};

export default SalesReport;
