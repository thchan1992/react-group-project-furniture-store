import React from "react";
import Table from "react-bootstrap/Table";

const SuppOrder = ({ userType, orderList }) => {
  return (
    <div>
      <h1>Supplier Order</h1>{" "}
      {userType == "A" && (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Supplier Order ID</th>
              <th>Supplier ID</th>
              <th>Item Detail ID</th>
              <th>Item Category ID</th>
              <th>Supplier Order Quantity</th>
              <th>Order Date</th>
              <th>Recieve Date</th>
            </tr>
          </thead>

          {orderList.map((data) => (
            <tbody key={data.suppOrdID}>
              <tr>
                <td className="text-style-item-upperCase">{data.suppOrdID}</td>
                <td className="text-style-item-upperCase">{data.suppID}</td>
                <td className="text-style-item-upperCase">{data.itemDetID}</td>
                <td className="text-style-item-upperCase">{data.itemCatID}</td>
                <td className="text-style-item-upperCase">{data.suppOrdQty}</td>
                <td className="text-style-item">{data.orderDate}</td>
                <td className="text-style-item">{data.ordReceiveDate}</td>
              </tr>
            </tbody>
          ))}
        </Table>
      )}
    </div>
  );
};
export default SuppOrder;
