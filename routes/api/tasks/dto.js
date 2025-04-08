const joi = require('joi');
const { joiValidate } = require('../../../helper/requestValidator')

const CreateUserDTO = joi.object({
  email: joi.string().email().max(100),
  name: joi.string().alphanum().min(2).max(100)
})

const UpdateUserDTO = joi.object({
  name: joi.string().alphanum().min(2).max(100)
});

const checkCreateRequest = function(req, res, next){
  const validate = CreateUserDTO.validate(req.body);
  joiValidate(validate, req, res, next);
}

const checkUpdateRequest = function(req, res, next){
  const validate = UpdateUserDTO.validate(req.body);
  joiValidate(validate, req, res, next);
}

module.exports = {
  checkCreateRequest,
  checkUpdateRequest
}