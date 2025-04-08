const request = require('supertest');
const app = require('../app')
const joi = require('joi');

const { credential } = require('./creds');

let myToken = "";

describe('POST /api/me', async () => {
  it('should be able to access the route', async () => {
    const auth = await request(app).post('/api/auth').send(credential.correct).expect(200)
    myToken = auth.body.token;

    const meResult = await request(app).get('/api/me').set('Authorization', `Bearer ${myToken}`)
    // Check status code
    if (meResult.status !== 200) throw new Error(`Expected status 200, got ${meResult.status}`)
    if (typeof meResult.body !== 'object') throw new Error(`Response is not an object.`);

    const responseObject = joi.object({
      email: joi.string().email().required(),
      name: joi.string().required()
    })

    const validate = responseObject.validate(meResult.body);
    if(validate.error){
      throw new Error(validate.error);
    }
  });

  it('should be able to get 401 when wrong token', async () => {
    const meResult = await request(app).get('/api/me').set('Authorization', `Bearer `)
    // Check status code
    if (meResult.status !== 401) throw new Error(`Expected status 401, got ${meResult.status}`)
    if (typeof meResult.body !== 'object') throw new Error(`Response is not an object.`);
  });
});

describe('PUT /api/me', async () => {
  it('should be able to get 401 when wrong token', async () => {
    const meResult = await request(app).put('/api/me').set('Authorization', `Bearer `)
    // Check status code
    if (meResult.status !== 401) throw new Error(`Expected status 401, got ${meResult.status}`)
    if (typeof meResult.body !== 'object') throw new Error(`Response is not an object.`);
  });

  it('should be able to update name', async () => {
    const name = 'Test Name';
    const meResult = await request(app).put('/api/me').set('Authorization', `Bearer ${myToken}`).send({
      name
    })
    // Check status code
    if (meResult.status !== 200) throw new Error(`Expected status 200, got ${meResult.status}`)
    if (typeof meResult.body !== 'object') throw new Error(`Response is not an object.`);

    if(meResult.body.data.name !== name) throw new Error(`Expected ${name}, got ${meResult.body.data.name}.`);
  });
});