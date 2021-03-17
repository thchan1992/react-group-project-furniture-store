//Please check the backend functions folder and see how the API works

//the host
export const host = "http://localhost:8080";

//show the catergory list
export const showCaterAPI = host + "/item/showCater";

//Log in/out API
export const loginAPI = host + "/login/";

export const logoutAPI = host + "/logout/";

//User registration API
export const singUpAPI = host + "/signUp/";

//upload Image API
export const uploadImageAPI = host + "/item/uploadImage/";

//Delete a picture of image in the backend
export const delImageAPI = host + "/deletePic/";

//Add a new product API
export const addItemAPI = host + "/item/addItem/";

//Show a list of product
export const showItemsAPI = host + "/item/showItems/";
