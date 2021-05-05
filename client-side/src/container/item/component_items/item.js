import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import Form from "react-bootstrap/Form";
import { useHistory } from "react-router-dom";
import "./item.css";
import ListGroupItem from "./listGroupItem";
const Item = ({
  newVal,
  setNewVal,
  item,
  userType,
  setImage,
  updateImage,
  updateItem,
  itemBasketQty,
  setItemBasketQty,
  addBasketItem,

  deactItem,
  messageSetter,
}) => {
  const history = useHistory();

  return (
    <div>
      <Card bg="light">
        <Card.Header>
          <Card.Body>
            <Card.Header className="product-detail-text-style">
              Product detail <br />
              {item.itemDetID}
            </Card.Header>

            <Card.Text>
              <img src={item.itemUrl} className="product-align-center" />{" "}
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
                          updateImage(item.itemDetID);
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
                  attribute={newVal.itemName}
                  placeholder={"New Name"}
                  setter={(e) => {
                    setNewVal({ ...newVal, itemName: e });
                  }}
                  updateItem={updateItem}
                  itemDetID={item.itemDetID}
                  propName={"Product Name: "}
                  property={item.itemName}
                />
                <ListGroupItem
                  userType={userType}
                  inputType={"number"}
                  attributeName={"itemPrice"}
                  attribute={newVal.itemPrice}
                  placeholder={"new price"}
                  setter={(e) => {
                    setNewVal({ ...newVal, itemPrice: e });
                  }}
                  updateItem={updateItem}
                  itemDetID={item.itemDetID}
                  propName={"Price: "}
                  property={item.itemPrice}
                />

                <ListGroup.Item className="product-detail-text-style">
                  <h1 className="product-attribute-text-style">Category:</h1>{" "}
                  {item.itemCatName}
                </ListGroup.Item>
                <ListGroup.Item className="product-detail-text-style">
                  <h1 className="product-attribute-text-style">Brand:</h1>
                  {item.suppName}
                </ListGroup.Item>
                <ListGroupItem
                  userType={userType}
                  inputType={"text"}
                  attributeName={"itemDesp"}
                  attribute={newVal.itemDesp}
                  placeholder={"New Description"}
                  setter={(e) => {
                    setNewVal({ ...newVal, itemDesp: e });
                  }}
                  updateItem={updateItem}
                  itemDetID={item.itemDetID}
                  propName={"About: "}
                  property={item.itemDesp}
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
                    attribute={newVal.itemQty}
                    placeholder={"new item qty"}
                    setter={(e) => {
                      setNewVal({ ...newVal, itemQty: e });
                    }}
                    updateItem={updateItem}
                    itemDetID={item.itemDetID}
                    propName={"Stock Level: "}
                    property={item.itemQty}
                  />
                  {userType == "A" && (
                    <>
                      <ListGroupItem
                        userType={userType}
                        inputType={"number"}
                        attributeName={"itemThreshold"}
                        attribute={newVal.itemThreshold}
                        placeholder={"new item threshold"}
                        setter={(e) => {
                          setNewVal({ ...newVal, itemThreshold: e });
                        }}
                        updateItem={updateItem}
                        itemDetID={item.itemDetID}
                        propName={"Auto Order Threshold: "}
                        property={item.itemThreshold}
                      />
                      <ListGroup.Item>
                        {" "}
                        <Button
                          size="sm"
                          variant="danger"
                          onClick={() => {
                            deactItem(item.itemDetID);
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
                  style={{
                    height: "40px",
                    width: "80px",
                    marginLeft: "auto",
                  }}
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
                      messageSetter(
                        "Please Sign Up or Log In before you shop",
                        "warning",
                        true
                      );
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

export default Item;
