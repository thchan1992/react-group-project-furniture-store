import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import React from "react";
import AddBaskItem from "../addBaskItem";
import { useHistory } from "react-router-dom";
import Card from "react-bootstrap/Card";
import CardDeck from "react-bootstrap/CardDeck";
const ProductList = ({ itemList, userID, userType, messageSetter }) => {
  const history = useHistory();

  return (
    <div>
      <Row
        style={{
          backgroundColor: "white",
        }}
      >
        <br />
        {itemList.map((data) => (
          <CardDeck key={data.itemDetID}>
            <Card bg="dark" style={{ width: "18rem" }} border="secondary">
              <Card.Header className="product-title-text-style">
                {data.itemDetID}
              </Card.Header>
              <Card.Body>
                <Card.Title>
                  <h5 className="product-text-style">{data.itemName}</h5>
                </Card.Title>
                <img src={data.itemUrl} width="100%" />
                <Card.Text>
                  {" "}
                  <h5 className="product-price-style">£ {data.itemPrice} </h5>
                  <h5 className="product-text-brand-style">
                    Brand: {data.suppName}{" "}
                  </h5>
                  {data.itemQty < 5 && (
                    <h5 className="product-low-stock-style">Low Stock</h5>
                  )}
                  <div>
                    {" "}
                    {userType == "A" && (
                      <ul className="product-text-style-admin">
                        <li>Stock Level : {data.itemQty}</li>
                        <li>Threshold : {data.itemThreshold}</li>
                        <li>
                          Category ID : {data.itemCatID} - {data.itemCatName}
                        </li>
                        <li>
                          {" "}
                          Supplier Name : {data.suppID} - {data.suppName}
                        </li>
                        <br />
                        Please press detail to modify this product
                      </ul>
                    )}
                  </div>{" "}
                  <Card.Footer className="card-footer-style">
                    <div className="flex-container">
                      <AddBaskItem
                        userType={userType}
                        userID={userID}
                        itemDetID={data.itemDetID}
                        messageSetter={messageSetter}
                      />
                      <Button
                        variant="secondary"
                        style={{ marginLeft: "auto", height: "40px" }}
                        className="product-detail-button-style"
                        onClick={() => {
                          history.push("/Item_detail/" + data.itemDetID);
                        }}
                      >
                        Detail
                      </Button>
                    </div>
                  </Card.Footer>
                </Card.Text>
              </Card.Body>
            </Card>
          </CardDeck>
          // </Col>
        ))}
      </Row>
    </div>
  );
};
export default ProductList;
