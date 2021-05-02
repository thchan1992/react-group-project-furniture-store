import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import ListGroup from "react-bootstrap/ListGroup";
import "./confirmation.css";
const OrderDet = ({
  totalCost,
  deliveryDate,
  orderDate,
  orderRef,
  orderList,
}) => {
  return (
    <div>
      <ListGroup>
        <ListGroup.Item>
          <span className="order-attribute-text-style">
            Order Detail - Ref:
          </span>
          <br />
          <span className="order-attribute-detail-text-style">{orderRef}</span>
        </ListGroup.Item>
        <ListGroup.Item>
          <span className="order-attribute-text-style">Order Cost:</span> <br />
          <span className="order-attribute-detail-text-style">
            £{totalCost}
          </span>
        </ListGroup.Item>
        <ListGroup.Item>
          <span className="order-attribute-text-style">Delivery Date:</span>{" "}
          <br />
          <span className="order-attribute-detail-text-style">
            {" "}
            {deliveryDate}
          </span>
        </ListGroup.Item>
        <ListGroup.Item>
          <span className="order-attribute-text-style">
            Delivery Order Date:
          </span>{" "}
          <br />
          <span className="order-attribute-detail-text-style">
            {" "}
            {orderDate}
          </span>
        </ListGroup.Item>
      </ListGroup>

      <Table striped bordered hover variant="dark">
        <thead>
          <tr className="order-column-text-style">
            <th>item name</th>
            <th>price</th>
            <th>Qty</th>
          </tr>
        </thead>
        {orderList.map((data) => (
          <tbody>
            <tr key={data.itemDetID} className="order-detail-text-style">
              <td>
                <img src={data.itemUrl} className="photo" /> <br />{" "}
                {data.itemName}
              </td>
              <td>£{data.itemPrice}</td>
              <td>{data.itemBasketQty}</td>
            </tr>
          </tbody>
        ))}
      </Table>
    </div>
  );
};

export default OrderDet;
