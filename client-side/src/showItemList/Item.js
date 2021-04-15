import React, { useEffect, useState } from "react";
import { showItemsAPI, showSearchAPI, showSuppAPI } from "../Constants";
import axios from "axios";
import Sort from "./component/Sort";
import ProductList from "./component/ProductList";

const Item = ({ itemCatName, userID, userType, keyword }) => {
  const [sorting, setSorting] = useState("ASC");
  const [column, setColumn] = useState("itemName");
  const [itemList, setItemList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  //Function to fetch the sorted items
  const fetchItem = () => {
    if (!keyword) {
      axios
        .get(showItemsAPI + sorting + "/" + column + "/" + itemCatName)
        .then((response) => {
          setItemList(response.data.result);
          console.log("h", response.data.result);
        });
    } else {
      console.log(sorting, column, keyword);
      axios
        .get(showSearchAPI + sorting + "/" + column + "/" + keyword)
        .then((response) => {
          setItemList(response.data.result);
        });
      setIsLoading(false);
    }
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
      {/*Sorting button*/}
      <Sort
        setColumn={setColumn}
        setSorting={setSorting}
        setIsLoading={setIsLoading}
      />
      {/* Show product list */}
      <ProductList
        itemList={itemList}
        userID={userID}
        userType={userType}
        setIsLoading={setIsLoading}
      />
    </div>
  );
};

export default Item;
