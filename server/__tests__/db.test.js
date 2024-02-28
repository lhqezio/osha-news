const { 
  describe, 
  expect, 
  test, 
  afterEach,
} = require('@jest/globals');
const db = require('../db/db');
const app = require('../app');
const request = require('supertest');

// Mock database
jest.mock('../db/db');

// Cleanup after each tests
afterEach(jest.restoreAllMocks);

// Tests for /article
describe('/article', () => {
  test('GET one article', async () => {
    // Init data
    const data = {
      '_id': '65de30a302873c12efb1cb03',
      'link': 'https://www.huffpost.com/entry/covid-boosters-uptake-us_n_632d719ee4b087fae6feaac9',
      'headline': 'Over 4 Million Americans Roll Up Sleeves For Omicron-Targeted COVID Boosters',
      'category': 'U.S. NEWS',
      'text': 'Health experts said it is too early to predict whether demand would match up with the 171 million doses of the new boosters the U.S. ordered for the fall.',
      'authors': 'Carla K. Johnson, AP',
      'date': '2022-09-23',
      'image': 'https://azuretest2142443.blob.core.windows.net/helloblob/news%20image.webp',
      '__v': 0
    };

    // Mock db article data
    jest.spyOn(db, 'getOneArticle').
      mockImplementationOnce(() => data);
    
    // Act
    const res = await request(app).get('/article');

    // Assert
    expect(res.body).toEqual(data);
    expect(res.statusCode).toBe(200);
    expect(res.type).toEqual('application/json');
  });
});
