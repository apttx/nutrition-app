<script>
  import Nutrient_Icon from '../../foods/nutrient_icon.svelte'

  export let data

  $: micronutrient_contents = data.food.nutrient_contents.filter(
    (nutrient_content) => nutrient_content.nutrient.category === 'micronutrient',
  )
  $: macronutrient_contents = data.food.nutrient_contents.filter(
    (nutrient_content) => nutrient_content.nutrient.category === 'macronutrient',
  )
</script>

<h1 class="food_name">{data.food.name}</h1>

<h2 class="nutrient_heading micronutrient_heading">Mikronährstoffe</h2>

<table class="nutrient_contents_table micronutrient_table">
  <thead>
    <tr>
      <th class="nutrient_header">Mikronährstoff</th>
      <th class="amount_header">Menge</th>
    </tr>
  </thead>
  <tbody>
    {#each micronutrient_contents as micronutrient_content, index (micronutrient_content.nutrient.name)}
      <tr class:colored_neutral_base={index % 2}>
        <td class="nutrient_icon_and_name">
          <Nutrient_Icon nutrient={micronutrient_content.nutrient} />
          <span>{micronutrient_content.nutrient.name}</span>
        </td>
        <td class="nutrient_content_amount">
          {#if !micronutrient_content.amount}
            &mdash;
          {:else}
            {micronutrient_content.amount.amount}{micronutrient_content.amount.unit}
          {/if}
        </td>
      </tr>
    {/each}
  </tbody>
</table>

<h2 class="nutrient_heading macronutrient_heading">Makronährstoffe</h2>

<table class="nutrient_contents_table macronutrient_table">
  <thead>
    <tr>
      <th class="nutrient_header">Makronährstoff</th>
      <th class="amount_header">Menge</th>
    </tr>
  </thead>
  <tbody>
    {#each macronutrient_contents as macronutrient_content, index (macronutrient_content.nutrient.name)}
      <tr class:colored_neutral_base={index % 2}>
        <td class="nutrient_icon_and_name">
          <Nutrient_Icon nutrient={macronutrient_content.nutrient} />
          <span>{macronutrient_content.nutrient.name}</span>
        </td>
        <td class="nutrient_content_amount">
          {#if !macronutrient_content.amount}
            &mdash;
          {:else}
            {macronutrient_content.amount.amount}{macronutrient_content.amount.unit}
          {/if}
        </td>
      </tr>
    {/each}
  </tbody>
</table>

<style>
  .food_name {
    grid-area: name;
    margin-top: 3rem;
    margin-inline: var(--margin_content_text);
    font-weight: bold;
    font-size: 2rem;
    line-height: 1;
  }

  .micronutrient_heading {
    grid-area: micronutrient_heading;
    margin-inline: var(--margin_content_text);
  }

  .micronutrient_table {
    grid-area: micronutrient_table;
  }

  .macronutrient_heading {
    grid-area: macronutrient_heading;
    margin-inline: var(--margin_content_text);
  }

  .macronutrient_table {
    grid-area: macronutrient_table;
  }

  .nutrient_heading {
    margin-top: 3rem;
    font-weight: 700;
    line-height: 1;
  }

  .nutrient_contents_table {
    --inline_cell_padding: 1.5rem;

    margin-inline: auto;
    margin-top: 1rem;
    margin-bottom: 5rem;
    width: min(100%, var(--width_text) + var(--inline_cell_padding) * 2);
  }

  .nutrient_icon_and_name {
    display: grid;
    grid-auto-flow: column;
    justify-content: start;
    gap: 1ch;
  }

  .nutrient_header {
    border-bottom-width: 0.15rem;
    border-color: currentColor;
    font-weight: 500;
    text-align: start;
  }

  .amount_header {
    border-bottom-width: 0.15rem;
    border-color: currentColor;
    font-weight: 500;
    text-align: end;
  }

  .nutrient_content_amount {
    text-align: end;
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
  }
</style>
