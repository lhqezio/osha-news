const { 
  describe, 
  expect, 
  test, 
  afterEach,
} = require('@jest/globals');
const db = require('../db/db');
const app = require('../app');
const request = require('supertest');

// Get sample data
const sample = require('../testData/articleTestData');

// Mock database
jest.mock('../db/db');

// Cleanup after each tests
afterEach(jest.restoreAllMocks);

// Tests for /article
describe('/article', () => {
  test('GET one article', async () => {
    // Mock article data
    jest.spyOn(db, 'getOneArticle').
      mockImplementationOnce(() => sample.article1);
    
    // Act
    const res = await request(app).get('/article');

    // Assert
    expect(res.body).toEqual(sample.article1);
    expect(res.statusCode).toBe(200);
    expect(res.type).toEqual('application/json');
  });

  test('GET Internal error', async () => {
    jest.spyOn(db, 'getOneArticle').
      mockImplementationOnce(() => {
        throw new Error('Sample error for testing.');
      });

    // Act
    const res = await request(app).get('/article');

    // Assert
    expect(res.body).toEqual({'error': 'Internal Error.'});
    expect(res.statusCode).toBe(500);
    expect(res.type).toEqual('application/json');
  });

  test('POST not accepted', async () => {    
    // Act
    const res = await request(app).post('/article');

    // Assert
    expect(res.body).toEqual({});
    expect(res.statusCode).toBe(404);
  });
});

// Tests for /article/random
describe('/article/random', () => {
  test('GET one random article', async () => {
    // Mock article data
    jest.spyOn(db, 'getRandomArticle').
      mockImplementationOnce(() => [sample.article1]);

    // Act
    const res = await request(app).get('/article/random');

    // Assert
    expect(res.body).toEqual([sample.article1]);
    expect(res.statusCode).toBe(200);
    expect(res.type).toEqual('application/json');
  });

  test('GET three random article', async () => {
    // Mock article data
    jest.spyOn(db, 'getRandomArticle').
      mockImplementationOnce(() => [sample.article1, sample.article2, sample.article3]);

    // Act
    const res = await request(app).get('/article/random?amount=3');

    // Assert
    expect(res.body).toEqual([sample.article1, sample.article2, sample.article3]);
    expect(res.statusCode).toBe(200);
    expect(res.type).toEqual('application/json');
  });

  test('GET Internal error', async () => {
    // Mock article data
    jest.spyOn(db, 'getRandomArticle').
      mockImplementationOnce(() => {
        throw new Error('Sample error for testing.');
      });

    // Act
    const res = await request(app).get('/article/random');

    // Assert
    expect(res.body).toEqual({'error': 'Internal Error.'});
    expect(res.statusCode).toBe(500);
    expect(res.type).toEqual('application/json');
  });

  test('POST get one random article', async () => {
    // Mock article data
    jest.spyOn(db, 'getRandomArticle').
      mockImplementationOnce(() => [sample.article1]);

    // Act
    const res = await request(app).post('/article/random');

    // Assert
    expect(res.body).toEqual([sample.article1]);
    expect(res.statusCode).toBe(200);
    expect(res.type).toEqual('application/json');
  });

  test('POST Internal error', async () => {
    // Mock article data
    jest.spyOn(db, 'getRandomArticle').
      mockImplementationOnce(() => {
        throw new Error('Sample error for testing.');
      });

    // Act
    const res = await request(app).post('/article/random');

    // Assert
    expect(res.body).toEqual({'error': 'Internal Error.'});
    expect(res.statusCode).toBe(500);
    expect(res.type).toEqual('application/json');
  });
});
