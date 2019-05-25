const compareElements = require('./compareElements');

test('receives invalid inputs', () => {
  expect(compareElements([5,6,7])).toBe("Entrada inválida");
  expect(compareElements(1, 'a')).toBe("Entrada inválida");
});

test('receives valid inputs', () => {
  expect(compareElements([5,6,7], [3,6,10])).toStrictEqual([1,1]);
  expect(compareElements([17,28,30], [99,16,8])).toStrictEqual([2,1]);
})