<script setup>
</script>

<template>
    <div>
        <form class="search-form"
              flex="col">
            <label for="search-bar">
                Search
            </label>
            <div class="search-bar"
                 flex="row">
                <i class="fi fi-ts-issue-loupe"></i>
                <input id="search-bar"
                       type="text"
                       name="search"
                       placeholder="Enter keywords">
            </div>
            <button type="submit"
                    class="">
                Discover
            </button>
        </form>
    </div>
</template>

<style lang="scss"
       scoped>

    @use "@/scss/abstracts/" as *;

    .search-form {
        --gap: #{$gap};

        padding-block: $padding-sm;

        & > label {
            display: block;
            font-family: $ff-heading;
            font-weight: $fw-bold;
        }

        & > button {
            background: var(--primary-400);
            color: $text;

            padding-block: calc($padding-sm * 1.5);
            padding-inline: $padding;

            font-family: $ff-heading;
            font-weight: $fw-bold;

            border-radius: $border-radius-sm;

            transition: all $animation-duration;

            &:is(:hover, :focus) {
                background: var(--primary-500);
                color: $text-inverse;
            }
        }
    }

    .search-bar {
        --gap: #{$gap-sm};

        background: var(--neutral-100);
        color: $text;

        padding-block: $padding-xs;
        padding-inline: $padding;

        border-radius: $border-radius-sm;

        & > i {}

        & > input {
            background: transparent;

            padding-inline: $padding-sm;
        }
    }

</style>