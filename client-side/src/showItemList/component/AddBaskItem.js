import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import { addBaskItemAPI_Func } from "../../Utility/API";
import Message from "../../Utility/Message";

const ShowItem = ({ userType, userID, itemDetID }) => {
  const history = useHistory();
  const [itemBasketQty, setItemBasketQty] = useState(0);
  const [showMessage, setShowMessage] = useState(false);
  const [messageCont, setMessageCont] = useState({
    text: "",
    theme: "",
  });
  const addBasketItem = (itemDetID) => {
    if (itemBasketQty == 0) {
      messageSetter("item quanty cannot be 0", "danger");
      return;
    }
    const newData = { itemBasketQty, itemDetID, userID };
    addBaskItemAPI_Func(newData).then((response) => {
      messageSetter(response.data.message, "success");
    });
  };

  const messageSetter = (text, theme) => {
    setMessageCont({
      text: text,
      theme: theme,
    });
    setShowMessage(true);
  };

  return (
    <div>
      {" "}
      <Message
        messageCont={messageCont}
        showMessage={showMessage}
        setShowMessage={setShowMessage}
      />
      {userType != "A" && (
        <div>
          {
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
                    addBasketItem(itemDetID);
                  } else {
                    history.push("/SignUp/");
                  }
                }}
              >
                Add to basket
              </Button>
            </div>
          }
        </div>
      )}
    </div>
  );
};

export default ShowItem;
