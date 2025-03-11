<script setup>
</script>

<template>
    <div class="subscriptions"
         flow="vertical">
        <h1 class="bar_title">Subscriptions</h1>
        <p class="bar_description">Manage your orders and subscriptions here.
        </p>
        <div>
            <!--
                Settings that can be changed
            -->
        </div>
    </div>
</template>

<style lang="scss"
       scoped>

    @use "@/scss/abstracts/" as *;

    .subscriptions {
        --gap: #{$gap};

        grid-column: span 2;
    }

</style>