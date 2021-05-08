import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import React, { useState } from "react";
import { modifyCatAPI_Func } from "../../../api/api";
import { useHistory } from "react-router-dom";
import Card from "react-bootstrap/Card";
import { authChecker } from "../../../Utility/authChecker";

const EditCategory = ({ data, messageSetter, setIsLoading }) => {
  const [itemCatName, setItemCatName] = useState(null);
  const history = useHistory();

  //handle the edit submission
  const handleSubmit = (itemCatID) => {
    if (itemCatName) {
      const column = "itemCatName";
      const change = itemCatName;
      const newData = { column, change, itemCatID };
      //An API to modify the category detail
      modifyCatAPI_Func(newData).then((response) => {
        if (response.data.error) {
          messageSetter(response.data.error, "danger", true);
          return;
        }
        authChecker(history, response, false);
        messageSetter(
          response.data.message +
            ", please press reload button to see the changes",
          "success",
          true
        );
        setIsLoading(true);
      });
    } else {
      messageSetter("No data was inserted", "danger", true);
    }
  };

  return (
    <div key={data.itemCatID}>
      {" "}
      <Card bg="secondary">
        <Card.Header>
          <div className="category-text-style">
            {" "}
            {data.itemCatName} <br />
            <div className="category-pk-style"> {data.itemCatID}</div>
          </div>
        </Card.Header>
        <Card.Body>
          {" "}
          <Form.Control
            type="text"
            name="itemCatName"
            id="itemCatName"
            className="text-box-property-style"
            value={itemCatName}
            placeholder="New Name"
            onChange={(e) => {
              setItemCatName(e.target.value);
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
        </Card.Footer>{" "}
      </Card>
    </div>
  );
};

export default EditCategory;
