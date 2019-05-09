module.exports = () => {
  const express = require("express");
  const mysql = require("mysql");
  const bodyparser = require("body-parser");

  const app = express();

  const con = mysql.createConnection({
    host: "localhost",
    user: "yash",
    password: "yash123",
    database: "calculator_n"
  });

  app.use(bodyparser.json());
  app.use(bodyparser.urlencoded({ extended: false }));

  app.set("view engine", "ejs");
  app.set("views", __dirname + "/views/");
  app.use(express.static(__dirname + "/public"));

  app.get("/", (req, res) => {
    res.render("index");
  });

  app.post("/query", (req, res) => {
    let query = req.body.query;
    let result = req.body.result;

    if (!con._connectCalled) {
      con.connect();
    }
    // query = "\""+query+"\"";
    var sql =
      "INSERT INTO calci (query, result) VALUES (" +
      '"' +
      query +
      '"' +
      "," +
      result +
      ")";

    con.query(sql, function(err, result) {
      if (err) throw err;
      console.log("1 record inserted ");
    });
  });

  app.listen(2000 || process.env.PORT, (req, res) => {
    console.log("server started");
  });
};
