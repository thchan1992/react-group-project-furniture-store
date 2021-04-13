import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";

const OrderDet = ({
  totalCost,
  deliveryDate,
  orderDate,
  orderRef,
  orderList,
}) => {
  return (
    <div>
      <ul>Total Cost:{totalCost} </ul>
      <ul>Delivery Date: {deliveryDate}</ul>
      <ul>Order Date: {orderDate}</ul>
      <ul>Ref: {orderRef}</ul>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>item name</th>
            <th>price</th>
            <th>Qty</th>
          </tr>
        </thead>
        {orderList.map((data) => (
          <tbody>
            <tr key={data.itemDetID}>
              <td>
                {data.itemName} <img src={data.itemUrl} className="photo" />
              </td>
              <td>{data.itemPrice}</td>
              <td>{data.itemBasketQty}</td>
            </tr>
          </tbody>
        ))}
      </Table>
    </div>
  );
};

export default OrderDet;
