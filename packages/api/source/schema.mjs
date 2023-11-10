import { createSchema } from 'graphql-yoga'
import { food } from './resolvers/food.mjs'
import { foods } from './resolvers/foods.mjs'
import { nutrient_contents } from './resolvers/types/Food.mjs'
import { __resolveType } from './resolvers/types/Nutrient.mjs'

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
      foods(after: ID, limit: Int): [Food!]!
    }
  `,
  resolvers: {
    Query: {
      food,
      foods,
    },
    Food: {
      nutrient_contents,
    },
    Nutrient: {
      __resolveType,
    },
  },
})
