<script>
  import { fly } from 'svelte/transition'
  import { cubicIn, cubicOut } from 'svelte/easing'
  import Search from '~icons/mdi/magnify'

  import { goto } from '$app/navigation'
  import { page } from '$app/stores'

  import { client, gql } from '$graphql'

  /** @type {string | null} */
  let search_term = $page.url.searchParams.get('term')
  /** @typedef {{ food: { name: string }; highlights: { all_properties: { html: string } } }} Autocomplete_Result */
  /** @type {Autocomplete_Result[] | null} */
  let autocomplete_results = null
  /**
   * @type {import('@urql/core').TypedDocumentNode<
   *   { search: Autocomplete_Result[] },
   *   { term: string }
   * >}
   */
  const autocomplete_query = gql`
    query autocomplete($term: String!) {
      search(term: $term, limit: 5) {
        food {
          name
        }
        highlights {
          all_properties {
            html
          }
        }
      }
    }
  `
  /** @type {(term: string) => Promise<Autocomplete_Result[] | null>} */
  const autocomplete = async (term) => {
    // empty strings
    if (!term) {
      return null
    }

    const result = await client.query(autocomplete_query, { term })
    if (!result.data) {
      return null
    }

    return result.data.search
  }

  const search = () => {
    if (!search_term) {
      return
    }

    autocomplete_results = null

    const options = {
      // replace the history entry if a search term was already entered
      replaceState: $page.url.searchParams.has('term'),
      // don't scroll to top
      noScroll: true,
    }

    goto(`/search?term=${encodeURIComponent(search_term)}`, options)
  }
</script>

<div
  role="presentation"
  class="search"
>
  <form
    class="search_form"
    on:submit|preventDefault={search}
  >
    <label>
      <span class="na_input_label">Lebensmittel</span>
      <input
        bind:value={search_term}
        type="search"
        placeholder="Nuss, Pommes, Salat..."
        required
        class="na_input"
        on:input={async (event) => {
          const term = event.currentTarget.value

          autocomplete_results = await autocomplete(term)
        }}
      />
    </label>

    <button
      type="submit"
      class="na_input"
    >
      <Search />
    </button>
  </form>

  {#if autocomplete_results}
    <div
      role="dialog"
      in:fly={{ y: 64, duration: 200, easing: cubicOut }}
      out:fly={{ y: 64, duration: 200, easing: cubicIn }}
      class="autocomplete_results colored_frosted-glass"
    >
      {#if !autocomplete_results.length}
        <p
          role="alert"
          class="no_results"
        >
          Wir haben keine Lebensmittel für &quot;{search_term}&quot; 😔
        </p>
      {/if}
      <ul>
        {#each autocomplete_results as autocomplete_result}
          <li>
            <a
              href="/search?term={encodeURIComponent(autocomplete_result.food.name)}"
              class="autocomplete_result na_link search_highlight"
              on:click={() => {
                autocomplete_results = null
                search_term = autocomplete_result.food.name
              }}
            >
              {@html autocomplete_result.highlights.all_properties.html}
            </a>
          </li>
        {/each}
      </ul>
    </div>
  {/if}
</div>

<style>
  .search {
    position: relative;
  }

  .search_form {
    display: grid;
    grid-template-columns: 1fr auto;
    align-items: end;
    gap: 1rem;
    margin-top: 2rem;
    margin-inline: var(--margin_content_text);
  }

  .na_input {
    width: 100%;
  }

  button {
    display: block;
    width: 2.75rem;
    height: 2.75rem;
  }

  .no_results {
    padding: 0.5rem 2rem;
  }

  .autocomplete_results {
    position: absolute;
    top: calc(100% + 1rem);
    z-index: 1;
    margin-inline: var(--margin_content_text);
    inset-inline: 0;
    box-shadow: 0 0.25rem 0.5rem #00000033;
    border-radius: 0.25rem;
    padding-block: 1.25rem;
  }

  .autocomplete_result {
    display: block;
    padding: 0.5rem 2rem;
  }

  .search_highlight.na_link :global(em) {
    transition-duration: inherit;
    transition-property: inherit;
    transition-timing-function: inherit;
  }
  .search_highlight.na_link:hover :global(em) {
    color: inherit;
  }
</style>
