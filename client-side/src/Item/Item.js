import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import React, { useEffect, useState } from "react";
import {
  showItemsAPI,
  host,
  editItemAPI,
  delImageAPI,
  addItemAPI,
  uploadImageAPI,
} from "../Constants";
import axios from "axios";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

const Item = ({ itemCatName, userType }) => {
  const [sorting, setSorting] = useState("ASC");
  const [column, setColumn] = useState("itemName");
  const [edColumn, setEdColumn] = useState("");
  const [change, setChange] = useState("");
  const [itemList, setItemList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [itemPrice, setItemPrice] = useState();
  const [itemQty, setItemQty] = useState();
  const [itemCatID, setItemCatID] = useState();
  const [image, setImage] = useState(null);
  const [itemName, setItemName] = useState("");
  const [itemDesp, setItemDesp] = useState("");
  const [itemThreshold, setItemThreshold] = useState();
  const [itemCatList, setItemCatList] = useState([]);

  //function that updates the changes made to the item.
  const updateItem = (itemDetID, edColumn, change) => {
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
        window.alert(response.data.message);
        setIsLoading(true);
        //refresh the browser
      });
  };

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

  //Function to fetch the sorted items
  const fetchItem = () => {
    axios
      .get(showItemsAPI + sorting + "/" + column + "/" + itemCatName)
      .then((response) => {
        setItemList(response.data.result);
      });
  };

  //use Effect to fetch item list.
  useEffect(() => {
    fetchItem();
    setIsLoading(false);
  }, [isLoading]);

  //Sorting Item by Name (A to Z), Name(Z to A), Price(low to high), Price(high to low).
  //Admin can update any Item's Name, Price, Description, Quantity, Threshold and Image.
  return (
    <div>
      <DropdownButton variant="warning" title="Sort By">
        <Dropdown.Item
          className="text-style-item-upperCase"
          eventKey="Name"
          onClick={() => {
            setColumn("itemName");
            setSorting("ASC");

            setIsLoading(true);
          }}
        >
          Name (A to Z)
        </Dropdown.Item>
        <Dropdown.Item
          className="text-style-item-upperCase"
          eventKey="Name"
          onClick={() => {
            setColumn("itemName");
            setSorting("DESC");
            setIsLoading(true);
          }}
        >
          Name (Z to A)
        </Dropdown.Item>
        <Dropdown.Item
          className="text-style-item-upperCase"
          eventKey="Price"
          onClick={() => {
            setColumn("itemPrice");
            setSorting("ASC");
            setIsLoading(true);
          }}
        >
          Price (Low to High)
        </Dropdown.Item>
        <Dropdown.Item
          className="text-style-item-upperCase"
          eventKey="Price"
          onClick={() => {
            setColumn("itemPrice");
            setSorting("DESC");
            setIsLoading(true);
          }}
        >
          Price (High to Low)
        </Dropdown.Item>
      </DropdownButton>
      <Row gutter={40}>
        <div className="flex-container"></div>
        {itemList.map((data) => (
          <Col
            className="block-example border border-dark"
            key={data.itemDetID}
            xs={{ span: 6 }}
            sm={{ span: 4 }}
            md={{ span: 3 }}
            lg={{ span: 2 }}
            xl={{ span: 2 }}
          >
            <ul>
              <img src={data.itemUrl} width="100%" />
            </ul>

            <ul>
              {userType == "A" && (
                <div>
                  {" "}
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
            <ul>Price : £{data.itemPrice}</ul>
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
                  <Button variant="danger" onClick={() => setItemThreshold(0)}>
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
            {userType == "A" && <ul>{data.itemCatID}</ul>}
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Item;
