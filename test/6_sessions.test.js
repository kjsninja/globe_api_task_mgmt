const request = require('supertest');
const app = require('../app')
const joi = require('joi');

const { credential } = require('./creds');

let myToken = "";
let sessionId = "";

describe('GET /api/me/sessions', async () => {
  it('should be able to get 401 when wrong token', async () => {
    const meResult = await request(app).get(`/api/me/sessions`).set('Authorization', `Bearer `)
    // Check status code
    if (meResult.status !== 401) throw new Error(`Expected status 401, got ${meResult.status}`)
    if (typeof meResult.body !== 'object') throw new Error(`Response is not an object.`);
  });

  it('should be able to get all sessions', async () => {
    const auth = await request(app).post('/api/auth').send(credential.correct).expect(200)
    myToken = auth.body.token;

    const meResult = await request(app).get('/api/me/sessions').set('Authorization', `Bearer ${myToken}`)
    // Check status code
    if (meResult.status !== 200) throw new Error(`Expected status 200, got ${meResult.status}`)
    if (typeof meResult.body !== 'object') throw new Error(`Response is not an object.`);

    const responseObject = joi.array().items(
      joi.object({
        id: joi.string().guid().required(),
        metadata: joi.object({
          agent: joi.allow(joi.string())
        }),
        createdAt: joi.string().required()
      })
    )

    const validate = responseObject.validate(meResult.body);
    if(validate.error){
      throw new Error(validate.error);
    }
    sessionId = meResult.body[0].id;
  });
});

describe('GET /api/me/sessions/:sessionId', async () => {
  it('should be able to get 401 when wrong token', async () => {
    const meResult = await request(app).get(`/api/me/sessions/${sessionId}`).set('Authorization', `Bearer `)
    // Check status code
    if (meResult.status !== 401) throw new Error(`Expected status 401, got ${meResult.status}`)
    if (typeof meResult.body !== 'object') throw new Error(`Response is not an object.`);
  });
  
  it('should be able to get session by id', async () => {
    const meResult = await request(app).get(`/api/me/sessions/${sessionId}`).set('Authorization', `Bearer ${myToken}`)

    // Check status code
    if (meResult.status !== 200) throw new Error(`Expected status 200, got ${meResult.status}`)
    if (typeof meResult.body !== 'object') throw new Error(`Response is not an object.`);

    const responseObject = joi.object({
      id: joi.string().guid().required(),
      metadata: joi.object({
        agent: joi.allow(joi.string())
      }),
      createdAt: joi.string().required()
    })

    const validate = responseObject.validate(meResult.body);
    if(validate.error){
      throw new Error(validate.error);
    }
  });

  it('should not be able to get session wrong id', async () => {
    const meResult = await request(app).get(`/api/me/sessions/1`).set('Authorization', `Bearer ${myToken}`)

    // Check status code
    if (meResult.status !== 400) throw new Error(`Expected status 400, got ${meResult.status}`)
    if (typeof meResult.body !== 'object') throw new Error(`Response is not an object.`);
  });
});
