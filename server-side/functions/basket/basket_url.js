const basket = "/basket";

const showBasket_url = basket + "/:userID";

const deleteBasket_url = basket + "/delete/:userID";

const getBasketCost_url = basket + "/totalCost/:userID";

module.exports = { showBasket_url, deleteBasket_url, getBasketCost_url };
