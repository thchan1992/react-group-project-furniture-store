import React, { useEffect, useState } from "react";
import { defaults } from "react-chartjs-2";
import { showSalesSummaryAPI_Func } from "../../api/api";
import Component from "./salesSummary_component/salesSummary";
import { useHistory } from "react-router-dom";
import { authChecker } from "../../Utility/authChecker";
const SalesSummary = ({ messageSetter }) => {
  const [salesList, setSalesList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dateTo, setDateTo] = useState("-");
  const [dateFrom, setDateFrom] = useState("-");
  const history = useHistory();

  defaults.global.tooltips.enabled = false;
  defaults.global.legend.position = "bottom";
  defaults.global.defaultFontColor = "rgb(255,255,255)";

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
        scaleFontColor: "f00",
        label: "Sales Amount",
        borderWidth: 3,
        backgroundColor: "rgb(119, 189, 89)",
        borderColor: "rgb(255,255,255)",
        hoverBackgroundColor: "rgb(119, 189, 89)",
        hoverBorderColor: "rgb(119, 189, 89)",
        data: values,
      },
    ],
  };

  //Function to fetch the daily revenue within the specified customer order dates
  const fetchSales = () => {
    showSalesSummaryAPI_Func(dateFrom, dateTo).then((response) => {
      if (response.data.error) {
        messageSetter(response.data.error, "danger", true);
        return;
      }
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
