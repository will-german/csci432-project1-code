<script setup>
    import { watchEffect } from 'vue';

    /**
     *     Object {
     *         messageId: "67b3ccbf8c010766d55dd1e7"
     *         senderId: "67abfd684e6e8781769dfef4"
     *         senderName: "K W"
     *         text: "message2"
     *         updatedAt: "2025-02-17T23:56:47.378Z"
     *     }
     */

    const { message } = defineProps(['message']);

    watchEffect(() => message,
        // herdurr what this do again?
        // console.log(message),
    );

</script>

<template>
    <div class="media-card"
         grid="">
        <p>{{ message.updatedAt }}</p>
        <p>{{ message.text }}</p>
        <p>{{ message.senderName }}</p>
    </div>
</template>

<style lang="scss"
       style="scoped">

    @use "@/scss/abstracts" as *;

    .media-card {
        --padding: #{$padding};

        background: $bg;
        color: $text;

        padding-block: calc(var(--padding) / 2);
        padding-inline: var(--padding);

        border: $border-width $border-style var(--neutral-100);
        border-radius: $border-radius-sm;
    }

</style>