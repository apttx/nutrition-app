<span
  role="tooltip"
  class="tooltip colored_dark"
>
  <slot />
</span>

<style>
  .tooltip {
    display: none;
    position: absolute;
    bottom: 100%;
    transition: display 1s ease 2s;
    width: max-content;
  }

  :global(*):hover > .tooltip {
    display: block;
  }
</style>
