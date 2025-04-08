const joi = require('joi');
const { joiValidate } = require('../../../helper/requestValidator');
const { el } = require('@faker-js/faker');

const UuidDTO = joi.string().uuid();

const checkUUIDparams = function(req, res, next){
  const validate = UuidDTO.validate(req.params.id);
  joiValidate(validate, req, res, next);
}

const checkBlankBody = function(req, res, next){
  if(typeof req.body === 'object'){
    if(Object.keys(req.body).length > 0){
      return next();
    }
  }
  
  return res.status(400).send({
    message: "Bad Request"
  })
}

module.exports = {
  checkUUIDparams,
  checkBlankBody
}