import { sveltekit } from '@sveltejs/kit/vite'
import { defineConfig } from 'vitest/config'
import unplugin_icons from 'unplugin-icons/vite'
import { imagetools } from 'vite-imagetools'

export default defineConfig({
  plugins: [sveltekit(), unplugin_icons({ compiler: 'svelte', scale: 1.25 }), imagetools()],
  test: {
    include: ['src/**/*.{test,spec}.{js,ts}'],
  },
})
