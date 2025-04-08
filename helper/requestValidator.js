const joi = require('joi');

const joiValidate = function(validate, req, res, next){
  if(validate.error){
    return res.status(400).send({
      message: 'Bad Request',
      field: validate.error.details.map(e=>e.context.key)[0],
      error: validate.error.details.map(e=>e.message)[0]
    })
  }
  next();
}

module.exports = {
  joiValidate
}