const { Pool } = require("pg");

const pool = new Pool({
  user: "bakeryAdmin",
  host: "localhost",
  database: "bakerydb",
  password: "bakeryadmin1234",
  port: 5432,
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
