const express = require('express');
const router = express.Router();
const user = require('../../../models/Users');
const { checkLoginRequest } = require('./dto');
const { checkBlankBody } = require('../common-dto');

// check credentials here
router.post('/', [checkBlankBody, checkLoginRequest], async (req, res)=> {
  const result = await user.getUserByEmailPassword(req.body, res.locals.userAgent);
  if(result == null) return res.status(401).send({
    message: 'Invalid email or password'
  })
  res.send({
    token: result
  })
});

module.exports = router;