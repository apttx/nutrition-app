/**
 * @type {import('graphql').GraphQLTypeResolver<
 *   { text: string } | { highlight: string },
 *   Resolver_Context
 * >}
 */
export const __resolveType = (source) => {
  if ('highlight' in source) {
    return 'Search_Result_Highlight_Highlight_Element'
  }

  return 'Search_Result_Highlight_Text_Element'
}
