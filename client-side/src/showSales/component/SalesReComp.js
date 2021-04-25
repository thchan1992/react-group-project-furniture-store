import React, { useEffect, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";

const SalesReComp = ({
  dateFrom,
  setDateFrom,
  dateTo,
  setDateTo,
  fetchSales,
  setColumn,
  setSorting,
  setIsLoading,
  userType,
  salesList,
}) => {
  return (
    <div>
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
      <DropdownButton variant="warning" title="Sort By">
        <Dropdown.Item
          className="text-style-item-upperCase"
          eventKey="Date"
          onClick={() => {
            setColumn("orderDate");
            setSorting("ASC");
            setIsLoading(true);
          }}
        >
          orderDate(A to Z)
        </Dropdown.Item>
        <Dropdown.Item
          className="text-style-item-upperCase"
          eventKey="Date"
          onClick={() => {
            setColumn("orderDate");
            setSorting("DESC");
            setIsLoading(true);
          }}
        >
          orderDate (Z to A)
        </Dropdown.Item>
        <Dropdown.Item
          className="text-style-item-upperCase"
          eventKey="Price"
          onClick={() => {
            setColumn("itemPrice");
            setSorting("ASC");
            setIsLoading(true);
          }}
        >
          Price (Low to High)
        </Dropdown.Item>
        <Dropdown.Item
          className="text-style-item-upperCase"
          eventKey="Price"
          onClick={() => {
            setColumn("itemPrice");
            setSorting("DESC");
            setIsLoading(true);
          }}
        >
          Price (High to Low)
        </Dropdown.Item>
        <Dropdown.Item
          className="text-style-item-upperCase"
          eventKey="Date"
          onClick={() => {
            setColumn("deliveryDate");
            setSorting("ASC");
            setIsLoading(true);
          }}
        >
          deliveryDate(A to Z)
        </Dropdown.Item>
        <Dropdown.Item
          className="text-style-item-upperCase"
          eventKey="Date"
          onClick={() => {
            setColumn("deliveryDate");
            setSorting("DESC");
            setIsLoading(true);
          }}
        >
          deliveryDate(Z to A)
        </Dropdown.Item>
      </DropdownButton>
      {userType == "A" && (
        <Table striped bordered hover>
          <thead>
            <tr>
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
                <td className="text-style-item-upperCase">{data.userID}</td>
                <td className="text-style-item-upperCase">
                  {data.basketItemID}
                </td>
                <td className="text-style-item-upperCase">{data.itemDetID}</td>
                <td className="text-style-item-upperCase">{data.itemCatID}</td>
                <td className="text-style-item-upperCase">{data.itemPrice}</td>
                <td className="text-style-item-upperCase">
                  {data.itemBasketQty}
                </td>
                <td className="text-style-item">{data.orderDate}</td>
                <td className="text-style-item">{data.deliveryDate}</td>
                <td className="text-style-item-upperCase">
                  {data.delivAddress}
                </td>
              </tr>
            </tbody>
          ))}
        </Table>
      )}
    </div>
  );
};

export default SalesReComp;
