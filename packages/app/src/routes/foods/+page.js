import { gql } from '@urql/core'
import { client } from '$graphql'

/**
 * @type {import('@urql/core').TypedDocumentNode<{
 *   foods: {
 *     id: string
 *     name: string
 *     nutrient_contents: {
 *       nutrient:
 *         | {
 *             __typename: 'Macronutrient'
 *             name: string
 *             category: 'macronutrient'
 *           }
 *         | {
 *             __typename: 'Element'
 *             name: string
 *             symbol: string
 *             category: 'micronutrient'
 *           }
 *         | {
 *             __typename: 'Molecule'
 *             name: string
 *             iupac_name: string
 *             category: 'micronutrient'
 *           }
 *         | {
 *             __typename: 'Provitamin'
 *             name: string
 *             iupac_name: string
 *             letter: string
 *             number?: number
 *             category: 'micronutrient'
 *           }
 *         | {
 *             __typename: 'Vitamin'
 *             name: string
 *             iupac_name: string
 *             letter: string
 *             number?: number
 *             category: 'micronutrient'
 *           }
 *       amount: {
 *         unit: string
 *         amount: number
 *       } | null
 *     }[]
 *   }[]
 * }>}
 */
const query = gql`
  {
    foods {
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

export const load = async ({ parent, fetch }) => {
  const query_result = await client.query(query, {}, { fetch })
  const foods = query_result.data?.foods ?? []

  const title = 'Nahrungsmittel'
  const page_metadata = {
    ...(await parent()).page_metadata,
    title,
  }

  return {
    page_metadata,
    foods,
  }
}
