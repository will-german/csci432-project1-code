<script setup>
</script>

<template>
      <RouterLink to="/"
                  class="logo nav_link"
                  flex="row">
            <svg class="logo_mark"
                 viewBox="0 0 393 209"
                 preserve-aspect-ratio="xMidYMid meet"
                 aria-hidden="true">
                  <path d="M156.5 164L11 192.5L154.5 173.5L276 208L380 194.5L277 204L156.5 164Z"
                        name="baseline"
                        stroke-linejoin="round" />
                  <path d="M191.5 76L162 64L191.5 83.5L214.5 71L246.5 79.5L214.5 64L191.5 76Z"
                        name="snowline"
                        stroke-linejoin="round" />
                  <path d="M1 186L63 82L95.5761 109L206 1L263.5 81.6906L301 54L392.5 190.5L296.5 78.5L268.352 88.5L296.5 128L206 22L97.3254 110.45L118.5 128L91 115.598L67.5 105L1 186Z"
                        name="mountains"
                        stroke-linejoin="round" />
            </svg>
            <span class="logo_text"
                  aria-hidden="true">WSG</span>
            <span visually-hidden="true">
                  Click to navigate to the Mountain Valley home page.
            </span>
      </RouterLink>
</template>

<style lang="scss"
       scoped>

      @use "../scss/abstracts/" as *;

      .logo {
            --_gap: #{$gap-xs};
            $_color: #{$bg-inverse};

            max-width: 7.5em;
            max-height: 3.75em;

            cursor: pointer;

            &_mark {

                  display: block;

                  width: 100%;
                  height: 100%;

                  max-height: inherit;

                  & > :where(path[name="baseline"],
                        path[name="snowline"],
                        path[name="mountains"]) {

                        stroke: $_color;
                        fill: $_color;

                  }
            }

            &_text {
                  font-family: $ff-heading;
                  font-weight: $fw-bold;
            }
      }

</style>