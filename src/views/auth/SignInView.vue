<script setup>
    import { ref } from 'vue';
    import { useRouter } from 'vue-router';
    import { useUserStore } from '@/stores/userStore';
    import { FormValidator } from '@/scripts/exporter';

    const router = useRouter();

    // ----------------- //
    // #region userStore //
    // ----------------- //

    const userStore = useUserStore();

    const formData = {
        email: ref(''),
        password: ref(''),
    };

    const Validator = new FormValidator();

    async function signIn() {
        if (Validator.isEmpty(formData.email.value)) {
            showError('email', "Email field must not be empty.");
            return;
        }

        if (!Validator.isEmail(formData.email.value)) {
            showError('email', 'Requires a valid email address.');
            return;
        }


        if (Validator.isEmpty(formData.password.value)) {
            showError('password', "Password field must not be empty.");
            return;
        }

        if (!Validator.isPassword(formData.password.value)) {
            showError('password', "Password does not meet the required criteria.");
            return;
        }

        const data = {
            email: formData.email.value,
            password: formData.password.value,
        };

        let response = await userStore.signUserIn(data);

        if (response.status === 200) {
            router.push({
                name: 'main'
            });
        }
    }

    // TODO: Make this feel less hacky and more built-in / intentional. I.e., modularize this bish somehow.

    // Make forms modular with component inputs that utilize slots? Havet his be an inherited function?
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

    // ----------------- //
    // #endregion        //
    // ----------------- //
</script>

<template>
    <main class="main"
          container="main"
          flex="col align-center justify-center">

        <h1 class="heading">Sign In</h1>
        <p class="subheading">* Indicates a required field.</p>

        <form id="SignInForm"
              class="form"
              grid="">

            <p class="main_form_errors text-semantic-error-400"
               flex="row align-center justify-center"></p>

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
                           id="email"
                           placeholder="wgerman@example.com"
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
                           name="password"
                           id="password"
                           placeholder="Sampl3Password!"
                           data-visible="false"
                           required>
                    <button type="button"
                            class="form_toggle"
                            data-target="#password">
                        <i class="fi-ts-low-vision"
                           aria-hidden="true"></i>
                        <span visually-hidden="">Click to toggle password visibility.</span>
                    </button>
                </div>
                <p class="form_errors"></p>
            </div>

            <!-- <div class="form_field"
                 flex="row-reverse align-center justify-end">
                <label for="checkbox"
                       class="form_label">
                    Remember me for 7 days
                </label>
                 <div class="form_input">

                        Clicking this form input does not actually
                        update the value is the v-model binding.

                        Not really sure why, but it's definitely
                        some bullshit. I do know that.

                    <input v-model="isPersistent"
                           true-value="true"
                           false-value="false"
                           class="input"
                           type="checkbox"
                           id="checkbox"
                           name="remember"
                           required>
                </div> 
            </div> -->

            <button type="submit"
                    class="form_submit"
                    flex="row align-center justify-center"
                    @click.prevent="signIn()">
                Sign In
                <i class="fi-ts-portal-enter"
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
        max-width: 45ch;
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