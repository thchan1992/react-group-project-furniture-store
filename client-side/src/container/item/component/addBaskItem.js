import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import { addBaskItemAPI_Func } from "../../../frame/API";

import "./addBaskItem.css";

const AddBaskItem = ({
  userType,
  itemBasketQty,
  setItemBasketQty,
  itemDetID,
  addBasketItem,
  history,
}) => {
  return (
    <div>
      {userType != "A" && (
        <div>
          {
            <div className="flex-container-bask">
              {" "}
              <Form.Control
                style={{ width: "70px", height: "40px" }}
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
                style={{ height: "40px" }}
                variant="secondary"
                onClick={() => {
                  if (userType == "C") {
                    addBasketItem(itemDetID);
                  } else {
                    history.push("/SignUp/");
                  }
                }}
              >
                <h7 className="add-product-basket-button-style"> ➡️🧺 </h7>
              </Button>
            </div>
          }
        </div>
      )}
    </div>
  );
};

export default AddBaskItem;
