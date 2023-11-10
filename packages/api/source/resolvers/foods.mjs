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

  let lower_bound = 0
  if (args.after) {
    const index = foods.findIndex((food) => food.id === args.after)

    lower_bound = index + 1
  }

  const limit = args.limit ?? 20
  const upper_bound = lower_bound + limit

  const result = foods.slice(lower_bound, upper_bound)

  return result
}
