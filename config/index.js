require('dotenv').config();

module.exports = {
  PORT: process.env.PORT || 3000,
  TOKEN_SECRET: process.env.TOKEN_SECRET || 'no_secret_token_used',
  DATABASE_URL: process.env.DATABASE_URL || '',
  PASSWORD_KEY: process.env.PASSWORD_KEY || '',
  isProd: () => {
    return process.env.NODE_ENV === 'production' ? true : false
  },
  isDebug: () => {
    return [1,'1', true, 'true'].find(e=>e === process.env.DEBUG) ? true : false;
  }
}