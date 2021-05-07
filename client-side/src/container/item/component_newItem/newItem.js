import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import ItemCatList from "./itemCatList";
import NewItemForm from "./newItemForm";
import SupOrdForm from "./supOrdForm";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import "./newItem.css";

const NewItem = ({
  itemCatList,
  setImage,
  suppList,
  handleSubmit,
  item,
  setItem,
}) => {
  return (
    <div>
      {" "}
      <Card bg="light">
        <Card.Header>
          <div className="new-item-title-style">New Item Form</div>
        </Card.Header>
        <Card.Body>
          <Row>
            {" "}
            <Col>
              {" "}
              {/* product detail form */}
              <NewItemForm item={item} setItem={setItem} setImage={setImage} />
            </Col>{" "}
            <Col>
              {/*Drop down button to select item category */}
              <ItemCatList
                setItem={setItem}
                item={item}
                itemCatList={itemCatList}
              />{" "}
              {/*Supplier order form */}
              <SupOrdForm item={item} setItem={setItem} suppList={suppList} />
            </Col>{" "}
          </Row>
        </Card.Body>{" "}
        <Card.Footer>
          {" "}
          {/*onClick button to submit the item detail and supplier order */}
          <Button onClick={handleSubmit} variant="info">
            upload
          </Button>
        </Card.Footer>
      </Card>
    </div>
  );
};

export default NewItem;
