import Textbox from "../../Utility/Textbox";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";

const AddSupForm = ({
  suppName,
  setSuppName,
  suppEmail,
  setSuppEmail,
  handleSubmit,
}) => {
  return (
    <div>
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
      <Button onClick={handleSubmit}>Submit</Button>
    </div>
  );
};
export default AddSupForm;
