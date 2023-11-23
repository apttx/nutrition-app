export const load = () => {
  const title = 'Detaillierte Nährwertangaben'
  const description =
    "Durchsuche und vergleiche die >1'000 Nahrungsmitteln Lebensmittel aus der Schweizer Nährwertdatenbank."

  /** @type {Page_Metadata} */
  const page_metadata = {
    title,
    description,
  }

  return {
    page_metadata,
  }
}
