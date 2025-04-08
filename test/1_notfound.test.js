const request = require('supertest');
const app = require('../app')
const joi = require('joi');

describe('GET /404', async () => {
  it('should return 404 message', async () => {
    const res = await request(app).get('/404')

    // Check status code
    if (res.status !== 404) throw new Error(`Expected status 404, got ${res.status}`);
    if (typeof res.body !== 'object') throw new Error(`Response is not an object.`);

    const responseObject = joi.object({
      message: joi.string().equal("Page not found!").required().messages({
        "any.required": "'message' should be a property of the object",
        "string.empty": "'message' should not be empty",
      })
    })

    const validate = responseObject.validate(res.body);
    if(validate.error){
      throw new Error(validate.error);
    }
  });
});