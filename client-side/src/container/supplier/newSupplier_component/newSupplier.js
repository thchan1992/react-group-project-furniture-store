import Textbox from "../../../Utility/Textbox";
import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "./newSupplier.css";

const NewSupplier = ({
  suppName,
  setSuppName,
  suppEmail,
  setSuppEmail,
  handleSubmit,
}) => {
  return (
    <Card>
      <Card.Header>
        <div className="new-supplier-title-style">New Supplier</div>
      </Card.Header>
      <Card.Body>
        <Textbox
          name={"Supplier Name"}
          attriName={"suppName"}
          attribute={suppName}
          inputType={"text"}
          setter={setSuppName}
          placeholder={"Supplier Name"}
        />
        <Textbox
          name={"Supplier Email"}
          attriName={"suppEmail"}
          attribute={suppEmail}
          inputType={"email"}
          setter={setSuppEmail}
          placeholder={"Supplier Email"}
        />
      </Card.Body>
      <Card.Footer>
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
export default NewSupplier;
