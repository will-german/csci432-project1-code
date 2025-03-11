<script setup>
    import { ref } from 'vue';
    import { RouterLink, useRouter } from 'vue-router';
    import { Logo } from '@/components/exporter';
    import { useUserStore } from '@/stores/userStore';

    /**
     *  TODO:
     *  1. Update Header Component to be mobile responsive (CSS)
     *  2. Write some actual JSDoc shit instead of freeballin'
     *  3. Do that one header.scrollTop thing
     *  4. Calm down on the dropdowns jsdoc
     */

    const router = useRouter();

    // ----------------- //
    // #region userStore //
    // ----------------- //

    const userStore = useUserStore();

    async function signOut() {
        let response = await userStore.signUserOut();

        if (response.status === 200) {
            router.push({
                name: 'home'
            });
        }
    }

    // ----------------- //
    // #endregion        //
    // ----------------- //

    // ----------------- //
    // #region Dropdowns //
    // ----------------- //

    const isDropdown = {
        isContentDropdown: ref(false),
        isUserDropdown: ref(false),
    };

    /**
     *  General Dropdown @click event handler.
     */
    window.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();

        /**
         *  If the target is NOT a dropdown toggle, and
         *  the target has a dropdown menu as a parent,
         *  then return and do nothing.
         */
        if (!e.target.classList.contains('dropdown_toggle') && e.target.closest('.dropdown') !== null) {
            return;
        }

        /**
         *  If the target is a dropdown toggle, then return,
         *  as our VueJS @click handler will manage the event.
         */
        if (e.target.classList.contains('dropdown_toggle')) {
            return;
        }

        /**
         *  If neither prior conditional is true, then
         *  the click must have originated outside
         *  of the dropdown menu and must not be the
         *  dropdown toggle, therefore close all dropdowns.
         */
        for (const [key, value] of Object.entries(isDropdown)) {
            value.value = false;
        }
    });

    /**
     * 
     * @param dropdown 
     */
    function toggleDropdown(dropdown) {
        for (const [key, value] of Object.entries(isDropdown)) {
            if (key === dropdown) {
                value.value = !value.value;
            } else {
                value.value = false;
            }
        }
    }

    // ----------------- //
    // #endregion        //
    // ----------------- //
</script>

<template>
    <header class="header"
            data-scroll="1">

        <div container="header"
             flex="row">
            <nav id="shortcuts"
                 class="shortcuts">
                <ul class="shortcuts_list"
                    role="list">
                    <li>
                        <RouterLink to="#main-content"
                                    class="shortcuts_link">
                            Skip to main content.
                        </RouterLink>
                    </li>
                </ul>
            </nav>

            <Logo></Logo>

            <nav id="primary-nav"
                 class="nav">
                <ul class="nav_list"
                    flex=""
                    role="list">
                    <li>
                        <ul class="nav_sublist"
                            flex=""
                            role="list">
                            <li v-if="false">
                                <button type="button"
                                        class="nav_link dropdown_toggle"
                                        @click.prevent.stop="toggleDropdown('isContentDropdown')">
                                    Dropdown
                                    <i class="fi fi-ts-angle-small-down"
                                       aria-hidden="true"></i>
                                </button>
                                <Transition name="dropdown-animation">
                                    <div class="dropdown dropdown-left"
                                         v-show="isDropdown.isContentDropdown.value">
                                        <ul class="dropdown_list"
                                            grid=""
                                            role="list">
                                            <li>
                                                <RouterLink to=""
                                                            class="dropdown_link">
                                                    Dropdown Item
                                                </RouterLink>
                                            </li>
                                        </ul>
                                    </div>
                                </Transition>
                            </li>
                            <li v-if="userStore.getIsAuthenticated">
                                <RouterLink to="/main"
                                            class="nav_link">
                                    Main
                                </RouterLink>
                            </li>
                        </ul>
                    </li>
                    <li v-if="userStore.getIsAuthenticated">
                        <ul class="nav_sublist"
                            flex=""
                            role="list">
                            <li>
                                <button type="button"
                                        class="nav_link dropdown_toggle capitalize"
                                        @click="toggleDropdown('isUserDropdown')">
                                    <i class="fi-ts-circle-user"
                                       aria-hidden="true"></i>
                                    {{ userStore.getUser.userName }}
                                </button>
                                <Transition name="dropdown-animation">
                                    <div class="dropdown dropdown-right"
                                         v-show="isDropdown.isUserDropdown.value">
                                        <ul class="dropdown_list"
                                            grid=""
                                            role="list">
                                            <li>
                                                <RouterLink to="/profile"
                                                            class="dropdown_link">
                                                    <i class="fi-ts-clipboard-user"
                                                       aria-hidden="true"></i>
                                                    Profile
                                                </RouterLink>
                                            </li>
                                            <li>
                                                <RouterLink to=""
                                                            @click.prevent="signOut"
                                                            class="dropdown_link">
                                                    <i class="fi-ts-leave"
                                                       aria-hidden="true"></i>
                                                    Sign Out
                                                </RouterLink>
                                            </li>
                                        </ul>
                                    </div>
                                </Transition>
                            </li>
                        </ul>
                    </li>
                    <li v-else>
                        <ul class="nav_sublist"
                            flex=""
                            role="list">
                            <li>
                                <RouterLink to="/sign-in"
                                            class="nav_link">
                                    Sign In
                                </RouterLink>
                            </li>
                            <li>
                                <RouterLink to="/sign-up"
                                            class="nav_link">
                                    Sign Up
                                </RouterLink>
                            </li>
                        </ul>
                    </li>
                </ul>
            </nav>
        </div>

    </header>
</template>

<style lang="scss"
       scoped>

    @use "@/scss/abstracts/" as *;

    // TODO: Update the header background to be transparent by default. When scrollPosition is not equal to the top of the page trigger an animation that will fade-in a glassmorphic background from a transparent background. When scrollPosition IS at the top of the page trigger an animation that will fade-out a glassmorphic background into a transparent background.

    // TODO: Write hover, focus, and focus-within styles for buttons, links, etc. where appliccable.

    // TODO: Update <Header> component width styling to give the content a max width while allowing the actual element itself to maintain 100% width on the given viewports.

    // TODO: Write the associated media-query(ies) to allow for a responsive navigation menu.

    // TODO: Write styling and functionality for the associated shortcut (keyboard/screenreader-only) buttons.

    .header {
        width: 100%;

        position: fixed;
        top: 0;

        font-family: $ff-heading;
        font-size: $fs-paragraph;
        font-weight: $fw-semibold;

        z-index: 1000;

        backdrop-filter: blur(4px);
        -webkit-backdrop-filter: blur(4px);

        // replace with scrollEvent + styling
        &[data-scroll="0"] {
            background: hsla(0, 0%, 100%, 0);
            box-shadow: 0 6px 24px 0 rgba(31, 38, 135, 0);
            // border: 1px solid rgba(255, 255, 255, 0);
        }

        &:not([data-scroll="0"]) {
            background: hsla(0, 0%, 100%, 0.35);
            box-shadow: 0 6px 24px 0 rgba(31, 38, 135, 0.25);
            // border: 1px solid rgba(255, 255, 255, 0.15);
        }
    }


    // ----------------- //
    // #region shortcuts //
    // ----------------- //

    .shortcuts {
        display: none; // temp

        position: relative;

        &_list {}

        &_link {}
    }

    // ----------------- //
    // #endregion        //
    // ----------------- //

    // ----------- //
    // #region nav //
    // ----------- //

    .nav {
        --gap: 0;

        width: 100%;

        &_list {
            --gap: 0;
            flex-direction: row;

            width: inherit;
            height: 100%;

            justify-content: space-between;
        }

        &_sublist {
            --gap: 0;
            flex-direction: row;

            height: 100%;

            position: relative;
        }

        &_link {
            --gap: #{$gap-sm};
            --bg: #{$bg};
            --text: #{$text};
            --padding: #{$padding};

            gap: var(--gap);

            display: flex;
            flex-direction: row;

            height: 100%;

            align-items: center;
            justify-content: center;

            background: transparent;
            color: var(--text);

            padding-block: var(--padding);
            padding-inline: var(--padding);

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
        --bg: #{$bg-inverse};
        --text: #{$text-inverse};

        position: absolute;
        top: 100%;

        // background: hsla(0, 0%, 100%, 0.35);
        background: var(--bg);
        color: var(--text);

        box-shadow: 0 6px 24px 0 rgba(31, 38, 135, 0.25);
        border: $border-width $border-style rgba(255, 255, 255, 0.15);

        width: max-content;
        height: max-content;

        box-shadow: 2px 2px 4px 0px black; // temp

        &_list {}

        &_item {}

        &_link {
            --gap: #{$gap-sm};
            --bg: #{$bg};
            --text: #{$text-inverse};
            --padding: #{$padding-lg};
            --padding-block: calc(var(--padding) / 2);
            --padding-inline: var(--padding);

            gap: var(--gap);

            display: flex;
            flex-direction: row;

            align-items: center;

            background: transparent;
            color: var(--text);

            font-weight: $fw-default;

            padding-block: var(--padding-block);
            padding-inline: var(--padding-inline);

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

    .dropdown-left {
        left: 0;
    }

    .dropdown-right {
        right: 0;
    }

    .dropdown-animation-enter-active {
        transition: all 200ms ease-in-out;
    }

    .dropdown-animation-leave-active {
        transition: all 200ms ease-in-out;
    }

    .dropdown-animation-enter-from,
    .dropdown-animation-leave-to {
        transform: translateY(#{$size-xs});
        opacity: 0;
    }

    // ----------------- //
    // #endregion        //
    // ----------------- //

</style>