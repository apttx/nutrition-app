import { GraphQLError } from 'graphql'

/**
 * @type {import('graphql').GraphQLFieldResolver<
 *   never,
 *   Resolver_Context,
 *   {
 *     where: {
 *       id?: string
 *       slug?: string
 *     }
 *   },
 *   Identifiable & Food
 * >}
 */
export const food = (_, args, context) => {
  if (args.where.id !== undefined) {
    const { id } = args.where

    const food = context.foods.find((food) => food.id === id)

    if (!food) {
      throw new GraphQLError(`food with id ${JSON.stringify(id)} does not exist`, {
        extensions: { id, http: { status: 404 } },
      })
    }

    return food
  }

  if (args.where.slug !== undefined) {
    const { slug } = args.where

    const food = context.foods.find((food) => food.slug === slug)

    if (!food) {
      throw new GraphQLError(`food with slug ${JSON.stringify(slug)} does not exist`, {
        extensions: { slug, http: { status: 404 } },
      })
    }

    return food
  }

  throw new GraphQLError(
    `either \`id\` or \`slug\` is required in \`where\`, received ${JSON.stringify(args.where)}`,
    {
      extensions: { where: args.where, http: { status: 400 } },
    },
  )
}
