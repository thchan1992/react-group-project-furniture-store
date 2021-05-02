import React from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import "./order.css";

const ViewOrder = ({ orderList, history }) => {
  return (
    <Table striped bordered hover variant="secondary">
      <thead>
        <tr className="order-list-column-text-style">
          <th>Order ID</th>
          <th>Cost</th>
          <th>Delivery Date</th>
          <th>Order Date</th>
          <th>Detail</th>
        </tr>
      </thead>
      {orderList.map((data) => (
        <tbody className="order-list-detail-text-style">
          <tr key={data.basketItemID}>
            <td>{data.basketItemID}</td>
            <td>£{data.totalCost}</td>
            <td>{data.deliveryDate}</td>
            <td>{data.orderDate}</td>
            <td width="150px">
              <Button
                variant="info"
                onClick={() => {
                  history.push("/User/Order/Detail/" + data.basketItemID);
                }}
              >
                Order Detail
              </Button>
            </td>
          </tr>
        </tbody>
      ))}
    </Table>
  );
};

export default ViewOrder;
