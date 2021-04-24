import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Textbox from "../../Utility/Textbox";
import ListGroup from "react-bootstrap/ListGroup";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { useHistory } from "react-router-dom";

const ShowItemComp = ({
  data,
  userType,
  setImage,
  updateImage,
  itemPrice,
  setItemPrice,
  setEdColumn,
  setChange,
  updateItem,
  edColumn,
  change,
  itemDesp,
  setItemDesp,
  itemQty,
  setItemQty,
  itemThreshold,
  setItemThreshold,
  itemBasketQty,
  setItemBasketQty,
  addBasketItem,
}) => {
  const history = useHistory();
  console.log("comp", data.itemPrice);
  return (
    <div>
      <Col
        className="block-example border border-dark"
        xs={{ span: 6 }}
        sm={{ span: 4 }}
        md={{ span: 3 }}
        lg={{ span: 2 }}
        xl={{ span: 2 }}
      >
        {" "}
        <ul>
          <img src={data.itemUrl} width="100%" height="100%" />
        </ul>
        <ul>
          {userType == "A" && (
            <div>
              {data.itemDetID}{" "}
              <Form.Group>
                <Form.Control
                  type="file"
                  name="image"
                  onChange={(e) => setImage(e.target.files[0])}
                  accept="jpg png"
                />
              </Form.Group>
              <Button
                size="sm"
                variant="info"
                onClick={() => {
                  updateImage(data.itemDetID);
                }}
              >
                Upload
              </Button>
            </div>
          )}
        </ul>
        <ul>Price : £ {data.itemPrice} </ul>
        <ul>
          {userType == "A" && (
            <div>
              {" "}
              <Form.Control
                style={{ height: "30px", width: "150px" }}
                type="number"
                placeholder="Edit Price"
                name="itemPrice"
                id="itemPrice"
                value={itemPrice}
                onChange={(e) => {
                  setItemPrice(e.target.value);
                  setEdColumn(e.target.name);
                  setChange(e.target.value);
                }}
              />
              <Button
                size="sm"
                variant="info"
                onClick={() => {
                  updateItem(data.itemDetID, edColumn, change);
                }}
              >
                Update
              </Button>
            </div>
          )}
        </ul>
        <ul>Product Description : {data.itemDesp}</ul>
        <ul>
          {userType == "A" && (
            <div>
              {" "}
              <Form.Control
                style={{ height: "30px", width: "150px" }}
                type="text"
                placeholder="Edit Description"
                name="itemDesp"
                id="itemDesp"
                value={itemDesp}
                onChange={(e) => {
                  setItemDesp(e.target.value);
                  setEdColumn(e.target.name);
                  setChange(e.target.value);
                }}
              />
              <Button
                size="sm"
                variant="info"
                onClick={() => {
                  updateItem(data.itemDetID, edColumn, change);
                }}
              >
                Update
              </Button>
            </div>
          )}
        </ul>
        {userType == "A" && <ul>Quantity : {data.itemQty}</ul>}
        <ul>
          {userType == "A" && (
            <div>
              {" "}
              <Form.Control
                style={{ height: "30px", width: "150px" }}
                type="number"
                placeholder="Edit Quantity"
                name="itemQty"
                id="itemQty"
                value={itemQty}
                onChange={(e) => {
                  setItemQty(e.target.value);
                  setEdColumn(e.target.name);
                  setChange(e.target.value);
                }}
              />
              <Button
                size="sm"
                variant="info"
                onClick={() => {
                  updateItem(data.itemDetID, edColumn, change);
                }}
              >
                Update
              </Button>
            </div>
          )}
        </ul>
        {userType == "A" && <ul>Threshold : {data.itemThreshold}</ul>}
        <ul>
          {userType == "A" && (
            <div>
              {" "}
              <Form.Control
                style={{ height: "30px", width: "150px" }}
                type="number"
                name="itemThreshold"
                placeholder="Edit Threshold"
                id="itemThreshold"
                value={itemThreshold}
                onChange={(e) => {
                  setItemThreshold(e.target.value);
                  setEdColumn(e.target.name);
                  setChange(e.target.value);
                }}
              />
              <Button
                size="sm"
                variant="danger"
                onClick={() => setItemThreshold(0)}
              >
                DELETE ITEM
              </Button>
              <Button
                size="sm"
                variant="info"
                onClick={() => {
                  updateItem(data.itemDetID, edColumn, change);
                }}
              >
                Update
              </Button>
            </div>
          )}
        </ul>
        {userType == "A" && (
          <ul>
            Category ID : {data.itemCatID} | {data.itemCatName}
          </ul>
        )}
        {userType == "A" && (
          <ul>
            Supplier Name : {data.suppID}|{data.suppName}
          </ul>
        )}
        {userType != "A" && (
          <div>
            {" "}
            <Form.Control
              style={{ height: "30px", width: "150px" }}
              type="number"
              name="itemBasketQty"
              placeholder="item qty"
              id="itemBasketQty"
              value={itemBasketQty}
              onChange={(e) => {
                setItemBasketQty(e.target.value);
              }}
            />
            <Button
              onClick={() => {
                if (userType == "C") {
                  addBasketItem();
                } else {
                  history.push("/SignUp/");
                }
              }}
            >
              Add to basket
            </Button>
          </div>
        )}
      </Col>
    </div>
  );
};

export default ShowItemComp;
