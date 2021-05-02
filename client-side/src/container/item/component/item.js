import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import Form from "react-bootstrap/Form";
import { useHistory } from "react-router-dom";
import "./item.css";
import ListGroupItem from "./listGroupItem";
const ShowItemComp = ({
  data,
  userType,
  setImage,
  updateImage,
  itemPrice,
  setItemPrice,
  setEdColumn,
  setChange,
  updateItem,
  itemDesp,
  setItemDesp,
  itemQty,
  setItemQty,
  itemThreshold,
  setItemThreshold,
  itemBasketQty,
  setItemBasketQty,
  addBasketItem,
  setItemName,
  itemName,
  deactItem,
}) => {
  const history = useHistory();

  return (
    <div>
      <Card bg="light">
        <Card.Header>
          <Card.Body>
            <Card.Header className="product-detail-text-style">
              Product detail <br />
              {data.itemDetID}
            </Card.Header>

            <Card.Text>
              <img src={data.itemUrl} className="product-align-center" />{" "}
              <ListGroup variant="flush">
                <ListGroup.Item>
                  {userType == "A" && (
                    <div>
                      {" "}
                      <Form.Group>
                        <Form.Control
                          className="placeholder-style-item-edit-form"
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
                        <span className="edit-product-detail-button-style">
                          Upload the new Image
                        </span>
                      </Button>
                    </div>
                  )}
                </ListGroup.Item>
                <ListGroupItem
                  userType={userType}
                  inputType={"text"}
                  attributeName={"itemName"}
                  attribute={itemName}
                  placeholder={" new Name"}
                  setter={setItemName}
                  updateItem={updateItem}
                  itemDetID={data.itemDetID}
                  setEdColumn={setEdColumn}
                  setChange={setChange}
                  propName={"Product Name: "}
                  property={data.itemName}
                />

                <ListGroupItem
                  userType={userType}
                  inputType={"number"}
                  attributeName={"itemPrice"}
                  attribute={itemPrice}
                  placeholder={"new price"}
                  setter={setItemPrice}
                  updateItem={updateItem}
                  itemDetID={data.itemDetID}
                  setEdColumn={setEdColumn}
                  setChange={setChange}
                  propName={"Price: "}
                  property={data.itemPrice}
                />
                <ListGroup.Item className="product-detail-text-style">
                  <h1 className="product-attribute-text-style">Category:</h1>{" "}
                  {data.itemCatName}
                </ListGroup.Item>
                <ListGroup.Item className="product-detail-text-style">
                  <h1 className="product-attribute-text-style">Brand:</h1>
                  {data.suppName}
                </ListGroup.Item>

                <ListGroupItem
                  userType={userType}
                  inputType={"text"}
                  attributeName={"itemDesp"}
                  attribute={itemDesp}
                  placeholder={"new Description"}
                  setter={setItemDesp}
                  updateItem={updateItem}
                  itemDetID={data.itemDetID}
                  setEdColumn={setEdColumn}
                  setChange={setChange}
                  propName={"About: "}
                  property={data.itemDesp}
                />
              </ListGroup>
              {userType == "A" && (
                <ListGroup>
                  {" "}
                  {/* Admin  */}
                  <ListGroupItem
                    userType={userType}
                    inputType={"number"}
                    attributeName={"itemQty"}
                    attribute={itemQty}
                    placeholder={"new item qty"}
                    setter={setItemQty}
                    updateItem={updateItem}
                    itemDetID={data.itemDetID}
                    setEdColumn={setEdColumn}
                    setChange={setChange}
                    propName={"Stock Level: "}
                    property={data.itemQty}
                  />
                  {userType == "A" && (
                    <>
                      <ListGroupItem
                        userType={userType}
                        inputType={"number"}
                        attributeName={"itemThreshold"}
                        attribute={itemThreshold}
                        placeholder={"new item threshold"}
                        setter={setItemThreshold}
                        updateItem={updateItem}
                        itemDetID={data.itemDetID}
                        setEdColumn={setEdColumn}
                        setChange={setChange}
                        propName={"Auto Order Threshold: "}
                        property={data.itemThreshold}
                      />
                      <ListGroup.Item>
                        {" "}
                        <Button
                          size="sm"
                          variant="danger"
                          onClick={() => {
                            deactItem(data.itemDetID);
                          }}
                        >
                          <span className="edit-product-detail-button-style">
                            deactivtate item
                          </span>
                        </Button>
                      </ListGroup.Item>
                    </>
                  )}
                </ListGroup>
              )}
            </Card.Text>
          </Card.Body>

          <Card.Footer>
            {" "}
            {userType != "A" && (
              <div className="flex-container">
                <Form.Control
                  style={{ height: "40px", width: "80px", marginLeft: "auto" }}
                  type="number"
                  name="itemBasketQty"
                  placeholder="item qty"
                  id="itemBasketQty"
                  value={itemBasketQty}
                  onChange={(e) => {
                    setItemBasketQty(e.target.value);
                  }}
                />{" "}
                <Button
                  variant="dark"
                  onClick={() => {
                    if (userType == "C") {
                      addBasketItem();
                    } else {
                      history.push("/SignUp/");
                    }
                  }}
                >
                  <h1 className="product-add-to-basket-text-style">
                    Add to basket
                  </h1>
                </Button>
              </div>
            )}
          </Card.Footer>
        </Card.Header>
      </Card>
    </div>
  );
};

export default ShowItemComp;
