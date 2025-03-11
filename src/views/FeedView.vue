<script setup>
    import { ref, useTemplateRef, onMounted, onUpdated } from 'vue';
    import { useUserStore } from '@/stores/userStore';
    import { FormValidator } from '@/scripts/exporter';
    import { Modal, MediaCard } from '@/components/exporter';

    // ----------------- //
    // #region userStore //
    // ----------------- //

    const userStore = useUserStore();

    const formData = {
        contents: ref(''),
    };

    const Validator = new FormValidator();

    async function uploadPost() {
        if (Validator.isEmpty(formData.contents.value)) {
            showError('postbody', 'Post must not be empty.');
            return;
        }

        // TODO: Create "character counter" in bottom right section of post to show remaining characters.

        // create validator check for this at some point
        if (formData.contents.value.length > 280) {
            showError('postbody', 'Post must not exceed 280 characters.');
            return;
        }

        const token = userStore.getBearerToken;
        const data = {
            text: formData.contents.value,
        };

        const url = 'https://hap-app-api.azurewebsites.net/message/';

        const options = {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        };

        let response = await fetch(url, options);

        if (response.ok) {
            if (response.status === 201) {
                const data = await response.json();

                // console.log(data);

                // TODO: Toast User
            }
        } else {
            if (response.status === 400) {
                throw new Error("Bad Request: Could not create post.");
            }
            if (response.status === 401) {
                throw new Error("Unauthorized: Could not create post.");
            }
            if (response.stauts === 500) {
                throw new Error("Internal Server Error: Could not create post.");
            }
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

    // ------------ //
    // #region Feed //
    // ------------ //

    const messages = ref([]);
    const isObserverInstantiated = ref(false);
    const newMessageCount = ref(0);

    onMounted(() => {
        getMessages(10, null, null);
    });

    onUpdated(() => {
        let elements = document.querySelectorAll('.media-card');

        observer.disconnect();
        observer.observe(elements[elements.length - 1]);
    });

    /**
     *  Get initial messages
     */
    async function getMessages(limit, before, after) {
        const token = userStore.getBearerToken;
        let url = "https://hap-app-api.azurewebsites.net/messages";

        const options = {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        // do I even need the "key"? Could I not just have it be the name of the object? Probably made the "key" redundant tbh. To be determined
        const parameters = {
            "limit": {
                key: "limit",
                value: limit,
            },
            "before": {
                key: "before",
                value: before,
            },
            "after": {
                key: "after",
                value: after,
            }
        };

        /**
         *  TODO: Export this to a function perhaps? (Build Query String)?
         *  It could take in a parameters object and return a formatted queryString starting from "?" and ending with the final (valid) paremter in the list.
         * 
         *  For now this implementation is fine.
         */
        let queryString = '?';

        if (parameters.limit.value) {
            queryString += `${parameters.limit.key}=${parameters.limit.value}`;
        }

        if (parameters.before.value) {
            // this if conditional could be something like if(isFirstQuery) as a boolean instead and then use the for(const [key, value] to access the data and add queryParameters dynamically)

            // probably should replace "key" with "name" or "query" etc...
            if (parameters.limit.value) {
                queryString += `&`;
            }

            queryString += `${parameters.before.key}=${parameters.before.value}`;
        }

        if (parameters.after.value) {
            if (parameters.limit.value || parameters.before.value) {
                queryString += `&`;
            }

            queryString += `${parameters.after.key}=${parameters.after.value}`;
        }

        // this will always apply :c
        if (queryString) {
            url += `${queryString}`;
            // console.log(url);
        }

        let response = await fetch(url, options);

        if (response.ok) {
            if (response.status === 200) {
                const data = await response.json();

                if (data) {
                    for (let i = 0; i < data.length; i++) {
                        messages.value.push(data[i]);
                    }

                    newMessageCount.value = 0;
                }
            }
        } else {
            if (response.status === 401) {
                throw new Error("Unauthorized: Could not get messages.");
            }
            if (response.status === 500) {
                throw new Error("Internal Server Error: Could not get messages.");
            }
        }

        return response;
    }

    /**
     *  Get number of new messages since the initial load
     */
    async function getNewMessageCount(after) {
        const token = userStore.getBearerToken;
        let url = "https://hap-app-api.azurewebsites.net/messages/count";

        const options = {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        const parameters = {
            "after": {
                key: "after",
                value: after,
            }
        };

        let queryString = '?';

        if (parameters.after.value) {
            queryString += `${parameters.after.key}=${parameters.after.value}`;
        }

        if (queryString) {
            url += `${queryString}`;
        }

        let response = await fetch(url, options);
        let count = 0;

        if (response.ok) {
            if (response.status === 200) {
                const data = await response.json();

                if (data) {
                    count = data.total;
                }
            }
        } else {
            if (response.status === 401) {
                throw new Error("Unauthorized: Could not get messages.");
            }
            if (response.status === 500) {
                throw new Error("Internal Server Error: Could not get messages.");
            }
        }

        return count;
    }

    // #region IntersectionObserver

    const observerOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 0.5,
    };

    const observer = new IntersectionObserver(getMessagesObserver, observerOptions);

    function getMessagesObserver() {
        if (!isObserverInstantiated.value) {
            isObserverInstantiated.value = true;
            return;
        }

        let lastMessage = messages.value[messages.value.length - 1];
        let beforeDate = lastMessage.updatedAt;

        getMessages(10, beforeDate, null);
    }

    // #endregion  

    window.addEventListener('scroll', async (e) => {
        const top = 0;

        if (window.scrollY === top) {
            let firstMessage = messages.value[0];
            let afterDate = firstMessage.updatedAt;
            // afterDate = '2025-02-28T22:34:47.470Z';

            let limit = await getNewMessageCount(afterDate);
            newMessageCount.value = limit;

            // getMessages(newMessageCount.value, null, afterDate);
        }
    });

    function loadNewMessages() {
        let firstMessage = messages.value[0];
        let afterDate = firstMessage.updatedAt;

        getMessages(newMessageCount.value, null, afterDate);
    }

    // ------------ //
    // #endregion   //
    // ------------ //

    // -------------- //
    // #region Modals //
    // -------------- //

    const createPostModal = useTemplateRef('create-post');

    // -------------- //
    // #endregion     //
    // -------------- //
</script>

<template>
    <div class="media"
         flow="vertical">
        <h1 class="bar_title">Your Feed</h1>
        <p class="bar_description">There will eventually be some media cards here for each post that is returned by
            the API server.</p>

        <div class="media_feed"
             grid="">

            <button type="button"
                    class="media_button"
                    flex="row align-center justify-start"
                    @click.prevent.stop="createPostModal.openModal()">
                <i class="fi fi-ts-pen-clip"
                   aria-hidden="true"></i>
                <span visually-hidden="">Create a new post</span>
            </button>

            <button type="button"
                    flex="row align-center justify-center"
                    class="load_button"
                    @click.prevent.stop="loadNewMessages()">
                {{ newMessageCount }} New Messages
            </button>

            <MediaCard v-if="messages"
                       v-for="msg in messages"
                       :message="msg">
            </MediaCard>
        </div>

        <Modal ref="create-post">
            <template #header>
                <h2 class="modal_title">Create a New Post</h2>
                <p class="modal_description">Upload your message to the community feed!</p>
            </template>
            <template #main>
                <form id="createPostForm"
                      class="modal_form form"
                      grid="">
                    <div class="form_field">
                        <textarea v-model="formData.contents.value"
                                  class="input"
                                  name="postbody"
                                  id="post-body"
                                  placeholder="The contents of your post goes here!"></textarea>
                        <p class="form_errors"></p>
                    </div>
                    <button type="submit"
                            class="form_submit"
                            flex="row align-center justify-center"
                            @click.prevent.stop="uploadPost()">
                        <i class="fi fi-ts-rocket-lunch"
                           aria-hidden="true"></i>
                        Upload Post
                    </button>
                </form>
            </template>
            <template #footer>
                <button type="button"
                        class="modal_button"
                        @click.prevent.stop="createPostModal.closeModal()">
                    Cancel
                </button>
            </template>
        </Modal>
    </div>
</template>

<style lang="scss"
       scoped>

    @use "@/scss/abstracts/" as *;

    .media {
        --gap: #{$gap};

        &_button {
            --gap: 0;
            --padding: calc(#{$padding} / 1.5);

            width: max-content;
            aspect-ratio: 1 / 1;

            background: var(--supporting-100);
            color: $text;

            font-size: $fs-paragraph;

            position: absolute;
            top: calc($margin-xs / 2);
            right: $margin-sm;

            border: $border-width $border-style var(--supporting-400);
            border-radius: 100%;
        }
    }

    .media_feed {
        --gap: #{$gap-sm};
        --padding-block: #{$padding};

        padding-block: var(--padding-block);

        &_empty {
            font-style: italic;
        }
    }

    .load_button {
        width: max-content;
        background: var(--primary-100);

        margin-inline: auto;

        border: $border-width $border-style var(--primary-400);
        border-radius: 100vw;
    }

    @media screen and (min-width) {
        .media_feed {
            --gap: #{$gap};
            --padding-block: #{$padding-lg};
        }
    }

</style>