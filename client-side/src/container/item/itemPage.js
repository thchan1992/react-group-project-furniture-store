import React, { useEffect, useState, useRef } from "react";
import { showItemsAPI_Func, showSearchAPI_Func } from "../../api/api";
import Component from "./component_itemPage/itemPage";

const ItemPage = ({
  itemCatName,
  userID,
  userType,
  keyword,
  messageSetter,
}) => {
  const [sorting, setSorting] = useState("ASC");
  const [column, setColumn] = useState("itemName");
  const [itemList, setItemList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showSort, setShowSort] = useState("Item Name (A to Z)");
  const getCache = require("localstorage-ttl");

  const fetchItem = () => {
    //if this component received no keyword, then it will fetch a list of product
    if (!keyword) {
      //create a name for the cache file
      const cacheName = itemCatName + ":" + showSort;
      //ignore the cache file when user is admin
      if (userType == "A") {
        showItemsAPI_Func(sorting, column, itemCatName).then((response) => {
          if (response.data.error) {
            messageSetter(response.data.error, "danger", true);
            return;
          }
          setItemList(response.data.result);
        });
        return;
      }
      //if the same cache does exist
      if (getCache.get(cacheName)) {
        //take the product list from the cache file
        const data = getCache.get(cacheName);
        setItemList(data);
        console.log("Used Cache");
      } else {
        //if it does not exist, call a api to fetch a product list
        showItemsAPI_Func(sorting, column, itemCatName).then((response) => {
          if (response.data.error) {
            messageSetter(response.data.error, "danger", true);
            return;
          }
          const data = response.data.result;
          //and store this list in the local storage, and set it to be expired in around 1 minute
          getCache.set(cacheName, data, [90000]);
          filterList(response.data.result);
          console.log("Created Cache");
        });
      }
    } else {
      //If there is a keyword, api will get a list of item that containing that key word
      showSearchAPI_Func(sorting, column, keyword).then((response) => {
        if (response.data.error) {
          messageSetter(response.data.error, "danger", true);
          return;
        }
        setItemList(response.data.result);
      });
    }
    setIsLoading(false);
  };

  //a filter function to filter out any item whose threshold is zero which means it is not for sales and should be hiden from the user
  const filterList = (result) => {
    if (userType != "A") {
      result = result.filter((data) => {
        return data.itemThreshold > 0;
      });
      setItemList(result);
    } else {
      setItemList(result);
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
      {" "}
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

export default ItemPage;
