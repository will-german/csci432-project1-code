<script setup>

    // resize observer to match media query and see if the screen passes the desired threshold, afterwards update v-show="ref" to enable/disable the mobile layout for the navigational list items.
</script>

<template>
    <div class="sidebar">
        <nav class="side_menu">
            <label for="current-page"
                   v-if="false">
                Browsing:
            </label>
            <button v-if="false"
                    id="current-page"
                    type="button"
                    class="sidebar_control"
                    flex="row">
                <i class="fi fi-ts-angle-double-small-right"
                   aria-hidden="true"></i>
                <span>
                    Buttton
                </span>
            </button>
            <!--
                TODO: Turn the "Transition" element's contents into a dropdown menu that functions
                similarly to a select menu, although allows for icons and navigation to new views.
            -->
            <Transition v-if="false">
                <ul role="list"
                    class="sidebar_list sidebar_dropdown">
                    <li>
                        <RouterLink to="/main"
                                    flex="row align-center justify-start"
                                    class="sidebar_link">
                            <i class="fi fi-ts-house-chimney"
                               aria-hidden="true"></i>
                            Home
                        </RouterLink>
                    </li>
                    <li>
                        <RouterLink to="/profile"
                                    flex="row align-center justify-start"
                                    class="sidebar_link">
                            <i class="fi fi-ts-clipboard-user"
                               aria-hidden="true"></i>
                            Profile
                        </RouterLink>
                    </li>
                    <li>
                        <RouterLink to="/settings"
                                    flex="row align-center justify-start"
                                    class="sidebar_link">
                            <i class="fi fi-ts-api"
                               aria-hidden="true"></i>
                            Settings
                        </RouterLink>
                    </li>
                </ul>
            </Transition>
            <ul role="list"
                class="sidebar_list"
                v-else>
                <li>
                    <RouterLink to="/main"
                                flex="row align-center justify-start"
                                class="sidebar_link">
                        <i class="fi fi-ts-house-chimney"
                           aria-hidden="true"></i>
                        Home
                    </RouterLink>
                </li>
                <li>
                    <div>
                        <button type="button"
                                class="sidebar_link sidebar_button"
                                flex="row align-center justify-start">
                            <i class="fi fi-ts-clipboard-user"
                               aria-hidden="true"></i>
                            Account
                            <i class="fi fi-ts-angle-small-down"
                               aria-hidden="true"></i>
                        </button>
                        <ul class="sidebar_sublist"
                            role="list">
                            <li>
                                <RouterLink to="/profile"
                                            class="sidebar_link"
                                            flex="row align-center justify-start">
                                    <i class="fi fi-ts-grip-vertical"
                                       aria-hidden="true"></i>
                                    Profile
                                </RouterLink>
                            </li>
                            <li>
                                <RouterLink to="/settings"
                                            flex="row align-center justify-start"
                                            class="sidebar_link">
                                    <i class="fi fi-ts-api"
                                       aria-hidden="true"></i>
                                    Settings
                                </RouterLink>
                            </li>
                            <li>
                                <RouterLink to="/profile/subscriptions"
                                            class="sidebar_link"
                                            flex="row align-center justify-start">
                                    <i class="fi fi-ts-research-arrows-circle"
                                       aria-hidden="true"></i>
                                    Subscriptions
                                </RouterLink>
                            </li>
                        </ul>
                    </div>
                </li>
            </ul>
        </nav>
    </div>
</template>

<style lang="scss"
       scoped>

    @use "@/scss/abstracts/" as *;

    .sidebar {

        &_menu {}

        &_control {
            --gap: #{$gap};
            --padding-block: #{$padding-sm};
            --padding-inline: #{$padding-sm};

            width: 100%;

            padding-block: var(--padding-block);
            padding-inline: var(--padding-inline);

            font-family: $ff-heading;
            font-weight: $fw-bold;

            border: $border-width $border-style transparent;
        }

        &_list {}

        &_link {
            --gap: #{$gap};
            --padding-block: #{$padding-sm};
            --padding-inline: #{$padding-sm};

            color: #{$link-text};

            width: 100%;

            padding-block: var(--padding-block);
            padding-left: var(--padding-inline);
            padding-right: var(--padding-inline);

            font-family: $ff-heading;
            // font-weight: $fw-bold;

            border: $border-width $border-style transparent;
            border-radius: $border-radius-sm;

            text-decoration: none;

            transition: all $animation-duration ease-in-out;

            cursor: pointer;

            &:is(:hover, :focus) {
                background: $link-bg-active;
            }

            &[class*="exact-active"] {
                background: $link-bg-active;
                color: $link-text-active;
            }

            &[class*="exact-active"] > i {
                color: $link-text-active;
            }


            & > i {
                color: $link-text;
            }
        }

        &_button {
            --fill: #{$text};
            --padding-inline: #{$padding-sm};

            width: 100%;

            padding-left: 0;
            padding-right: 0;

            padding-inline: var(--padding-inline);

            & > i:last-child {
                margin-left: auto;
            }
        }
    }

    @media screen and (min-width: 45em) {

        .sidebar {

            &_control {
                --padding-inline: #{$padding};
            }

            &_link {
                --padding-inline: #{$padding};
                padding-left: var(--padding-inline);
                padding-right: calc(var(--padding-inline) * 8);
            }

            &_button {
                width: 100%;

                padding-left: 0;
                padding-right: 0;
                padding-inline: var(--padding-inline);

                & > i:last-child {
                    margin-left: auto;
                    color: var(--fill);
                }
            }
        }

        .sidebar_sublist {
            & .sidebar_link {
                --padding-inline: #{$padding};
                padding-left: calc(var(--padding-inline) * 2.85); // floating point sadness :c
            }
        }
    }

</style>