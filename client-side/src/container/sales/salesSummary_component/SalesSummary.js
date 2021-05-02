import React from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Bar } from "react-chartjs-2";
import ListGroup from "react-bootstrap/ListGroup";
import Card from "react-bootstrap/Card";
const SalesSumComp = ({
  dateFrom,
  setDateFrom,
  dateTo,
  setDateTo,
  fetchSales,

  salesList,
  barData,
}) => {
  return (
    <div>
      <ListGroup>
        <ListGroup.Item>
          {" "}
          <span className="sales-report-title"> Sales Summary Report</span>
        </ListGroup.Item>

        <ListGroup.Item>
          <span className="sales-report-date-range-style">Date From:</span>
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
        </ListGroup.Item>
        <ListGroup.Item>
          <span className="sales-report-date-range-style">Date To:</span>
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
        </ListGroup.Item>
        <ListGroup.Item>
          {" "}
          <Button
            className="sales-report-search-button-style"
            size="sm"
            variant="info"
            onClick={() => {
              fetchSales();
            }}
          >
            Search
          </Button>
        </ListGroup.Item>
      </ListGroup>
      <Card bg="info">
        <Card.Body>
          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>Total Sales in pounds</th>
                <th>Order Date</th>
              </tr>
            </thead>

            {salesList.map((data) => (
              <tbody key={data.ID}>
                <tr>
                  <td>{data.sales}</td>
                  <td>{data.orderDate}</td>
                </tr>
              </tbody>
            ))}
          </Table>
        </Card.Body>
      </Card>
      <div>
        {" "}
        <Bar
          data={barData}
          height={300}
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
      </div>
      ;
    </div>
  );
};
export default SalesSumComp;
