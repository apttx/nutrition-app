/**
 * @template {any} Object_Type
 * @typedef {{ [key in keyof Object_Type]: [key, Object_Type[key]] }[keyof Object_Type]} Entry_Type
 */

export const entries = /** @type {<Object extends any>(object: Object) => Entry_Type<Object>[]} */ (
  Object.entries
)

export const from_entries = /**
 * @type {<Entry extends readonly [string | number | symbol, unknown]>(
 *   entries: Entry[],
 * ) => { [key in Entry[0]]: Extract<Entry, Readonly<[key, unknown]>>[1] }}
 */ (Object.fromEntries)
