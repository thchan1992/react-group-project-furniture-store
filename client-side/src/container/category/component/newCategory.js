import React from "react";
import Card from "react-bootstrap/Card";
import Textbox from "../../../frame/Textbox";
import Button from "react-bootstrap/Button";
const NewCategory = ({ itemCatName, setItemCatName, handleSubmit }) => {
  return (
    <Card>
      <Card.Body>
        <Textbox
          name={"Category Name"}
          attriName={"itemCatName"}
          attribute={itemCatName}
          inputType={"text"}
          setter={setItemCatName}
        />
      </Card.Body>
      <Card.Footer>
        <Button
          className="category-edit-button-style"
          variant="info"
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </Card.Footer>
    </Card>
  );
};
export default NewCategory;
