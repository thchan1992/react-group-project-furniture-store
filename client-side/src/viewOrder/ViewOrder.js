import axios from "axios";
import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";

const ViewOrder = ({ userID }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [orderList, setOrderList] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/account/userOrder/" + userID)
      .then((response) => {
        setOrderList(response.data.result);
      });
  }, [isLoading]);
  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Cost</th>
            <th>Delivery Date</th>
            <th>Order Date</th>
          </tr>
        </thead>
        {orderList.map((data) => (
          <tbody>
            <tr key={data.basketItemID}>
              <td>{data.basketItemID}</td>
              <td>£{data.totalCost}</td>
              <td>{data.deliveryDate}</td>
              <td>{data.orderDate}</td>
            </tr>
          </tbody>
        ))}
      </Table>
    </div>
  );
};

export default ViewOrder;
