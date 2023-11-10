/**
 * @type {import('graphql').GraphQLFieldResolver<
 *   Food,
 *   Resolver_Context,
 *   { minimum_amount?: number }
 * >}
 */
export const nutrient_contents = (parent, args) => {
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
}
