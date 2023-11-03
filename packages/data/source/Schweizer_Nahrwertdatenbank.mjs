import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { cwd } from 'node:process'

import { parse } from 'csv-parse'
import { entries, from_entries } from './object.mjs'

const data_files_directory = join(cwd(), 'data_files')
const output_files_directory = join(cwd(), 'build')

/** @type {Record<Nutrient_Key, string>} */
const nutrient_name_map = {
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

/** @type {(entry: [Record_Key, string]) => entry is [Food_Key, string]} */
const is_food_entry = (entry) => !(entry[0] in nutrient_name_map)
/** @type {(entry: [Record_Key, string]) => entry is [Nutrient_Key, string]} */
const is_nutrient_entry = (entry) => entry[0] in nutrient_name_map
/**
 * @type {(record: Record<Record_Key, string>) => {
 *   food_data: Record<Food_Key, string>
 *   nutrient_data: Record<Nutrient_Key, string>
 * }}
 */
const split_food_and_nutrient_data = (record) => {
  const food_data_entries = entries(record).filter(is_food_entry)
  const food_data = from_entries(food_data_entries)
  const nutrient_data_entries = entries(record).filter(is_nutrient_entry)
  const nutrient_data = from_entries(nutrient_data_entries)

  const split_data = {
    food_data,
    nutrient_data,
  }

  return split_data
}

/** @type {(string: Nutrient_Key) => string} */
const get_nutrient_name = (string) => {
  const nutrient_name = nutrient_name_map[string]

  return nutrient_name
}

/** @type {(key: string, value: string) => Amount | null} */
const get_amount = (key, value) => {
  if (value === 'k.A.') {
    return null
  }

  const last_opening_round_bracket_index = key.lastIndexOf('(')
  const unit_substring = key.substring(last_opening_round_bracket_index)
  const unit = unit_substring.replace(/[()]/g, '')
  const amount = parseFloat(value)

  if (isNaN(amount)) {
    return null
  }

  const result = {
    unit,
    amount,
  }

  return result
}

/** @type {(record: Record<Record_Key, string>) => Food} */
const get_food = (record) => {
  const { nutrient_data } = split_food_and_nutrient_data(record)

  /** @type {Nutrient_Content[]} */
  const nutrient_contents = []

  const nutrient_entries = /** @type {[Nutrient_Key, string][]} */ (Object.entries(nutrient_data))
  for (const [nutrient_key, value] of nutrient_entries) {
    const amount = get_amount(nutrient_key, value)
    const name = get_nutrient_name(nutrient_key)
    const nutrient = {
      name,
    }

    const nutrient_content = {
      nutrient,
      amount,
    }

    nutrient_contents.push(nutrient_content)
  }

  const name = record['Name']
  const swiss_nutrient_database_id = record['ID']
  const swiss_nutrient_database_id_v4 = record['ID V 4.0'] || undefined
  const swiss_fir_id = record['ID SwissFIR'] || undefined

  const meta = {
    swiss_nutrient_database_id,
    swiss_nutrient_database_id_v4,
    swiss_fir_id,
  }

  /** @type {Food} */
  const food = {
    name,
    meta,
    nutrient_contents,
  }

  return food
}

const main = async () => {
  const file_path = join(data_files_directory, 'Schweizer_Nahrwertdatenbank.csv')
  const file_content = await readFile(file_path)

  /** @type {Record<Record_Key, string>[]} */
  const records = await new Promise((resolve, reject) => {
    /** @type {Record<Record_Key, string>[]} */
    const records = []

    const parser = parse(file_content, {
      columns: true,
      fromLine: 3,
      onRecord: (record) => {
        records.push(record)
      },
    })
    parser.on('error', (error) => {
      reject(error)
    })
    parser.on('end', () => {
      resolve(records)
    })
    parser.on('finish', () => {
      resolve(records)
    })
  })

  const foods = records.map((record) => get_food(record))

  try {
    await mkdir(output_files_directory, { recursive: true })
  } catch {
    // ignore errors
  }
  const output_file_path = join(output_files_directory, 'foods.json')
  const output_file_string = JSON.stringify(
    foods,
    null,
    process.env.NODE_ENV === 'development' ? 2 : undefined,
  )
  await writeFile(output_file_path, output_file_string)
}

main()
