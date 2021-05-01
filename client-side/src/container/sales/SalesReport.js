import React, { useEffect, useState } from "react";
import SalesReComp from "./component/SalesReport";
import { showSalesAPI_Func } from "../../frame/API";
import { useHistory } from "react-router-dom";

const Sales = ({ userType }) => {
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
      if (!response.data.result || response.data.auth == false) {
        history.push("/error");
        window.location.reload(false);
      }
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
    <SalesReComp
      dateFrom={dateFrom}
      setDateFrom={setDateFrom}
      dateTo={dateTo}
      setDateTo={setDateTo}
      fetchSales={fetchSales}
      setColumn={setColumn}
      setSorting={setSorting}
      setIsLoading={setIsLoading}
      userType={userType}
      salesList={salesList}
      showSort={showSort}
      setShowSort={setShowSort}
    />
  );
};

export default Sales;
