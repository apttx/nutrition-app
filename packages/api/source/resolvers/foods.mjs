import { paginate } from '../pagination.mjs'

/**
 * @type {import('graphql').GraphQLFieldResolver<
 *   never,
 *   Resolver_Context,
 *   { after?: string; limit?: number },
 *   Identifiable<Food>[]
 * >}
 */
export const foods = (_, args, context) => {
  const { foods } = context

  const after = args.after
  const limit = args.limit ?? 10

  const paginated = paginate({ after, limit }, foods)

  return paginated
}
