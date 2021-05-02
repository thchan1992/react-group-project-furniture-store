import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import React, { useState } from "react";
import { modifyCatAPI_Func } from "../../../api/api";
import { useHistory } from "react-router-dom";
import Card from "react-bootstrap/Card";
import { authChecker } from "../../../utility/authChecker";

const EditCat = ({ data, setIsLoading, messageSetter }) => {
  const [itemCatName, setItemCatName] = useState("");
  const [column, setCol] = useState("");
  const [change, setChange] = useState("");
  const history = useHistory();

  const handleSubmit = (itemCatID) => {
    if (column && change) {
      const newData = { column, change, itemCatID };
      modifyCatAPI_Func(newData).then((response) => {
        authChecker(history, response, true);
        messageSetter(response.data.message, "success", true);
        setItemCatName("");
        setCol("");
        setChange("");
        setIsLoading(true);
      });
    } else {
      messageSetter("No data was inserted", "danger", true);
    }
  };

  return (
    <Card.Body>
      <div key={data.itemCatID}>
        <Card.Header>
          <span className="category-text-style">
            {" "}
            {data.itemCatName} - {data.itemCatID}
          </span>
        </Card.Header>
        <Card.Body>
          {" "}
          <Form.Control
            style={{ height: "40px", width: "200px" }}
            type="text"
            name="itemCatName"
            id="itemCatName"
            value={itemCatName}
            onChange={(e) => {
              setItemCatName(e.target.value);
              setCol(e.target.name);
              setChange(e.target.value);
            }}
          />
        </Card.Body>
        <Card.Footer>
          <Button
            variant="info"
            className="category-edit-button-style"
            onClick={() => {
              handleSubmit(data.itemCatID);
            }}
          >
            Edit Name
          </Button>
        </Card.Footer>
      </div>
    </Card.Body>
  );
};

export default EditCat;
