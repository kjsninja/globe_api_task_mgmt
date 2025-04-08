const express = require('express');
const router = express.Router({mergeParams: true});
const User = require('../../../models/Users');
const { checkUUIDparams } = require('../common-dto')

router.get('/', async (req, res)=> {
  const sessions = await User.getAllUserSessions(res.locals.user.id)
  res.status(200).send(sessions.map(e=>{
    delete e.owner
    e.metadata = JSON.parse(e.metadata)
    return e;
  }));
});

router.get('/:id', checkUUIDparams, async (req, res)=> {
  const session = await User.getUserSessionByIdAndOwner(req.params.id, res.locals.user.id)
  if(session.error) res.status(400);
  res.send(session);
});

router.delete('/:id', checkUUIDparams, async (req, res)=> {
  const session = await User.deleteUserSessionById(req.params.id, res.locals.user.id)
  if(session.error) res.status(400);
  res.send(session);
});

module.exports = router;