const { describe, expect, test } = require('@jest/globals');

describe('Sample test', () => {
  test('Should be true', () => {
    expect(1+2).toEqual(3);
  });
});
