<script>
  import Nutrient_Icon from './nutrient_icon.svelte'

  export let data

  // TODO: use tables
</script>

<ul class="food_list">
  {#each data.foods as food}
    {@const micronutrient_contents = food.nutrient_contents.filter(
      (nutrient_content) =>
        nutrient_content.nutrient.category === 'micronutrient' &&
        nutrient_content.amount !== null &&
        nutrient_content.amount?.amount > 0,
    )}
    {@const macronutrient_contents = food.nutrient_contents.filter(
      (nutrient_content) => nutrient_content.nutrient.category === 'macronutrient',
    )}

    <li class="food">
      <h2 class="food_name">{food.name}</h2>

      <h3 class="nutrient_category micronutrient_heading">Mikronährstoffe</h3>

      <ul class="nutrient_contents micronutrient_list">
        {#each micronutrient_contents as nutrient_content}
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

      <h3 class="nutrient_category macronutrient_heading">Makronährstoffe</h3>

      <ul class="macronutrient_contents macronutrient_list">
        {#each macronutrient_contents as nutrient_content}
          {@const amount = nutrient_content.amount ?? { amount: 0, unit: 'g' }}
          <li class="macronutrient_content">
            <Nutrient_Icon nutrient={nutrient_content.nutrient} />
            <span class="macronutrient_name">
              {nutrient_content.nutrient.name}
            </span>
            <span>
              {amount.amount}{amount.unit}
            </span>
          </li>
        {/each}
      </ul>
    </li>
  {/each}
</ul>

<style>
  .food_list {
    display: grid;
    grid-template-columns: 1fr;
    justify-content: center;
    gap: 3rem;
    margin-inline: var(--margin_content_text);
    margin-top: 4rem;
  }

  .food {
    display: grid;
    grid-template-columns: 1fr auto;
    grid-template-areas:
      'name'
      'micronutrient_heading'
      'micronutrient_list'
      'macronutrient_heading'
      'macronutrient_list';
    align-items: start;
  }

  @media (min-width: 52rem) {
    .food_list {
      margin-inline: var(--margin_content_page);
    }
    .food {
      display: grid;
      grid-template-columns: 1fr auto;
      grid-template-areas:
        'name name'
        'micronutrient_heading macronutrient_heading'
        'micronutrient_list macronutrient_list';
    }
  }

  .food_name {
    grid-area: name;
  }

  .micronutrient_heading {
    grid-area: micronutrient_heading;
  }

  .micronutrient_list {
    grid-area: micronutrient_list;
  }

  .macronutrient_heading {
    grid-area: macronutrient_heading;
  }

  .macronutrient_list {
    grid-area: macronutrient_list;
  }

  .food_name {
    font-weight: bold;
    font-size: 1.5rem;
    line-height: 1;
  }

  .nutrient_category {
    margin-top: 1.5rem;
    font-weight: 500;
  }

  .nutrient_contents {
    display: grid;
    grid-template-columns: repeat(auto-fit, 5.2rem);
    column-gap: 1rem;
    row-gap: 1.5rem;
    margin-top: 0.5rem;
  }

  .nutrient_content {
    display: grid;
    grid-template-columns: 1fr;
    align-content: start;
    justify-content: start;
  }

  .nutrient_content_amount {
    font-size: 0.8125rem;
  }

  .macronutrient_contents {
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 0.5rem;
    margin-top: 0.5rem;
  }

  .macronutrient_content {
    display: grid;
    grid-template-columns: 1.25rem 1fr auto;
    column-gap: 0.5rem;
    align-content: start;
    justify-content: start;
  }

  .macronutrient_name {
    margin-right: 2.5rem;
  }
</style>
