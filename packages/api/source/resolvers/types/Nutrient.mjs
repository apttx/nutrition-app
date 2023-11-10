/** @type {import('graphql').GraphQLTypeResolver<Nutrient, Resolver_Context>} */
export const __resolveType = (source) => {
  if (source.category === 'macronutrient') {
    return 'Macronutrient'
  }

  if (source.type === 'element') {
    return 'Element'
  }

  if (source.type === 'molecule') {
    return 'Molecule'
  }

  if (source.type === 'provitamin') {
    return 'Provitamin'
  }

  if (source.type === 'vitamin') {
    return 'Vitamin'
  }
}
