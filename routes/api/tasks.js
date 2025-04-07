const express = require('express');
const router = express.Router();

// create
router.post('/', (req, res)=> {
  res.send({
    body: req.body,
    message: 'Tasks here'
  })
});

// get all tasks
router.get('/', (req, res)=> {
  res.send({
    body: req.body,
    message: 'Get Tasks here'
  })
});

// get specific tasks by id
router.get('/:id', (req, res)=> {
  res.send({
    id: req.params.id,
    body: req.body,
    message: 'Get Tasks here'
  })
});

// delete task by id
router.delete('/:id', (req, res)=> {
  res.send({
    id: req.params.id,
    message: 'Delete Tasks here'
  })
});

// update tasks by id
router.put('/:id', (req, res)=> {
  res.send({
    id: req.params.id,
    body: req.body,
    message: 'Update Tasks here'
  })
})

module.exports = router;