/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Pledge } from '../pledge'

test('constructor should returns Promise', async () => {
  const fn = jest.fn;
  const promise = new Pledge(fn);
  // @ts-expect-error
  expect(promise.__proto__.__proto__).toBe(Promise.prototype);
});

test('instance should contains .then .catch .finally functions', async () => {
  const fn = jest.fn;
  const promise = new Pledge(fn);

  expect(promise).toHaveProperty('then');
  expect(promise).toHaveProperty('catch');
  expect(promise).toHaveProperty('finally');
})

test('safe should return safe success result', async () => {
  const safeResult = await Pledge.safe(123);
  expect(safeResult.success).toBeTruthy();
  expect(safeResult.value).toBeDefined();
  expect(safeResult.error).toBeUndefined();
  expect(() => safeResult.unwrap()).not.toThrow();
});

test('safe should return safe result and unwrap throw an error', async () => {
  const safeResult = await Pledge.safe(Pledge.reject(123));
  expect(safeResult.success).toBeFalsy();
  expect(safeResult.value).toBeUndefined();
  expect(safeResult.error).toBeDefined();
  expect(safeResult.error).toBe(123);
  expect(() => safeResult.unwrap("Undefined behavior")).toThrow("Undefined behavior");
});

test('then should be chainable', async () => {
  expect.assertions(1);
  new Pledge<number>((resolve) => {
    resolve(1);
  }).then(value => {
    return value + 1;
  }).then(value => {
    expect(value).toBe(2);
  });
});
