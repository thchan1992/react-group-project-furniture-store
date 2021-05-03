import React, { useEffect, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import ListGroup from "react-bootstrap/ListGroup";
import Card from "react-bootstrap/Card";
import "./SalesReport.css";

const SalesReComp = ({
  dateFrom,
  setDateFrom,
  dateTo,
  setDateTo,
  fetchSales,
  setColumn,
  setSorting,
  setIsLoading,
  salesList,
  showSort,
  setShowSort,
}) => {
  return (
    <div>
      <Card>
        <ListGroup>
          <Card.Header>
            <ListGroup.Item>
              <div className="sales-reports-title-style">
                Product Sales Report
              </div>
            </ListGroup.Item>
          </Card.Header>{" "}
          <Card.Body>
            <ListGroup.Item>
              <span className="sales-report-date-range-style">Date From:</span>
              <Form.Control
                style={{ height: "30px", width: "200px" }}
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
                style={{ height: "30px", width: "200px" }}
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
              <div className="flex-container">
                <Button
                  size="sm"
                  variant="info"
                  className="sales-report-search-button-style"
                  onClick={() => {
                    fetchSales();
                  }}
                >
                  Search
                </Button>
                <DropdownButton
                  variant="warning"
                  title={
                    <span className="sales-report-search-button-style">
                      {showSort}
                    </span>
                  }
                >
                  <Dropdown.Item
                    eventKey="Date"
                    onClick={() => {
                      setColumn("orderDate");
                      setSorting("ASC");
                      setIsLoading(true);
                      setShowSort("orderDate(A to Z)");
                    }}
                  >
                    orderDate(A to Z)
                  </Dropdown.Item>
                  <Dropdown.Item
                    eventKey="Date"
                    onClick={() => {
                      setColumn("orderDate");
                      setSorting("DESC");
                      setIsLoading(true);
                      setShowSort("orderDate (Z to A)");
                    }}
                  >
                    orderDate (Z to A)
                  </Dropdown.Item>
                  <Dropdown.Item
                    eventKey="Price"
                    onClick={() => {
                      setColumn("itemPrice");
                      setSorting("ASC");
                      setIsLoading(true);
                      setShowSort("Price (Low to High)");
                    }}
                  >
                    Price (Low to High)
                  </Dropdown.Item>
                  <Dropdown.Item
                    eventKey="Price"
                    onClick={() => {
                      setColumn("itemPrice");
                      setSorting("DESC");
                      setIsLoading(true);
                      setShowSort("Price (High to Low)");
                    }}
                  >
                    Price (High to Low)
                  </Dropdown.Item>
                  <Dropdown.Item
                    eventKey="Date"
                    onClick={() => {
                      setColumn("deliveryDate");
                      setSorting("ASC");
                      setIsLoading(true);
                      setShowSort("Delivery Date(early to late)");
                    }}
                  >
                    Delivery Date(early to late)
                  </Dropdown.Item>
                  <Dropdown.Item
                    eventKey="Date"
                    onClick={() => {
                      setColumn("deliveryDate");
                      setSorting("DESC");
                      setIsLoading(true);
                      setShowSort("Delivery Date(late to early)");
                    }}
                  >
                    Delivery Date(late to early)
                  </Dropdown.Item>
                </DropdownButton>
              </div>
            </ListGroup.Item>{" "}
          </Card.Body>
        </ListGroup>

        <Card bg="info">
          <Card.Body>
            <Table variant="dark" striped bordered hover>
              <thead>
                <tr className="sales-report-column-style">
                  <th>User ID</th>
                  <th>Basket Item ID</th>
                  <th>Item Detail ID</th>
                  <th>Item Category ID</th>
                  <th>Item Price</th>
                  <th>Item Basket Quantity</th>
                  <th>Order Date</th>
                  <th>Delivery Date</th>
                  <th>Delivery Address</th>
                </tr>
              </thead>

              {salesList.map((data) => (
                <tbody key={data.ID}>
                  <tr>
                    <td>{data.userID}</td>
                    <td>{data.basketItemID}</td>
                    <td>{data.itemDetID}</td>
                    <td>{data.itemCatID}</td>
                    <td>{data.itemPrice}</td>
                    <td>{data.itemBasketQty}</td>
                    <td className="text-style-item">{data.orderDate}</td>
                    <td className="text-style-item">{data.deliveryDate}</td>
                    <td>{data.delivAddress}</td>
                  </tr>
                </tbody>
              ))}
            </Table>
          </Card.Body>
        </Card>
      </Card>
    </div>
  );
};

export default SalesReComp;
