<script setup>
    import { ref } from 'vue';
    import { useUserStore } from '@/stores/userStore';
    import { RouterView, useRouter } from 'vue-router';

    const router = useRouter();
    const currentRoute = ref(router.currentRoute.value.name);
    // ^ breadcrumbs component?

    const userStore = useUserStore();
</script>

<template>
    <main container="main"
          class="main">

        <div container="social-media-feed"
             class="view-container"
             v-if="userStore.getIsAuthenticated">
            <RouterView name="leftSideBar"
                        class="router-view bar left_bar"></RouterView>
            <RouterView name="centerFocusBar"
                        class="router-view bar center_bar"></RouterView>
            <RouterView name="rightSideBar"
                        class="router-view bar right_bar"></RouterView>
        </div>
        <div class="temp-unauth-container"
             v-else>
            <h1 class="heading">401 Unauthorized</h1>
            <p class="subheading">You are not permitted to view this resource.</p>
        </div>

    </main>
</template>

<style lang="scss"
       scoped>

    @use "@/scss/abstracts/" as *;

    .view-container {
        --gap: 0;
        --padding: var(--padding-36);

        padding-top: calc(var(--padding) * 2.5);
        padding-bottom: var(--padding);
    }

    :deep(.bar) {
        --padding-inline: #{$padding};

        display: block;
        height: 100%;

        position: relative;
    }

    :deep(.bar_title) {
        font-family: $ff-heading;
        font-size: $fs-heading;
        font-weight: $fw-bold;
    }

    :deep(.bar_description) {
        max-width: 65ch;
        text-wrap: balance;
    }

    :deep(.left_bar) {
        padding-right: var(--padding-inline);
    }

    :deep(.center_bar) {
        --border-color: var(--neutral-100);
        padding-block: var(--padding-inline);
        border-block: $border-width $border-style var(--border-color);
    }

    :deep(.right_bar) {
        padding-left: var(--padding-inline);
    }

    @media screen and (min-width: 45em) {
        :deep(.center_bar) {
            padding-block: 0;
            padding-inline: var(--padding-inline);

            border-block: 0;
            border-inline: $border-width $border-style var(--border-color);
        }
    }

    .temp-unauth-container {
        --gap: #{$gap};
        --padding: #{$padding-xl};

        width: 100%;
        min-height: calc(100vh - var(--padding) * 2);
        display: grid;
        gap: var(--gap);
        place-content: center;

        & > * {
            text-align: center;
        }

        & > h1 {
            color: var(--semantic-error-400);
        }
    }

</style>