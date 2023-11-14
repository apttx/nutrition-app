/**
 * @typedef {{
 *   unit: string
 *   amount: number
 * }} Amount
 */

/**
 * @typedef {{
 *   nutrient: Element_Nutrient
 *   amount: Amount | null
 * }} Element_Content
 */

/**
 * @typedef {{
 *   nutrient: Provitamin
 *   amount: Amount | null
 * }} Provitamin_Content
 */

/**
 * @typedef {{
 *   nutrient: Vitamin
 *   amount: Amount | null
 * }} Vitamin_Content
 */

/**
 * @typedef {{
 *   nutrient: Molecule
 *   amount: Amount | null
 * }} Molecule_Content
 */

/**
 * @typedef {{
 *   nutrient: Macronutrient
 *   amount: Amount | null
 * }} Macronutrient_Content
 */

/**
 * @typedef {Element_Content
 *   | Molecule_Content
 *   | Provitamin_Content
 *   | Vitamin_Content
 *   | Macronutrient_Content} Nutrient_Content
 */

/**
 * @typedef {{
 *   name: string
 *   nutrient_contents: Nutrient_Content[]
 *   meta?: Record<string, any>
 * }} Food
 */
