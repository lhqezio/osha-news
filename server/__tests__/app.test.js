const { describe, expect, test } = require('@jest/globals');

describe('Sample test', () => {
  test('Should be true', async () => {
    expect(1+2).toEqual(3);
  });
});
