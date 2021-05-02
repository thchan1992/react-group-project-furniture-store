import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import ItemCatList from "./itemCatList";
import NewItemForm from "./newItemForm";
import SupOrdForm from "./supOrdForm";

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
          <span className="supplier-order-title">New Item Form</span>
        </Card.Header>
        <Card.Body>
          <div>
            {/*Drop down button to select item category */}
            <ItemCatList
              setItem={setItem}
              item={item}
              itemCatList={itemCatList}
            />{" "}
            {/*Supplier order form */}
            <SupOrdForm item={item} setItem={setItem} suppList={suppList} />
            {/* product detail form */}
            <NewItemForm item={item} setItem={setItem} setImage={setImage} />
            {/*onClick button to submit the item detail and supplier order */}
            <Card.Footer>
              {" "}
              <Button onClick={handleSubmit} variant="info">
                upload
              </Button>
            </Card.Footer>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default NewItem;
