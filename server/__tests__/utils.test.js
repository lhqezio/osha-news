const { describe, expect, test } = require('@jest/globals');

const { sum } = require('../utils/testMethod');

describe('utils', () => {
  test('Test test are running correctly', () => {
    expect(sum(1, 2)).toEqual(3);
  });
});