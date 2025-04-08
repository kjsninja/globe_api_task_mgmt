const express = require('express');
const router = express.Router();
const Tasks = require('../../../models/Tasks')
const { checkCreateRequest, checkUpdateRequest } = require('./dto')
const { checkUUIDparams } = require('../common-dto')

// create
router.post('/', checkCreateRequest, async (req, res)=> {
  const results = await Tasks.create({...req.body, owner: res.locals.user.id});
  if(results.error) res.status(400);
  else delete results.owner
  res.status(201).send(results)
});

// get all tasks
router.get('/', async(req, res)=> {
  const tasks = await Tasks.getAllTaskByOwner(res.locals.user.id);
  res.send(tasks.map(e=>{
    delete e.owner
    return e
  }))
});

// get specific tasks by id
router.get('/:id', checkUUIDparams, async (req, res)=> {
  const task = await Tasks.getTaskById(req.params.id, res.locals.user.id);
  if(task==null){
    res.status(400).send({
      message: 'No task found'
    });
  }else{
    delete task.owner
    res.send(task)
  }
});

// delete task by id
router.delete('/:id', checkUUIDparams, async(req, res)=> {
  const result = await Tasks.deleteTaskById(req.params.id, res.locals.user.id);
  res.send(result)
});

// update tasks by id
router.put('/:id', [checkUUIDparams, checkUpdateRequest], async (req, res)=> {
  const result = await Tasks.updateTask(req.params.id, res.locals.user.id, req.body);
  if(result.error) res.status(400);
  res.send(result)
})

module.exports = router;