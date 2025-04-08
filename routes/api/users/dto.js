const joi = require('joi');
const { joiValidate } = require('../../../helper/requestValidator')

const CreateUserDTO = joi.object({
  email: joi.string().email().max(100),
  name: joi.string().alphanum().min(2).max(100),
  password: joi.string().custom((value, helper) => {
    const errors = [];
    if(value.length < 8 || value.length > 30){
      errors.push("Your password must be between 8 to 30 characters long.");
    }
    if (value.search(/[a-z]/g) < 0) {
      errors.push("Your password must contain at least one lowercase letter.");
    }
    if (value.search(/[A-Z]/g) < 0) {
      errors.push("Your password must contain at least one uppercase letter.");
    }
    if (value.search(/[0-9]/) < 0) {
      errors.push("Your password must contain at least one digit."); 
    }
    if (value.search(/[\@\$\#\!\^\%\.]/i) < 0) {
      errors.push("Your password must contain at least one special character letter [@$#!^%.].");
    }

    if(errors.length > 0){
      return helper.message(errors.join('\n'));
    }

    return true;
  })
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