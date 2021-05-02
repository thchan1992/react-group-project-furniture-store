import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import PickItemCat from "./itemCatList";
import ItemDetForm from "./newItemForm";
import SupOrdForm from "./supOrdForm";

const NewItem = ({
  userType,
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
          {userType === "A" && (
            <div>
              {/*Drop down button to select item category */}
              <PickItemCat
                setItem={setItem}
                item={item}
                itemCatList={itemCatList}
              />{" "}
              {/*Supplier order form */}
              <SupOrdForm item={item} setItem={setItem} suppList={suppList} />
              {/* product detail form */}
              <ItemDetForm item={item} setItem={setItem} setImage={setImage} />
              {/*onClick button to submit the item detail and supplier order */}
              <Card.Footer>
                {" "}
                <Button onClick={handleSubmit} variant="info">
                  upload
                </Button>
              </Card.Footer>
            </div>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default NewItem;
