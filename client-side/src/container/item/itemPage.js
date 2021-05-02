import React, { useEffect, useState, useRef } from "react";
import { showItemsAPI_Func, showSearchAPI_Func } from "../../api/api";
import Component from "./component_itemPage/itemPage";
import { showItemsAPI } from "../../api/api";

const Item = ({ itemCatName, userID, userType, keyword, messageSetter }) => {
  const [sorting, setSorting] = useState("ASC");
  const [column, setColumn] = useState("itemName");
  const [itemList, setItemList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showSort, setShowSort] = useState("Item Name (A to Z)");
  const getCache = require("localstorage-ttl");
  //Function to fetch the sorted items
  const fetchItem = () => {
    if (!keyword) {
      const cacheName = itemCatName + showSort;
      if (getCache.get(cacheName)) {
        const data = getCache.get(cacheName);
        setItemList(data);
        console.log("Use Cache");
      } else {
        showItemsAPI_Func(sorting, column, itemCatName).then((response) => {
          const data = response.data.result;
          getCache.set(cacheName, data, [200000]);
          setItemList(response.data.result);
          console.log("Create Cache");
        });
      }
    } else {
      showSearchAPI_Func(sorting, column, keyword).then((response) => {
        setItemList(response.data.result);
      });
    }
    setIsLoading(false);
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
