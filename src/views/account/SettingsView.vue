<script setup>
</script>

<template>
    <div class="settings"
         flow="vertical">
        <h1 class="bar_title">Settings</h1>
        <p class="bar_description">User account settings—such as theme—will eventually be managed through this portal.
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

    .settings {
        --gap: #{$gap};

        grid-column: span 2;
    }

</style>