import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import React, { useState } from "react";
import { modifySuppAPI_Func } from "../../../api/api";
import Card from "react-bootstrap/Card";
import { authChecker } from "../../../Utility/authChecker";
import { useHistory } from "react-router-dom";

const EditSupplier = ({ data, setIsLoading, messageSetter }) => {
  const [suppName, setSuppName] = useState("");
  const [suppEmail, setSuppEmail] = useState("");
  const [column, setCol] = useState("");
  const [change, setChange] = useState("");
  const history = useHistory();

  //handle the modification
  const handleSubmit = (suppID) => {
    if (column && change) {
      const newData = { column, change, suppID };
      // modify supplier api
      modifySuppAPI_Func(newData).then((response) => {
        if (response.data.error) {
          messageSetter(response.data.error, "danger", true);
          return;
        }
        authChecker(history, response, false);
        messageSetter(response.data.message, "success", true);
        setSuppName("");
        setSuppEmail("");
        setCol("");
        setChange("");
        setIsLoading(true);
      });
    } else {
      messageSetter("No data was inserted", "danger", true);
    }
  };

  return (
    <div key={data.suppID}>
      <Card bg="secondary">
        <Card.Header>
          {" "}
          <div className="supplier-name-text-style">
            {data.suppName} <br />
            <div className="supplier-email-text-style">{data.suppEmail}</div>
            <div className="supplier-pk-style">{data.suppID}</div>
          </div>
        </Card.Header>
        <Card.Body>
          {" "}
          <Form.Control
            type="text"
            className="text-box-property-style"
            name="suppName"
            id="suppName"
            value={suppName}
            placeholder="New Name"
            onChange={(e) => {
              setSuppName(e.target.value);
              setCol(e.target.name);
              setChange(e.target.value);
            }}
          />
        </Card.Body>
        <Card.Footer>
          {" "}
          <Button
            onClick={() => {
              handleSubmit(data.suppID);
            }}
            className="category-edit-button-style"
            variant="info"
          >
            Edit Name
          </Button>
        </Card.Footer>
        <Card.Body>
          {" "}
          <Form.Control
            type="email"
            name="suppEmail"
            id="suppEmail"
            className="text-box-property-style"
            placeholder="New Email"
            value={suppEmail}
            onChange={(e) => {
              setSuppEmail(e.target.value);
              setCol(e.target.name);
              setChange(e.target.value);
            }}
          />
        </Card.Body>
        <Card.Footer>
          {" "}
          <Button
            onClick={() => {
              handleSubmit(data.suppID);
            }}
            className="category-edit-button-style"
            variant="info"
          >
            Edit Email
          </Button>
        </Card.Footer>
      </Card>
    </div>
  );
};

export default EditSupplier;
