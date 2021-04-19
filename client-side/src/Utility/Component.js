import Item from "../showItemList/Item";
import SignUp from "../signup/SignUp";
import AddItem from "../addItem/AddItem";
import SuppOrderList from "../Item/SuppOrderList";
import Sales from "../Item/Sales";
import SalesSummary from "../Item/SalesSummary";
import { Route, Switch } from "react-router-dom";
import React, { useEffect, useState } from "react";
import EmailJS from "../Item/EmailJS";
import Supplier from "../manageSupp/Supplier";
import Category from "../manageCat/Category";
import ShowUser from "../manageAcc/ShowUser";
import Basket from "../basket/Basket";
import Payment from "../paymentSys/Payment";
import Confirmation from "../paymentSys/Confirmation";

const Component = ({ userType, userID, keyword, caterList }) => {
  const itemData = { itemName: "React", itemDetIDs: 1234, itemQty: 5 };
  return (
    <Switch>
      {caterList.map((data) => (
        <Route exact path={"/item/" + data.itemCatName} key={data.itemCatID}>
          <Item
            itemCatName={data.itemCatName}
            userType={userType}
            userID={userID}
            keyword={null}
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
        />
      </Route>
      <Route exact path="/AddItem">
        <AddItem userType={userType} />
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
      {userType == "A" && (
        <Route exact path="/EmailJS">
          <EmailJS userType={userType} itemData={itemData} />
        </Route>
      )}
      <Route exact path="/SignUp">
        <SignUp userType={userType} />
      </Route>
      {userType == "A" && (
        <Route exact path="/AdminSignUp">
          <SignUp userType={userType} />
        </Route>
      )}
      {userType == "A" && (
        <Route exact path="/Supplier">
          <Supplier />
        </Route>
      )}
      {userType == "A" && (
        <Route exact path="/Category">
          <Category />
        </Route>
      )}
      {
        <Route exact path="/ShowUser">
          <ShowUser userID={userID} />
        </Route>
      }
      <Route exact path="/Basket">
        <Basket userID={userID} />
      </Route>
      <Route exact path="/Basket/Payment">
        <Payment userID={userID} />
      </Route>
      <Route exact path="/Basket/Payment/Confirmation">
        <Confirmation userID={userID} />
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
