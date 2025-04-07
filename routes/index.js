const express = require('express');
const router = express.Router({mergeParams: true});

router.use('/auth', require('./api/auth'));
router.use('/users', require('./api/users'));
router.use('/tasks', require('./api/tasks'));

module.exports = router;