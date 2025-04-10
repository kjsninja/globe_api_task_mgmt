const joi = require('joi');
const { joiValidate } = require('../../../helper/requestValidator');
const { TaskStatus } = require('@prisma/client');
const sanitize = require('../../../helper/sanitize');

const CreateTaskDTO = joi.object({
  title: joi.string().min(1).max(50),
  content: joi.string().min(1).max(500)
})

const UpdateTaskDTO = joi.object({
  title: joi.string().min(1).max(50).optional(),
  content: joi.string().min(1).max(500).optional(),
  status: joi.string().valid(TaskStatus.COMPLETED, TaskStatus.PENDING).optional()
});

const checkCreateRequest = function(req, res, next){
  const validate = CreateTaskDTO.validate(sanitize.trim(req.body));
  joiValidate(validate, req, res, next);
}

const checkUpdateRequest = function(req, res, next){
  const validate = UpdateTaskDTO.validate(sanitize.trim(req.body));
  joiValidate(validate, req, res, next);
}

module.exports = {
  checkCreateRequest,
  checkUpdateRequest
}