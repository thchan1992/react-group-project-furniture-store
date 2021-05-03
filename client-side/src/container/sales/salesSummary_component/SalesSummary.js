import React from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Bar } from "react-chartjs-2";
import ListGroup from "react-bootstrap/ListGroup";
import Card from "react-bootstrap/Card";
import "./SalesSummary.css";
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
      <Card>
        <ListGroup>
          <Card.Header>
            <ListGroup.Item>
              {" "}
              <div className="sales-summary-title-style">
                {" "}
                Sales Summary Report
              </div>
            </ListGroup.Item>
          </Card.Header>
          <Card.Body>
            <ListGroup.Item>
              <span className="sales-report-date-range-style">Date From:</span>
              <Form.Control
                style={{ width: "200px" }}
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
                style={{ width: "200px" }}
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
          </Card.Body>
        </ListGroup>
      </Card>
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
        <Card bg="dark">
          <Card.Body>
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
          </Card.Body>
        </Card>
      </div>
      ;
    </div>
  );
};
export default SalesSumComp;
