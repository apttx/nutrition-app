import { GraphQLError } from 'graphql'
import { paginate } from '../pagination.mjs'

/**
 * @type {import('graphql').GraphQLFieldResolver<
 *   never,
 *   Resolver_Context,
 *   { after?: string; limit?: number; where?: { ids?: string[]; slugs?: string[] } },
 *   (Identifiable & Food)[]
 * >}
 */
export const foods = (_, args, context) => {
  const { foods } = context

  if (!args.where) {
    const after = args.after
    const limit = args.limit ?? 10

    const paginated = paginate({ after, limit }, foods)

    return paginated
  }

  if (args.where.ids) {
    const id_set = new Set(args.where.ids)
    const requested_foods = foods.filter((food) => id_set.has(food.id))

    return requested_foods
  }

  if (args.where.slugs) {
    const slug_set = new Set(args.where.slugs)
    const requested_foods = foods.filter((food) => slug_set.has(food.slug))

    return requested_foods
  }

  throw new GraphQLError(
    `either \`ids\` or \`slugs\` is required in \`where\`, received ${JSON.stringify(args.where)}`,
    {
      extensions: { where: args.where, http: { status: 400 } },
    },
  )
}
