import { get } from 'svelte/store'
import { local_storage_store } from './local_storage_store.mjs'

/** @typedef {Identifiable & Slugifiable & Pick<Food, 'name'>} Comparable_Food */

/** @type {import('svelte/store').Writable<Comparable_Food[]>} */
const { subscribe, set } = local_storage_store({ key: 'comparison', value: [] })

/** @type {import('svelte/store').Readable<Comparable_Food[]>} */
export const foods = { subscribe }

/** @type {(food: Comparable_Food) => Comparable_Food[]} */
export const add = (food) => {
  const foods_value = get(foods)

  const given_food_in_foods = foods_value.find((existing_food) => existing_food.id === food.id)
  if (given_food_in_foods) {
    return foods_value
  }

  const foods_including_given = [...foods_value, food]

  set(foods_including_given)

  return foods_including_given
}

/** @type {(food: Comparable_Food) => Comparable_Food[]} */
export const remove = (food) => {
  const foods_value = get(foods)

  const foods_without_given = foods_value.filter((existing_food) => existing_food.id !== food.id)

  set(foods_without_given)

  return foods_without_given
}
