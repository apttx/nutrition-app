/** @typedef {'micronutrient' | 'macronutrient'} Nutrient_Category */

/**
 * @typedef {{
 *   name: string
 *   meta: {
 *     wikipedia_link?: string
 *     pub_chem_link?: string
 *   }
 * }} Abstract_Nutrient
 */

/**
 * @typedef {Abstract_Nutrient & {
 *   category: Extract<Nutrient_Category, 'micronutrient'>
 * }} Micronutrient
 */

/**
 * @typedef {Micronutrient & {
 *   type: 'element'
 *   symbol: string
 * }} Element_Nutrient
 */

/**
 * @typedef {Micronutrient & {
 *   type: 'molecule'
 *   iupac_name: string
 * }} Molecule
 */

/**
 * @typedef {Micronutrient & {
 *   type: 'provitamin'
 *   iupac_name: string
 *   letter: string
 *   number?: number
 * }} Provitamin
 */

/**
 * @typedef {Micronutrient & {
 *   type: 'vitamin'
 *   iupac_name: string
 *   letter: string
 *   number?: number
 * }} Vitamin
 */

/**
 * @typedef {Abstract_Nutrient & {
 *   category: Extract<Nutrient_Category, 'macronutrient'>
 * }} Macronutrient
 */

/** @typedef {Element_Nutrient | Molecule | Provitamin | Vitamin | Macronutrient} Nutrient */
