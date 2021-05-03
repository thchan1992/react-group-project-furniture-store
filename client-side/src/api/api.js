import axios from "axios";

import {
  signUpAPI,
  signUpAdminAPI,
  addItemAPI,
  addSuppOrderAPI,
  uploadImageAPI,
  showCaterAPI,
  showSuppAPI,
  fetchBasketAPI,
  totalCostAPI,
  loginAPI,
  logoutAPI,
  fetchUserDetAPI,
  modifyCardAPI,
  updateUserDetAPI,
  fetchUserPayDetAPI,
  fetchPayMetAPI,
  addCatAPI,
  modifyCatAPI,
  addSuppAPI,
  modifySuppAPI,
  checkFundAPI,
  checkStockAPI,
  finalisePayAPI,
  getCostBaskAPI,
  fetchSalesAPI,
  fetchSalesCostAPI,
  checkThresholdAPI,
  deleteBaskAPI,
  showItemsAPI,
  showSearchAPI,
  checkExistPayDetAPI,
  modifyBasketAPI,
  addBaskItemAPI,
  showOrdHistoryAPI,
  updateStockAPI,
  showSalesAPI,
  showSalesSummaryAPI,
  editItemAPI,
  delImageAPI,
  getItemDetAPI,
  getUserOrdAPI,
  setItemImageAPI,
} from "./url";

import { jwt, jwt_img } from "./jwtHeader";

export const signUpAPIFunc = (newUser) => {
  return axios.post(signUpAPI, newUser);
};

//AddItem.js
export const addItemAPIFunc = (newItem) => {
  return axios.post(addItemAPI, newItem, jwt());
};

export const addSuppOrderAPIFunc = (newOrder) => {
  return axios.post(addSuppOrderAPI, newOrder, jwt());
};

export const uploadImageAPIFunc = (fd) => {
  return axios.post(uploadImageAPI, fd, jwt_img());
};

export const showCaterAPI_Func = () => {
  return axios.get(showCaterAPI);
};

export const showSuppAPI_Func = () => {
  return axios.get(showSuppAPI, jwt());
};

//Basket.js
export const fetchBasketAPI_Func = (userID) => {
  return axios.get(fetchBasketAPI + userID, jwt());
};

export const totalCostAPI_Func = (userID) => {
  return axios.get(totalCostAPI + userID, jwt());
};

//login.js
export const loginAPI_Func = (user) => {
  return axios.post(loginAPI, user);
};

export const checkSessionAPI_Func = () => {
  return axios.get(loginAPI, jwt());
};

export const logoutAPI_Func = () => {
  return axios.get(logoutAPI, jwt());
};

//ShowUser.js
export const updateUserDetAPI_Func = (newData) => {
  return axios.put(updateUserDetAPI, newData, jwt());
};

export const modifyCardAPI_Func = (newCard) => {
  return axios.put(modifyCardAPI, newCard, jwt());
};

export const fetchUserDetAPI_Func = (userID) => {
  return axios.get(fetchUserDetAPI + userID, jwt());
};

export const fetchUserPayDet_Func = (userID) => {
  return axios.get(fetchUserPayDetAPI + userID, jwt());
};

export const fetchPayMetAPI_Func = () => {
  return axios.get(fetchPayMetAPI);
};

//ShowCat.js
export const addCatAPI_Func = (newCat) => {
  return axios.post(addCatAPI, newCat, jwt());
};

//AddCat.js
export const modifyCatAPI_Func = (newData) => {
  return axios.put(modifyCatAPI, newData, jwt());
};

//AddSup.js
export const addSupp_Func = (newSup) => {
  return axios.post(addSuppAPI, newSup, jwt());
};
//EditSup.js
export const modifySuppAPI_Func = (newData) => {
  return axios.put(modifySuppAPI, newData, jwt());
};

//Payment.js
export const checkFundAPI_Func = (checkFund) => {
  return axios.post(checkFundAPI, checkFund, jwt());
};

export const checkStockAPI_Func = (userID) => {
  return axios.get(checkStockAPI + userID, jwt());
};

export const finalisePayAPI_Func = (finalisePay) => {
  return axios.put(finalisePayAPI, finalisePay, jwt());
};

export const getCostBaskAPI_Func = (userID) => {
  return axios.get(getCostBaskAPI + userID, jwt());
};

//Confirmation.js
export const fetchSalesAPI_Func = (basketItemID, userID) => {
  return axios.get(fetchSalesAPI + basketItemID + "/" + userID, jwt());
};

export const fetchSalesCostAPI_Func = (basketItemID, userID) => {
  return axios.get(fetchSalesCostAPI + basketItemID + "/" + userID);
};

export const checkThresholdAPI_Func = (userID) => {
  return axios.get(checkThresholdAPI + userID);
};

export const deleteBaskAPI_Func = (userID) => {
  return axios.delete(deleteBaskAPI + userID, jwt());
};

//Item.js
export const showItemsAPI_Func = (sorting, column, itemCatName) => {
  return axios.get(showItemsAPI + sorting + "/" + column + "/" + itemCatName);
};

export const showSearchAPI_Func = (sorting, column, keyword) => {
  return axios.get(showSearchAPI + sorting + "/" + column + "/" + keyword);
};

//SignUp.js
export const checkExistPayDetAPI_Func = (cardNumber) => {
  return axios.get(checkExistPayDetAPI + cardNumber);
};

export const signUpAdminAPI_Func = (newUser) => {
  return axios.post(signUpAdminAPI, newUser, jwt());
};

export const modifyBasketAPI_Func = (newData) => {
  return axios.put(modifyBasketAPI, newData, jwt());
};

export const addBaskItemAPI_Func = (newData) => {
  return axios.put(addBaskItemAPI, newData, jwt());
};

//SuppOrderList.js
export const showOrdHistoryAPI_Func = (dateTo, dateFrom) => {
  const dateRange = { dateTo, dateFrom };
  return axios.post(showOrdHistoryAPI, dateRange, jwt());
};

export const updateStockAPI_Func = (newData) => {
  return axios.put(updateStockAPI, newData, jwt());
};

//SalesReport.js
export const showSalesAPI_Func = (sorting, column, dateFrom, dateTo) => {
  return axios.get(
    showSalesAPI + "/" + sorting + "/" + column + "/" + dateFrom + "/" + dateTo,
    jwt()
  );
};

//SalesSummary.js
export const showSalesSummaryAPI_Func = (dateFrom, dateTo) => {
  return axios.get(showSalesSummaryAPI + "/" + dateFrom + "/" + dateTo, jwt());
};

//showitem.js
export const editItemAPI_Func = (newData) => {
  return axios.put(editItemAPI, newData, jwt());
};

export const delImageAPI_Func = (itemDetID) => {
  return axios.delete(delImageAPI + itemDetID, jwt());
};

export const getItemDetAPI_Func = (itemDetID) => {
  return axios.get(getItemDetAPI + itemDetID);
};

//vieworder.js
export const getUserOrdAPI_Func = (userID) => {
  return axios.get(getUserOrdAPI + userID, jwt());
};

export const setItemImageAPI_Func = (newData) => {
  return axios.post(setItemImageAPI, newData, jwt());
};
