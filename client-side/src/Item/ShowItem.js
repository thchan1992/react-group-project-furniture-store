import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  host,
  editItemAPI,
  delImageAPI,
  uploadImageAPI,
  showCaterAPI,
  showSuppOrderAPI,
  showSuppAPI,
} from "../Constants";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Col from "react-bootstrap/Col";

const ShowItem = ({ data, userType, setIsLoading }) => {
  const [edColumn, setEdColumn] = useState("");
  const [change, setChange] = useState("");
  const [itemPrice, setItemPrice] = useState();
  const [itemQty, setItemQty] = useState();
  const [itemCatID, setItemCatID] = useState();
  const [image, setImage] = useState(null);
  const [itemName, setItemName] = useState("");
  const [itemDesp, setItemDesp] = useState("");
  const [itemThreshold, setItemThreshold] = useState();
  //const [itemCatList, setItemCatList] = useState([]);
  const [suppID, setSuppID] = useState();
  const [suppName, setSuppName] = useState("");

  const updateItem = (itemDetID, edColumn, change) => {
    if (change != "") {
      const column = edColumn;
      const newData = {
        column,
        itemDetID,
        change,
      };
      //API that edits the attributes.
      axios
        .put(editItemAPI, newData, {
          headers: {
            "x-access-token": localStorage.getItem("token"),
          },
        })
        .then((response) => {
          console.log(response);
          window.alert(response.data.message);
          setItemName("");
          setItemCatID("");
          setImage(null);
          setItemDesp("");
          setItemThreshold("");

          setChange("");
          setIsLoading(true);
        });
    } else {
      window.alert("No Value inserted");
    }
  };

  // useEffect(() => {
  //   axios.get(showCaterAPI).then((response) => {
  //     setItemCatList(response.data.result);
  //   });
  // }, []);

  //function to modify the product image
  const updateImage = async (itemDetID) => {
    //API that deletes the current product image
    await axios
      .delete(delImageAPI + itemDetID, {
        headers: {
          "Content-Type": "multipart/form-data",
          "x-access-token": localStorage.getItem("token"),
        },
      })
      .then((response) => {
        //create a new FormData for storing the new image
        const fd = new FormData();
        //append the new image to the fd
        fd.append("image", image);
        axios
          .post(uploadImageAPI, fd, {
            headers: {
              "Content-Type": "multipart/form-data",
              "x-access-token": localStorage.getItem("token"),
            },
          })
          .then((response) => {
            const itemUrl = host + "/" + response.data.fileName;
            const column = "itemUrl";
            updateItem(itemDetID, column, itemUrl);
          });
      });
  };

  return (
    <div>
      <ul>
        <img src={data.itemUrl} width="100%" />
      </ul>

      <ul>
        {userType == "A" && (
          <div>
            {data.itemDetID}{" "}
            <Form.Group>
              <Form.Control
                type="file"
                name="image"
                onChange={(e) => setImage(e.target.files[0])}
                accept="jpg png"
              />
            </Form.Group>
            <Button
              size="sm"
              variant="info"
              onClick={() => {
                updateImage(data.itemDetID);
              }}
            >
              Upload
            </Button>
          </div>
        )}
      </ul>
      <ul>
        <h5>{data.itemName}</h5>
      </ul>

      <ul>
        {userType == "A" && (
          <div>
            {" "}
            <Form.Control
              style={{ height: "30px", width: "150px" }}
              type="text"
              placeholder="Edit Name"
              name="itemName"
              id="itemName"
              value={itemName}
              onChange={(e) => {
                setItemName(e.target.value);
                setEdColumn(e.target.name);
                setChange(e.target.value);
              }}
            />
            <Button
              size="sm"
              variant="info"
              onClick={() => {
                updateItem(data.itemDetID, edColumn, change);
              }}
            >
              Update
            </Button>
          </div>
        )}
      </ul>
      <ul>Price : £ {data.itemPrice} </ul>
      <ul>
        {userType == "A" && (
          <div>
            {" "}
            <Form.Control
              style={{ height: "30px", width: "150px" }}
              type="text"
              placeholder="Edit Price"
              name="itemPrice"
              id="itemPrice"
              value={itemPrice}
              onChange={(e) => {
                setItemPrice(e.target.value);
                setEdColumn(e.target.name);
                setChange(e.target.value);
              }}
            />
            <Button
              size="sm"
              variant="info"
              onClick={() => {
                updateItem(data.itemDetID, edColumn, change);
              }}
            >
              Update
            </Button>
          </div>
        )}
      </ul>
      <ul>Product Description : {data.itemDesp}</ul>
      <ul>
        {userType == "A" && (
          <div>
            {" "}
            <Form.Control
              style={{ height: "30px", width: "150px" }}
              type="text"
              placeholder="Edit Description"
              name="itemDesp"
              id="itemDesp"
              value={itemDesp}
              onChange={(e) => {
                setItemDesp(e.target.value);
                setEdColumn(e.target.name);
                setChange(e.target.value);
              }}
            />
            <Button
              size="sm"
              variant="info"
              onClick={() => {
                updateItem(data.itemDetID, edColumn, change);
              }}
            >
              Update
            </Button>
          </div>
        )}
      </ul>
      {userType == "A" && <ul>Quantity : {data.itemQty}</ul>}
      <ul>
        {userType == "A" && (
          <div>
            {" "}
            <Form.Control
              style={{ height: "30px", width: "150px" }}
              type="text"
              placeholder="Edit Quantity"
              name="itemQty"
              id="itemQty"
              value={itemQty}
              onChange={(e) => {
                setItemQty(e.target.value);
                setEdColumn(e.target.name);
                setChange(e.target.value);
              }}
            />
            <Button
              size="sm"
              variant="info"
              onClick={() => {
                updateItem(data.itemDetID, edColumn, change);
              }}
            >
              Update
            </Button>
          </div>
        )}
      </ul>
      {userType == "A" && <ul>Threshold : {data.itemThreshold}</ul>}
      <ul>
        {userType == "A" && (
          <div>
            {" "}
            <Form.Control
              style={{ height: "30px", width: "150px" }}
              type="text"
              name="itemThreshold"
              placeholder="Edit Threshold"
              id="itemThreshold"
              value={itemThreshold}
              onChange={(e) => {
                setItemThreshold(e.target.value);
                setEdColumn(e.target.name);
                setChange(e.target.value);
              }}
            />
            <Button
              size="sm"
              variant="danger"
              onClick={() => setItemThreshold(0)}
            >
              DELETE ITEM
            </Button>
            <Button
              size="sm"
              variant="info"
              onClick={() => {
                updateItem(data.itemDetID, edColumn, change);
              }}
            >
              Update
            </Button>
          </div>
        )}
      </ul>
      {userType == "A" && (
        <ul>
          Category ID : {data.itemCatID} | {data.itemCatName}
        </ul>
      )}
      {/* <Form.Group as={Form.Row}>
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
      </Form.Group> */}

      {/* <Button
        size="sm"
        variant="info"
        onClick={() => {
          updateItem(data.itemCatID, edColumn, change);
        }}>
        Update
      </Button> */}
      {userType == "A" && (
        <ul>
          Supplier Name : {data.suppID}|{data.suppName}
        </ul>
      )}
      {/* <ul>
        {userType == "A" && (
          <div>
            {" "}
            <Form.Control
              style={{ height: "30px", width: "150px" }}
              type="text"
              placeholder="Edit Supplier Name"
              name="suppName"
              id="suppName"
              value={suppName}
              onChange={(e) => {
                setSuppName(e.target.value);
                setEdColumn(e.target.name);
                setChange(e.target.value);
              }}
            />
            <Button
              size="sm"
              variant="info"
              onClick={() => {
                updateItem(data.itemDetID, edColumn, change);
              }}>
              Update
            </Button>
          </div>
        )}
      </ul> */}
    </div>
  );
};

export default ShowItem;
