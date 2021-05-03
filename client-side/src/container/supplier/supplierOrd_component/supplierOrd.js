import React from "react";
import Table from "react-bootstrap/Table";
import ListGroup from "react-bootstrap/ListGroup";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "./supplierOrd.css";

const SuppOrder = ({
  orderList,
  dateTo,
  dateFrom,
  setDateTo,
  setDateFrom,
  setIsLoading,
}) => {
  return (
    <div>
      <Card>
        <ListGroup>
          <Card.Header>
            <ListGroup.Item>
              <div className="supplier-order-title-style">Supplier Order</div>
            </ListGroup.Item>
          </Card.Header>
          <Card.Body>
            <ListGroup.Item>
              <span className="date-range-style"> Date From:</span>
              <Form.Control
                style={{ height: "30px", width: "200px" }}
                type="date"
                className="placeholder-style-search"
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
              <span className="date-range-style"> Date To:</span>

              <Form.Control
                style={{ height: "30px", width: "200px" }}
                className="placeholder-style-search"
                type="date"
                placeholder="To:"
                name="dateTo"
                id="dateTo"
                value={dateTo}
                onChange={(e) => {
                  setDateTo(e.target.value);
                }}
              />
            </ListGroup.Item>{" "}
            <ListGroup.Item>
              {" "}
              <Button
                size="sm"
                variant="info"
                onClick={() => {
                  setIsLoading(true);
                }}
                className="supplier-order-search-button-style"
              >
                Search
              </Button>
            </ListGroup.Item>{" "}
          </Card.Body>
        </ListGroup>{" "}
      </Card>
      <Card>
        <Card.Body>
          <Table variant="dark" striped bordered hover>
            <thead>
              <tr className="supplier-order-column-style">
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
                  <td>{data.suppOrdID}</td>
                  <td>{data.suppID}</td>
                  <td>{data.itemDetID}</td>
                  <td>{data.itemCatID}</td>
                  <td>{data.suppOrdQty}</td>
                  <td>{data.orderDate}</td>
                  <td>{data.ordReceiveDate}</td>
                </tr>
              </tbody>
            ))}
          </Table>
        </Card.Body>
      </Card>
    </div>
  );
};
export default SuppOrder;
