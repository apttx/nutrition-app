import { gql } from '@urql/core'
import { client } from '$graphql'
import { error } from '@sveltejs/kit'
import { dev } from '$app/environment'

/**
 * @type {import('@urql/core').TypedDocumentNode<
 *   {
 *     food: {
 *       id: string
 *       name: string
 *       nutrient_contents: {
 *         nutrient:
 *           | {
 *               __typename: 'Macronutrient'
 *               name: string
 *               category: 'macronutrient'
 *             }
 *           | {
 *               __typename: 'Element'
 *               name: string
 *               symbol: string
 *               category: 'micronutrient'
 *             }
 *           | {
 *               __typename: 'Molecule'
 *               name: string
 *               iupac_name: string
 *               category: 'micronutrient'
 *             }
 *           | {
 *               __typename: 'Provitamin'
 *               name: string
 *               iupac_name: string
 *               letter: string
 *               number?: number
 *               category: 'micronutrient'
 *             }
 *           | {
 *               __typename: 'Vitamin'
 *               name: string
 *               iupac_name: string
 *               letter: string
 *               number?: number
 *               category: 'micronutrient'
 *             }
 *         amount: {
 *           unit: string
 *           amount: number
 *         } | null
 *       }[]
 *     }
 *   },
 *   { slug: string }
 * >}
 */
const query = gql`
  query food($slug: String!) {
    food(where: { slug: $slug }) {
      id
      name
      nutrient_contents {
        nutrient {
          __typename
          ... on Abstract_Nutrient {
            name
            category
            meta {
              wikipedia_link
              pub_chem_link
            }
          }
          ... on Element {
            symbol
          }
          ... on Molecule {
            iupac_name
          }
          ... on Provitamin {
            iupac_name
            letter
            number
          }
          ... on Vitamin {
            iupac_name
            letter
            number
          }
          ... on Macronutrient {
            category
          }
        }
        amount {
          unit
          amount
        }
      }
    }
  }
`

export const load = async ({ fetch, params }) => {
  const { slug } = params

  const query_result = await client.query(query, { slug }, { fetch })

  if (!query_result.data?.food) {
    if (dev) {
      console.debug(`[@/food/[slug]/+page.js] no food data: ${query_result.error?.message}`)
    }

    throw error(404)
  }

  const food = query_result.data?.food

  // const categorized_nutrient_contents = categorize(food.nutrient_contents)

  const title = food.name
  const description = `${food.name} enthält`
  /** @type {Page_Metadata} */
  const page_metadata = {
    description,
    title,
  }

  return {
    page_metadata,
    food,
  }
}
