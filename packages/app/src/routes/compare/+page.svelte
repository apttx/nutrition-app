<script>
  import Remove from '~icons/mdi/trash'

  import { goto } from '$app/navigation'

  import { remove } from '$stores/comparison.mjs'
  import Nutrient_Icon from '../foods/nutrient_icon.svelte'
  import { get_compare_url } from './get_compare_url.mjs'
  import Tooltip from './tooltip.svelte'

  export let data
</script>

<h1 class="page_heading">Vergleichen</h1>

{#if !data.foods?.length}
  <p class="no_foods">Es sind keine Lebensmittel in der Liste.</p>
{:else}
  <div
    role="presentation"
    class="comparison_table_wrapper"
  >
    <table class="comparison_table">
      <thead>
        <tr>
          <th class="nutrient_column_header colored_frosted-glass">Nährstoff</th>
          {#each data.foods as food}
            <th class="column_header colored_base">
              <span class="food_name_and_remove">
                <span class="food_name">
                  {food.name}
                </span>
                <button
                  class="na_button remove_button"
                  on:click={async () => {
                    const foods = remove(food)
                    const compare_url = get_compare_url(foods)
                    goto(compare_url, { replaceState: true, noScroll: true })
                  }}
                >
                  <Remove aria-label="{food.name} entfernen" />
                </button>
              </span>
            </th>
          {/each}
        </tr>
      </thead>
      <tbody>
        {#each data.foods[0].nutrient_contents as nutrient_content}
          {@const row_nutrient = nutrient_content.nutrient}
          <tr>
            <th
              scope="row"
              class="nutrient_header colored_frosted-glass"
            >
              <span class="nutrient_icon_and_name">
                <Nutrient_Icon nutrient={row_nutrient} />
                <span>{row_nutrient.name}</span>
              </span>
            </th>

            {#each data.foods as food}
              {@const food_nutrient_content = food.nutrient_contents.find(
                (food_nutrient_content) =>
                  food_nutrient_content.nutrient.name === row_nutrient.name,
              )}
              <td class:contains_zero={!food_nutrient_content?.amount?.amount}>
                {#if food_nutrient_content?.amount}
                  {food_nutrient_content.amount.amount}{food_nutrient_content.amount.unit}
                {:else}
                  <span
                    aria-label="keine Angabe"
                    title="keine Angabe"
                  >
                    &mdash;
                  </span>
                {/if}
              </td>
            {/each}
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
{/if}

<style>
  .page_heading {
    margin-inline: var(--margin_content_text);
    margin-top: 3rem;
    font-weight: 700;
    font-size: 2rem;
    line-height: 1;
  }

  .no_foods {
    margin-inline: var(--margin_content_text);
    margin-top: 3rem;
    font-size: 1.25rem;
  }

  .comparison_table_wrapper {
    margin-top: 3rem;
    margin-inline: auto;
    max-width: var(--width_layout);
    overflow: auto visible;
  }
  .comparison_table {
    border-collapse: separate;
    border-spacing: 0;
  }

  th {
    text-align: start;
  }
  th,
  td {
    padding: 0.75rem 1.5rem;
  }
  td {
    z-index: 0;
    text-align: end;
  }

  tr:nth-of-type(even) td {
    background: var(--color-gray-2);
  }

  .nutrient_column_header {
    position: sticky;
    /* top: 3.25rem; */
    left: 0;
    vertical-align: bottom;
    z-index: 3;
    border-bottom-width: 0.15rem;
    border-color: currentColor;
    font-weight: 500;
    font-size: 1.25rem;
    line-height: 1;
  }

  .column_header {
    position: sticky;
    vertical-align: bottom;
    /* top: 3.25rem; */
    z-index: 2;
    border-bottom-width: 0.15rem;
    border-color: currentColor;
    font-weight: 500;
    font-size: 1.25rem;
    line-height: 1;
  }

  .food_name_and_remove {
    display: grid;
    grid-template-columns: repeat(2, auto);
    grid-template-areas: 'name remove';
    row-gap: 0.5rem;
  }

  .food_name {
    position: relative;
    grid-area: name;
    width: max-content;
    max-width: 10rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .remove_button {
    grid-area: remove;
  }

  .nutrient_header {
    position: sticky;
    left: 0;
    z-index: 1;
  }

  .nutrient_icon_and_name {
    display: grid;
    grid-auto-flow: column;
    justify-content: start;
    align-items: center;
    gap: 1ch;
    font-weight: 400;
  }

  .contains_zero {
    color: var(--color-gray-5);
  }

  tr:nth-of-type(even) .contains_zero {
    color: var(--color-gray-6);
  }
</style>
