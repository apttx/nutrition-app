<script>
  import { fade } from 'svelte/transition'
  import { cubicOut } from 'svelte/easing'

  import Compare from '~icons/mdi/compare'
  import Details from '~icons/mdi/arrow-right'
  import { add } from '$stores/comparison.mjs'

  import Nutrient_Icon from '../foods/nutrient_icon.svelte'
  import Search_Form from './search_form.svelte'

  export let data
</script>

<h1 class="page_heading">Suche</h1>

<Search_Form />

{#if data.search_results?.length === 0}
  <p class="no_results">Es wurden keine Lebensmittel gefunden.</p>
{:else if data.search_results?.length}
  <ol class="search_results">
    {#each data.search_results as search_result, index}
      <li
        in:fade|global={{ easing: cubicOut, delay: index * 50, duration: 200 }}
        class="food"
      >
        <span class="food_name search_highlight">
          {@html search_result.highlights.all_properties.html}
        </span>
        <button
          class="na_button compare_button"
          on:click={() => add(search_result.food)}
        >
          <span>Vergleichen</span>
          <Compare aria-label="Zur Vergleichsliste hinzufügen" />
        </button>
        <a
          href="/food/{search_result.food.slug}"
          class="na_link details_link"
        >
          <span>Details</span>
          <Details aria-label="Details anzeigen" />
        </a>

        <ul class="nutrient_contents micronutrient_list">
          {#each search_result.food.nutrient_contents as nutrient_content}
            {@const amount = nutrient_content.amount ?? { amount: 0, unit: 'g' }}
            <li
              class="nutrient_content"
              title="Beinhaltet {amount.amount}{amount.unit} {nutrient_content.nutrient.name}"
            >
              <Nutrient_Icon nutrient={nutrient_content.nutrient} />
              <span class="nutrient_content_amount">
                {amount.amount}{amount.unit}
              </span>
            </li>
          {/each}
        </ul>
      </li>
    {/each}
  </ol>
{/if}

<style>
  .page_heading {
    margin-inline: var(--margin_content_text);
    margin-top: 3rem;
    font-weight: 700;
    font-size: 2rem;
    line-height: 1;
  }

  .no_results {
    margin-inline: var(--margin_content_text);
    margin-top: 3rem;
    font-size: 1.25rem;
  }

  .search_results {
    margin-top: 3rem;
    margin-inline: var(--margin_content_text);
  }

  .search_results :global(em) {
    transition-duration: inherit;
    transition-property: inherit;
    transition-timing-function: inherit;
    color: var(--color-blue-6);
    font-style: normal;
    font-weight: 500;
  }
  @media (prefers-color-scheme: dark) {
    .search_results :global(em) {
      color: var(--color-blue-4);
    }
  }

  .food {
    display: grid;
    grid-template-columns: 1fr repeat(2, auto);
    grid-template-areas:
      'name compare details'
      'nutrients nutrients nutrients';
    column-gap: 1rem;
    align-items: start;
    margin-top: 3rem;
  }

  .food_name {
    grid-area: name;
    font-weight: 700;
    font-size: 1.25rem;
    line-height: 1;
  }

  .compare_button {
    display: grid;
    grid-auto-flow: column;
    column-gap: 0.5ch;
    grid-area: compare;
    align-items: center;
  }

  .details_link {
    display: grid;
    grid-auto-flow: column;
    column-gap: 0.5ch;
    grid-area: details;
    align-items: center;
  }

  .nutrient_contents {
    display: grid;
    grid-template-columns: repeat(auto-fit, 5.2rem);
    column-gap: 1rem;
    row-gap: 1.5rem;
    grid-area: nutrients;
    margin-top: 1.5rem;
  }
</style>
