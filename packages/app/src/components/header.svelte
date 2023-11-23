<script>
  import Cog from '~icons/mdi/cog'
  import Menu from '~icons/mdi/menu'
  import Home from '~icons/mdi/home'
  import Foods from '~icons/mdi/food'
  import Search from '~icons/mdi/magnify'
  import Comparison from '~icons/mdi/compare'

  import { page } from '$app/stores'
  import { createEventDispatcher } from 'svelte'
  import { foods } from '$stores/comparison.mjs'
  import { get_compare_url } from '../routes/compare/get_compare_url.mjs'

  /** @type {boolean} */
  let menu_open = false

  /** @type {import('svelte').EventDispatcher<{ click_settings: void }>} */
  const dispatch = createEventDispatcher()

  $: compare_url = get_compare_url($foods)
</script>

<header class="colored_frosted-glass">
  <div
    role="presentation"
    class="header_bar"
    class:menu_open
  >
    <nav>
      <ul>
        <li>
          <a
            href="/"
            class:active={$page.url.pathname === '/'}
          >
            <Home aria-label="Startseite" />

            <span>Startseite</span>
          </a>
        </li>

        <li>
          <a
            href="/search"
            class:active={$page.url.pathname === '/search'}
          >
            <Search aria-label="Suchen" />

            <span>Suchen</span>
          </a>
        </li>
      </ul>
    </nav>

    <a
      href={compare_url}
      title="{$foods.length} Lebensmittel vergleichen"
      class="comparison_link"
    >
      <Comparison aria-label="{$foods.length} Lebensmittel vergleichen" />
      {$foods.length}
    </a>

    <button
      class="menu_button"
      title="Toggle menu"
      on:click={() => {
        menu_open = !menu_open
      }}
    >
      <Menu aria-label="Toggle menu" />
    </button>

    <button
      title="Einstellungen"
      on:click={() => {
        dispatch('click_settings')
      }}
      class="settings_button"
    >
      <Cog aria-label="Einstellungen" />
    </button>
  </div>
</header>

<style>
  header {
    --underline_thickness: 0.15rem;

    position: sticky;
    top: 0rem;
    z-index: 100;
    color: var(--color-blue-5);
  }

  @media (prefers-color-scheme: dark) {
    header {
      color: var(--color-blue-4);
    }
  }

  .comparison_link {
    display: grid;
    grid-auto-flow: column;
    align-items: center;
    gap: 0.15rem;
    line-height: 1;
  }

  .header_bar {
    display: grid;
    grid-template-columns: 1fr repeat(2, auto);
    grid-template-areas: 'navigation comparison settings';
    grid-auto-flow: column;
    margin-inline: var(--margin_content_page);
    line-height: 1rem;
  }

  @media not (min-width: 40rem) {
    a.active {
      background-image: linear-gradient(to bottom, currentColor, currentColor);
      background-position: center 2.5rem;
      background-size: 1.75rem var(--underline_thickness);
      background-repeat: no-repeat;
    }
  }

  ul {
    display: grid;
    grid-auto-flow: column;
    justify-content: start;
    align-items: start;
  }

  @media not (min-width: 40rem) {
    a > span {
      position: absolute;
      visibility: hidden;
      pointer-events: none;
    }
  }

  a {
    display: grid;
    grid-auto-flow: row;
    gap: 0.4em;
    padding-inline: 1em;
    padding-block: 1em;
    font-weight: 700;
  }

  @media not (min-width: 40rem) {
    a > span {
      position: absolute;
      visibility: hidden;
      pointer-events: none;
    }
  }

  @media (min-width: 40rem) {
    a {
      grid-auto-flow: column;
      writing-mode: horizontal-tb;
    }
  }

  a :global(svg) {
    position: relative;
    width: auto;
    height: 100%;
  }

  a.active {
    text-decoration: underline;
    text-decoration-thickness: var(--underline_thickness);
    text-underline-offset: 0.4rem;
  }

  .settings_button {
    grid-area: settings;
  }

  @media (min-width: 40rem) {
    .menu_button {
      display: none;
    }
  }

  button {
    padding-inline: 1em;
    padding-block: 1em;
  }
</style>
