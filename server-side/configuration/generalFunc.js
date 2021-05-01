var db = require("../database/database.js");

const getAll = (sql, param, res) => {
  if (param == null) {
    db.all(sql, (err, result) => {
      if (err) {
        res.json({ error: err.message });
        return;
      }
      console.log(result);
      res.json({ result });
    });
  } else {
    db.all(sql, param, (err, result) => {
      if (err) {
        console.log(err);
        res.json({ error: err.message });
        return;
      }
      res.json({ result });
    });
  }
};

const getOne = (sql, param, res) => {
  if (param == null) {
    db.get(sql, (err, result) => {
      if (err) {
        res.json({ error: err.message });
        return;
      }
      res.json({ result });
    });
  } else {
    db.get(sql, param, (err, result) => {
      if (err) {
        res.json({ error: err.message });
        return;
      }
      res.json({ result });
    });
  }
};

const runCom = (sql, params, res, text) => {
  db.run(sql, params, (err) => {
    if (err) {
      res.json({ error: err.message });
      return;
    }
    res.json({
      message: text,
    });
  });
};
module.exports = { getAll, getOne, runCom };
