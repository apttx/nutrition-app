import { createYoga } from 'graphql-yoga'

import { schema } from './schema.mjs'

/**
 * @type {(options: {
 *   foods: (Identifiable & Food)[]
 *   graphiql?: boolean
 *   landingPage?: boolean
 * }) => import('node:http').RequestListener}
 */
export const handler = (options) => {
  const graphiql = options.graphiql ?? false
  const landingPage = options.landingPage ?? false

  const { foods } = options

  /**
   * @type {(
   *   initial_context: import('graphql-yoga').YogaInitialContext,
   * ) => import('graphql-yoga').YogaInitialContext & Resolver_Context}
   */
  const context = (initial_context) => ({ ...initial_context, foods })

  const yoga = createYoga({
    schema,
    context,
    graphiql,
    landingPage,
  })

  return yoga
}
