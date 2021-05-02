import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import React, { useEffect, useState } from "react";
import Textbox from "../../../frame/Textbox";

const ItemDetForm = ({ setImage, item, setItem }) => {
  return (
    <div>
      <Textbox
        name={"Item Name"}
        attriName={"itemName"}
        attribute={item.itemName}
        inputType={"text"}
        setter={(e) => {
          setItem({ ...item, itemName: e });
        }}
      />
      <Textbox
        name={"Item Price"}
        attriName={"itemPrice"}
        attribute={item.itemPrice}
        inputType={"number"}
        setter={(e) => {
          setItem({ ...item, itemPrice: e });
        }}
      />
      <Textbox
        name={"Order Threshold"}
        attriName={"itemThreshold"}
        attribute={item.itemThreshold}
        inputType={"number"}
        setter={(e) => {
          setItem({ ...item, itemThreshold: e });
        }}
      />
      <Textbox
        name={"Stock Level"}
        attriName={"itemQty"}
        attribute={item.itemQty}
        inputType={"number"}
        setter={(e) => {
          setItem({ ...item, itemQty: e });
        }}
      />
      <Form.Group>
        <span className="user-attribute-text-style">Item Description</span>
        <Form.Control
          className="user-detail-update-text-style"
          as="textarea"
          rows={3}
          style={{ width: "200px" }}
          type="text"
          name="itemDesp"
          id="itemDesp"
          value={item.itemDesp}
          onChange={(e) => {
            setItem({ ...item, itemDesp: e.target.value });
          }}
        />
      </Form.Group>
      <Form.Group>
        <span className="user-attribute-text-style">Product Image</span>
        <Form.Control
          className="user-detail-update-text-style"
          type="file"
          name="image"
          onChange={(e) => setImage(e.target.files[0])}
          accept="jpg png"
        />
      </Form.Group>
    </div>
  );
};

export default ItemDetForm;
