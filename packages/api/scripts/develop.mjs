import { createServer } from 'node:http'
import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { cwd } from 'node:process'

import { nanoid } from 'nanoid'

import { handler } from '../source/handler.mjs'

/** @type {(file_path: string) => Promise<any>} */
const load_json_file = async (file_path) => {
  const file_buffer = await readFile(file_path)
  const file_string = file_buffer.toString()
  const definition = JSON.parse(file_string)

  return definition
}

/** @type {(name: string) => string} */
const slugify = (name) => name.replace(/\W+/gi, '-').replace(/^-|-$/gi, '').toLowerCase()

const develop = async () => {
  console.info('reading files')
  const foods_file_path = resolve(cwd(), '../data/build/foods.json')
  /** @type {Food[]} */
  const food_datums = await load_json_file(foods_file_path)
  const foods = food_datums.map((food) => {
    const id = nanoid()
    const slug = slugify(food.name)

    const identifiable_slugifiable_food = { ...food, id, slug }

    return identifiable_slugifiable_food
  })

  console.info('creating server instance')
  const request_handler = handler({
    foods,
    graphiql: true,
    landingPage: true,
  })
  const server = createServer(request_handler)

  server.listen(4000, () => console.info('running.\n  ~~> http://localhost:4000/graphql'))
}

develop()
