import { gql } from '@urql/core'
import { client } from '$graphql'

/**
 * @type {import('@urql/core').TypedDocumentNode<{
 *   search: {
 *     food: {
 *       id: string
 *       slug: string
 *       name: string
 *       nutrient_contents: (
 *         | {
 *             nutrient: {
 *               __typename: 'Macronutrient'
 *               name: string
 *               category: 'macronutrient'
 *             }
 *             amount: {
 *               unit: string
 *               amount: number
 *             } | null
 *           }
 *         | {
 *             nutrient: {
 *               __typename: 'Element'
 *               name: string
 *               symbol: string
 *               category: 'micronutrient'
 *             }
 *             amount: {
 *               unit: string
 *               amount: number
 *             } | null
 *           }
 *         | {
 *             nutrient: {
 *               __typename: 'Molecule'
 *               name: string
 *               iupac_name: string
 *               category: 'micronutrient'
 *             }
 *             amount: {
 *               unit: string
 *               amount: number
 *             } | null
 *           }
 *         | {
 *             nutrient: {
 *               __typename: 'Provitamin'
 *               name: string
 *               iupac_name: string
 *               letter: string
 *               number?: number
 *               category: 'micronutrient'
 *             }
 *             amount: {
 *               unit: string
 *               amount: number
 *             } | null
 *           }
 *         | {
 *             nutrient: {
 *               __typename: 'Vitamin'
 *               name: string
 *               iupac_name: string
 *               letter: string
 *               number?: number
 *               category: 'micronutrient'
 *             }
 *             amount: {
 *               unit: string
 *               amount: number
 *             } | null
 *           }
 *       )[]
 *     }
 *     highlights: {
 *       all_properties: {
 *         html: string
 *       }
 *     }
 *   }[]
 * }>}
 */
const query = gql`
  query search($term: String!) {
    search(term: $term) {
      highlights {
        all_properties {
          html
        }
      }
      food {
        id
        slug
        name
        nutrient_contents(minimum_amount: 10) {
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
  }
`

export const load = async ({ url, fetch }) => {
  const title = 'Suche'
  const description =
    "Durchsuche die >1'000 Lebensmittel der Schweizer Nährwertdatenbank mit der Nährwertapp."
  const page_metadata = {
    title,
    description,
  }

  const search_term = url.searchParams.get('term')
  let search_results = null
  if (search_term) {
    const query_result = await client.query(query, { term: search_term }, { fetch })
    search_results = query_result.data?.search
  }

  return {
    search_results,
    page_metadata,
  }
}
