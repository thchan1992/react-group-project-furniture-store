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
export const delImageAPI = host + "/deletePic/";

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
export const showOrdHistoryAPI = host + "/suppliers/orderHistory";

//update item stock
export const updateStockAPI = host + "/suppliers/updateStock";

//Show Sales Report
export const showSalesAPI = host + "/sales/report";

//Show Sales Summary Report
export const showSalesSummaryAPI = host + "/sales/reportSummary";