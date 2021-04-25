import React, { useEffect, useState } from "react";
import SalesReComp from "./component/SalesReComp";
import { showSalesAPI_Func } from "../Utility/API";

const Sales = ({ userType, keyword }) => {
  const [sorting, setSorting] = useState("ASC");
  const [column, setColumn] = useState("orderDate");
  const [salesList, setSalesList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dateTo, setDateTo] = useState("");
  const [dateFrom, setDateFrom] = useState("");

  //Function to fetch the sorted items
  const fetchSales = () => {
    if (!keyword) {
      showSalesAPI_Func(sorting, column, dateFrom, dateTo).then((response) => {
        setSalesList(response.data.result);
      });
    }
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
    />
  );
};

export default Sales;
