import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { showCaterAPI, uploadImageAPI, host, addItemAPI } from "../Constants";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

const AddItem = ({ userType }) => {
  const [itemPrice, setItemPrice] = useState(0);
  const [itemQty, setItemQty] = useState(0);
  const [itemCatID, setItemCatID] = useState(0);
  const [image, setImage] = useState(null);
  const [itemName, setItemName] = useState("");
  const [itemDesp, setItemDesp] = useState("");
  const [itemThreshold, setItemThreshold] = useState(0);
  const [itemCatList, setItemCatList] = useState([]);

  //use Effect to fetch item list.
  useEffect(() => {
    axios.get(showCaterAPI).then((response) => {
      setItemCatList(response.data.result);
    });
  }, []);

  //handle the submission
  const handleSubmit = async () => {
    const fd = new FormData();
    fd.append("image", image);
    //API that uploads the image to the database
    await axios
      .post(uploadImageAPI, fd, {
        headers: {
          "Content-Type": "multipart/form-data",
          "x-access-token": localStorage.getItem("token"),
        },
      })
      .then((response) => {
        const itemUrl = host + "/" + response.data.fileName;
        const itemDetID = new Date().getTime();
        const newItem = {
          itemPrice,
          itemThreshold,
          itemQty,
          itemCatID,
          itemName,
          itemDesp,
          itemUrl,
          itemDetID,
        };
        //API that adds the item details to the database
        axios
          .post(addItemAPI, newItem, {
            headers: {
              "x-access-token": localStorage.getItem("token"),
            },
          })
          .then((response) => {
            window.alert(response.data.message);
          });
      });
  };

  //Admin can add Items to different categories like Sofa, CoffeTable, DinnerTable and Sideboard.
  //Admin can also add Images for the items.
  return (
    <div>
      <h1>Add New Item</h1>{" "}
      {userType === "A" && (
        <div>
          <Form.Group as={Form.Row}>
            <Form.Label className="text-center" column sm={1}>
              Item Category ID
            </Form.Label>
            <Col sm={10} className="flex-container">
              <Form.Control
                style={{ height: "40px", width: "170px" }}
                readOnly
                value={itemCatID}
                placeholder="Select the Category"
              />
              <DropdownButton
                variant="dark"
                title=""
                onSelect={(e) => setItemCatID(e)}
              >
                {itemCatList.map((data) => (
                  <Dropdown.Item
                    className="text-style-item-upperCase"
                    eventKey={data.itemCatID}
                    key={data.itemCatID}
                  >
                    - {data.itemCatName} | {data.itemCatID}
                  </Dropdown.Item>
                ))}
              </DropdownButton>
            </Col>
          </Form.Group>
          <Form.Group as={Form.Row}>
            <Form.Label column sm={1}>
              Item Name
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                style={{ height: "40px", width: "200px" }}
                type="text"
                name="itemName"
                id="itemName"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Form.Row}>
            <Form.Label column sm={1}>
              Item Price
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                style={{ height: "40px", width: "200px" }}
                type="number"
                name="itemPrice"
                id="itemPrice"
                value={itemPrice}
                onChange={(e) => setItemPrice(e.target.value)}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Form.Row}>
            <Form.Label column sm={1}>
              Order Threshold
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                style={{ height: "40px", width: "200px" }}
                type="number"
                name="itemThreshold"
                id="itemThreshold"
                value={itemThreshold}
                onChange={(e) => setItemThreshold(e.target.value)}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Form.Row}>
            <Form.Label column sm={1}>
              Stock Level
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                style={{ height: "40px", width: "200px" }}
                type="number"
                name="itemQty"
                id="itemQty"
                value={itemQty}
                onChange={(e) => setItemQty(e.target.value)}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Form.Row}>
            <Form.Label column sm={1}>
              Item Description
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                as="textarea"
                rows={3}
                style={{ width: "200px" }}
                type="text"
                name="itemDesp"
                id="itemDesp"
                value={itemDesp}
                onChange={(e) => setItemDesp(e.target.value)}
              />
            </Col>

            <Form.Group>
              <Form.Control
                type="file"
                name="image"
                onChange={(e) => setImage(e.target.files[0])}
                accept="jpg png"
              />
            </Form.Group>
            <Button onClick={handleSubmit}>upload</Button>
          </Form.Group>
        </div>
      )}
    </div>
  );
};
export default AddItem;
