const express = require('express');
const router = express.Router();

// signup user
router.post('/', (req, res)=> {
  res.send({
    body: req.body,
    message: 'Tasks here'
  })
});

// delete task by id
router.delete('/:id', (req, res)=> {
  res.send({
    id: req.params.id,
    message: 'Delete User info here'
  })
});

// update tasks by id
router.put('/:id', (req, res)=> {
  res.send({
    id: req.params.id,
    body: req.body,
    message: 'Update User info here'
  })
})

module.exports = router;