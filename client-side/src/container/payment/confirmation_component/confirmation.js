import React from "react";
import Table from "react-bootstrap/Table";
import ListGroup from "react-bootstrap/ListGroup";
import "./confirmation.css";
import Card from "react-bootstrap/Card";
const Confirmation = ({
  totalCost,
  deliveryDate,
  orderDate,
  orderRef,
  orderList,
}) => {
  return (
    <Card>
      <Card.Header>
        <div className="order-detail-title-style">Order Detail</div>
      </Card.Header>
      <Card.Body>
        <ListGroup>
          <ListGroup.Item>
            <span className="order-attribute-text-style">
              Order Detail - Ref:
            </span>
            <br />
            <span className="order-attribute-detail-text-style">
              {orderRef}
            </span>
          </ListGroup.Item>
          <ListGroup.Item>
            <span className="order-attribute-text-style">Order Cost:</span>{" "}
            <br />
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
        <Card>
          <Card.Body>
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
          </Card.Body>
        </Card>
      </Card.Body>
      <Card.Footer></Card.Footer>
    </Card>
  );
};

export default Confirmation;
