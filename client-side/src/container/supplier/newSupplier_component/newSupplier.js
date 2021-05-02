import Textbox from "../../../utility/Textbox";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
const AddSupForm = ({
  suppName,
  setSuppName,
  suppEmail,
  setSuppEmail,
  handleSubmit,
}) => {
  return (
    <Card>
      <Card.Body>
        {" "}
        <Textbox
          name={"Supplier Name"}
          attriName={"suppName"}
          attribute={suppName}
          inputType={"text"}
          setter={setSuppName}
        />
        <Textbox
          name={"Supplier Email"}
          attriName={"suppEmail"}
          attribute={suppEmail}
          inputType={"email"}
          setter={setSuppEmail}
        />
      </Card.Body>{" "}
      <Card.Footer>
        {" "}
        <Button
          onClick={handleSubmit}
          className="category-edit-button-style"
          variant="info"
        >
          Submit
        </Button>
      </Card.Footer>
    </Card>
  );
};
export default AddSupForm;
