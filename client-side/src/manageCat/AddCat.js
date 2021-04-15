import Button from "react-bootstrap/Button";
import Textbox from "../Utility/Textbox";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { host } from "../Constants";
import { pk } from "../setPrimary";

const AddCat = () => {
  const [itemCatName, setItemCatName] = useState("");
  const handleSubmit = () => {
    if (!itemCatName) {
      window.alert("no name is insert");
    } else {
      const itemCatID = pk;
      const newCat = { itemCatName, itemCatID };
      axios.post(host + "/item/addCater", newCat).then((response) => {
        window.alert(response.data.message);
      });
    }
  };

  return (
    <div>
      <Textbox
        name={"Category Name"}
        attriName={"itemCatName"}
        attribute={itemCatName}
        inputType={"text"}
        setter={setItemCatName}
      />
      <Button onClick={handleSubmit}>Submit</Button>
    </div>
  );
};

export default AddCat;
