const request = require('supertest');
const { describe, expect, test } = require('@jest/globals');

const app = require('../app');
const DB = require('../db/db');

jest.mock('../db/db');

describe('Hello World Route', () => {
  test('Should return Hello World!', async () => {
    const res = await request(app).get('/hello');

    expect(res.text).toEqual('Hello World!');
    expect(res.statusCode).toBe(200);
  });
});


