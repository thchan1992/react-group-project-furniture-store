import Item from "../container/item/itemPage";
import SignUp from "../container/signup/signup";
import AddItem from "../container/item/newItem";
import SuppOrderList from "../container/supplier/supplierOrd";
import Sales from "../container/sales/SalesReport";
import SalesSummary from "../container/sales/SalesSummary";
import { Route, Switch, Redirect } from "react-router-dom";
import React, { useEffect, useState } from "react";

import Supplier from "../container/supplier/supplier";
import Category from "../container/category/category";
import ShowUser from "../container/user/user";
import Basket from "../container/basket/basket";
import Payment from "../container/payment/payment";
import Confirmation from "../container/payment/confirmation";
import ViewOrder from "../container/order/order";
import ShowItem from "../container/item/item";
import Home from "./Home";
import NotFound from "./error";
import ViewOrderDetail from "../container/order/orderDetail";

const Component = ({
  userType,
  userID,
  keyword,
  caterList,
  messageSetter,
  isLogin,
}) => {
  return (
    <Switch>
      {caterList.map((data) => (
        <Route exact path={"/item/" + data.itemCatName} key={data.itemCatID}>
          <Item
            itemCatName={data.itemCatName}
            userType={userType}
            userID={userID}
            keyword={null}
            messageSetter={messageSetter}
          />
        </Route>
      ))}
      <Route exact path={"/item/search/" + { keyword }}>
        <Item
          itemCatName={null}
          userType={userType}
          userID={userID}
          keyword={keyword}
          key={new Date().getTime()}
          messageSetter={messageSetter}
        />
      </Route>
      <Route exact path="/AddItem">
        <AddItem userType={userType} messageSetter={messageSetter} />
      </Route>
      {userType == "A" && (
        <Route exact path="/SuppOrderList">
          <SuppOrderList userType={userType} />
        </Route>
      )}
      {userType == "A" && (
        <Route exact path="/Sales">
          <Sales userType={userType} />
        </Route>
      )}
      {userType == "A" && (
        <Route exact path="/SalesSummary">
          <SalesSummary userType={userType} />
        </Route>
      )}
      <Route exact path="/SignUp">
        <SignUp userType={userType} messageSetter={messageSetter} />
      </Route>
      {userType == "A" && (
        <Route exact path="/AdminSignUp">
          <SignUp userType={userType} messageSetter={messageSetter} />
        </Route>
      )}
      {userType == "A" && (
        <Route exact path="/Supplier">
          <Supplier messageSetter={messageSetter} />
        </Route>
      )}
      {userType == "A" && (
        <Route exact path="/Category">
          <Category messageSetter={messageSetter} />
        </Route>
      )}
      {
        <Route exact path="/ShowUser/:userID">
          <ShowUser messageSetter={messageSetter} />
        </Route>
      }
      <Route exact path="/Basket/:userID">
        <Basket messageSetter={messageSetter} />
      </Route>
      <Route exact path="/Basket/Payment">
        <Payment userID={userID} messageSetter={messageSetter} />
      </Route>
      <Route exact path="/Basket/Payment/Confirmation">
        <Confirmation userID={userID} />
      </Route>
      <Route exact path="/User/Order/:userID">
        <ViewOrder />
      </Route>
      <Route exact path="/Home">
        <Home />
      </Route>
      <Route exact path="/Item_detail/:itemDetID">
        <ShowItem
          userID={userID}
          userType={userType}
          messageSetter={messageSetter}
        />
      </Route>{" "}
      <Route exact path="/User/Order/Detail/:basketItemID">
        <ViewOrderDetail userID={userID} messageSetter={messageSetter} />
      </Route>
      <Route exact path="/error">
        <NotFound />
      </Route>
      <Route
        render={function () {
          return <p>Page Not found</p>;
        }}
      />
    </Switch>
  );
};
export default Component;
