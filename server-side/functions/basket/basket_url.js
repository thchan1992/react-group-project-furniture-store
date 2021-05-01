const basket = "/basket";

const showBasket_url = basket + "/:userID";

const deleteBasket_url = basket + "/delete/:userID";

const getBasketCost_url = basket + "/totalCost/:userID";

const editBasket_url = basket + "/editBasket";

const addBasketItem_url = basket + "/addBasketItem";

module.exports = {
  showBasket_url,
  deleteBasket_url,
  getBasketCost_url,
  editBasket_url,
  addBasketItem_url,
};
