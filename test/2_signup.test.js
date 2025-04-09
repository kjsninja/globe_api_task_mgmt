const request = require('supertest');
const app = require('../app')
const joi = require('joi');

const { dummyAccount } = require('./creds');

describe('POST /api/signup', () => {
  it('should return 201 status if success', async () => {
    const res = await request(app).post('/api/signup').send(dummyAccount);
    // Check status code
    if (res.status !== 201) throw new Error(`Expected status 201, got ${res.status}`);
  });

  it('should return 400 status if duplicate record', async () => {
    const res = await request(app).post('/api/signup').send(dummyAccount);
    // Check status code
    if (res.status !== 400) throw new Error(`Expected status 400, got ${res.status}`);

    const responseObject = joi.object({
      message: joi.string().equal("Bad Request").required(),
      error: joi.object({
        message: joi.string().equal("Duplicate record error.").required(),
        field: joi.array().required()
      }).required()
    })

    const validate = responseObject.validate(res.body);
    if(validate.error){
      throw new Error(validate.error);
    }
  });

  it('should return 400 if body is invalid', async () => {
    const res = await request(app).post('/api/signup').send({...dummyAccount, email1: "test"});
    // Check status code
    if (res.status !== 400) throw new Error(`Expected status 400, got ${res.status}`);

    const responseObject = joi.object({
      message: joi.string().required(),
      field: joi.string().required(),
      error: joi.string().required()
    })

    const validate = responseObject.validate(res.body);
    if(validate.error){
      throw new Error(validate.error);
    }
  });

  it('should return 400 if body is blank', async () => {
    const res = await request(app).post('/api/signup').send();
    // Check status code
    if (res.status !== 400) throw new Error(`Expected status 400, got ${res.status}`);
  });

  it('should return 400 if body is {}', async () => {
    const res = await request(app).post('/api/signup').send({});
    // Check status code
    if (res.status !== 400) throw new Error(`Expected status 400, got ${res.status}`);
    

    const responseObject = joi.object({
      message: joi.string().required()
    })

    const validate = responseObject.validate(res.body);
    if(validate.error){
      throw new Error(validate.error);
    }
  });
});