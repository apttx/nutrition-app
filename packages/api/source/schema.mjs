import { createSchema } from 'graphql-yoga'

/**
 * @type {import('graphql-yoga').GraphQLSchemaWithContext<{
 *   foods: Identifiable<Food>[]
 * }>}
 */
export const schema = createSchema({
  typeDefs: /* GraphQL */ `
    type Amount {
      unit: String!
      amount: Float!
    }

    type Nutrient {
      name: String!
    }

    type Nutrent_Content {
      nutrient: Nutrient
      amount: Amount
    }

    type Food {
      id: String!
      name: String!
      nutrient_content: [Nutrent_Content!]!
    }

    type Query {
      foods: [Food!]!
    }
  `,
  resolvers: {
    Query: {
      foods: (_, args, context) => {
        const { foods } = context

        let lower_bound = 0
        if (args.after) {
          const index = foods.findIndex((food) => food.id === args.after)

          lower_bound = index + 1
        }

        let limit = args.limit ?? 20
        const upper_bound = lower_bound + limit

        const result = foods.slice(lower_bound, upper_bound)

        return result
      },
    },
  },
})
