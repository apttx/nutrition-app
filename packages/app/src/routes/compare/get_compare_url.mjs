/** @type {(foods: import('$stores/comparison.mjs').Comparable_Food[]) => string} */
export const get_compare_url = (foods) => {
  const compare_url_params = new URLSearchParams({
    foods: foods.map((food) => food.slug).join(','),
  })
  const compare_url = `/compare?${compare_url_params.toString()}`

  return compare_url
}
