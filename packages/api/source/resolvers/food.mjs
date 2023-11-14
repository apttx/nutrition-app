import { GraphQLError } from 'graphql'

/**
 * @type {import('graphql').GraphQLFieldResolver<
 *   never,
 *   Resolver_Context,
 *   { id: string },
 *   Identifiable & Food
 * >}
 */
export const food = (_, args, context) => {
  const food = context.foods.find((food) => food.id === args.id)

  if (!food) {
    throw new GraphQLError(`food with id ${JSON.stringify(args.id)} does not exist`, {
      extensions: { id: args.id, http: { status: 404 } },
    })
  }

  return food
}
