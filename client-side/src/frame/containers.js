import { Route, Switch, Redirect } from "react-router-dom";
import React from "react";
import ItemPage from "../container/item/itemPage";
import SignUp from "../container/signup/signup";
import NewItem from "../container/item/newItem";
import SupplierOrd from "../container/supplier/supplierOrd";
import SalesReport from "../container/sales/salesReport";
import SalesSummary from "../container/sales/salesSummary";
import Supplier from "../container/supplier/supplier";
import Category from "../container/category/category";
import User from "../container/user/user";
import Basket from "../container/basket/basket";
import Payment from "../container/payment/payment";
import Confirmation from "../container/payment/confirmation";
import Order from "../container/order/order";
import Item from "../container/item/item";
import Home from "../Utility/home";
import NotFound from "../Utility/error";
import OrderDetail from "../container/order/orderDetail";

const Component = ({ user, keyword, caterList, messageSetter }) => {
  return (
    <Switch>
      <Route exact path="/">
        <Redirect to="/home" />
      </Route>
      {caterList.map((data) => (
        <Route exact path={"/item/" + data.itemCatName} key={data.itemCatID}>
          <ItemPage
            itemCatName={data.itemCatName}
            userType={user.userType}
            userID={user.userID}
            keyword={null}
            messageSetter={messageSetter}
          />
        </Route>
      ))}
      <Route exact path={"/item/search/" + { keyword }}>
        <ItemPage
          itemCatName={null}
          userType={user.userType}
          userID={user.userID}
          keyword={keyword}
          key={new Date().getTime()}
          messageSetter={messageSetter}
        />
      </Route>
      <Route exact path="/AddItem">
        <NewItem messageSetter={messageSetter} />
      </Route>
      <Route exact path="/SuppOrderList">
        <SupplierOrd messageSetter={messageSetter} />
      </Route>
      <Route exact path="/Sales">
        <SalesReport messageSetter={messageSetter} />
      </Route>
      <Route exact path="/SalesSummary">
        <SalesSummary messageSetter={messageSetter} />
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
        <User messageSetter={messageSetter} />
      </Route>
      <Route exact path="/Basket/:userID">
        <Basket messageSetter={messageSetter} />
      </Route>
      <Route exact path="/Delivery">
        <Payment userID={user.userID} messageSetter={messageSetter} />
      </Route>
      <Route exact path="/Basket/Payment/Confirmation">
        <Confirmation userID={user.userID} messageSetter={messageSetter} />
      </Route>
      <Route exact path="/User/Order/:userID">
        <Order messageSetter={messageSetter} />
      </Route>
      <Route exact path="/Home">
        <Home userType={user.userType} />
      </Route>
      <Route exact path="/Item_detail/:itemDetID">
        <Item
          userID={user.userID}
          userType={user.userType}
          messageSetter={messageSetter}
          key={new Date().getTime()}
        />
      </Route>{" "}
      <Route exact path="/User/Order/Detail/:basketItemID">
        <OrderDetail userID={user.userID} messageSetter={messageSetter} />
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
