/**
 * @type {import('graphql').GraphQLFieldResolver<
 *   never,
 *   Resolver_Context,
 *   { search?: { term: string } },
 *   Nutrient[]
 * >}
 */
export const nutrients = (_, __, context) => {
  /** @type {Nutrient[]} */
  const nutrients = []

  const nutrient_names = new Set()
  for (const food of context.foods) {
    for (const nutrient_content of food.nutrient_contents) {
      const nutrient = nutrient_content.nutrient
      if (!nutrient_names.has(nutrient.name)) {
        nutrient_names.add(nutrient.name)
        nutrients.push(nutrient)
      }
    }
  }

  return nutrients
}
