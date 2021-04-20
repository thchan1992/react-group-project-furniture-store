import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import React, { useEffect, useState } from "react";
import { showItemsAPI, showSearchAPI, showSuppAPI, showSalesSummaryAPI} from "../Constants";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { defaults,Bar } from 'react-chartjs-2';
import Table from "react-bootstrap/Table";

const SalesSummary = ({ userType,keyword}) => {
 
  const [salesList, setSalesList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dateTo, setDateTo] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  defaults.global.tooltips.enabled = false;
  defaults.global.legend.position = 'bottom';
  var labels = salesList.map(function(e){return JSON.stringify(e.orderDate);});
  var values =salesList.map(function(e){return JSON.stringify(e.sales);});
 
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
      axios
        .get(showSalesSummaryAPI+ "/" +dateFrom+ "/" +dateTo )
        .then((response) => {
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
    <div>
       
     <h1>Sales Summary Report</h1>{" "}
      <Form.Control
                    style={{ height: "30px", width: "150px" }}
                    type="text"
                    placeholder="From:"
                    name="dateFrom"
                    id="dateFrom"
                    value={dateFrom}
                    onChange={(e) => {
                     
                      setDateFrom(e.target.value);
                    }}
                  />
    <Form.Control
                    style={{ height: "30px", width: "150px" }}
                    type="text"
                    placeholder="To:"
                    name="dateTo"
                    id="dateTo"
                    value={dateTo}
                    onChange={(e) => {
                     
                      setDateTo(e.target.value);
                    }}
                  />
                  <Button
                    size="sm"
                    variant="info"
                    onClick={() => {fetchSales();
                    }}
                  >
                    OrderDate
                  </Button>
      {userType == "A" && (
        <Table striped bordered hover>
          <thead>
            <tr>
             
              <th>Total Sales in pounds</th>
             
              <th>Order Date</th>
             
            </tr>
          </thead>

          {salesList.map((data) => (
            <tbody key={data.ID}>
              <tr>
               
                <td className="text-style-item-upperCase">{data.sales}</td>
               
                <td className="text-style-item">{data.orderDate}</td>
               
              </tr>
            </tbody>
          ))}
        </Table>

      )}
      <Bar
  data={barData}
  height={275}
  options={{
    maintainAspectRatio: false,
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  }}
/>;
     
     
    </div>
  );
};

export default SalesSummary;