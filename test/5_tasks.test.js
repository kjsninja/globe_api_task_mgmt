const request = require('supertest');
const app = require('../app')
const joi = require('joi');

const { credential, tasks } = require('./creds');
const { TaskStatus } = require('@prisma/client');

let myToken = "";
let taskId = "";

const dummyTaskUpdate = {
  title: 'Updated Test Name',
  content: 'Updated Content',
  status: TaskStatus.COMPLETED
}

describe('POST /api/me/tasks', () => {
  it('should be able to create a task', async () => {
    const auth = await request(app).post('/api/auth').send(credential.correct).expect(200)
    myToken = auth.body.token;

    const meResult = await request(app).post('/api/me/tasks').set('Authorization', `Bearer ${myToken}`).send(tasks.dummy)

    // Check status code
    if (meResult.status !== 201) throw new Error(`Expected status 201, got ${meResult.status}`)
    if (typeof meResult.body !== 'object') throw new Error(`Response is not an object.`);

    const responseObject = joi.object({
      id: joi.string().guid().required(),
      title: joi.string().required(),
      content: joi.string().required(),
      createdAt: joi.string().required(),
      updatedAt: joi.string().required(),
      status: joi.string().valid(TaskStatus.COMPLETED, TaskStatus.PENDING).required()
    })

    const validate = responseObject.validate(meResult.body);
    if(validate.error){
      throw new Error(validate.error);
    }
    taskId = meResult.body.id;
  });

  it('should be able to get 400 when wrong fields', async () => {
    const meResult = await request(app).post('/api/me/tasks').set('Authorization', `Bearer ${myToken}`).send({...tasks.dummy, title2: "this is wromg"})
    // Check status code
    if (meResult.status !== 400) throw new Error(`Expected status 400, got ${meResult.status}`)
    if (typeof meResult.body !== 'object') throw new Error(`Response is not an object.`);

    const responseObject = joi.object({
      message: joi.string().required(),
      field: joi.string().required(),
      error: joi.string().required(),
    })

    const validate = responseObject.validate(meResult.body);
    if(validate.error){
      throw new Error(validate.error);
    }
  });

  it('should be able to get 401 when wrong token', async () => {
    const meResult = await request(app).post('/api/me/tasks').set('Authorization', `Bearer `)
    // Check status code
    if (meResult.status !== 401) throw new Error(`Expected status 401, got ${meResult.status}`)
    if (typeof meResult.body !== 'object') throw new Error(`Response is not an object.`);
  });

  after(async () => {});
  
});

describe('PUT /api/me/tasks/:id', () => {
  it('should be able to get 401 when wrong token', async () => {
    const meResult = await request(app).put(`/api/me/tasks/${taskId}`).set('Authorization', `Bearer `)
    // Check status code
    if (meResult.status !== 401) throw new Error(`Expected status 401, got ${meResult.status}`)
    if (typeof meResult.body !== 'object') throw new Error(`Response is not an object.`);
  });

  it('should be able to get 400 when wrong fields', async () => {
    const meResult = await request(app).put(`/api/me/tasks/${taskId}`).set('Authorization', `Bearer ${myToken}`).send({...dummyTaskUpdate, title1: "test"})
    // Check status code
    if (meResult.status !== 400) throw new Error(`Expected status 400, got ${meResult.status}`)
    if (typeof meResult.body !== 'object') throw new Error(`Response is not an object.`);

    const responseObject = joi.object({
      message: joi.string().required(),
      field: joi.string().required(),
      error: joi.string().required(),
    })

    const validate = responseObject.validate(meResult.body);
    if(validate.error){
      throw new Error(validate.error);
    }
  });

  it('should be able to update task properties', async () => {
    const meResult = await request(app).put(`/api/me/tasks/${taskId}`).set('Authorization', `Bearer ${myToken}`).send(dummyTaskUpdate)
    // Check status code
    if (meResult.status !== 200) throw new Error(`Expected status 200, got ${meResult.status}`)
    if (typeof meResult.body !== 'object') throw new Error(`Response is not an object.`);

    const responseObject = joi.object({
      id: joi.string().guid().required(),
      title: joi.string().required(),
      content: joi.string().required(),
      createdAt: joi.string().required(),
      updatedAt: joi.string().required(),
      status: joi.string().valid(TaskStatus.COMPLETED, TaskStatus.PENDING).required()
    })

    const validate = responseObject.validate(meResult.body);
    if(validate.error){
      throw new Error(validate.error);
    }

    if(meResult.body.title !== dummyTaskUpdate.title) throw new Error(`Expected ${dummyTaskUpdate.title}, got ${meResult.body.title}.`);
    if(meResult.body.content !== dummyTaskUpdate.content) throw new Error(`Expected ${dummyTaskUpdate.content}, got ${meResult.body.content}.`);
    if(meResult.body.status !== dummyTaskUpdate.status) throw new Error(`Expected ${dummyTaskUpdate.status}, got ${meResult.body.status}.`);
  });

  after(async () => {});
});

describe('GET /api/me/tasks', () => {
  it('should be able to get 401 when wrong token', async () => {
    const meResult = await request(app).get(`/api/me/tasks`).set('Authorization', `Bearer `)
    // Check status code
    if (meResult.status !== 401) throw new Error(`Expected status 401, got ${meResult.status}`)
    if (typeof meResult.body !== 'object') throw new Error(`Response is not an object.`);
  });

  it('should be able to get all task in array', async () => {
    const meResult = await request(app).get(`/api/me/tasks`).set('Authorization', `Bearer ${myToken}`)
    // Check status code
    if (meResult.status !== 200) throw new Error(`Expected status 200, got ${meResult.status}`)
    if (typeof meResult.body !== 'object') throw new Error(`Response is not an object.`);

    const responseObject = joi.array().items(
      joi.object({
        id: joi.string().guid().required(),
        title: joi.string().required(),
        content: joi.string().required(),
        createdAt: joi.string().required(),
        updatedAt: joi.string().required(),
        status: joi.string().valid(TaskStatus.COMPLETED, TaskStatus.PENDING).required()
      })
    )

    const validate = responseObject.validate(meResult.body);
    if(validate.error){
      throw new Error(validate.error);
    }
  });

  after(async () => {});
});

describe('GET /api/me/tasks/:taskid', () => {
  it('should be able to get 401 when wrong token', async () => {
    const meResult = await request(app).get(`/api/me/tasks/${taskId}`).set('Authorization', `Bearer `)
    // Check status code
    if (meResult.status !== 401) throw new Error(`Expected status 401, got ${meResult.status}`)
    if (typeof meResult.body !== 'object') throw new Error(`Response is not an object.`);
  });

  it('should be able to get task', async () => {
    const meResult = await request(app).get(`/api/me/tasks/${taskId}`).set('Authorization', `Bearer ${myToken}`)
    // Check status code
    if (meResult.status !== 200) throw new Error(`Expected status 200, got ${meResult.status}`)
    if (typeof meResult.body !== 'object') throw new Error(`Response is not an object.`);

    const responseObject = joi.object({
      id: joi.string().guid().required(),
      title: joi.string().required(),
      content: joi.string().required(),
      createdAt: joi.string().required(),
      updatedAt: joi.string().required(),
      status: joi.string().valid(TaskStatus.COMPLETED, TaskStatus.PENDING).required()
    })

    const validate = responseObject.validate(meResult.body);
    if(validate.error){
      throw new Error(validate.error);
    }
  });

  it('should not be able to get task with wrong task id', async () => {
    const meResult = await request(app).get(`/api/me/tasks/1`).set('Authorization', `Bearer ${myToken}`)
    // Check status code
    if (meResult.status !== 400) throw new Error(`Expected status 400, got ${meResult.status}`)
    if (typeof meResult.body !== 'object') throw new Error(`Response is not an object.`);
  });

  after(async () => {});

});

describe('DEL /api/me/tasks/:taskid', () => {
  it('should be able to get 401 when wrong token', async () => {
    const meResult = await request(app).del(`/api/me/tasks/${taskId}`).set('Authorization', `Bearer `)
    // Check status code
    if (meResult.status !== 401) throw new Error(`Expected status 401, got ${meResult.status}`)
    if (typeof meResult.body !== 'object') throw new Error(`Response is not an object.`);
  });

  it('should be able to delete the task', async () => {
    const meResult = await request(app).del(`/api/me/tasks/${taskId}`).set('Authorization', `Bearer ${myToken}`)
    // Check status code
    if (meResult.status !== 200) throw new Error(`Expected status 200, got ${meResult.status}`)
    if (typeof meResult.body !== 'object') throw new Error(`Response is not an object.`);
  });

  it('should not be able to delete task with wrong task id', async () => {
    const meResult = await request(app).del(`/api/me/tasks/1`).set('Authorization', `Bearer ${myToken}`)
    // Check status code
    if (meResult.status !== 400) throw new Error(`Expected status 400, got ${meResult.status}`)
    if (typeof meResult.body !== 'object') throw new Error(`Response is not an object.`);
  });

  after(async () => {});

});