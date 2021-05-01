import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import PickItemCat from "./itemCatList";
import ItemDetForm from "./newItemForm";
import SupOrdForm from "./supOrdForm";

const NewItem = ({
  userType,
  itemCatID,
  setItemCatID,
  itemCatList,
  itemName,
  setItemName,
  itemPrice,
  setItemPrice,
  itemThreshold,
  setItemThreshold,
  itemQty,
  setItemQty,
  itemDesp,
  setItemDesp,
  setImage,
  suppID,
  setSuppID,
  suppList,
  suppOrdQty,
  setSuppOrdQty,
  orderDate,
  setOrderDate,
  handleSubmit,
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
                itemCatID={itemCatID}
                setItemCatID={setItemCatID}
                itemCatList={itemCatList}
              />
              {/* product detail form */}
              <ItemDetForm
                itemName={itemName}
                setItemName={setItemName}
                itemPrice={itemPrice}
                setItemPrice={setItemPrice}
                itemThreshold={itemThreshold}
                setItemThreshold={setItemThreshold}
                itemQty={itemQty}
                setItemQty={setItemQty}
                itemDesp={itemDesp}
                setItemDesp={setItemDesp}
                setImage={setImage}
              />
              {/*Supplier order form */}
              <SupOrdForm
                suppID={suppID}
                setSuppID={setSuppID}
                suppList={suppList}
                suppOrdQty={suppOrdQty}
                setSuppOrdQty={setSuppOrdQty}
                orderDate={orderDate}
                setOrderDate={setOrderDate}
              />
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
