import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import React, { useEffect, useState } from "react";
import Textbox from "../../../frame/Textbox";

const ItemDetForm = ({
  itemName,
  setItemName,
  itemPrice,
  setItemPrice,
  itemThreshold,
  setItemThreshold,
  itemQty,
  setItemQty,
  itemDesp,
  setItemDesp,
  setImage,
}) => {
  return (
    <div>
      <Textbox
        name={"Item Name"}
        attriName={"itemName"}
        attribute={itemName}
        inputType={"text"}
        setter={setItemName}
      />
      <Textbox
        name={"Item Price"}
        attriName={"itemPrice"}
        attribute={itemPrice}
        inputType={"number"}
        setter={setItemPrice}
      />
      <Textbox
        name={"Order Threshold"}
        attriName={"itemThreshold"}
        attribute={itemThreshold}
        inputType={"number"}
        setter={setItemThreshold}
      />
      <Textbox
        name={"Stock Level"}
        attriName={"itemQty"}
        attribute={itemQty}
        inputType={"number"}
        setter={setItemQty}
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
          value={itemDesp}
          onChange={(e) => setItemDesp(e.target.value)}
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
