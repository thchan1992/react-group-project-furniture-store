import React, { useEffect, useState } from "react";

import { showItemsAPI_Func, showSearchAPI_Func } from "../../frame/API";
import Component from "./component/itemPage";

const Item = ({ itemCatName, userID, userType, keyword, messageSetter }) => {
  const [sorting, setSorting] = useState("ASC");
  const [column, setColumn] = useState("itemName");
  const [itemList, setItemList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showSort, setShowSort] = useState("Item Name (A to Z)");

  //Function to fetch the sorted items
  const fetchItem = () => {
    if (!keyword) {
      showItemsAPI_Func(sorting, column, itemCatName).then((response) => {
        setItemList(response.data.result);
      });
    } else {
      showSearchAPI_Func(sorting, column, keyword).then((response) => {
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
      <Component
        setColumn={setColumn}
        setSorting={setSorting}
        setIsLoading={setIsLoading}
        showSort={showSort}
        setShowSort={setShowSort}
        itemList={itemList}
        userID={userID}
        userType={userType}
        messageSetter={messageSetter}
      />
    </div>
  );
};

export default Item;
