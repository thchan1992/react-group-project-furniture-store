import Button from "react-bootstrap/Button";
import { useHistory, Route } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import ShowBaskItem from "./ShowBaskItem";

const BasketList = ({
  basketList,
  userID,
  setIsLoading,
  totalCost,
  isReadyPay,
  history,
}) => {
  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Price</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        {basketList.map((data) => (
          <ShowBaskItem
            data={data}
            userID={userID}
            setIsLoading={setIsLoading}
            key={userID + ":" + data.itemDetID}
          />
        ))}
      </Table>
      Total Cost: {totalCost}
      <p></p>
      {isReadyPay == true && (
        <Button onClick={() => history.push("/Basket/Payment")}>
          Checkout
        </Button>
      )}{" "}
    </div>
  );
};
export default BasketList;
