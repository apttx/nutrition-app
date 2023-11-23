import { paginate } from '../pagination.mjs'

/**
 * @typedef {{
 *   text: string
 * }} Search_Result_Highlight_Text_Element
 */
/**
 * @typedef {{
 *   highlight: string
 * }} Search_Result_Highlight_Highlight_Element
 */

/**
 * @typedef {{
 *   html: string
 *   elements: (Search_Result_Highlight_Text_Element | Search_Result_Highlight_Highlight_Element)[]
 * }} Search_Result_Highlight
 */
/**
 * @typedef {{
 *   food: Identifiable & Food
 *   highlights: {
 *     all_properties: Search_Result_Highlight
 *     properties: {
 *       [key in keyof Food]?: Search_Result_Highlight
 *     }
 *   }
 * }} Food_Search_Result
 */

/**
 * @type {import('graphql').GraphQLFieldResolver<
 *   never,
 *   Resolver_Context,
 *   { term: string; after?: string; limit?: number },
 *   Food_Search_Result[]
 * >}
 */
export const search = (_, args, context) => {
  const escaped_term = args.term.replace(/\^\$\{\}\[\]\(\)\.\?\*\+/gi, '\\$1')
  const regular_expression = new RegExp(escaped_term, 'gi')

  const search_matches = context.foods
    .map((food) => {
      const { id } = food
      const matches = Array.from(food.name.matchAll(regular_expression))

      const search_match = {
        id,
        food,
        matches,
      }

      return search_match
    })
    .filter((search_result) => search_result.matches.length)
    .sort(
      (search_result_a, search_result_b) =>
        search_result_b.matches.length - search_result_a.matches.length,
    )

  const after = args.after
  const limit = args.limit ?? 10

  const paginated = paginate({ after, limit }, search_matches)

  const search_results = paginated.map((search_match) => {
    const { food, matches } = search_match

    /** @type {{ start: number; end: number }[]} */
    const highlit_sections = []
    for (const match of matches) {
      if (match.index === undefined) {
        continue
      }

      const start = match.index
      const end = match.index + match[0].length

      const overlapping_section = highlit_sections.find((section) => start < section.end)
      if (overlapping_section) {
        overlapping_section.end = Math.max(overlapping_section.end, end)
        continue
      }

      const highlit_section = {
        start,
        end,
      }

      highlit_sections.push(highlit_section)
    }

    /**
     * @type {(
     *   | Search_Result_Highlight_Text_Element
     *   | Search_Result_Highlight_Highlight_Element
     * )[]}
     */
    const elements = []

    let text_index = 0
    for (const highlit_section of highlit_sections) {
      const text = food.name.substring(text_index, highlit_section.start)
      // don't push empty elements
      if (text.length) {
        const text_element = { text }
        elements.push(text_element)
      }

      const highlight = food.name.substring(highlit_section.start, highlit_section.end)
      const highlight_element = { highlight }
      elements.push(highlight_element)

      text_index = highlit_section.end
    }
    const end_text = food.name.substring(text_index, food.name.length)
    // don't push empty elements
    if (end_text.length) {
      const end_text_element = { text: end_text }
      elements.push(end_text_element)
    }

    const html = elements
      .map((element) => {
        if ('highlight' in element) {
          return `<em>${element.highlight}</em>`
        }

        return element.text
      })
      .join('')

    /** @type {Food_Search_Result} */
    const search_result = {
      food,
      highlights: {
        all_properties: {
          html,
          elements,
        },
        properties: {
          name: {
            html,
            elements,
          },
        },
      },
    }

    return search_result
  })

  return search_results
}
