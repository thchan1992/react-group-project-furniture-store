import Item from "../container/item/itemPage";
import SignUp from "../container/signup/signup";
import AddItem from "../container/item/newItem";
import SuppOrderList from "../container/supplier/supplierOrd";
import Sales from "../container/sales/salesReport";
import SalesSummary from "../container/sales/salesSummary";
import { Route, Switch } from "react-router-dom";
import React from "react";

import Supplier from "../container/supplier/supplier";
import Category from "../container/category/category";
import ShowUser from "../container/user/user";
import Basket from "../container/basket/basket";
import Payment from "../container/payment/payment";
import Confirmation from "../container/payment/confirmation";
import ViewOrder from "../container/order/order";
import ShowItem from "../container/item/items";
import Home from "../Utility/home";
import NotFound from "../Utility/error";
import ViewOrderDetail from "../container/order/orderDetail";

const Component = ({ user, keyword, caterList, messageSetter }) => {
  return (
    <Switch>
      {caterList.map((data) => (
        <Route exact path={"/item/" + data.itemCatName} key={data.itemCatID}>
          <Item
            itemCatName={data.itemCatName}
            userType={user.userType}
            userID={user.userID}
            keyword={null}
            messageSetter={messageSetter}
          />
        </Route>
      ))}
      <Route exact path={"/item/search/" + { keyword }}>
        <Item
          itemCatName={null}
          userType={user.userType}
          userID={user.userID}
          keyword={keyword}
          key={new Date().getTime()}
          messageSetter={messageSetter}
        />
      </Route>
      <Route exact path="/AddItem">
        <AddItem messageSetter={messageSetter} />
      </Route>
      <Route exact path="/SuppOrderList">
        <SuppOrderList />
      </Route>
      <Route exact path="/Sales">
        <Sales />
      </Route>
      <Route exact path="/SalesSummary">
        <SalesSummary />
      </Route>
      <Route exact path="/SignUp">
        <SignUp userType={user.userType} messageSetter={messageSetter} />
      </Route>
      <Route exact path="/Supplier">
        <Supplier messageSetter={messageSetter} />
      </Route>
      <Route exact path="/Category">
        <Category messageSetter={messageSetter} userType={user.userType} />
      </Route>
      <Route exact path="/ShowUser/:userID">
        <ShowUser messageSetter={messageSetter} />
      </Route>
      <Route exact path="/Basket/:userID">
        <Basket messageSetter={messageSetter} />
      </Route>
      <Route exact path="/Delivery">
        <Payment userID={user.userID} messageSetter={messageSetter} />
      </Route>
      <Route exact path="/Basket/Payment/Confirmation">
        <Confirmation userID={user.userID} />
      </Route>
      <Route exact path="/User/Order/:userID">
        <ViewOrder />
      </Route>
      <Route exact path="/Home">
        <Home />
      </Route>
      <Route exact path="/Item_detail/:itemDetID">
        <ShowItem
          userID={user.userID}
          userType={user.userType}
          messageSetter={messageSetter}
        />
      </Route>{" "}
      <Route exact path="/User/Order/Detail/:basketItemID">
        <ViewOrderDetail userID={user.userID} messageSetter={messageSetter} />
      </Route>
      <Route
        render={function () {
          return <NotFound />;
        }}
      />
    </Switch>
  );
};
export default Component;
