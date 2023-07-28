# guaratee

Zero-library Promise wrapper without pain.

Make Promise without undefined behavior(almost).

## Reason to use guaratee

1. Typescript types. [Promise][1] stantard generic is not accepts Reject generic. Guaratee does.
2. Less undefined behavior, when using [safe](#safe) function.
3. Inherited from built-in [Promise][1] object
4. [ESM](https://nodejs.org/api/esm.html) and [CJS](https://nodejs.org/api/modules.html) support.

```typescript
type Guaratee<Value, Error = unknown> = intrinsic // from native Promise + API
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
import Guaratee from 'guaratee';
const promiseThatFails = await Guaratee.safe(Guaratee.reject(123));

promiseThatFails.success // false
promiseThatFails.value // undefined
promiseThatFails.error // 123
promiseThatFails.unwrap() // throws "123"
promiseThatFails.unwrap("Undefined Behavior") // throws "Undefined Behavior"

const promiseSuccess = await Guaratee.safe("Hello!");

promiseSuccess.success // true
promiseSuccess.error // undefined
promiseSuccess.value // "Hello!"
promise.unwrap() // "Hello!"
const value = promise.unwrap("Undefined behavior") // error will be ignored
console.log(value) // "Hello!"
```

### from

Transforms `Promise | PromiseLike` value into guaratee instance.

#### Example from

```typescript
import Guaratee from 'guaratee';

const promiseFromSomewhere = fetch(...);
const promise = Guaratee.from(promiseFromSomewhere);
// or you can use await to get result from promise
const awaitdResult = await Guaratee.from(promiseFromSomewhere);
```

### Guaratee.resolve

Inherited from [Promise][1]

### Guaratee.reject

Inherited from [Promise][1]

### Guaratee.all

Inherited from [Promise][1]

### Guaratee.any

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
