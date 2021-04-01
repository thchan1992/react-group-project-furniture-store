import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
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
      console.log(newCat);
      axios.post(host + "/item/addCater", newCat).then((response) => {
        window.alert(response.data.message);
      });
    }
  };

  return (
    <div>
      <Form.Group as={Form.Row}>
        <Form.Label column sm={1}>
          Category Name
        </Form.Label>
        <Col sm={10}>
          <Form.Control
            style={{ height: "40px", width: "200px" }}
            type="text"
            name="itemCatName"
            id="itemCatName"
            value={itemCatName}
            onChange={(e) => setItemCatName(e.target.value)}
          />
        </Col>
      </Form.Group>
      <Button onClick={handleSubmit}>Submit</Button>
    </div>
  );
};

export default AddCat;
