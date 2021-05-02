import React, { useEffect, useState } from "react";
import { defaults } from "react-chartjs-2";
import { showSalesSummaryAPI_Func } from "../../api/api";
import Component from "./salesSummary_component/SalesSummary";
import { useHistory } from "react-router-dom";
import { authChecker } from "../../utility/authChecker";
const SalesSummary = () => {
  const [salesList, setSalesList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dateTo, setDateTo] = useState("-");
  const [dateFrom, setDateFrom] = useState("-");
  const history = useHistory();

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
        backgroundColor: "rgb(119, 189, 89)",
        borderColor: "rgb(119, 189, 89)",
        hoverBackgroundColor: "#ed873e",
        hoverBorderColor: "#e35f00",
        data: values,
      },
    ],
  };

  //Function to fetch the daily revenue within the specified customer order dates
  const fetchSales = () => {
    showSalesSummaryAPI_Func(dateFrom, dateTo).then((response) => {
      authChecker(history, response, true);
      setSalesList(response.data.result);
    });
  };

  //use Effect to fetch Sales list.
  useEffect(() => {
    fetchSales();

    setIsLoading(false);
  }, [isLoading]);

  return (
    <Component
      dateFrom={dateFrom}
      setDateFrom={setDateFrom}
      dateTo={dateTo}
      setDateTo={setDateTo}
      fetchSales={fetchSales}
      salesList={salesList}
      barData={barData}
    />
  );
};

export default SalesSummary;
