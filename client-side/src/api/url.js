//Please check the backend functions folder and see how the API works

//the host
export const host = "http://localhost:8080";

//show the catergory list
export const showCaterAPI = host + "/item/showCater";

//Log in/out API
export const loginAPI = host + "/login/";

export const logoutAPI = host + "/logout/";

//User registration API
export const signUpAPI = host + "/signUp/";

export const signUpAdminAPI = signUpAPI + "admin";

//upload Image API
export const uploadImageAPI = host + "/item/uploadImage/";

//Delete a picture of image in the backend
export const delImageAPI = host + "/item/deletePic/";

//Add a new product API
export const addItemAPI = host + "/item/addItem/";

//Show a list of product
export const showItemsAPI = host + "/item/showItems/";

export const showSearchAPI = host + "/item/search/";

//Modify item
export const editItemAPI = host + "/item/editProducts";

//Show a list of Orders
export const addSuppOrderAPI = host + "/suppliers/newOrder";

//Show Supplier List
export const showSuppAPI = host + "/suppliers/";

//Updates Receive Date
export const updateRecDateAPI = host + "/suppliers/orderReceived";

//Show Order History
export const showOrdHistoryAPI = host + "/suppliers/ordersHistory";

//update item stock
export const updateStockAPI = host + "/suppliers/updateStock";

//Show Sales Report
export const showSalesAPI = host + "/sales/report";

//Show Sales Summary Report
export const showSalesSummaryAPI = host + "/sales/reportSummary";

export const fetchSalesAPI = host + "/sales/";

export const fetchSalesCostAPI = host + "/sales/totalCost/";

export const fetchBasketAPI = host + "/basket/";

export const totalCostAPI = host + "/basket/totalCost/";

//show user detail
export const updateUserDetAPI = host + "/account/personalDetails/edit";

export const modifyCardAPI = host + "/account/paymentEdit";

export const fetchUserDetAPI = host + "/account/personalDetails/";

export const fetchUserPayDetAPI = host + "/account/paymentDetails/";
//show payment met list
export const fetchPayMetAPI = host + "/payMet/";

export const addCatAPI = host + "/item/addCater";

export const modifyCatAPI = host + "/item/editCater/";

export const addSuppAPI = host + "/suppliers/addSupplier";

export const modifySuppAPI = host + "/suppliers/edit/";

export const checkFundAPI = host + "/payment/checkFund";

export const checkStockAPI = host + "/payment/checkStock/";

export const finalisePayAPI = host + "/payment/finalise";

export const getCostBaskAPI = host + "/payment/getCostAndBaskID/";

export const checkThresholdAPI = host + "/item/checkThreshold/";

export const deleteBaskAPI = host + "/basket/delete/";

export const checkExistPayDetAPI = host + "/checkPayDet/";

export const modifyBasketAPI = host + "/basket/editBasket";

export const addBaskItemAPI = host + "/basket/addBasketItem";

export const getItemDetAPI = host + "/itemDetail/";

export const getUserOrdAPI = host + "/account/userOrder/";

export const setItemImageAPI = host + "/item/setImageUrl/";
