const request = require('supertest');
const app = require('../app')
const joi = require('joi');

const { credential } = require('./creds');

describe('POST /api/auth', async () => {
  it('should be able to login', async () => {
    const res = await request(app).post('/api/auth').send(credential.correct)

    // Check status code
    if (res.status !== 200) throw new Error(`Expected status 200, got ${res.status}`)
    if (typeof res.body !== 'object') throw new Error(`Response is not an object.`);

    const responseObject = joi.object({
      token: joi.string().min(1).required()
    })

    const validate = responseObject.validate(res.body);
    if(validate.error){
      throw new Error(validate.error);
    }
  });

  it('should not accept a blank request', async () => {
    const res = await request(app).post('/api/auth').send()

    // Check status code
    if (res.status !== 400) throw new Error(`Expected status 400, got ${res.status}`)
    if (typeof res.body !== 'object') throw new Error(`Response is not an object.`);

    const responseObject = joi.object({
      message: joi.string().required()
    })

    const validate = responseObject.validate(res.body);
    if(validate.error){
      throw new Error(validate.error);
    }
  });

  it('should not accept a blank "{}" request', async () => {
    const res = await request(app).post('/api/auth').send({})

    // Check status code
    if (res.status !== 400) throw new Error(`Expected status 400, got ${res.status}`)
    if (typeof res.body !== 'object') throw new Error(`Response is not an object.`);

    const responseObject = joi.object({
      message: joi.string().required()
    })

    const validate = responseObject.validate(res.body);
    if(validate.error){
      throw new Error(validate.error);
    }
  });
  
  it('should not be able to login with wrong password', async () => {
    const res = await request(app).post('/api/auth').send(credential.incorrect)

    // Check status code
    if (res.status !== 401) throw new Error(`Expected status 401, got ${res.status}`)
    if (typeof res.body !== 'object') throw new Error(`Response is not an object.`);

    const responseObject = joi.object({
      message: joi.string().required()
    })

    const validate = responseObject.validate(res.body);
    if(validate.error){
      throw new Error(validate.error);
    }
  });
});
