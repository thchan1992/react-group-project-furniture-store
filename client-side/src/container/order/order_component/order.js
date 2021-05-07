import React from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import "./order.css";
import Card from "react-bootstrap/Card";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import ListGroup from "react-bootstrap/ListGroup";

const Order = ({
  orderList,
  history,
  setSorting,
  setShowSort,
  setIsLoading,
  showSort,
}) => {
  return (
    <Card bg="secondary">
      <Card.Header>
        <div className="order-history-title-style">Your Order History</div>
      </Card.Header>
      <Card.Body>
        <ListGroup.Item>
          <DropdownButton
            size="sm"
            variant="dark"
            title={
              <span className="sales-report-search-button-style">
                {showSort}
              </span>
            }
          >
            {" "}
            <Dropdown.Item
              className="sales-report-search-button-style"
              eventKey="Date"
              onClick={() => {
                setSorting("DESC");
                setIsLoading(true);
                setShowSort("Most recent Order");
              }}
            >
              Most recent Order
            </Dropdown.Item>
            <Dropdown.Item
              className="sales-report-search-button-style"
              eventKey="Date"
              onClick={() => {
                setSorting("ASC");
                setIsLoading(true);
                setShowSort("Least recent Order");
              }}
            >
              Least recent Order
            </Dropdown.Item>
          </DropdownButton>
        </ListGroup.Item>
        <ListGroup.Item>
          <Table striped bordered hover variant="light">
            <thead>
              <tr className="order-list-column-text-style">
                <th>Order ID</th>

                <th>Cost</th>
                <th>Delivery Date</th>
                <th>
                  <div className="flex-container">Order Date</div>
                </th>
              </tr>
            </thead>
            {orderList.map((data) => (
              <tbody className="order-list-detail-text-style">
                <tr key={data.basketItemID}>
                  <td width="250px">
                    {data.basketItemID}{" "}
                    <Button
                      variant="info"
                      onClick={() => {
                        history.push("/User/Order/Detail/" + data.basketItemID);
                      }}
                    >
                      Order Detail
                    </Button>
                  </td>

                  <td>£{data.totalCost}</td>
                  <td>{data.deliveryDate}</td>
                  <td>{data.orderDate}</td>
                </tr>
              </tbody>
            ))}
          </Table>
        </ListGroup.Item>
      </Card.Body>
    </Card>
  );
};

export default Order;
