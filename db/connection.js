const util = require("util");
const mysql = require("mysql");

//create connection obecr
const connection = mysql.createConnection({
  host: "localhost",
  user: "lvv5040",
  password: "Silver13!",
  database: "employeedb",
});

//establish connection
connection.connect();

// promisify the query
connection.query = util.promisify(connection.query);

module.exports = connection;
