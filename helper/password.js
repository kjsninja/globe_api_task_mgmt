const salt_rounds = 10;
const bcrypt = require('bcrypt');

function syncGeneratePassword (password) {
  return bcrypt.hashSync(password, salt_rounds);
}

function syncValidatePassword(password, hash){
  return bcrypt.compareSync(password, hash);
}

module.exports = {
  syncGeneratePassword,
  syncValidatePassword
}