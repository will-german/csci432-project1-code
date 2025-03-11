<script setup>
    import { ref, useTemplateRef } from 'vue';
    import { useRouter } from 'vue-router';
    import { useUserStore } from '@/stores/userStore';
    import { FormValidator } from '@/scripts/exporter';
    import { Modal } from '@/components/exporter';


    const router = useRouter();

    // ----------------- //
    // #region userStore //
    // ----------------- //

    const userStore = useUserStore();

    const formData = {
        userName: ref(userStore.getUser.userName),
        firstName: ref(userStore.getUser.firstName),
        lastName: ref(userStore.getUser.lastName),
        email: ref(userStore.getUser.email),
        password: ref(''),
    };

    const Validator = new FormValidator();

    async function updateAccount() {

        if (Validator.isEmpty(formData.userName.value)) {
            showError('username', 'Username field must not be empty.');
            return;
        }

        if (Validator.isEmpty(formData.firstName.value)) {
            showError('firstName', 'First Name field must not be empty.');
            return;
        }

        if (Validator.isEmpty(formData.lastName.value)) {
            if (Validator.isEmpty(userLastName.value)) {
                showError('lastName', 'Last Name field must not be empty.');
                return;
            }
        }

        if (Validator.isEmpty(formData.email.value)) {
            showError('email', 'Email field must not be empty.');
            return;
        }

        if (!Validator.isEmail(formData.email.value)) {
            showError('email', 'Email must be a valid email address.');
            return;
        }

        if (Validator.isEmpty(formData.password.value)) {
            showError('password', 'Password field must not be empty.');
            return;
        }

        if (!Validator.isPassword(formData.password.value)) {
            showError('password', 'Password must be a valid password.');
            return;
        }

        const data = {
            userName: formData.userName.value,
            firstName: formData.firstName.value,
            lastName: formData.lastName.value,
            email: formData.email.value,
            password: formData.password.value,
        };

        console.log("Patch Form Data: " + data.userName, data.firstName, data.lastName, data.email, data.password);

        let response = await userStore.updateUser(data);

        if (response.status === 200) {
            // console.log(response);
        }
    }

    async function closeAccount() {
        let response = await userStore.deleteUser();

        if (response.status === 200) {
            router.push({
                name: 'home'
            });
        }
    }

    // ----------------- //
    // #endregion        //
    // ----------------- //

    // TODO: make this shit less annoying :c
    function showError(target, msg) {
        let field = document.querySelector(`[name="${target}"]`).closest('.form_field');

        let errors = field.querySelector('.form_errors');

        if (!errors) {
            errors = document.createElement('p');
            errors.classList.add('form_errors');

            field.append(errors);
        }

        errors.innerText = msg;
    }

    /**
     *  jsdoc this shizz
     */
    // -------------- //
    // #region Modals //
    // -------------- //

    const editModal = useTemplateRef('edit-modal');
    const deleteModal = useTemplateRef('delete-modal');

    // this shit is for that trashcan ass button
    let hoverTimeout = ref(null);

    function watchMouseIn(e) {
        const button = e.currentTarget;

        if (button.classList.contains('active')) {
            return;
        }

        hoverTimeout.value = setTimeout(function () {
            enableButton(button);
        }, 1500);
    }

    function watchMouseOut(e) {
        const button = e.currentTarget;

        if (button.classList.contains('active')) {
            button.classList.remove('active');
            button.setAttribute('disabled', '');
            return;
        }

        clearTimeout(hoverTimeout.value);
        hoverTimeout.value = null;
    }

    function enableButton(target) {
        const button = target;

        button.classList.add('active');
        button.removeAttribute('disabled');
    }

    // -------------- //
    // #endregion     //
    // -------------- //

</script>

<template>
    <div class="wrapper"
         grid="">
        <div class="profile"
             flow="vertical">
            <h1 class="bar_title">Welcome, <span
                      class="capitalize text-primary-400">{{ userStore.getUser.firstName }}</span>
            </h1>
            <p class="bar_description">Manage your preferences, settings, and more through this portal.
            </p>
            <div class="profile_data"
                 grid="">
                <div class="data_card"
                     flex="col">
                    <i class="fi fi-ts-head-side"
                       aria-hidden="true"></i>
                    <p class="data_card_title">{{ userStore.getUser.userName }}</p>
                </div>
                <div class="data_card"
                     flex="col">
                    <i class="fi fi-ts-id-badge"
                       aria-hidden="true"></i>
                    <div flex="row">
                        <p class="data_card_title">{{ userStore.getUser.firstName }}</p>
                        <p class="data_card_title">{{ userStore.getUser.lastName }}</p>
                    </div>
                </div>
                <div class="data_card"
                     flex="col">
                    <i class="fi fi-ts-envelopes"
                       aria-hidden="true"></i>
                    <p class="data_card_title">{{ userStore.getUser.email }}</p>
                </div>
            </div>
        </div>
        <div class="profile_actions"
             flow="vertical">
            <button type="button"
                    class="profile_button"
                    flex="row align-center justify-center"
                    @click.prevent.stop="editModal.openModal()">
                <i class="fi fi-ts-pen-clip"></i>
                Edit
            </button>
            <button id="delete"
                    type="button"
                    class="profile_button"
                    flex="row align-center justify-center"
                    @click.prevent.stop="deleteModal.openModal()">
                <i class="fi fi-ts-trash-xmark"></i>
                Delete
            </button>
        </div>
        <Modal ref="edit-modal">
            <template #header>
                <h2 class="modal_title">Edit Profile</h2>
                <p class="modal_description">* Indicates a required field.</p>
            </template>
            <template #main>
                <form id="UpdateForm"
                      class="modal_form form"
                      grid="">

                    <div class="form_field"
                         flex="col">
                        <label for="username"
                               class="form_label">
                            Username*
                        </label>
                        <div class="form_input">
                            <input v-model="formData.userName.value"
                                   class="input"
                                   type="text"
                                   name="userName"
                                   placeholder="JoeUser"
                                   minlength="1"
                                   required>
                        </div>
                        <p class="form_errors"></p>
                    </div>
                    <div grid="">
                        <div class="form_field"
                             flex="col">
                            <label for="firstName"
                                   class="form_label">
                                First Name*
                            </label>
                            <div class="form_input">
                                <input v-model="formData.firstName.value"
                                       class="input"
                                       type="text"
                                       name="firstName"
                                       placeholder="Joe"
                                       minlength="1"
                                       required>
                            </div>
                            <p class="form_errors"></p>
                        </div>

                        <div class="form_field"
                             flex="col">
                            <label for="lastName"
                                   class="form_label">
                                Last Name*
                            </label>
                            <div class="form_input">
                                <input v-model="formData.lastName.value"
                                       class="input"
                                       type="text"
                                       name="lastName"
                                       placeholder="User"
                                       minlength="1"
                                       required>
                            </div>
                            <p class="form_errors"></p>
                        </div>
                    </div>

                    <div class="form_field"
                         flex="col">
                        <label for="email"
                               class="form_label">
                            Email*
                        </label>
                        <div class="form_input">
                            <input v-model="formData.email.value"
                                   class="input"
                                   type="email"
                                   name="email"
                                   placeholder="joeuser@email.com"
                                   minlength="1"
                                   required>
                        </div>
                        <p class="form_errors"></p>
                    </div>

                    <div class="form_field"
                         flex="col">
                        <label for="password"
                               class="form_label">
                            Password*
                        </label>
                        <div class="form_input">
                            <input v-model="formData.password.value"
                                   class="input"
                                   type="password"
                                   id="password"
                                   name="password"
                                   placeholder="Sampl3Password!"
                                   minlength="8"
                                   required
                                   data-visible="false">
                            <button type="button"
                                    class="form_toggle"
                                    data-target="#password">
                                <i class="icon fi-ts-low-vision"
                                   aria-hidden="true"></i>
                                <span visually-hidden="">Click to toggle password visibility.</span>
                            </button>
                        </div>
                        <p class="form_errors"></p>
                    </div>

                    <button type="submit"
                            class="form_submit"
                            flex="row align-center justify-center"
                            @click.prevent.stop="updateAccount()">
                        Save Changes
                        <i class="fi-ts-script"
                           aria-hidden="true"></i>
                    </button>
                </form>
            </template>
            <template #footer>
                <button type="button"
                        class="modal_button"
                        @click.prevent.stop="editModal.closeModal()">
                    Cancel
                </button>
            </template>
        </Modal>
        <Modal ref="delete-modal">
            <template #header>
                <h2 class="modal_title">Delete Profile</h2>
                <p class="modal_description">This action cannot be undone!</p>
            </template>
            <template #main>
                <i class="fi fi-ts-triangle-warning modal_icon"
                   aria-hidden="true"></i>
            </template>
            <template #footer>
                <button id="delete_button"
                        type="submit"
                        class="modal_button"
                        @click.prevent.stop="closeAccount()"
                        @mouseover.self="watchMouseIn($event)"
                        @mouseout.self="watchMouseOut($event)"
                        disabled="">
                    Confirm
                </button>
                <button type="button"
                        class="modal_button"
                        @click.prevent.stop="deleteModal.closeModal()">
                    Cancel
                </button>
            </template>
        </Modal>
    </div>
</template>

<style lang="scss"
       scoped>

    @use "@/scss/abstracts/" as *;

    .profile {
        --gap: #{$gap};

        &_data {}

        &_actions {
            --gap: #{$gap-sm};
            --padding: #{$padding};

            // padding-block: calc(var(--padding) / 2);
            padding-top: calc(var(--padding) * 6.125);
            padding-inline: var(--padding);
        }

        &_button {
            --gap: #{$gap};

            width: 100%;
            background: var(--supporting-400);
            color: $text;

            font-family: $ff-heading;
            font-weight: $fw-bold;

            border: $border-width $border-style transparent;
            border-radius: $border-radius-sm;

            transition: all $animation-duration ease-in-out;

            &:is(:hover, :focus) {
                background: var(--supporting-500);
                color: $text-inverse;
            }
        }

        &_button#delete {
            background: var(--semantic-error-400);

            &:is(:hover, :focus) {
                background: var(--semantic-error-500);
            }
        }
    }

    .data_card {
        --gap: #{$gap-xl};

        --bg: transparent; // fun gradient one day
        --padding: #{$padding-xl};

        background: var(--bg);

        padding-block: var(--padding);
        padding-inline: var(--padding);

        border: $border-width $border-style var(--primary-400);
        border-left: $border-width-extra-wide $border-style var(--primary-400);
        border-radius: $border-radius-sm;

        position: relative;

        &::before,
        &::after {
            --width: calc(#{$size-xs} / 2);
            --padding: #{$padding};

            content: '';
            display: block;

            position: absolute;
            top: var(--padding);
            right: var(--padding);

            background: var(--supporting-100);
        }

        &::before {
            width: 35%;
            height: var(--width);
        }

        &::after {
            width: var(--width);
            height: 50%;
        }

        ;

        & > i {
            color: var(--primary-400);
            font-size: $fs-title;
        }

        &_title {
            color: $text;

            font-family: $ff-heading;
            font-size: $fs-subheading;
            font-weight: $fw-bold;

            &::before {
                --width: calc(#{$size-xl} * 1.25);
                --padding: #{$padding-xs};

                content: '';
                display: block;

                position: absolute;
                top: calc(var(--padding) * 1.5);
                left: var(--padding);

                width: var(--width);
                height: var(--width);

                background: var(--supporting-100);
                filter: blur(8px);
                opacity: 0.45;

                border-radius: 100%;

                z-index: -1;
            }

            &::first-letter,
            & > span::first-letter {
                text-transform: capitalize;
            }
        }

        & > div[flex="row"] {
            --gap: #{$gap-sm};
        }
    }

    @media screen and (min-width: 45em) {
        .wrapper {
            display: grid;
            grid-template-columns: minmax(0, 1fr) minmax(0, 0.5fr);

            grid-column: span 2;
        }
    }

</style>