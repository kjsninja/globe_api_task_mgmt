const express = require('express');
const router = express.Router({mergeParams: true});
const User = require('../../../models/Users');
const { checkUpdateRequest } = require('../users/dto')
const { checkBlankBody } = require('../common-dto')

// other routes
router.use('/tasks', require('../tasks'));
router.use('/sessions', require('../sessions'));

// get user data
router.get('/', (req, res)=> {
  const user = res.locals.user;
  // hide user id in response
  delete user.id
  res.status(200).send(user);
});

// delete user by id
router.delete('/', async (req, res)=> {
  const result = await User.deleteUserById(res.locals.user.id);
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
router.put('/', [checkBlankBody, checkUpdateRequest], async (req, res) => {
  const result = await User.updateUser(res.locals.user.id, req.body);
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