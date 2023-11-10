import { GraphQLError } from 'graphql'
import { createSchema } from 'graphql-yoga'

/** @type {import('graphql-yoga').GraphQLSchemaWithContext<Resolver_Context>} */
export const schema = createSchema({
  typeDefs: /* GraphQL */ `
    type Amount {
      unit: String!
      amount: Float!
    }

    type Nutrient_Meta {
      wikipedia_link: String
      pub_chem_link: String
    }

    enum Nutrient_Category {
      micronutrient
      macronutrient
    }

    interface Abstract_Nutrient {
      name: String!
      category: Nutrient_Category!
      meta: Nutrient_Meta!
    }

    type Element implements Abstract_Nutrient {
      name: String!
      category: Nutrient_Category!
      symbol: String!
      meta: Nutrient_Meta!
    }

    type Molecule implements Abstract_Nutrient {
      name: String!
      category: Nutrient_Category!
      iupac_name: String!
      meta: Nutrient_Meta!
    }

    type Provitamin implements Abstract_Nutrient {
      name: String!
      category: Nutrient_Category!
      iupac_name: String!
      letter: String!
      number: Int
      meta: Nutrient_Meta!
    }

    type Vitamin implements Abstract_Nutrient {
      name: String!
      category: Nutrient_Category!
      iupac_name: String!
      letter: String!
      number: Int
      meta: Nutrient_Meta!
    }

    type Macronutrient implements Abstract_Nutrient {
      name: String!
      category: Nutrient_Category!
      meta: Nutrient_Meta!
    }

    union Nutrient = Element | Molecule | Provitamin | Vitamin | Macronutrient

    type Nutrient_Content {
      nutrient: Nutrient
      amount: Amount
    }

    type Food {
      id: ID!
      name: String!
      nutrient_contents(minimum_amount: Float): [Nutrient_Content!]!
    }

    type Query {
      food(id: ID!): Food!
      foods(after: String, limit: Int): [Food!]!
    }
  `,
  resolvers: {
    Query: {
      /**
       * @type {import('graphql').GraphQLFieldResolver<
       *   never,
       *   Resolver_Context,
       *   { id: string },
       *   Identifiable<Food>
       * >}
       */
      food: (_, args, context) => {
        const food = context.foods.find((food) => food.id === args.id)

        if (!food) {
          throw new GraphQLError(`food with id ${JSON.stringify(args.id)} does not exist`, {
            extensions: { id: args.id, http: { status: 404 } },
          })
        }

        return food
      },
      foods: (_, args, context) => {
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
    Nutrient: {
      /** @type {import('graphql').GraphQLTypeResolver<Nutrient, Resolver_Context>} */
      __resolveType: (source) => {
        if (source.category === 'macronutrient') {
          return 'Macronutrient'
        }

        if (source.type === 'element') {
          return 'Element'
        }

        if (source.type === 'molecule') {
          return 'Molecule'
        }

        if (source.type === 'provitamin') {
          return 'Provitamin'
        }

        if (source.type === 'vitamin') {
          return 'Vitamin'
        }
      },
    },
  },
})
