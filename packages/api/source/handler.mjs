import { createYoga } from 'graphql-yoga'
import { nanoid } from 'nanoid'

import { schema } from './schema.mjs'

/**
 * @type {(options: {
 *   foods: Identifiable<Food>[]
 *   graphiql?: boolean
 *   landingPage?: boolean
 * }) => import('node:http').RequestListener}
 */
export const handler = (options) => {
  const graphiql = options.graphiql ?? false
  const landingPage = options.landingPage ?? false

  const foods = options.foods.map((food) => ({ ...food, id: nanoid() }))

  const context = () => ({ foods })

  const yoga = createYoga({
    schema,
    context,
    graphiql,
    landingPage,
  })

  return yoga
}
