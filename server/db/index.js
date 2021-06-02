const { Pool } = require("pg");

// If you dont have env variables

// const pool = new Pool({
//   user: "bakeryAdmin",
//   host: "localhost",
//   database: "bakerydb",
//   password: "yourpassword",
//   port: 5432,
// });

// If you have env variables it detects automatically
// Put this variables in the .env file

// PGUSER = bakeryAdmin;
// PGHOST = localhost;
// PGPASSWORD = yourpassword;
// PGDATABASE = bakerydb;
// PGPORT = 5432;

const pool = new Pool();

module.exports = {
  query: (text, params) => pool.query(text, params),
};
