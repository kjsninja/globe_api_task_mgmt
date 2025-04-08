require('dotenv').config();

module.exports = {
  PORT: process.env.PORT,
  DATABASE_URL: process.env.DATABASE_URL || '',
  isProd: () => {
    return process.env.NODE_ENV === 'production' ? true : false
  },
  isDebug: () => {
    return [1,'1', true, 'true'].find(e=>e === process.env.DEBUG) ? true : false;
  }
}