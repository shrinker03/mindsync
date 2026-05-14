
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model SmsMessage
 * 
 */
export type SmsMessage = $Result.DefaultSelection<Prisma.$SmsMessagePayload>
/**
 * Model CallEntry
 * 
 */
export type CallEntry = $Result.DefaultSelection<Prisma.$CallEntryPayload>
/**
 * Model Notification
 * 
 */
export type Notification = $Result.DefaultSelection<Prisma.$NotificationPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more SmsMessages
 * const smsMessages = await prisma.smsMessage.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more SmsMessages
   * const smsMessages = await prisma.smsMessage.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.smsMessage`: Exposes CRUD operations for the **SmsMessage** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SmsMessages
    * const smsMessages = await prisma.smsMessage.findMany()
    * ```
    */
  get smsMessage(): Prisma.SmsMessageDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.callEntry`: Exposes CRUD operations for the **CallEntry** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CallEntries
    * const callEntries = await prisma.callEntry.findMany()
    * ```
    */
  get callEntry(): Prisma.CallEntryDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.notification`: Exposes CRUD operations for the **Notification** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Notifications
    * const notifications = await prisma.notification.findMany()
    * ```
    */
  get notification(): Prisma.NotificationDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.19.3
   * Query Engine version: c2990dca591cba766e3b7ef5d9e8a84796e47ab7
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    SmsMessage: 'SmsMessage',
    CallEntry: 'CallEntry',
    Notification: 'Notification'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "smsMessage" | "callEntry" | "notification"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      SmsMessage: {
        payload: Prisma.$SmsMessagePayload<ExtArgs>
        fields: Prisma.SmsMessageFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SmsMessageFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SmsMessagePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SmsMessageFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SmsMessagePayload>
          }
          findFirst: {
            args: Prisma.SmsMessageFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SmsMessagePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SmsMessageFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SmsMessagePayload>
          }
          findMany: {
            args: Prisma.SmsMessageFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SmsMessagePayload>[]
          }
          create: {
            args: Prisma.SmsMessageCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SmsMessagePayload>
          }
          createMany: {
            args: Prisma.SmsMessageCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SmsMessageCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SmsMessagePayload>[]
          }
          delete: {
            args: Prisma.SmsMessageDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SmsMessagePayload>
          }
          update: {
            args: Prisma.SmsMessageUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SmsMessagePayload>
          }
          deleteMany: {
            args: Prisma.SmsMessageDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SmsMessageUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SmsMessageUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SmsMessagePayload>[]
          }
          upsert: {
            args: Prisma.SmsMessageUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SmsMessagePayload>
          }
          aggregate: {
            args: Prisma.SmsMessageAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSmsMessage>
          }
          groupBy: {
            args: Prisma.SmsMessageGroupByArgs<ExtArgs>
            result: $Utils.Optional<SmsMessageGroupByOutputType>[]
          }
          count: {
            args: Prisma.SmsMessageCountArgs<ExtArgs>
            result: $Utils.Optional<SmsMessageCountAggregateOutputType> | number
          }
        }
      }
      CallEntry: {
        payload: Prisma.$CallEntryPayload<ExtArgs>
        fields: Prisma.CallEntryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CallEntryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CallEntryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CallEntryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CallEntryPayload>
          }
          findFirst: {
            args: Prisma.CallEntryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CallEntryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CallEntryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CallEntryPayload>
          }
          findMany: {
            args: Prisma.CallEntryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CallEntryPayload>[]
          }
          create: {
            args: Prisma.CallEntryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CallEntryPayload>
          }
          createMany: {
            args: Prisma.CallEntryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CallEntryCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CallEntryPayload>[]
          }
          delete: {
            args: Prisma.CallEntryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CallEntryPayload>
          }
          update: {
            args: Prisma.CallEntryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CallEntryPayload>
          }
          deleteMany: {
            args: Prisma.CallEntryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CallEntryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CallEntryUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CallEntryPayload>[]
          }
          upsert: {
            args: Prisma.CallEntryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CallEntryPayload>
          }
          aggregate: {
            args: Prisma.CallEntryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCallEntry>
          }
          groupBy: {
            args: Prisma.CallEntryGroupByArgs<ExtArgs>
            result: $Utils.Optional<CallEntryGroupByOutputType>[]
          }
          count: {
            args: Prisma.CallEntryCountArgs<ExtArgs>
            result: $Utils.Optional<CallEntryCountAggregateOutputType> | number
          }
        }
      }
      Notification: {
        payload: Prisma.$NotificationPayload<ExtArgs>
        fields: Prisma.NotificationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.NotificationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.NotificationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          findFirst: {
            args: Prisma.NotificationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.NotificationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          findMany: {
            args: Prisma.NotificationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>[]
          }
          create: {
            args: Prisma.NotificationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          createMany: {
            args: Prisma.NotificationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.NotificationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>[]
          }
          delete: {
            args: Prisma.NotificationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          update: {
            args: Prisma.NotificationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          deleteMany: {
            args: Prisma.NotificationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.NotificationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.NotificationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>[]
          }
          upsert: {
            args: Prisma.NotificationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          aggregate: {
            args: Prisma.NotificationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateNotification>
          }
          groupBy: {
            args: Prisma.NotificationGroupByArgs<ExtArgs>
            result: $Utils.Optional<NotificationGroupByOutputType>[]
          }
          count: {
            args: Prisma.NotificationCountArgs<ExtArgs>
            result: $Utils.Optional<NotificationCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    smsMessage?: SmsMessageOmit
    callEntry?: CallEntryOmit
    notification?: NotificationOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */



  /**
   * Models
   */

  /**
   * Model SmsMessage
   */

  export type AggregateSmsMessage = {
    _count: SmsMessageCountAggregateOutputType | null
    _avg: SmsMessageAvgAggregateOutputType | null
    _sum: SmsMessageSumAggregateOutputType | null
    _min: SmsMessageMinAggregateOutputType | null
    _max: SmsMessageMaxAggregateOutputType | null
  }

  export type SmsMessageAvgAggregateOutputType = {
    id: number | null
    date: number | null
    type: number | null
    read: number | null
  }

  export type SmsMessageSumAggregateOutputType = {
    id: bigint | null
    date: bigint | null
    type: number | null
    read: number | null
  }

  export type SmsMessageMinAggregateOutputType = {
    id: bigint | null
    source: string | null
    externalId: string | null
    address: string | null
    body: string | null
    date: bigint | null
    type: number | null
    threadId: string | null
    read: number | null
    receivedAt: Date | null
  }

  export type SmsMessageMaxAggregateOutputType = {
    id: bigint | null
    source: string | null
    externalId: string | null
    address: string | null
    body: string | null
    date: bigint | null
    type: number | null
    threadId: string | null
    read: number | null
    receivedAt: Date | null
  }

  export type SmsMessageCountAggregateOutputType = {
    id: number
    source: number
    externalId: number
    address: number
    body: number
    date: number
    type: number
    threadId: number
    read: number
    receivedAt: number
    _all: number
  }


  export type SmsMessageAvgAggregateInputType = {
    id?: true
    date?: true
    type?: true
    read?: true
  }

  export type SmsMessageSumAggregateInputType = {
    id?: true
    date?: true
    type?: true
    read?: true
  }

  export type SmsMessageMinAggregateInputType = {
    id?: true
    source?: true
    externalId?: true
    address?: true
    body?: true
    date?: true
    type?: true
    threadId?: true
    read?: true
    receivedAt?: true
  }

  export type SmsMessageMaxAggregateInputType = {
    id?: true
    source?: true
    externalId?: true
    address?: true
    body?: true
    date?: true
    type?: true
    threadId?: true
    read?: true
    receivedAt?: true
  }

  export type SmsMessageCountAggregateInputType = {
    id?: true
    source?: true
    externalId?: true
    address?: true
    body?: true
    date?: true
    type?: true
    threadId?: true
    read?: true
    receivedAt?: true
    _all?: true
  }

  export type SmsMessageAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SmsMessage to aggregate.
     */
    where?: SmsMessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SmsMessages to fetch.
     */
    orderBy?: SmsMessageOrderByWithRelationInput | SmsMessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SmsMessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SmsMessages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SmsMessages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SmsMessages
    **/
    _count?: true | SmsMessageCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SmsMessageAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SmsMessageSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SmsMessageMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SmsMessageMaxAggregateInputType
  }

  export type GetSmsMessageAggregateType<T extends SmsMessageAggregateArgs> = {
        [P in keyof T & keyof AggregateSmsMessage]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSmsMessage[P]>
      : GetScalarType<T[P], AggregateSmsMessage[P]>
  }




  export type SmsMessageGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SmsMessageWhereInput
    orderBy?: SmsMessageOrderByWithAggregationInput | SmsMessageOrderByWithAggregationInput[]
    by: SmsMessageScalarFieldEnum[] | SmsMessageScalarFieldEnum
    having?: SmsMessageScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SmsMessageCountAggregateInputType | true
    _avg?: SmsMessageAvgAggregateInputType
    _sum?: SmsMessageSumAggregateInputType
    _min?: SmsMessageMinAggregateInputType
    _max?: SmsMessageMaxAggregateInputType
  }

  export type SmsMessageGroupByOutputType = {
    id: bigint
    source: string
    externalId: string
    address: string
    body: string
    date: bigint
    type: number
    threadId: string
    read: number
    receivedAt: Date
    _count: SmsMessageCountAggregateOutputType | null
    _avg: SmsMessageAvgAggregateOutputType | null
    _sum: SmsMessageSumAggregateOutputType | null
    _min: SmsMessageMinAggregateOutputType | null
    _max: SmsMessageMaxAggregateOutputType | null
  }

  type GetSmsMessageGroupByPayload<T extends SmsMessageGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SmsMessageGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SmsMessageGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SmsMessageGroupByOutputType[P]>
            : GetScalarType<T[P], SmsMessageGroupByOutputType[P]>
        }
      >
    >


  export type SmsMessageSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    source?: boolean
    externalId?: boolean
    address?: boolean
    body?: boolean
    date?: boolean
    type?: boolean
    threadId?: boolean
    read?: boolean
    receivedAt?: boolean
  }, ExtArgs["result"]["smsMessage"]>

  export type SmsMessageSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    source?: boolean
    externalId?: boolean
    address?: boolean
    body?: boolean
    date?: boolean
    type?: boolean
    threadId?: boolean
    read?: boolean
    receivedAt?: boolean
  }, ExtArgs["result"]["smsMessage"]>

  export type SmsMessageSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    source?: boolean
    externalId?: boolean
    address?: boolean
    body?: boolean
    date?: boolean
    type?: boolean
    threadId?: boolean
    read?: boolean
    receivedAt?: boolean
  }, ExtArgs["result"]["smsMessage"]>

  export type SmsMessageSelectScalar = {
    id?: boolean
    source?: boolean
    externalId?: boolean
    address?: boolean
    body?: boolean
    date?: boolean
    type?: boolean
    threadId?: boolean
    read?: boolean
    receivedAt?: boolean
  }

  export type SmsMessageOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "source" | "externalId" | "address" | "body" | "date" | "type" | "threadId" | "read" | "receivedAt", ExtArgs["result"]["smsMessage"]>

  export type $SmsMessagePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SmsMessage"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: bigint
      source: string
      externalId: string
      address: string
      body: string
      date: bigint
      type: number
      threadId: string
      read: number
      receivedAt: Date
    }, ExtArgs["result"]["smsMessage"]>
    composites: {}
  }

  type SmsMessageGetPayload<S extends boolean | null | undefined | SmsMessageDefaultArgs> = $Result.GetResult<Prisma.$SmsMessagePayload, S>

  type SmsMessageCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SmsMessageFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SmsMessageCountAggregateInputType | true
    }

  export interface SmsMessageDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SmsMessage'], meta: { name: 'SmsMessage' } }
    /**
     * Find zero or one SmsMessage that matches the filter.
     * @param {SmsMessageFindUniqueArgs} args - Arguments to find a SmsMessage
     * @example
     * // Get one SmsMessage
     * const smsMessage = await prisma.smsMessage.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SmsMessageFindUniqueArgs>(args: SelectSubset<T, SmsMessageFindUniqueArgs<ExtArgs>>): Prisma__SmsMessageClient<$Result.GetResult<Prisma.$SmsMessagePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one SmsMessage that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SmsMessageFindUniqueOrThrowArgs} args - Arguments to find a SmsMessage
     * @example
     * // Get one SmsMessage
     * const smsMessage = await prisma.smsMessage.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SmsMessageFindUniqueOrThrowArgs>(args: SelectSubset<T, SmsMessageFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SmsMessageClient<$Result.GetResult<Prisma.$SmsMessagePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SmsMessage that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SmsMessageFindFirstArgs} args - Arguments to find a SmsMessage
     * @example
     * // Get one SmsMessage
     * const smsMessage = await prisma.smsMessage.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SmsMessageFindFirstArgs>(args?: SelectSubset<T, SmsMessageFindFirstArgs<ExtArgs>>): Prisma__SmsMessageClient<$Result.GetResult<Prisma.$SmsMessagePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SmsMessage that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SmsMessageFindFirstOrThrowArgs} args - Arguments to find a SmsMessage
     * @example
     * // Get one SmsMessage
     * const smsMessage = await prisma.smsMessage.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SmsMessageFindFirstOrThrowArgs>(args?: SelectSubset<T, SmsMessageFindFirstOrThrowArgs<ExtArgs>>): Prisma__SmsMessageClient<$Result.GetResult<Prisma.$SmsMessagePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more SmsMessages that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SmsMessageFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SmsMessages
     * const smsMessages = await prisma.smsMessage.findMany()
     * 
     * // Get first 10 SmsMessages
     * const smsMessages = await prisma.smsMessage.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const smsMessageWithIdOnly = await prisma.smsMessage.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SmsMessageFindManyArgs>(args?: SelectSubset<T, SmsMessageFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SmsMessagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a SmsMessage.
     * @param {SmsMessageCreateArgs} args - Arguments to create a SmsMessage.
     * @example
     * // Create one SmsMessage
     * const SmsMessage = await prisma.smsMessage.create({
     *   data: {
     *     // ... data to create a SmsMessage
     *   }
     * })
     * 
     */
    create<T extends SmsMessageCreateArgs>(args: SelectSubset<T, SmsMessageCreateArgs<ExtArgs>>): Prisma__SmsMessageClient<$Result.GetResult<Prisma.$SmsMessagePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many SmsMessages.
     * @param {SmsMessageCreateManyArgs} args - Arguments to create many SmsMessages.
     * @example
     * // Create many SmsMessages
     * const smsMessage = await prisma.smsMessage.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SmsMessageCreateManyArgs>(args?: SelectSubset<T, SmsMessageCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many SmsMessages and returns the data saved in the database.
     * @param {SmsMessageCreateManyAndReturnArgs} args - Arguments to create many SmsMessages.
     * @example
     * // Create many SmsMessages
     * const smsMessage = await prisma.smsMessage.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many SmsMessages and only return the `id`
     * const smsMessageWithIdOnly = await prisma.smsMessage.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SmsMessageCreateManyAndReturnArgs>(args?: SelectSubset<T, SmsMessageCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SmsMessagePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a SmsMessage.
     * @param {SmsMessageDeleteArgs} args - Arguments to delete one SmsMessage.
     * @example
     * // Delete one SmsMessage
     * const SmsMessage = await prisma.smsMessage.delete({
     *   where: {
     *     // ... filter to delete one SmsMessage
     *   }
     * })
     * 
     */
    delete<T extends SmsMessageDeleteArgs>(args: SelectSubset<T, SmsMessageDeleteArgs<ExtArgs>>): Prisma__SmsMessageClient<$Result.GetResult<Prisma.$SmsMessagePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one SmsMessage.
     * @param {SmsMessageUpdateArgs} args - Arguments to update one SmsMessage.
     * @example
     * // Update one SmsMessage
     * const smsMessage = await prisma.smsMessage.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SmsMessageUpdateArgs>(args: SelectSubset<T, SmsMessageUpdateArgs<ExtArgs>>): Prisma__SmsMessageClient<$Result.GetResult<Prisma.$SmsMessagePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more SmsMessages.
     * @param {SmsMessageDeleteManyArgs} args - Arguments to filter SmsMessages to delete.
     * @example
     * // Delete a few SmsMessages
     * const { count } = await prisma.smsMessage.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SmsMessageDeleteManyArgs>(args?: SelectSubset<T, SmsMessageDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SmsMessages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SmsMessageUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SmsMessages
     * const smsMessage = await prisma.smsMessage.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SmsMessageUpdateManyArgs>(args: SelectSubset<T, SmsMessageUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SmsMessages and returns the data updated in the database.
     * @param {SmsMessageUpdateManyAndReturnArgs} args - Arguments to update many SmsMessages.
     * @example
     * // Update many SmsMessages
     * const smsMessage = await prisma.smsMessage.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more SmsMessages and only return the `id`
     * const smsMessageWithIdOnly = await prisma.smsMessage.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SmsMessageUpdateManyAndReturnArgs>(args: SelectSubset<T, SmsMessageUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SmsMessagePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one SmsMessage.
     * @param {SmsMessageUpsertArgs} args - Arguments to update or create a SmsMessage.
     * @example
     * // Update or create a SmsMessage
     * const smsMessage = await prisma.smsMessage.upsert({
     *   create: {
     *     // ... data to create a SmsMessage
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SmsMessage we want to update
     *   }
     * })
     */
    upsert<T extends SmsMessageUpsertArgs>(args: SelectSubset<T, SmsMessageUpsertArgs<ExtArgs>>): Prisma__SmsMessageClient<$Result.GetResult<Prisma.$SmsMessagePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of SmsMessages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SmsMessageCountArgs} args - Arguments to filter SmsMessages to count.
     * @example
     * // Count the number of SmsMessages
     * const count = await prisma.smsMessage.count({
     *   where: {
     *     // ... the filter for the SmsMessages we want to count
     *   }
     * })
    **/
    count<T extends SmsMessageCountArgs>(
      args?: Subset<T, SmsMessageCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SmsMessageCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SmsMessage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SmsMessageAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SmsMessageAggregateArgs>(args: Subset<T, SmsMessageAggregateArgs>): Prisma.PrismaPromise<GetSmsMessageAggregateType<T>>

    /**
     * Group by SmsMessage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SmsMessageGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SmsMessageGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SmsMessageGroupByArgs['orderBy'] }
        : { orderBy?: SmsMessageGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SmsMessageGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSmsMessageGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SmsMessage model
   */
  readonly fields: SmsMessageFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SmsMessage.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SmsMessageClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the SmsMessage model
   */
  interface SmsMessageFieldRefs {
    readonly id: FieldRef<"SmsMessage", 'BigInt'>
    readonly source: FieldRef<"SmsMessage", 'String'>
    readonly externalId: FieldRef<"SmsMessage", 'String'>
    readonly address: FieldRef<"SmsMessage", 'String'>
    readonly body: FieldRef<"SmsMessage", 'String'>
    readonly date: FieldRef<"SmsMessage", 'BigInt'>
    readonly type: FieldRef<"SmsMessage", 'Int'>
    readonly threadId: FieldRef<"SmsMessage", 'String'>
    readonly read: FieldRef<"SmsMessage", 'Int'>
    readonly receivedAt: FieldRef<"SmsMessage", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * SmsMessage findUnique
   */
  export type SmsMessageFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SmsMessage
     */
    select?: SmsMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SmsMessage
     */
    omit?: SmsMessageOmit<ExtArgs> | null
    /**
     * Filter, which SmsMessage to fetch.
     */
    where: SmsMessageWhereUniqueInput
  }

  /**
   * SmsMessage findUniqueOrThrow
   */
  export type SmsMessageFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SmsMessage
     */
    select?: SmsMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SmsMessage
     */
    omit?: SmsMessageOmit<ExtArgs> | null
    /**
     * Filter, which SmsMessage to fetch.
     */
    where: SmsMessageWhereUniqueInput
  }

  /**
   * SmsMessage findFirst
   */
  export type SmsMessageFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SmsMessage
     */
    select?: SmsMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SmsMessage
     */
    omit?: SmsMessageOmit<ExtArgs> | null
    /**
     * Filter, which SmsMessage to fetch.
     */
    where?: SmsMessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SmsMessages to fetch.
     */
    orderBy?: SmsMessageOrderByWithRelationInput | SmsMessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SmsMessages.
     */
    cursor?: SmsMessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SmsMessages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SmsMessages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SmsMessages.
     */
    distinct?: SmsMessageScalarFieldEnum | SmsMessageScalarFieldEnum[]
  }

  /**
   * SmsMessage findFirstOrThrow
   */
  export type SmsMessageFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SmsMessage
     */
    select?: SmsMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SmsMessage
     */
    omit?: SmsMessageOmit<ExtArgs> | null
    /**
     * Filter, which SmsMessage to fetch.
     */
    where?: SmsMessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SmsMessages to fetch.
     */
    orderBy?: SmsMessageOrderByWithRelationInput | SmsMessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SmsMessages.
     */
    cursor?: SmsMessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SmsMessages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SmsMessages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SmsMessages.
     */
    distinct?: SmsMessageScalarFieldEnum | SmsMessageScalarFieldEnum[]
  }

  /**
   * SmsMessage findMany
   */
  export type SmsMessageFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SmsMessage
     */
    select?: SmsMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SmsMessage
     */
    omit?: SmsMessageOmit<ExtArgs> | null
    /**
     * Filter, which SmsMessages to fetch.
     */
    where?: SmsMessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SmsMessages to fetch.
     */
    orderBy?: SmsMessageOrderByWithRelationInput | SmsMessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SmsMessages.
     */
    cursor?: SmsMessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SmsMessages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SmsMessages.
     */
    skip?: number
    distinct?: SmsMessageScalarFieldEnum | SmsMessageScalarFieldEnum[]
  }

  /**
   * SmsMessage create
   */
  export type SmsMessageCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SmsMessage
     */
    select?: SmsMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SmsMessage
     */
    omit?: SmsMessageOmit<ExtArgs> | null
    /**
     * The data needed to create a SmsMessage.
     */
    data: XOR<SmsMessageCreateInput, SmsMessageUncheckedCreateInput>
  }

  /**
   * SmsMessage createMany
   */
  export type SmsMessageCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SmsMessages.
     */
    data: SmsMessageCreateManyInput | SmsMessageCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SmsMessage createManyAndReturn
   */
  export type SmsMessageCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SmsMessage
     */
    select?: SmsMessageSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SmsMessage
     */
    omit?: SmsMessageOmit<ExtArgs> | null
    /**
     * The data used to create many SmsMessages.
     */
    data: SmsMessageCreateManyInput | SmsMessageCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SmsMessage update
   */
  export type SmsMessageUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SmsMessage
     */
    select?: SmsMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SmsMessage
     */
    omit?: SmsMessageOmit<ExtArgs> | null
    /**
     * The data needed to update a SmsMessage.
     */
    data: XOR<SmsMessageUpdateInput, SmsMessageUncheckedUpdateInput>
    /**
     * Choose, which SmsMessage to update.
     */
    where: SmsMessageWhereUniqueInput
  }

  /**
   * SmsMessage updateMany
   */
  export type SmsMessageUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SmsMessages.
     */
    data: XOR<SmsMessageUpdateManyMutationInput, SmsMessageUncheckedUpdateManyInput>
    /**
     * Filter which SmsMessages to update
     */
    where?: SmsMessageWhereInput
    /**
     * Limit how many SmsMessages to update.
     */
    limit?: number
  }

  /**
   * SmsMessage updateManyAndReturn
   */
  export type SmsMessageUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SmsMessage
     */
    select?: SmsMessageSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SmsMessage
     */
    omit?: SmsMessageOmit<ExtArgs> | null
    /**
     * The data used to update SmsMessages.
     */
    data: XOR<SmsMessageUpdateManyMutationInput, SmsMessageUncheckedUpdateManyInput>
    /**
     * Filter which SmsMessages to update
     */
    where?: SmsMessageWhereInput
    /**
     * Limit how many SmsMessages to update.
     */
    limit?: number
  }

  /**
   * SmsMessage upsert
   */
  export type SmsMessageUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SmsMessage
     */
    select?: SmsMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SmsMessage
     */
    omit?: SmsMessageOmit<ExtArgs> | null
    /**
     * The filter to search for the SmsMessage to update in case it exists.
     */
    where: SmsMessageWhereUniqueInput
    /**
     * In case the SmsMessage found by the `where` argument doesn't exist, create a new SmsMessage with this data.
     */
    create: XOR<SmsMessageCreateInput, SmsMessageUncheckedCreateInput>
    /**
     * In case the SmsMessage was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SmsMessageUpdateInput, SmsMessageUncheckedUpdateInput>
  }

  /**
   * SmsMessage delete
   */
  export type SmsMessageDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SmsMessage
     */
    select?: SmsMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SmsMessage
     */
    omit?: SmsMessageOmit<ExtArgs> | null
    /**
     * Filter which SmsMessage to delete.
     */
    where: SmsMessageWhereUniqueInput
  }

  /**
   * SmsMessage deleteMany
   */
  export type SmsMessageDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SmsMessages to delete
     */
    where?: SmsMessageWhereInput
    /**
     * Limit how many SmsMessages to delete.
     */
    limit?: number
  }

  /**
   * SmsMessage without action
   */
  export type SmsMessageDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SmsMessage
     */
    select?: SmsMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SmsMessage
     */
    omit?: SmsMessageOmit<ExtArgs> | null
  }


  /**
   * Model CallEntry
   */

  export type AggregateCallEntry = {
    _count: CallEntryCountAggregateOutputType | null
    _avg: CallEntryAvgAggregateOutputType | null
    _sum: CallEntrySumAggregateOutputType | null
    _min: CallEntryMinAggregateOutputType | null
    _max: CallEntryMaxAggregateOutputType | null
  }

  export type CallEntryAvgAggregateOutputType = {
    id: number | null
    duration: number | null
    date: number | null
    type: number | null
  }

  export type CallEntrySumAggregateOutputType = {
    id: bigint | null
    duration: number | null
    date: bigint | null
    type: number | null
  }

  export type CallEntryMinAggregateOutputType = {
    id: bigint | null
    source: string | null
    externalId: string | null
    number: string | null
    duration: number | null
    date: bigint | null
    type: number | null
    name: string | null
    receivedAt: Date | null
  }

  export type CallEntryMaxAggregateOutputType = {
    id: bigint | null
    source: string | null
    externalId: string | null
    number: string | null
    duration: number | null
    date: bigint | null
    type: number | null
    name: string | null
    receivedAt: Date | null
  }

  export type CallEntryCountAggregateOutputType = {
    id: number
    source: number
    externalId: number
    number: number
    duration: number
    date: number
    type: number
    name: number
    receivedAt: number
    _all: number
  }


  export type CallEntryAvgAggregateInputType = {
    id?: true
    duration?: true
    date?: true
    type?: true
  }

  export type CallEntrySumAggregateInputType = {
    id?: true
    duration?: true
    date?: true
    type?: true
  }

  export type CallEntryMinAggregateInputType = {
    id?: true
    source?: true
    externalId?: true
    number?: true
    duration?: true
    date?: true
    type?: true
    name?: true
    receivedAt?: true
  }

  export type CallEntryMaxAggregateInputType = {
    id?: true
    source?: true
    externalId?: true
    number?: true
    duration?: true
    date?: true
    type?: true
    name?: true
    receivedAt?: true
  }

  export type CallEntryCountAggregateInputType = {
    id?: true
    source?: true
    externalId?: true
    number?: true
    duration?: true
    date?: true
    type?: true
    name?: true
    receivedAt?: true
    _all?: true
  }

  export type CallEntryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CallEntry to aggregate.
     */
    where?: CallEntryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CallEntries to fetch.
     */
    orderBy?: CallEntryOrderByWithRelationInput | CallEntryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CallEntryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CallEntries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CallEntries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CallEntries
    **/
    _count?: true | CallEntryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CallEntryAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CallEntrySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CallEntryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CallEntryMaxAggregateInputType
  }

  export type GetCallEntryAggregateType<T extends CallEntryAggregateArgs> = {
        [P in keyof T & keyof AggregateCallEntry]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCallEntry[P]>
      : GetScalarType<T[P], AggregateCallEntry[P]>
  }




  export type CallEntryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CallEntryWhereInput
    orderBy?: CallEntryOrderByWithAggregationInput | CallEntryOrderByWithAggregationInput[]
    by: CallEntryScalarFieldEnum[] | CallEntryScalarFieldEnum
    having?: CallEntryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CallEntryCountAggregateInputType | true
    _avg?: CallEntryAvgAggregateInputType
    _sum?: CallEntrySumAggregateInputType
    _min?: CallEntryMinAggregateInputType
    _max?: CallEntryMaxAggregateInputType
  }

  export type CallEntryGroupByOutputType = {
    id: bigint
    source: string
    externalId: string
    number: string
    duration: number
    date: bigint
    type: number
    name: string | null
    receivedAt: Date
    _count: CallEntryCountAggregateOutputType | null
    _avg: CallEntryAvgAggregateOutputType | null
    _sum: CallEntrySumAggregateOutputType | null
    _min: CallEntryMinAggregateOutputType | null
    _max: CallEntryMaxAggregateOutputType | null
  }

  type GetCallEntryGroupByPayload<T extends CallEntryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CallEntryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CallEntryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CallEntryGroupByOutputType[P]>
            : GetScalarType<T[P], CallEntryGroupByOutputType[P]>
        }
      >
    >


  export type CallEntrySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    source?: boolean
    externalId?: boolean
    number?: boolean
    duration?: boolean
    date?: boolean
    type?: boolean
    name?: boolean
    receivedAt?: boolean
  }, ExtArgs["result"]["callEntry"]>

  export type CallEntrySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    source?: boolean
    externalId?: boolean
    number?: boolean
    duration?: boolean
    date?: boolean
    type?: boolean
    name?: boolean
    receivedAt?: boolean
  }, ExtArgs["result"]["callEntry"]>

  export type CallEntrySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    source?: boolean
    externalId?: boolean
    number?: boolean
    duration?: boolean
    date?: boolean
    type?: boolean
    name?: boolean
    receivedAt?: boolean
  }, ExtArgs["result"]["callEntry"]>

  export type CallEntrySelectScalar = {
    id?: boolean
    source?: boolean
    externalId?: boolean
    number?: boolean
    duration?: boolean
    date?: boolean
    type?: boolean
    name?: boolean
    receivedAt?: boolean
  }

  export type CallEntryOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "source" | "externalId" | "number" | "duration" | "date" | "type" | "name" | "receivedAt", ExtArgs["result"]["callEntry"]>

  export type $CallEntryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CallEntry"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: bigint
      source: string
      externalId: string
      number: string
      duration: number
      date: bigint
      type: number
      name: string | null
      receivedAt: Date
    }, ExtArgs["result"]["callEntry"]>
    composites: {}
  }

  type CallEntryGetPayload<S extends boolean | null | undefined | CallEntryDefaultArgs> = $Result.GetResult<Prisma.$CallEntryPayload, S>

  type CallEntryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CallEntryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CallEntryCountAggregateInputType | true
    }

  export interface CallEntryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CallEntry'], meta: { name: 'CallEntry' } }
    /**
     * Find zero or one CallEntry that matches the filter.
     * @param {CallEntryFindUniqueArgs} args - Arguments to find a CallEntry
     * @example
     * // Get one CallEntry
     * const callEntry = await prisma.callEntry.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CallEntryFindUniqueArgs>(args: SelectSubset<T, CallEntryFindUniqueArgs<ExtArgs>>): Prisma__CallEntryClient<$Result.GetResult<Prisma.$CallEntryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one CallEntry that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CallEntryFindUniqueOrThrowArgs} args - Arguments to find a CallEntry
     * @example
     * // Get one CallEntry
     * const callEntry = await prisma.callEntry.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CallEntryFindUniqueOrThrowArgs>(args: SelectSubset<T, CallEntryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CallEntryClient<$Result.GetResult<Prisma.$CallEntryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CallEntry that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CallEntryFindFirstArgs} args - Arguments to find a CallEntry
     * @example
     * // Get one CallEntry
     * const callEntry = await prisma.callEntry.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CallEntryFindFirstArgs>(args?: SelectSubset<T, CallEntryFindFirstArgs<ExtArgs>>): Prisma__CallEntryClient<$Result.GetResult<Prisma.$CallEntryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CallEntry that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CallEntryFindFirstOrThrowArgs} args - Arguments to find a CallEntry
     * @example
     * // Get one CallEntry
     * const callEntry = await prisma.callEntry.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CallEntryFindFirstOrThrowArgs>(args?: SelectSubset<T, CallEntryFindFirstOrThrowArgs<ExtArgs>>): Prisma__CallEntryClient<$Result.GetResult<Prisma.$CallEntryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more CallEntries that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CallEntryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CallEntries
     * const callEntries = await prisma.callEntry.findMany()
     * 
     * // Get first 10 CallEntries
     * const callEntries = await prisma.callEntry.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const callEntryWithIdOnly = await prisma.callEntry.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CallEntryFindManyArgs>(args?: SelectSubset<T, CallEntryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CallEntryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a CallEntry.
     * @param {CallEntryCreateArgs} args - Arguments to create a CallEntry.
     * @example
     * // Create one CallEntry
     * const CallEntry = await prisma.callEntry.create({
     *   data: {
     *     // ... data to create a CallEntry
     *   }
     * })
     * 
     */
    create<T extends CallEntryCreateArgs>(args: SelectSubset<T, CallEntryCreateArgs<ExtArgs>>): Prisma__CallEntryClient<$Result.GetResult<Prisma.$CallEntryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many CallEntries.
     * @param {CallEntryCreateManyArgs} args - Arguments to create many CallEntries.
     * @example
     * // Create many CallEntries
     * const callEntry = await prisma.callEntry.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CallEntryCreateManyArgs>(args?: SelectSubset<T, CallEntryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CallEntries and returns the data saved in the database.
     * @param {CallEntryCreateManyAndReturnArgs} args - Arguments to create many CallEntries.
     * @example
     * // Create many CallEntries
     * const callEntry = await prisma.callEntry.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CallEntries and only return the `id`
     * const callEntryWithIdOnly = await prisma.callEntry.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CallEntryCreateManyAndReturnArgs>(args?: SelectSubset<T, CallEntryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CallEntryPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a CallEntry.
     * @param {CallEntryDeleteArgs} args - Arguments to delete one CallEntry.
     * @example
     * // Delete one CallEntry
     * const CallEntry = await prisma.callEntry.delete({
     *   where: {
     *     // ... filter to delete one CallEntry
     *   }
     * })
     * 
     */
    delete<T extends CallEntryDeleteArgs>(args: SelectSubset<T, CallEntryDeleteArgs<ExtArgs>>): Prisma__CallEntryClient<$Result.GetResult<Prisma.$CallEntryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one CallEntry.
     * @param {CallEntryUpdateArgs} args - Arguments to update one CallEntry.
     * @example
     * // Update one CallEntry
     * const callEntry = await prisma.callEntry.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CallEntryUpdateArgs>(args: SelectSubset<T, CallEntryUpdateArgs<ExtArgs>>): Prisma__CallEntryClient<$Result.GetResult<Prisma.$CallEntryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more CallEntries.
     * @param {CallEntryDeleteManyArgs} args - Arguments to filter CallEntries to delete.
     * @example
     * // Delete a few CallEntries
     * const { count } = await prisma.callEntry.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CallEntryDeleteManyArgs>(args?: SelectSubset<T, CallEntryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CallEntries.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CallEntryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CallEntries
     * const callEntry = await prisma.callEntry.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CallEntryUpdateManyArgs>(args: SelectSubset<T, CallEntryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CallEntries and returns the data updated in the database.
     * @param {CallEntryUpdateManyAndReturnArgs} args - Arguments to update many CallEntries.
     * @example
     * // Update many CallEntries
     * const callEntry = await prisma.callEntry.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more CallEntries and only return the `id`
     * const callEntryWithIdOnly = await prisma.callEntry.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CallEntryUpdateManyAndReturnArgs>(args: SelectSubset<T, CallEntryUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CallEntryPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one CallEntry.
     * @param {CallEntryUpsertArgs} args - Arguments to update or create a CallEntry.
     * @example
     * // Update or create a CallEntry
     * const callEntry = await prisma.callEntry.upsert({
     *   create: {
     *     // ... data to create a CallEntry
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CallEntry we want to update
     *   }
     * })
     */
    upsert<T extends CallEntryUpsertArgs>(args: SelectSubset<T, CallEntryUpsertArgs<ExtArgs>>): Prisma__CallEntryClient<$Result.GetResult<Prisma.$CallEntryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of CallEntries.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CallEntryCountArgs} args - Arguments to filter CallEntries to count.
     * @example
     * // Count the number of CallEntries
     * const count = await prisma.callEntry.count({
     *   where: {
     *     // ... the filter for the CallEntries we want to count
     *   }
     * })
    **/
    count<T extends CallEntryCountArgs>(
      args?: Subset<T, CallEntryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CallEntryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CallEntry.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CallEntryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CallEntryAggregateArgs>(args: Subset<T, CallEntryAggregateArgs>): Prisma.PrismaPromise<GetCallEntryAggregateType<T>>

    /**
     * Group by CallEntry.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CallEntryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CallEntryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CallEntryGroupByArgs['orderBy'] }
        : { orderBy?: CallEntryGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CallEntryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCallEntryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CallEntry model
   */
  readonly fields: CallEntryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CallEntry.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CallEntryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the CallEntry model
   */
  interface CallEntryFieldRefs {
    readonly id: FieldRef<"CallEntry", 'BigInt'>
    readonly source: FieldRef<"CallEntry", 'String'>
    readonly externalId: FieldRef<"CallEntry", 'String'>
    readonly number: FieldRef<"CallEntry", 'String'>
    readonly duration: FieldRef<"CallEntry", 'Int'>
    readonly date: FieldRef<"CallEntry", 'BigInt'>
    readonly type: FieldRef<"CallEntry", 'Int'>
    readonly name: FieldRef<"CallEntry", 'String'>
    readonly receivedAt: FieldRef<"CallEntry", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * CallEntry findUnique
   */
  export type CallEntryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CallEntry
     */
    select?: CallEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the CallEntry
     */
    omit?: CallEntryOmit<ExtArgs> | null
    /**
     * Filter, which CallEntry to fetch.
     */
    where: CallEntryWhereUniqueInput
  }

  /**
   * CallEntry findUniqueOrThrow
   */
  export type CallEntryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CallEntry
     */
    select?: CallEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the CallEntry
     */
    omit?: CallEntryOmit<ExtArgs> | null
    /**
     * Filter, which CallEntry to fetch.
     */
    where: CallEntryWhereUniqueInput
  }

  /**
   * CallEntry findFirst
   */
  export type CallEntryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CallEntry
     */
    select?: CallEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the CallEntry
     */
    omit?: CallEntryOmit<ExtArgs> | null
    /**
     * Filter, which CallEntry to fetch.
     */
    where?: CallEntryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CallEntries to fetch.
     */
    orderBy?: CallEntryOrderByWithRelationInput | CallEntryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CallEntries.
     */
    cursor?: CallEntryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CallEntries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CallEntries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CallEntries.
     */
    distinct?: CallEntryScalarFieldEnum | CallEntryScalarFieldEnum[]
  }

  /**
   * CallEntry findFirstOrThrow
   */
  export type CallEntryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CallEntry
     */
    select?: CallEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the CallEntry
     */
    omit?: CallEntryOmit<ExtArgs> | null
    /**
     * Filter, which CallEntry to fetch.
     */
    where?: CallEntryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CallEntries to fetch.
     */
    orderBy?: CallEntryOrderByWithRelationInput | CallEntryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CallEntries.
     */
    cursor?: CallEntryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CallEntries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CallEntries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CallEntries.
     */
    distinct?: CallEntryScalarFieldEnum | CallEntryScalarFieldEnum[]
  }

  /**
   * CallEntry findMany
   */
  export type CallEntryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CallEntry
     */
    select?: CallEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the CallEntry
     */
    omit?: CallEntryOmit<ExtArgs> | null
    /**
     * Filter, which CallEntries to fetch.
     */
    where?: CallEntryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CallEntries to fetch.
     */
    orderBy?: CallEntryOrderByWithRelationInput | CallEntryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CallEntries.
     */
    cursor?: CallEntryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CallEntries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CallEntries.
     */
    skip?: number
    distinct?: CallEntryScalarFieldEnum | CallEntryScalarFieldEnum[]
  }

  /**
   * CallEntry create
   */
  export type CallEntryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CallEntry
     */
    select?: CallEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the CallEntry
     */
    omit?: CallEntryOmit<ExtArgs> | null
    /**
     * The data needed to create a CallEntry.
     */
    data: XOR<CallEntryCreateInput, CallEntryUncheckedCreateInput>
  }

  /**
   * CallEntry createMany
   */
  export type CallEntryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CallEntries.
     */
    data: CallEntryCreateManyInput | CallEntryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CallEntry createManyAndReturn
   */
  export type CallEntryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CallEntry
     */
    select?: CallEntrySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CallEntry
     */
    omit?: CallEntryOmit<ExtArgs> | null
    /**
     * The data used to create many CallEntries.
     */
    data: CallEntryCreateManyInput | CallEntryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CallEntry update
   */
  export type CallEntryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CallEntry
     */
    select?: CallEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the CallEntry
     */
    omit?: CallEntryOmit<ExtArgs> | null
    /**
     * The data needed to update a CallEntry.
     */
    data: XOR<CallEntryUpdateInput, CallEntryUncheckedUpdateInput>
    /**
     * Choose, which CallEntry to update.
     */
    where: CallEntryWhereUniqueInput
  }

  /**
   * CallEntry updateMany
   */
  export type CallEntryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CallEntries.
     */
    data: XOR<CallEntryUpdateManyMutationInput, CallEntryUncheckedUpdateManyInput>
    /**
     * Filter which CallEntries to update
     */
    where?: CallEntryWhereInput
    /**
     * Limit how many CallEntries to update.
     */
    limit?: number
  }

  /**
   * CallEntry updateManyAndReturn
   */
  export type CallEntryUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CallEntry
     */
    select?: CallEntrySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CallEntry
     */
    omit?: CallEntryOmit<ExtArgs> | null
    /**
     * The data used to update CallEntries.
     */
    data: XOR<CallEntryUpdateManyMutationInput, CallEntryUncheckedUpdateManyInput>
    /**
     * Filter which CallEntries to update
     */
    where?: CallEntryWhereInput
    /**
     * Limit how many CallEntries to update.
     */
    limit?: number
  }

  /**
   * CallEntry upsert
   */
  export type CallEntryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CallEntry
     */
    select?: CallEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the CallEntry
     */
    omit?: CallEntryOmit<ExtArgs> | null
    /**
     * The filter to search for the CallEntry to update in case it exists.
     */
    where: CallEntryWhereUniqueInput
    /**
     * In case the CallEntry found by the `where` argument doesn't exist, create a new CallEntry with this data.
     */
    create: XOR<CallEntryCreateInput, CallEntryUncheckedCreateInput>
    /**
     * In case the CallEntry was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CallEntryUpdateInput, CallEntryUncheckedUpdateInput>
  }

  /**
   * CallEntry delete
   */
  export type CallEntryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CallEntry
     */
    select?: CallEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the CallEntry
     */
    omit?: CallEntryOmit<ExtArgs> | null
    /**
     * Filter which CallEntry to delete.
     */
    where: CallEntryWhereUniqueInput
  }

  /**
   * CallEntry deleteMany
   */
  export type CallEntryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CallEntries to delete
     */
    where?: CallEntryWhereInput
    /**
     * Limit how many CallEntries to delete.
     */
    limit?: number
  }

  /**
   * CallEntry without action
   */
  export type CallEntryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CallEntry
     */
    select?: CallEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the CallEntry
     */
    omit?: CallEntryOmit<ExtArgs> | null
  }


  /**
   * Model Notification
   */

  export type AggregateNotification = {
    _count: NotificationCountAggregateOutputType | null
    _avg: NotificationAvgAggregateOutputType | null
    _sum: NotificationSumAggregateOutputType | null
    _min: NotificationMinAggregateOutputType | null
    _max: NotificationMaxAggregateOutputType | null
  }

  export type NotificationAvgAggregateOutputType = {
    id: number | null
    timestamp: number | null
  }

  export type NotificationSumAggregateOutputType = {
    id: bigint | null
    timestamp: bigint | null
  }

  export type NotificationMinAggregateOutputType = {
    id: bigint | null
    source: string | null
    externalId: string | null
    pkg: string | null
    title: string | null
    text: string | null
    timestamp: bigint | null
    receivedAt: Date | null
  }

  export type NotificationMaxAggregateOutputType = {
    id: bigint | null
    source: string | null
    externalId: string | null
    pkg: string | null
    title: string | null
    text: string | null
    timestamp: bigint | null
    receivedAt: Date | null
  }

  export type NotificationCountAggregateOutputType = {
    id: number
    source: number
    externalId: number
    pkg: number
    title: number
    text: number
    timestamp: number
    receivedAt: number
    _all: number
  }


  export type NotificationAvgAggregateInputType = {
    id?: true
    timestamp?: true
  }

  export type NotificationSumAggregateInputType = {
    id?: true
    timestamp?: true
  }

  export type NotificationMinAggregateInputType = {
    id?: true
    source?: true
    externalId?: true
    pkg?: true
    title?: true
    text?: true
    timestamp?: true
    receivedAt?: true
  }

  export type NotificationMaxAggregateInputType = {
    id?: true
    source?: true
    externalId?: true
    pkg?: true
    title?: true
    text?: true
    timestamp?: true
    receivedAt?: true
  }

  export type NotificationCountAggregateInputType = {
    id?: true
    source?: true
    externalId?: true
    pkg?: true
    title?: true
    text?: true
    timestamp?: true
    receivedAt?: true
    _all?: true
  }

  export type NotificationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Notification to aggregate.
     */
    where?: NotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notifications to fetch.
     */
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: NotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Notifications
    **/
    _count?: true | NotificationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: NotificationAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: NotificationSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: NotificationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: NotificationMaxAggregateInputType
  }

  export type GetNotificationAggregateType<T extends NotificationAggregateArgs> = {
        [P in keyof T & keyof AggregateNotification]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateNotification[P]>
      : GetScalarType<T[P], AggregateNotification[P]>
  }




  export type NotificationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NotificationWhereInput
    orderBy?: NotificationOrderByWithAggregationInput | NotificationOrderByWithAggregationInput[]
    by: NotificationScalarFieldEnum[] | NotificationScalarFieldEnum
    having?: NotificationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: NotificationCountAggregateInputType | true
    _avg?: NotificationAvgAggregateInputType
    _sum?: NotificationSumAggregateInputType
    _min?: NotificationMinAggregateInputType
    _max?: NotificationMaxAggregateInputType
  }

  export type NotificationGroupByOutputType = {
    id: bigint
    source: string
    externalId: string
    pkg: string
    title: string | null
    text: string | null
    timestamp: bigint
    receivedAt: Date
    _count: NotificationCountAggregateOutputType | null
    _avg: NotificationAvgAggregateOutputType | null
    _sum: NotificationSumAggregateOutputType | null
    _min: NotificationMinAggregateOutputType | null
    _max: NotificationMaxAggregateOutputType | null
  }

  type GetNotificationGroupByPayload<T extends NotificationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<NotificationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof NotificationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], NotificationGroupByOutputType[P]>
            : GetScalarType<T[P], NotificationGroupByOutputType[P]>
        }
      >
    >


  export type NotificationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    source?: boolean
    externalId?: boolean
    pkg?: boolean
    title?: boolean
    text?: boolean
    timestamp?: boolean
    receivedAt?: boolean
  }, ExtArgs["result"]["notification"]>

  export type NotificationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    source?: boolean
    externalId?: boolean
    pkg?: boolean
    title?: boolean
    text?: boolean
    timestamp?: boolean
    receivedAt?: boolean
  }, ExtArgs["result"]["notification"]>

  export type NotificationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    source?: boolean
    externalId?: boolean
    pkg?: boolean
    title?: boolean
    text?: boolean
    timestamp?: boolean
    receivedAt?: boolean
  }, ExtArgs["result"]["notification"]>

  export type NotificationSelectScalar = {
    id?: boolean
    source?: boolean
    externalId?: boolean
    pkg?: boolean
    title?: boolean
    text?: boolean
    timestamp?: boolean
    receivedAt?: boolean
  }

  export type NotificationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "source" | "externalId" | "pkg" | "title" | "text" | "timestamp" | "receivedAt", ExtArgs["result"]["notification"]>

  export type $NotificationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Notification"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: bigint
      source: string
      externalId: string
      pkg: string
      title: string | null
      text: string | null
      timestamp: bigint
      receivedAt: Date
    }, ExtArgs["result"]["notification"]>
    composites: {}
  }

  type NotificationGetPayload<S extends boolean | null | undefined | NotificationDefaultArgs> = $Result.GetResult<Prisma.$NotificationPayload, S>

  type NotificationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<NotificationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: NotificationCountAggregateInputType | true
    }

  export interface NotificationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Notification'], meta: { name: 'Notification' } }
    /**
     * Find zero or one Notification that matches the filter.
     * @param {NotificationFindUniqueArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends NotificationFindUniqueArgs>(args: SelectSubset<T, NotificationFindUniqueArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Notification that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {NotificationFindUniqueOrThrowArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends NotificationFindUniqueOrThrowArgs>(args: SelectSubset<T, NotificationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Notification that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationFindFirstArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends NotificationFindFirstArgs>(args?: SelectSubset<T, NotificationFindFirstArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Notification that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationFindFirstOrThrowArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends NotificationFindFirstOrThrowArgs>(args?: SelectSubset<T, NotificationFindFirstOrThrowArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Notifications that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Notifications
     * const notifications = await prisma.notification.findMany()
     * 
     * // Get first 10 Notifications
     * const notifications = await prisma.notification.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const notificationWithIdOnly = await prisma.notification.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends NotificationFindManyArgs>(args?: SelectSubset<T, NotificationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Notification.
     * @param {NotificationCreateArgs} args - Arguments to create a Notification.
     * @example
     * // Create one Notification
     * const Notification = await prisma.notification.create({
     *   data: {
     *     // ... data to create a Notification
     *   }
     * })
     * 
     */
    create<T extends NotificationCreateArgs>(args: SelectSubset<T, NotificationCreateArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Notifications.
     * @param {NotificationCreateManyArgs} args - Arguments to create many Notifications.
     * @example
     * // Create many Notifications
     * const notification = await prisma.notification.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends NotificationCreateManyArgs>(args?: SelectSubset<T, NotificationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Notifications and returns the data saved in the database.
     * @param {NotificationCreateManyAndReturnArgs} args - Arguments to create many Notifications.
     * @example
     * // Create many Notifications
     * const notification = await prisma.notification.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Notifications and only return the `id`
     * const notificationWithIdOnly = await prisma.notification.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends NotificationCreateManyAndReturnArgs>(args?: SelectSubset<T, NotificationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Notification.
     * @param {NotificationDeleteArgs} args - Arguments to delete one Notification.
     * @example
     * // Delete one Notification
     * const Notification = await prisma.notification.delete({
     *   where: {
     *     // ... filter to delete one Notification
     *   }
     * })
     * 
     */
    delete<T extends NotificationDeleteArgs>(args: SelectSubset<T, NotificationDeleteArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Notification.
     * @param {NotificationUpdateArgs} args - Arguments to update one Notification.
     * @example
     * // Update one Notification
     * const notification = await prisma.notification.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends NotificationUpdateArgs>(args: SelectSubset<T, NotificationUpdateArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Notifications.
     * @param {NotificationDeleteManyArgs} args - Arguments to filter Notifications to delete.
     * @example
     * // Delete a few Notifications
     * const { count } = await prisma.notification.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends NotificationDeleteManyArgs>(args?: SelectSubset<T, NotificationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Notifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Notifications
     * const notification = await prisma.notification.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends NotificationUpdateManyArgs>(args: SelectSubset<T, NotificationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Notifications and returns the data updated in the database.
     * @param {NotificationUpdateManyAndReturnArgs} args - Arguments to update many Notifications.
     * @example
     * // Update many Notifications
     * const notification = await prisma.notification.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Notifications and only return the `id`
     * const notificationWithIdOnly = await prisma.notification.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends NotificationUpdateManyAndReturnArgs>(args: SelectSubset<T, NotificationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Notification.
     * @param {NotificationUpsertArgs} args - Arguments to update or create a Notification.
     * @example
     * // Update or create a Notification
     * const notification = await prisma.notification.upsert({
     *   create: {
     *     // ... data to create a Notification
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Notification we want to update
     *   }
     * })
     */
    upsert<T extends NotificationUpsertArgs>(args: SelectSubset<T, NotificationUpsertArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Notifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationCountArgs} args - Arguments to filter Notifications to count.
     * @example
     * // Count the number of Notifications
     * const count = await prisma.notification.count({
     *   where: {
     *     // ... the filter for the Notifications we want to count
     *   }
     * })
    **/
    count<T extends NotificationCountArgs>(
      args?: Subset<T, NotificationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], NotificationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Notification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends NotificationAggregateArgs>(args: Subset<T, NotificationAggregateArgs>): Prisma.PrismaPromise<GetNotificationAggregateType<T>>

    /**
     * Group by Notification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends NotificationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: NotificationGroupByArgs['orderBy'] }
        : { orderBy?: NotificationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, NotificationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetNotificationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Notification model
   */
  readonly fields: NotificationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Notification.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__NotificationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Notification model
   */
  interface NotificationFieldRefs {
    readonly id: FieldRef<"Notification", 'BigInt'>
    readonly source: FieldRef<"Notification", 'String'>
    readonly externalId: FieldRef<"Notification", 'String'>
    readonly pkg: FieldRef<"Notification", 'String'>
    readonly title: FieldRef<"Notification", 'String'>
    readonly text: FieldRef<"Notification", 'String'>
    readonly timestamp: FieldRef<"Notification", 'BigInt'>
    readonly receivedAt: FieldRef<"Notification", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Notification findUnique
   */
  export type NotificationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Filter, which Notification to fetch.
     */
    where: NotificationWhereUniqueInput
  }

  /**
   * Notification findUniqueOrThrow
   */
  export type NotificationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Filter, which Notification to fetch.
     */
    where: NotificationWhereUniqueInput
  }

  /**
   * Notification findFirst
   */
  export type NotificationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Filter, which Notification to fetch.
     */
    where?: NotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notifications to fetch.
     */
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Notifications.
     */
    cursor?: NotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Notifications.
     */
    distinct?: NotificationScalarFieldEnum | NotificationScalarFieldEnum[]
  }

  /**
   * Notification findFirstOrThrow
   */
  export type NotificationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Filter, which Notification to fetch.
     */
    where?: NotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notifications to fetch.
     */
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Notifications.
     */
    cursor?: NotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Notifications.
     */
    distinct?: NotificationScalarFieldEnum | NotificationScalarFieldEnum[]
  }

  /**
   * Notification findMany
   */
  export type NotificationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Filter, which Notifications to fetch.
     */
    where?: NotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notifications to fetch.
     */
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Notifications.
     */
    cursor?: NotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notifications.
     */
    skip?: number
    distinct?: NotificationScalarFieldEnum | NotificationScalarFieldEnum[]
  }

  /**
   * Notification create
   */
  export type NotificationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * The data needed to create a Notification.
     */
    data: XOR<NotificationCreateInput, NotificationUncheckedCreateInput>
  }

  /**
   * Notification createMany
   */
  export type NotificationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Notifications.
     */
    data: NotificationCreateManyInput | NotificationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Notification createManyAndReturn
   */
  export type NotificationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * The data used to create many Notifications.
     */
    data: NotificationCreateManyInput | NotificationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Notification update
   */
  export type NotificationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * The data needed to update a Notification.
     */
    data: XOR<NotificationUpdateInput, NotificationUncheckedUpdateInput>
    /**
     * Choose, which Notification to update.
     */
    where: NotificationWhereUniqueInput
  }

  /**
   * Notification updateMany
   */
  export type NotificationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Notifications.
     */
    data: XOR<NotificationUpdateManyMutationInput, NotificationUncheckedUpdateManyInput>
    /**
     * Filter which Notifications to update
     */
    where?: NotificationWhereInput
    /**
     * Limit how many Notifications to update.
     */
    limit?: number
  }

  /**
   * Notification updateManyAndReturn
   */
  export type NotificationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * The data used to update Notifications.
     */
    data: XOR<NotificationUpdateManyMutationInput, NotificationUncheckedUpdateManyInput>
    /**
     * Filter which Notifications to update
     */
    where?: NotificationWhereInput
    /**
     * Limit how many Notifications to update.
     */
    limit?: number
  }

  /**
   * Notification upsert
   */
  export type NotificationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * The filter to search for the Notification to update in case it exists.
     */
    where: NotificationWhereUniqueInput
    /**
     * In case the Notification found by the `where` argument doesn't exist, create a new Notification with this data.
     */
    create: XOR<NotificationCreateInput, NotificationUncheckedCreateInput>
    /**
     * In case the Notification was found with the provided `where` argument, update it with this data.
     */
    update: XOR<NotificationUpdateInput, NotificationUncheckedUpdateInput>
  }

  /**
   * Notification delete
   */
  export type NotificationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Filter which Notification to delete.
     */
    where: NotificationWhereUniqueInput
  }

  /**
   * Notification deleteMany
   */
  export type NotificationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Notifications to delete
     */
    where?: NotificationWhereInput
    /**
     * Limit how many Notifications to delete.
     */
    limit?: number
  }

  /**
   * Notification without action
   */
  export type NotificationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const SmsMessageScalarFieldEnum: {
    id: 'id',
    source: 'source',
    externalId: 'externalId',
    address: 'address',
    body: 'body',
    date: 'date',
    type: 'type',
    threadId: 'threadId',
    read: 'read',
    receivedAt: 'receivedAt'
  };

  export type SmsMessageScalarFieldEnum = (typeof SmsMessageScalarFieldEnum)[keyof typeof SmsMessageScalarFieldEnum]


  export const CallEntryScalarFieldEnum: {
    id: 'id',
    source: 'source',
    externalId: 'externalId',
    number: 'number',
    duration: 'duration',
    date: 'date',
    type: 'type',
    name: 'name',
    receivedAt: 'receivedAt'
  };

  export type CallEntryScalarFieldEnum = (typeof CallEntryScalarFieldEnum)[keyof typeof CallEntryScalarFieldEnum]


  export const NotificationScalarFieldEnum: {
    id: 'id',
    source: 'source',
    externalId: 'externalId',
    pkg: 'pkg',
    title: 'title',
    text: 'text',
    timestamp: 'timestamp',
    receivedAt: 'receivedAt'
  };

  export type NotificationScalarFieldEnum = (typeof NotificationScalarFieldEnum)[keyof typeof NotificationScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'BigInt'
   */
  export type BigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt'>
    


  /**
   * Reference to a field of type 'BigInt[]'
   */
  export type ListBigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type SmsMessageWhereInput = {
    AND?: SmsMessageWhereInput | SmsMessageWhereInput[]
    OR?: SmsMessageWhereInput[]
    NOT?: SmsMessageWhereInput | SmsMessageWhereInput[]
    id?: BigIntFilter<"SmsMessage"> | bigint | number
    source?: StringFilter<"SmsMessage"> | string
    externalId?: StringFilter<"SmsMessage"> | string
    address?: StringFilter<"SmsMessage"> | string
    body?: StringFilter<"SmsMessage"> | string
    date?: BigIntFilter<"SmsMessage"> | bigint | number
    type?: IntFilter<"SmsMessage"> | number
    threadId?: StringFilter<"SmsMessage"> | string
    read?: IntFilter<"SmsMessage"> | number
    receivedAt?: DateTimeFilter<"SmsMessage"> | Date | string
  }

  export type SmsMessageOrderByWithRelationInput = {
    id?: SortOrder
    source?: SortOrder
    externalId?: SortOrder
    address?: SortOrder
    body?: SortOrder
    date?: SortOrder
    type?: SortOrder
    threadId?: SortOrder
    read?: SortOrder
    receivedAt?: SortOrder
  }

  export type SmsMessageWhereUniqueInput = Prisma.AtLeast<{
    id?: bigint | number
    source_externalId?: SmsMessageSourceExternalIdCompoundUniqueInput
    AND?: SmsMessageWhereInput | SmsMessageWhereInput[]
    OR?: SmsMessageWhereInput[]
    NOT?: SmsMessageWhereInput | SmsMessageWhereInput[]
    source?: StringFilter<"SmsMessage"> | string
    externalId?: StringFilter<"SmsMessage"> | string
    address?: StringFilter<"SmsMessage"> | string
    body?: StringFilter<"SmsMessage"> | string
    date?: BigIntFilter<"SmsMessage"> | bigint | number
    type?: IntFilter<"SmsMessage"> | number
    threadId?: StringFilter<"SmsMessage"> | string
    read?: IntFilter<"SmsMessage"> | number
    receivedAt?: DateTimeFilter<"SmsMessage"> | Date | string
  }, "id" | "source_externalId">

  export type SmsMessageOrderByWithAggregationInput = {
    id?: SortOrder
    source?: SortOrder
    externalId?: SortOrder
    address?: SortOrder
    body?: SortOrder
    date?: SortOrder
    type?: SortOrder
    threadId?: SortOrder
    read?: SortOrder
    receivedAt?: SortOrder
    _count?: SmsMessageCountOrderByAggregateInput
    _avg?: SmsMessageAvgOrderByAggregateInput
    _max?: SmsMessageMaxOrderByAggregateInput
    _min?: SmsMessageMinOrderByAggregateInput
    _sum?: SmsMessageSumOrderByAggregateInput
  }

  export type SmsMessageScalarWhereWithAggregatesInput = {
    AND?: SmsMessageScalarWhereWithAggregatesInput | SmsMessageScalarWhereWithAggregatesInput[]
    OR?: SmsMessageScalarWhereWithAggregatesInput[]
    NOT?: SmsMessageScalarWhereWithAggregatesInput | SmsMessageScalarWhereWithAggregatesInput[]
    id?: BigIntWithAggregatesFilter<"SmsMessage"> | bigint | number
    source?: StringWithAggregatesFilter<"SmsMessage"> | string
    externalId?: StringWithAggregatesFilter<"SmsMessage"> | string
    address?: StringWithAggregatesFilter<"SmsMessage"> | string
    body?: StringWithAggregatesFilter<"SmsMessage"> | string
    date?: BigIntWithAggregatesFilter<"SmsMessage"> | bigint | number
    type?: IntWithAggregatesFilter<"SmsMessage"> | number
    threadId?: StringWithAggregatesFilter<"SmsMessage"> | string
    read?: IntWithAggregatesFilter<"SmsMessage"> | number
    receivedAt?: DateTimeWithAggregatesFilter<"SmsMessage"> | Date | string
  }

  export type CallEntryWhereInput = {
    AND?: CallEntryWhereInput | CallEntryWhereInput[]
    OR?: CallEntryWhereInput[]
    NOT?: CallEntryWhereInput | CallEntryWhereInput[]
    id?: BigIntFilter<"CallEntry"> | bigint | number
    source?: StringFilter<"CallEntry"> | string
    externalId?: StringFilter<"CallEntry"> | string
    number?: StringFilter<"CallEntry"> | string
    duration?: IntFilter<"CallEntry"> | number
    date?: BigIntFilter<"CallEntry"> | bigint | number
    type?: IntFilter<"CallEntry"> | number
    name?: StringNullableFilter<"CallEntry"> | string | null
    receivedAt?: DateTimeFilter<"CallEntry"> | Date | string
  }

  export type CallEntryOrderByWithRelationInput = {
    id?: SortOrder
    source?: SortOrder
    externalId?: SortOrder
    number?: SortOrder
    duration?: SortOrder
    date?: SortOrder
    type?: SortOrder
    name?: SortOrderInput | SortOrder
    receivedAt?: SortOrder
  }

  export type CallEntryWhereUniqueInput = Prisma.AtLeast<{
    id?: bigint | number
    source_externalId?: CallEntrySourceExternalIdCompoundUniqueInput
    AND?: CallEntryWhereInput | CallEntryWhereInput[]
    OR?: CallEntryWhereInput[]
    NOT?: CallEntryWhereInput | CallEntryWhereInput[]
    source?: StringFilter<"CallEntry"> | string
    externalId?: StringFilter<"CallEntry"> | string
    number?: StringFilter<"CallEntry"> | string
    duration?: IntFilter<"CallEntry"> | number
    date?: BigIntFilter<"CallEntry"> | bigint | number
    type?: IntFilter<"CallEntry"> | number
    name?: StringNullableFilter<"CallEntry"> | string | null
    receivedAt?: DateTimeFilter<"CallEntry"> | Date | string
  }, "id" | "source_externalId">

  export type CallEntryOrderByWithAggregationInput = {
    id?: SortOrder
    source?: SortOrder
    externalId?: SortOrder
    number?: SortOrder
    duration?: SortOrder
    date?: SortOrder
    type?: SortOrder
    name?: SortOrderInput | SortOrder
    receivedAt?: SortOrder
    _count?: CallEntryCountOrderByAggregateInput
    _avg?: CallEntryAvgOrderByAggregateInput
    _max?: CallEntryMaxOrderByAggregateInput
    _min?: CallEntryMinOrderByAggregateInput
    _sum?: CallEntrySumOrderByAggregateInput
  }

  export type CallEntryScalarWhereWithAggregatesInput = {
    AND?: CallEntryScalarWhereWithAggregatesInput | CallEntryScalarWhereWithAggregatesInput[]
    OR?: CallEntryScalarWhereWithAggregatesInput[]
    NOT?: CallEntryScalarWhereWithAggregatesInput | CallEntryScalarWhereWithAggregatesInput[]
    id?: BigIntWithAggregatesFilter<"CallEntry"> | bigint | number
    source?: StringWithAggregatesFilter<"CallEntry"> | string
    externalId?: StringWithAggregatesFilter<"CallEntry"> | string
    number?: StringWithAggregatesFilter<"CallEntry"> | string
    duration?: IntWithAggregatesFilter<"CallEntry"> | number
    date?: BigIntWithAggregatesFilter<"CallEntry"> | bigint | number
    type?: IntWithAggregatesFilter<"CallEntry"> | number
    name?: StringNullableWithAggregatesFilter<"CallEntry"> | string | null
    receivedAt?: DateTimeWithAggregatesFilter<"CallEntry"> | Date | string
  }

  export type NotificationWhereInput = {
    AND?: NotificationWhereInput | NotificationWhereInput[]
    OR?: NotificationWhereInput[]
    NOT?: NotificationWhereInput | NotificationWhereInput[]
    id?: BigIntFilter<"Notification"> | bigint | number
    source?: StringFilter<"Notification"> | string
    externalId?: StringFilter<"Notification"> | string
    pkg?: StringFilter<"Notification"> | string
    title?: StringNullableFilter<"Notification"> | string | null
    text?: StringNullableFilter<"Notification"> | string | null
    timestamp?: BigIntFilter<"Notification"> | bigint | number
    receivedAt?: DateTimeFilter<"Notification"> | Date | string
  }

  export type NotificationOrderByWithRelationInput = {
    id?: SortOrder
    source?: SortOrder
    externalId?: SortOrder
    pkg?: SortOrder
    title?: SortOrderInput | SortOrder
    text?: SortOrderInput | SortOrder
    timestamp?: SortOrder
    receivedAt?: SortOrder
  }

  export type NotificationWhereUniqueInput = Prisma.AtLeast<{
    id?: bigint | number
    source_externalId?: NotificationSourceExternalIdCompoundUniqueInput
    AND?: NotificationWhereInput | NotificationWhereInput[]
    OR?: NotificationWhereInput[]
    NOT?: NotificationWhereInput | NotificationWhereInput[]
    source?: StringFilter<"Notification"> | string
    externalId?: StringFilter<"Notification"> | string
    pkg?: StringFilter<"Notification"> | string
    title?: StringNullableFilter<"Notification"> | string | null
    text?: StringNullableFilter<"Notification"> | string | null
    timestamp?: BigIntFilter<"Notification"> | bigint | number
    receivedAt?: DateTimeFilter<"Notification"> | Date | string
  }, "id" | "source_externalId">

  export type NotificationOrderByWithAggregationInput = {
    id?: SortOrder
    source?: SortOrder
    externalId?: SortOrder
    pkg?: SortOrder
    title?: SortOrderInput | SortOrder
    text?: SortOrderInput | SortOrder
    timestamp?: SortOrder
    receivedAt?: SortOrder
    _count?: NotificationCountOrderByAggregateInput
    _avg?: NotificationAvgOrderByAggregateInput
    _max?: NotificationMaxOrderByAggregateInput
    _min?: NotificationMinOrderByAggregateInput
    _sum?: NotificationSumOrderByAggregateInput
  }

  export type NotificationScalarWhereWithAggregatesInput = {
    AND?: NotificationScalarWhereWithAggregatesInput | NotificationScalarWhereWithAggregatesInput[]
    OR?: NotificationScalarWhereWithAggregatesInput[]
    NOT?: NotificationScalarWhereWithAggregatesInput | NotificationScalarWhereWithAggregatesInput[]
    id?: BigIntWithAggregatesFilter<"Notification"> | bigint | number
    source?: StringWithAggregatesFilter<"Notification"> | string
    externalId?: StringWithAggregatesFilter<"Notification"> | string
    pkg?: StringWithAggregatesFilter<"Notification"> | string
    title?: StringNullableWithAggregatesFilter<"Notification"> | string | null
    text?: StringNullableWithAggregatesFilter<"Notification"> | string | null
    timestamp?: BigIntWithAggregatesFilter<"Notification"> | bigint | number
    receivedAt?: DateTimeWithAggregatesFilter<"Notification"> | Date | string
  }

  export type SmsMessageCreateInput = {
    id?: bigint | number
    source: string
    externalId: string
    address: string
    body: string
    date: bigint | number
    type: number
    threadId: string
    read: number
    receivedAt?: Date | string
  }

  export type SmsMessageUncheckedCreateInput = {
    id?: bigint | number
    source: string
    externalId: string
    address: string
    body: string
    date: bigint | number
    type: number
    threadId: string
    read: number
    receivedAt?: Date | string
  }

  export type SmsMessageUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    source?: StringFieldUpdateOperationsInput | string
    externalId?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    body?: StringFieldUpdateOperationsInput | string
    date?: BigIntFieldUpdateOperationsInput | bigint | number
    type?: IntFieldUpdateOperationsInput | number
    threadId?: StringFieldUpdateOperationsInput | string
    read?: IntFieldUpdateOperationsInput | number
    receivedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SmsMessageUncheckedUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    source?: StringFieldUpdateOperationsInput | string
    externalId?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    body?: StringFieldUpdateOperationsInput | string
    date?: BigIntFieldUpdateOperationsInput | bigint | number
    type?: IntFieldUpdateOperationsInput | number
    threadId?: StringFieldUpdateOperationsInput | string
    read?: IntFieldUpdateOperationsInput | number
    receivedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SmsMessageCreateManyInput = {
    id?: bigint | number
    source: string
    externalId: string
    address: string
    body: string
    date: bigint | number
    type: number
    threadId: string
    read: number
    receivedAt?: Date | string
  }

  export type SmsMessageUpdateManyMutationInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    source?: StringFieldUpdateOperationsInput | string
    externalId?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    body?: StringFieldUpdateOperationsInput | string
    date?: BigIntFieldUpdateOperationsInput | bigint | number
    type?: IntFieldUpdateOperationsInput | number
    threadId?: StringFieldUpdateOperationsInput | string
    read?: IntFieldUpdateOperationsInput | number
    receivedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SmsMessageUncheckedUpdateManyInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    source?: StringFieldUpdateOperationsInput | string
    externalId?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    body?: StringFieldUpdateOperationsInput | string
    date?: BigIntFieldUpdateOperationsInput | bigint | number
    type?: IntFieldUpdateOperationsInput | number
    threadId?: StringFieldUpdateOperationsInput | string
    read?: IntFieldUpdateOperationsInput | number
    receivedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CallEntryCreateInput = {
    id?: bigint | number
    source: string
    externalId: string
    number: string
    duration: number
    date: bigint | number
    type: number
    name?: string | null
    receivedAt?: Date | string
  }

  export type CallEntryUncheckedCreateInput = {
    id?: bigint | number
    source: string
    externalId: string
    number: string
    duration: number
    date: bigint | number
    type: number
    name?: string | null
    receivedAt?: Date | string
  }

  export type CallEntryUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    source?: StringFieldUpdateOperationsInput | string
    externalId?: StringFieldUpdateOperationsInput | string
    number?: StringFieldUpdateOperationsInput | string
    duration?: IntFieldUpdateOperationsInput | number
    date?: BigIntFieldUpdateOperationsInput | bigint | number
    type?: IntFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
    receivedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CallEntryUncheckedUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    source?: StringFieldUpdateOperationsInput | string
    externalId?: StringFieldUpdateOperationsInput | string
    number?: StringFieldUpdateOperationsInput | string
    duration?: IntFieldUpdateOperationsInput | number
    date?: BigIntFieldUpdateOperationsInput | bigint | number
    type?: IntFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
    receivedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CallEntryCreateManyInput = {
    id?: bigint | number
    source: string
    externalId: string
    number: string
    duration: number
    date: bigint | number
    type: number
    name?: string | null
    receivedAt?: Date | string
  }

  export type CallEntryUpdateManyMutationInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    source?: StringFieldUpdateOperationsInput | string
    externalId?: StringFieldUpdateOperationsInput | string
    number?: StringFieldUpdateOperationsInput | string
    duration?: IntFieldUpdateOperationsInput | number
    date?: BigIntFieldUpdateOperationsInput | bigint | number
    type?: IntFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
    receivedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CallEntryUncheckedUpdateManyInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    source?: StringFieldUpdateOperationsInput | string
    externalId?: StringFieldUpdateOperationsInput | string
    number?: StringFieldUpdateOperationsInput | string
    duration?: IntFieldUpdateOperationsInput | number
    date?: BigIntFieldUpdateOperationsInput | bigint | number
    type?: IntFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
    receivedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationCreateInput = {
    id?: bigint | number
    source: string
    externalId: string
    pkg: string
    title?: string | null
    text?: string | null
    timestamp: bigint | number
    receivedAt?: Date | string
  }

  export type NotificationUncheckedCreateInput = {
    id?: bigint | number
    source: string
    externalId: string
    pkg: string
    title?: string | null
    text?: string | null
    timestamp: bigint | number
    receivedAt?: Date | string
  }

  export type NotificationUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    source?: StringFieldUpdateOperationsInput | string
    externalId?: StringFieldUpdateOperationsInput | string
    pkg?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    text?: NullableStringFieldUpdateOperationsInput | string | null
    timestamp?: BigIntFieldUpdateOperationsInput | bigint | number
    receivedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationUncheckedUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    source?: StringFieldUpdateOperationsInput | string
    externalId?: StringFieldUpdateOperationsInput | string
    pkg?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    text?: NullableStringFieldUpdateOperationsInput | string | null
    timestamp?: BigIntFieldUpdateOperationsInput | bigint | number
    receivedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationCreateManyInput = {
    id?: bigint | number
    source: string
    externalId: string
    pkg: string
    title?: string | null
    text?: string | null
    timestamp: bigint | number
    receivedAt?: Date | string
  }

  export type NotificationUpdateManyMutationInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    source?: StringFieldUpdateOperationsInput | string
    externalId?: StringFieldUpdateOperationsInput | string
    pkg?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    text?: NullableStringFieldUpdateOperationsInput | string | null
    timestamp?: BigIntFieldUpdateOperationsInput | bigint | number
    receivedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationUncheckedUpdateManyInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    source?: StringFieldUpdateOperationsInput | string
    externalId?: StringFieldUpdateOperationsInput | string
    pkg?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    text?: NullableStringFieldUpdateOperationsInput | string | null
    timestamp?: BigIntFieldUpdateOperationsInput | bigint | number
    receivedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BigIntFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntFilter<$PrismaModel> | bigint | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type SmsMessageSourceExternalIdCompoundUniqueInput = {
    source: string
    externalId: string
  }

  export type SmsMessageCountOrderByAggregateInput = {
    id?: SortOrder
    source?: SortOrder
    externalId?: SortOrder
    address?: SortOrder
    body?: SortOrder
    date?: SortOrder
    type?: SortOrder
    threadId?: SortOrder
    read?: SortOrder
    receivedAt?: SortOrder
  }

  export type SmsMessageAvgOrderByAggregateInput = {
    id?: SortOrder
    date?: SortOrder
    type?: SortOrder
    read?: SortOrder
  }

  export type SmsMessageMaxOrderByAggregateInput = {
    id?: SortOrder
    source?: SortOrder
    externalId?: SortOrder
    address?: SortOrder
    body?: SortOrder
    date?: SortOrder
    type?: SortOrder
    threadId?: SortOrder
    read?: SortOrder
    receivedAt?: SortOrder
  }

  export type SmsMessageMinOrderByAggregateInput = {
    id?: SortOrder
    source?: SortOrder
    externalId?: SortOrder
    address?: SortOrder
    body?: SortOrder
    date?: SortOrder
    type?: SortOrder
    threadId?: SortOrder
    read?: SortOrder
    receivedAt?: SortOrder
  }

  export type SmsMessageSumOrderByAggregateInput = {
    id?: SortOrder
    date?: SortOrder
    type?: SortOrder
    read?: SortOrder
  }

  export type BigIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntWithAggregatesFilter<$PrismaModel> | bigint | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedBigIntFilter<$PrismaModel>
    _min?: NestedBigIntFilter<$PrismaModel>
    _max?: NestedBigIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type CallEntrySourceExternalIdCompoundUniqueInput = {
    source: string
    externalId: string
  }

  export type CallEntryCountOrderByAggregateInput = {
    id?: SortOrder
    source?: SortOrder
    externalId?: SortOrder
    number?: SortOrder
    duration?: SortOrder
    date?: SortOrder
    type?: SortOrder
    name?: SortOrder
    receivedAt?: SortOrder
  }

  export type CallEntryAvgOrderByAggregateInput = {
    id?: SortOrder
    duration?: SortOrder
    date?: SortOrder
    type?: SortOrder
  }

  export type CallEntryMaxOrderByAggregateInput = {
    id?: SortOrder
    source?: SortOrder
    externalId?: SortOrder
    number?: SortOrder
    duration?: SortOrder
    date?: SortOrder
    type?: SortOrder
    name?: SortOrder
    receivedAt?: SortOrder
  }

  export type CallEntryMinOrderByAggregateInput = {
    id?: SortOrder
    source?: SortOrder
    externalId?: SortOrder
    number?: SortOrder
    duration?: SortOrder
    date?: SortOrder
    type?: SortOrder
    name?: SortOrder
    receivedAt?: SortOrder
  }

  export type CallEntrySumOrderByAggregateInput = {
    id?: SortOrder
    duration?: SortOrder
    date?: SortOrder
    type?: SortOrder
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NotificationSourceExternalIdCompoundUniqueInput = {
    source: string
    externalId: string
  }

  export type NotificationCountOrderByAggregateInput = {
    id?: SortOrder
    source?: SortOrder
    externalId?: SortOrder
    pkg?: SortOrder
    title?: SortOrder
    text?: SortOrder
    timestamp?: SortOrder
    receivedAt?: SortOrder
  }

  export type NotificationAvgOrderByAggregateInput = {
    id?: SortOrder
    timestamp?: SortOrder
  }

  export type NotificationMaxOrderByAggregateInput = {
    id?: SortOrder
    source?: SortOrder
    externalId?: SortOrder
    pkg?: SortOrder
    title?: SortOrder
    text?: SortOrder
    timestamp?: SortOrder
    receivedAt?: SortOrder
  }

  export type NotificationMinOrderByAggregateInput = {
    id?: SortOrder
    source?: SortOrder
    externalId?: SortOrder
    pkg?: SortOrder
    title?: SortOrder
    text?: SortOrder
    timestamp?: SortOrder
    receivedAt?: SortOrder
  }

  export type NotificationSumOrderByAggregateInput = {
    id?: SortOrder
    timestamp?: SortOrder
  }

  export type BigIntFieldUpdateOperationsInput = {
    set?: bigint | number
    increment?: bigint | number
    decrement?: bigint | number
    multiply?: bigint | number
    divide?: bigint | number
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NestedBigIntFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntFilter<$PrismaModel> | bigint | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedBigIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntWithAggregatesFilter<$PrismaModel> | bigint | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedBigIntFilter<$PrismaModel>
    _min?: NestedBigIntFilter<$PrismaModel>
    _max?: NestedBigIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}