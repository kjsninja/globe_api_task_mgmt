const express = require('express');
const router = express.Router();
const User = require('../../../models/Users');
const { checkCreateRequest, checkUpdateRequest } = require('./dto');
const { checkUUIDparams } = require('../common-dto');

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

// delete user by id
router.delete('/:id', checkUUIDparams, async (req, res)=> {
  const result = await User.deleteUserById(req.params.id);
  if(result.error){
    return res.status(400).send({
      message: 'Bad Request',
      error: result.error
    })
  }
  res.status(200).send({
    message: 'User deleted'
  })
});

// update tasks by id
router.put('/:id', [checkUUIDparams, checkUpdateRequest], async (req, res) => {
  const result = await User.updateUser(req.params.id, req.body);
  if(result.error){
    return res.status(400).send({
      message: 'Bad Request',
      error: result.error
    })
  }
  res.status(200).send({
    message: 'Update successful',
    data: {
      name: result.name
    }
  })
})

module.exports = router;