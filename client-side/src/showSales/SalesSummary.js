import React, { useEffect, useState } from "react";
import { defaults } from "react-chartjs-2";
import { showSalesSummaryAPI_Func } from "../Utility/API";
import SalesSumComp from "./component/SalesSumComp";

const SalesSummary = ({ userType, keyword }) => {
  const [salesList, setSalesList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dateTo, setDateTo] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  defaults.global.tooltips.enabled = false;
  defaults.global.legend.position = "bottom";
  var labels = salesList.map(function (e) {
    return JSON.stringify(e.orderDate);
  });
  var values = salesList.map(function (e) {
    return JSON.stringify(e.sales);
  });

  //Define the barData to present the daily revenue on bar chart
  const barData = {
    labels: labels,

    datasets: [
      {
        label: "salesAmount",
        borderWidth: 1,
        backgroundColor: "#ffc299",
        borderColor: "#cc5200",
        hoverBackgroundColor: "#ed873e",
        hoverBorderColor: "#e35f00",
        data: values,
      },
    ],
  };

  //Function to fetch the daily revenue within the specified customer order dates
  const fetchSales = () => {
    if (!keyword) {
      showSalesSummaryAPI_Func(dateFrom, dateTo).then((response) => {
        setSalesList(response.data.result);
      });
    }
  };

  //use Effect to fetch Sales list.
  useEffect(() => {
    fetchSales();

    setIsLoading(false);
  }, [isLoading]);

  return (
    <SalesSumComp
      dateFrom={dateFrom}
      setDateFrom={setDateFrom}
      dateTo={dateTo}
      setDateTo={setDateTo}
      fetchSales={fetchSales}
      userType={userType}
      salesList={salesList}
      barData={barData}
    />
  );
};

export default SalesSummary;
