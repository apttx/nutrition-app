import { paginate } from '../pagination.mjs'

/**
 * @type {import('graphql').GraphQLFieldResolver<
 *   never,
 *   Resolver_Context,
 *   { after?: string; limit?: number; where?: { ids?: string[] } },
 *   (Identifiable & Food)[]
 * >}
 */
export const foods = (_, args, context) => {
  const { foods } = context

  if (args.where?.ids) {
    const id_set = new Set(args.where.ids)
    const requested_foods = foods.filter((food) => id_set.has(food.id))

    return requested_foods
  }

  const after = args.after
  const limit = args.limit ?? 10

  const paginated = paginate({ after, limit }, foods)

  return paginated
}
