const express = require('express');
const router = express.Router();
const User = require('../../../models/Users');
const { checkCreateRequest } = require('./dto');
const { checkBlankBody } = require('../common-dto')
const sanitize = require('../../../helper/sanitize');

// signup user
router.post('/', [checkBlankBody, checkCreateRequest], async (req, res)=> {
  const result = await User.create(sanitize.trim(req.body));
  if(result.error){
    return res.status(400).send({
      message: 'Bad Request',
      error: result.error
    })
  }
  res.status(201).send();
});

module.exports = router;