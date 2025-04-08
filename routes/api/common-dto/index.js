const joi = require('joi');
const { joiValidate } = require('../../../helper/requestValidator')

const UuidDTO = joi.string().uuid();

const checkUUIDparams = function(req, res, next){
  const validate = UuidDTO.validate(req.params.id);
  joiValidate(validate, req, res, next);
}

module.exports = {
  checkUUIDparams
}