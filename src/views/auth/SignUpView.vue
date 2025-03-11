<script setup>
    import { ref, reactive } from 'vue';
    import { RouterLink, useRouter } from 'vue-router';
    import { useUserStore } from '@/stores/userStore';
    import { FormValidator } from '@/scripts/exporter';


    const router = useRouter();

    // ----------------- //
    // #region userStore //
    // ----------------- //

    const userStore = useUserStore();

    const formData = {
        userName: ref(''),
        firstName: ref(''),
        lastName: ref(''),
        email: ref(''),
        createPassword: ref(''),
        confirmPassword: ref(''),
    };

    const Validator = new FormValidator();

    async function signUp() {
        if (Validator.isEmpty(formData.userName.value)) {
            showError('userName', 'Username field must not be empty.');
            return;
        }

        if (Validator.isEmpty(formData.firstName.value)) {
            showError('firstName', 'First Name field must not be empty.');
            return;
        }

        if (Validator.isEmpty(formData.lastName.value)) {
            showError('lastName', 'Last Name field must not be empty.');
            return;
        }


        if (Validator.isEmpty(formData.email.value)) {
            showError('email', 'Email field must not be empty.');
            return;
        }

        if (!Validator.isEmail(formData.email.value)) {
            showError('email', 'Requires a valid email address.');
            return;
        }


        if (Validator.isEmpty(formData.createPassword.value)) {
            showError('createPassword', 'Password fields must not be empty.');
            return;
        }

        if (!Validator.isPassword(formData.createPassword.value)) {
            showError('createPassword', "Password does not meet the required criteria.");
            return;
        }


        if (Validator.isEmpty(formData.confirmPassword.value)) {
            showError('confirmPassword', 'Password fields must not be empty.');
            return;
        }

        if (!Validator.isMatch(formData.createPassword.value, formData.confirmPassword.value)) {
            showError('confirmPassword', 'Password fields must match.');
            return;
        }

        const data = {
            userName: formData.userName.value,
            firstName: formData.firstName.value,
            lastName: formData.lastName.value,
            email: formData.email.value,
            password: formData.confirmPassword.value,
        };

        let response = await userStore.createUser(data);

        if (response.status === 201) {
            router.push({
                name: 'main'
            });
        }
    }

    // ----------------- //
    // #endregion        //
    // ----------------- //

    const userDisplayName = ref('');
    const userFirstName = ref('');
    const userLastName = ref('');
    const userEmail = ref('');
    const userCreatePassword = ref('');
    const userConfirmPassword = ref('');

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

</script>

<template>
    <main class="main"
          container="main"
          flex="col align-center justify-center">

        <h1 class="heading">Sign Up</h1>
        <p class="subheading">* Indicates a required field.</p>

        <form id="SignUpForm"
              class="form"
              grid="">

            <p class="main_form_errors text-semantic-error-400"
               flex="row align-center justify-center"></p>

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

            <div grid="">
                <div class="form_field"
                     flex="col">
                    <label for="createPassword"
                           class="form_label">
                        Create Password*
                    </label>
                    <div class="form_input">
                        <input v-model="formData.createPassword.value"
                               class="input"
                               type="password"
                               id="createPassword"
                               name="createPassword"
                               placeholder="Sampl3Password!"
                               minlength="8"
                               required
                               data-visible="false">
                        <button type="button"
                                class="form_toggle"
                                data-target="#createPassword">
                            <i class="icon fi-ts-low-vision"
                               aria-hidden="true"></i>
                            <span visually-hidden="">Click to toggle password visibility.</span>
                        </button>
                    </div>
                    <p class="form_errors"></p>
                </div>

                <div class="form_field"
                     flex="col">
                    <label for="confirmPassword"
                           class="form_label">
                        Confirm Password*
                    </label>
                    <div class="form_input">
                        <input v-model="formData.confirmPassword.value"
                               class="input"
                               type="password"
                               id="confirmPassword"
                               name="confirmPassword"
                               placeholder="Sampl3Password!"
                               minlength="8"
                               required
                               data-visible="false">
                        <button type="button"
                                class="form_toggle"
                                data-target="#confirmPassword">
                            <i class="icon fi-ts-low-vision"
                               aria-hidden="true"></i>
                            <span visually-hidden="">Click to toggle password visibility.</span>
                        </button>
                    </div>
                    <p class="form_errors"></p>
                </div>
            </div>

            <button type="submit"
                    class="form_submit"
                    flex="row align-center justify-center"
                    @click.prevent="signUp">
                Sign Up
                <i class="fi-ts-rocket-lunch"
                   aria-hidden="true"></i>
            </button>

        </form>

    </main>
</template>

<style lang="scss"
       scoped>

    @use "@/scss/abstracts/" as *;

    .main {
        min-height: 100vh;

        position: relative;

        &:after {
            // content: '';
            // position: absolute;
            // top: 0;
            // height: 0;

            // width: 100vw;
            // height: 100vh;

            // background: $bg-inverse;

            // z-index: -1;
        }
    }

    .form {
        max-width: 75ch;
    }

    .form > div[grid] {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .big_form_errors {
        width: max-content;
        margin-inline: auto;

        color: var(--semantic-error-400);
        text-align: center;
    }

    // REMOVE THIS SHIT CODE COPYING BELOW WHEN WE LEARN USEFUL SHIT LIKE PROPS

    // ----------- //
    // #region nav //
    // ----------- //

    .nav {
        --_gap: 0;

        width: 100%;

        &_list {
            --_gap: 0;
            flex-direction: row;

            width: inherit;
            height: 100%;

            justify-content: space-between;
        }

        &_sublist {
            --_gap: 0;
            flex-direction: row;

            height: 100%;

            position: relative;
        }

        &_link {
            --_gap: #{$gap-sm};
            --_bg: #{$bg};
            --_text: #{$text};
            --_padding: #{$padding};

            gap: var(--_gap);

            display: flex;
            flex-direction: row;

            height: 100%;

            align-items: center;
            justify-content: center;

            background: transparent;
            color: var(--_text);

            padding-block: var(--_padding);
            padding-inline: var(--_padding);

            border: $border-width $border-style transparent;

            text-decoration: none;

            & > i {
                // icon styles
            }

            &:is(:hover, :focus) {}
        }

        &_link[type="button"] {
            height: 100%;
        }
    }

    // ----------- //
    // #endregion  //
    // ----------- //

    // ----------------- //
    // #region dropdowns //
    // ----------------- //

    .dropdown {
        position: absolute;
        left: 0;
        top: 100%;

        // background: hsla(0, 0%, 100%, 0.35);
        background: $bg-inverse;
        color: $text-inverse;
        box-shadow: 0 6px 24px 0 rgba(31, 38, 135, 0.25);
        border: 1px solid rgba(255, 255, 255, 0.15);

        width: max-content;
        height: max-content;

        box-shadow: 2px 2px 4px 0px black; // temp

        &_list {}

        &_item {}

        &_link {
            --_gap: #{$gap-sm};
            --_bg: #{$bg};
            --_color: #{$text};
            --_padding: #{$padding};

            gap: var(--_gap);

            display: flex;
            flex-direction: row;

            align-items: center;
            // justify-content: center;

            background: transparent;
            color: var(--_text);

            font-weight: $fw-default;

            padding-block: var(--_padding);
            padding-inline: var(--_padding);

            border: $border-width $border-style transparent;

            text-decoration: none;

            & > i[isOpened="true"] {
                display: initial;
            }

            & > i[isOpened="false"] {
                display: none;
            }
        }

        &_link[type="button"] {
            height: 100%;
        }
    }

    // shit implementation and defeats the purpose of vue, but fuck it I don't have time to learn a whole buncha shit just to open a damn menu
    .dropdown[isOpened="true"] {
        display: block;
    }

    .dropdown[isOpened="false"] {
        display: none;
    }

    // ----------------- //
    // #endregion        //
    // ----------------- //

</style>