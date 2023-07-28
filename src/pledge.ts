type Executor<Value, Error = unknown> = (
  resolve: (value: Value) => void,
  reject: (reason?: Error) => void
) => void;
type SafeResult<Value, Error = unknown> = ({
  error: Error;
  success: false;
  value: undefined;
} | {
  value: Value;
  success: true;
  error: undefined;
}) & {
  unwrap<E>(error?: E): Value;
};

export class Pledge<Value, Error = unknown> extends Promise<Value> {
  constructor(
    executor: Executor<Value, Error>,
  ) {
    super((resolve, reject) => {
      return executor(value => {
        return resolve(value);
      }, error => {
        return reject(error)
      });
    });
  }

  then<TResult1 = Value, TResult2 = Error>(onfulfilled?: ((value: Value) => TResult1 | PromiseLike<TResult1>) | null | undefined, onrejected?: ((reason: Error) => TResult2 | PromiseLike<TResult2>) | null | undefined): Promise<TResult1 | TResult2> {
    return super.then(onfulfilled, onrejected);
  }

  catch<TResult = never>(onrejected?: ((reason: Error) => TResult | PromiseLike<TResult>) | null | undefined): Promise<Value | TResult> {
    return super.catch(onrejected);
  }

  static async safe<Value, Error = unknown>(value?: PromiseLike<Value> | Value): Promise<SafeResult<Value, Error>> {
    let result: Value | undefined = undefined;
    let error: Error | undefined = undefined;
    let success = false;
    try {
      result = await value;
      success = true;
    } catch (e) {
      error = e as Error;
      success = false;
    }

    const resultObject = {
      value: result as Value,
      error,
      success: success as unknown,
      unwrap: <E>(e?: E): Value => {
        if (!success) {
          throw e ?? error;
        }
        return result as Value;
      }
    } as SafeResult<Value, Error>;

    return Pledge.resolve<SafeResult<Value, Error>>(resultObject);
  }

  static resolve<Value>(value?: Value): Pledge<Awaited<Value>, never>;
  static resolve<Value>(value?: Value | PromiseLike<Value>): Pledge<Awaited<Value>, never>;
  static resolve<Value>(value?: Value): Pledge<Value | undefined, never> {
    return new Pledge<Value | undefined, never>((res) => {
      res(value);
    })
  }

  static reject<Error = unknown>(reason?: Error): Pledge<never, Error> {
    return new Pledge((_, reject) => {
      reject(reason);
    }
    );
  }

  static from<Value, Error = unknown>(promise: PromiseLike<Value>) {
    return new Pledge<Value, Error>((res, rej) => {
      return promise.then(res, rej);
    });
  }
}
