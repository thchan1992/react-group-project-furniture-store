var sqlite3 = require('sqlite3').verbose();
let db= new sqlite3.Database('./database/furniture.db', (err) => {
  if (err) {
    console.error(err.message);
    throw err;
  }
  console.log('Connected to the  database.');
});
 
db.get("PRAGMA foreign_keys = ON");

// export as module, called db
module.exports = db;

