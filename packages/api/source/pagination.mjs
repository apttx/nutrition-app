/**
 * @type {<Type extends { id: string }>(
 *   options: { after: string; limit: number },
 *   items: Type[],
 * ) => Type[]}
 */
export const paginate = (options, items) => {
  let lower_bound = 0
  if (options.after) {
    const index = items.findIndex((food) => food.id === options.after)

    lower_bound = index + 1
  }

  const limit = options.limit ?? 20
  const upper_bound = lower_bound + limit

  const paginated = items.slice(lower_bound, upper_bound)

  return paginated
}
