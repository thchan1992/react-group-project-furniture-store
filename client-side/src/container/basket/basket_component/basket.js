import Button from "react-bootstrap/Button";
import React from "react";
import Table from "react-bootstrap/Table";
import BaskItem from "./baskItem";
import "./basket.css";
import Card from "react-bootstrap/Card";

const Basket = ({
  basketList,
  userID,
  setIsLoading,
  totalCost,
  isReadyPay,
  history,
  messageSetter,
}) => {
  return (
    <Card>
      <Card.Header>
        <div className="basket-title-style">Basket</div>
      </Card.Header>
      <Card.Body>
        <Table striped bordered hover variant="secondary">
          <thead>
            <tr>
              <th className="basket-column-text-style">Product</th>
              <th className="basket-column-text-style">Price</th>
              <th className="basket-column-text-style">Status</th>
              <th className="basket-column-text-style">Quanity</th>
            </tr>
          </thead>
          {basketList.map((data) => (
            <BaskItem
              data={data}
              userID={userID}
              setIsLoading={setIsLoading}
              key={userID + ":" + data.itemDetID}
              messageSetter={messageSetter}
            />
          ))}
        </Table>
        <span className="basket-column-text-style">Total Cost: </span>{" "}
        <span className="basket-detail-text-style">{totalCost}</span>
        <br />
      </Card.Body>
      <Card.Footer>
        {isReadyPay == true && (
          <Button
            variant="info"
            onClick={() => {
              history.push("/Delivery");
              messageSetter(null, null, false);
            }}
          >
            <span className="edit-basket-button-style">Checkout</span>
          </Button>
        )}{" "}
      </Card.Footer>
    </Card>
  );
};
export default Basket;
