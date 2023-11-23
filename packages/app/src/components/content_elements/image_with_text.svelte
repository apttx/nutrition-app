<script>
  /** @type {string} */
  export let image_src
  /** @type {string} */
  export let image_alt
  /** @type {string} */
  export let image_caption
  /** @type {string} */
  export let text
  /** @type {'left' | 'right'} */
  export let image_position = 'left'
</script>

<div
  role="presentation"
  class="image_with_text image_left"
  class:image_left={image_position === 'left'}
  class:image_right={image_position === 'right'}
>
  <figure class="image">
    <picture>
      <img
        src={image_src}
        alt={image_alt}
        class="image_element"
        width="1280"
        height="720"
      />
    </picture>

    <figcaption class="image_caption colored_base text_neutral">
      {image_caption}
    </figcaption>
  </figure>

  <p class="text">
    {text}
  </p>
</div>

<style>
  .image_with_text {
    --image-text_column-gap: 3rem;
    --image-text_row-gap: 2.5rem;
    --image-text_overlap: 9rem;
    --image-width: clamp(
      50%,
      100% - var(--width_text) - var(--image-text_column-gap) / 2 + var(--image-text_overlap),
      var(--width_layout) - var(--width_text)
    );
    --image-text-width: calc(
      var(--image-width) + var(--width_text) - var(--image-text_overlap) +
        var(--image-text_column-gap)
    );
    --text-indent: calc(var(--image-width) - var(--image-text_overlap));
    --text-outdent: calc(100% - var(--text-indent) - var(--width_text));

    margin-inline: var(--margin_content_layout);
    margin-top: 3rem;
  }

  .image {
    position: relative;
    width: 100%;
  }

  .image_element {
    box-shadow: 0 0rem 0.75rem #00000022;
    border-radius: 0.25rem;
    overflow: hidden;
  }

  .image_caption {
    margin-top: 0.75rem;
    margin: 1rem;
    font-size: 0.8125rem;
  }

  @media (min-width: 52rem) {
    .image {
      margin-bottom: var(--image-text_row-gap);
      width: var(--image-width);
    }
    .image_with_text.image_left .image {
      float: left;
      margin-right: var(--image-text_column-gap);
    }
    .image_with_text.image_right .image {
      float: right;
      margin-left: var(--image-text_column-gap);
    }

    .image_caption {
      /* need the height of the figure to be just the height of the image in this layout */
      position: absolute;
      width: calc(100% - var(--image-text_column-gap) - var(--image-text_overlap) - 2rem);
    }
    .image_with_text.image_left .image_caption {
      left: 0;
    }
    .image_with_text.image_right .image_caption {
      right: 0;
    }
  }

  .text {
    margin-top: 2rem;
    margin-inline: auto;
    max-width: var(--width_text);
    font-size: 1.25rem;
  }

  @media (min-width: 52rem) {
    .text {
      margin-top: 0;
      padding-top: calc(
        var(--image-width) / 16 * 9 + var(--image-text_row-gap) + 0.05rem - 5em * 1.5
      );
      font-size: 1.25rem;
    }
    .image_with_text.image_left .text {
      margin-inline-start: var(--text-indent);
      margin-inline-end: var(--text-outdent);
    }
    .image_with_text.image_right .text {
      margin-inline-start: var(--text-outdent);
      margin-inline-end: var(--text-indent);
    }
  }
</style>
