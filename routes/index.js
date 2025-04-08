const express = require('express');
const router = express.Router({mergeParams: true});
const { isValidToken } = require('../middleware/token')

router.use('/auth', require('./api/auth'));
router.use('/signup', require('./api/users'));
router.use('/me', isValidToken, require('./api/me'));

module.exports = router;