<script>
  import { page } from '$app/stores'

  import '../app.mjs'

  import Footer from '$components/footer.svelte'
  import Header from '$components/header.svelte'
  import Modal from '$components/modal.svelte'

  import { main_inert } from '$stores/main_inert.mjs'

  /** @type {boolean} */
  let settings_open = false
</script>

<svelte:head>
  <title>{$page.data.page_metadata.title} | Nährwertapp</title>
  <meta
    name="description"
    content={$page.data.page_metadata.title}
  />
</svelte:head>

<Header
  on:click_settings={() => {
    settings_open = !settings_open
  }}
/>

<main inert={$main_inert}>
  <slot />
</main>

<Modal
  heading="Einstellungen"
  bind:visible={settings_open}
>
  <p style="margin-top: 2rem;">Das fehlt noch 🤔</p>
</Modal>

<Footer />

<style>
  main {
    min-height: 80vh;
  }
</style>
