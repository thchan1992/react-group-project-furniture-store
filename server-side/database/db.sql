-- CREATE TABLE userCategory
-- (
--     userType TEXT PRIMARY KEY NOT NULL,
--     userCatName TEXT NULL
-- );

-- INSERT INTO userCategory
--     (userType, userCatName)
-- VALUES
--     ("A", "ADMIN"),
--     ("C", "CUSTOMER");

-- CREATE TABLE userDetail
-- (
--     userID INTEGER PRIMARY KEY NOT NULL,
--     userType TEXT NOT NULL,
--     userEmail TEXT NULL,
--     firstName TEXT NULL,
--     lastName TEXT NULL,
--     userAddress TEXT NULL,
--     userPass TEXT NULL,
--     FOREIGN KEY (userType) REFERENCES userCategory(userType)
-- );

-- INSERT INTO userDetail
--     (userID,userType,userEmail,firstName, lastName, userAddress,userPass )
-- VALUES
--     (1, "C", "bob_uwl@uwl.ac.uk", "BOB", "UWL", "W5 EALING", "1234" ),
--     (2, "C", "jenny_uwl@uwl.ac.uk", "JENNY", "JAN", "W1 EALING", "1235" ),
--     (3, "C", "pepsi_uwl@uwl.ac.uk", "PEPSI", "FEB", "W2 EALING", "1236" ),
--     (4, "C", "coca_uwl@uwl.ac.uk", "COCA", "MAR", "W3 EALING", "1237" ),
--     (5, "C", "monica_uwl@uwl.ac.uk", "MONICA", "JUNE", "W4 EALING", "1238" ),
--     (6, "C", "fanta_uwl@uwl.ac.uk", "FANTA", "JULY", "W6 EALING", "1239" ),
--     (7, "C", "weather_uwl@uwl.ac.uk", "WEATHER", "DEC", "W7 EALING", "1240" ),
--     (8, "A", "tom_uwl@uwl.ac.uk", "TOM", "JERRY", "TW9 RICHMOND", "hello" );

-- CREATE TABLE itemCategory
-- (
--     itemCatID INTEGER PRIMARY KEY NOT NULL,
--     itemCatName TEXT NULL
-- );

-- INSERT INTO itemCategory
--     (itemCatID, itemCatName)
-- VALUES
--     (1, "SOFA"),
--     (2, "COFFEE TABLE"),
--     (3, "DINNER TABLE"),
--     (4, "SIDEBOARD");

-- CREATE TABLE itemDetails
-- (
--     itemDetID INTEGER NOT NULL,
--     itemCatID INTEGER NOT NULL,
--     itemPrice INTEGER NULL,
--     itemThreshold INTEGER NULL,
--     itemQty INTEGER NULL,
--     itemName TEXT NULL,
--     itemDesp TEXT NULL,
--     itemUrl TEXT NULL,
--     PRIMARY KEY (itemDetID,itemCatID),
--     FOREIGN KEY (itemCatID) REFERENCES itemCategory(itemCatID)
-- );

-- INSERT INTO itemDetails
--     (itemDetID,itemCatID,itemPrice,itemThreshold,itemQty,itemName,itemDesp)
-- VALUES
--     (1, 1, 500, 3, 8, "Sofa Blue", "Leather blue sofa, 4 seater"),
--     (2, 1, 100, 3, 8, "Sofa Grey", "Fabric grey sofa, 4 seater"),
--     (3, 2, 100, 3, 8, "Coffee Table Wood", "Wood coffee table, 110cm Width x 25cm Height"),
--     (4, 2, 300, 3, 8, "Coffee Table Solid Elm and Metal", "Solid elm and metal coffee table, 140cm Width x 35cm Height"),
--     (5, 3, 600, 3, 8, "Dinner Table Marbel", "Marbel dinner table, size 6 people"),
--     (6, 3, 100, 3, 8, "Dinner Table Solid Oak", "Solid Oak Dinner Table, size 6 people"),
--     (7, 4, 200, 3, 8, "Sideboard Oak", "Oak sideboard, 118cm Width x 80cm Height"),
--     (8, 4, 250, 3, 8, "Sideboard Glass", "Sideboard with glass, 100cm Width x 88cm Height");

-- CREATE TABLE basket
-- (
--     userID INTEGER NOT NULL,
--     itemDetID INTEGER NOT NULL,
--     itemCatID INTEGER NOT NULL,
--     basketItemID INTEGER NULL,
--     itemPrice INTEGER NULL,
--     itemBasketQty INTEGER NULL,
--     PRIMARY KEY (userID,itemDetID),
--     FOREIGN KEY (userID) REFERENCES userDetail(userID),
--     FOREIGN KEY(itemDetID,itemCatID) REFERENCES itemDetails(itemDetID,itemCatID)
-- );

-- CREATE TABLE paymentMethod
-- (
--     payMetID INTEGER PRIMARY KEY NOT NULL,
--     payMetName TEXT NULL
-- );

-- INSERT INTO paymentMethod
--     (payMetID , payMetName)
-- VALUES
--     (1, "VISA DEBIT"),
--     (2, "MASTER DEBIT");

-- CREATE TABLE paymentDetail
-- (
--     cardNumber INTEGER NOT NULL,
--     payMetID INTEGER NOT NULL,
--     userID INTEGER NOT NULL,
--     expire_Date TEXT NULL,
--     ccv INTEGER NULL,
--     funds INTEGER NULL,
--     PRIMARY KEY (cardNumber),
--     FOREIGN KEY (payMetID) REFERENCES paymentMethod(payMetID),
--     FOREIGN KEY (userID) REFERENCES userDetail(userID)
-- );

-- INSERT INTO paymentDetail
--     (cardNumber,payMetID,userID,expire_Date,ccv,funds)
-- VALUES
--     (1000000000000000, 1, 1, "09-SEP-2024", 123, 1000),
--     (1000000000000001, 1, 2, "09-SEP-2024", 124, 200),
--     (1000000000000002, 1, 3, "09-SEP-2024", 125, 1000),
--     (1000000000000003, 1, 4, "09-SEP-2024", 126, 1000),
--     (1000000000000004, 1, 5, "09-SEP-2024", 127, 1000),
--     (1000000000000005, 1, 6, "09-SEP-2024", 128, 1000),
--     (1000000000000006, 2, 7, "09-SEP-2024", 129, 1000);

-- CREATE TABLE sales
-- (
--     basketItemID INTEGER NOT NULL,
--     userID INTEGER NOT NULL,
--     itemDetID INTEGER NOT NULL,
--     itemCatID INTEGER NULL,
--     itemPrice INTEGER NULL,
--     itemBasketQty INTEGER NULL,
--     deliveryDate TEXT NULL,
--     orderDate TEXT NULL,
--     PRIMARY KEY (basketItemID,userID,itemDetID),
--     FOREIGN KEY (userID,itemDetID) REFERENCES basket(userID,itemDetID)
-- );

-- CREATE TABLE suppliers
-- (
--     suppID INTEGER PRIMARY KEY NOT NULL,
--     suppName TEXT NULL
-- );

-- INSERT INTO suppliers
--     (suppID ,suppName)
-- VALUES
--     (1, "JK"),
--     (2, "IK"),
--     (3, "HD"),
--     (4, "BU");

-- CREATE TABLE suppOrder
-- (
--     suppOrdID INTEGER NOT NULL,
--     suppID INTEGER NOT NULL,
--     itemDetID INTEGER NOT NULL,
--     itemCatID INTEGER NOT NULL,
--     suppOrdQty INTEGER NULL,
--     PRIMARY KEY (suppOrdID,suppID),
--     FOREIGN KEY (suppID) REFERENCES suppliers(suppID),
--     FOREIGN KEY(itemDetID,itemCatID) REFERENCES itemDetails(itemDetID,itemCatID)
-- );

-- INSERT INTO suppOrder
--     (suppOrdID,suppID,itemDetID,itemCatID,suppOrdQty)
-- VALUES
--     (1, 1, 1, 1, 8),
--     (2, 2, 2, 1, 8),
--     (3, 1, 3, 2, 8),
--     (4, 2, 4, 2, 8),
--     (5, 1, 5, 3, 8),
--     (6, 2, 6, 3, 8),
--     (7, 1, 7, 4, 8),
--     (8, 2, 8, 4, 8);



-- BEGIN;
-- CREATE TABLE paymentDetail_new
-- (
--     cardNumber INTEGER NOT NULL,
--     payMetID INTEGER NOT NULL,
--     userID INTEGER NOT NULL,
--     expire_Date TEXT NULL,
--     ccv INTEGER NULL,
--     funds INTEGER CHECK (funds >= 0),
--     PRIMARY KEY (cardNumber),
--     FOREIGN KEY (payMetID) REFERENCES paymentMethod(payMetID),
--     FOREIGN KEY (userID) REFERENCES userDetail(userID)
-- );
-- INSERT INTO paymentDetail_new SELECT * FROM paymentDetail;
-- DROP TABLE paymentDetail;
-- ALTER TABLE paymentDetail_new RENAME TO paymentDetail;
-- COMMIT;



-- BEGIN;
-- CREATE TABLE itemDetails_new
-- (
--     itemDetID INTEGER NOT NULL,
--     itemCatID INTEGER NOT NULL,
--     itemPrice INTEGER NULL,
--     itemThreshold INTEGER NULL,
--     itemQty INTEGER CHECK (itemQty >= 0),
--     itemName TEXT NULL,
--     itemDesp TEXT NULL,
--     itemUrl TEXT NULL,
--     PRIMARY KEY (itemDetID,itemCatID),
--     FOREIGN KEY (itemCatID) REFERENCES itemCategory(itemCatID)
-- );
-- INSERT INTO itemDetails_new SELECT * FROM itemDetails;
-- DROP TABLE itemDetails;
-- ALTER TABLE itemDetails_new RENAME TO itemDetails;
-- COMMIT;


-- BEGIN;
-- CREATE TABLE sales_new
-- (
--     basketItemID INTEGER NOT NULL,
--     userID INTEGER NOT NULL,
--     itemDetID INTEGER NOT NULL,
--     itemCatID INTEGER NULL,
--     itemPrice INTEGER NULL,
--     itemBasketQty INTEGER NULL,
--     deliveryDate TEXT NULL,
--     orderDate TEXT NULL,
--     PRIMARY KEY (basketItemID,userID,itemDetID)
  
-- );
-- INSERT INTO sales_new SELECT * FROM sales;
-- DROP TABLE sales;
-- ALTER TABLE sales_new RENAME TO sales;
-- COMMIT;


-- select * from basket where userID = 6;

-- update itemDetails SET itemQty = 10 where itemDetID = 3;

-- select * from itemDetails;
-- select * from userDetail;
-- select * from basket;
-- select * from paymentDetail where userID = 1617571576478;

select * from sales;

delete from sales where basketItemID = 1618654248025;

select sum(itemPrice * itemBasketQty), orderDate from sales group by orderDate BETWEEN '2021-04-06' AND '2021-04-09' ORDER BY orderDate;

select * from userDetail;

-- select basket.itemDetID, CASE WHEN itemQty - itemBasketQty <= itemThreshold THEN 'restock' ELSE 'good' END status FROM basket INNER JOIN itemDetails ON basket.itemDetID = itemDetails.itemDetID WHERE userID = 6;

select * from sales;


 SELECT userID, basketItemID, SUM(sales.itemPrice*itemBasketQty) AS totalCost, deliveryDate, orderDate from sales INNER JOIN itemDetails ON itemDetails.itemDetID = sales.itemDetID group by basketItemID having userID=1617571576478;

select * from sales;
-- select basket.itemDetID FROM basket INNER JOIN itemDetails ON basket.itemDetID = itemDetails.itemDetID WHERE userID = 6 AND itemQty - itemBasketQty <= itemThreshold;