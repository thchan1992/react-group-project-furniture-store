import React, { useEffect, useState, useRef } from "react";
import { showItemsAPI_Func, showSearchAPI_Func } from "../../api/api";
import Component from "./component_itemPage/itemPage";
import { showItemsAPI } from "../../api/api";
import { authChecker } from "../../Utility/authChecker";
import { useHistory } from "react-router-dom";

const ItemPage = ({
  itemCatName,
  userID,
  userType,
  keyword,
  messageSetter,
}) => {
  const history = useHistory();
  const [sorting, setSorting] = useState("ASC");
  const [column, setColumn] = useState("itemName");
  const [itemList, setItemList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showSort, setShowSort] = useState("Item Name (A to Z)");
  const getCache = require("localstorage-ttl");
  //Function to fetch the sorted items
  const fetchItem = () => {
    if (!keyword) {
      const cacheName = itemCatName + ":" + showSort;
      if (getCache.get(cacheName)) {
        const data = getCache.get(cacheName);
        setItemList(data);
        console.log("Use Cache");
      } else {
        showItemsAPI_Func(sorting, column, itemCatName).then((response) => {
          if (response.data.error) {
            messageSetter(response.data.error, "danger", true);
            return;
          }

          const data = response.data.result;
          getCache.set(cacheName, data, [1]);
          filterList(response.data.result);
          console.log("Create Cache");
        });
      }
    } else {
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
