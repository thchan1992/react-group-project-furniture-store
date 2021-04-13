import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import "./ShowBaskItem.css";

const ShowBaskItem = ({ data, userID, setIsLoading }) => {
  const [itemBasketQty, setItemBasketQty] = useState(
    Number(data.itemBasketQty)
  );
  const confData = (remove) => {
    if (remove) {
      const itemBasketQty = 0;
      const itemDetID = data.itemDetID;
      const newData = { itemBasketQty, userID, itemDetID };
      editBasket(newData);
    } else {
      const itemDetID = data.itemDetID;

      const newData = { itemBasketQty, userID, itemDetID };
      editBasket(newData);
    }
  };

  const editBasket = (newData) => {
    console.log(newData);
    axios
      .put("http://localhost:8080/basket/editBasket", newData)
      .then((response) => {
        window.alert(response.data.message);
        setIsLoading(true);
      });
  };

  return (
    <tbody>
      <tr>
        <td>
          {data.itemName} <img src={data.itemUrl} className="photo" />
        </td>
        <td>{data.itemPrice}</td>
        <td>{data.status}</td>
        <td>
          {data.itemBasketQty}
          <Form.Control
            style={{ height: "30px", width: "150px" }}
            type="number"
            name="itemBasketQty"
            id="itemBasketQty"
            value={itemBasketQty}
            onChange={(e) => {
              setItemBasketQty(Number(e.target.value));
            }}
          />
          <Button
            onClick={() => {
              confData(false);
            }}
          >
            Edit
          </Button>
          <Button
            onClick={() => {
              confData(true);
            }}
          >
            Remove
          </Button>
        </td>
      </tr>
    </tbody>
  );
};

export default ShowBaskItem;
