const express = require('express');
const router = express.Router();
const User = require('../../../models/Users');
const { checkCreateRequest } = require('./dto');

// signup user
router.post('/', checkCreateRequest, async (req, res)=> {
  const result = await User.create(req.body);
  if(result.error){
    return res.status(400).send({
      message: 'Bad Request',
      error: result.error
    })
  }
  res.status(201).send();
});

module.exports = router;