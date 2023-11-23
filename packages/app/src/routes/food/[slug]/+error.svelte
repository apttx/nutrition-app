<script>
  import { page } from '$app/stores'

  $: heading =
    $page.status === 404 ? 'Dieses Lebensmittel gibt es nicht' : 'Oh nein, etwas ist kaputtgegangen'
</script>

<div>
  <h1>{heading}</h1>

  <p>
    Versuche die
    <a href="/">Startseite</a>
    oder die
    <a href="/foods">Nahrungsmittelliste</a>
    zu besuchen.
  </p>
</div>

<style>
  h1 {
    font-weight: 500;
    font-size: 1.25rem;
  }

  p {
    margin-top: 1rem;
  }

  a {
    text-decoration: underline;
    text-decoration-thickness: 0.1em;
    text-underline-offset: 0.3em;
  }

  div {
    display: grid;
    align-content: center;
    margin-inline: var(--margin_content_text);
    height: 100vh;
  }
</style>
