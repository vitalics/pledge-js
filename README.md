# aasy

Async - easy.

Zero-library Promise wrapper without pain.

Make Promise without undefined behavior(almost).

## Reason to use aasy

1. Typescript types. [Promise][1] stantard generic is not accepts Reject generic. aasy does.
2. Less undefined behavior, when using [safe](#safe) function.
3. Inherited from built-in [Promise][1] object
4. [ESM](https://nodejs.org/api/esm.html) and [CJS](https://nodejs.org/api/modules.html) support.

```typescript
type Async<Value, Error = unknown> = intrinsic // from native Promise + API
```

## Wanna be contributor?

See [contribute guide](./CONTRIBUTING.md)

## API

### safe

Call promise and do not throw an error even if get rejected status.

**Arguments**:
`value` - [Promise][1]

**Returns**:

- `Promise<Object>`
  - `success` [`boolean`][2]
  - `value` - Promise Fulfilled result
  - `error` - Promise Reject reason
  - `unwrap` `Function` - Function that accepts new error and returns resolved value. See [examples](#example-safe) to see it in action

#### Example safe

```typescript
import Async from 'aasy';
const promiseThatFails = await Async.safe(Async.reject(123));

promiseThatFails.success // false
promiseThatFails.value // undefined
promiseThatFails.error // 123
promiseThatFails.unwrap() // throws "123"
promiseThatFails.unwrap("Undefined Behavior") // throws "Undefined Behavior"

const promiseSuccess = await Async.safe("Hello!");

promiseSuccess.success // true
promiseSuccess.error // undefined
promiseSuccess.value // "Hello!"
promise.unwrap() // "Hello!"
const value = promise.unwrap("Undefined behavior") // error will be ignored
console.log(value) // "Hello!"
```

### from

Transforms `Promise | PromiseLike` value into async instance.

#### Example from

```typescript
import Async from 'aasy';

const promiseFromSomewhere = fetch(...);
const promise = Async.from(promiseFromSomewhere);
// or you can use await to get result from promise
const awaitdResult = await Async.from(promiseFromSomewhere);
```

### Async.resolve

Inherited from [Promise][1]

### Async.reject

Inherited from [Promise][1]

### Async.all

Inherited from [Promise][1]

### Async.any

Inherited from [Promise][1]

## then

Inherited from [Promise][1]

## catch

Inherited from [Promise][1]

## finally

Inherited from [Promise][1]

## Tech Stack

- pnpm
- esbuild
- typescript
- husky
- github actions
- jest
- eslint

[1]: <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise>
[2]: <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean>
