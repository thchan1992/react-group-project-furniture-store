import React from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Bar } from "react-chartjs-2";
const SalesSumComp = ({
  dateFrom,
  setDateFrom,
  dateTo,
  setDateTo,
  fetchSales,
  userType,
  salesList,
  barData,
}) => {
  return (
    <div>
      <h1>Sales Summary Report</h1>{" "}
      <Form.Control
        style={{ height: "30px", width: "150px" }}
        type="date"
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
        type="date"
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
        onClick={() => {
          fetchSales();
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
      />
      ;
    </div>
  );
};
export default SalesSumComp;
