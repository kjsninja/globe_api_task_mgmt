const request = require('supertest');
const app = require('../app')
const joi = require('joi');

const { credential } = require('./creds');

describe('DEL /api/me', () => {
  it('should be able to get 401 when wrong token', async () => {
    const meResult = await request(app).del('/api/me').set('Authorization', `Bearer `)
    // Check status code
    if (meResult.status !== 401) throw new Error(`Expected status 401, got ${meResult.status}`)
    if (typeof meResult.body !== 'object') throw new Error(`Response is not an object.`);
  });

  it('should be able to delete my account', async () => {
    const auth = await request(app).post('/api/auth').send(credential.correct).expect(200)
    const myToken = auth.body.token;

    const meResult = await request(app).del('/api/me').set('Authorization', `Bearer ${myToken}`)
    // Check status code
    if (meResult.status !== 200) throw new Error(`Expected status 200, got ${meResult.status}`)
    if (typeof meResult.body !== 'object') throw new Error(`Response is not an object.`);
  });
});
