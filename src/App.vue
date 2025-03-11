<script setup>
    import { RouterView } from 'vue-router';
    import { Header, Footer } from '@/components/exporter';
</script>

<template>
    <Header></Header>
    <RouterView>
    </RouterView>
    <Footer></Footer>
</template>

<style lang="scss"
       scoped>

    @use "@/scss/abstracts" as *;

</style>