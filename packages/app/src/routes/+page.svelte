<script>
  import search_screenshot from '$images/screenshot_search.png?format=webp&w=1280&h=720'
  import compare_screenshot from '$images/screenshot_compare.png?format=webp&w=1280&h=720'

  import Image_With_Text from '$components/content_elements/image_with_text.svelte'
  import Spacer from '$components/content_elements/spacer.svelte'
  import Search_Form from './search/search_form.svelte'
</script>

<div
  role="presentation"
  class="page_intro"
>
  <h1 class="page_heading">Nährwertapp</h1>

  <p class="intro_text">
    Durchsuche die &gt;1'000 Lebensmittel der Schweizer Nährwertdatenbank mit der Nährwertapp.
  </p>

  <Search_Form />
</div>

<Spacer />

<Image_With_Text
  image_src={search_screenshot}
  image_alt="Der Eintrag von gekochten Amaranthsamen in der Nahrungsmittelliste"
  image_caption="Detaillierte Nährwertangaben in der Lebensmittelliste."
  text="Mit der Nährwertapp kannst du detaillierte Angaben zu Vitaminen, Spurenelementen und, wie von
    Verpackungen gewohnt, Makronährstoffen abfragen. Die Nährwertapp beinhaltet die mehr als 1'000
    Nahrungsmittel der Schweizer Nährwertdatenbank der Schweizer Gesellschaft für Ernährung."
/>

<Spacer />

<Image_With_Text
  image_src={compare_screenshot}
  image_alt="Die Einträge für Baumnuss, Cashewnuss und Erdnuss in der Vergleichstabelle."
  image_caption="Vergleichen von Lebensmitteln in der Vergleichstabelle."
  text="Füge Lebensmittel zur Vergleichsliste hinzu um ihre Nährwerte miteinander zu vergleichen. Die Nährwerte werden übersichtlich in einer Tabelle dargestellt, die du dir als Buchzeichen speichern kannst."
  image_position="right"
/>

<style>
  .page_intro {
    display: grid;
    place-content: center;
    padding-block: 5rem;
    min-height: 50vh;
  }

  .page_heading {
    margin-inline: var(--margin_content_text);
    font-weight: 700;
    font-size: 2rem;
    line-height: 1;
  }

  .intro_text {
    margin-top: 2rem;
    margin-inline: var(--margin_content_text);
  }
</style>
