/**
 * @typedef {{
 *   unit: string
 *   amount: number
 * }} Amount
 */

/**
 * @typedef {{
 *   nutrient: Nutrient
 *   amount: Amount | null
 * }} Nutrient_Content
 */

/**
 * @typedef {{
 *   name: string
 *   nutrient_content: Nutrient_Content[]
 *   meta?: Record<string, any>
 * }} Food
 */
