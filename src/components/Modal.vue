<script setup>
    import { useTemplateRef } from 'vue';

    const modal = useTemplateRef('modal');

    defineExpose({
        openModal, closeModal
    });

    function openModal() {
        modal.value.showModal();
    }

    function closeModal() {
        modal.value.close();
    }
</script>

<template>
    <dialog class="modal"
            ref="modal">

        <div class="modal_content"
             grid="">
            <header class="modal_header"
                    flow="vertical">
                <slot name="header"></slot>
            </header>

            <main class="modal_main">
                <slot name="main"></slot>
            </main>

            <footer class="modal_footer"
                    flow="vertical">
                <slot name="footer"></slot>
            </footer>
        </div>

    </dialog>
</template>

<style lang="scss"
       scoped>

    @use "@/scss/abstracts" as *;

    .modal {
        --padding: #{$padding-lg};

        position: absolute;
        top: 50%;
        left: 50%;

        transform: translate(-50%, -50%);

        padding-block: var(--padding);
        padding-inline: var(--padding);

        border: $border-width $border-style var(--neutral-400);
        border-radius: $border-radius-sm;

        &_content {
            --gap: #{$gap};
        }

        &_header {
            --gap: #{$gap-sm};
        }

        &_main {
            --padding: #{$padding-sm};

            min-height: initial;

            padding-block: var(--padding);

            &:empty {
                display: none;
            }
        }

        &_footer {
            --gap: #{$gap-sm};
        }

        &_modal {
            width: 100%;
        }

        &::backdrop {
            background: var(--neutral-900);
            opacity: 0.5;
        }
    }

    :slotted(.modal_title) {
        font-family: $ff-heading;
        font-size: $fs-subheading;
        font-weight: $fw-bold;

        text-align: center;
    }

    :slotted(.modal_description) {
        display: block;
        max-width: 45ch;
        text-align: center;
        margin-inline: auto;
    }

    :slotted(.modal_icon) {
        color: var(--semantic-error-400);
        font-size: calc($fs-title * 2);
        margin-inline: auto;
    }

    :slotted(.modal_button) {
        width: 100%;

        font-family: $ff-heading;
        font-weight: $fw-bold;

        border: none;
    }

    :slotted(.modal_form) {
        min-width: 24em;
    }

    :slotted(.form_field) {
        width: 100%;

        & > textarea {
            width: 100%;
        }
    }

    // #region shit-head-ass-button

    :slotted(button#delete_button) {
        --animation-duration: 1.5s;

        opacity: 1;
        position: relative;
        cursor: not-allowed;
    }

    :slotted(button#delete_button::after) {
        content: '';

        position: absolute;
        top: 0;
        left: 0;

        width: 100%;
        height: 100%;

        background: var(--semantic-error-400);

        transform-origin: left;
        transform: scaleX(0);

        animation-fill-mode: forwards;

        cursor: not-allowed;

        z-index: -1;
    }

    :slotted(button#delete_button:is(:hover, :focus)) {
        animation: activate_button var(--animation-duration) linear forwards;
    }

    :slotted(button#delete_button:is(:hover, :focus)::after) {
        animation: fill_button var(--animation-duration) linear forwards;
    }

    @keyframes activate_button {
        0% {
            opacity: 0.75;
            cursor: not-allowed;
        }

        99% {
            cursor: not-allowed;
        }

        100% {
            opacity: 1;
            cursor: pointer;
        }
    }

    @keyframes fill_button {
        0% {
            transform: scaleX(0);
            cursor: not-allowed;
        }

        99% {
            cursor: not-allowed;
        }

        100% {
            transform: scaleX(1);
            cursor: pointer;
        }
    }

    :slotted(button#delete_button.active,
        button#delete_button.active:is(:hover, :focus)) {
        background: var(--semantic-error-400);
        cursor: pointer;

        animation: none;
    }

    // #endregion

</style>