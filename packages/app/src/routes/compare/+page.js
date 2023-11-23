import { gql } from '@urql/core'
import { client } from '$graphql'

/**
 * @type {import('@urql/core').TypedDocumentNode<
 *   {
 *     foods: {
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
 *     }[]
 *   },
 *   { slugs: string[] }
 * >}
 */
const query = gql`
  query search($slugs: [String!]!) {
    foods(where: { slugs: $slugs }) {
      id
      slug
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

export const load = async ({ url, fetch }) => {
  const foods_parameter = url.searchParams.get('foods')

  const default_title = 'Vergleichsliste'
  const default_description =
    "Vergleiche die Nährwerte der >1'000 Lebensmittel der Schweizer Nährwertdatenbank mit der Nährwertapp."
  const default_page_metadata = {
    title: default_title,
    description: default_description,
  }

  if (!foods_parameter) {
    return {
      foods: null,
      page_metadata: default_page_metadata,
    }
  }

  const slugs = foods_parameter.split(',')
  const query_result = await client.query(query, { slugs }, { fetch })

  const foods = query_result.data?.foods

  if (!foods?.length) {
    return {
      foods: null,
      page_metadata: default_page_metadata,
    }
  }

  const title = `${foods.length} Lebensmittel vergleichen`
  const description = `Vergleiche die Nährwerte von ${foods.slice(0, 3).join(', ')}, ...`
  const page_metadata = {
    title,
    description,
  }

  return {
    foods,
    page_metadata,
  }
}
