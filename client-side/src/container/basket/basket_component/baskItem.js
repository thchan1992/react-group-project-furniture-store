import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { modifyBasketAPI_Func } from "../../../api/api";

import { authChecker } from "../../../Utility/authChecker";

const BaskItem = ({ data, userID, setIsLoading, messageSetter }) => {
  const history = useHistory();
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
      if (response.data.error) {
        messageSetter(response.data.error, "danger", true);
        return;
      }
      authChecker(history, response, false);
      setIsLoading(true);
      messageSetter("Basket has been updated", "success", true);
    });
  };

  return (
    <tbody>
      <tr>
        <td>
          <img src={data.itemUrl} className="photo" />
          <br />
          <span className="basket-item-name-detail-text-style">
            {data.itemName}
          </span>
        </td>
        <td>
          <span className="basket-detail-text-style">{data.itemPrice}</span>
        </td>
        <td>
          {" "}
          <span className="basket-detail-text-style"> {data.status}</span>
        </td>
        <td width="150px">
          <span className="basket-detail-text-style">{data.itemBasketQty}</span>
          <Form.Control
            style={{ height: "30px", width: "150px" }}
            className="basket-detail-text-style"
            type="number"
            name="itemBasketQty"
            id="itemBasketQty"
            value={itemBasketQty}
            onChange={(e) => {
              setItemBasketQty(Number(e.target.value));
            }}
          />
          <Button
            className="edit-basket-button-style"
            variant="info"
            onClick={() => {
              confData(false);
              messageSetter(null, null, false);
            }}
          >
            Edit
          </Button>
          <Button
            className="remove-basket-item-button-style"
            variant="danger"
            onClick={() => {
              confData(true);
              messageSetter(null, null, false);
            }}
          >
            Remove
          </Button>
        </td>
      </tr>
    </tbody>
  );
};

export default BaskItem;
