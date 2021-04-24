import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import AddBaskItem from "./AddBaskItem";
import { addBaskItemAPI_Func } from "../../Utility/API";
import { useHistory } from "react-router-dom";

const ProductList = ({ itemList, userID, userType, setIsLoading }) => {
  const history = useHistory();

  return (
    <Row gutter={40}>
      {itemList.map((data) => (
        <Col
          className="block-example border border-dark"
          xs={{ span: 6 }}
          sm={{ span: 4 }}
          md={{ span: 3 }}
          lg={{ span: 2 }}
          xl={{ span: 2 }}
        >
          <div key={data.itemDetID}>
            <ul>
              <img src={data.itemUrl} width="100%" />
            </ul>
            <ul>
              <h5>{data.itemName}</h5>
            </ul>{" "}
            <ul>Price : £ {data.itemPrice} </ul>{" "}
            <ul>Product Description : {data.itemDesp}</ul>{" "}
            {userType == "A" && <ul>Quantity : {data.itemQty}</ul>}{" "}
            {userType == "A" && <ul>Threshold : {data.itemThreshold}</ul>}{" "}
            {userType == "A" && (
              <ul>
                Category ID : {data.itemCatID} | {data.itemCatName}
              </ul>
            )}{" "}
            {userType == "A" && (
              <ul>
                Supplier Name : {data.suppID}|{data.suppName}
              </ul>
            )}
          </div>{" "}
          <AddBaskItem
            userType={userType}
            userID={userID}
            itemDetID={data.itemDetID}
          />
          <Button
            onClick={() => {
              history.push("/Item_detail/" + data.itemDetID);
            }}
          >
            Detail
          </Button>
        </Col>
      ))}
    </Row>
  );
};
export default ProductList;
