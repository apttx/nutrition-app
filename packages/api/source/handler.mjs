import { createYoga } from 'graphql-yoga'

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

  const { foods } = options

  const context = () => ({ foods })

  const yoga = createYoga({
    schema,
    context,
    graphiql,
    landingPage,
  })

  return yoga
}
