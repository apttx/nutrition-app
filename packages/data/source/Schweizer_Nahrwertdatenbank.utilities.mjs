/**
 * @deprecated
 * @type {Record<Nutrient_Key, string>}
 */
export const nutrient_name_map = {
  'Alkohol (g)': 'alcohol',
  'Betacarotin (µg)': 'beta_carotin',
  'Betacarotin-Aktivität (µg-BCE)': 'beta_carotin_activity',
  'Calcium (Ca) (mg)': 'Ca',
  'Chlorid (Cl) (mg)': 'Cl',
  'Cholesterin (mg)': 'cholesterol',
  'Eisen (Fe) (mg)': 'Fe',
  'Fettsäuren, einfach ungesättigt (g)': 'mono-unsaturated_fatty_acids',
  'Fettsäuren, gesättigt (g)': 'saturated_fatty_acids',
  'Fettsäuren, mehrfach ungesättigt (g)': 'poly-unsaturated_fatty_acids',
  'Folat (µg)': 'folate',
  'Jod (I) (µg)': 'I',
  'Kalium (K) (mg)': 'K',
  'Kohlenhydrate, verfügbar (g)': 'available_carbohydrates',
  'Magnesium (Mg) (mg)': 'Mg',
  'Nahrungsfasern (g)': 'fiber',
  'Natrium (Na) (mg)': 'Na',
  'Niacin (mg)': 'niacin',
  'Pantothensäure (mg)': 'patothenic_acid',
  'Phosphor (P) (mg)': 'P',
  'Protein (g)': 'protein',
  'Retinol (µg)': 'retinol',
  'Salz (NaCl) (g)': 'NaCl',
  'Selen (Se) (µg)': 'Se',
  'Stärke (g)': 'starch',
  'Vitamin A-Aktivität, RAE (µg-RE)': 'vitamin_a_activity_rae',
  'Vitamin A-Aktivität, RE (µg-RE)': 'vitamin_a_activity_re',
  'Vitamin B1 (Thiamin) (mg)': 'vitamin_b1',
  'Vitamin B12 (Cobalamin) (µg)': 'vitamin_b12',
  'Vitamin B2 (Riboflavin) (mg)': 'vitamin_b2',
  'Vitamin B6 (Pyridoxin) (mg)': 'vitamin_b6',
  'Vitamin C (Ascorbinsäure) (mg)': 'vitamin_c',
  'Vitamin D (Calciferol) (µg)': 'vitamin_d',
  'Vitamin E (α-Tocopherol) (mg)': 'vitamin_e',
  'Wasser (g)': 'H2O',
  'Zink (Zn)  (mg)': 'Zn',
  'Zucker (g)': 'sugar',
  'Energie, Kalorien (kcal)': 'energy_in_calories',
  'Energie, Kilojoule (kJ)': 'energy_in_kilojoule',
  'Fett, total (g)': 'fat',
}

/**
 * @template {Nutrient} Return
 * @template {any} [Options=never] Default is `never`
 * @typedef {(options: Options) => (name: string) => Return} Get_Get_Nutrient
 */

/**
 * @type {Get_Get_Nutrient<
 *   Macronutrient,
 *   {
 *     wikipedia_link?: string
 *     pub_chem_link?: string
 *   }
 * >}
 */
const get_get_macronutrient = (options) => (name) => ({
  name,
  category: 'macronutrient',
  meta: options ?? {},
})

/**
 * @type {Get_Get_Nutrient<
 *   Element_Nutrient,
 *   {
 *     symbol: string
 *     wikipedia_link?: string
 *     pub_chem_link?: string
 *   }
 * >}
 */
const get_get_element = (options) => (name) => ({
  name,
  category: 'micronutrient',
  type: 'element',
  symbol: options.symbol,
  meta: {
    wikipedia_link: options.wikipedia_link,
    pub_chem_link: options.pub_chem_link,
  },
})

/**
 * @type {Get_Get_Nutrient<
 *   Molecule,
 *   {
 *     iupac_name: string
 *     wikipedia_link?: string
 *     pub_chem_link?: string
 *   }
 * >}
 */
const get_get_molecule = (options) => (name) => ({
  name,
  category: 'micronutrient',
  type: 'molecule',
  iupac_name: options.iupac_name,
  meta: {
    wikipedia_link: options.wikipedia_link,
    pub_chem_link: options.pub_chem_link,
  },
})

/**
 * @type {Get_Get_Nutrient<
 *   Vitamin,
 *   {
 *     iupac_name: string
 *     letter: string
 *     number?: number
 *     wikipedia_link?: string
 *     pub_chem_link?: string
 *   }
 * >}
 */
const get_get_vitamin = (options) => (name) => ({
  name,
  category: 'micronutrient',
  type: 'vitamin',
  iupac_name: options.iupac_name,
  letter: options.letter,
  number: options.number,
  meta: {
    wikipedia_link: options.wikipedia_link,
    pub_chem_link: options.pub_chem_link,
  },
})

/**
 * @type {Get_Get_Nutrient<
 *   Provitamin,
 *   {
 *     iupac_name: string
 *     letter: string
 *     number?: number
 *     wikipedia_link?: string
 *     pub_chem_link?: string
 *   }
 * >}
 */
const get_get_provitamin = (options) => (name) => ({
  name,
  category: 'micronutrient',
  type: 'provitamin',
  iupac_name: options.iupac_name,
  letter: options.letter,
  number: options.number,
  meta: {
    wikipedia_link: options.wikipedia_link,
    pub_chem_link: options.pub_chem_link,
  },
})

/** @type {Record<Nutrient_Key, (name: string) => Nutrient>} */
export const nutrient_key_to_get_nutrient_map = {
  'Alkohol (g)': get_get_macronutrient({}),
  'Betacarotin (µg)': get_get_provitamin({
    iupac_name:
      '1,3,3-trimethyl-2-[(1E,3E,5E,7E,9E,11E,13E,15E,17E)-3,7,12,16-tetramethyl-18-(2,6,6-trimethylcyclohexen-1-yl)octadeca-1,3,5,7,9,11,13,15,17-nonaenyl]cyclohexene',
    letter: 'A',
    wikipedia_link: 'https://de.wikipedia.org/wiki/Carotine',
    pub_chem_link: 'https://pubchem.ncbi.nlm.nih.gov/compound/5280489',
  }),
  'Betacarotin-Aktivität (µg-BCE)': get_get_provitamin({
    iupac_name:
      '1,3,3-trimethyl-2-[(1E,3E,5E,7E,9E,11E,13E,15E,17E)-3,7,12,16-tetramethyl-18-(2,6,6-trimethylcyclohexen-1-yl)octadeca-1,3,5,7,9,11,13,15,17-nonaenyl]cyclohexene',
    letter: 'A',
    wikipedia_link: 'https://de.wikipedia.org/wiki/Carotine',
    pub_chem_link: 'https://pubchem.ncbi.nlm.nih.gov/compound/5280489',
  }),
  'Calcium (Ca) (mg)': get_get_element({ symbol: 'Ca' }),
  'Chlorid (Cl) (mg)': get_get_element({ symbol: 'Cl' }),
  'Cholesterin (mg)': get_get_molecule({
    iupac_name:
      '(3S,8S,9S,10R,13R,14S,17R)-10,13-dimethyl-17-[(2R)-6-methylheptan-2-yl]-2,3,4,7,8,9,11,12,14,15,16,17-dodecahydro-1H-cyclopenta[a]phenanthren-3-ol',
    wikipedia_link: 'https://de.wikipedia.org/wiki/Cholesterin',
    pub_chem_link: 'https://pubchem.ncbi.nlm.nih.gov/compound/5997',
  }),
  'Eisen (Fe) (mg)': get_get_element({ symbol: 'Fe' }),
  'Fettsäuren, einfach ungesättigt (g)': get_get_macronutrient({}),
  'Fettsäuren, gesättigt (g)': get_get_macronutrient({}),
  'Fettsäuren, mehrfach ungesättigt (g)': get_get_macronutrient({}),
  'Folat (µg)': get_get_vitamin({
    iupac_name:
      '(2S)-2-[[4-[(2-amino-4-oxo-3H-pteridin-6-yl)methylamino]benzoyl]amino]pentanedioic acid',
    letter: 'B',
    number: 9,
    wikipedia_link: 'https://de.wikipedia.org/wiki/Fols%C3%A4ure',
    pub_chem_link: 'https://pubchem.ncbi.nlm.nih.gov/compound/135398658',
  }),
  'Jod (I) (µg)': get_get_element({ symbol: 'I' }),
  'Kalium (K) (mg)': get_get_element({ symbol: 'K' }),
  'Kohlenhydrate, verfügbar (g)': get_get_macronutrient({}),
  'Magnesium (Mg) (mg)': get_get_element({ symbol: 'Mg' }),
  'Nahrungsfasern (g)': get_get_macronutrient({}),
  'Natrium (Na) (mg)': get_get_element({ symbol: 'Na' }),
  'Niacin (mg)': get_get_vitamin({
    iupac_name: 'pyridine-3-carboxylic acid',
    letter: 'B',
    number: 3,
    wikipedia_link: 'https://de.wikipedia.org/wiki/Nicotins%C3%A4ure',
    pub_chem_link: 'https://pubchem.ncbi.nlm.nih.gov/compound/938',
  }),
  'Pantothensäure (mg)': get_get_vitamin({
    iupac_name: '3-[[(2R)-2,4-dihydroxy-3,3-dimethylbutanoyl]amino]propanoic acid',
    letter: 'B',
    number: 5,
    wikipedia_link: 'https://de.wikipedia.org/wiki/Pantothens%C3%A4ure',
    pub_chem_link: 'https://pubchem.ncbi.nlm.nih.gov/compound/6613',
  }),
  'Phosphor (P) (mg)': get_get_element({ symbol: 'Na' }),
  'Protein (g)': get_get_macronutrient({}),
  'Retinol (µg)': get_get_vitamin({
    iupac_name:
      '(2E,4E,6E,8E)-3,7-dimethyl-9-(2,6,6-trimethylcyclohexen-1-yl)nona-2,4,6,8-tetraen-1-ol',
    letter: 'A',
    number: 1,
    wikipedia_link: 'https://de.wikipedia.org/wiki/Retinol',
    pub_chem_link: 'https://pubchem.ncbi.nlm.nih.gov/compound/445354',
  }),
  'Salz (NaCl) (g)': get_get_molecule({
    iupac_name: 'sodium;chloride',
    wikipedia_link: 'https://de.wikipedia.org/wiki/Natriumchlorid',
    pub_chem_link: 'https://pubchem.ncbi.nlm.nih.gov/compound/5234',
  }),
  'Selen (Se) (µg)': get_get_element({ symbol: 'Se' }),
  'Stärke (g)': get_get_macronutrient({}),
  // TODO: molecule group (not a single molecule). here specifically: vitamere group; would also include beta carotine and retinol in this case.
  // need ability to link specific molecules: vitamere a: b-carotene, retinol
  'Vitamin A-Aktivität, RAE (µg-RE)': get_get_vitamin({
    iupac_name: 'not a single molecule',
    letter: 'A',
    wikipedia_link: 'https://de.wikipedia.org/wiki/Vitamin_A',
  }),
  'Vitamin A-Aktivität, RE (µg-RE)': get_get_vitamin({
    iupac_name: 'not a single molecule',
    letter: 'A',
    wikipedia_link: 'https://de.wikipedia.org/wiki/Vitamin_A',
  }),
  'Vitamin B1 (Thiamin) (mg)': get_get_vitamin({
    iupac_name:
      '2-[3-[(4-amino-2-methylpyrimidin-5-yl)methyl]-4-methyl-1,3-thiazol-3-ium-5-yl]ethanol',
    letter: 'B',
    number: 1,
    wikipedia_link: 'https://de.wikipedia.org/wiki/Thiamin',
    pub_chem_link: 'https://pubchem.ncbi.nlm.nih.gov/compound/1130',
  }),
  // TODO: molecule group
  'Vitamin B12 (Cobalamin) (µg)': get_get_vitamin({
    iupac_name:
      'cobalt(3+);[(2R,3S,4R,5S)-5-(5,6-dimethylbenzimidazol-1-yl)-4-hydroxy-2-(hydroxymethyl)oxolan-3-yl] [(2R)-1-[3-[(1R,2R,3R,5Z,7S,10Z,12S,13S,15Z,17S,18S,19R)-2,13,18-tris(2-amino-2-oxoethyl)-7,12,17-tris(3-amino-3-oxopropyl)-3,5,8,8,13,15,18,19-octamethyl-2,7,12,17-tetrahydro-1H-corrin-24-id-3-yl]propanoylamino]propan-2-yl] phosphate;cyanide',
    letter: 'B',
    number: 12,
    wikipedia_link: 'https://de.wikipedia.org/wiki/Cobalamine',
    pub_chem_link: 'https://pubchem.ncbi.nlm.nih.gov/compound/5311498',
  }),
  'Vitamin B2 (Riboflavin) (mg)': get_get_vitamin({
    iupac_name:
      '7,8-dimethyl-10-[(2S,3S,4R)-2,3,4,5-tetrahydroxypentyl]benzo[g]pteridine-2,4-dione',
    letter: 'B',
    number: 2,
    wikipedia_link: 'https://de.wikipedia.org/wiki/Riboflavin',
    pub_chem_link: 'https://pubchem.ncbi.nlm.nih.gov/compound/493570',
  }),
  // TODO: molecule group
  'Vitamin B6 (Pyridoxin) (mg)': get_get_vitamin({
    iupac_name: '4,5-bis(hydroxymethyl)-2-methylpyridin-3-ol',
    letter: 'B',
    number: 6,
    wikipedia_link: 'https://de.wikipedia.org/wiki/Pyridoxin',
    pub_chem_link: 'https://pubchem.ncbi.nlm.nih.gov/compound/1054',
  }),
  'Vitamin C (Ascorbinsäure) (mg)': get_get_vitamin({
    iupac_name: '(2R)-2-[(1S)-1,2-dihydroxyethyl]-3,4-dihydroxy-2H-furan-5-one',
    letter: 'C',
    wikipedia_link: 'https://de.wikipedia.org/wiki/Ascorbins%C3%A4ure',
    pub_chem_link: 'https://pubchem.ncbi.nlm.nih.gov/compound/54670067',
  }),
  // TODO: molecule group
  'Vitamin D (Calciferol) (µg)': get_get_vitamin({
    iupac_name:
      '(1S,3Z)-3-[(2E)-2-[(1R,3aS,7aR)-1-[(E,2R,5R)-5,6-dimethylhept-3-en-2-yl]-7a-methyl-2,3,3a,5,6,7-hexahydro-1H-inden-4-ylidene]ethylidene]-4-methylidenecyclohexan-1-ol',
    letter: 'D',
    wikipedia_link: 'https://de.wikipedia.org/wiki/Ergocalciferol',
    pub_chem_link: 'https://pubchem.ncbi.nlm.nih.gov/compound/5280793',
  }),
  'Vitamin E (α-Tocopherol) (mg)': get_get_vitamin({
    iupac_name:
      '(2R)-2,5,7,8-tetramethyl-2-[(4R,8R)-4,8,12-trimethyltridecyl]-3,4-dihydrochromen-6-ol',
    letter: 'E',
    wikipedia_link: 'https://de.wikipedia.org/wiki/Tocopherole',
    pub_chem_link: 'https://pubchem.ncbi.nlm.nih.gov/compound/14985',
  }),
  'Wasser (g)': get_get_macronutrient({
    wikipedia_link: 'https://de.wikipedia.org/wiki/Wasser',
    pub_chem_link: 'https://pubchem.ncbi.nlm.nih.gov/compound/962',
  }),
  'Zink (Zn)  (mg)': get_get_element({ symbol: 'Zn' }),
  'Zucker (g)': get_get_macronutrient({}),
  'Energie, Kalorien (kcal)': get_get_macronutrient({}),
  'Energie, Kilojoule (kJ)': get_get_macronutrient({}),
  'Fett, total (g)': get_get_macronutrient({}),
}
