import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

// Sampl3Password!

export const useUserStore = defineStore('userStore', () => {

    // -------------------- //

    // ------------- //
    // #region State //
    // ------------- //

    const user = ref({
        id: '',
        userName: '',
        firstName: '',
        lastName: '',
        email: '',
    });

    const bearerToken = ref({});
    const isAuthenticated = ref(false);

    // ------------- //
    // #endregion    //
    // ------------- //

    // -------------------- //

    // --------------- //
    // #region Getters //
    // --------------- //

    const getUser = computed(() => {
        return user.value;
    });

    const getBearerToken = computed(() => {
        return bearerToken.value;
    });

    const getIsAuthenticated = computed(() => {
        return isAuthenticated.value;
    });

    // --------------- //
    // #endregion      //
    // --------------- //

    // -------------------- //

    // --------------- //
    // #region Actions //
    // --------------- //

    /**
     * Create a new user on the hap-app-api server's database.
     * @returns response - server returned response
     */
    async function createUser(args) {
        const data = { ...args };

        const url = 'https://hap-app-api.azurewebsites.net/user/';

        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        };

        let response = await fetch(url, options);

        if (response.ok) {
            if (response.status === 201) {
                const data = await response.json();

                bearerToken.value = data.token;
                isAuthenticated.value = true;

                fetchUser();
            }
        } else {
            if (response.status === 400) {
                throw new Error("Bad Request: Could not create user.");
            }

            if (response.status === 500) {
                throw new Error("Internal Server Error: Could not create user.");
            }
        }

        return response;
    }

    /**
     * Update an existing user on the hap-app-api server's database.
     * @returns response - server returned response
     */
    async function updateUser(args) {
        const data = { ...args };
        const patchedUser = { ...args };
        const token = bearerToken.value;

        const url = 'https://hap-app-api.azurewebsites.net/user/';

        /**
         *  TODO: Add "Content-Type: 'application/json'" to the header.
         *        Then make all parameters optional for updating account.
         *        The "fetchUser" function SHOULD work as expected once this
         *        is sending data as expected.
         */
        const options = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(data),
        };

        let response = await fetch(url, options);

        if (response.ok) {
            if (response.status === 200) {
                fetchUser();
            }
        } else {
            if (response.status === 400) {
                throw new Error("Bad Request: Could not update user.");
            }

            if (response.status === 500) {
                throw new Error("Internal Server Error: Could not update user.");
            }
        }

        return response;

    }

    /**
     * Get an existing user from the hap-app-api server's database.
     * @returns response - server returned response
     */
    async function fetchUser() {
        // console.log("fetchUser() called");

        const token = bearerToken.value;

        const url = 'https://hap-app-api.azurewebsites.net/user/';

        const options = {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        let response = await fetch(url, options);

        if (response.ok) {
            if (response.status === 200) {
                const data = await response.json();

                // if (data) {
                //     console.log("GET:");
                //     console.log(data);
                // }

                user.value.id = data._id;
                user.value.userName = data.userName;
                user.value.firstName = data.firstName;
                user.value.lastName = data.lastName;
                user.value.email = data.email;
            }
        } else {
            if (response.status === 400) {
                throw new Error("Bad Request: Could not get user.");
            }
            if (response.status === 401) {
                throw new Error("Unauthorized: Could not get user.");
            }
            if (response.stauts === 500) {
                throw new Error("Internal Server Error: Could not get user.");
            }
        }

        return response;
    }

    /**
     * Delete an existing user from the hap-app-api server's database.
     * @returns response - server returned response
     */
    async function deleteUser() {
        const token = bearerToken.value;

        const url = 'https://hap-app-api.azurewebsites.net/user/';

        const options = {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        let response = await fetch(url, options);

        if (response.ok) {
            if (response.status === 200) {

                user.value = {
                    id: '',
                    userName: '',
                    firstName: '',
                    lastName: '',
                    email: '',
                };

                bearerToken.value = {};
                isAuthenticated.value = false;

            }
        } else {
            if (response.stauts === 400) {
                throw new Error("Bad Request: Could not delete user.");
            }

            if (response.stauts === 401) {
                throw new Error("Unauthorized: Could not delete user.");
            }

            if (response.stauts === 500) {
                throw new Error("Internal Server Error: Could not delete user.");
            }
        }

        return response;

    }

    /**
     * Authenticate an existing user from the hap-app-api server's database.
     * @param {*} args 
     * @returns response - server returned response
     */
    async function signUserIn(args) {
        const data = { ...args };

        const url = 'https://hap-app-api.azurewebsites.net/user/login';

        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        };

        let response = await fetch(url, options);

        if (response.ok) {
            if (response.status === 200) {
                const data = await response.json();

                bearerToken.value = data.token;
                isAuthenticated.value = true;

                fetchUser();
            }
        } else {
            if (response.status === 400) {
                throw new Error("Bad Request: Could not authenticate user.");
            }

            if (response.status === 500) {
                throw new Error("Internal Server Error: Could not authenticate user.");
            }
        }

        return response;
    }

    /**
     * Remove authentication status for an existing user from the hap-app-api server's database.
     * @returns response - server returned response
     */
    async function signUserOut() {
        const token = bearerToken.value;

        const url = 'https://hap-app-api.azurewebsites.net/user/logout';

        const options = {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        let response = await fetch(url, options);

        if (response.ok) {
            if (response.status === 200) {

                user.value = {
                    id: '',
                    userName: '',
                    firstName: '',
                    lastName: '',
                    email: '',
                };
                bearerToken.value = {};
                isAuthenticated.value = false;
            }
        } else {
            throw new Error("HTTP-Error" + response.status);
        }

        return response;
    }

    // --------------- //
    // #endregion      //
    // --------------- //

    // -------------------- //

    return {
        // state
        user,
        bearerToken,
        isAuthenticated,

        // getters
        getUser,
        getBearerToken,
        getIsAuthenticated,

        // actions
        createUser,
        updateUser,
        fetchUser,
        deleteUser,
        signUserIn,
        signUserOut,
    };
});