import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import React, { useState } from "react";
import "./ShowBaskItem.css";
import { modifyBasketAPI_Func } from "../../Utility/API";

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
    modifyBasketAPI_Func(newData).then((response) => {
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
