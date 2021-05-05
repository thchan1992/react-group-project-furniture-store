import React, { useEffect, useState } from "react";
import SortItem from "./sortItem";
import ProductList from "./productList";
import "./itemPage.css";

const ItemPage = ({
  setColumn,
  setSorting,
  setIsLoading,
  showSort,
  setShowSort,
  itemList,
  userID,
  userType,
  messageSetter,
}) => {
  return (
    <div>
      {itemList != [] && (
        <div>
          {" "}
          {/*Sorting button*/}
          <SortItem
            setColumn={setColumn}
            setSorting={setSorting}
            setIsLoading={setIsLoading}
            showSort={showSort}
            setShowSort={setShowSort}
          />
          {/* Show product list */}
          <ProductList
            itemList={itemList}
            userID={userID}
            userType={userType}
            setIsLoading={setIsLoading}
            messageSetter={messageSetter}
          />
        </div>
      )}
    </div>
  );
};
export default ItemPage;
