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


-- INSERT INTO basket (itemDetID, itemCatID, userID, basketItemID, itemBasketQty, itemPrice) VALUES(1, 1, 1, 1, 1, 1);



-- UPDATE itemDetails SET itemQty = (SELECT itemQty-itemBasketQty FROM basket INNER JOIN itemDetails ON basket.itemDetID = itemDetails.itemDetID) WHERE itemDetID IN (SELECT itemDetID FROM basket WHERE UserID = 1617571576478);



-- get the list of the itemDetID from the basket, 
-- select itemDetID from basket where userID = 1617571576478;

-- update itemDetail by using the for loop
-- UPDATE itemDetails SET itemQty = (SELECT itemQty-itemBasketQty FROM basket INNER JOIN itemDetails ON basket.itemDetID = itemDetails.itemDetID WHERE basket.itemDetID = 6 AND userID = 1617571576478) WHERE itemDetID =6;

-- select * from itemDetails;
-- select * from basket;
-- select * from paymentDetail;




-- SELECT itemQty-itemBasketQty FROM basket INNER JOIN itemDetails ON basket.itemDetID = itemDetails.itemDetID WHERE UserID = 1617571576478;


-- SELECT itemQty-itemBasketQty,itemDetails.itemDetID FROM basket INNER JOIN itemDetails ON basket.itemDetID = itemDetails.itemDetID;


-- SELECT itemQty-itemBasketQty, itemDetails.itemDetID FROM basket INNER JOIN itemDetails ON basket.itemDetID = itemDetails.itemDetID WHERE UserID = 1617571576478;

-- select * from basket where userID = 1617571576478;

-- insert into basket (itemDetID, itemCatID, userID, basketItemID, itemBasketQty, itemPrice) VALUES(2,1,1617571576478, 1617622188047, 2, 100);



-- update itemDetails set itemQty = 10 where itemDetID = 6;
-- update itemDetails set itemQty = 10 where itemDetID = 2;


-- select sum(itemPrice * itemBasketQty) from basket group by userID having userID = 1617571576478;





-- insert into paymentDetail (payMetID, cardNumber, userID,


--  UPDATE paymentDetail SET funds = funds-100 WHERE userID = 1617571576478;
-- select * from paymentDetail;
-- select * from sales;
-- select * from itemDetails;
-- select * from basket where userID = 1617571576478;

-- SELECT itemQty-itemBasketQty FROM basket INNER JOIN itemDetails ON basket.itemDetID = itemDetails.itemDetID where itemDetails.itemDetID = 6;


-- INSERT INTO sales (itemDetID, itemCatID, userID, basketItemID, itemBasketQty, itemPrice) SELECT itemDetID, itemCatID, userID, basketItemID, itemBasketQty, itemPrice FROM basket WHERE userID =1617571576478;

-- UPDATE sales SET deliveryDate = ‘deliver Date’ WHERE basketItemID = ‘basket item ID’
-- UPDATE sales SET orderDate = ‘order Date’ WHERE basketItemID = ‘basket item ID’




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





--the one we are going to use


-- update basket set itemBasketQty = 2 where itemDetID = 6 and userID = 1617571576478;



-- BEGIN TRANSACTION;
-- UPDATE OR ROLLBACK itemDetails AS i SET itemQty = i.itemQty - COALESCE((SELECT SUM(b.itemBasketQty) FROM basket b WHERE b.userID = 1617571576478 AND b.itemDetID = i.itemDetID),0);
-- COMMIT;

-- UPDATE itemDetails AS i SET itemQty = i.itemQty - COALESCE((SELECT SUM(b.itemBasketQty) FROM basket b WHERE b.userID = 1617571576478 AND b.itemDetID = i.itemDetID),0);


-- select * from itemDetails;


-- insert into paymentDetail (cardNumber, payMetID, userID, expire_Date, ccv, funds) VALUES(1000000000000888,	1	,1617571576478,	'09-SEP-2024',	130,	429);

-- select * from basket where userID = 1617571576478;

-- select * from sales;


-- select SUM(itemPrice*itemBasketQty) from basket group by userID having userID = 1617571576478;


-- update paymentDetail set funds = 1000 where userID =  1617571576478;
-- delete from sales where userID = 1617571576478;
-- update itemDetails set itemQty = 10;
-- select * from basket where userID = 1617571576478;
-- select * from paymentDetail;

-- select * from sales;

-- UPDATE itemDetails AS i SET itemQty = i.itemQty - COALESCE((SELECT SUM(b.itemBasketQty) FROM basket b WHERE b.userID = 1617571576478 AND b.itemDetID = i.itemDetID),0);


select * from itemDetails;
select * from basket where userID = 1617571576478;
select * from sales;
select * from paymentDetail;

-- insert into basket (userID, itemDetID, itemCatID, basketItemID, itemPrice, itemBasketQty) VALUES(1617571576478,	6	,3,	1617622188047,	100,	2);

--reset
update paymentDetail set funds = 10000 where userID =  1617571576478;
update itemDetails set itemQty = 100;
delete from sales where userID = 1617571576478;
update itemDetails set itemPrice = 100;
select * from paymentDetail where userID = 1617571576478;
select * from sales where userID = 1617571576478;

SELECT *FROM basket WHERE userID =1617571576478;


select (itemQty - itemBasketQty) AS Qty FROM basket INNER JOIN itemDetails ON basket.itemDetID = itemDetails.itemDetID WHERE userID = 1617571576478;



delete from itemDetails where itemDetID = 1617130911487 AND itemCatID = 2;

SELECT distinct itemDetails.itemDetID, itemDetails.itemCatID, itemPrice, itemThreshold, itemQty, itemName, itemDesp, suppliers.suppID, suppName, itemCategory.itemCatID, itemCatName, itemUrl FROM itemDetails INNER JOIN itemCategory ON itemCategory.itemCatID = itemDetails.itemCatID INNER JOIN suppOrder ON itemDetails.itemDetID = suppOrder.itemDetID INNER JOIN suppliers ON suppOrder.suppID = suppliers.suppID;

select * from userDetail;
select * from suppOrder;

select * from itemDetails;