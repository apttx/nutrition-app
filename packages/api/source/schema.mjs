import { createSchema } from 'graphql-yoga'
import { food } from './resolvers/food.mjs'
import { foods } from './resolvers/foods.mjs'
import { nutrient_contents } from './resolvers/types/Food.mjs'
import { __resolveType as resolve_nutrient_type } from './resolvers/types/Nutrient.mjs'
import { search } from './resolvers/search.mjs'
import { __resolveType as resolve_search_result_highlight_element_type } from './resolvers/types/Search_Result_Highlight_Element.mjs'

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

    type Search_Result_Highlight_Text_Element {
      text: String!
    }
    type Search_Result_Highlight_Highlight_Element {
      highlight: String!
    }
    union Search_Result_Highlight_Element =
        Search_Result_Highlight_Text_Element
      | Search_Result_Highlight_Highlight_Element
    type Search_Result_Highlight {
      html: String!
      elements: [Search_Result_Highlight_Element!]!
    }
    type Food_Search_Result_Property_Highlights {
      name: Search_Result_Highlight!
    }
    type Food_Search_Result_Highlights {
      all_properties: Search_Result_Highlight!
      properties: Food_Search_Result_Highlights!
    }
    type Food_Search_Result {
      food: Food!
      highlights: Food_Search_Result_Highlights!
    }

    input Foods_Where_Input {
      ids: [String!]
    }

    type Query {
      food(id: ID!): Food!
      foods(after: ID, limit: Int, where: Foods_Where_Input): [Food!]!
      search(term: String!, after: ID, limit: Int): [Food_Search_Result!]!
    }
  `,
  resolvers: {
    Query: {
      food,
      foods,
      search,
    },
    Food: {
      nutrient_contents,
    },
    Nutrient: {
      __resolveType: resolve_nutrient_type,
    },
    Search_Result_Highlight_Element: {
      __resolveType: resolve_search_result_highlight_element_type,
    },
  },
})
