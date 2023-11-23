<div
  role="presentation"
  aria-hidden="true"
  class="spacer"
/>

<style>
  .spacer {
    --space: 5rem;
    --width: var(--width_page);

    margin-inline: clamp(var(--margin_screen-borders) * 2, 100%, 50% - var(--width) / 2);
    margin-bottom: var(--space);
    border-bottom-width: 0.1rem;
    border-color: var(--color-gray-3);
    padding-top: var(--space);
  }

  @media (prefers-color-scheme: dark) {
    .spacer {
      border-color: var(--color-gray-9);
    }
  }
</style>
