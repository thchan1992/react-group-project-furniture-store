var db = require("./../database/database.js");

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
      checkExistItem(userID, itemDetID, res, (tf) => {
        //if yes, update the itemQty only
        if (tf == true) {
          const newBasQty = Number(itemBasketQty) + Number(curBaskQty);
          console.log(itemDet.itemQty);
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
  db.get(
    "SELECT * FROM itemDetails WHERE itemDetID = ?",
    itemDetID,
    (err, result) => {
      if (err) {
        res.json({ error: err.message });
        return;
      }
      if (itemBasketQty > Number(result.itemQty)) {
        res.json({ message: "Please reduce the item QTY" });
        return;
      }

      callback(result);
    }
  );
};

const getBasket = (userID, itemDetID, res, callback) => {
  console.log(itemDetID);
  db.get(
    "SELECT basketItemID, itemBasketQty FROM basket WHERE userID = ? AND itemDetID =?",
    [userID, itemDetID],
    (err, result) => {
      console.log("1", result);
      //three situation:
      //1. user dont have basket nor product at all
      //2. user have basket with some product in the basket, and adding a same item to the basket
      //3. user have basket with some product in the basket, and adding a new item to the basket
      if (!result) {
        db.get(
          "SELECT basketItemID FROM basket WHERE userID =?",
          userID,
          (err, result) => {
            console.log("2", result);
            if (err) {
              res.json({ error: err.message });
              return;
            }
            if (!result) {
              //if users havent got a basket, create a new basket for the user
              const basketItemID = new Date().getTime();
              console.log(basketItemID);
              callback(basketItemID, null);
            } else {
              const basketItemID = result.basketItemID;
              const itemBasketQty = result.itemBasketQty;
              console.log(basketItemID);
              callback(basketItemID, itemBasketQty);
            }
          }
        );
      } else {
        //return the exisitng basket id
        const basketItemID = result.basketItemID;
        const itemBasketQty = result.itemBasketQty;
        console.log(basketItemID);
        callback(basketItemID, itemBasketQty);
      }
    }
  );
};

const checkExistItem = (userID, itemDetID, res, callback) => {
  const params = [userID, itemDetID];
  db.get(
    "SELECT * from basket WHERE userID = ? AND itemDetID = ?",
    params,
    (err, result) => {
      if (err) {
        res.json({ error: err.message });
        return;
      }
      if (!result) {
        callback(false);
      } else {
        callback(true);
      }
    }
  );
};

const updateBasketItem = (itemBasketQty, userID, itemDetID, res) => {
  const params = [itemBasketQty, userID, itemDetID];

  db.run(
    "UPDATE basket SET itemBasketQty = ? WHERE userID = ? AND itemDetID = ?",
    params,
    (err) => {
      if (err) {
        res.json({ error: err.message });
        return;
      }
      res.json({ message: "item has been updated(1)" });
      return;
    }
  );
};

const insertItem = (params, res) => {
  db.run(
    "INSERT INTO basket (itemDetID, itemCatID, userID, basketItemID, itemBasketQty, itemPrice) VALUES(?, ?, ?, ?, ?, ?)",
    params,
    (err) => {
      if (err) {
        res.json({ error: err.message });
        return;
      }
      res.json({ message: "item has been added to the basket" });
    }
  );
};

module.exports = {
  addBasketItem,
};
