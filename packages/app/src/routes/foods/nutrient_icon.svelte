<script>
  import Unknown from '~icons/mdi/help-circle'
  import Alcohol from '~icons/mdi/glass-cocktail'
  import Carbohydrates from '~icons/mdi/baguette'
  import Cholesterol from '~icons/mdi/egg'
  import Energy from '~icons/mdi/lightning-bolt'
  import Fat from '~icons/mdi/barrel'
  import Fatty_Acids_Mono_Unsaturated from '~icons/mdi/battery-medium'
  import Fatty_Acids_Poly_Unsaturated from '~icons/mdi/battery-outline'
  import Fatty_Acids_Saturated from '~icons/mdi/battery-high'
  import Fiber from '~icons/mdi/grass'
  import Protein from '~icons/mdi/arm-flex'
  import Salt from '~icons/mdi/shaker'
  import Starch from '~icons/mdi/wheat'
  import Sugar from '~icons/mdi/candy'
  import Vitamin from '~icons/mdi/medication'
  import Water from '~icons/mdi/waves'

  /** @type {Record<string, import('svelte').ComponentType>} */
  const icons = {
    Alkohol: Alcohol,
    Cholesterin: Cholesterol,
    'Energie, Kalorien': Energy,
    'Energie, Kilojoule': Energy,
    'Fett, total': Fat,
    'Fettsäuren, einfach ungesättigt': Fatty_Acids_Mono_Unsaturated,
    'Fettsäuren, gesättigt': Fatty_Acids_Saturated,
    'Fettsäuren, mehrfach ungesättigt': Fatty_Acids_Poly_Unsaturated,
    'Kohlenhydrate, verfügbar': Carbohydrates,
    Nahrungsfasern: Fiber,
    Protein: Protein,
    Salz: Salt,
    Stärke: Starch,
    Wasser: Water,
    Zucker: Sugar,
  }

  /**
   * @type {{ __typename: 'Macronutrient'; name: string }
   *   | { __typename: 'Element'; symbol: string }
   *   | { __typename: 'Molecule'; name: string }
   *   | { __typename: 'Provitamin'; letter: string; number?: number }
   *   | { __typename: 'Vitamin'; letter: string; number?: number }}
   */
  export let nutrient
</script>

{#if nutrient.__typename === 'Macronutrient' || nutrient.__typename === 'Molecule'}
  {@const Icon = icons[nutrient.name] ?? Unknown}
  <Icon />
{:else if nutrient.__typename === 'Element'}
  <span class="element_icon">{nutrient.symbol}</span>
{:else if nutrient.__typename === 'Provitamin' || nutrient.__typename === 'Vitamin'}
  <span class="vitamin_icon">
    <Vitamin />
    <span>
      {nutrient.letter}<!--
      -->{#if nutrient.number !== null}<!--
        --><sub>
          {nutrient.number}
        </sub>
      {/if}
    </span>
  </span>
{:else}
  <Unknown />
{/if}

<style>
  .element_icon {
    font-weight: 700;
    font-size: 1.25rem;
    line-height: 1;
    letter-spacing: -0.05rem;
  }

  .vitamin_icon {
    display: grid;
    grid-auto-flow: column;
    justify-content: start;
  }
</style>
