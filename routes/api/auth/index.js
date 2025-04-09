const express = require('express');
const router = express.Router();
const user = require('../../../models/Users');
const { checkLoginRequest } = require('./dto');
const { checkBlankBody } = require('../common-dto');
const { isValidToken } = require('../../../middleware/token');

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

router.post('/validate', [isValidToken], async (req, res)=> {
  const result = await user.getUserSessionByIdAndOwner(res.locals.token.id, res.locals.user.id);
  if(result.error) return res.status(401).send()
  res.send();
});

module.exports = router;