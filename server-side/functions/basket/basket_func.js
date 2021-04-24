var db = require("../../database/database.js");
const { getAll, getOne, runCom } = require("../../configuration/generalFunc");

const {
  deleteBasketItem_sql,
  updateBasketItem_sql,
  addBasketItem_sql,
  fetchBasketItem_sql,
  getBasketID_sql,
  getBasketIDQty_sql,
  getItemDet_sql,
} = require("./basket_sql");

const addBasketItem = (itemDetID, userID, itemBasketQty, res) => {
  if (itemBasketQty > 10) {
    res.json({ message: "quanity cannot be greater than 10" });
    return;
  }
  //get the item detail
  fetchItemDet(itemDetID, res, itemBasketQty, (itemDet) => {
    //get the basket ID
    getBasket(userID, itemDetID, res, (basketItemID, curBaskQty) => {
      //check if the user has the same product in their basket
      checkExistItem(userID, itemDetID, res, (isAuthed) => {
        //if yes, update the itemQty only
        if (isAuthed == true) {
          const newBasQty = Number(itemBasketQty) + Number(curBaskQty);
          //either new basket qty is bigger than 10 or the new basQty is already bigger than the item stock, it will ask user to reduce the limit.
          if (newBasQty > 10 || newBasQty > itemDet.itemQty) {
            res.json({
              message:
                "Over the qty limit or we simply do not have enough stock for this order. please reduce the item quantity",
            });
            return;
          }
          updateBasketItem(newBasQty, userID, itemDetID, res);
        } else {
          //if no, add an item to the basket
          const params = [
            itemDetID,
            itemDet.itemCatID,
            userID,
            basketItemID,
            itemBasketQty,
            itemDet.itemPrice,
          ];
          insertItem(params, res);
        }
      });
    });
  });
};

const fetchItemDet = (itemDetID, res, itemBasketQty, callback) => {
  db.get(getItemDet_sql, itemDetID, (err, result) => {
    if (err) {
      res.json({ error: err.message });
      return;
    }
    if (itemBasketQty > Number(result.itemQty)) {
      res.json({ message: "Please reduce the item QTY" });
      return;
    }
    callback(result);
  });
};

const getBasket = (userID, itemDetID, res, callback) => {
  db.get(getBasketIDQty_sql, [userID, itemDetID], (err, result) => {
    //three situation:
    //1. user dont have basket nor product at all
    //2. user have basket with some product in the basket, and adding a same item to the basket
    //3. user have basket with some product in the basket, and adding a new item to the basket
    if (!result) {
      db.get(getBasketID_sql, userID, (err, result) => {
        if (err) {
          res.json({ error: err.message });
          return;
        }
        if (!result) {
          //if users havent got a basket, create a new basket for the user
          const basketItemID = new Date().getTime();
          callback(basketItemID, null);
        } else {
          const basketItemID = result.basketItemID;
          const itemBasketQty = result.itemBasketQty;
          callback(basketItemID, itemBasketQty);
        }
      });
    } else {
      //return the exisitng basket id
      const basketItemID = result.basketItemID;
      const itemBasketQty = result.itemBasketQty;
      callback(basketItemID, itemBasketQty);
    }
  });
};

const checkExistItem = (userID, itemDetID, res, callback) => {
  const params = [userID, itemDetID];
  db.get(fetchBasketItem_sql, params, (err, result) => {
    if (err) {
      res.json({ error: err.message });
      return;
    }
    if (!result) {
      callback(false);
    } else {
      callback(true);
    }
  });
};

const updateBasketItem = (itemBasketQty, userID, itemDetID, res) => {
  const params = [itemBasketQty, itemDetID, userID];
  runCom(updateBasketItem_sql, params, res, "item has been updated(1)");
};

const insertItem = (params, res) => {
  runCom(addBasketItem_sql, params, res, "item has been added to the basket");
};

//------other func
//edit basket item qty
const editBasket = (itemBasketQty, itemDetID, userID, res) => {
  if (itemBasketQty == 0) {
    runCom(
      deleteBasketItem_sql,
      [itemDetID, userID],
      res,
      "Item has been removed from the basket"
    );
  } else if (itemBasketQty > 10) {
    res.json({ message: "Cannot be greater than 10" });
  } else {
    runCom(
      updateBasketItem_sql,
      [itemBasketQty, itemDetID, userID],
      res,
      "Item has been updated in the basket"
    );
  }
};

module.exports = {
  addBasketItem,
  editBasket,
};
