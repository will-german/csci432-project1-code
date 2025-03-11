<script setup>
    import { ParallaxHero } from '@/components/exporter';
    // fetch all spans under the word class and apply the animation prop with associated args. increase delay on each element as required

    // have the subheading fade in after the title text has finished animating
</script>

<template>
    <section class="hero"
             grid="content-center">

        <ParallaxHero>
        </ParallaxHero>

        <h1 class="hero_title">
            <div class="">
                <div class="line"
                     flex="row">
                    <span id="parallax-word-1"
                          class="word">
                        <span>a</span>
                    </span>
                    <span id="parallax-word-2"
                          class="word">
                        <span>m</span>
                        <span>o</span>
                        <span>u</span>
                        <span>n</span>
                        <span>t</span>
                        <span>a</span>
                        <span>i</span>
                        <span>n</span>
                    </span>
                </div>
                <div class="line"
                     flex="row">
                    <span id="parallax-word-3"
                          class="word">
                        <span>i</span>
                        <span>n</span>
                    </span>
                    <span id="parallax-word-4"
                          class="word">
                        <span>a</span>
                    </span>
                    <span id="parallax-word-5"
                          class="word">
                        <span>v</span>
                        <span>a</span>
                        <span>l</span>
                        <span>l</span>
                        <span>e</span>
                        <span>y</span>
                    </span>
                </div>
            </div>
        </h1>

        <p class="hero_subheading">
            One day this app will have some fun animations to interact with, but that day is unfortunately not today.
        </p>

        <!-- 
        
        Buttons require default

        <div class="actions"
             flex="align-center justify-center">
            <RouterLink to=""
                        class="actions_button">
                Get Started
            </RouterLink>
        </div>
        
        -->

    </section>
    <!-- <main id="main-content">
        <div container="main">
            <section>

                Future Content

            </section>
        </div>
    </main> -->
</template>

<style lang="scss"
       scoped>

    @use "@/scss/abstracts/" as *;

    // ============ //
    // #region Hero //
    // ============ //

    .hero {
        --_gap: #{$gap-lg};

        width: 100vw;
        height: 100vh;

        font-size: 16px;

        position: relative;

        overflow: hidden;

        &_title {
            font-family: $ff-title;
            font-size: $fs-huge;
        }

        &_subheading {
            max-width: 40ch;

            color: $text-inverse;
            mix-blend-mode: difference;

            font-family: $ff-heading;
            font-size: $fs-paragraph;

            line-height: $lh-default;

            text-align: center;
            margin-inline: auto;
        }
    }

    .line {
        --gap: var(--margin-4);
    }

    .word {
        display: inline-block;

        color: $text-inverse;

        line-height: $lh-extranarrow;

        text-align: center;
        text-transform: uppercase;

        position: relative;

        & > span {
            display: inline-block;
            position: relative;
        }

        &::after {
            content: '';

            position: absolute;
            inset: 0;

            color: inherit;
            mix-blend-mode: difference;
            filter: blur(5px);

            z-index: -1;
        }
    }

    #parallax-word-1 {
        &::after {
            content: 'a';
        }
    }

    #parallax-word-2 {
        &::after {
            content: 'mountain';
        }
    }

    #parallax-word-3 {
        &::after {
            content: 'in';
        }
    }

    #parallax-word-4 {
        &::after {
            content: 'a';
        }
    }

    #parallax-word-5 {
        &::after {
            content: 'valley';
        }
    }

    // ============ //
    // #endregion   //
    // ============ //

    main {
        background: linear-gradient(180deg, #090614 41.32%, #040106 72.76%);
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