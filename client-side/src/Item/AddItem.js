import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  showSuppAPI,
  addSuppOrderAPI,
  showCaterAPI,
  uploadImageAPI,
  host,
  addItemAPI,
} from "../Constants";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { pk } from "../setPrimary";

const AddItem = ({ userType }) => {
  const [itemPrice, setItemPrice] = useState(0);
  const [itemQty, setItemQty] = useState(0);
  const [itemCatID, setItemCatID] = useState(0);
  const [image, setImage] = useState(null);
  const [itemName, setItemName] = useState("");
  const [itemDesp, setItemDesp] = useState("");
  const [itemThreshold, setItemThreshold] = useState(0);
  const [itemCatList, setItemCatList] = useState([]);
  const [suppOrdID, setSuppOrdID] = useState("");
  const [suppID, setSuppID] = useState("");
  const [itemDetID, setItemDetID] = useState("");
  const [suppOrdQty, setSuppOrdQty] = useState("");
  const [orderDate, setOrderDate] = useState("");
  const [ordReceiveDate, setOrdReceiveDate] = useState("");
  const [orderList, setOrderList] = useState("");
  const [suppList, setSuppList] = useState([]);

  //use Effect to fetch item list.
  useEffect(() => {
    axios.get(showCaterAPI).then((response) => {
      setItemCatList(response.data.result);
    });
    axios.get(showSuppAPI).then((response) => {
      setSuppList(response.data.result);
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
        const itemDetID = pk;
        const newItem = {
          itemThreshold,
          itemQty,
          itemCatID,
          itemName,
          itemDesp,
          itemUrl,
          itemDetID,
          itemPrice,
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
        const suppOrdID = pk;

        const newOrder = {
          suppOrdID,
          suppID,
          itemDetID,
          itemCatID,
          suppOrdQty,
          orderDate,
          ordReceiveDate,
        };
        //API that adds the order details to the database
        axios
          .post(addSuppOrderAPI, newOrder)

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
                onSelect={(e) => setItemCatID(e)}>
                {itemCatList.map((data) => (
                  <Dropdown.Item
                    className="text-style-item-upperCase"
                    eventKey={data.itemCatID}
                    key={data.itemCatID}>
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
          </Form.Group>

          <Form.Group as={Form.Row}>
            <Form.Label className="text-center" column sm={1}>
              Supplier ID
            </Form.Label>
            <Col sm={10} className="flex-container">
              <Form.Control
                style={{ height: "40px", width: "170px" }}
                readOnly
                value={suppID}
                placeholder="Select the Supplier ID"
              />
              <DropdownButton
                variant="dark"
                title=""
                onSelect={(e) => setSuppID(e)}>
                {suppList.map((data) => (
                  <Dropdown.Item
                    className="text-style-item-upperCase"
                    eventKey={data.suppID}
                    key={data.suppID}>
                    - {data.suppName} | {data.suppID}
                  </Dropdown.Item>
                ))}
              </DropdownButton>
            </Col>
          </Form.Group>

          <Form.Group as={Form.Row}>
            <Form.Label column sm={1}>
              Supplier Order Quantity
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                style={{ height: "40px", width: "200px" }}
                type="number"
                name="suppOrderQty"
                id="suppOrdQty"
                value={suppOrdQty}
                onChange={(e) => setSuppOrdQty(e.target.value)}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Form.Row}>
            <Form.Label column sm={1}>
              Order Date
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                style={{ height: "40px", width: "200px" }}
                type="date"
                name="orderDate"
                id="orderDate"
                value={orderDate}
                onChange={(e) => setOrderDate(e.target.value)}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Form.Row}>
            <Form.Label column sm={1}>
              Order Receive Date
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                style={{ height: "40px", width: "200px" }}
                type="number"
                name="ordReceiveDate"
                id="ordReceiveDate"
                value={ordReceiveDate}
                onChange={(e) => setOrdReceiveDate(e.target.value)}
              />
            </Col>
            <Button onClick={handleSubmit}>upload</Button>
          </Form.Group>
        </div>
      )}
    </div>
  );
};
export default AddItem;
