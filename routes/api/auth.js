const express = require('express');
const router = express.Router();

// check credentials here
router.post('/', (req, res)=> {
  res.send({
    body: req.body,
    message: 'AUTH here'
  })
});

module.exports = router;