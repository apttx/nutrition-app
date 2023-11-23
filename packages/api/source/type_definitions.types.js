/**
 * @template {string} Trimmable
 * @typedef {Trimmable extends `${infer Unwanted_Character extends '\n' | ' '}${infer Substring}`
 *   ? Unwanted_Character extends never
 *     ? Trimmable
 *     : Trim_Start<Substring>
 *   : Trimmable} Trim_Start
 */

/**
 * @template {string} Property
 * @template {string} Value_Type_String
 * @template {Record<string, any>} Available_Types
 * @typedef {Value_Type_String extends 'String'
 *   ? { [key in Property]?: string }
 *   : Value_Type_String extends 'String!'
 *   ? { [key in Property]: string }
 *   : Value_Type_String extends 'ID'
 *   ? { [key in Property]?: string }
 *   : Value_Type_String extends 'ID!'
 *   ? { [key in Property]: string }
 *   : Value_Type_String extends 'Int'
 *   ? { [key in Property]?: number }
 *   : Value_Type_String extends 'Int!'
 *   ? { [key in Property]: number }
 *   : Value_Type_String extends keyof Available_Types
 *   ? { [key in Property]?: Available_Types[Value_Type_String] }
 *   : keyof Available_Types extends string
 *   ? Value_Type_String extends `${keyof Available_Types}!`
 *     ? { [key in Property]: Available_Types[Value_Type_String] }
 *     : {}
 *   : {}} GraphQL_Property_Object
 */

/**
 * @template {string} Object_Body_SDL
 * @template {Record<string, any>} Available_Types
 * @typedef {Object_Body_SDL extends `${infer Property}: ${infer Value_Type_String extends
 *   Exclude<string, `${string}\n`>}\n${infer Substring}`
 *   ? Substring extends never
 *     ? GraphQL_Property_Object<Property, Value_Type_String, Available_Types>
 *     : GraphQL_Property_Object<Property, Value_Type_String, Available_Types> &
 *         Object_Property<Trim_Start<Substring>, Available_Types>
 *   : {}} Object_Property
 */

/**
 * @template {string} Object_Body_SDL
 * @typedef {Object_Body_SDL extends `${infer Line extends `${string}: ${Exclude<
 *   string,
 *   `${string}\n`
 * >}\n`}${infer Substring}`
 *   ? Substring extends never
 *     ? Line
 *     : Line | Object_Body_Lines<Trim_Start<Substring>>
 *   : never} Object_Body_Lines
 */

/** @template {{ property: string; value: 'String' | 'Int' }} Parse_Oo */

/**
 * @template {`type ${string} {${string}}${string}`} GraphQL_SDL
 * @template {Record<string, any>} Available_Types
 * @typedef {GraphQL_SDL extends `type ${infer Typename} {${infer Object_Body_SDL}}${string}`
 *   ? {
 *       __typename: Typename
 *     } & Object_Property<Trim_Start<Object_Body_SDL>, Available_Types>
 *   : never} GraphQL_Object
 */

const user_typedef = /* GraphQL */ `
  type User {
    id: ID!
    name: String!
    nickname: String
    best_friend: User
  }
`
/** @typedef {GraphQL_Object<Trim_Start<typeof user_typedef>, { User: GraphQL_User }>} GraphQL_User */

/** @type {GraphQL_User} */
const user = {
  __typename: 'User',
  id: '',
  name: '',
  best_friend: {
    __typename: 'User',
    id: '',
    name: '',
  },
}

const used = user
const used2 = user_typedef
