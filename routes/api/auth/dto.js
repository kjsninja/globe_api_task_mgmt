const joi = require('joi');
const { joiValidate } = require('../../../helper/requestValidator');
const sanitize = require('../../../helper/sanitize');

const CreateLoginDTO = joi.object({
  email: joi.string().min(1).max(100).required(),
  password: joi.string().min(1).max(30).required()
})

const checkLoginRequest = function(req, res, next){
  const validate = CreateLoginDTO.validate(sanitize.trim(req.body));
  joiValidate(validate, req, res, next);
}

module.exports = {
  checkLoginRequest
}