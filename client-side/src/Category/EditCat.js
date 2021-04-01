import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import React, { useState } from "react";
import axios from "axios";
import { host } from "../Constants";

const EditCat = ({ data, setIsLoading }) => {
  const [itemCatName, setItemCatName] = useState("");
  const [column, setCol] = useState("");
  const [change, setChange] = useState("");

  const handleSubmit = (itemCatID) => {
    if (column && change) {
      const newData = { column, change, itemCatID };
      axios.put(host + "/item/editCater/", newData).then((response) => {
        window.alert(response.data.message);
        setItemCatName("");
        setCol("");
        setChange("");
        setIsLoading(true);
      });
    } else {
      window.alert("No data was inserted");
    }
  };

  return (
    <div key={data.itemCatID}>
      <ul>{data.itemCatName}</ul>
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
      <Button
        onClick={() => {
          handleSubmit(data.itemCatID);
        }}
      >
        Edit Name
      </Button>
    </div>
  );
};

export default EditCat;
