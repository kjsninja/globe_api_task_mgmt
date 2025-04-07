require('dotenv').config();

module.exports = {
  PORT: process.env.PORT,
  ENV: process.env.ENV,
  DB: process.env.DB_HOST
}