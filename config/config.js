require('dotenv').config();

module.exports = {
  PORT: process.env.PORT,
  ENV: process.env.NODE_ENV === 'production' ? 'production' : 'dev',
  DB: process.env.DB_HOST
}