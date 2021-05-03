import React from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import "./order.css";
import Card from "react-bootstrap/Card";

const ViewOrder = ({ orderList, history }) => {
  return (
    <Card bg="secondary">
      <Card.Header>
        <div className="order-history-title-style">Your Order History</div>
      </Card.Header>
      <Card.Body>
        <Table striped bordered hover variant="light">
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
      </Card.Body>
    </Card>
  );
};

export default ViewOrder;
