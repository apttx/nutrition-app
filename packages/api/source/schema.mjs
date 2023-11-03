import { createSchema } from 'graphql-yoga'

/** @type {import('graphql-yoga').GraphQLSchemaWithContext<Resolver_Context>} */
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
      nutrient_contents(minimum_amount: Float): [Nutrent_Content!]!
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

        const limit = args.limit ?? 100
        const upper_bound = lower_bound + limit

        const result = foods.slice(lower_bound, upper_bound)

        return result
      },
    },
    Food: {
      /**
       * @type {import('graphql').GraphQLFieldResolver<
       *   Food,
       *   Resolver_Context,
       *   { minimum_amount?: number }
       * >}
       */
      nutrient_contents: (parent, args) => {
        const { minimum_amount } = args

        if (minimum_amount === undefined) {
          return parent.nutrient_contents
        }

        const nutrient_contents = parent.nutrient_contents.filter((nutrient_content) => {
          if (!nutrient_content.amount) {
            return false
          }

          const is_more_grams_than_minimum = nutrient_content.amount.amount > minimum_amount

          return is_more_grams_than_minimum
        })

        return nutrient_contents
      },
    },
  },
})
